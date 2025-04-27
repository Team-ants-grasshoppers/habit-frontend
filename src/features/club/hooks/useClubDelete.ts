import { useMutation } from '@tanstack/react-query';
import { deleteClubApi } from '../api/clubApi';

/** [Hook] 클럽 삭제 */
export const useClubDelete = () => {
  return useMutation({
    mutationFn: async (clubId: string) => {
      if (!clubId) return;
      if (!window.confirm('정말로 이 모임을 삭제하시겠습니까?')) return;

      try {
        await deleteClubApi(Number(clubId));
      } catch (err: any) {
        const msg = err.response?.data?.error || '삭제에 실패했습니다.';
        alert(msg);
      }
    },
  });
};
