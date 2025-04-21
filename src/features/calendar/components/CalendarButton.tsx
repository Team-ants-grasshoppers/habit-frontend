/**
 * @file /src/feature/calendar/components/CalendarButton.tsx
 * @description 일정 추가 버튼 컴포넌트
 */
import ButtonUnit from '../../../common/components/ui/Buttons';

interface AddEventButtonProps {
  onClick: () => void;
}

export const AddEventButton = ({ onClick }: AddEventButtonProps) => {
  return (
    <ButtonUnit mode="base" onClick={onClick}>
      + 일정 추가
    </ButtonUnit>
  );
};
