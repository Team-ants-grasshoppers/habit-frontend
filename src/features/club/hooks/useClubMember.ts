import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchClubMembersApi, manageClubMemberApi, requestJoinClubApi } from '../api/clubApi';

/** [Hook] 클럽 멤버 및 대기자 리스트 */
export const useClubMemberList = (clubId: number) => {
  return useQuery({
    queryKey: ['clubMembers', clubId],
    queryFn: () => fetchClubMembersApi(clubId),
    enabled: !!clubId,
  });
};

/** [Hook] 클럽 가입 요청 */
export const useJoinClub = (clubId: number) => {
  const mutation = useMutation({
    mutationFn: () => requestJoinClubApi(clubId),
  });
  return mutation;
};

/** [Hook] 클럽 멤버 승인/거절/추방 */
export const useManageMember = (clubId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: { target_member_id: number; action: 'approve' | 'reject' | 'ban' }) =>
      manageClubMemberApi(clubId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clubMembers', clubId] });
    },
  });
  return mutation;
};
