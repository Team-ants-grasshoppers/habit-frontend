/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import { commonStyle } from './common.css';

const resetStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.9/static/pretendard.css');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

  :root {
    --primary: #ed7d58;
    --primary-orange: #ed7d58;
    --primary-green: #3b8d82;
    --primary-yellow: #ffd46c;
    --primary-light-yellow: #fcf7eb;
    --mauve: #e7dcda;
    --error: #e1380b;
    --black: #000;
    --white: #fff;
    --light_gray: #efefef;
    --dark_gray: #333;
    --gray: #ccc;
    --black_90: rgba(0, 0, 0, 0.9);
    --black_80: rgba(0, 0, 0, 0.8);
    --black_70: rgba(0, 0, 0, 0.7);
    --black_60: rgba(0, 0, 0, 0.6);
    --black_50: rgba(0, 0, 0, 0.5);
    --black_40: rgba(0, 0, 0, 0.4);
    --black_30: rgba(0, 0, 0, 0.3);
    --black_20: rgba(0, 0, 0, 0.2);
    --black_10: rgba(0, 0, 0, 0.1);
    --white_90: rgba(255, 255, 255, 0.9);
    --white_80: rgba(255, 255, 255, 0.8);
    --white_70: rgba(255, 255, 255, 0.7);
    --white_60: rgba(255, 255, 255, 0.6);
    --white_50: rgba(255, 255, 255, 0.5);
    --white_40: rgba(255, 255, 255, 0.4);
    --white_30: rgba(255, 255, 255, 0.3);
    --white_20: rgba(255, 255, 255, 0.2);
    --white_10: rgba(255, 255, 255, 0.1);

    --textColor: #1b1819;
    --textColor_dark: #757575;
    --textColor_light: #a1a1a1;

    --border: 1px solid #efefef;
    --border_dark: 2px solid #1b1819;
    --radius: 0.8rem;
    --inputHeight: 5rem;
    --shadow: #eee 1px 1px 5px 0px;
  }

  html,
  body {
    font-size: 62.5%;
  }
  body {
    background: var(--primary-yellow);
  }
  #root {
    position: relative;
    width: 100%;
    height: auto;
    margin: 0 auto;
  }
  * {
    font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
    box-sizing: border-box;
    font-size: 1.6rem;
    font-weight: normal;
    font-style: normal;
    color: #000;
    line-height: 1;
    letter-spacing: normal;
    padding: 0;
    margin: 0;
    word-break: keep-all;
    /* transition: all 0.3s; */
  }

  header,
  footer,
  aside,
  main,
  section,
  article,
  nav {
    display: block;
  }

  ol,
  ul,
  li {
    list-style: none;
  }

  span,
  strong,
  b,
  em {
    color: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    letter-spacing: inherit;
  }

  button,
  textarea,
  input,
  select,
  a {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    border: none;
    background-color: transparent;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
  }

  button {
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
  }

  a,
  button {
    text-decoration: none;
  }

  a,
  button {
    cursor: pointer;
  }

  *:focus,
  a:hover,
  button:hover,
  input:hover,
  a *:hover {
    outline: none;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  img {
    max-width: 100%;
  }

  iframe {
    border: none;
    width: 100%;
    height: 100%;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 100px #fff inset;
    -moz-box-shadow: 0 0 0 100px #fff inset;
    box-shadow: 0 0 0 100px #fff inset;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0;
    cursor: pointer;
  }

  select::-ms-expand {
    display: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }

  ::selection {
    color: #fff;
    background: rgba(0, 0, 0, 0.99);
  }

  font {
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    line-height: inherit;
  }

  legend {
    display: block;
    border: none;
    padding: 0;
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
    min-width: 0;
  }

  textarea {
    resize: vertical;
  }

  /* 미디어쿼리 */
  /* @media (max-width: 1560px)  {
    html, body {font-size: 54%;}
  }
  @media (max-width: 1440px)  {
      html, body {font-size: 50%;}
  }
  @media (max-width: 1150px)  {
      html, body {font-size: 42%;}
  } */
`;

const GlobalStyle: React.FC = () => {
  return (
    <>
      <Global styles={resetStyle} />
      <Global styles={commonStyle} />
    </>
  );
};

export default GlobalStyle;
