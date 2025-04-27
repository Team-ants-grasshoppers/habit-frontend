import { Routes, Route } from 'react-router-dom';
import Layout from '../common/layout/Layout';
import ThunderListPage from '../features/thunder/pages/ThunderListPage';
import ClubListPage from '../features/club/pages/ClubListPage';
import CalendarPage from '../features/calendar/pages/CalendarPage';
import ClubDetailPage from '../features/club/pages/ClubDetailPage';
import ClubModifyPage from '../features/club/pages/ClubModifyPage';
import ClubCreatePage from '../features/club/pages/ClubCreatePage';
import Join from '../features/user/components/Join';
import ThunderCreatePage from '../features/thunder/pages/ThunderCreatePage';
import ThunderDetailPage from '../features/thunder/pages/ThunderDetailPage';
import ThunderModifyPage from '../features/thunder/pages/ThunderModifyPage';
import MyInfoPage from '../features/user/pages/MyInfoPage';
import MyClubPage from '../features/user/pages/MyClubPage';
import RecentViewedPage from '../features/user/pages/RecentViewedPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="join" element={<Join />} />
        <Route path="user/info" element={<MyInfoPage />} />
        <Route path="user/recent" element={<RecentViewedPage />} />
        <Route path="user/club" element={<MyClubPage />} />

        {/* Club 관련 라우트 추가 */}
        <Route path="club/create" element={<ClubCreatePage />} />
        <Route path="club/list" element={<ClubListPage />} />
        <Route path="club/:clubId" element={<ClubDetailPage />} />
        <Route path="club/:clubId/edit" element={<ClubModifyPage />} />

        {/* Thunder 관련 라우트 추가 */}
        <Route path="thunder/create" element={<ThunderCreatePage />} />
        <Route path="thunder/list" element={<ThunderListPage />} />
        <Route path="thunder/:thunderId" element={<ThunderDetailPage />} />
        <Route path="thunder/:thunderId/edit" element={<ThunderModifyPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
