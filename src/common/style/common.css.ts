// common.css.ts
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const commonStyle = css`
  input[type='text'],
  input[type='password'],
  input[type='email'],
  input[type='number'],
  input[type='address'],
  input[type='tel'] {
    border: var(--border);
    color: var(--textColor);
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: #fff;
    height: 4rem;
    width: 100%;
  }
  button {
    border: var(--border);
    color: var(--textColor);
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: #fff;
    height: 4rem;
  }

  textarea {
    border: var(--border);
    border-radius: 0.8rem;
    padding: 1rem;
  }

  .dn {
    display: none;
  }
  .ir {
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
  }
  .abs {
    position: absolute;
  }
  .rel {
    position: relative;
  }
  .abs_c {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .talc {
    text-align: center;
  }

  .required {
    position: relative;
  }
  .required::after {
    content: '';
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    margin-left: 0.2rem;
    vertical-align: top;
    border-radius: 100%;
    background: var(--primary);
  }

  .inner {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
`;

export const sectionStyle = css`
  width: 100%;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
`;
export const fullSize = css`
  width: 100%;
  height: 100%;
`;

export const flexStyle = css`
  display: flex;
`;
export const fc = css`
  flex-direction: column;
`;
export const jc = css`
  justify-content: center;
`;
export const jb = css`
  justify-content: space-between;
`;
export const js = css`
  justify-content: flex-start;
`;
export const je = css`
  justify-content: flex-end;
`;
export const alc = css`
  align-items: center;
`;
export const als = css`
  align-items: flex-start;
`;
export const ale = css`
  align-items: flex-end;
`;
export const noWrap = css`
  flex-wrap: nowrap;
`;
export const iconBtn = css`
  border: 0;
  font-size: 0;
  line-height: 0;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-color: initial;
`;

export const input01 = styled.input`
  border: 1px solid var(--border);
  width: 100%;
`;

export const section = styled.div`
  ${sectionStyle}
`;

export const FormWrapper = styled.div`
  max-width: 400px;
`;

export const TitleArea = styled.div`
  ${flexStyle}
  ${js}
  ${alc}
  button {
    margin-right: 1rem;
  }
`;
export const MainTitle = styled.h2`
  font-size: 2.6rem;
  font-weight: 700;
  text-align: left;
  margin: 3rem 0;
`;
export const sectionTitle = styled.h2`
  text-align: center;
  margin: 3rem 0;
  font-size: 2rem;
  font-weight: 500;
`;
export const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  text-align: left;
  margin-bottom: 3rem;
`;
export const containImg = styled.img`
  ${fullSize}
  object-fit: contain;
`;
export const coverImg = styled.img`
  ${fullSize}
  object-fit: cover;
`;

export const searchBtn = styled.button`
  ${iconBtn}
`;
export const searchBtnOrg = styled.button`
  ${iconBtn}
`;

// 모임,번개모임 생성 페이지에서 사용되는 스타일
export const ClubFormWrapper = styled.div`
  display: block;
  & > div {
    display: grid;
    grid-template-columns: 10rem 1fr;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 1rem;
    &.textarea_wrap {
      align-items: flex-start;
    }
    button {
      max-width: 20rem;
    }

    &.fit_content {
      grid-template-columns: 10rem min(15rem);
    }
  }
`;
