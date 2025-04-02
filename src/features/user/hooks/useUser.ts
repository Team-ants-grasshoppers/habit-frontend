import axios from 'axios';

export const loginUser = async (id: string, password: string) => {
  const res = await axios.post(
    '/api/members/login',
    {
      id,
      password,
    },
    {
      withCredentials: true, // httpOnly 쿠키 사용하는 경우
    },
  );

  return res.data; // { token, message } 예상
};
