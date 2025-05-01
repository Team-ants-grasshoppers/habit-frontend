/**
 * @file InterestModal.tsx
 * @description 관심사 선택 모달 (InputSelect + constants 연동)
 */

import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import InputSelect from '../ui/InputSelect';
import { INTERESTS } from '../../../constants/interests';
import ButtonUnit from '../ui/Buttons';
import styled from '@emotion/styled';
import { ModalTitle } from '../../style/common.css';

interface Props {
  isOpen: boolean;
  selectedInterests: string[];
  onConfirm: (selected: string[]) => void;
  onCancel: () => void;
}

export const InterestModal = ({ isOpen, selectedInterests, onConfirm, onCancel }: Props) => {
  const [checked, setChecked] = useState<string>(selectedInterests[0] || '');

  useEffect(() => {
    if (isOpen) {
      setChecked(selectedInterests[0] || '');
    }
  }, [isOpen, selectedInterests]);

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <ModalTitle>관심사 선택</ModalTitle>
      <InterestWrapper>
        <InputSelect
          type="radio"
          name="interests"
          options={INTERESTS} // ✅ constants 연결
          selected={[checked]}
          onChange={(value) => setChecked(value[0])} // ✅ 단일 선택을 위해 string 타입 사용
        />
      </InterestWrapper>
      <div className="btn_wrap btn_shadow">
        <div className="btn_cancel">
          <ButtonUnit mode="cancel" onClick={onCancel}>
            취소
          </ButtonUnit>
        </div>
        <div className="btn_submit">
          <ButtonUnit mode="confirm" onClick={() => onConfirm([checked])}>
            확인
          </ButtonUnit>
        </div>
      </div>
    </Modal>
  );
};

export default InterestModal;

const InterestWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    padding: 1rem 4rem;
    border: var(--border_dark);
    border-radius: 1rem;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: var(--primary);
      border: 2px solid var(--primary);
    }
  }
  input:checked + span {
    background: var(--primary);
    border: 2px solid var(--primary);
    color: #fff;
  }
  input[type='radio'] {
    display: none;
  }
`;
