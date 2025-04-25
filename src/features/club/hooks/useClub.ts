import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchClubListApi } from '../api/clubApi';
import { ClubFormData, ClubList } from '../types';
import useImageUpload from '../../../hooks/useImageUpload';

/**
 * [Hook] 클럽 생성 및 수정 폼 로직 관리
 * - 추후 번개모임 생성 및 수정 폼과 공통 훅으로 분리 예정
 */
export const useClubForm = (initialData?: ClubFormData) => {
  const { imageFile, imageUrl, handleImageChange, uploadSelectedImage } = useImageUpload();
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

  return {
    formData,
    setFormData,
    imageFile,
    imageUrl,
    handleImageChange,
    uploadSelectedImage,
  };
};

/** [Hook] 클럽 리스트 조회 (조건 기반) */
export const useClubList = (category: string, region: string) => {
  return useQuery({
    queryKey: ['clubList', category, region],
    queryFn: () => fetchClubListApi(category, region),
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
