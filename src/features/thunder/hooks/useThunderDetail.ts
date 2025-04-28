import { useQuery } from '@tanstack/react-query';
import { fetchThunderDetailApi, fetchThunderMembersApi } from '../api/thunderApi';
import { ThunderDetailModel } from '../types';
import { separateMembersByRole } from '../../utils/separateMembersByRole';

/** [Hook] 번개모임 상세 정보
 * - 모임 상세정보 + 멤버리스트
 */
export const useThunderDetail = (thunderId?: string, userId?: string) => {
  const defaultProfile = '/assets/default-profile.png';

  return useQuery({
    queryKey: ['thunderDetail', thunderId, userId],
    queryFn: async ({ queryKey }) => {
      const [, thunderId, userId] = queryKey;
      const detail = await fetchThunderDetailApi(Number(thunderId)); // 클럽상세 정보 API 호출
      const memberList = await fetchThunderMembersApi(Number(thunderId)); // 모임 회원 조회 API 호출 (배열)
      return { detail, memberList, userId };
    },
    enabled: !!thunderId && !!userId, // thunderId, userId가 모두 있을 때만 쿼리를 활성화함 (!!: boolean 변환)
    select: ({ detail, memberList, userId }): ThunderDetailModel => {
      const { admins, members, pendingUsers, isAdmin, isMember, isPending } = separateMembersByRole(
        memberList,
        userId || '',
        defaultProfile,
      );

      // 날짜 / 시간 분리
      let date = '';
      let time = '';
      if (detail.dateTime) {
        const [d, t] = detail.dateTime.split('T'); // 예: 2025-04-28T13:00
        date = d;
        time = t?.slice(0, 5) || ''; // 13:00:00 -> 13:00
      }

      return {
        thunderName: detail.thunderName,
        description: detail.description,
        category: detail.category,
        region: detail.region,
        imageUrl: detail.imageUrl,
        date,
        time,
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
