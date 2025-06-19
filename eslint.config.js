import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';

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
        plugins: { '@typescript-eslint': ts, react, prettier, },
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
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
