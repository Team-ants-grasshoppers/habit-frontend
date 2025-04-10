import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { HTMLAttributes, ReactNode } from 'react';

/**
 * Button 스타일 타입
 */
type ButtonMode = 'base' | 'confirm' | 'cancel' | 'more' | 'text';

/**
 * ButtonUnit props 타입
 */
type ButtonUnitProps = {
  mode: ButtonMode;
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
  isModal = false,
  onCloseModal,
  onMore,
  children,
  ...rest
}: ButtonUnitProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (mode === 'cancel') {
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
  padding: 0 0.2rem;
  height: fit-content;
  color: var(--textColor_dark);
  line-height: 1.6;
  border-bottom: 1px solid var(--textColor_dark);
`;

const ConfirmButton = styled.button`
  background: var(--black, #000);
  color: #fff;
  border: none;
`;

const CancelButton = styled.button`
  background: var(--light_gray);
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const MoreButton = styled.button`
  width: 100%;
  border: 1px solid var(--black);
  background: #fff;
  font-size: 1.4rem;
`;
