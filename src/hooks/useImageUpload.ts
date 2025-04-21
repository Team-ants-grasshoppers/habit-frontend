import { useState } from 'react';
import uploadImage from '../common/api/imageApi';

/**
 * useImageUpload 훅
 *
 * 파일 선택 시 미리보기 URL 생성 + 서버 업로드 후 imgId 반환을 관리하는 커스텀 훅
 *
 * 반환 값:
 * - imageFile: 현재 선택된 이미지 파일
 * - imageUrl: 미리보기용 이미지 URL
 * - handleImageChange: 파일 선택 시 호출 (input type="file" onChange용)
 * - uploadSelectedImage: 서버에 이미지 업로드하고 imgId 반환
 */

const useImageUpload = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  /**
   * 파일 선택 시 미리보기 처리
   * @param file 선택된 파일
   */
  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
    } else {
      setImageUrl('');
    }
  };

  /**
   * 선택된 이미지를 서버에 업로드하고 imgId 반환
   * @returns number | null
   */
  const uploadSelectedImage = async (): Promise<number | null> => {
    if (!imageFile) return null;

    const uploadResult = await uploadImage(imageFile);
    const imgId = Number(uploadResult);

    if (isNaN(imgId)) {
      throw new Error('업로드된 이미지 ID가 유효하지 않습니다.');
    }

    return imgId;
  };

  return {
    imageFile,
    imageUrl,
    handleImageChange,
    uploadSelectedImage,
  };
};

export default useImageUpload;
