import globals from 'globals';
import jsPlugin from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin, // Adiciona o plugin Prettier
    },
    rules: {
      ...prettierConfig.rules, // Inclui as regras do Prettier
      'prettier/prettier': 'error', // Gera erro para violações do Prettier
      '@typescript-eslint/no-explicit-any': ['error'],
    },
  },
];
