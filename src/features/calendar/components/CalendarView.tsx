/**
 * @file /src/feature/calendar/components/CalendarView.tsx
 * @description 일정 마킹과 날짜 클릭 기능을 제공하는 캘린더 컴포넌트
 */
import { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { AddEventButton } from './CalendarButton';
import styled from '@emotion/styled';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

/**
 * @typedef {Object} Event
 * @property {string} date - 일정 날짜 (YYYY-MM-DD)
 * @property {string} title - 제목
 * @property {string} [description] - 설명
 */
interface Event {
  date: string;
  title: string;
  description?: string;
}

/**
 * @typedef {Object} Props
 * @property {Event[]} events - 캘린더에 표시할 일정 목록
 * @property {(date: Date) => void} onClickDate - 날짜 클릭 시 호출
 * @property {(date: string) => void} onClickAdd - 일정 추가 버튼 클릭 시 호출
 */
interface Props {
  events: Event[];
  onClickDate: (date: Date) => void;
  onClickAdd: (date: string) => void;
}

export const CalendarView = ({ events, onClickDate, onClickAdd }: Props) => {
  const [calendarValue, setCalendarValue] = useState<Value>(new Date());

  const onChangeCalendar = useCallback(() => {
    setCalendarValue(calendarValue);
  }, [calendarValue]);

  const handleAddEvent = () => {
    const today = new Date().toLocaleDateString('sv-SE');
    onClickAdd(today);
  };

  return (
    <CalendarWrapper>
      <div className="btn_addevent">
        <AddEventButton onClick={handleAddEvent} />
      </div>
      <Calendar
        value={calendarValue}
        onChange={onChangeCalendar}
        onClickDay={onClickDate}
        calendarType="gregory"
        locale="en-US"
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={false}
        tileContent={({ date, view }) => {
          const formatted = date.toLocaleDateString('sv-SE');
          const hasEvent = events.some((e) => e.date === formatted);
          return view === 'month' && hasEvent ? <Dot /> : null;
        }}
      />
    </CalendarWrapper>
  );
};

export default CalendarView;

const CalendarWrapper = styled.div`
  position: relative;
  .btn_addevent {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  margin: 4px auto 0;
  background-color: var(--primary);
  border-radius: 50%;
`;
