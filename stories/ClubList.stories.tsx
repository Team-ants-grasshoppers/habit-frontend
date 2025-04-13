import type { Meta, StoryObj } from '@storybook/react';
import ClubList from '../src/features/club/components/ClubList';

const meta: Meta<typeof ClubList> = {
  title: 'Club/ClubList',
  component: ClubList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ClubList>;

// ✅ 샘플 mock 데이터
const sampleClubs = [
  {
    id: 'club1',
    name: '하빗 러닝 클럽',
    imageUrl: 'https://via.placeholder.com/100x100?text=Running',
  },
  {
    id: 'club2',
    name: '개발자 스터디',
    imageUrl: 'https://via.placeholder.com/100x100?text=Dev',
  },
];

// ✅ 기본 스토리
export const Default: Story = {
  args: {
    items: sampleClubs,
  },
};

// ✅ 빈 리스트 테스트용
export const Empty: Story = {
  args: {
    items: [],
  },
};
