import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchClubList } from '../api/clubApi';
import ClubList from '../components/ClubList';
import ButtonUnit from '../../../common/components/ui/Buttons';
/**
 * ClubListPage 컴포넌트
 *
 * 관심사 및 지역 필터에 기반하여 클럽 목록을 불러와 화면에 렌더링한다.
 * 클럽 목록은 Redux 상태에서 선택된 필터 조건(interests, regions)을 기준으로 API 요청을 보내며,
 * 리스트는 카드 형태로 렌더링되고, 하단에 더보기 버튼이 위치함 (현재 더보기 기능은 미구현).
 *
 * 상태 설명:
 * @state clubs - 렌더링할 클럽 카드 리스트 배열 (id, name, imageUrl 포함)
 *
 * 외부 상태:
 * @redux checkboxSelection - Redux 전역 상태에서 관심사(interests), 지역(regions) 필터 값을 사용
 *
 * API 사용:
 * - fetchClubList(category: string, region: string): 클럽 리스트를 필터 조건(category, region) 기준으로 조회
 *
 * 컴포넌트 구성:
 * 1. <h2> - 페이지 제목
 * 2. <ClubList> - 클럽 카드 리스트 컴포넌트, props로 clubs 배열과 routePrefix 전달
 * 3. <ButtonUnit mode="more"> - 하단 '더보기' 버튼 (현재는 기능 없음, UI 위치용으로만 존재)
 */

const ClubListPage: React.FC = () => {
  const { interests, regions } = useSelector((state: RootState) => state.checkboxSelection);

  const [clubs, setClubs] = useState<{ id: string; name: string; imageUrl: string }[]>([]);

  useEffect(() => {
    const category = interests[0] || '전체';
    const region = regions[0] || '전체';

    fetchClubList(category, region).then((data) => {
      const mapped = data.map((club) => ({
        id: club.club_id.toString(),
        name: club.name,
        imageUrl: '/placeholder.png', // TODO: imageUrl 서버 응답에 따라 교체
      }));
      setClubs(mapped);
    });
  }, [interests, regions]);

  return (
    <div>
      <h2>모임 리스트</h2>
      <ClubList items={clubs} routePrefix="/club" />
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
