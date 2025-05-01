import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 쿠키 인증 방식에 꼭 필요
});

// 공통 에러 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert('로그인이 필요합니다.');
      window.location.href = '/';
    }
    if (error.response?.status === 403) {
      alert('접근 권한이 없습니다.');
    }
    if (error.response?.status >= 500) {
      alert('서버 오류가 발생했습니다.');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
