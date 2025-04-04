import React, { useState } from 'react';
import Modal from '../../../common/components/ui/Modal';
import UserForm from './UserForm';
import { loginUser } from '../hooks/useUser';
import { useAppDispatch } from '../../../store/hook';
import { loginSuccess } from '../hooks/userSlice';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await loginUser(userId, password);
      dispatch(
        loginSuccess({
          userId: res.user_id,
          nickname: res.nickname,
          email: res.email,
        }),
      );
      onClose();
    } catch (error: any) {
      setApiError(error.response?.data?.message || '로그인 실패');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="로그인"
      onCancel={onClose}
      onConfirm={handleLogin}
      confirmText="로그인"
      cancelText="닫기"
      errorText={apiError}
      mode="input"
    >
      <UserForm
        onSubmit={handleLogin}
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
            label: '비밀번호',
            name: 'password',
            type: 'password',
            value: password,
            onChange: setPassword,
            required: true,
          },
        ]}
      />
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => console.log('id/pw 찾기 클릭')}>id/pw 찾기</button>
        <button onClick={() => console.log('회원가입 클릭')}>회원가입</button>
      </div>
    </Modal>
  );
};

export default Login;
