import React from 'react';
import Modal from '../ui/Modal';
import { INTERESTS } from '../../../constants/interests';

interface InterestModalProps {
  isOpen: boolean;
  selected: string[];
  onChange: (selected: string[]) => void;
  onClose: () => void;
}

const InterestModal: React.FC<InterestModalProps> = ({ isOpen, selected, onChange, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      mode="checkbox"
      title="관심사 설정"
      checkboxItems={INTERESTS}
      checked={selected}
      onCheckedChange={onChange}
      onCancel={onClose}
      onConfirm={onClose}
      confirmText="저장"
      cancelText="취소"
    />
  );
};

export default InterestModal;
