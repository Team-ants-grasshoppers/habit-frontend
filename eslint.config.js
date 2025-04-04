import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import * as tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';

export default await tseslint.config(
  {
    ignores: ['dist'],
  },

  // ✅ 기본 TypeScript 파일 설정
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: process.cwd(),
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react: reactPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'variableLike',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
      ],
      'require-jsdoc': 'off',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },

  // ✅ 컴포넌트 경로에만 PascalCase 적용 (오버라이드처럼 작동)
  {
    files: ['src/**/components/**/*.tsx'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          modifiers: ['const', 'exported'],
          types: ['function'],
          format: ['PascalCase'],
        },
      ],
    },
  },
  // ✅ pages 경로에 PascalCase 적용 (오버라이드처럼 작동)
  {
    files: ['src/**/pages/**/*.tsx'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          modifiers: ['const', 'exported'],
          types: ['function'],
          format: ['PascalCase'],
        },
      ],
    },
  },
  {
    rules: {
      ...prettier.rules,
    },
  },
);
