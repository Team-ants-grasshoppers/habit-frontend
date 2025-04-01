/* // REST API를 통해 과거 채팅 기록 불러오기
import { Message } from './types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export const fetchChatHistory = async (roomId: string): Promise<Message[]> => {
  const response = await fetch(`${API_BASE_URL}/chat/${roomId}/history`);
  if (!response.ok) {
    throw new Error('채팅 기록 불러오기 실패');
  }
  return response.json();
};
*/
