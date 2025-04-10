import type { Meta, StoryObj } from '@storybook/react';
import ClubRequest from '../src/features/club/components/ClubRequest';

const meta: Meta<typeof ClubRequest> = {
  title: 'Club/ClubRequest',
  component: ClubRequest,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ClubRequest>;

const sampleUsers = [
  {
    id: 'user1',
    name: '김하늘',
    profileImageUrl: 'https://via.placeholder.com/80x80?text=User1',
  },
  {
    id: 'user2',
    name: '이바다',
    profileImageUrl: 'https://via.placeholder.com/80x80?text=User2',
  },
];

export const Default: Story = {
  args: {
    pendingUsers: sampleUsers,
    onApprove: (userId) => alert(`가입 승인됨: ${userId}`),
  },
};
