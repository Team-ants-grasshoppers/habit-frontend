import type { Meta, StoryObj } from '@storybook/react';
import ClubDetail from '../src/features/club/components/ClubDetail';

const meta: Meta<typeof ClubDetail> = {
  title: 'Club/ClubDetail',
  component: ClubDetail,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ClubDetail>;

// 샘플 데이터
const admins = [
  {
    id: 'admin1',
    name: '홍길동',
    profileImageUrl: 'https://via.placeholder.com/80x80?text=Admin1',
  },
];

const members = [
  {
    id: 'member1',
    name: '김철수',
    profileImageUrl: 'https://via.placeholder.com/80x80?text=Member1',
  },
  {
    id: 'member2',
    name: '이영희',
    profileImageUrl: 'https://via.placeholder.com/80x80?text=Member2',
  },
];

export const Default: Story = {
  args: {
    imageUrl: 'https://via.placeholder.com/300x150?text=Club+Image',
    name: 'React Study Club',
    description: '이 모임은 리액트를 함께 공부하는 사람들의 모임입니다.',
    admins,
    members,
  },
};
