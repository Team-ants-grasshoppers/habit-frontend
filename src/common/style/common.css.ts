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
    padding: 0 2rem;
    background: #fff;
    height: 4rem;
  }
  button[type='submit'] {
    width: 100%;
    font-weight: 500;
    color: #fff;
    border: 0;
    background: var(--primary);
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
export const sectionTitle = styled.h2`
  text-align: center;
  margin: 3rem 0;
  font-size: 2rem;
  font-weight: 500;
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
