import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  banThunderMemberApi,
  fetchThunderMembersApi,
  joinThunderApi,
  leaveThunderApi,
} from '../api/thunderApi';

/** [Hook] 번개모임 멤버 리스트 */
export const useThunderMemberList = (thunderId: number) => {
  return useQuery({
    queryKey: ['clubMembers', thunderId],
    queryFn: () => fetchThunderMembersApi(thunderId),
    enabled: !!thunderId,
  });
};

/** [Hook] 번개모임 가입 */
export const useJoinThunder = (thunderId: number) => {
  const mutation = useMutation({
    mutationFn: () => joinThunderApi(thunderId),
  });
  return mutation;
};

/** [Hook] 번개모임 탈퇴 */
export const useLeaveThunder = (thunderId: number) => {
  const mutation = useMutation({
    mutationFn: () => leaveThunderApi(thunderId),
  });
  return mutation;
};

/** [Hook] 번개모임 멤버 추방 */
export const useBanThunderMember = (thunderId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (targetMemberId: number) => banThunderMemberApi(thunderId, targetMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clubMembers', thunderId] });
    },
  });
  return mutation;
};
