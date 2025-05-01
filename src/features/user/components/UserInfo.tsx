import React, { useState } from 'react';
import UserForm from './UserForm';
import { validateForm } from '../hooks/validateForm';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { FormWrapper } from '../../../common/style/common.css';

interface UserInfoProps {
  initialData: {
    userId: string;
    nickname: string;
    email: string;
  };
  onSubmit: (data: { nickname?: string; email?: string; password?: string }) => Promise<any>;
}

const UserInfo: React.FC<UserInfoProps> = ({ initialData, onSubmit }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formState, setFormState] = useState({
    nickname: initialData.nickname,
    email: initialData.email,
    password: '',
    confirmPassword: '',
    apiError: '',
    successMsg: '',
  });

  const handleSubmit = async () => {
    const errors = validateForm(formState, 'edit');
    if (Object.keys(errors).length > 0) {
      setFormState((prev) => ({
        ...prev,
        apiError: '유효성 검사 실패',
        successMsg: '',
      }));
      return;
    }

    if (formState.password && formState.password !== formState.confirmPassword) {
      setFormState((prev) => ({
        ...prev,
        apiError: '비밀번호가 일치하지 않습니다.',
        successMsg: '',
      }));
      return;
    }

    const updateData: { nickname?: string; email?: string; password?: string } = {};
    if (formState.nickname !== initialData.nickname) updateData.nickname = formState.nickname;
    if (formState.email !== initialData.email) updateData.email = formState.email;
    if (formState.password) updateData.password = formState.password;

    try {
      await onSubmit(updateData);
      setFormState((prev) => ({
        ...prev,
        apiError: '',
        successMsg: '정보가 성공적으로 수정되었습니다!',
        password: '',
        confirmPassword: '',
      }));
      setIsEditMode(false);
    } catch (error: any) {
      setFormState((prev) => ({
        ...prev,
        apiError: error.response?.data?.error || '수정에 실패했습니다.',
        successMsg: '',
      }));
    }
  };

  if (!isEditMode) {
    return (
      <div>
        <p>
          <strong>닉네임</strong>
          {formState.nickname}
        </p>
        <p>
          <strong>이메일</strong>
          {formState.email}
        </p>
        <div className="btn_shadow">
          <ButtonUnit mode="confirm" onClick={() => setIsEditMode(true)}>
            수정
          </ButtonUnit>
        </div>
      </div>
    );
  }

  return (
    <FormWrapper>
      {formState.apiError && <p style={{ color: 'red' }}>{formState.apiError}</p>}
      {formState.successMsg && <p style={{ color: 'green' }}>{formState.successMsg}</p>}

      <UserForm
        mode="edit"
        fields={['nickname', 'email', 'password', 'confirmPassword']}
        onSubmit={handleSubmit}
        serverError={formState.apiError}
      >
        <div className="btn_shadow">
          <ButtonUnit mode="confirm" type="submit">
            수정 완료
          </ButtonUnit>
        </div>
      </UserForm>
    </FormWrapper>
  );
};

export default UserInfo;
