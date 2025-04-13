import React from 'react';
import BaseList from '../../../common/components/ui/BaseList';

interface ClubItem {
  id: string;
  name: string;
  imageUrl: string;
}

interface ClubListProps {
  items: ClubItem[];
  routePrefix: string;
}

/**
 * ClubList 컴포넌트
 *
 * 클럽 목록을 렌더링하는 프레젠테이셔널 컴포넌트입니다.
 * - 상위 컴포넌트에서 클럽 데이터 배열을 props로 전달받아 화면에 리스트 형태로 표시합니다.
 * - 각 클럽은 BaseList를 통해 카드 형태로 렌더링되며, 클릭 시 클럽 상세 페이지로 이동합니다.
 * - 데이터가 비어 있을 경우 "클럽이 없습니다." 문구만 렌더링합니다.
 *
 * @component
 * @param {ClubListProps} props - 클럽 리스트 렌더링에 필요한 props
 * @param {ClubItem[]} props.items - 클럽 데이터 배열 (id, name, imageUrl 포함)
 * @returns {JSX.Element} 클럽 목록 UI 또는 빈 안내 메시지
 */
const ClubList: React.FC<ClubListProps> = ({ items }) => {
  if (items.length === 0) return <div>클럽이 없습니다.</div>;
  return <BaseList items={items} routePrefix="/club" />;
};

export default ClubList;
