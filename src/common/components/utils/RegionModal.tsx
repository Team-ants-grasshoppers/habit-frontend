import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import InputSelect from '../ui/InputSelect';
import ButtonUnit from '../ui/Buttons';
import { REGIONS } from '../../../constants/regions';
import { ModalTitle } from '../../style/common.css';
import styled from '@emotion/styled';

interface Props {
  isOpen: boolean;
  selectedRegions: string[]; // formData.region이 배열이 아닌 경우에도 유지
  onConfirm: (selected: string[]) => void;
  onCancel: () => void;
}

export const RegionModal = ({ isOpen, selectedRegions, onConfirm, onCancel }: Props) => {
  // ✅ 단일 선택을 위해 string 타입 사용
  const [checked, setChecked] = useState<string>(selectedRegions[0] || '');

  // ✅ 모달이 열릴 때마다 최신 선택값으로 초기화
  useEffect(() => {
    if (isOpen) {
      setChecked(selectedRegions[0] || '');
    }
  }, [isOpen, selectedRegions]);

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <ModalTitle>지역 선택</ModalTitle>
      <RegionWrapper>
        <InputSelect
          type="radio"
          name="regions"
          options={REGIONS}
          selected={[checked]}
          onChange={(value) => setChecked(value[0])}
        />
      </RegionWrapper>
      <div className="btn_wrap">
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
