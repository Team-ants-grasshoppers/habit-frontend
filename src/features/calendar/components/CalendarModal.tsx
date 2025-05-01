/**
 * @file /src/feature/calendar/components/CalendarModal.tsx
 * @description 날짜별 일정 보기, 등록, 수정, 삭제 가능한 모달 컴포넌트
 */
import { useState } from 'react';
import Modal from '../../../common/components/ui/Modal';
import ButtonUnit from '../../../common/components/ui/Buttons';
import styled from '@emotion/styled';

interface Event {
  date: string;
  title: string;
  description?: string;
}

interface Props {
  selectedDate: string;
  mode: 'view' | 'add' | 'edit';
  onClose: () => void;
  events: { date: string; title: string; description?: string }[];
  onSubmit: (title: string, description: string, date: string) => void;
  onUpdateEvents: (updatedEvents: Event[]) => void;
}

export const CalendarModal = ({
  selectedDate,
  mode: initialMode,
  onClose,
  events,
  onSubmit,
  onUpdateEvents,
}: Props) => {
  const filtered = events.filter((e) => e.date === selectedDate);

  const [mode, setMode] = useState<'view' | 'add' | 'edit'>(initialMode);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(selectedDate);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  /** * 일정 등록 또는 수정 처리 */
  const handleSubmit = () => {
    if (!title.trim()) return alert('제목을 입력하세요!');
    if (mode === 'edit' && editingIndex !== null) {
      const updated = [...events];
      updated[editingIndex] = { date, title, description: desc };
      onUpdateEvents(updated);
    } else {
      onSubmit(title, desc, date);
    }
    resetForm();
  };

  /** * 일정 삭제 처리 */
  const handleDelete = (index: number) => {
    const updated = [...events];
    updated.splice(index, 1);
    onUpdateEvents(updated);
  };

  /** * 수정 버튼 클릭 시 mode='edit'로 전환 */
  const startEdit = (event: Event, index: number) => {
    setEditingIndex(index);
    setTitle(event.title);
    setDesc(event.description || '');
    setDate(event.date);
    setMode('edit');
  };

  /** * 폼 초기화 및 뷰 모드 전환 */
  const resetForm = () => {
    setMode('view');
    setTitle('');
    setDesc('');
    setDate(selectedDate);
    setEditingIndex(null);
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2 style={{ marginBottom: '1rem' }}>
        {mode === 'view' ? `📅 ${selectedDate} 일정` : '일정 추가'}
      </h2>

      {mode === 'view' ? (
        <>
          <EventWrapper>
            {filtered.length > 0 ? (
              <ul>
                {filtered.map((event, i) => (
                  <EventCard key={i}>
                    <strong>{event.title}</strong>
                    {event.description && <p>{event.description}</p>}
                    <ButtonRow>
                      <ButtonUnit
                        mode="text"
                        onClick={() => startEdit(event, events.indexOf(event))}
                      >
                        수정
                      </ButtonUnit>
                      <ButtonUnit mode="cancel" onClick={() => handleDelete(events.indexOf(event))}>
                        삭제
                      </ButtonUnit>
                    </ButtonRow>
                  </EventCard>
                ))}
              </ul>
            ) : (
              <p>등록된 일정이 없습니다.</p>
            )}
          </EventWrapper>
          <ButtonUnit mode="confirm" onClick={() => setMode('add')}>
            + 일정 추가
          </ButtonUnit>
        </>
      ) : (
        <>
          <FormGroup>
            제목
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormGroup>

          <FormGroup>
            설명
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} />
          </FormGroup>

          <FormGroup>
            날짜
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </FormGroup>

          <ButtonRow>
            <ButtonUnit mode="cancel" onClick={() => setMode('view')}>
              취소
            </ButtonUnit>
            <ButtonUnit mode="confirm" onClick={handleSubmit}>
              {mode === 'edit' ? '수정 완료' : '등록'}
            </ButtonUnit>
          </ButtonRow>
        </>
      )}
    </Modal>
  );
};

const EventWrapper = styled.div`
  padding: 3rem 0;
`;
const EventCard = styled.li`
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

  strong {
    display: block;
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
  }
  p {
    font-size: 1.4rem;
    padding: 0 0.5rem;
  }
`;

const FormGroup = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-weight: 500;

  input,
  textarea {
    display: block;
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.6rem 0.8rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;
