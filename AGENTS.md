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

> 所有設計數值（色彩、字型、間距、陰影、圓角）以 [`DESIGN.md`](./DESIGN.md) 的 YAML token 為唯一來源，
> 程式碼中不硬編碼設計數值，改透過 CSS 自訂屬性（`--variable`）引用。

### 核心原則

- **陰影替代邊框**：禁止使用 `border` CSS 屬性，改用 `box-shadow` 陰影技法（詳見 DESIGN.md Elevation & Depth）
- **色彩限制**：禁止在 UI Chrome 引入暖色調（橘、黃、綠）；Workflow 強調色僅限對應 Workflow 情境使用
- **三種字重**：`400`（內文）/ `500`（UI 互動）/ `600`（標題強調），嚴格對應角色（詳見 DESIGN.md Typography）
- **Letter Spacing**：隨字體尺寸縮放，數值以 DESIGN.md Typography token 為準
- **圓角**：按元件類型套用對應 `rounded` token；主要 CTA 按鈕禁止使用 Pill 圓角（詳見 DESIGN.md Shapes）

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
5. **無障礙**：所有互動元件須具備 Focus Ring（`2px solid var(--color-focus)`，色值見 DESIGN.md `focus` token）及 `aria-*` 屬性
6. **效能**：圖片使用 `NgOptimizedImage`，延遲載入使用 `@defer`

---

## Agent Prompt 速查

### 元件 Prompt 範本

- 「生成 Hero 區塊：白色背景，48px Geist weight 600 標題，letter-spacing -2.4px，#171717 色。次標題 20px weight 400，#4d4d4d。深色 CTA 按鈕（#171717，6px 圓角，8px 16px padding）與白色 ghost 按鈕（陰影邊框，6px 圓角）。」
- 「生成卡片：白色背景，禁止 CSS border，使用陰影堆疊邊框。8px 圓角。標題 24px Geist weight 600，letter-spacing -0.96px。內文 16px weight 400，#4d4d4d。」
- 「生成 Pill badge：#ecfdf5 背景，#047857 文字，9999px 圓角，0px 10px padding，12px Geist weight 500。」
- 「生成 Workflow 區塊，三步驟：Develop（#10b981）→ Preview（#de1d8d）→ Ship（#ff5b4f）。各步驟：14px Geist Mono uppercase 標籤 + 24px weight 600 標題 + 16px weight 400 說明文字。」

### 迭代原則

1. 陰影替代邊框 — `var(--shadow-border)` 是所有邊框的基礎（陰影值見 DESIGN.md Elevation & Depth）
2. Letter-spacing 隨字體縮放，以 DESIGN.md Typography token 為準
3. 三種字重：400（閱讀）/ 500（互動）/ 600（強調），嚴格對應
4. 色彩是功能性的，非裝飾性 — Workflow 色標示流程階段，不可挪作他用
5. 卡片陰影的 `#fafafa` inner ring 是 Vercel 卡片視覺特徵，不可省略
6. 技術標籤用 Geist Mono uppercase，其餘一律 Geist Sans

---

## 參考文件

- 設計規格：[`DESIGN.md`](./DESIGN.md)
- copilot 指引：[`.github/copilot-instructions.md`](./.github/copilot-instructions.md)
