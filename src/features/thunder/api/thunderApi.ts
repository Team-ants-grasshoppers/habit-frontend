import axios from '../../../lib/axios';
import { CreateThunderRequest, CreateThunderResponse, ThunderListResponse } from './schemas';

/** thunderApi.ts 번개모임 관련 API
 *
 * createThunderApi : 번개모임 생성
 * updateThunderApi : 번개모임 수정
 * deleteThunderApi : 번개모임 삭제
 * fetchThunderDetailApi : 번개모임 상세 정보 조회
 * fetchThunderMembersApi : 번개모임 회원(운영진/멤버/대기자) 조회
 * manageThunderMemberApi : 번개모임 회원 관리 (승인/거절/추방)
 * requestJoinThunderApi : 번개모임 가입 요청
 * fetchThunderListApi : 번개모임 리스트 조회
 */

/** [API] 번개모임 생성 */
export const createThunderApi = async (
  data: CreateThunderRequest,
): Promise<CreateThunderResponse> => {
  const response = await axios.post('/api/thunders', data);
  return response.data;
};

/** [API] 번개모임 수정 */
export const updateThunderApi = async (
  thunderId: number,
  data: {
    description?: string | null;
    category?: string | null;
    region?: string | null;
    dateTime?: string | null;
    imageId?: number | null;
  },
): Promise<string> => {
  const response = await axios.put(`/api/thunders/${thunderId}`, data);
  return response.data.message;
};

/** [API] 번개모임 삭제 */
export const deleteThunderApi = async (thunderId: number): Promise<string> => {
  const response = await axios.delete(`/api/thunders/${thunderId}`);
  return response.data.message;
};

/** [API] 번개모임 상세 조회 */
export const fetchThunderDetailApi = async (thunderId: number) => {
  const response = await axios.get(`/api/thunders/${thunderId}`);
  return response.data;
};

/** [API] 번개모임 회원 조회 (운영진, 멤버, 대기자 등 포함) */
export const fetchThunderMembersApi = async (thunderId: number) => {
  const response = await axios.get(`/api/thunders/${thunderId}/members`);
  return response.data.members;
};

/** [API] 번개모임 가입 */
export const joinThunderApi = async (thunderId: number): Promise<string> => {
  const response = await axios.post(`/api/thunders/${thunderId}/join`);
  return response.data.message;
};

/** [API] 번개모임 탈퇴 */
export const leaveThunderApi = async (thunderId: number): Promise<string> => {
  const response = await axios.delete(`/api/thunders/${thunderId}/leave`);
  return response.data.message;
};

/**
 * 번개모임 회원 추방
 */
/** [API] 번개모임  */
export const banThunderMemberApi = async (
  thunderId: number,
  targetMemberId: number,
): Promise<string> => {
  const response = await axios.delete(`/api/thunders/${thunderId}/ban`, {
    data: { targetMemberId },
  });
  return response.data.message;
};

/** [API] 번개모임 리스트 조회 */
export const fetchThunderListApi = async (
  category: string,
  region: string,
  date: string, // e.g., "2025-04-20"
): Promise<ThunderListResponse> => {
  const response = await axios.get(
    `/api/thunders?category=${category}&region=${region}&date=${date}`,
  );
  return response.data.thunders;
};
