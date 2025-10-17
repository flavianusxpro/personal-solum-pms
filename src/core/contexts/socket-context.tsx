"use client"

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { io, Socket } from 'socket.io-client';

interface ISocketContext {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Hanya berjalan jika status otentikasi berubah
    if (status === 'authenticated' && session?.accessToken) {
      // Buat instance socket HANYA jika belum ada.
      if (!socketRef.current) {
        console.log('Creating a new socket instance...');
        const newSocket = io(process.env.NEXT_PUBLIC_CHAT_SERVICE_URL!, {
          transports: ['websocket'],
          auth: {
            token: session.accessToken,
          },
          // Penting: jangan otomatis connect saat inisialisasi
          autoConnect: false,
        });

        socketRef.current = newSocket;

        newSocket.on('connect', () => {
          console.log('Socket connected!');
          setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
          console.log('Socket disconnected!');
          setIsConnected(false);
        });
      }

      // Jika token berubah, update auth object
      socketRef.current.auth = { token: session.accessToken };
      
      // Jika instance sudah ada tapi belum connect, panggil connect()
      if (!socketRef.current.connected) {
        console.log('Connecting socket...');
        socketRef.current.connect();
      }

    } else if (status === 'unauthenticated') {
      // Jika logout dan socket masih ada, disconnect dan hancurkan
      if (socketRef.current?.connected) {
        console.log('Disconnecting socket due to unauthentication...');
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
    }
    
    // Cleanup effect: hanya disconnect jika komponen SocketProvider di-unmount
    return () => {
      // Ini lebih untuk development (hot-reloading) atau jika user menutup aplikasi
      if (socketRef.current && status === 'unauthenticated') {
         console.log('Cleaning up socket instance.');
         socketRef.current.disconnect();
         socketRef.current = null;
      }
    }

  }, [status, session?.accessToken]); // Bergantung pada status dan token

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};