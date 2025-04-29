// src/components/layout/Sidebar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import Login from '../../features/user/components/Login';
import InterestModal from '../components/utils/InterestModal';
import RegionModal from '../components/utils/RegionModal';
import styled from '@emotion/styled';
import { fc, flexStyle, jb, sectionStyle } from '../style/common.css';
import { layoutTheme } from './layoutStyle.css';
import ButtonUnit from '../components/ui/Buttons';
import { setInterests, setRegions } from '../components/ui/hooks/checkboxSelectionSlice';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const userState = useSelector((state: RootState) => state.user);

  const [isInterestOpen, setInterestOpen] = useState(false);
  const [isRegionOpen, setRegionOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const dispatch = useDispatch();
  const { interests, regions } = useSelector((state: RootState) => state.checkboxSelection);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <AsideStyle>
      <nav>
        <ul>
          <li>
            <StyledLink to="/clubs" active={isActive('/clubs')}>
              내 모임
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/calendar" active={isActive('/calendar')}>
              일정
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/recent" active={isActive('/recent')}>
              최근 본 모임
            </StyledLink>
          </li>
        </ul>

        <ul>
          <li style={{ margin: '30px 0 10px', fontWeight: 'bold' }}>@ 확인용</li>
          <li>
            <StyledLink to="/user/club" active={isActive('/user/club')}>
              내 모임 X
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/user/recent" active={isActive('/user/recent')}>
              최근 본 모임 X
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/calendar" active={isActive('/calendar')}>
              일정
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/user/info" active={isActive('/user/info')}>
              내 정보
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/club/list" active={isActive('/club/list')}>
              모임 리스트
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/club/create" active={isActive('/club/create')}>
              모임 생성
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/thunder/list" active={isActive('/thunder/list')}>
              번개모임 리스트
            </StyledLink>
          </li>
          <li>
            <StyledLink to="/thunder/create" active={isActive('/thunder/create')}>
              번개모임 생성
            </StyledLink>
          </li>
        </ul>
      </nav>

      <div>
        <ul>
          <li>
            <ButtonUnit mode="base" onClick={() => setInterestOpen(true)}>
              관심사 설정
            </ButtonUnit>
          </li>
          <li>
            <button onClick={() => setRegionOpen(true)}>지역 설정</button>
          </li>
          <li>
            <ButtonUnit
              mode="base"
              onClick={() => {
                if (userState.isLogin) {
                  window.location.href = '/profile';
                } else {
                  setLoginOpen(true);
                }
              }}
            >
              {userState.isLogin ? userState.nickname : '로그인'}
            </ButtonUnit>
          </li>
        </ul>
      </div>

      {/* 관심사 모달 */}
      <InterestModal
        isOpen={isInterestOpen}
        selectedInterests={interests}
        onConfirm={(items) => dispatch(setInterests(items))}
        onCancel={() => setInterestOpen(false)}
      />

      {/* 지역 모달 */}
      <RegionModal
        isOpen={isRegionOpen}
        selectedRegions={regions}
        onConfirm={(items) => dispatch(setRegions(items))}
        onCancel={() => setRegionOpen(false)}
      />

      {/* 로그인 모달 */}
      <Login isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </AsideStyle>
  );
};

export default Sidebar;

const AsideStyle = styled.aside`
  ${sectionStyle}
  ${flexStyle}
  ${fc}
  ${jb}
  width: 240px;
  background-color: #ffffff;
  padding: 2rem 1rem;
  box-shadow: var(--shadow);
  height: calc(100vh - ${layoutTheme.header.height});
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
  z-index: 900;

  nav ul {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem;
  }

  nav ul li {
    margin-bottom: 1rem;
  }

  nav ul li a {
    text-decoration: none;
    color: var(--text-main);
    font-size: 16px;
    font-weight: 500;
  }

  nav ul li a:hover {
    color: var(--primary);
  }

  div ul {
    list-style: none;
    padding: 0;
    margin: 2rem 0 0;
  }

  div ul li {
    margin-bottom: 1rem;
  }

  li button {
    width: 100%;
    font-size: 14px;
    padding: 10px;
    border-radius: 8px;
    background-color: var(--primary);
    color: #fff;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: #e67020;
    }
  }
`;

const StyledLink = styled(Link)<{ active: boolean }>`
  text-decoration: none;
  color: ${({ active }) => (active ? 'var(--primary)' : 'var(--text-main)')};
  font-weight: ${({ active }) => (active ? '700' : '500')};
  font-size: 16px;

  &:hover {
    color: var(--primary);
  }
`;
