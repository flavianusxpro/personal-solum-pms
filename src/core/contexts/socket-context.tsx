
"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.accessToken) {
      const newSocket = io(process.env.NEXT_PUBLIC_CHAT_SERVICE_URL!, {
        transports: ['websocket'],
        auth: {
          token: session.accessToken,
        },
      });

      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Socket connected!');
        setIsConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected!');
        setIsConnected(false);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [status, session]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
