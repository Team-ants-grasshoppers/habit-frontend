/**
 * @file RegionModal.tsx
 * @description 지역 선택 모달 (InputSelect + constants 연동)
 */

import { useState } from 'react';
import Modal from '../ui/Modal';
import InputSelect from '../ui/InputSelect';
import ButtonUnit from '../ui/Buttons';
import { REGIONS } from '../../../constants/regions';

interface Props {
  isOpen: boolean;
  selectedRegions: string[];
  onConfirm: (selected: string[]) => void;
  onCancel: () => void;
}

export const RegionModal = ({ isOpen, selectedRegions, onConfirm, onCancel }: Props) => {
  const [checked, setChecked] = useState<string[]>(selectedRegions);

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <h2>지역 선택</h2>
      <InputSelect
        type="radio"
        name="regions"
        options={REGIONS}
        selected={checked}
        onChange={setChecked}
      />
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <ButtonUnit mode="cancel" onClick={onCancel}>
          취소
        </ButtonUnit>
        <ButtonUnit mode="confirm" onClick={() => onConfirm(checked)}>
          확인
        </ButtonUnit>
      </div>
    </Modal>
  );
};

export default RegionModal;
