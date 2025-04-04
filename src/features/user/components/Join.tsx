import { useState } from 'react';
import UserForm from '../components/UserForm';
import { checkEmailDuplicate, checkUserIdDuplicate, joinUser } from '../hooks/useUser';
import { useAppDispatch } from '../../../store/hook';
import { loginSuccess } from '../hooks/userSlice';

const Join = () => {
  const dispatch = useAppDispatch();

  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [apiError, setApiError] = useState('');

  const handleJoin = async () => {
    try {
      const res = await joinUser({ userId, nickname, email, password });
      dispatch(
        loginSuccess({
          userId: res.user_id,
          nickname: res.nickname,
          email: res.email,
        }),
      );
      alert('회원가입 성공!');
    } catch (error: any) {
      setApiError(error.response?.data?.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <div>
      {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
      <UserForm
        submitLabel="가입하기"
        onSubmit={handleJoin}
        fields={[
          {
            label: '아이디',
            name: 'userId',
            type: 'text',
            value: userId,
            onChange: setUserId,
            required: true,
            checkDuplicate: checkUserIdDuplicate,
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
            checkDuplicate: checkEmailDuplicate,
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
            matchWith: 'password',
          },
        ]}
      />
    </div>
  );
};

export default Join;
