import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 실제 운영 주소로 나중에 변경하면 됨
  withCredentials: true, // 쿠키 인증 방식에 꼭 필요
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
