import styled from '@emotion/styled';

interface InputSelectProps {
  type: 'checkbox' | 'radio';
  name: string;
  options: string[];
  selected?: string[];
  onChange: (updated: string[]) => void;
}

/**
 * 선택형 input 컴포넌트
 *
 * 필수 Props
 * - type : 'checkbox' | 'radio'
 * - name : 그룹화 및 id값에 할당
 * - options : 옵션 리스트
 * - onChange
 *
 * 선택 Props
 * - selected : 선택된 값
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
    <>
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
    </>
  );
};

export default InputSelect;

// =================== 스타일 ===================

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
`;

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
