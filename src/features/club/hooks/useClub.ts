import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  createClub,
  fetchClubDetail,
  fetchClubList,
  fetchClubMembers,
  manageClubMember,
  requestJoinClub,
  updateClub,
} from '../api/clubApi';
import { ClubDetailModel, ClubList, CreateClubResponse } from '../types';

/** [Hook] 특정 모임의 상세 정보 */
export const useClubDetail = (clubId?: string, userId?: string) => {
  const defaultProfile = '/assets/default-profile.png';
  return useQuery({
    queryKey: ['clubDetail', clubId, userId],
    queryFn: async ({ queryKey }) => {
      const [, clubId, userId] = queryKey;
      const detail = await fetchClubDetail(Number(clubId));
      const memberList = await fetchClubMembers(Number(clubId));
      return {
        detail,
        memberList,
        userId,
      };
    },
    enabled: !!clubId && !!userId,
    select: ({ detail, memberList, userId }): ClubDetailModel => {
      const admins = memberList
        .filter((m) => m.role === 'admin')
        .map((m) => ({
          userId: String(m.memberId),
          nickname: m.nickname,
          profileImageUrl: defaultProfile,
        }));

      const members = memberList
        .filter((m) => m.role === 'member')
        .map((m) => ({
          userId: String(m.memberId),
          nickname: m.nickname,
          profileImageUrl: defaultProfile,
        }));

      const pending = memberList
        .filter((m) => m.role === 'pending')
        .map((m) => ({
          userId: String(m.memberId),
          nickname: m.nickname,
          profileImageUrl: defaultProfile,
        }));

      const isAdmin = admins.some((admin) => admin.userId === userId);
      const isMember = members.some((member) => member.userId === userId);
      const isPending = pending.some((pending) => pending.userId === userId);

      return {
        admins,
        clubName: detail.clubName,
        description: detail.description,
        isAdmin,
        isMember,
        isPending,
        members,
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
export const useClubForm = (
  mode: 'create' | 'edit',
  initialData?: {
    clubName: string;
    description: string;
    category: string;
    region: string;
  },
) => {
  const [clubName, setClubName] = useState(initialData?.clubName || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [region, setRegion] = useState(initialData?.region || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (clubId?: number): Promise<CreateClubResponse | string | null> => {
    setIsLoading(true);
    setError(null);
    try {
      if (mode === 'create') {
        const newClubId = await createClub({
          clubName,
          description,
          category,
          region,
          imgId: 0,
        });
        return newClubId;
      } else if (mode === 'edit' && clubId) {
        const message = await updateClub(clubId, {
          description,
          category,
          region,
          imgId: 0,
        });
        return message;
      }
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setIsLoading(false);
    }
    return null; // Explicitly return null if no other return is reached
  };

  return {
    clubName,
    setClubName,
    description,
    setDescription,
    category,
    setCategory,
    region,
    setRegion,
    isLoading,
    error,
    submit,
  };
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
