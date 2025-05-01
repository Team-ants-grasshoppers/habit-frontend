import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonUnit from '../../../common/components/ui/Buttons';
import BaseList from '../../../common/components/ui/BaseList';
import { useAppSelector } from '../../../store/hook';
import { fetchThunderListApi } from '../api/thunderApi';

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
   */
  useEffect(() => {
    if (selectedRegions.length === 0 || selectedInterests.length === 0) return;

    const fetchData = async () => {
      const result = await fetchThunderListApi(
        selectedInterests[0],
        selectedRegions[0],
        selectedDate,
      );
      setThunderList(result);
      setVisibleCount(6); // 초기값 리셋
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
    return new Date().toISOString().split('T')[0];
  }

  /**
   * 오늘부터 7일 간의 날짜와 요일을 계산하여 버튼용 데이터 생성
   */
  const next7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      label: `${d.getMonth() + 1}/${d.getDate()} (${['일', '월', '화', '수', '목', '금', '토'][d.getDay()]})`,
      value: d.toISOString().split('T')[0],
    };
  });

  return (
    <div>
      {/* 상단 우측 버튼: 번개 모임 만들기 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <ButtonUnit mode="base" onClick={() => navigate('/thunder/create')}>
          번개 모임 만들기
        </ButtonUnit>
      </div>

      {/* 날짜 선택 버튼 리스트 */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {next7Days.map((d) => (
          <button
            key={d.value}
            onClick={() => handleDateClick(d.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              backgroundColor: selectedDate === d.value ? '#555' : '#eee',
              color: selectedDate === d.value ? '#fff' : '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* 번개 모임 리스트 출력 */}
      <BaseList
        items={thunderList.slice(0, visibleCount).map((item) => ({
          id: String(item.thunder_id),
          name: item.title,
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
    </div>
  );
};

export default ThunderListPage;
