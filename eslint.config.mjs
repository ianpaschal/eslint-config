import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importNewlines from 'eslint-plugin-import-newlines';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export const base = [
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@stylistic': stylistic,
      'import-newlines': importNewlines,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...js.configs.recommended.rules,

      // Style
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/arrow-spacing': ['error', { 'before': true, 'after': true }],
      '@stylistic/brace-style': 'error',
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/lines-around-comment': ['error', { beforeLineComment: true }],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': 'error',
      '@stylistic/type-annotation-spacing': 'error',

      // Misc.
      'arrow-body-style': ['error', 'as-needed'],
      'curly': ['error'],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],

      // Plugin configurations
      'import-newlines/enforce': ['error', { items: 2,'max-len': 100 }],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': ['error', {
        'groups': [
          ['^react', '^@?\\w'], // External Packages (React related first)
          ['^src', '^~(/.*|$)', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Internal packages
          ['^.+\\.?(css|scss)$'], // Style
        ],
      }],
    },
  },
];

export const typescript = tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  extends: tseslint.configs.recommended,
  languageOptions: {
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  rules: {

    // Replace JS rules with TS rules
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {
      'argsIgnorePattern': '^_',
      'destructuredArrayIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
    }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
  },
});

export const react = [
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': reactPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,

      // react-hooks
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',

      // react-refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // react
      'react/display-name': 'off',
      'react/jsx-key': 'off',
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',

      // ENABLE LATER
      // 'react/jsx-sort-props': ['error', {
      //   callbacksLast: true,
      //   multiline: 'last',
      //   reservedFirst: true,
      //   ignoreCase: true,
      // }],
      // 'react/jsx-max-props-per-line': ['error', {
      //   maximum: 1,
      //   when: 'multiline',
      // }],
    },
  },
];

export default [...base, ...typescript, ...react];
