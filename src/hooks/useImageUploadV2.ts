import { useMutation } from '@tanstack/react-query';
import uploadImage from '../common/api/imageApi';

/**
 * useImageUpload 훅
 *
 * 이미지 파일을 서버 업로드 후 imgId 반환을 관리하는 커스텀 훅
 *
 */

const useImageUploadV2 = () => {
  const mutation = useMutation({
    mutationFn: async (imageFile: File) => {
      const imgIdStr = await uploadImage(imageFile);
      const imgId = Number(imgIdStr);
      if (isNaN(imgId)) {
        throw new Error('업로드된 이미지 ID가 유효하지 않습니다.');
      }
      return imgId;
    },
  });

  return mutation;
};

export default useImageUploadV2;
