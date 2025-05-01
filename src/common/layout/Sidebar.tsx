// src/components/layout/Sidebar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const userState = useSelector((state: RootState) => state.user);

  const [isInterestOpen, setInterestOpen] = useState(false);
  const [isRegionOpen, setRegionOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const dispatch = useDispatch();
  const { interests, regions } = useSelector((state: RootState) => state.checkboxSelection);

  return (
    <AsideStyle>
      <nav>
        <ul>
          <li>
            <Link to="/clubs">내 모임</Link>
          </li>
          <li>
            <Link to="/calendar">일정</Link>
          </li>
          <li>
            <Link to="/recent">최근 본 모임</Link>
          </li>
        </ul>

        <ul>
          <li style={{ margin: '30px 0 10px', fontWeight: 'bold' }}>@ 확인용</li>
          <li>
            <Link to="/user/info">내 정보</Link>
          </li>
          <li>
            <Link to="/user/recent">최근 본 모임</Link>
          </li>
          <li>
            <Link to="/user/club">내 모임</Link>
          </li>
          <li>
            <Link to="/calendar">일정</Link>
          </li>
          <li>
            <Link to="/club/list">모임 리스트</Link>
          </li>
          <li>
            <Link to="/club/create">모임 생성</Link>
          </li>
          <li>
            <Link to="/thunder/list">번개모임 리스트</Link>
          </li>
          <li>
            <Link to="/thunder/create">번개모임 생성</Link>
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
        onConfirm={(items) => {
          dispatch(setInterests(items)), setInterestOpen(false);
        }}
        onCancel={() => setInterestOpen(false)}
      />

      {/* 지역 모달 */}
      <RegionModal
        isOpen={isRegionOpen}
        selectedRegions={regions}
        onConfirm={(items) => {
          dispatch(setRegions(items)), setRegionOpen(false);
        }}
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
  width: auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
  box-shadow: var(--shadow);
  height: calc(100vh - ${layoutTheme.header.height});
`;
