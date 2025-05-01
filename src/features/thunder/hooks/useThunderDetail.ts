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

      const parts = (detail.datetime ?? '').split('-');
      const [year, month, day, timeStr] = parts;
      const [hour = '', minute = ''] = timeStr?.split(':') ?? [];

      const date = `${year}.${month}.${day}`;
      const time = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;

      return {
        id: thunderId || '',
        title: detail.title,
        description: detail.description,
        category: detail.category,
        region: detail.region,
        img_url: detail.img_url,
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
