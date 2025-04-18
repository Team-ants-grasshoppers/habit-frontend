import styled from '@emotion/styled';
import { ReactNode, useEffect } from 'react';

/**
 * Modal 컴포넌트에 전달되는 props 타입
 */
interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

/**
 * 모달 레이아웃 컴포넌트
 * - 열림 여부(isOpen)와 닫기 콜백(onClose)만 관리
 */

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // 모달 상태에 따라 body에 클래스 onModal(스크롤 방지) 추가/제거
  useEffect(() => {
    isOpen ? document.body.classList.add('onModal') : document.body.classList.remove('onModal');
    return () => {
      document.body.classList.remove('onModal');
    };
  }, [isOpen]);

  // esc 키로 모달 닫기
  useEffect(() => {
    if (!isOpen || !onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        {children}
        <CloseButton onClick={onClose} aria-label="모달 닫기">
          ×
        </CloseButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;

// ================= 스타일 ==================

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  max-width: 60rem;
  min-width: 32rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  font-size: 2rem;
  border: none;
  cursor: pointer;
`;
