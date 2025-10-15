import js from '@eslint/js';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginImport from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

// eslint-disable-next-line import/no-default-export
export default [
  ...tseslint.config(),
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        Response: 'readonly',
        // optional weitere Fetch-API globals:
        Request: 'readonly',
        fetch: 'readonly',
        Headers: 'readonly',
      },
    },
  },
  {
    ignores: [
      'node_modules',
      '**/temp.js',
      'config/*',
      '**/dist/*',
      '**/build/*',
      '**/public/*',
      'vite.config.js',
      'vitest.config.ts',
      '**/setupTests.ts',
      '**/init-catchall-redirect.tsx',
      '**/**.test.tsx',
      '**/catchall-redirect.tsx',
      '**/entry.server.tsx',
      '**/entry.client.tsx',
      '**/config.server.ts',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      react,
      prettier,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      import: eslintPluginImport,
    },
    rules: {
      // TypeScript-spezifisch
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
        },
      ],
      'no-unused-vars': 'off',

      // React-spezifisch
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Prettier aktivieren
      'prettier/prettier': 'warn',
      'no-console': 'warn',

      // Sort imports
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'unused-imports/no-unused-imports': 'error',

      'no-var': 'error',
      'prefer-const': 'error',
      'no-else-return': 'error',
      'no-return-await': 'error',
      'max-classes-per-file': ['error', 2],
      'dot-notation': 'warn',
      'dot-location': ['error', 'property'],
      'no-empty-function': 'off',
      '@/no-empty-function': 'off',

      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      'import/no-default-export': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
