// common.css.ts
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import searchIcon from '../assets/icons/search.png';
import searchIconOrg from '../assets/icons/search-org.png';
import { AppTheme, theme as defaultTheme } from './theme.css';

type ThemeType = typeof defaultTheme;
export const globalStyles = (t: ThemeType) => css`
  input[type='text'],
  input[type='password'],
  input[type='email'],
  input[type='number'],
  input[type='address'],
  input[type='tel'] {
    border: 1px solid ${t.colors.border};
    color: ${t.colors.text};
    border-radius: ${t.border.radius};
    padding: ${t.spacing.xs} ${t.spacing.md};
    background: ${t.backgrounds.white};
    height: 2.5rem;
    width: 100%;
    margin-bottom: ${t.spacing.md};
  }
  button {
    border: ${t.border.width} ${t.border.style} ${t.colors.border};
    color: ${t.colors.text};
    border-radius: ${t.border.radius};
    padding: 0 ${t.spacing.xl};
    background: ${t.backgrounds.light};
    height: 2.5rem;
  }
  button[type='submit'] {
    width: 100%;
    font-weight: ${t.fontWeights.medium};
    color: ${t.colors.white || '#ffffff'};
    border: 0;
    background: ${t.colors.primary};
  }

  /* 나머지 스타일들 동일하게 t를 사용하여 참조 */
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
    background: ${t.colors.primary};
  }

  .inner {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }

  h2.headline {
    font-size: ${t.fontSizes.xl};
    font-weight: ${t.fontWeights.bold};
  }

  .chk_box {
    display: inline-block;
    position: relative;
    line-height: 1.8rem;
  }
  .chk_box label {
    display: inline-block;
    padding-left: 2.4rem;
  }
  .chk_box input[type='checkbox'] {
    position: absolute;
    top: 0.4rem;
    left: 0;
  }
  .chk_box label:before {
    content: '';
    position: absolute;
    top: 0.4rem;
    left: 0;
    width: 1.8rem;
    height: 1.8rem;
    background: url(../images/ic_chk.png) no-repeat 0 0;
  }
  .chk_box input[type='checkbox']:checked + label:before {
    background: url(../images/ic_chk_on.png) no-repeat 0 0;
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

export const input01 = styled.input<{ theme: AppTheme }>`
  border: 1px solid ${(props) => props.theme.colors.border};
  width: 100%;
`;

export const section = styled.div`
  ${sectionStyle}
`;
export const sectionTitle = styled.h2<{ theme: AppTheme }>`
  text-align: center;
  margin: 3rem 0;
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.medium};
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
  background-image: url(${searchIcon});
  ${iconBtn}
`;
export const searchBtnOrg = styled.button`
  background-image: url(${searchIconOrg});
  ${iconBtn}
`;
