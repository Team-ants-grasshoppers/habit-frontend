import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseList from '../../../common/components/ui/BaseList';
import { ManagedClubList } from '../types';
import { MainTitle } from '../../../common/style/common.css';
import ButtonUnit from '../../../common/components/ui/Buttons';

interface MyManagedClubListProps {
  clubs: ManagedClubList;
}

/**
 * MyManagedClubList 컴포넌트
 *
 * 사용자가 운영 중인 모임(클럽) 목록을 렌더링하는 컴포넌트입니다.
 * - BaseList를 사용하여 카드 형태로 표시합니다.
 * - BaseList 아래에 "모임 만들기" 버튼(카드 형식)을 별도로 렌더링합니다.
 * - 항목 클릭 시 상세 페이지로 이동합니다.
 *
 * @param {Club[]} clubs - 운영 중인 모임 데이터 배열
 * @returns {JSX.Element | null} 렌더링된 리스트 또는 null
 */
const MyManagedClubList: React.FC<MyManagedClubListProps> = ({ clubs }) => {
  const navigate = useNavigate();

  const items = clubs.map((club) => ({
    id: club.id,
    name: club.name,
    imageUrl: club.imageUrl,
  }));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <MainTitle>내가 운영 중인 모임</MainTitle>
        {/* 모임 만들기 카드 */}
        <div
          className="btn_shadow"
          style={{
            width: 'auto',
          }}
        >
          <ButtonUnit mode="base" onClick={() => navigate('/club/create')}>
            + 모임 만들기
          </ButtonUnit>
        </div>
      </div>
      <BaseList items={items} routePrefix="/club" />
    </>
  );
};

export default MyManagedClubList;
