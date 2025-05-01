import React from 'react';
import BaseList from '../../../common/components/ui/BaseList';
import { Club } from '../types';

interface MyJoinedClubListProps {
  clubs: Club[];
}

/**
 * MyJoinedClubList 컴포넌트
 *
 * 사용자가 참여 중인 모임(클럽) 목록을 렌더링하는 컴포넌트입니다.
 * - BaseList를 사용하여 카드 형태로 표시합니다.
 * - 항목 클릭 시 상세 페이지로 이동합니다.
 *
 * @param {Club[]} clubs - 참여 중인 모임 데이터 배열
 * @returns {JSX.Element | null} 렌더링된 리스트 또는 null
 */
const MyJoinedClubList: React.FC<MyJoinedClubListProps> = ({ clubs }) => {
  if (!clubs || clubs.length === 0) return null;

  const items = clubs.map((club) => ({
    id: club.id,
    name: club.name,
    imageUrl: club.imageUrl,
  }));

  return (
    <section>
      <h3>내가 참여한 모임</h3>
      <BaseList items={items} routePrefix="/club" />
    </section>
  );
};

export default MyJoinedClubList;
