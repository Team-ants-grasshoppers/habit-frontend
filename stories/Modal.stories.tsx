import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Modal from '../src/common/components/ui/Modal'; // 경로 확인 필요
import ProviderWrapper from './ProviderWrapper'; // ✅ 추가된 Provider
import { useAppSelector, useAppDispatch } from '../src/store/hook';
import { setSelectedItems } from '../src/common/components/ui/hooks/checkboxSelectionSlice';
import { INTERESTS } from '../src/constants/interests';
import { REGIONS } from '../src/constants/regions';

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

// ✅ 공통 템플릿
const Template = (args: any) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Modal
      {...args}
      isOpen={isOpen}
      onCancel={() => setIsOpen(false)}
      onConfirm={(data) => {
        alert(JSON.stringify(data, null, 2));
        setIsOpen(false);
      }}
    />
  );
};

// ✅ Alert 모드
export const Alert: Story = {
  render: () => (
    <Template
      mode="alert"
      title="알림"
      description="이 작업을 진행하시겠습니까?"
      confirmText="확인"
      cancelText="취소"
    />
  ),
};

// ✅ Checkbox 모드 with Redux 상태
const CheckboxWrapper = () => {
  const checked = useAppSelector((state) => state.checkboxSelection.selectedItems);
  const dispatch = useAppDispatch();

  return (
    <Template
      mode="checkbox"
      title="항목 선택"
      checkboxItems={['Apple', 'Banana', 'Cherry']}
      checked={checked}
      onCheckedChange={(newChecked: string[]) => dispatch(setSelectedItems(newChecked))}
      confirmText="확인"
      cancelText="닫기"
    />
  );
};
export const Checkbox: Story = {
  render: () => <CheckboxWrapper />,
};

const CheckboxWithInterests = () => {
  const checked = useAppSelector((state) => state.checkboxSelection.selectedItems);
  const dispatch = useAppDispatch();

  return (
    <Template
      mode="checkbox"
      title="관심사 선택"
      checkboxItems={INTERESTS}
      checked={checked}
      onCheckedChange={(newChecked: string[]) => dispatch(setSelectedItems(newChecked))}
      confirmText="확인"
      cancelText="닫기"
    />
  );
};

const CheckboxWithRegions = () => {
  const checked = useAppSelector((state) => state.checkboxSelection.selectedItems);
  const dispatch = useAppDispatch();

  return (
    <Template
      mode="checkbox"
      title="지역역 선택"
      checkboxItems={REGIONS}
      checked={checked}
      onCheckedChange={(newChecked: string[]) => dispatch(setSelectedItems(newChecked))}
      confirmText="확인"
      cancelText="닫기"
    />
  );
};

export const CheckboxInterests: Story = {
  render: () => <CheckboxWithInterests />,
};

export const CheckboxRegions: Story = {
  render: () => <CheckboxWithRegions />,
};

// ✅ Input 모드
export const Input: Story = {
  render: () => (
    <Template
      mode="input"
      title="정보 입력"
      inputFields={[
        { label: '이메일', name: 'email', type: 'email' },
        { label: '비밀번호', name: 'password', type: 'password' },
      ]}
      confirmText="제출"
      cancelText="취소"
      errorText="입력값을 확인해주세요"
    />
  ),
};
