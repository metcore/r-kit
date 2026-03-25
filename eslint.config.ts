import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
  },

  {
    plugins: {
      'react-hooks': reactHooks,
      prettier,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'react/react-in-jsx-scope': 'off',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/no-floating-promises': 'error',

      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-key': 'error',
      'react/no-unknown-property': 'error',

      'react/prop-types': 'off',

      'prettier/prettier': [
        'error',
        {
          quoteProps: 'consistent',
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'es5',
          useTabs: false,
        },
      ],
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'eslint.config.ts',
      'commitlint.config.js',
      'tsup.config.ts',
    ],
  },
]);
