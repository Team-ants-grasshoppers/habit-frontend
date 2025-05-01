import { useAppDispatch } from '../../../store/hook';
import { removeRecentClub } from '../../../store/recentClubSlice';
import BaseList from '../../../common/components/ui/BaseList';
import { Club } from '../types';
/**
 * RecentClubList 컴포넌트
 *
 * 사용자가 최근에 본 모임(클럽) 목록을 렌더링하는 프레젠테이셔널 컴포넌트입니다.
 *
 * ✅ 기능
 * - 상위 컴포넌트로부터 Club 객체 배열(clubs)을 전달받아 BaseList를 통해 카드 형태로 렌더링합니다.
 * - 각 항목에는 이미지, 모임 이름(name), 삭제 버튼(extraElement)이 포함됩니다.
 * - 삭제 버튼 클릭 시 해당 항목을 Redux 상태(recentClubsSlice)에서 제거합니다.
 * - 카드 자체를 클릭하면 `/club/:id` 상세 페이지로 이동합니다.
 *
 * ✅ props
 * @param {Club[]} clubs - 최근 본 모임 데이터 배열
 *
 * ✅ 구조
 * BaseList를 사용하여 리스트 렌더링하며,
 * 각 카드 우측 상단에 삭제 버튼(extraElement)을 추가로 표시합니다.
 *
 * @returns {JSX.Element} 렌더링된 모임 카드 리스트
 */
const RecentClubList = ({ clubs }: { clubs: Club[] }) => {
  const dispatch = useAppDispatch();

  const items = clubs.map((club) => ({
    id: club.id,
    imageUrl: club.imageUrl,
    name: club.name,
    extraButtons: (
      <button
        onClick={() => dispatch(removeRecentClub(club.id))}
        style={{ padding: '4px 8px', fontSize: '12px' }}
      >
        삭제
      </button>
    ),
  }));

  return <BaseList items={items} routePrefix="/club" />;
};

export default RecentClubList;
