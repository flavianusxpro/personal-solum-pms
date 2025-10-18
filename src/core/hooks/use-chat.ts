import { useEffect, useState } from "react";
import { useSocket } from "@/core/contexts/socket-context";
import type { Message } from "@/types/chat";

export const useChat = (channelId: string) => {
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!socket || !isConnected || !channelId) {
      setMessages([]); // Bersihkan pesan saat channel tidak valid
      return;
    }

    const handleNewMessage = (message: Message) => {
      console.log("Pesan masuk:", message);
      setMessages((prev) => [...prev, message]);
    };

    const handleError = (errMsg: string) => {
      console.error("Socket Error:", errMsg);
      setError(errMsg);
    };

    // Join channel hanya sekali per socket connect
    socket.emit("joinChannel", channelId, (response: any) => {
      if (response?.error) {
        setError(response.error);
      }
    });

    socket.on("newMessage", handleNewMessage);
    socket.on("error", handleError);
    socket.on("historyMessage", (messages: Message[]) => {
      setMessages(messages);
    })

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("error", handleError);
      // Hanya emit leaveChannel jika socket masih terhubung
      if (socket.connected) {
        socket.emit("leaveChannel", channelId);
      }
    };
  }, [socket, isConnected, channelId]);

  const sendMessage = (text: string) => {
    if (!socket || !isConnected || !channelId) {
      console.warn("Socket not ready or no channel selected");
      return;
    }

    const payload = { channelId, text };
    socket.emit("sendMessageToChannel", payload, (response: any) => {
      if (response?.error) {
        setError(response.error);
      }
    });
  };

  return { messages, sendMessage, error };
};
