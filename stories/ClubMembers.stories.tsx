import type { Meta, StoryObj } from '@storybook/react';
import ClubMembers from '../src/features/club/components/ClubMembers';

const meta: Meta<typeof ClubMembers> = {
  title: 'Club/ClubMembers',
  component: ClubMembers,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ClubMembers>;

const sampleAdmins = [
  { id: 'a1', name: '홍길동', profileImageUrl: 'https://via.placeholder.com/80x80?text=Admin' },
];

const sampleMembers = [
  { id: 'm1', name: '김철수', profileImageUrl: 'https://via.placeholder.com/80x80?text=Member1' },
  { id: 'm2', name: '이영희', profileImageUrl: 'https://via.placeholder.com/80x80?text=Member2' },
];

export const Default: Story = {
  args: {
    admins: sampleAdmins,
    members: sampleMembers,
  },
};

export const OnlyAdmins: Story = {
  args: {
    admins: sampleAdmins,
    members: [],
  },
};

export const Empty: Story = {
  args: {
    admins: [],
    members: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          '**[주의] 실제 운영상 이 상태는 발생하지 않아야 하며, 잘못된 사용 예입니다. admins는 필수입니다.',
      },
    },
  },
};
