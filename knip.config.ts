import type { KnipConfig } from 'knip';

const config: KnipConfig = {
    // ── 進入點（Angular 應用程式的根入口）─────────────────────────────────
    entry: ['src/app/app.routes.ts', 'src/app/app.config.ts'],

    // ── 掃描範圍 ──────────────────────────────────────────────────────────
    project: ['src/**/*.{ts,html,scss}'],

    // ── 忽略未列出但實際由框架使用的相依套件 ────────────────────────────
    ignoreDependencies: [
        '@angular-eslint/builder', // Angular CLI 工具鏈內部使用
        '@commitlint/types', // @commitlint/cli 附帶的型別定義
    ],

    // ── 忽略 devDependencies 中工具鏈套件（不需被 import 才算使用）──────
    ignoreBinaries: [],

    // ── TypeScript 設定 ──────────────────────────────────────────────────
    typescript: {
        config: ['tsconfig.app.json'],
    },
};

export default config;
