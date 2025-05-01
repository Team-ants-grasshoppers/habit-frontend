import React from 'react';
import BaseList from '../../../common/components/ui/BaseList';
import { ClubList as CLubListType } from '../types';

/**
 * ClubList 컴포넌트
 * 클럽 목록을 렌더링하는 프레젠테이셔널 컴포넌트
 *
 * 주요 기능:
 * - 클럽 데이터 배열(clubListItems)을 받아 BaseList 컴포넌트를 통해 카드 스타일로 표시
 * - 리스트가 비어 있을 경우 "클럽이 없습니다." 메시지 출력
 * - 클릭 시 클럽 상세 페이지(`/club/:id`)로 이동 가능
 *
 * props:
 * @prop {ClubListProps} clubListItems - 클럽 리스트 데이터 배열 (clubId, clubName, imageUrl 포함)
 *
 * 내부 동작:
 * - clubListItems를 BaseList에 맞게 (id, name, imageUrl) 형태로 변환하여 전달
 *
 * @component
 * @returns {JSX.Element} 클럽 리스트 카드 또는 비어있을 경우 안내 문구
 */
const ClubList: React.FC<CLubListType> = ({ clubListItems }) => {
  // if (clubListItems.length === 0) return <div>클럽이 없습니다.</div>;
  return (
    <>
      <BaseList
        items={clubListItems.map((item) => ({
          id: item.clubId,
          name: item.clubName,
          category: item.clubCategory,
          imageUrl: item.imageUrl,
        }))}
        routePrefix="/club"
      />
    </>
  );
};

export default ClubList;
