import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';

export default [
    {
        languageOptions: {
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
            },
        },
        plugins: { '@typescript-eslint': ts, react },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
            }],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
