/* // 단일 메시지 컴포넌트
import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div>
      <strong>{message.user.name}:</strong> {message.text}
      <div>
        {new Date(message.createdAt).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default ChatMessage;
*/
