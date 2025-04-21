import axios from '../../../lib/axios';
import { isAxiosError } from 'axios';

/**
 * 로그인 요청
 * @param userId - 사용자 아이디
 * @param password - 사용자 비밀번호
 * @returns 로그인 성공 시 토큰 및 메시지 반환
 * @throws 로그인 실패 시 에러 메시지
 */
export const loginUser = async (
  userId: string,
  password: string,
): Promise<{
  token: string;
  message: string;
}> => {
  try {
    const res = await axios.post('/auth/login', {
      user_id: userId,
      password,
    });
    return res.data;
  } catch (error: any) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error('로그인 요청 중 오류가 발생했습니다.');
  }
};

/**
 * 회원가입 요청
 * @param payload - 회원가입에 필요한 유저 정보
 * @returns 회원가입 성공 시 메시지 반환
 */
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
  const res = await axios.post('/auth/join', {
    user_id: userId,
    nickname,
    email,
    password,
  });
  return res.data;
};

/**
 * 현재 로그인된 사용자 정보 조회
 * @returns 사용자 정보 객체 반환
 * @throws 인증되지 않은 경우 에러 메시지
 */
export const getMyInfo = async (): Promise<{
  user_id: string;
  nickname: string;
  email: string;
  region: string;
  profile_media_id: string;
}> => {
  try {
    const res = await axios.get('/api/members/profile');
    return res.data;
  } catch (error: any) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error('회원 정보 조회 중 오류가 발생했습니다.');
  }
};

/**
 * 회원 정보 수정 요청
 * @param data - 수정할 사용자 정보 (닉네임, 비밀번호, 이미지 ID 등)
 * @returns 수정 성공 시 메시지 반환
 * @throws 비밀번호 불일치, 닉네임 중복 등의 에러 메시지
 */
export const updateMyInfo = async (data: {
  nickname?: string;
  profile_image?: string;
  password?: string;
  id: string;
}): Promise<{
  message: string;
}> => {
  try {
    const res = await axios.put('/api/members/profile', data);
    return res.data;
  } catch (error: any) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error('회원정보 수정 중 오류가 발생했습니다.');
  }
};

/**
 * 로그아웃 요청
 * @returns 로그아웃 성공 메시지 반환
 * @throws 인증되지 않은 경우 에러 메시지
 */
export const logoutUser = async (): Promise<{
  message: string;
}> => {
  try {
    const res = await axios.post('/auth/logout');
    return res.data;
  } catch (error: any) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error('로그아웃 요청 중 오류가 발생했습니다.');
  }
};

/**
 * 회원 탈퇴 요청
 * @param data - 사용자 아이디 및 비밀번호
 * @returns 탈퇴된 사용자 정보 반환
 * @throws 비밀번호 불일치 또는 계정 없음 등 에러 메시지
 */
export const withdrawUser = async (data: {
  user_id: string;
  password: string;
}): Promise<{
  user_id: string;
  password: string;
}> => {
  try {
    const res = await axios.delete('/auth/members', { data });
    return res.data;
  } catch (error: any) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error('회원 탈퇴 중 오류가 발생했습니다.');
  }
};
