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
      const [, clubIdRaw, userId] = queryKey;
      if (!clubIdRaw) {
        throw new Error('clubId is missing in queryKey');
      }
      const clubId = Number(clubIdRaw);
      if (isNaN(clubId)) {
        throw new Error('clubId is not a valid number');
      }
      const detail = await fetchClubDetailApi(Number(clubId)); // 클럽상세 정보 API 호출
      const memberListResponse = await fetchClubMembersApi(Number(clubId));
      const memberList = memberListResponse.members ?? [];
      console.log('✅ queryFn 응답 detail:', detail);
      console.log('✅ queryFn 응답 memberList:', memberList);
      return { detail, memberList, userId };
    },
    enabled: !!clubId, // clubId, userId가 모두 있을 때만 쿼리를 활성화함 (!!: boolean 변환)
    select: (data): ClubDetailModel => {
      const detail = data?.detail;
      const memberList = data?.memberList ?? [];
      const userId = data?.userId ?? '';

      const { admins, members, pendingUsers, isAdmin, isMember, isPending } = separateMembersByRole(
        memberList,
        userId,
        defaultProfile,
      );
      console.log('✅ select 입력값:', detail, memberList, userId);
      return {
        clubId: detail.club_id,
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
