import axios from 'axios';

/**
 * 번개모임 생성
 */
export const createThunder = async (data: {
  title: string;
  description: string;
  category: string;
  region: string;
  time: string; // full datetime string (e.g., "2025-04-20T13:00:00")
  imgId: number; // 이미지 ID
}): Promise<number> => {
  const response = await axios.post('/api/thunders', data);
  return response.data.thunder_id;
};

/**
 * 번개모임 리스트 조회
 */
export const fetchThunderList = async (
  category: string,
  region: string,
  date: string, // e.g., "2025-04-20"
): Promise<
  {
    thunder_id: number;
    title: string;
    category: string;
    region: string;
    datetime: string;
    imgUrl: string | null;
  }[]
> => {
  const response = await axios.get(
    `/api/thunders?category=${category}&region=${region}&date=${date}`,
  );
  return response.data.thunders;
};

/**
 * 번개모임 상세 조회
 */
export const fetchThunderDetail = async (
  thunderId: number,
): Promise<{
  thunderId: number;
  title: string;
  description: string;
  category: string;
  region: string;
  imgUrl: string;
  datetime: string;
}> => {
  const response = await axios.get(`/api/thunders/${thunderId}`);
  return response.data;
};

/**
 * 번개모임 가입
 */
export const joinThunder = async (thunderId: number): Promise<string> => {
  const response = await axios.post(`/api/thunders/${thunderId}/join`);
  return response.data.message;
};

/**
 * 번개모임 탈퇴
 */
export const leaveThunder = async (thunderId: number): Promise<string> => {
  const response = await axios.delete(`/api/thunders/${thunderId}/leave`);
  return response.data.message;
};

/**
 * 번개모임 삭제
 */
export const deleteThunder = async (thunderId: number): Promise<string> => {
  const response = await axios.delete(`/api/thunders/${thunderId}`);
  return response.data.message;
};

/**
 * 번개모임 수정
 */
export const updateThunder = async (
  thunderId: number,
  data: {
    title?: string | null;
    description?: string | null;
    region?: string | null;
    date?: string | null;
    id?: number | null;
  },
): Promise<string> => {
  const response = await axios.put(`/api/thunders/${thunderId}`, data);
  return response.data.message;
};

/**
 * 번개모임 회원 목록 조회
 */
export const fetchThunderMembers = async (
  thunderId: number,
): Promise<
  {
    memberId: number;
    nickname: string;
    role: 'admin' | 'member';
  }[]
> => {
  const response = await axios.get(`/api/thunders/${thunderId}/members`);
  return response.data.members;
};

/**
 * 번개모임 회원 추방
 */
export const banThunderMember = async (
  thunderId: number,
  targetMemberId: number,
): Promise<string> => {
  const response = await axios.delete(`/api/thunders/${thunderId}/ban`, {
    data: { targetMemberId },
  });
  return response.data.message;
};
