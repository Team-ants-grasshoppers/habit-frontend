import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from '@emotion/styled';

const Layout = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <LayoutWrapper>
      <Header />
      <div style={{ display: 'flex', height: '100%' }}>
        <Sidebar />
        <MainStyle>
          <TabWrapper>
            <ul>
              <li>
                <TabLink to="club/list" active={isActive('/club/list')}>
                  추천 모임
                </TabLink>
              </li>
              <li>
                <TabLink to="thunder/list" active={isActive('/thunder/list')}>
                  번개 모임
                </TabLink>
              </li>
              <li>
                <TabLink to="club/list" active={isActive('/club/story')}>
                  모임 스토리
                </TabLink>
              </li>
            </ul>
          </TabWrapper>
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

const TabWrapper = styled.div`
  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    text-align: center;
    padding: 0;
    margin: 0;
  }
`;

const TabLink = styled(Link)<{ active?: boolean }>`
  font-size: 1.2rem;
  font-weight: bold;
  border: var(--border_dark);
  border-radius: 3rem;
  padding: 1.5rem 0;
  background: ${({ active }) => (active ? 'var(--primary-green)' : 'var(--primary-orange)')};
  color: ${({ active }) => (active ? 'var(--white)' : 'var(--textColor)')};
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  &:hover {
    color: var(--white);
    background: var(--primary-green);
  }
`;
