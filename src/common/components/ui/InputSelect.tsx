/**
 * @file InputSelect.tsx
 * @description checkbox 또는 radio 타입을 선택하는 입력 컴포넌트 (타입별 이미지 적용)
 */

import styled from '@emotion/styled';

interface InputSelectProps {
  type: 'checkbox' | 'radio'; // 타입 지정
  name: string;
  options: string[]; // 옵션 리스트
  selected?: string[]; // 선택된 값들
  onChange: (updated: string[]) => void;
}

/**
 * 선택형 입력 컴포넌트
 * - checkbox/radio 타입별 다른 이미지 스타일 적용
 */
export const InputSelect = ({ type, name, options, selected = [], onChange }: InputSelectProps) => {
  const handleChange = (value: string) => {
    if (type === 'checkbox') {
      const updated = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];
      onChange(updated);
    } else {
      onChange([value]);
    }
  };

  return (
    <SelectWrapper>
      {options.map((option) => (
        <Label key={option}>
          <StyledInput
            type={type}
            typeStyle={type}
            name={name}
            value={option}
            checked={selected.includes(option)}
            onChange={() => handleChange(option)}
          />
          <span>{option}</span>
        </Label>
      ))}
    </SelectWrapper>
  );
};

export default InputSelect;

// =================== 스타일 ===================

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
`;

/**
 * 타입별 다른 스타일을 적용하는 Styled Input
 */
const StyledInput = styled.input<{ typeStyle: 'checkbox' | 'radio' }>`
  appearance: none;
  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid var(--border);
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  ${({ typeStyle }) =>
    typeStyle === 'checkbox' &&
    `
      background: url('/icons/checkbox_off.png')no-repeat center / contain;
      &:checked {
        background: url('/icons/checkbox_on.png')no-repeat center / contain;
      }
    `}

  ${({ typeStyle }) =>
    typeStyle === 'radio' &&
    `
        background: url('/icons/radio_off.png')no-repeat center / contain;
        &:checked {
        background: url('/icons/radio_on.png')no-repeat center / contain;
        }
    `}
`;
