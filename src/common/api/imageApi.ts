import axiosInstance from '../../lib/axios';

/**
 * 이미지 업로드 API 요청 함수
 *
 * @param file - 업로드할 이미지 파일
 * @param usageType - 이미지 용도 ('profile' | 'background' | 'gallery')
 * @returns 업로드된 이미지 ID (string)
 */
const uploadImage = async (
  file: File,
  usageType: 'profile' | 'background' | 'gallery',
): Promise<string> => {
  const formData = new FormData();
  formData.append('img', file);
  formData.append('media_usage_type', usageType); // 용도에 따라 달라짐

  try {
    // 이미지 파일을 업로드할 서버로 POST 요청
    const response = await axiosInstance.post('/api/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 파일 업로드 시 Content-Type 설정
      },
    });

    if (typeof response.data.id === 'number') {
      return response.data.id.toString();
    }

    throw new Error('이미지 업로드 실패');
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw new Error('서버 내부 오류');
  }
};

export default uploadImage;
