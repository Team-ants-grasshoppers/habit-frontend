import React from 'react';
import ThunderMembers from './ThunderMembers';

interface ThunderMember {
  memberId: number;
  nickname: string;
  profileImageUrl?: string;
  isAdmin?: boolean;
}

interface ThunderDetailProps {
  thunderId: number;
  title: string;
  description: string;
  category: string;
  region: string;
  imageUrl?: string;
  dateTime?: string;
  location?: string;
  members?: ThunderMember[];
}

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
