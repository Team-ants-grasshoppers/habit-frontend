import React from 'react';
import ThunderMembers from './ThunderMembers';

/**
 * ThunderMember 타입
 *
 * 번개 모임에 참여한 각 멤버의 정보를 나타내는 타입입니다.
 */
interface ThunderMember {
  /** 멤버의 고유 ID */
  memberId: number;
  /** 멤버의 닉네임 */
  nickname: string;
  /** 멤버의 프로필 이미지 URL (선택적) */
  profileImageUrl?: string;
  /** 멤버가 운영자인지 여부 */
  isAdmin?: boolean;
}

/**
 * ThunderDetail 컴포넌트의 Props
 *
 * 번개 모임의 상세 정보를 담고 있는 컴포넌트입니다.
 * 모임 제목, 설명, 시간, 위치, 참여 인원 등 모임의 상세 내용을 표시합니다.
 */
interface ThunderDetailProps {
  /** 번개 모임의 고유 ID */
  thunderId: number;
  /** 번개 모임 제목 */
  title: string;
  /** 번개 모임 설명 */
  description: string;
  /** 번개 모임 카테고리 */
  category: string;
  /** 번개 모임 지역 */
  region: string;
  /** 번개 모임의 대표 이미지 URL (선택적) */
  imageUrl?: string;
  /** 번개 모임의 날짜 및 시간 (선택적) */
  dateTime?: string;
  /** 번개 모임의 위치 (선택적) */
  location?: string;
  /** 번개 모임 참여 인원 목록 (선택적) */
  members?: ThunderMember[];
}

/**
 * 번개 모임 상세 정보 컴포넌트
 *
 * `ThunderDetail`은 번개 모임의 제목, 설명, 시간, 위치, 참여 인원 등을 표시하는 컴포넌트입니다.
 * - `ThunderMembers`를 통해 참여 중인 인원 목록을 렌더링합니다.
 *
 * @component
 * @param {ThunderDetailProps} props - 컴포넌트에 전달되는 props
 * @returns {JSX.Element}
 */
const ThunderDetail: React.FC<ThunderDetailProps> = ({
  title,
  description,
  imageUrl,
  dateTime,
  location,
  members = [],
}) => {
  return (
    <div>
      <h2>{title}</h2>

      {imageUrl && <img src={imageUrl} alt={title} />}

      <p>{description}</p>

      <div>
        {location && <div>모임 위치: {location}</div>}
        {dateTime && <div>모임 시간: {dateTime}</div>}
      </div>

      <h3>참여중인 인원</h3>
      <ThunderMembers members={members} />
    </div>
  );
};

export default ThunderDetail;
