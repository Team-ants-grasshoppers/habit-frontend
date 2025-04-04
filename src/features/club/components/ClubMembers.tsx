import React from 'react';

interface ClubMember {
  id: string; // DB 프라이머리 키
  name: string;
  profileImageUrl: string;
}

interface ClubMembersProps {
  admins: ClubMember[];
  members: ClubMember[];
}

/**
 * ClubMembers 컴포넌트
 *
 * 클럽에 속한 멤버들을 시각적으로 구분하여 렌더링하는 역할을 한다.
 * - 상위 컴포넌트에서 role(role: 'admin' | 'member')에 따라 분리된 데이터를 전달받음
 * - 각 멤버는 사진과 이름으로 구성된 카드 형태로 렌더링됨
 * - 운영진(admin)과 일반 멤버(member)를 두 개의 섹션으로 나누어 구분해서 표시
 * - 운영진/멤버가 각각 비어 있는 경우 해당 섹션은 렌더링되지 않음
 *
 * ⚠️ 이 컴포넌트는 데이터 분리나 가공은 하지 않고, 순수하게 받은 데이터를 렌더링만 한다.
 *
 * @component
 * @param {ClubMembersProps} props - 운영진과 일반 멤버 목록
 * @returns {JSX.Element} 클럽 멤버 시각화 영역
 */
const ClubMembers: React.FC<ClubMembersProps> = ({ admins, members }) => {
  return (
    <div>
      {/* 운영진 */}
      {admins.length > 0 && (
        <section>
          <h3>운영진</h3>
          <div>
            {admins.map((admin) => (
              <div key={admin.id}>
                <img src={admin.profileImageUrl} alt={admin.name} />
                <p>{admin.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 일반 멤버 */}
      {members.length > 0 && (
        <section>
          <h3>멤버</h3>
          <div>
            {members.map((member) => (
              <div key={member.id}>
                <img src={member.profileImageUrl} alt={member.name} />
                <p>{member.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClubMembers;
