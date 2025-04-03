import axios from 'axios';

// 로그인
export const loginUser = async (userId: string, password: string) => {
  const res = await axios.post('/members/login', {
    user_id: userId,
    password,
  });
  return res.data;
};

// 회원가입
export const joinUser = async ({
  userId,
  nickname,
  email,
  password,
}: {
  userId: string;
  nickname: string;
  email: string;
  password: string;
}) => {
  const res = await axios.post('/members/join', {
    user_id: userId,
    nickname,
    email,
    password,
  });
  return res.data;
};

// 아이디 중복 확인
export const checkUserIdDuplicate = async (userId: string) => {
  const res = await axios.get(`/members/check-id`, {
    params: { userId },
  });
  return !res.data.exists;
};

// 이메일 중복 확인
export const checkEmailDuplicate = async (email: string) => {
  const res = await axios.get(`/members/check-email`, {
    params: { email },
  });
  return !res.data.exists;
};

// 현재 로그인된 사용자 정보 가져오기
export const getMyInfo = async () => {
  const res = await axios.get('/members/profile');
  return res.data;
};

// 회원 정보 수정 (닉네임, 관심사 등)
export const updateMyInfo = async (data: {
  nickname?: string;
  email?: string;
  region?: string;
  interests?: string[];
}) => {
  const res = await axios.patch('/members/profile', data);
  return res.data;
};

// 로그아웃
export const logoutUser = async () => {
  const res = await axios.post('/members/logout');
  return res.data;
};
