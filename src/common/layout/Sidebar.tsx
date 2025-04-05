// src/components/layout/Sidebar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Login from '../../features/user/components/Login';
import InterestModal from '../components/utils/InterestModal';
import RegionModal from '../components/utils/RegionModal';

const Sidebar: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);

  const [isInterestOpen, setInterestOpen] = useState(false);
  const [isRegionOpen, setRegionOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  return (
    <aside>
      <nav>
        <ul>
          <li>
            <Link to="/clubs">내 모임</Link>
          </li>
          <li>
            <Link to="/schedule">일정</Link>
          </li>
          <li>
            <Link to="/recent">최근 본 모임</Link>
          </li>
          <li>
            <button onClick={() => setInterestOpen(true)}>관심사 설정</button>
          </li>
          <li>
            <button onClick={() => setRegionOpen(true)}>지역 설정</button>
          </li>
        </ul>
      </nav>

      <div>
        <button
          onClick={() => {
            if (userState.isLogin) {
              window.location.href = '/profile';
            } else {
              setLoginOpen(true);
            }
          }}
        >
          {userState.isLogin ? userState.nickname : '로그인'}
        </button>
      </div>

      {/* 관심사 모달 */}
      <InterestModal
        isOpen={isInterestOpen}
        selected={selectedInterests}
        onChange={setSelectedInterests}
        onClose={() => setInterestOpen(false)}
      />

      {/* 지역 모달 */}
      <RegionModal
        isOpen={isRegionOpen}
        selected={selectedRegions}
        onChange={setSelectedRegions}
        onClose={() => setRegionOpen(false)}
      />

      {/* 로그인 모달 */}
      <Login isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </aside>
  );
};

export default Sidebar;
