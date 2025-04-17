/**
 * @file InterestModal.tsx
 * @description 관심사 선택 모달 (InputSelect + constants 연동)
 */

import { useState } from 'react';
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
  const [checked, setChecked] = useState<string[]>(selectedInterests);

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <h2>관심사 선택</h2>
      <InputSelect
        type="checkbox"
        name="interests"
        options={INTERESTS} // ✅ constants 연결
        selected={checked}
        onChange={setChecked}
      />
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <ButtonUnit mode="cancel" isModal onClick={onCancel}>
          취소
        </ButtonUnit>
        <ButtonUnit mode="confirm" onClick={() => onConfirm(checked)}>
          확인
        </ButtonUnit>
      </div>
    </Modal>
  );
};

export default InterestModal;
