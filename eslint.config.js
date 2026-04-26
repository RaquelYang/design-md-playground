// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const rxjs = require('eslint-plugin-rxjs-x');

module.exports = defineConfig([
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            tseslint.configs.recommended,
            tseslint.configs.stylistic,
            angular.configs.tsRecommended,
            rxjs.configs.recommended,
        ],
        processor: angular.processInlineTemplates,
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
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

            // ── RxJS 最佳實踐 ──────────────────────────────────────────────
            // 禁止在 subscribe 內巢狀 subscribe（應改用 switchMap/mergeMap）
            'rxjs-x/no-nested-subscribe': 'error',
            // subscribe 沒有處理 error callback（應提供第二個參數）
            'rxjs-x/no-ignored-error': 'error',
            // 有 Observable 未被訂閱也未被 pipe（可能遺漏）
            'rxjs-x/no-ignored-observable': 'warn',
            // 禁止 Subject 在 unsubscribe 後繼續使用
            'rxjs-x/no-subject-unsubscribe': 'error',
            // takeUntil 必須放在 pipe 的最後一個運算子
            'rxjs-x/no-unsafe-takeuntil': 'error',
            // 禁止在 pipe 內不當使用 tap（應只用於 side-effect 觀察）
            'rxjs-x/no-tap': 'warn',
            // 禁止使用已廢棄的 RxJS 相容 API
            'rxjs-x/no-compat': 'error',
            // Subject 型別必須明確（禁止 Subject<any>）
            'rxjs-x/no-explicit-generics': 'warn',
            // Subject 變數名稱必須以 $ 結尾（可辨識 Observable）
            'rxjs-x/suffix-subjects': 'warn',
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
