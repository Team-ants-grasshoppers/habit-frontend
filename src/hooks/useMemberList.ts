import { useQuery } from '@tanstack/react-query';
import { Member } from '../features/utils/separateMembersByRole';
import axiosInstance from '../lib/axios';

type GroupType = 'club' | 'thunder';

interface UseMemberListParams {
  type: GroupType;
  id: number;
}

/** !!현재 사용 안함. 추후 전체 리팩토링 시 적용 예정
 * [Hook] 클럽/번개 모임 멤버 리스트 조회 공용 훅
 *
 */
export const useMemberList = ({ type, id }: UseMemberListParams) => {
  return useQuery<Member[]>({
    queryKey: ['memberList', type, id],
    queryFn: async () => {
      const path = type === 'club' ? `/api/clubs/${id}/members` : `/api/thunders/${id}/members`;
      const response = await axiosInstance.get(`${path}`);
      return response.data.members;
    },
    enabled: !!id,
  });
};
