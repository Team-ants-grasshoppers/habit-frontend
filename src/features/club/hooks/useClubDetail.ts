import { useQuery } from '@tanstack/react-query';
import { fetchClubDetailApi, fetchClubMembersApi } from '../api/clubApi';
import { ClubDetailModel } from '../types';
import { separateMembersByRole } from '../../utils/separateMembersByRole';

/** [Hook] 특정 모임의 상세 정보
 * - 모임 상세정보 + 멤버리스트
 */
export const useClubDetail = (clubId?: string, userId?: string) => {
  const defaultProfile = '/assets/default-profile.png';

  return useQuery({
    queryKey: ['clubDetail', clubId, userId],
    queryFn: async ({ queryKey }) => {
      const [, clubId, userId] = queryKey;
      const detail = await fetchClubDetailApi(Number(clubId)); // 클럽상세 정보 API 호출
      const memberList = await fetchClubMembersApi(Number(clubId)); // 모임 회원 조회 API 호출 (배열)
      console.log('✅ queryFn 응답 detail:', detail);
      console.log('✅ queryFn 응답 memberList:', memberList);
      return { detail, memberList, userId };
    },
    enabled: !!clubId && !!userId, // clubId, userId가 모두 있을 때만 쿼리를 활성화함 (!!: boolean 변환)
    select: ({ detail, memberList, userId }): ClubDetailModel => {
      const { admins, members, pendingUsers, isAdmin, isMember, isPending } = separateMembersByRole(
        memberList,
        userId || '',
        defaultProfile,
      );
      return {
        clubName: detail.name,
        description: detail.description,
        category: detail.category,
        region: detail.region,
        imageUrl: detail.imgUrl?.[0] ?? 'vite.svg',
        admins,
        members,
        pendingUsers: pendingUsers,
        isAdmin,
        isMember,
        isPending,
      };
    },
  });
};
