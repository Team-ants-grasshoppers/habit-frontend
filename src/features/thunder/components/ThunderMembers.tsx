import React from 'react';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { FormattedMember } from '../../utils/separateMembersByRole';

/** ### 번개모임 운영진/멤버 리스트 출력용 Props
 * - admins: 운영진 리스트
 * - members: 멤버 리스트
 * - isAdmin: 현재 유저가 운영자인지 여부
 * - onBan: 멤버 추방 핸들러 (선택)
 */
export interface ThunderMembersProps {
  admins: FormattedMember[];
  members: FormattedMember[];
  isAdmin: boolean;
  onBan?: (userId: string) => void;
}

/**
 * 번개모임 참여 멤버 리스트를 보여주는 컴포넌트
 *
 * - 운영자는 리스트에 포함되지 않음
 * - 운영자가 볼 때만 멤버 옆에 "추방하기" 버튼이 표시됨
 *
 * @component
 * @param {ThunderMembersProps} props - 컴포넌트 props
 * @returns {JSX.Element | null}
 */
const ThunderMembers: React.FC<ThunderMembersProps> = ({ admins, members, onBan, isAdmin }) => {
  if (!members.length) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* 운영진 */}
      <div>
        <h3 className="text-lg font-bold mb-2">운영진</h3>
        {admins.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {admins.map((admin) => (
              <div key={admin.userId} className="flex flex-col items-center w-24">
                {/* <img
                  src={'/placeholder-image-url'} // TODO: 실제 이미지 URL로 변경
                  alt={admin.nickname}
                  className="w-16 h-16 rounded-full object-cover"
                /> */}
                <span className="text-sm font-medium mt-1">{admin.nickname}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">운영진이 없습니다.</p>
        )}
      </div>

      {/* 일반 멤버 */}
      <div>
        <h3 className="text-lg font-bold mb-2">멤버</h3>
        {members.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {members.map((member) => (
              <div key={member.userId} className="flex flex-col items-center w-24">
                {/* <img
                  src={'/placeholder-image-url'} // TODO: 실제 이미지 URL로 변경
                  alt={member.nickname}
                  className="w-16 h-16 rounded-full object-cover"
                /> */}
                <span className="text-sm">{member.nickname}</span>
                {isAdmin && onBan && (
                  <ButtonUnit mode="base" onClick={() => onBan(member.userId)}>
                    추방
                  </ButtonUnit>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">멤버가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ThunderMembers;
