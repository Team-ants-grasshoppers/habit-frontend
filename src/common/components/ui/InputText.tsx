import styled from '@emotion/styled';

type InputTextType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';

interface InputTextProps {
  type: InputTextType;
  name: string;
  value: string;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
  onChange: (value: string) => void;
}

/**
 * 입력 input 컴포넌트
 *
 * 필수 Props
 * - type : 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
 * - name : 그룹화 및 id값에 할당
 * - value : 값
 * - onChange
 *
 * 선택 Props
 * - label : <label>텍스트
 * - placeholder : string
 * - readonly : boolean
 */

export const InputText = ({
  type,
  name,
  value,
  label,
  placeholder,
  readonly = false,
  onChange,
}: InputTextProps) => {
  return (
    <TextWrapper>
      {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
      <StyledInput
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        inputType={type}
        readOnly={readonly}
        onChange={(e) => onChange(e.target.value)}
      />
    </TextWrapper>
  );
};

export default InputText;

// =================== 스타일 ===================

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledLabel = styled.label`
  font-size: 1.4rem;
  font-weight: bold;
`;

const StyledInput = styled.input<{ inputType: InputTextType }>`
  padding: 0.8rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 1.6rem;
  background: white;
  transition: all 0.2s;

  ${({ inputType }) =>
    inputType === 'number' &&
    `
    text-align: right;
    background: var(--light_gray);
  `}

  ${({ inputType }) =>
    (inputType === 'text' ||
      inputType === 'password' ||
      inputType === 'email' ||
      inputType === 'tel' ||
      inputType === 'url' ||
      inputType === 'search') &&
    `
    text-align: left;
  `}

  &:focus {
    outline: none;
    border-color: var(--black);
  }
`;
