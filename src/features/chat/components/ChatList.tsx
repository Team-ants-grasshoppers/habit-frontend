/* // 여러 채팅방 목록 표시 컴포넌트
import React from 'react';
import { ChatRoom as ChatRoomType } from '../types';

interface ChatListProps {
  chatRooms: ChatRoomType[];
  onSelectRoom: (roomId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chatRooms, onSelectRoom }) => {
  return (
    <div>
      <h3>채팅방 목록</h3>
      {chatRooms.map((room) => (
        <div key={room.id} onClick={() => onSelectRoom(room.id)}>
          {room.name}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
*/
