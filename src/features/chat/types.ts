// 메시지, 사용자, 채팅방 등의 타입 정의 예시
export interface User {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  user: User;
  text: string;
  createdAt: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: User[];
}
