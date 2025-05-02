import axios from '../../../lib/axios';
import { MyPageList } from '../types';
import { JoinedClubItem, ManagedClubItem } from '../types';

interface RawClubItem {
  club_id: number;
  name: string;
  role: string; // 'admin' or 'member'
}

interface MyClubApiResponse {
  managed_clubs: RawClubItem[];
  joined_clubs: RawClubItem[];
}

/**
 * 내 클럽 목록 조회 API
 * - 운영 중인 클럽과 참여 중인 클럽을 분리하여 반환
 */
export const fetchMyClubList = async (): Promise<{
  managedClubs: ManagedClubItem[];
  joinedClubs: JoinedClubItem[];
}> => {
  const response = await axios.get<MyClubApiResponse>('/api/members/my-clubs');

  const managedClubs: ManagedClubItem[] = response.data.managed_clubs.map((club) => ({
    id: String(club.club_id),
    name: club.name,
    imageUrl: '', // 이미지 정보가 없으므로 빈 값 또는 기본 이미지 처리 가능
  }));

  const joinedClubs: JoinedClubItem[] = response.data.joined_clubs.map((club) => ({
    id: String(club.club_id),
    name: club.name,
    imageUrl: '',
  }));

  return { managedClubs, joinedClubs };
};
export const fetchJoinedMyThunderClubList = async (): Promise<MyPageList> => {
  const response = await axios.get(`/api/thunders/joined`);
  return response.data.joinedMyThunders;
};
