import React from 'react';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { ClubMemberListProps } from '../types';

/**
 * ClubMembers
 * 클럽 운영진과 일반 멤버를 구분하여 렌더링하는 컴포넌트
 *
 * - 운영진(admin)과 일반 멤버(member) 리스트를 시각적으로 나누어 표시
 * - 각 유저는 프로필 이미지와 닉네임으로 구성된 카드 형태로 출력
 * - 운영진이 없거나 멤버가 없을 경우 각각 "운영진이 없습니다", "멤버가 없습니다" 문구 표시
 * - 운영자인 경우, 일반 멤버 카드 하단에 "추방" 버튼 표시 가능
 *
 * @component
 * @param {ClubMembersProps} props - 운영진과 멤버 목록
 * @prop members - 일반 멤버 유저 리스트
 * @prop isAdmin - 현재 유저가 운영자인지 여부
 * @prop onBan - 멤버 추방 핸들러 (선택적)
 * @returns {JSX.Element} 운영진 및 멤버 리스트 UI
 */
const ClubMembers: React.FC<ClubMemberListProps> = ({ admins, members, isAdmin, onBan }) => {
  return (
    <div className="flex flex-col gap-8">
      {/* 운영진 */}
      <div>
        <h3 className="text-lg font-bold mb-2">운영진</h3>
        {admins.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {admins.map((admin) => (
              <div key={admin.userId} className="flex flex-col items-center w-24">
                <img
                  src={admin.profileImageUrl}
                  alt={admin.nickname}
                  className="w-16 h-16 rounded-full object-cover"
                />
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
                <img
                  src={member.profileImageUrl}
                  alt={member.nickname}
                  className="w-16 h-16 rounded-full object-cover"
                />
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

export default ClubMembers;
