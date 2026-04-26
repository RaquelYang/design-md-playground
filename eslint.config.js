// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            tseslint.configs.recommended,
            tseslint.configs.stylistic,
            angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            // ── Selector 命名規範 ──────────────────────────────────────────
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],

            // ── 強制 Standalone 元件（禁止使用 NgModule）──────────────────
            '@angular-eslint/prefer-standalone': 'error',

            // ── 禁止 any 型別 ─────────────────────────────────────────────
            '@typescript-eslint/no-explicit-any': 'error',

            // ── 禁止未使用的變數 ──────────────────────────────────────────
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],

            // ── 禁止空函式（除非有 override 標記）────────────────────────
            '@typescript-eslint/no-empty-function': [
                'error',
                { allow: ['overrideMethods'] },
            ],
        },
    },
    {
        files: ['**/*.html'],
        extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
        rules: {
            // ── 強制使用新版控制流語法（@if、@for、@switch）───────────────
            // ── 禁止 *ngIf、*ngFor、*ngSwitch 等舊式結構型指令 ──────────
            '@angular-eslint/template/prefer-control-flow': 'error',

            // ── 無障礙：所有圖片必須有 alt ────────────────────────────────
            '@angular-eslint/template/alt-text': 'error',

            // ── 無障礙：互動元素必須有無障礙標籤 ────────────────────────
            '@angular-eslint/template/interactive-supports-focus': 'error',
        },
    },
]);
