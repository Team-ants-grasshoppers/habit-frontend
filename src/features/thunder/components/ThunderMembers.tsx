import React from 'react';
import ButtonUnit from '../../../common/components/ui/Buttons';

/**
 * 번개 모임에 참여 중인 멤버 정보를 나타냄
 * 운영자는 이 리스트에 포함되지 않으며,
 * 이 컴포넌트를 보고 있는 유저가 운영자인 경우에만
 * 각 멤버에 대해 "추방하기" 버튼이 표시됨
 */
interface ThunderMember {
  /** 멤버의 고유 ID */
  memberId: number;
  /** 멤버의 닉네임 */
  nickname: string;
  /** 멤버의 프로필 이미지 URL (선택) */
  profileImageUrl?: string;
}

/**
 * ThunderMembers 컴포넌트의 Props
 */
interface ThunderMembersProps {
  /** 운영자를 제외한 모임 참여 멤버 리스트 */
  members: ThunderMember[];
  /** 멤버 추방 버튼 클릭 시 실행할 콜백 함수 (옵션) */
  onBanClick?: (memberId: number) => void;
  /** 현재 이 컴포넌트를 보고 있는 사용자가 운영자인지 여부 */
  isViewerAdmin?: boolean;
}

/**
 * 번개 모임 참여 멤버 리스트를 보여주는 컴포넌트
 *
 * - 운영자는 리스트에 포함되지 않음
 * - 운영자가 볼 때만 멤버 옆에 "추방하기" 버튼이 표시됨
 *
 * @component
 * @param {ThunderMembersProps} props - 컴포넌트 props
 * @returns {JSX.Element | null}
 */
const ThunderMembers: React.FC<ThunderMembersProps> = ({ members, onBanClick, isViewerAdmin }) => {
  if (!members || members.length === 0) return null;

  return (
    <div>
      <h3>참여중인 인원</h3>
      <div>
        {members.map((member) => (
          <div key={member.memberId}>
            <img src={member.profileImageUrl} alt={member.nickname} />
            <p>{member.nickname}</p>
            {isViewerAdmin && onBanClick && (
              <ButtonUnit mode="confirm" onClick={() => onBanClick(member.memberId)}>
                추방하기
              </ButtonUnit>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThunderMembers;
