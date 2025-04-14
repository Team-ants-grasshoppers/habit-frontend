import { Routes, Route } from 'react-router-dom';
import Layout from '../common/layout/Layout';
import ThunderListPage from '../features/thunder/pages/ThunderListPage';
import ClubListPage from '../features/club/pages/ClubListPage';
import CalendarPage from '../features/calendar/pages/CalendarPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="thunderlist" element={<ThunderListPage />} />
        <Route path="clublist" element={<ClubListPage />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
