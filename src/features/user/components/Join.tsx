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

  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !nickname || !email || !password || !pwConfirm) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    if (password !== pwConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await joinUser({ userId, nickname, email, password });
      dispatch(
        loginSuccess({
          userId: res.user_id,
          nickname: res.nickname,
          email: res.email,
        }),
      );
      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      navigate('/');
    } catch (error: any) {
      setError(error.response?.data?.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <UserForm
        mode="join"
        serverError={error}
        onSubmit={() => {}}
        fields={[
          {
            label: '아이디',
            name: 'userId',
            type: 'text',
            value: userId,
            onChange: setUserId,
            required: true,
          },
          {
            label: '닉네임',
            name: 'nickname',
            type: 'text',
            value: nickname,
            onChange: setNickname,
            required: true,
          },
          {
            label: '이메일',
            name: 'email',
            type: 'email',
            value: email,
            onChange: setEmail,
            required: true,
          },
          {
            label: '비밀번호',
            name: 'password',
            type: 'password',
            value: password,
            onChange: setPassword,
            required: true,
          },
          {
            label: '비밀번호 확인',
            name: 'pwConfirm',
            type: 'password',
            value: pwConfirm,
            onChange: setPwConfirm,
            required: true,
          },
        ]}
      />

      <div style={{ marginTop: '2rem' }}>
        <ButtonUnit mode="base">회원 가입 완료하기</ButtonUnit>
      </div>
    </form>
  );
};

export default Join;
