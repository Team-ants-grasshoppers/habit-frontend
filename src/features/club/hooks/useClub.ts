import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import useImageUploadV2 from '../../../hooks/useImageUploadV2';
import {
  createClub,
  deleteClub,
  fetchClubList,
  fetchClubMembers,
  manageClubMember,
  requestJoinClub,
  updateClub,
} from '../api/clubApi';
import { ClubDetailModel, ClubFormData, ClubList } from '../types';
import axios from 'axios';

/** [Hook] 특정 모임의 상세 정보 */
export const useClubDetail = (clubId?: string, userId?: string) => {
  const defaultProfile = '/assets/default-profile.png';
  return useQuery({
    queryKey: ['clubDetail', clubId, userId],
    queryFn: () => axios.get(`/api/clubs/${clubId}`).then((res) => res.data),
    // queryFn: async ({ queryKey }) => {
    //   const [, clubId, userId] = queryKey;
    //   const detail = await fetchClubDetail(Number(clubId));
    //   const memberList = await fetchClubMembers(Number(clubId));
    //   return {
    //     detail,
    //     memberList,
    //     userId,
    //   };
    // },
    enabled: !!clubId && !!userId,
    select: ({ detail, memberList, userId }): ClubDetailModel => {
      const admins = memberList
        .filter((m: any) => m.role === 'admin')
        .map((m: any) => ({
          userId: String(m.memberId),
          nickname: m.nickname,
          profileImageUrl: defaultProfile,
        }));

      const members = memberList
        .filter((m: any) => m.role === 'member')
        .map((m: any) => ({
          userId: String(m.memberId),
          nickname: m.nickname,
          profileImageUrl: defaultProfile,
        }));

      const pending = memberList
        .filter((m: any) => m.role === 'pending')
        .map((m: any) => ({
          userId: String(m.memberId),
          nickname: m.nickname,
          profileImageUrl: defaultProfile,
        }));

      const isAdmin = admins.some((admin: any) => admin.userId === userId);
      const isMember = members.some((member: any) => member.userId === userId);
      const isPending = pending.some((pending: any) => pending.userId === userId);

      return {
        admins,
        clubName: detail.clubName,
        description: detail.description,
        isAdmin,
        isMember,
        isPending,
        members,
        category: detail.category,
        region: detail.region,
        pendingUsers: pending,
        imageUrl: detail.imageUrl,
      };
    },
  });
};

/** [Hook] 클럽 멤버 및 대기자 리스트 */
export const useClubMembers = (clubId: number) => {
  return useQuery({
    queryKey: ['clubMembers', clubId],
    queryFn: () => fetchClubMembers(clubId),
    enabled: !!clubId,
  });
};

/** [Hook] 클럽 생성 및 수정 폼 로직 관리 */
export const useClubForm = (initialData?: ClubFormData) => {
  const [formData, setFormData] = useState<ClubFormData>(
    initialData || {
      clubName: '',
      description: '',
      category: '',
      region: '',
      image: {
        url: undefined,
        file: undefined,
      },
    },
  );

  const handleImageChange = async (image: File | null) => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setFormData((prev) => ({ ...prev, image: { url: imageUrl, file: image } }));
    } else {
      setFormData((prev) => ({
        ...prev,
        image: { url: undefined, file: undefined },
      }));
    }
  };

  return {
    formData,
    setFormData,
    handleImageChange,
  };
};

/** [Hook] 클럽 생성 */
export const useClubCreate = () => {
  const { mutateAsync: uploadImage } = useImageUploadV2();
  const mutation = useMutation({
    mutationFn: async (formData: ClubFormData) => {
      let imgId: number | undefined;
      if (formData.image.file) {
        imgId = await uploadImage(formData.image.file);
      }
      return createClub({
        clubName: formData.clubName,
        description: formData.description,
        category: formData.category,
        region: formData.region,
        imgId: imgId,
      });
    },
  });
  return mutation;
};

/** [Hook] 클럽 수정 */
export const useClubUpdate = (clubId: number) => {
  const { mutateAsync: uploadImage } = useImageUploadV2();
  const mutation = useMutation({
    mutationFn: async (formData: ClubFormData) => {
      let imgId: number = 0;
      if (formData.image.file) {
        imgId = await uploadImage(formData.image.file);
      }
      return updateClub(clubId, {
        description: formData.description,
        category: formData.category,
        region: formData.region,
        // TODO: imgId required인지 확인
        // * 만약 required라면, club detail 응답으로부터 이미지 id를 함께 전달 받아야함.
        imgId: imgId,
      });
    },
  });
  return mutation;
};

/** [Hook] 클럽 삭제 */
export const useClubDelete = () => {
  return useMutation({
    mutationFn: async (clubId: string) => {
      if (!clubId) return;
      if (!window.confirm('정말로 이 모임을 삭제하시겠습니까?')) return;

      try {
        await deleteClub(Number(clubId));
      } catch (err: any) {
        const msg = err.response?.data?.error || '삭제에 실패했습니다.';
        alert(msg);
      }
    },
  });
};

/** [Hook] 클럽 가입 요청 */
export const useJoinClub = (clubId: number) => {
  const mutation = useMutation({
    mutationFn: () => requestJoinClub(clubId),
  });
  return mutation;
};

/** [Hook] 클럽 멤버 승인/거절/추방 */
export const useManageMember = (clubId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: { target_member_id: number; action: 'approve' | 'reject' | 'ban' }) =>
      manageClubMember(clubId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clubMembers', clubId] });
    },
  });
  return mutation;
};

/** [Hook] 클럽 리스트 조회 (조건 기반) */
export const useClubList = (category: string, region: string) => {
  return useQuery({
    queryKey: ['clubList', category, region],
    queryFn: () => fetchClubList(category, region),
    enabled: !!category && !!region,
    select: (response): ClubList => {
      return {
        clubListItems: response.map((data) => ({
          clubId: data.clubId.toString(),
          clubName: data.clubName,
          imageUrl: '/placeholder.png',
        })),
      };
    },
  });
};
