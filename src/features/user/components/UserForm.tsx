/**
 * @file UserForm.tsx
 * @description Join, Login, UserInfo 공통 폼 컴포넌트 (serverError 반영 버전)
 */

import { useState } from 'react';
import styled from '@emotion/styled';
import InputText from '../../../common/components/ui/InputText';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { validateForm } from '../../../common/components/utils/validateForm';

interface UserFormProps {
  mode: 'login' | 'join' | 'edit';
  fields: ('id' | 'nickname' | 'email' | 'password' | 'confirmPassword')[];
  readonly?: boolean;
  children?: React.ReactNode;
  onSubmit: (formData: Record<string, string>) => void;
  serverError?: string;
}

const fieldLabels: Record<string, string> = {
  id: '아이디',
  nickname: '닉네임',
  email: '이메일',
  password: '비밀번호',
  confirmPassword: '비밀번호 확인',
};

const placeholderText: Record<string, string> = {
  id: '아이디를 입력하세요',
  nickname: '닉네임을 입력하세요',
  email: '이메일을 입력하세요',
  password: '비밀번호를 입력하세요',
  confirmPassword: '비밀번호를 다시 입력하세요',
};

export const UserForm = ({
  mode,
  fields,
  onSubmit,
  serverError,
  readonly = false,
  children,
}: UserFormProps) => {
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: '' })); // 입력할 때 해당 필드 에러 제거
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formState, mode); // 클라이언트 유효성 검사
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    onSubmit(formState);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FieldWrapper key={field}>
          <InputText
            type={
              field === 'email'
                ? 'email'
                : field === 'password' || field === 'confirmPassword'
                  ? 'password'
                  : 'text'
            }
            name={field}
            label={fieldLabels[field]}
            placeholder={placeholderText[field]}
            value={formState[field] || ''}
            readonly={readonly}
            onChange={(value) => handleChange(field, value)}
          />
          {/* 클라이언트 유효성 검사 에러 표시 */}
          {formErrors[field] && <ErrorMessage>{formErrors[field]}</ErrorMessage>}

          {/* 서버 유효성 검사 에러 표시 */}
          {serverError &&
            (mode === 'login'
              ? field === 'password' && <ErrorMessage>{serverError}</ErrorMessage>
              : mode === 'join'
                ? field === 'confirmPassword' && <ErrorMessage>{serverError}</ErrorMessage>
                : null)}
        </FieldWrapper>
      ))}

      {children}
    </FormWrapper>
  );
};

export default UserForm;

// =============== 스타일 ===============
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.3rem;
  margin-top: 0.5rem;
`;
