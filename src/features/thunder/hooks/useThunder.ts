import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createThunder,
  fetchThunderDetail,
  joinThunder,
  leaveThunder,
  deleteThunder,
  updateThunder,
} from '../api/thunderApi';

/**
 * 번개모임 생성 훅
 */
export const useCreateThunder = () => {
  return useMutation({ mutationFn: createThunder });
};

/**
 * 번개모임 리스트 조회 훅 (카테고리 및 지역 기준)
 */
export const useThunderList = (category: string, region: string) => {
  return useQuery({
    queryKey: ['thunderList', category, region],
    // queryFn: () => fetchThunderList(category, region),
  });
};

/**
 * 번개모임 상세 조회 훅
 */
export const useThunderDetail = (thunderId: number) => {
  return useQuery({
    queryKey: ['thunderDetail', thunderId],
    queryFn: () => fetchThunderDetail(thunderId),
  });
};

/**
 * 번개모임 참가 요청 훅
 */
export const useJoinThunder = () => {
  return useMutation({ mutationFn: joinThunder });
};

/**
 * 번개모임 탈퇴 훅
 */
export const useLeaveThunder = () => {
  return useMutation({ mutationFn: leaveThunder });
};

/**
 * 번개모임 삭제 훅
 */
export const useDeleteThunder = () => {
  return useMutation({ mutationFn: deleteThunder });
};

/**
 * 번개모임 수정 훅
 * @example mutate({ thunderId, data: { title, description } })
 */
export const useUpdateThunder = () => {
  return useMutation({
    mutationFn: ({
      thunderId,
      data,
    }: {
      thunderId: number;
      data: { title: string; description: string };
    }) => updateThunder(thunderId, data),
  });
};

/**
 * 번개모임 회원 승인/거절/추방 훅
 * @example mutate({ thunderId, payload: { target_member_id, action } })
 */
// export const useManageThunderMember = () => {
//   return useMutation({
//     mutationFn: ({
//       thunderId,
//       payload,
//     }: {
//       thunderId: number;
//       payload: { target_member_id: number; action: 'approve' | 'reject' | 'ban' };
//     }) => manageThunderMember(thunderId, payload),
//   });
// };

/**
 * 번개모임 일정 등록 훅
 * @example mutate({ thunderId, data: { date, content } })
 */
// export const useCreateThunderEvent = () => {
//   return useMutation({
//     mutationFn: ({
//       thunderId,
//       data,
//     }: {
//       thunderId: number;
//       data: { title: string; description: string; eventDate: string };
//     }) => createThunderEvent(thunderId, data),
//   });
// };
