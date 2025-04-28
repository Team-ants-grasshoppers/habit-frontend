import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseList from '../../../common/components/ui/BaseList';
import { Club } from '../types';

interface MyManagedClubListProps {
  clubs: Club[];
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
    <section>
      <h3>내가 운영 중인 모임</h3>
      <BaseList items={items} routePrefix="/club" />

      {/* 모임 만들기 카드 */}
      <div
        onClick={() => navigate('/club/create')}
        style={{
          border: '1px dashed #aaa',
          padding: '20px',
          textAlign: 'center',
          marginTop: '12px',
          cursor: 'pointer',
        }}
      >
        + 모임 만들기
      </div>
    </section>
  );
};

export default MyManagedClubList;
