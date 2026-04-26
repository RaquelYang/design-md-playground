// @ts-check

/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // ── Type 規則 ─────────────────────────────────────────────────────────
        // 允許的 commit 類型
        'type-enum': [
            2,
            'always',
            [
                'feat',     // 新功能
                'fix',      // 修正 Bug
                'refactor', // 重構（不影響功能）
                'style',    // 純格式調整（SCSS、縮排等）
                'docs',     // 文件修改
                'test',     // 測試相關
                'chore',    // 雜務（相依套件、設定）
                'perf',     // 效能優化
                'build',    // 建構系統修改
                'ci',       // CI/CD 設定修改
                'revert',   // 回退 commit
            ],
        ],
        // type 必須小寫
        'type-case': [2, 'always', 'lower-case'],
        // type 不可為空
        'type-empty': [2, 'never'],

        // ── Scope 規則 ────────────────────────────────────────────────────────
        // scope 允許的範圍（對應專案功能模組）
        'scope-enum': [
            1,
            'always',
            [
                'hero',
                'navigation',
                'cards',
                'workflow',
                'header',
                'footer',
                'layout',
                'shared',
                'core',
                'styles',
                'deps',
                'config',
            ],
        ],
        // scope 必須小寫（kebab-case 相容）
        'scope-case': [2, 'always', 'lower-case'],

        // ── Subject 規則 ──────────────────────────────────────────────────────
        // subject 不可為空
        'subject-empty': [2, 'never'],
        // subject 結尾不加句號
        'subject-full-stop': [2, 'never', '.'],
        // subject 最大長度
        'subject-max-length': [2, 'always', 72],

        // ── Body 規則 ─────────────────────────────────────────────────────────
        // body 前須空一行
        'body-leading-blank': [1, 'always'],
        // body 每行最大長度
        'body-max-line-length': [2, 'always', 100],

        // ── Footer 規則 ───────────────────────────────────────────────────────
        // footer 前須空一行
        'footer-leading-blank': [1, 'always'],
        // footer 每行最大長度
        'footer-max-line-length': [2, 'always', 100],
    },
};
