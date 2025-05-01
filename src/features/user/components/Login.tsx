import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../common/components/ui/Modal';
import UserForm from './UserForm';
import { loginUser, getMyInfo } from '../hooks/useUser';
import { useAppDispatch } from '../../../store/hook';
import { loginSuccess } from '../hooks/userSlice';
import ButtonUnit from '../../../common/components/ui/Buttons';
import styled from '@emotion/styled';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [apiError, setApiError] = useState('');

  const handleLogin = async (formData: Record<string, string>) => {
    const { id, password } = formData;

    if (!id || !password) {
      setApiError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      await loginUser(id, password);
      const profile = await getMyInfo();

      dispatch(
        loginSuccess({
          userId: profile.user_id,
          nickname: profile.nickname,
          email: profile.email,
          userProfile: profile.profileImageUrl || null,
        }),
      );
      setApiError('');
      onClose();
    } catch (error: any) {
      setApiError(error.response?.data?.error || '아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <UserForm
          mode="login"
          fields={['id', 'password']}
          onSubmit={handleLogin}
          serverError={apiError}
        >
          <div className="btn_shadow">
            <ButtonUnit mode="confirm" type="submit">
              로그인
            </ButtonUnit>
          </div>
        </UserForm>

        <LoginBtnWrapper>
          <ButtonUnit mode="base" onClick={() => navigate('/FindIdPassword')}>
            id/pw 찾기
          </ButtonUnit>
          <ButtonUnit
            mode="base"
            onClick={() => {
              onClose();
              navigate('/join');
            }}
          >
            회원가입
          </ButtonUnit>
        </LoginBtnWrapper>
      </Modal>
    </>
  );
};

export default Login;

const LoginBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;

  button {
    border: 0;
    font-size: 1.6rem;
    line-height: 1.2;
    border-radius: 0;
    padding: 0 0.2rem;
    height: auto;
    border-bottom: 2px solid #fff;
    &:hover {
      border-bottom: var(--border_dark);
    }
  }
`;
