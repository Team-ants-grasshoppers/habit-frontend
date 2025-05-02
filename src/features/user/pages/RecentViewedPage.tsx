import styled from '@emotion/styled';
import ButtonUnit from '../../../common/components/ui/Buttons';
import { MainTitle, TitleArea } from '../../../common/style/common.css';
import { useAppSelector } from '../../../store/hook';
import RecentClubList from '../components/RecentClubsList';
import RecentThunderList from '../components/RecentThunderList';
/**
 * RecentViewedPage 컴포넌트
 *
 * 사용자가 최근에 본 모임(클럽)과 번개 모임 리스트를 각각 렌더링하는 통합 페이지입니다.
 *
 * ✅ 기능
 * - Redux 상태에서 최근 본 모임과 번개 모임 데이터를 각각 조회합니다.
 * - 조회된 데이터를 `RecentClubList`, `RecentThunderList` 컴포넌트를 통해 렌더링합니다.
 * - 각 리스트는 `BaseList`를 기반으로 카드 형태로 보여지며, 각 항목은 클릭 시 상세 페이지로 이동합니다.
 * - 각 항목에는 삭제 버튼이 포함되어 있으며, 클릭 시 최근 본 항목 목록에서 제거됩니다.
 *
 * ✅ 상태 사용
 * @state recentClub - 최근 본 모임(클럽) 배열 (Club[])
 * @state recentThunder - 최근 본 번개 모임 배열 (Thunder[])
 *
 * ✅ 렌더링 구조
 * - <h2> 제목 + 리스트 구성 (모임, 번개모임 구분)
 *
 * @returns {JSX.Element} 최근 본 모임/번개모임 페이지 전체 UI
 */
const RecentViewedPage = () => {
  const recentClubs = useAppSelector((state) => state.recentClub);
  const recentThunders = useAppSelector((state) => state.recentThunder);

  return (
    <>
      <TitleArea>
        <ButtonUnit mode="goback">뒤로가기</ButtonUnit>
        <MainTitle>최근 본 모임</MainTitle>
      </TitleArea>

      <RecentWrapper>
        <div className="recent_club">
          <RecentClubList clubs={recentClubs} />
        </div>

        <div className="recent_thunder">
          <strong>⚡️번개모임</strong>
          <RecentThunderList thunders={recentThunders} />
        </div>
      </RecentWrapper>
    </>
  );
};

export default RecentViewedPage;

const RecentWrapper = styled.div`
  & > .recent_thunder {
    background: var(--primary-light-yellow);
    border-radius: 3rem;
    padding: 2rem;
    margin: 3rem 0;

    strong {
      display: block;
      font-size: 2.4rem;
      font-weight: 700;
      margin: 1rem 0 2rem 0;
    }
  }
`;
