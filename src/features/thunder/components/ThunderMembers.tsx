import React from 'react';

interface ThunderMember {
  memberId: number;
  nickname: string;
  profileImageUrl?: string;
  isAdmin?: boolean;
}

interface ThunderMembersProps {
  members: ThunderMember[];
  onBanClick?: (memberId: number) => void;
}

const ThunderMembers: React.FC<ThunderMembersProps> = ({ members, onBanClick }) => {
  if (!members || members.length === 0) return null;

  return (
    <div>
      <h3>참여중인 인원</h3>
      <div>
        {members.map((member) => (
          <div key={member.memberId}>
            <img src={member.profileImageUrl} alt={member.nickname} />
            <p>{member.nickname}</p>
            {onBanClick && <button onClick={() => onBanClick(member.memberId)}>추방하기</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThunderMembers;
