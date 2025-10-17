import { useEffect, useState } from 'react';
import { useSocket } from '@/core/contexts/socket-context';
import type { Message } from '@/types/chat';

export const useChat = (channelId: string) => {
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleNewMessage = (message: Message) => {
      console.log("pesan masuk ngab : ", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleError = (errorMessage: string) => {
      console.error('Socket Error:', errorMessage);
      setError(errorMessage);
    };

    socket.emit('joinChannel', channelId);

    socket.on('newMessage', handleNewMessage);
    socket.on('error', handleError);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('error', handleError);
      // Optional: leave channel event if backend supports it
      // socket.emit('leaveChannel', channelId);
    };
  }, [socket, isConnected, channelId]);

  const sendMessage = (text: string) => {
    if (!socket) return;

    const messageData = {
      channelId: channelId,
      text: text,
    };

    socket.emit('sendMessageToChannel', messageData);
  };

  return { messages, sendMessage, error };
};
