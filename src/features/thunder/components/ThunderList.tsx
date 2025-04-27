import React from 'react';
import BaseList from '../../../common/components/ui/BaseList';
import { ThunderList as ThunderListType } from '../types';

/**
 * ThunderList 컴포넌트
 *
 * 번개 모임 목록을 렌더링하는 프레젠테이셔널 컴포넌트입니다.
 * - 상위 컴포넌트에서 번개 모임 데이터 배열을 props로 전달받아 화면에 리스트 형태로 표시합니다.
 * - 각 모임은 BaseList를 통해 카드 형태로 렌더링되며, 클릭 시 번개 모임 상세 페이지로 이동합니다.
 * - 데이터가 비어 있을 경우 "번개 모임이 없습니다." 문구만 렌더링합니다.
 *
 * @component
 * @param {ThunderListProps} props - 번개 모임 리스트 렌더링에 필요한 props
 * @param {ThunderItem[]} props.items - 번개 모임 데이터 배열 (id, name, imageUrl 포함)
 * @returns {JSX.Element} 번개 모임 목록 UI 또는 빈 안내 메시지
 */
const ThunderList: React.FC<ThunderListType> = ({ thunderListItems }) => {
  return (
    <>
      <BaseList
        items={thunderListItems.map((item) => ({
          id: item.thunderId,
          name: item.thunderName,
          imageUrl: item.imageUrl,
        }))}
        routePrefix="/thunder"
      />
    </>
  );
};

export default ThunderList;
