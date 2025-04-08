import axios from 'axios';

/**
 * 번개모임 생성
 */
export const createThunder = async (data: {
  title: string;
  description: string;
  category: string;
  region: string;
}): Promise<number> => {
  const response = await axios.post('/api/thunders', data);
  return response.data.thunder_id;
};

/**
 * 번개모임 리스트 조회 (카테고리, 지역 기반)
 */
export const fetchThunderList = async (
  category: string,
  region: string,
): Promise<
  {
    thunder_id: number;
    title: string;
    category: string;
    region: string;
  }[]
> => {
  const response = await axios.get(`/api/thunders?category=${category}&region=${region}`);
  return response.data.thunders;
};

/**
 * 번개모임 상세 조회
 */
export const fetchThunderDetail = async (
  thunderId: number,
): Promise<{
  thunder_id: number;
  title: string;
  description: string;
  category: string;
  region: string;
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
  data: { title: string; description: string },
): Promise<string> => {
  const response = await axios.put(`/api/thunders/${thunderId}`, data);
  return response.data.message;
};

/**
 * 번개모임 회원 관리 (가입 승인, 거절, 추방)
 */
export const manageThunderMember = async (
  thunderId: number,
  payload: { target_member_id: number; action: 'approve' | 'reject' | 'ban' },
): Promise<string> => {
  const response = await axios.post(`/api/thunders/${thunderId}/members/manage`, payload);
  return response.data.message;
};

/**
 * 번개모임 일정 등록
 */
export const createThunderEvent = async (
  thunderId: number,
  data: { title: string; description: string; eventDate: string },
): Promise<number> => {
  const response = await axios.post(`/api/thunders/${thunderId}/calendar/manage`, data);
  return response.data.event_id;
};
