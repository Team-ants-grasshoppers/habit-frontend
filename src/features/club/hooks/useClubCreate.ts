import { useMutation } from '@tanstack/react-query';
import useImageUpload from '../../../hooks/useImageUpload';
import { ClubFormData } from '../types';
import { createClubApi } from '../api/clubApi';

/** [Hook] 클럽 생성 */
export const useClubCreate = () => {
  const { mutateAsync: uploadImage } = useImageUpload();
  const mutation = useMutation({
    mutationFn: async (formData: ClubFormData) => {
      let imgId: number | undefined;
      if (formData.image.file) {
        imgId = await uploadImage(formData.image.file);
      }
      return createClubApi({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        region: formData.region,
        image_id: imgId,
      });
    },
  });
  return mutation;
};
