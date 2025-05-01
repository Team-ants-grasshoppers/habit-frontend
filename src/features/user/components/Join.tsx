import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinUser } from '../hooks/useUser';
import UserForm from './UserForm';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { FormWrapper, MainTitle, TitleArea } from '../../../common/style/common.css';

const Join = () => {
  const navigate = useNavigate();
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
      await joinUser({ userId: id, nickname, email, password });
      alert('회원가입 성공! 메인 페이지로 이동합니다.');
      navigate('/');
    } catch (error: any) {
      console.error(error);
      setApiError(error.response?.data?.error || '회원가입에 실패했습니다.');
    }
  };

  return (
    <>
      <TitleArea>
        <ButtonUnit mode="goback">뒤로가기</ButtonUnit>
        <MainTitle>회원가입</MainTitle>
      </TitleArea>
      <FormWrapper>
        <UserForm
          mode="join"
          serverError={apiError}
          onSubmit={handleJoin}
          fields={['id', 'nickname', 'email', 'password', 'confirmPassword']}
        >
          <div className="btn_shadow">
            <ButtonUnit mode="confirm" type="submit">
              회원가입
            </ButtonUnit>
          </div>
        </UserForm>
      </FormWrapper>
    </>
  );
};

export default Join;
