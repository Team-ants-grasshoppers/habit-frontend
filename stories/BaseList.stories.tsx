import type { Meta, StoryObj } from '@storybook/react';
import BaseList from '../src/common/components/ui/BaseList';
import { MemoryRouter } from 'react-router-dom';

// 기본 mock 데이터
const sampleItems = [
  { id: '1', name: '축구 동호회', imageUrl: 'https://via.placeholder.com/100x100' },
  { id: '2', name: '등산 모임', imageUrl: 'https://via.placeholder.com/100x100' },
  { id: '3', name: '스터디 클럽', imageUrl: 'https://via.placeholder.com/100x100' },
];

const meta: Meta<typeof BaseList> = {
  title: 'Components/BaseList',
  component: BaseList,
  decorators: [
    (Story) => (
      // useNavigate 대응을 위해 Router Provider 필요
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BaseList>;

export const Default: Story = {
  args: {
    items: sampleItems,
    routePrefix: '/club',
  },
};

export const Empty: Story = {
  args: {
    items: [],
    routePrefix: '/club',
  },
};
