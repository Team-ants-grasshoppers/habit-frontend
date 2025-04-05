import React from 'react';
import Modal from '../ui/Modal';
import { REGIONS } from '../../../constants/regions';

interface RegionModalProps {
  isOpen: boolean;
  selected: string[];
  onChange: (selected: string[]) => void;
  onClose: () => void;
}

const RegionModal: React.FC<RegionModalProps> = ({ isOpen, selected, onChange, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      mode="checkbox"
      title="지역 설정"
      checkboxItems={REGIONS}
      checked={selected}
      onCheckedChange={onChange}
      onCancel={onClose}
      onConfirm={onClose}
      confirmText="저장"
      cancelText="취소"
    />
  );
};

export default RegionModal;
