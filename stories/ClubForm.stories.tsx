import type { Meta, StoryObj } from '@storybook/react';
import ClubForm from '../src/features/club/components/ClubForm';

const meta: Meta<typeof ClubForm> = {
  title: 'Club/ClubForm',
  component: ClubForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ClubForm>;

const noop = () => {}; // 빈 함수

export const CreateMode: Story = {
  args: {
    mode: 'create',
    name: '',
    description: '',
    category: '',
    region: '',
    onNameChange: noop,
    onImageChange: noop,
    onDescriptionChange: noop,
    onCategoryChange: noop,
    onRegionChange: noop,
    onSubmit: (data) => alert(`제출 데이터: ${JSON.stringify(data, null, 2)}`),
  },
};

export const EditMode: Story = {
  args: {
    mode: 'edit',
    name: 'React 모임',
    description: '리액트를 공부하는 개발자 모임입니다.',
    imageUrl: 'https://via.placeholder.com/300x150?text=Club',
    category: '개발',
    region: '서울 강남구',
    onNameChange: noop,
    onImageChange: noop,
    onDescriptionChange: noop,
    onCategoryChange: noop,
    onRegionChange: noop,
    onSubmit: (data) => alert(`수정된 데이터: ${JSON.stringify(data, null, 2)}`),
  },
};
