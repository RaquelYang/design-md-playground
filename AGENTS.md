# AGENTS.md — Angular 21 前端專案 Agent 指引

## 專案概覽

本專案為 **Angular 21** 前端網頁應用，視覺設計完全依循 **Vercel / Geist 設計系統**，詳細規格記載於 [`DESIGN.md`](./DESIGN.md)。

- **框架**：Angular 21（Standalone Components、Signals、Zoneless）
- **語言**：TypeScript 5.x（strict mode 開啟）
- **樣式**：SCSS，遵循 Vercel Geist 設計規範
- **字型**：Geist Sans、Geist Mono
- **狀態管理**：Angular Signals（`signal()` / `computed()` / `effect()`）
- **相依性注入**：`inject()` 函式（取代建構式注入）

---

## 技術堆疊規則

### Angular 21 必遵慣例

1. **所有元件皆為 Standalone**，不使用 NgModule
2. **使用新版控制流語法**：`@if`、`@for`、`@switch`，禁止使用 `*ngIf`、`*ngFor`
3. **使用 `inject()`** 進行相依性注入，不在建構式中宣告注入
4. **State 優先使用 Signals**：`signal()` 為可變狀態，`computed()` 為衍生值，`effect()` 處理副作用
5. **輸入輸出使用 Signal API**：`input()` / `input.required()` / `output()` / `model()`
6. **延遲載入**：使用 `@defer` 區塊實作 Deferrable Views
7. **Change Detection**：預設使用 `OnPush`，Zoneless 模式下勿依賴 `NgZone`
8. **路由**：使用 `provideRouter()` + Lazy-loaded Routes（`loadComponent`）

### TypeScript 規範

- 開啟 `strict: true`，所有型別皆需明確宣告
- 禁止使用 `any`，以 `unknown` 搭配型別守衛取代
- 介面（Interface）用於描述資料結構，型別別名（Type Alias）用於聯合型別
- 所有 `async` 操作須正確處理錯誤（`try/catch` 或 RxJS `catchError`）
- 使用 `readonly` 修飾不可變屬性

---

## 設計系統實作規則

> 完整設計規格請參閱 [`DESIGN.md`](./DESIGN.md)，以下為 Agent 必須遵守的核心規則。

### 色彩

| 用途 | 值 |
|------|----|
| 主要文字 / 深色背景 | `#171717`（Vercel Black，非純黑）|
| 頁面背景 | `#ffffff` |
| 次要文字 | `#4d4d4d` |
| 邊框（使用陰影技法） | `rgba(0,0,0,0.08) 0px 0px 0px 1px` |
| 連結 | `#0072f5` |
| Focus Ring | `hsla(212,100%,48%,1)` |

- **禁止**在 UI Chrome 中引入暖色調（橘、黃、綠）
- Workflow 強調色（Ship Red `#ff5b4f`、Preview Pink `#de1d8d`、Develop Blue `#0a72ef`）僅用於對應 Workflow 情境

### 陰影替代邊框

所有元件**禁止使用** `border` CSS 屬性建立邊框，改用陰影技法：

```scss
// 標準邊框陰影
box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

// 完整卡片陰影堆疊
box-shadow:
  rgba(0,0,0,0.08) 0px 0px 0px 1px,
  rgba(0,0,0,0.04) 0px 2px 2px,
  rgba(0,0,0,0.04) 0px 8px 8px -8px,
  #fafafa 0px 0px 0px 1px;
```

### 字型

```scss
// 全域啟用 Ligature
font-family: 'Geist', Arial, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif;
font-feature-settings: "liga";

// 等寬字型
font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
```

**字重系統（三種，嚴格對應）**：
- `400`：內文 / 閱讀
- `500`：UI 元素 / 互動
- `600`：標題 / 強調

**Letter Spacing（依尺寸）**：
- `48px` → `-2.88px`
- `40px` → `-2.4px`
- `32px` → `-1.28px`
- `24px` → `-0.96px`
- `16px` → `-0.32px`
- `14px` 以下 → `normal`

### 圓角

- 按鈕：`6px`
- 卡片：`8px`
- 圖片卡片（上方）：`12px 12px 0 0`
- 標籤 / Badge：`9999px`（Pill）
- 主要 CTA 按鈕**禁止**使用 Pill 圓角

---

## 元件命名慣例

```
src/
  app/
    core/           # 全域服務、Guards、Interceptors
    shared/
      components/   # 共用 UI 元件
      directives/
      pipes/
    features/       # 功能模組（各自獨立 Standalone）
      hero/
      navigation/
      cards/
    layout/         # 版面配置元件
```

- 元件檔名：`kebab-case.component.ts`
- 服務檔名：`kebab-case.service.ts`
- Selector 前綴：`app-`（例：`app-hero-section`）

---

## Agent 行為準則

1. **不建立 NgModule**：所有新 Angular 元件皆為 Standalone
2. **優先使用 Signals**：State 邏輯不使用 BehaviorSubject（除非有 RxJS 整合需求）
3. **SCSS 優先**：樣式以 SCSS 撰寫，善用 CSS 自訂屬性（`--variable`）
4. **響應式優先**：元件設計從行動裝置出發（Mobile-first），使用 DESIGN.md 第 8 節斷點
5. **無障礙**：所有互動元件須具備 Focus Ring（`2px solid hsla(212,100%,48%,1)`）及 `aria-*` 屬性
6. **禁止引入外部 UI 函式庫**（如 Angular Material、PrimeNG）—— 設計系統完全自製
7. **效能**：圖片使用 `NgOptimizedImage`，延遲載入使用 `@defer`

---

## 參考文件

- 設計規格：[`DESIGN.md`](./DESIGN.md)
- copilot 指引：[`.github/copilot-instructions.md`](./.github/copilot-instructions.md)
