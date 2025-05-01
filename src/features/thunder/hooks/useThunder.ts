import { ThunderFormData, ThunderList } from '../types';
import useImageUpload from '../../../hooks/useImageUpload';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchThunderListApi } from '../api/thunderApi';

/**
 * [Hook] 클럽 생성 및 수정 폼 로직 관리
 * - 추후 번개모임 생성 및 수정 폼과 공통 훅으로 분리 예정
 */
export const useThunderForm = (initialData?: ThunderFormData) => {
  const {
    imageFile,
    imageUrl,
    handleImageChange: rawHandleImageChange,
    uploadSelectedImage,
  } = useImageUpload();
  const [formData, setFormData] = useState<ThunderFormData>(
    initialData || {
      title: '',
      description: '',
      category: '',
      region: '',
      time: '',
      image: {
        url: undefined,
        file: undefined,
      },
    },
  );
  const handleImageChange = (file: File | undefined) => {
    rawHandleImageChange(file ?? null); // 원래 훅 로직 호출
    setFormData((prev) => ({
      ...prev,
      image: {
        file,
        url: file ? URL.createObjectURL(file) : '',
      },
    }));
  };

  return {
    formData,
    setFormData,
    imageFile,
    imageUrl,
    handleImageChange,
    uploadSelectedImage,
  };
};

/**
 * 번개모임 리스트 조회 훅 (카테고리 및 지역 기준)
 */
export const useThunderList = (category: string, region: string, date: string) => {
  return useQuery({
    queryKey: ['thunderList', category, region, date],
    queryFn: () => fetchThunderListApi(category, region, date),
    enabled: !!category && !!region,
    select: (response): ThunderList => {
      return {
        thunderListItems: response.map((data) => ({
          thunderId: data.thunderId.toString(),
          thunderName: data.thunderName,
          imageUrl: '/placeholder.png',
        })),
      };
    },
  });
};

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
