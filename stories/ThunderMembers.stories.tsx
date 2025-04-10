import type { Meta, StoryObj } from '@storybook/react';
import ThunderMembers from '../src/features/thunder/components/ThunderMembers';

const meta: Meta<typeof ThunderMembers> = {
  title: 'Thunder/ThunderMembers',
  component: ThunderMembers,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThunderMembers>;

const sampleMembers = [
  {
    memberId: 1,
    nickname: '리더짱',
    profileImageUrl: 'https://via.placeholder.com/80x80?text=Admin',
    isAdmin: true,
  },
  {
    memberId: 2,
    nickname: '참가자1',
    profileImageUrl: 'https://via.placeholder.com/80x80?text=User1',
  },
  {
    memberId: 3,
    nickname: '참가자2',
    profileImageUrl: 'https://via.placeholder.com/80x80?text=User2',
  },
];

export const Default: Story = {
  args: {
    members: sampleMembers,
  },
};

export const WithBanButton: Story = {
  args: {
    members: sampleMembers,
    onBanClick: (id) => alert(`멤버 ${id} 추방됨!`),
  },
};

export const Empty: Story = {
  args: {
    members: [],
  },
};
