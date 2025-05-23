import { useMutation } from '@tanstack/react-query';
import useImageUpload from '../../../hooks/useImageUpload';
import { ThunderFormData } from '../types';
import { createThunderApi } from '../api/thunderApi';

/** [Hook] 번개모임 생성 */
export const useThunderCreate = () => {
  const { mutateAsync: uploadImage } = useImageUpload();
  const mutation = useMutation({
    mutationFn: async (formData: ThunderFormData) => {
      let imgId: number | undefined;
      if (formData.image.file) {
        imgId = await uploadImage(formData.image.file);
      }
      return createThunderApi({
        thunderName: formData.thunderName,
        description: formData.description,
        category: formData.category,
        region: formData.region,
        dateTime: formData.date,
        imgId: imgId,
      });
    },
  });
  return mutation;
};
