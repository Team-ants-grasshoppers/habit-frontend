import { Meta, StoryObj } from '@storybook/react';
import ThunderList from '../src/features/thunder/components/ThunderList';

const meta: Meta<typeof ThunderList> = {
  title: 'Thunder/ThunderList',
  component: ThunderList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThunderList>;

// ✅ 샘플 mock 데이터
const sampleMembers = [
  {
    id: 'member1',
    name: '멤버 1',
    imageUrl: 'https://via.placeholder.com/100x100?text=Member1',
  },
  {
    id: 'member2',
    name: '멤버 2',
    imageUrl: 'https://via.placeholder.com/100x100?text=Member2',
  },
];

// ✅ 기본 스토리
export const Default: Story = {
  args: {
    items: sampleMembers,
    routePrefix: '/thunder', // 예시 URL
  },
};

// ✅ 빈 리스트 테스트용
export const Empty: Story = {
  args: {
    items: [],
    routePrefix: '/thunder',
  },
};
