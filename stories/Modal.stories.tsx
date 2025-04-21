import type { Meta, StoryObj } from '@storybook/react';
import Modal from '../src/common/components/ui/Modal'; // 경로 확인 필요
import ProviderWrapper from './ProviderWrapper'; // ✅ 추가된 Provider
import { useState } from 'react';
import ButtonUnit from '../src/common/components/ui/Buttons';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ProviderWrapper>
        <Story />
      </ProviderWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ✅ 공통 템플릿 (onClose 추가됨)
const Template = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        alert('🛑 닫기(X 또는 ESC)');
        setIsOpen(false);
      }}
    >
      {children}
    </Modal>
  );
};

// ✅ Alert 모드
export const Alert: Story = {
  render: () => (
    <Template>
      <h2>알림</h2>
      <p>이 작업을 진행하시겠습니까?</p>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <ButtonUnit mode="confirm" onClick={() => alert('확인')}>
          확인
        </ButtonUnit>
        <ButtonUnit mode="cancel" onClick={() => alert('취소')}>
          취소
        </ButtonUnit>
      </div>
    </Template>
  ),
};
