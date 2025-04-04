import React from 'react';
import ClubMembers from './ClubMembers';

interface ClubMember {
  id: string;
  name: string;
  profileImageUrl: string;
}

interface ClubDetailProps {
  imageUrl: string;
  name: string;
  description: string;
  admins: ClubMember[];
  members: ClubMember[];
}

/**
 * ClubDetail 컴포넌트
 *
 * 클럽의 대표 이미지, 이름, 소개, 운영진과 멤버 정보를 표시한다.
 * - 상위 컴포넌트에서 club 정보를 전달받아 렌더링함
 * - ClubMembers 컴포넌트를 통해 운영진과 멤버 리스트를 출력함
 *
 * @component
 * @param {ClubDetailProps} props - 클럽 정보 및 구성원 리스트
 * @returns {JSX.Element} 클럽 상세 정보 UI
 */
const ClubDetail: React.FC<ClubDetailProps> = ({
  imageUrl,
  name,
  description,
  admins,
  members,
}) => {
  return (
    <div>
      <img src={imageUrl} alt={name} />
      <h2>{name}</h2>
      <h3>모임 소개</h3>
      <p>{description}</p>

      <ClubMembers admins={admins} members={members} />
    </div>
  );
};

export default ClubDetail;
