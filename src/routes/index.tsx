import { Routes, Route } from 'react-router-dom';
import Layout from '../common/layout/Layout';
import ThunderListPage from '../features/thunder/pages/ThunderListPage';
import ClubListPage from '../features/club/pages/ClubListPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="thunderlist" element={<ThunderListPage />} />
        <Route path="clublist" element={<ClubListPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
