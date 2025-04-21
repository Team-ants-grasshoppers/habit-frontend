import { Routes, Route } from 'react-router-dom';
import Layout from '../common/layout/Layout';
import ThunderListPage from '../features/thunder/pages/ThunderListPage';
import ClubListPage from '../features/club/pages/ClubListPage';
import CalendarPage from '../features/calendar/pages/CalendarPage';
import ClubDetailPage from '../features/club/pages/ClubDetailPage';
import ClubModifyPage from '../features/club/pages/ClubModifyPage';
import ClubCreatePage from '../features/club/pages/ClubCreatePage';
import Join from '../features/user/components/Join';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="thunderlist" element={<ThunderListPage />} />
        <Route path="clublist" element={<ClubListPage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="join" element={<Join />} />

        {/* Club 관련 라우트 추가 */}
        <Route path="club/create" element={<ClubCreatePage />} />
        <Route path="club/:clubId" element={<ClubDetailPage />} />
        <Route path="club/:clubId/edit" element={<ClubModifyPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
