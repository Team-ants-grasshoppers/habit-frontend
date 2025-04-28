import { useMutation } from '@tanstack/react-query';
import { deleteThunderApi } from '../api/thunderApi';

/** [Hook] 번개모임 삭제 */
export const useThunderDelete = () => {
  return useMutation({
    mutationFn: async (thunderId: string) => {
      if (!thunderId) return;
      if (!window.confirm('정말로 이 모임을 삭제하시겠습니까?')) return;

      try {
        await deleteThunderApi(Number(thunderId));
      } catch (err: any) {
        const msg = err.response?.data?.error || '삭제에 실패했습니다.';
        alert(msg);
      }
    },
  });
};
