import React from 'react';
import BaseList from '../../../common/components/ui/BaseList';
import { JoinedThunderItem } from '../types';
import { MainTitle } from '../../../common/style/common.css';

interface MyJoinedThunderListProps {
  thunders: JoinedThunderItem[];
}

/**
 * MyJoinedThunderList 컴포넌트
 *
 * 사용자가 참여 중인 번개 모임 목록을 렌더링하는 컴포넌트입니다.
 * - BaseList를 사용하여 카드 형태로 표시합니다.
 * - 항목 클릭 시 상세 페이지로 이동합니다.
 *
 * @param {Thunder[]} thunders - 참여 중인 번개 모임 데이터 배열
 * @returns {JSX.Element | null} 렌더링된 리스트 또는 null
 */
const MyJoinedThunderList: React.FC<MyJoinedThunderListProps> = ({ thunders }) => {
  if (!thunders || thunders.length === 0) return null;

  const items = thunders.map((thunder) => ({
    id: thunder.id,
    name: thunder.name,
    imageUrl: thunder.imageUrl,
  }));

  return (
    <>
      <MainTitle>내가 참여한 번개모임</MainTitle>
      <BaseList items={items} routePrefix="/thunder" />
    </>
  );
};

export default MyJoinedThunderList;
