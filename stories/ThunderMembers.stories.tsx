import type { Meta, StoryObj } from '@storybook/react';
import ThunderMembers from '../src/features/thunder/components/ThunderMembers';

const meta: Meta<typeof ThunderMembers> = {
  title: 'Thunder/ThunderMembers',
  component: ThunderMembers,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThunderMembers>;

// 운영자는 리스트에 포함되지 않으므로 제거
const sampleMembers = [
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
    isViewerAdmin: false, // 일반 사용자 → 추방 버튼 안 보임
  },
};

export const WithBanButton: Story = {
  args: {
    members: sampleMembers,
    isViewerAdmin: true, // 운영자 → 추방 버튼 보임
    onBanClick: (id) => alert(`멤버 ${id} 추방됨!`),
  },
};

export const Empty: Story = {
  args: {
    members: [],
    isViewerAdmin: true,
  },
};
