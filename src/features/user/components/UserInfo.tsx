import React, { useState } from 'react';
import UserForm from './UserForm';

/**
 * 회원정보 확인 및 수정 컴포넌트
 * 아이디 수정불가 (읽기 전용)
 */

interface UserInfoProps {
  initialData: {
    userId: string;
    nickname: string;
    email: string;
  };
  onSubmit: (data: { nickname?: string; email?: string; password?: string }) => Promise<any>;
  checkEmailDuplicate: (email: string) => Promise<boolean>;
}

const UserInfo: React.FC<UserInfoProps> = ({ initialData, onSubmit, checkEmailDuplicate }) => {
  const [nickname, setNickname] = useState(initialData.nickname);
  const [email, setEmail] = useState(initialData.email);
  const [password, setPassword] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [apiError, setApiError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async () => {
    if (password && password !== pwConfirm) {
      setApiError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const updateData: any = { nickname };
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    try {
      await onSubmit(updateData);
      setSuccessMsg('정보가 성공적으로 수정되었습니다!');
      setApiError('');
    } catch (error: any) {
      setApiError(error.response?.data?.message || '수정에 실패했습니다.');
    }
  };

  return (
    <div>
      {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}

      <UserForm
        submitLabel="수정하기"
        onSubmit={handleSubmit}
        fields={[
          {
            label: '아이디',
            name: 'userId',
            type: 'text',
            value: initialData.userId,
            onChange: () => {}, // 수정 불가
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
            label: '새 비밀번호',
            name: 'password',
            type: 'password',
            value: password,
            onChange: setPassword,
          },
          {
            label: '비밀번호 확인',
            name: 'pwConfirm',
            type: 'password',
            value: pwConfirm,
            onChange: setPwConfirm,
            matchWith: 'password',
          },
        ]}
      />
    </div>
  );
};

export default UserInfo;
