/* // AWS WebSocket 연결 관리 및 이벤트 핸들러 (Socket.IO 기반 예제)

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { Message } from '../types';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'ws://localhost:4000';

export const useChat = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      query: { roomId },
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('WebSocket 연결 성공');
    });

    newSocket.on('message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('disconnect', () => {
      console.log('WebSocket 연결 종료');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  const sendMessage = (text: string, userId: string, userName: string) => {
    if (socket && socket.connected) {
      const message: Message = {
        id: Date.now().toString(),
        user: { id: userId, name: userName },
        text,
        createdAt: new Date(),
      };
      socket.emit('message', message);
      setMessages(prev => [...prev, message]);
    }
  };

  return { messages, sendMessage };
};

 */
