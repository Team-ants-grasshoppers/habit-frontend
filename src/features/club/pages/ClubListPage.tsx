import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchClubList } from '../api/clubApi';
import ClubList from '../components/ClubList';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { useClubList } from '../hooks/useClub';
/**
 * ClubListPage
 * 관심사 및 지역 필터에 따라 클럽 목록을 조회하고 화면에 렌더링하는 페이지
 *
 * 상태 설명:
 * @state clubs - 클럽 카드 리스트 배열 (clubId, clubName, imageUrl 포함)
 *
 * 외부 상태:
 * @redux checkboxSelection - 관심사(interests) 및 지역(regions) 필터 선택값 (Redux 전역 상태)
 *
 * API 사용:
 * - fetchClubList(category: string, region: string): 카테고리 및 지역 기준 클럽 리스트 조회
 *
 * 컴포넌트 구성:
 * 1. <h2> - 페이지 제목 "모임 리스트"
 * 2. <ClubList> - 클럽 카드 리스트 렌더링
 * 3. <ButtonUnit mode="more"> - 하단 '더보기' 버튼 (현재 기능 없음, UI 위치용)
 *
 * 추가 사항:
 * - 현재 club imageUrl은 서버 응답 미포함 → placeholder 이미지 사용 중
 */

const ClubListPage: React.FC = () => {
  const { interests, regions } = useSelector((state: RootState) => state.checkboxSelection);

  const category = interests[0] || '전체';
  const region = regions[0] || '전체';
  const { data } = useClubList(category, region);

  return (
    <div>
      <h2>모임 리스트</h2>
      {data && <ClubList clubListItems={data?.clubListItems} routePrefix="/club" />}
      {/* 더보기 버튼 - 기능 없음, 위치용 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <ButtonUnit mode="more" onClick={() => {}}>
          더보기
        </ButtonUnit>
      </div>
    </div>
  );
};

export default ClubListPage;
