import { useAppDispatch } from '../../../store/hook';
import { removeRecentThunder } from '../../../store/recentThunderSlice';
import BaseList from '../../../common/components/ui/BaseList';
import { Thunder } from '../types';
/**
 * RecentThunderList 컴포넌트
 *
 * 사용자가 최근에 본 번개 모임 목록을 렌더링하는 프레젠테이셔널 컴포넌트입니다.
 *
 * ✅ 기능
 * - 상위 컴포넌트로부터 Thunder 객체 배열(thunders)을 전달받아 BaseList를 통해 카드 형태로 렌더링합니다.
 * - 각 항목은 이미지, 제목, 지역 및 시간 정보(name), 삭제 버튼(extraElement)로 구성됩니다.
 * - 삭제 버튼 클릭 시 해당 번개 모임 항목을 Redux 상태(recentThundersSlice)에서 제거합니다.
 * - 카드 클릭 시 `/thunder/:id` 경로로 상세 페이지로 이동합니다.
 *
 * ✅ props
 * @param {Thunder[]} thunders - 최근 본 번개 모임 데이터 배열
 *
 * ✅ 구성
 * - BaseList를 사용하여 리스트를 렌더링하고,
 * - 카드 우측 상단에 `extraElement`로 삭제 버튼을 표시합니다.
 * - name에는 모임 제목 + 지역 ・ 시간 정보를 줄바꿈 포함 문자열로 보여줍니다.
 *
 * @returns {JSX.Element} 렌더링된 번개 모임 카드 리스트
 */
const RecentThunderList = ({ thunders }: { thunders: Thunder[] }) => {
  const dispatch = useAppDispatch();

  const items = thunders.map((thunder) => ({
    id: thunder.id,
    imageUrl: thunder.imageUrl || '',
    name: `${thunder.name}\n${thunder.region} ・ ${thunder.time}`,
    extraButtons: (
      <button
        onClick={() => dispatch(removeRecentThunder(thunder.id))}
        style={{ padding: '4px 8px', fontSize: '12px' }}
      >
        삭제
      </button>
    ),
  }));

  return <BaseList items={items} routePrefix="/thunder" />;
};

export default RecentThunderList;
