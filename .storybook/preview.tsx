/** @jsxImportSource @emotion/react */
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from '../src/common/style/GlobalStyle';
import { theme } from '../src/common/style/theme.css';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

// ✅ 전역 스타일 + 테마 적용
export const decorators = [
  (Story: React.FC) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

export default preview;
