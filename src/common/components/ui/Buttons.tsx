import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled/macro';

// 모달 열기 버튼
interface ModalButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}
export const ModalButton: React.FC<ModalButtonProps> = ({ onClick, children }) => {
  return <DefaultBtn onClick={onClick}>{children}</DefaultBtn>;
};

// 확인/제출 (Submit) 버튼
interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export const SubmitButton: React.FC<SubmitButtonProps> = ({ children, ...rest }) => {
  return (
    <DefaultBtn type="submit" {...rest}>
      {children}
    </DefaultBtn>
  );
};

// 페이지 이동 버튼
interface NavigationButtonProps {
  to: string;
  children: React.ReactNode;
}
export const NavigationButton: React.FC<NavigationButtonProps> = ({ to, children }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(to);

  return <DefaultBtn onClick={handleClick}>{children}</DefaultBtn>;
};

// 삭제,추방,거부,탈퇴 버튼
export const DeleteButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <DefaultBtn {...props}>{props.children}</DefaultBtn>;
};

export default {
  ModalButton,
  SubmitButton,
  NavigationButton,
  DeleteButton,
};

export const DefaultBtn = styled.button`
  border: var(--border);
  padding: 0.5rem 2rem;
`;
