import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import rnEslintConfig from './rn-eslint.config.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']},
  {languageOptions: {globals: globals.node}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  ...importPlugin.flatConfigs.recommended,
  reactHooksPlugin.configs.recommended,
  rnEslintConfig,
  {
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          target: [
            './src/components',
            './src/hooks',
            './src/lib',
            './src/types',
            './src/utils',
          ],

          from: ['./src/features', './src/app'],
        },
      ],
    },
    'import/no-cycle': 'error',
    'linebreak-style': ['error', 'unix'],
    'react/prop-types': 'off',
  },
];
