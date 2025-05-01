import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonUnit from '../../../common/components/ui/Buttons';
import BaseList from '../../../common/components/ui/BaseList';
import { useAppSelector } from '../../../store/hook';
import { fetchThunderListApi } from '../api/thunderApi';
import { MainTitle, TitleArea } from '../../../common/style/common.css';
import styled from '@emotion/styled';

/**
 * ThunderListPage
 *
 * 번개 모임 리스트 페이지입니다.
 * - 지역, 관심사, 날짜에 따라 필터링된 번개 모임 목록을 출력
 * - 날짜는 오늘 기준 7일을 상단 버튼으로 제공
 * - BaseList를 사용해 리스트 렌더링
 * - "더보기" 버튼을 통한 클라이언트 사이드 페이지네이션 지원
 * - "번개 모임 만들기" 버튼 클릭 시 생성 페이지로 이동
 */

const ThunderListPage: React.FC = () => {
  const navigate = useNavigate();

  /** 전역에서 선택된 지역(1개만 사용) */
  const selectedRegions = useAppSelector((state) => state.checkboxSelection.regions);
  /** 전역에서 선택된 관심사(1개만 사용) */
  const selectedInterests = useAppSelector((state) => state.checkboxSelection.interests);

  /** 선택된 날짜 (YYYY-MM-DD) */
  const [selectedDate, setSelectedDate] = useState<string>(getToday());
  /** 전체 번개 리스트 */
  const [thunderList, setThunderList] = useState<any[]>([]);
  /** 현재 화면에 표시할 리스트 수 */
  const [visibleCount, setVisibleCount] = useState(6);

  /**
   * 필터 조건이 변경되면 API 요청하여 리스트 재조회
   * TODO: formatDateForApi 함수는 추후 공통 유틸로 분리할 수 있음
   */
  useEffect(() => {
    if (selectedRegions.length === 0 || selectedInterests.length === 0) return;

    const fetchData = async () => {
      const formatDateForApi = (dateStr: string): string => {
        const [year, month, day] = dateStr.split('-');
        return `${year}.${Number(month)}.${Number(day)}`;
      };
      const formattedDate = formatDateForApi(selectedDate);

      try {
        const result = await fetchThunderListApi(
          selectedInterests[0],
          selectedRegions[0],
          formattedDate,
        );
        setThunderList(result);
      } catch (err) {
        console.warn('🔥 번개 리스트 요청 실패:', err);
        setThunderList([]); // 🔥 실패 시 리스트 초기화
      } finally {
        setVisibleCount(6); // 항상 초기화
      }
    };

    fetchData();
  }, [selectedRegions, selectedInterests, selectedDate]);

  /**
   * 날짜 버튼 클릭 시 날짜 변경
   * @param dateStr - YYYY-MM-DD 형식 문자열
   */
  const handleDateClick = (dateStr: string) => {
    setSelectedDate(dateStr);
  };

  /**
   * 더보기 버튼 클릭 시 렌더링 개수 증가
   */
  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  /**
   * 오늘 날짜를 YYYY-MM-DD 문자열로 반환
   */
  function getToday(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  /**
   * 오늘부터 7일 간의 날짜와 요일을 계산하여 버튼용 데이터 생성
   */
  const next7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(new Date().getDate() + i); // 오늘 기준 날짜 계산
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');

    return {
      label: `${Number(mm)}/${Number(dd)} (${['일', '월', '화', '수', '목', '금', '토'][d.getDay()]})`,
      value: `${yyyy}-${mm}-${dd}`, // YYYY-MM-DD
    };
  });

  return (
    <ThunderListWrapper>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TitleArea>
          <ButtonUnit mode="goback">뒤로가기</ButtonUnit>
          <MainTitle>번개모임 리스트</MainTitle>
        </TitleArea>
        <div className="btn_shadow">
          <ButtonUnit mode="base" onClick={() => navigate('/thunder/create')}>
            번개 모임 만들기
          </ButtonUnit>
        </div>
      </div>

      {/* 날짜 선택 버튼 리스트 */}
      <DateButtonWrapper>
        {next7Days.map((d) => (
          <button
            key={d.value}
            onClick={() => handleDateClick(d.value)}
            className={selectedDate === d.value ? 'selected' : ''}
          >
            {d.label}
          </button>
        ))}
      </DateButtonWrapper>

      {/* 번개 모임 리스트 출력 */}
      <BaseList
        items={thunderList.slice(0, visibleCount).map((item) => ({
          id: String(item.thunder_id),
          name: item.title,
          date: item.date,
          category: item.category,
          imageUrl: item.imgUrl || '/default-image.png',
        }))}
        routePrefix="/thunder"
      />

      {/* 더보기 버튼 */}
      {visibleCount < thunderList.length && (
        <div style={{ marginTop: '2rem' }}>
          <ButtonUnit mode="more" onMore={loadMore}>
            더보기
          </ButtonUnit>
        </div>
      )}
    </ThunderListWrapper>
  );
};

export default ThunderListPage;

const ThunderListWrapper = styled.div`
  .btn_shadow {
    width: auto;
    button {
      border-radius: 2rem;
      padding: 0.5rem 1.5rem;
    }
  }
`;

const DateButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
  gap: 0.5rem;

  button {
    height: auto;
    padding: 0.8rem 1rem;
    border: 0;
    background: var(--primary-light-yellow);
    &.selected {
      border: var(--border_dark);
      background: var(--primary-green);
      color: var(--white);
    }
  }
`;
