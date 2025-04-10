import type { Meta, StoryObj } from '@storybook/react';
import ThunderForm from '../src/features/thunder/components/ThunderForm';

const meta: Meta<typeof ThunderForm> = {
  title: 'Thunder/ThunderForm',
  component: ThunderForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThunderForm>;

export const CreateMode: Story = {
  args: {
    mode: 'create',
  },
};

export const EditMode: Story = {
  args: {
    mode: 'edit',
    initialData: {
      title: '밤마실 번개',
      description: '야경 보러 남산 한 바퀴 돌아요 🌃',
      region: { city: '서울', district: '중구' },
      date: '2024-05-01',
      hour: 20,
      minute: 0,
    },
  },
};
