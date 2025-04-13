import axios from 'axios';

/**
 * 이미지 업로드 API 요청 함수
 *
 * @param file - 업로드할 이미지 파일
 * @returns 업로드 성공 시 메시지 반환
 */
const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('img', file); // 'img'는 서버에서 요구하는 필드명

  try {
    // 이미지 파일을 업로드할 서버로 POST 요청
    const response = await axios.post('/api/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 파일 업로드 시 Content-Type 설정
      },
    });

    // 서버에서 반환한 성공 메시지
    if (response.data.message === '이미지 업로드 성공') {
      return response.data.message; // 성공 메시지 반환
    }

    throw new Error('이미지 업로드 실패');
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw new Error('서버 내부 오류'); // 서버 오류 시 메시지 반환
  }
};

export default uploadImage;
