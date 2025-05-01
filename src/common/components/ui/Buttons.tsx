import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { HTMLAttributes, ReactNode } from 'react';

/**
 * Button 스타일 타입
 */
type ButtonMode = 'base' | 'confirm' | 'cancel' | 'more' | 'text' | 'goback';

/**
 * ButtonUnit props 타입
 */
type ButtonUnitProps = {
  mode: ButtonMode;
  type?: string;
  isModal?: boolean;
  onCloseModal?: () => void;
  onMore?: () => void;
  children: ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

/**
 * 통합 버튼 컴포넌트
 *
 * - 버튼 내부에는 children요소가 필수 포함입니다.
 *
 * - mode에 따라 3가지 유형의 버튼을 지원합니다:
 *   - 'base': 기본 버튼
 *   - 'text': 텍스트형 버튼
 *   - 'more': 리스트 더보기 버튼
 *   - 'confirm': 적용/확인/강조 버튼
 *   - 'cancel': 취소 버튼 - 뒤로가기
 *      - cancel 모드 전용 :
 *        - isModal?: boolean(기본값: false)
 *        - 모달일 경우: isModal={true}
 */
const ButtonUnit = ({
  mode = 'base',
  type,
  isModal = false,
  onCloseModal,
  onMore,
  children,
  ...rest
}: ButtonUnitProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (mode === 'cancel' || mode === 'goback') {
      if (isModal && onCloseModal) {
        onCloseModal();
      } else {
        navigate(-1);
      }
    } else if (mode === 'more' && onMore) {
      onMore();
    }

    // 기타 onClick은 rest로 위임
    rest.onClick?.(new MouseEvent('click') as any);
  };

  const ButtonComponent =
    mode === 'confirm'
      ? ConfirmButton
      : mode === 'cancel'
        ? CancelButton
        : mode === 'goback'
          ? GobackButton
          : mode === 'more'
            ? MoreButton
            : mode === 'text'
              ? TextButton
              : BaseButton;

  return (
    <ButtonComponent onClick={handleClick} {...rest}>
      {children}
    </ButtonComponent>
  );
};

export default ButtonUnit;

// ===================== 🎨 스타일 정의 =====================
const BaseButton = styled.button``;

const TextButton = styled.button`
  background: none;
  border: none;
  border-radius: 0;
  font-size: 1.4rem;
  font-weight: normal;
  padding: 0 0.2rem;
  height: fit-content;
  color: var(--textColor_dark);
  line-height: 1.6;
  border-bottom: 1px solid var(--textColor_dark);
`;

const ConfirmButton = styled.button`
  background: var(--primary);
  &:hover {
    box-shadow: 0 0 0.5rem var(--primary);
  }
`;

const CancelButton = styled.button`
  background: var(--light_gray);
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const GobackButton = styled.button`
  background: url('/icons/left.png') no-repeat center / contain;
  width: 2rem;
  height: 2rem;
  border: none;
  font-size: 0;
`;

const MoreButton = styled.button`
  width: 100%;
  border: var(--border_dark);
  border-radius: 2rem;
  background: var(--primary-light-yellow);
  font-size: 1.8rem;
  transition: all 0.1s ease-in-out;
  box-shadow: 3px 3px 0 0px var(--black);
  &:hover {
    box-shadow: -1px -1px 0 0px var(--black);
  }
`;
