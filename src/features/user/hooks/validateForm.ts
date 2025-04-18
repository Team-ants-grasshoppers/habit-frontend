/**
 * @file validateForm.ts
 * @description 회원가입, 로그인, 정보수정 공통 유효성 검사 함수
 */

/**
 * 통합 유효성 검사 함수
 * @param data - 입력한 폼 데이터
 * @param mode - 'join' | 'login' | 'edit'
 * @returns 에러 메시지를 담은 객체 (오류 없으면 빈 객체 반환)
 */
export const validateForm = (
  data: Record<string, string>,
  mode: 'join' | 'login' | 'edit',
): Record<string, string> => {
  const errors: Record<string, string> = {};

  // 공통 검사
  if (mode !== 'edit') {
    // 로그인, 회원가입 둘 다 id는 필수
    if (!data.id || !/^[a-zA-Z0-9]{4,20}$/.test(data.id)) {
      errors.id = '아이디는 4~20자의 영문자와 숫자 조합이어야 합니다.';
    }
  }

  if (mode === 'join') {
    // 닉네임 검사
    if (!data.nickname || data.nickname.trim().length < 2 || data.nickname.trim().length > 20) {
      errors.nickname = '닉네임은 2~20자여야 합니다.';
    }

    // 이메일 검사
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = '유효한 이메일 주소를 입력하세요.';
    }

    // 비밀번호 검사
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(data.password || '')) {
      errors.password = '비밀번호는 8자 이상, 문자/숫자/특수문자를 포함해야 합니다.';
    }

    // 비밀번호 확인 검사
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
  }

  if (mode === 'login') {
    // 로그인은 아이디 + 비밀번호만 검사
    if (!data.password) {
      errors.password = '비밀번호를 입력하세요.';
    }
  }

  if (mode === 'edit') {
    // 수정은 닉네임과 비밀번호만 검사할 수 있다
    if (data.nickname && (data.nickname.trim().length < 2 || data.nickname.trim().length > 20)) {
      errors.nickname = '닉네임은 2~20자여야 합니다.';
    }

    if (
      data.password &&
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(data.password)
    ) {
      errors.password = '비밀번호는 8자 이상, 문자/숫자/특수문자를 포함해야 합니다.';
    }
  }

  return errors;
};
