import { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarView = () => {
  const [calendarValue, setCalendarValue] = useState<Value>(new Date());
  const onChangeCalendar = useCallback(() => {
    setCalendarValue(calendarValue);
  }, [calendarValue]);
  return (
    <div>
      <Calendar
        value={calendarValue}
        onChange={onChangeCalendar}
        calendarType="gregory"
        locale="ko-KR"
      />
    </div>
  );
};

export default CalendarView;
