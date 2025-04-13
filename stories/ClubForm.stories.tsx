import type { Meta, StoryObj } from '@storybook/react';
import ClubForm from '../src/features/club/components/ClubForm';

const meta: Meta<typeof ClubForm> = {
  title: 'Club/ClubForm',
  component: ClubForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ClubForm>;

const sampleAdmins = [
  {
    id: 'admin1',
    name: '홍길동',
    profileImageUrl: 'https://via.placeholder.com/80x80?text=Admin',
  },
];

const sampleMembers = [
  {
    id: 'm1',
    name: '김철수',
    profileImageUrl: 'https://via.placeholder.com/80x80?text=Member1',
  },
  {
    id: 'm2',
    name: '이영희',
    profileImageUrl: 'https://via.placeholder.com/80x80?text=Member2',
  },
];

// ✅ 공통 업로드 함수 정의 (스토리북용 mock 처리)
const mockImageUpload = async (file: File): Promise<string> => {
  console.log('스토리북 이미지 업로드 파일:', file);
  // 실제 업로드 대신 가짜 URL 반환
  return Promise.resolve('https://via.placeholder.com/300x150?text=UploadedImage');
};

export const CreateMode: Story = {
  args: {
    mode: 'create',
    onSubmit: (data) => alert(`제출 데이터: ${JSON.stringify(data, null, 2)}`),
    onImageUpload: mockImageUpload,
  },
};

export const EditMode: Story = {
  args: {
    mode: 'edit',
    initialData: {
      name: 'React 모임',
      description: '리액트를 공부하는 개발자 모임입니다.',
      imageUrl: 'https://via.placeholder.com/300x150?text=Club',
      adims: sampleAdmins,
      members: sampleMembers,
    },
    onSubmit: (data) => alert(`수정된 데이터: ${JSON.stringify(data, null, 2)}`),
    onImageUpload: mockImageUpload,
  },
};
