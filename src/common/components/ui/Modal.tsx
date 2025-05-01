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
          <img src="/icons/close.png" alt="닫기 아이콘" />
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
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px); /* ✨ 블러 추가 */
  z-index: 999;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  max-width: 500px;
  min-width: 300px;
  padding: 2.5rem;
  border: var(--border_dark);
  box-shadow: 3px 3px 0 0px var(--black);
  background: #ffffff;
  border-radius: 16px;
  transform: translate(-50%, -50%);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -48%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  .btn_wrap {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 3rem;
    button {
      width: 100%;
    }
  }
`;

const CloseButton = styled.button`
  width: 3rem;
  height: 3rem;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: transparent;
  color: var(--text-main);
  font-size: 1.8rem;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: filter 0.2s;
  }
`;
