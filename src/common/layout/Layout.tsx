import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from '@emotion/styled';

const Layout = () => {
  return (
    <LayoutWrapper>
      <Header />
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar />
        <MainStyle>
          <Outlet />
        </MainStyle>
      </div>
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const MainStyle = styled.main`
  flex: 1;
  margin: 0 auto;
  padding: 20px;
  overflow-y: auto;
  height: 100%;
  max-width: 1024px;
  min-width: 360px;
`;
