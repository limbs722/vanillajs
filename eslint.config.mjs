import { ESLint } from 'eslint';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    {
        files: ['**/*.ts', '**/*.js'],
        ignores: ['node_modules'], // node_modules 제외

        languageOptions: {
            parser: typescriptParser, // TypeScript 지원
            parserOptions: {
                project: './tsconfig.json',
            },
        },

        plugins: {
            '@typescript-eslint': typescriptPlugin, // TypeScript ESLint 플러그인 사용
            prettier, // Prettier 플러그인 사용
        },

        rules: {
            ...typescriptPlugin.configs.recommended.rules, // TypeScript 규칙 기본 제공
            'no-var': 'warn', // var 금지
            'no-multiple-empty-lines': 'warn', // 여러 줄 공백 금지
            'no-console': ['warn', { allow: ['warn', 'error'] }], // console.log() 금지
            eqeqeq: 'warn', // 일치 연산자 사용 필수
            'dot-notation': 'warn', // 가능하다면 dot notation 사용
            'no-unused-vars': 'warn', // 사용하지 않는 변수 금지
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                },
            ],
        },
    },

    // Prettier 설정 무시 (ESLint 규칙과 충돌 방지)
    {
        files: ['**/*.ts', '**/*.js'],
        rules: {
            ...prettierConfig.rules, // Prettier 설정 적용
        },
    },
];
