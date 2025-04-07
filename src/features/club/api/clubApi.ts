import axios from 'axios';

/**
 * 모임 생성
 */
export const createClub = async (data: {
  name: string;
  description: string;
  category: string;
  region: string;
}): Promise<number> => {
  const response = await axios.post('/api/clubs', data);
  return response.data.club_id;
};

/**
 * 모임 상세 조회
 */
export const fetchClubDetail = async (
  clubId: number,
): Promise<{
  name: string;
  description: string;
  category: string;
  region: string;
}> => {
  const response = await axios.get(`/api/clubs/${clubId}`);
  return response.data;
};

/**
 * 모임 수정
 */
export const updateClub = async (
  clubId: number,
  data: {
    description: string;
    category: string;
  },
): Promise<string> => {
  const response = await axios.put(`/api/clubs/${clubId}`, data);
  return response.data.message;
};

/**
 * 모임 회원 관리 (가입 승인, 거절, 추방)
 */
export const manageClubMember = async (
  clubId: number,
  payload: { target_member_id: number; action: 'approve' | 'reject' | 'ban' },
): Promise<string> => {
  const response = await axios.post(`/api/clubs/${clubId}/members/manage`, payload);
  return response.data.message;
};

/**
 * 모임 회원 조회 (운영진, 멤버, 대기자 등 포함)
 */
export const fetchClubMembers = async (
  clubId: number,
): Promise<
  {
    member_id: number;
    nickname: string;
    role: 'admin' | 'member' | 'pending';
  }[]
> => {
  const response = await axios.get(`/api/clubs/${clubId}/members`);
  return response.data.members;
};

/**
 * 모임 가입 요청
 */
export const requestJoinClub = async (clubId: number): Promise<string> => {
  const response = await axios.post(`/api/clubs/${clubId}/join`);
  return response.data.message;
};

/**
 * 모임 리스트 조회 (카테고리, 지역 조건 기반)
 */
export const fetchClubList = async (
  category: string,
  region: string,
): Promise<
  {
    club_id: number;
    name: string;
    category: string;
  }[]
> => {
  const response = await axios.get(`/api/clubs?category=${category}&region=${region}`);
  return response.data.clubs;
};
