/* // 채팅방 UI (메시지 목록, 입력창)
import React, { useState } from 'react';
import { useChat } from '../hooks/useChat';
import ChatMessage from './ChatMessage';

interface ChatRoomProps {
  roomId: string;
  userId: string;
  userName: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId, userId, userName }) => {
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(newMessage, userId, userName);
    setNewMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지 입력..."
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default ChatRoom;
*/
