import React, { useState } from 'react';
import Modal from '../../../common/components/ui/Modal';
import { loginUser } from '../../../features/user/hooks/useUser';
import { useAppDispatch } from '../../../store/hook';
import { loginSuccess } from '../../../features/user/hooks/userSlice';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');
  const [apiError, setApiError] = useState('');

  const handleLogin = async () => {
    let hasError = false;

    if (!id) {
      setIdError('아이디를 입력해주세요');
      hasError = true;
    } else {
      setIdError('');
    }

    if (!password) {
      setPwError('비밀번호를 입력해주세요');
      hasError = true;
    } else {
      setPwError('');
    }

    if (hasError) return;

    try {
      const res = await loginUser(id, password);
      // 예시: { user_id, nickname, email } 구조라고 가정
      dispatch(
        loginSuccess({
          userId: res.user_id,
          nickname: res.nickname,
          email: res.email,
        }),
      );

      onClose(); // 모달 닫기
    } catch (error: any) {
      console.error('로그인 실패:', error);
      setApiError(error.response?.data?.message || '로그인에 실패했습니다.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      mode="input"
      title="로그인"
      inputFields={[
        { label: idError || '아이디', name: 'id', type: 'text' },
        { label: pwError || '비밀번호', name: 'password', type: 'password' },
      ]}
      confirmText="로그인"
      cancelText="닫기"
      errorText={apiError}
      onCancel={onClose}
      onConfirm={(form) => {
        setId(form.id || '');
        setPassword(form.password || '');
        handleLogin();
      }}
    >
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => console.log('id/pw 찾기 클릭')}>id/pw 찾기</button>
        <button onClick={() => console.log('회원가입 클릭')}>회원가입</button>
      </div>
    </Modal>
  );
};

export default Login;
