// src/components/layout/Sidebar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Modal from '../components/ui/Modal';
import Login from '../../features/user/components/Login';

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
      <Modal
        isOpen={isInterestOpen}
        mode="checkbox"
        title="관심사 설정"
        checkboxItems={['운동', '독서', '게임', '여행']}
        checked={selectedInterests}
        onCheckedChange={setSelectedInterests}
        onCancel={() => setInterestOpen(false)}
        onConfirm={() => {
          setInterestOpen(false);
          console.log('선택된 관심사:', selectedInterests);
        }}
        confirmText="저장"
        cancelText="취소"
      />

      {/* 지역 모달 */}
      <Modal
        isOpen={isRegionOpen}
        mode="checkbox"
        title="지역 설정"
        checkboxItems={['서울', '부산', '광주', '대전']}
        checked={selectedRegions}
        onCheckedChange={setSelectedRegions}
        onCancel={() => setRegionOpen(false)}
        onConfirm={() => {
          setRegionOpen(false);
          console.log('선택된 지역:', selectedRegions);
        }}
        confirmText="저장"
        cancelText="취소"
      />

      {/* 로그인 모달 */}
      <Login isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </aside>
  );
};

export default Sidebar;
