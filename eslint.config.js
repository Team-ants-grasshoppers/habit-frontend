import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import * as tsPlugin from '@typescript-eslint/eslint-plugin';

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.json', // 타입 정보 기준 tsconfig
        tsconfigRootDir: process.cwd(), // 루트 디렉토리 설정
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
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
          selector: 'variableLike',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
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
