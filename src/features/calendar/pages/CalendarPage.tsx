/**
 * @file /src/feature/calendar/pages/CalendarPage.tsx
 * @description 하빗 커뮤니티 캘린더 페이지 컴포넌트
 * - 일정 목록 관리
 * - CalendarView / CalendarModal 연결
 */
import { useState } from 'react';
import CalendarView from '../components/CalendarView';
import { CalendarModal } from '../components/CalendarModal';
import styled from '@emotion/styled';
import { MainTitle, TitleArea } from '../../../common/style/common.css';
import './calendarStyle.css';
import ButtonUnit from '../../../common/components/ui/Buttons';

/**
 * @typedef {Object} EventData
 * @property {string} date - 일정 날짜 (YYYY-MM-DD)
 * @property {string} title - 일정 제목
 * @property {string} [description] - 일정 설명
 */

interface EventData {
  date: string;
  title: string;
  description?: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'add'>('add');
  const [selectedDate, setSelectedDate] = useState('');

  /**
   * 날짜 클릭 시 호출되는 핸들러
   * - 해당 날짜에 대한 일정 목록을 보여주기 위한 모달 오픈
   */
  const handleClickDate = (date: Date) => {
    setSelectedDate(date.toLocaleDateString('sv-SE'));
    setModalMode('view');
    setModalOpen(true);
  };

  /**
   * 일정 추가 버튼 클릭 시 호출되는 핸들러
   */
  const handleAddEvent = (date: string) => {
    setSelectedDate(date);
    setModalMode('add');
    setModalOpen(true);
  };

  /**
   * 새로운 일정 등록 시 실행되는 콜백
   */
  const handleSubmit = (title: string, description: string, date: string) => {
    const newEvent: EventData = { date, title, description };
    setEvents((prev) => [...prev, newEvent]);
    setModalOpen(false);
  };

  return (
    <>
      <TitleArea>
        <ButtonUnit mode="goback">뒤로가기</ButtonUnit>
        <MainTitle>모임 캘린더</MainTitle>
      </TitleArea>
      <CalendarSection>
        <CalendarView events={events} onClickDate={handleClickDate} onClickAdd={handleAddEvent} />
      </CalendarSection>
      {modalOpen && (
        <CalendarModal
          selectedDate={selectedDate}
          mode={modalMode}
          onClose={() => setModalOpen(false)}
          events={events}
          onSubmit={handleSubmit}
          onUpdateEvents={(updated) => setEvents(updated)}
        />
      )}
    </>
  );
}

// 캘린더 wrapper
const CalendarSection = styled.section`
  padding: 2rem;
  margin-bottom: 2rem;
`;
