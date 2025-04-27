import { useMutation } from '@tanstack/react-query';
import useImageUpload from '../../../hooks/useImageUpload';
import { ThunderFormData } from '../types';
import { updateThunderApi } from '../api/thunderApi';

/** [Hook] 번개모임 수정 */
export const useThunderUpdate = (thunderId: number) => {
  const { mutateAsync: uploadImage } = useImageUpload();
  const mutation = useMutation({
    mutationFn: async (formData: ThunderFormData) => {
      let imageId: number = 0;
      if (formData.image.file) {
        imageId = await uploadImage(formData.image.file);
      }
      return updateThunderApi(thunderId, {
        description: formData.description,
        category: formData.category,
        region: formData.region,
        dateTime: formData.date,
        imageId: imageId,
      });
    },
  });
  return mutation;
};
