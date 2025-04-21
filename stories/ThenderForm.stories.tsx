import type { Meta, StoryObj } from '@storybook/react';
import ThunderForm from '../src/features/thunder/components/ThunderForm';

const meta: Meta<typeof ThunderForm> = {
  title: 'Thunder/ThunderForm',
  component: ThunderForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThunderForm>;

// 이미지 업로드를 모의 처리하는 함수
const mockImageUpload = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(URL.createObjectURL(file)); // 실제 업로드 URL이 아니라 로컬 URL을 반환하는 예시
    }, 500);
  });
};

// 생성 모드 스토리
export const CreateMode: Story = {
  args: {
    mode: 'create',
    onImageUpload: mockImageUpload, // 이미지 업로드 콜백 전달
  },
};

// 수정 모드 스토리
export const EditMode: Story = {
  args: {
    mode: 'edit',
    // initialData: {
    //   title: '밤마실 번개',
    //   description: '야경 보러 남산 한 바퀴 돌아요 🌃',
    //   region: { city: '서울', district: '중구' },
    //   date: '2024-05-01',
    //   hour: 20,
    //   minute: 0,
    //   imageUrl: 'https://via.placeholder.com/100', // 초기 이미지 URL
    // },
    onImageUpload: mockImageUpload, // 이미지 업로드 콜백 전달
    onSubmit: (data) => {
      console.log('수정된 데이터:', data); // 수정된 데이터 확인용
    },
  },
};
