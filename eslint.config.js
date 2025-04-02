import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import * as tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default await tseslint.config(
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser, // ⬅️ 이거 반드시 필요!
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: process.cwd(),
      },
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin, // ⬅️ 이것도 정확히 지정
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
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
          selector: 'variable',
          modifiers: ['const'],
          types: ['function'],
          format: ['camelCase'], // ✅ 훅은 camelCase 유지
          filter: {
            regex: '^use[A-Z].*', // ✅ use로 시작하는 이름은 camelCase 허용
            match: true,
          },
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          types: ['function'],
          format: ['camelCase'], // ✅ 훅은 camelCase 유지
          filter: {
            regex: '^set[A-Z].*', // ✅ use로 시작하는 이름은 camelCase 허용
            match: true,
          },
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          // ✅ React 컴포넌트 (export된 const 함수형 변수)만 PascalCase 허용
          selector: 'variable',
          modifiers: ['const', 'exported'],
          types: ['function'],
          format: ['PascalCase'],
        },
        {
          // ✅ 나머지 일반 변수, 함수는 camelCase 유지
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
  {
    rules: {
      ...prettier.rules,
    },
  },
);
