# Design MD Playground

Angular 21 前端專案，遵循 [Vercel / Geist 設計系統](./DESIGN.md)。

## 技術堆疊

| 項目 | 版本 |
|---|---|
| Angular | 21.x（Standalone + Signals + Zoneless） |
| Angular Material | 21.x（M3 Theme） |
| TypeScript | 5.x（strict mode） |
| 樣式 | SCSS + CSS 自訂屬性 |
| 字型 | Geist Sans / Geist Mono |

---

## 資料夾結構

```
design-md-playground/
├── DESIGN.md                        # 設計規格唯一來源（色彩 / 排版 / 間距 token）
├── AGENTS.md                        # Agent 行為指引
├── angular.json                     # Angular CLI 設定
├── package.json
├── tsconfig.json
│
└── src/
    ├── main.ts                      # 應用程式進入點
    ├── index.html
    │
    ├── styles.scss                  # 全域樣式進入點（只做 @use，不寫規則）
    ├── styles/                      # 全域樣式（7-1 Pattern，透過 styles.scss 統一載入）
    │   ├── abstracts/               # 設計 Token + SCSS 工具（不輸出 CSS）
    │   │   ├── _variables.scss      # DESIGN.md 所有 CSS 自訂屬性 Token
    │   │   └── _mixins.scss         # SCSS Mixin（respond-to / focus-ring / shadow）
    │   ├── base/                    # 全域基礎樣式
    │   │   ├── _reset.scss          # CSS Reset + body 基礎樣式
    │   │   └── _typography.scss     # 排版輔助類別（.text-display-hero 等）
    │   ├── components/              # 元件層級共用 SCSS（_button.scss 等）
    │   ├── layout/                  # 全域版面佈局 SCSS（_grid.scss 等）
    │   ├── pages/                   # 頁面專屬 SCSS
    │   ├── themes/                  # 主題切換 SCSS（Dark Mode 等）
    │   └── vendors/                 # 第三方套件樣式
    │       └── _material.scss       # Angular Material M3 Theme 定義 + 元件覆寫
    │
    └── app/
        ├── app.ts                   # 根元件（僅 <router-outlet />）
        ├── app.config.ts            # ApplicationConfig（providers）
        ├── app.routes.ts            # 根路由（MainLayout 作為殼層）
        │
        ├── core/                    # 全域單例，每個 App 只需一份
        │   ├── services/            # providedIn: 'root' 服務（ThemeService 等）
        │   ├── guards/              # 路由守衛（AuthGuard 等）
        │   └── interceptors/        # HTTP Interceptor
        │
        ├── shared/                  # 跨 feature 可重用，需 2+ 個 feature 使用才移入
        │   ├── components/          # 共用 UI 元件（Button / Badge / Card / Input...）
        │   ├── directives/          # 共用指令
        │   └── pipes/               # 共用 Pipe
        │
        ├── layout/                  # 頁面骨架，不含業務邏輯
        │   ├── header/
        │   │   ├── header.ts        # sticky header + 主要導覽列
        │   │   ├── header.html
        │   │   └── header.scss
        │   ├── footer/
        │   │   ├── footer.ts
        │   │   ├── footer.html
        │   │   └── footer.scss
        │   └── main-layout/
        │       ├── main-layout.ts   # Header + <router-outlet> + Footer 容器
        │       ├── main-layout.html
        │       └── main-layout.scss
        │
        └── features/                # 功能模組（各自獨立，lazy load）
            └── [feature-name]/
                ├── [feature].ts     # Standalone Component + Signals
                ├── [feature].html
                ├── [feature].scss
                ├── [feature].routes.ts   # 子路由（若有子頁面）
                └── components/          # 僅此 feature 使用的子元件
```

---

## 樣式使用規則

### 全域 CSS 自訂屬性（在任何元件 SCSS 中直接使用）

```scss
// 色彩
var(--color-bg)               // #ffffff
var(--color-text-primary)     // #171717
var(--color-text-secondary)   // #4d4d4d
var(--color-text-muted)       // #666666
var(--color-link)             // #0072f5
var(--color-focus)            // hsla(212, 100%, 48%, 1)
var(--color-badge-bg)         // #ebf5ff
var(--color-badge-text)       // #0068d6

// Workflow 強調色（僅限 Workflow 情境）
var(--color-develop)          // #0a72ef
var(--color-preview)          // #de1d8d
var(--color-ship)             // #ff5b4f

// 圓角
var(--radius-button)          // 6px
var(--radius-card)            // 8px
var(--radius-pill)            // 9999px

// 陰影（shadow-as-border 哲學，取代 CSS border）
var(--shadow-border)          // 0px 0px 0px 1px rgba(0,0,0,0.08)
var(--shadow-ring)            // 0px 0px 0px 1px rgb(235,235,235)
var(--shadow-card)            // 多層陰影堆疊

// 字型
var(--font-sans)              // Geist, Arial...
var(--font-mono)              // Geist Mono, ui-monospace...

// 間距
var(--spacing-xs)             // 4px
var(--spacing-sm)             // 8px
var(--spacing-md)             // 16px
var(--spacing-lg)             // 32px
var(--spacing-xl)             // 40px
var(--spacing-section)        // 80px
```

### SCSS Mixin（在元件 SCSS 中 `@use`）

```scss
@use '../../styles/abstracts/mixins' as *;

// 響應式斷點（Mobile-first）
@include respond-to('tablet-sm') { ... }  // 768px+
@include respond-to('desktop') { ... }    // 1200px+

// Focus Ring（無障礙必要）
@include focus-ring();

// Shadow-as-Border
@include shadow-card();
```

---

## 新增 Feature 步驟

1. 在 `src/app/features/` 建立新資料夾
2. 使用 Angular CLI 生成元件：
   ```bash
   ng g c features/my-feature
   ```
3. 在 `app.routes.ts` 的 `children` 加入 lazy route：
   ```typescript
   {
     path: 'my-feature',
     loadComponent: () =>
       import('./features/my-feature/my-feature').then(m => m.MyFeatureComponent),
   }
   ```

---

## 開發指令

```bash
# 啟動開發伺服器
npm start

# 建構
npm run build

# 執行測試
npm test
```

---

> 此專案由 [Angular CLI](https://github.com/angular/angular-cli) v21.2.7 建立。詳細 CLI 指令請參考 [Angular CLI 文件](https://angular.dev/tools/cli)。
