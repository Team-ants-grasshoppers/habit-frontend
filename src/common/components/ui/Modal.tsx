import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import ButtonUnit from './Buttons';

/**
 * 입력 필드의 구성 정보
 */
interface InputField {
  label: string;
  name: string;
  type: 'text' | 'password' | 'email';
}

/**
 * Modal 컴포넌트에 전달되는 props
 */
interface ModalProps {
  isOpen: boolean;
  mode: 'alert' | 'checkbox' | 'input';
  title?: string;
  description?: string;
  checkboxItems?: string[];
  inputFields?: InputField[];
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (data?: any) => void;
  onCancel?: () => void; // "거절" 버튼 클릭 시 실행
  onClose?: () => void; // 닫기(X), ESC 키 등 단순 닫기 처리용 (✅ 추가됨)
  errorText?: string;
  /** checkbox 모드일 때 외부에서 관리되는 선택값 */
  checked?: string[];
  /** checkbox 모드일 때 외부로 선택 변경을 알리는 함수 */
  onCheckedChange?: (checked: string[]) => void;
  /**
   * 모달 하단에 렌더링할 추가 요소 (예: 하단 버튼들)
   * 예: <Modal> 안에 직접 버튼, 링크 등을 넣고 싶을 때 사용
   */
  children?: React.ReactNode;
}

/**
 * 통합형 모달 컴포넌트
 *
 * - mode에 따라 3가지 유형의 모달을 지원합니다:
 *   - 'alert': 확인/취소 버튼만 있는 알림창
 *   - 'checkbox': 체크박스를 통해 복수 항목 선택 (외부에서 상태 관리 필요)
 *   - 'input': 텍스트, 이메일, 비밀번호 등의 입력 필드를 보여주는 입력용 모달
 *
 * - 필수 프랍스:
 *   - isOpen: 모달 열림 여부 (boolean)
 *   - mode: 'alert' | 'checkbox' | 'input'
 *
 * - 선택 프랍스:
 *   - title, description: 모달 제목과 설명 텍스트
 *   - confirmText, cancelText: 확인 및 취소 버튼 텍스트
 *   - onConfirm: 확인 버튼 클릭 시 실행할 콜백 (모드에 따라 전달되는 데이터 달라짐)
 *   - onCancel: 취소(거절) 버튼 클릭 시 실행할 콜백
 *   - onClose: X 버튼 클릭 또는 ESC 입력 시 실행되는 닫기 콜백 (✅ 추가됨)
 *   - errorText: input 모드에서 입력값 하단에 표시할 에러 텍스트
 *
 * - checkbox 모드 전용:
 *   - checkboxItems: 표시할 항목 배열
 *   - checked: 체크된 항목 배열 (외부 상태 필요)
 *   - onCheckedChange: 체크 변경 시 외부로 변경 알림
 *
 * - input 모드 전용:
 *   - inputFields: [{ label, name, type }] 형태로 입력 필드 정의
 *     - name은 고유 키로 formState[name]에 저장됨
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  mode,
  title,
  description,
  checkboxItems = [],
  inputFields = [],
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  onClose,
  errorText,
  checked = [],
  onCheckedChange,
  children,
}) => {
  const [formState, setFormState] = useState<Record<string, string>>({});

  // 모달 상태에 따라 body에 클래스 onModal 추가/제거
  useEffect(() => {
    isOpen ? document.body.classList.add('onModal') : document.body.classList.remove('onModal');
    return () => {
      document.body.classList.remove('onModal');
    };
  }, [isOpen]);

  // ESC 키로 모달 닫기 (✅ onClose로 분리 처리)
  useEffect(() => {
    if (!isOpen || !onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCheckboxChange = (item: string) => {
    if (!onCheckedChange) return;
    const newChecked = checked.includes(item)
      ? checked.filter((i) => i !== item)
      : [...checked, item];
    onCheckedChange(newChecked);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    if (!onConfirm) return;
    if (mode === 'checkbox') onConfirm(checked);
    else if (mode === 'input') onConfirm(formState);
    else onConfirm();
  };

  return (
    <>
      <ModalStyle>
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}

        {mode === 'checkbox' && checkboxItems.length > 0 && (
          <div>
            {checkboxItems.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={checked.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        )}

        {mode === 'input' && inputFields.length > 0 && (
          <div>
            {inputFields.map(({ label, name, type }) => (
              <div key={name}>
                <label>{label}</label>
                <input
                  type={type}
                  value={formState[name] || ''}
                  onChange={(e) => handleInputChange(name, e.target.value)}
                />
              </div>
            ))}
            {errorText && <p>{errorText}</p>}
          </div>
        )}

        {children && <div>{children}</div>}

        {(confirmText && onConfirm) || (cancelText && onCancel) ? (
          <div>
            {cancelText && onCancel && (
              <ButtonUnit mode="cancel" onClick={onCancel}>
                {cancelText}
              </ButtonUnit>
            )}
            {confirmText && onConfirm && (
              <ButtonUnit mode="confirm" onClick={handleConfirm}>
                {confirmText}
              </ButtonUnit>
            )}
          </div>
        ) : null}

        {/* 닫기 버튼 (✅ onClose로 분리 처리) */}
        {onClose && (
          <div>
            <CloseModal onClick={onClose} aria-label="모달 닫기">
              ×
            </CloseModal>
          </div>
        )}
      </ModalStyle>
    </>
  );
};

export default Modal;

const ModalStyle = styled.div`
  position: fixed;
  width: 80%;
  background: white;
  border: var(--border);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 70rem;
  min-width: 32rem;
  padding: 2rem;
  min-height: 30rem;
`;

const CloseModal = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
  border: var(--border);
  font-size: 2rem;
`;
