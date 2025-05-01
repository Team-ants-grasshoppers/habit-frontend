import { useState } from 'react';
import styled from '@emotion/styled';
import InputText from '../../../common/components/ui/InputText';
import { validateForm } from '../hooks/validateForm';

interface UserFormProps<T extends Record<string, any>> {
  mode: 'login' | 'join' | 'edit';
  fields: (keyof T)[];
  formState: T;
  setFormState: React.Dispatch<React.SetStateAction<T>>;
  onSubmit: (formData: T) => void;
  readonly?: boolean;
  children?: React.ReactNode;
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

export const UserForm = <T extends Record<string, any>>({
  mode,
  fields,
  formState,
  setFormState,
  onSubmit,
  serverError,
  readonly = false,
  children,
}: UserFormProps<T>) => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formState, mode);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    onSubmit(formState);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FieldWrapper key={String(field)}>
          <InputText
            type={
              field === 'email'
                ? 'email'
                : field === 'password' || field === 'confirmPassword'
                  ? 'password'
                  : 'text'
            }
            name={String(field)}
            label={fieldLabels[field as string]}
            placeholder={placeholderText[field as string]}
            value={formState[field] || ''}
            readonly={readonly}
            onChange={(value) => handleChange(String(field), value)}
          />
          {formErrors[field as string] && (
            <ErrorMessage>{formErrors[field as string]}</ErrorMessage>
          )}
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

// 스타일
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
  color: var(--error);
  font-size: 1.3rem;
`;
