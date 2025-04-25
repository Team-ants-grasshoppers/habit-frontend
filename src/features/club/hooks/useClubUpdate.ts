import { useMutation } from '@tanstack/react-query';
import useImageUpload from '../../../hooks/useImageUpload';
import { ClubFormData } from '../types';
import { updateClubApi } from '../api/clubApi';

/**
 *  [Hook] 클럽 수정
 */
export const useClubUpdate = (clubId: number) => {
  const { mutateAsync: uploadImage } = useImageUpload();
  const mutation = useMutation({
    mutationFn: async (formData: ClubFormData) => {
      let imgId: number = 0;
      if (formData.image.file) {
        imgId = await uploadImage(formData.image.file);
      }
      return updateClubApi(clubId, {
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
