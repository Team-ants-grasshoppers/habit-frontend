import axiosInstance from '../../../lib/axios';
import { CreateClubRequest, CreateClubResponse } from '../types';
import { ClubDetailResponse, ClubListResponse } from './schemas';

export const createClub = async (data: CreateClubRequest): Promise<CreateClubResponse> => {
  const response = await axiosInstance.post('/clubs', data);
  return response.data;
};

/** [API] 모임 상세 조회 */
export const fetchClubDetail = async (clubId: number): Promise<ClubDetailResponse> => {
  const response = await axiosInstance.get(`/api/clubs/${clubId}`);
  return response.data;
};

/** [API] 모임 수정 */
export const updateClub = async (
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

/** [API] 모임 회원 관리 (가입 승인, 거절, 추방) */
export const manageClubMember = async (
  clubId: number,
  payload: { target_member_id: number; action: 'approve' | 'reject' | 'ban' },
): Promise<string> => {
  const response = await axiosInstance.post(`/api/clubs/${clubId}/members/manage`, payload);
  return response.data.message;
};

/** [API] 모임 회원 조회 (운영진, 멤버, 대기자 등 포함) */
export const fetchClubMembers = async (
  clubId: number,
): Promise<
  {
    memberId: number;
    nickname: string;
    role: 'admin' | 'member' | 'pending';
  }[]
> => {
  const response = await axiosInstance.get(`/api/clubs/${clubId}/members`);
  return response.data.members ?? [];
};

/** [API] 모임 가입 요청 */
export const requestJoinClub = async (clubId: number): Promise<string> => {
  const response = await axiosInstance.post(`/api/clubs/${clubId}/join`);
  return response.data.message;
};

/** [API] 모임 리스트 조회 (카테고리, 지역 조건 기반) */
export const fetchClubList = async (
  category: string,
  region: string,
): Promise<ClubListResponse> => {
  const response = await axiosInstance.get(`/api/clubs?category=${category}&region=${region}`);
  return response.data.clubs;
};

/** [API] 모임 삭제 */
export const deleteClub = async (clubId: number): Promise<string> => {
  const response = await axiosInstance.delete(`/api/clubs/${clubId}`);
  return response.data.message;
};
