import axiosInstance from '../../../lib/axios';
import { ClubDetailResponse, CreateClubRequest, CreateClubResponse } from './schemas';

/** clubApi.ts 클럽 관련 API
 *
 * createClubApi : 모임 생성
 * updateClubApi : 모임 수정
 * deleteClubApi : 모임 삭제
 * fetchClubDetailApi : 모임 상세 정보 조회
 * fetchClubMembersApi : 모임 회원(운영진/멤버/대기자) 조회
 * manageClubMemberApi : 모임 회원 관리 (승인/거절/추방)
 * requestJoinClubApi : 모임 가입 요청
 * fetchClubListApi : 모임 리스트 조회
 */

/** [API] 모임 생성 */
export const createClubApi = async (data: CreateClubRequest): Promise<CreateClubResponse> => {
  const response = await axiosInstance.post('/api/clubs', data);
  return response.data;
};

/** [API] 모임 수정 */
export const updateClubApi = async (
  clubId: number,
  data: {
    description: string;
    category: string;
    region: string;
    imgId: number;
  },
): Promise<string> => {
  const response = await axiosInstance.put(`/api/clubs/${clubId}`, data);
  return response.data.message;
};

/** [API] 모임 삭제 */
export const deleteClubApi = async (clubId: number): Promise<string> => {
  const response = await axiosInstance.delete(`/api/clubs/${clubId}`);
  return response.data.message;
};

/** [API] 모임 상세 정보 */
export const fetchClubDetailApi = async (clubId: number): Promise<ClubDetailResponse> => {
  const response = await axiosInstance.get(`/api/clubs/${clubId}`);
  return response.data;
};

/** [API] 모임 회원 조회 (운영진, 멤버, 대기자 등 포함) */
export const fetchClubMembersApi = async (clubId: number) => {
  const response = await axiosInstance.get(`/api/clubs/${clubId}/members`);
  return response.data;
};

/** [API] 모임 회원 관리 (가입 승인, 거절, 추방) */
export const manageClubMemberApi = async (
  clubId: number,
  payload: { target_member_id: number; action: 'approve' | 'reject' | 'ban' },
): Promise<string> => {
  const response = await axiosInstance.post(`/api/clubs/${clubId}/members/manage`, payload);
  return response.data.message;
};

/** [API] 모임 가입 요청 */
export const requestJoinClubApi = async (clubId: number): Promise<string> => {
  const response = await axiosInstance.post(`/api/clubs/${clubId}/join`);
  return response.data.message;
};

/** [API] 모임 리스트 조회 (카테고리, 지역 조건 기반) */
export const fetchClubListApi = async (
  category: string,
  region: string,
): Promise<
  {
    clubId: number;
    clubName: string;
    category: string;
  }[]
> => {
  const response = await axiosInstance.get(`/api/clubs?category=${category}&region=${region}`);
  return response.data.clubs;
};
