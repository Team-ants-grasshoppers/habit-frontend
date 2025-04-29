/**
 * @file RegionModal.tsx
 * @description 지역 선택 모달 (InputSelect + constants 연동)
 */

import { useState } from 'react';
import Modal from '../ui/Modal';
import InputSelect from '../ui/InputSelect';
import ButtonUnit from '../ui/Buttons';
import { REGIONS } from '../../../constants/regions';
import { ModalTitle } from '../../style/common.css';
import styled from '@emotion/styled';

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
      <ModalTitle>지역 선택</ModalTitle>
      <RegionWrapper>
        <InputSelect
          type="radio"
          name="regions"
          options={REGIONS}
          selected={checked}
          onChange={setChecked}
        />
      </RegionWrapper>
      <div className="btn_wrap">
        <div className="btn_cancel">
          <ButtonUnit mode="cancel" onClick={onCancel}>
            취소
          </ButtonUnit>
        </div>
        <div className="btn_submit">
          <ButtonUnit mode="confirm" onClick={() => onConfirm(checked)}>
            확인
          </ButtonUnit>
        </div>
      </div>
    </Modal>
  );
};

export default RegionModal;

const RegionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  label {
    display: block;
  }
  span {
    padding: 1rem 4rem;
    display: block;
    width: 100%;
    text-align: center;
    border: 1px solid #fff;
    border-radius: 1rem;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: var(--primary);
      border: 1px solid var(--primary);
    }
  }
  input:checked + span {
    background: var(--primary);
    border: 1px solid var(--primary);
    color: #fff;
  }
  input[type='radio'] {
    display: none;
  }
`;
