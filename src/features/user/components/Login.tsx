import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../common/components/ui/Modal';
import UserForm from './UserForm';
import { loginUser, getMyInfo } from '../hooks/useUser';
import { useAppDispatch } from '../../../store/hook';
import { loginSuccess } from '../hooks/userSlice';
import ButtonUnit from '../../../common/components/ui/Buttons';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [apiError, setApiError] = useState('');

  const handleLogin = async () => {
    try {
      await loginUser(userId, password);
      const profile = await getMyInfo();

      dispatch(
        loginSuccess({
          userId: profile.user_id,
          nickname: profile.nickname,
          email: profile.email,
        }),
      );
      setApiError('');
      onClose();
    } catch (error: any) {
      if (error.message === '필수 항목 누락') {
        setApiError('아이디와 비밀번호를 입력해주세요.');
        return;
      } else {
        setApiError(error.message || '아이디 또는 비밀번호가 잘못되었습니다.');
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      mode="input"
      title="로그인"
      errorText={apiError}
      onCancel={onClose}
      onClose={onClose}
      onConfirm={handleLogin}
      confirmText="로그인"
    >
      <UserForm
        mode="login"
        onSubmit={handleLogin}
        serverError={apiError}
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
        <ButtonUnit mode="text" onClick={() => navigate('/FindIdPassword')}>
          id/pw 찾기
        </ButtonUnit>
        <ButtonUnit mode="base" onClick={() => navigate('/join')}>
          회원가입
        </ButtonUnit>
      </div>
    </Modal>
  );
};

export default Login;
