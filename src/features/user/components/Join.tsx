import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hook';
import { joinUser } from '../hooks/useUser';
import { loginSuccess } from '../hooks/userSlice';
import UserForm from './UserForm';
import ButtonUnit from '../../../common/components/ui/Buttons';

const Join = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [apiError, setApiError] = useState('');

  const handleJoin = async (formData: Record<string, string>) => {
    const { id, nickname, email, password, confirmPassword } = formData;

    if (!id || !nickname || !email || !password || !confirmPassword) {
      setApiError('모든 항목을 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setApiError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await joinUser({ userId: id, nickname, email, password });
      dispatch(
        loginSuccess({
          userId: res.user_id,
          nickname: res.nickname,
          email: res.email,
        }),
      );
      alert('회원가입 성공! 메인 페이지로 이동합니다.');
      navigate('/');
    } catch (error: any) {
      setApiError(error.response?.data?.error || '회원가입에 실패했습니다.');
    }
  };

  return (
    <main>
      <h1>회원가입</h1>
      <UserForm
        mode="join"
        serverError={apiError}
        onSubmit={handleJoin}
        fields={['id', 'nickname', 'email', 'password', 'confirmPassword']}
      >
        <ButtonUnit mode="confirm" type="submit">
          회원가입
        </ButtonUnit>
      </UserForm>
    </main>
  );
};

export default Join;
