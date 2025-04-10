import type { Meta, StoryObj } from '@storybook/react';
import ThunderDetail from '../src/features/thunder/components/ThunderDetail';

const meta: Meta<typeof ThunderDetail> = {
  title: 'Thunder/ThunderDetail',
  component: ThunderDetail,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThunderDetail>;

const sampleMembers = [
  {
    memberId: 1,
    nickname: '번개리더',
    profileImageUrl: 'https://via.placeholder.com/80x80?text=Leader',
    isAdmin: true,
  },
  {
    memberId: 2,
    nickname: '참가자1',
    profileImageUrl: 'https://via.placeholder.com/80x80?text=User1',
  },
];

export const Default: Story = {
  args: {
    thunderId: 101,
    title: '퇴근 후 맥주 한 잔 번개',
    description: '강남역 근처에서 간단하게 맥주 한 잔 하실 분~ 🍻',
    category: '술자리',
    region: '강남역',
    imageUrl: 'https://via.placeholder.com/300x150?text=Thunder',
    dateTime: '2024-05-01 19:00',
    location: '강남역 11번 출구 앞',
    members: sampleMembers,
  },
};

export const NoImageNoLocation: Story = {
  args: {
    thunderId: 102,
    title: '조용히 산책 번개',
    description: '반포 한강공원에서 조용히 걷고 이야기 나누는 모임입니다.',
    category: '산책',
    region: '서초구',
    dateTime: '2024-05-03 10:00',
    members: sampleMembers,
  },
};

export const EmptyMembers: Story = {
  args: {
    thunderId: 103,
    title: '영화 같이 보실 분!',
    description: '용산 CGV에서 영화 볼 분 구합니다. 🎬',
    category: '문화',
    region: '용산',
    imageUrl: 'https://via.placeholder.com/300x150?text=Movie+Thunder',
    dateTime: '2024-05-07 18:30',
    location: '용산 CGV',
    members: [],
  },
};
