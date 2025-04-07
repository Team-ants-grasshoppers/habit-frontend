import React, { useEffect, useState } from 'react';

/**
 * 회원정보 입력 폼 컴포넌트
 * Login.tsx, Join.tsx, UserInfo.tsx
 * 아이디, 이메일, 닉네임, 비밀번호, 비밀번호 확인
 * 유효성 검사 - 입력 여부, 중복확인, 비밀번호 일치
 */

interface Field {
  label: string;
  name: string;
  type: 'text' | 'password' | 'email';
  value: string;
  required?: boolean;
  matchWith?: string;
  onChange: (value: string) => void;
  checkDuplicate?: (value: string) => Promise<boolean>;
}

interface UserFormProps {
  fields: Field[];
  onSubmit: (isValid: boolean) => void;
}

const UserForm: React.FC<UserFormProps> = ({ fields, onSubmit }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validHints, setValidHints] = useState<Record<string, string>>({});

  // 중복검사
  const values = fields.map((f) => f.value).join(',');
  useEffect(() => {
    const timeout = setTimeout(() => {
      fields.forEach((field) => {
        if (!field.checkDuplicate) return;

        field.checkDuplicate!(field.value).then((isValid) => {
          setErrors((prev) => ({
            ...prev,
            [field.name]: isValid ? '' : `중복된 ${field.label}입니다.`,
          }));
          setValidHints((prev) => ({
            ...prev,
            [field.name]: isValid ? `사용 가능한 ${field.label}입니다!` : '',
          }));
        });
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [values]);

  // 유효성 검사
  useEffect(() => {
    const isValid = validate();
    onSubmit(isValid);
  }, [values]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    fields.forEach((f) => {
      if (f.required && !f.value) {
        newErrors[f.name] = `${f.label}을(를) 입력해주세요`;
      }
      if (f.matchWith) {
        const matchField = fields.find((other) => other.name === f.matchWith);
        if (matchField && f.value !== matchField.value) {
          newErrors[f.name] = `비밀번호가 일치하지 않습니다`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            placeholder={field.label}
            name={field.name}
            type={field.type}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          />
          {errors[field.name] && <p style={{ color: 'red' }}>{errors[field.name]}</p>}
          {!errors[field.name] && validHints[field.name] && (
            <p style={{ color: 'green' }}>{validHints[field.name]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserForm;
