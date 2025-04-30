import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import InputSelect from '../ui/InputSelect';
import ButtonUnit from '../ui/Buttons';
import { REGIONS } from '../../../constants/regions';

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
      <h2>지역 선택</h2>
      <InputSelect
        type="radio"
        name="regions"
        options={REGIONS}
        selected={[checked]}
        onChange={(value: string[]) => setChecked(value[0])} // ✅ 문자열 단일 선택
      />
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <ButtonUnit mode="cancel" onClick={onCancel}>
          취소
        </ButtonUnit>
        <ButtonUnit mode="confirm" onClick={() => onConfirm([checked])}>
          확인
        </ButtonUnit>
      </div>
    </Modal>
  );
};

export default RegionModal;
