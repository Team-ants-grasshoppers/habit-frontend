/**
 * @file InterestModal.tsx
 * @description 관심사 선택 모달 (InputSelect + constants 연동)
 */

import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import InputSelect from '../ui/InputSelect';
import { INTERESTS } from '../../../constants/interests';
import ButtonUnit from '../ui/Buttons';

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
      <h2>관심사 선택</h2>
      <InputSelect
        type="radio"
        name="interests"
        options={INTERESTS} // ✅ constants 연결
        selected={[checked]}
        onChange={(value: string[]) => setChecked(value[0])} // ✅ 문자열 단일 선택
      />
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <ButtonUnit mode="cancel" isModal onClick={onCancel}>
          취소
        </ButtonUnit>
        <ButtonUnit mode="confirm" onClick={() => onConfirm([checked])}>
          확인
        </ButtonUnit>
      </div>
    </Modal>
  );
};

export default InterestModal;
