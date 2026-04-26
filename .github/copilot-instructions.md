# GitHub Copilot 工作區指引

> 本文件為 GitHub Copilot 的全域指引，適用於此 Angular 21 前端專案的所有 `.ts`、`.html`、`.scss` 檔案。

---

## 專案背景

本專案是一個以 **Angular 21** 建構的前端網頁應用，完全遵循 **Vercel / Geist 設計系統**（詳見 [`DESIGN.md`](../DESIGN.md)）。所有 UI 元件皆為自製，禁止使用任何第三方 UI 函式庫。

---

## Angular 21 程式碼慣例

### 元件結構

```typescript
// ✅ 正確範例：Standalone Component + Signal API
import { Component, signal, computed, inject, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible()) {
      <div>{{ title() }}</div>
    }
    @for (item of items(); track item.id) {
      <span>{{ item.label }}</span>
    }
  `,
})
export class ExampleComponent {
  // Signal 輸入（取代 @Input()）
  title = input.required<string>();
  items = input<Item[]>([]);

  // Signal 輸出（取代 @Output()）
  selected = output<Item>();

  // 本地可變狀態
  isVisible = signal(true);

  // 衍生計算值
  itemCount = computed(() => this.items().length);

  // 相依性注入（取代建構式注入）
  private service = inject(ExampleService);
}
```

### 嚴格禁止

```typescript
// ❌ 禁止：NgModule
@NgModule({ declarations: [...] })

// ❌ 禁止：舊版結構型指令
*ngIf="condition"
*ngFor="let item of items"

// ❌ 禁止：建構式注入
constructor(private service: MyService) {}

// ❌ 禁止：any 型別
const data: any = response;

// ❌ 禁止：BehaviorSubject 作為元件狀態
private state$ = new BehaviorSubject<State>(initialState);
```

### 路由設置

```typescript
// app.routes.ts — 使用 loadComponent 進行 Lazy Loading
export const routes: Routes = [
  {
    path: 'feature',
    loadComponent: () =>
      import('./features/feature/feature.component').then(m => m.FeatureComponent),
  },
];

// main.ts — Zoneless + provideRouter
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideZonelessChangeDetection(), // Angular 18+ Zoneless
    provideHttpClient(),
  ],
});
```

---

## TypeScript 規範

```typescript
// ✅ 明確型別，使用 Interface 描述資料結構
interface UserProfile {
  readonly id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest'; // 聯合型別用 Type Alias
}

// ✅ 使用型別守衛取代 any
function processData(data: unknown): string {
  if (typeof data === 'string') return data;
  if (isUserProfile(data)) return data.name;
  throw new Error('Unexpected data type');
}

function isUserProfile(value: unknown): value is UserProfile {
  return typeof value === 'object' && value !== null && 'id' in value;
}

// ✅ async 操作必須處理錯誤
async function fetchData(): Promise<UserProfile[]> {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json() as Promise<UserProfile[]>;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}
```

---

## 設計系統實作規則

### SCSS 變數與結構

```scss
// _variables.scss — 統一 CSS 自訂屬性
// ⚠️ 所有數值來源：DESIGN.md YAML front matter token，如需調整請以 DESIGN.md 為準
:root {
  // 色彩系統
  --color-bg: #ffffff;
  --color-text-primary: #171717;
  --color-text-secondary: #4d4d4d;
  --color-text-muted: #666666;
  --color-link: #0072f5;
  --color-focus: hsla(212, 100%, 48%, 1);

  // 工作流強調色（僅限對應情境使用）
  --color-ship: #ff5b4f;
  --color-preview: #de1d8d;
  --color-develop: #0a72ef;

  // 排版
  --font-sans: 'Geist', Arial, 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;

  // 圓角
  --radius-button: 6px;
  --radius-card: 8px;
  --radius-image: 12px 12px 0 0;
  --radius-pill: 9999px;

  // 陰影（替代邊框）
  --shadow-border: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  --shadow-ring: rgb(235, 235, 235) 0px 0px 0px 1px;
  --shadow-card: rgba(0,0,0,0.08) 0px 0px 0px 1px,
                 rgba(0,0,0,0.04) 0px 2px 2px,
                 rgba(0,0,0,0.04) 0px 8px 8px -8px,
                 #fafafa 0px 0px 0px 1px;
}
```

### 元件 SCSS 範本

```scss
// feature.component.scss
.card {
  background: var(--color-bg);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card); // ✅ 陰影替代邊框
  // border: 1px solid #ccc;     // ❌ 禁止使用傳統邊框

  &__title {
    font-family: var(--font-sans);
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.96px;
    line-height: 1.33;
    color: var(--color-text-primary);
    font-feature-settings: "liga"; // ✅ 啟用連字
  }

  &__body {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: var(--color-text-secondary);
  }
}

// ✅ Focus ring 必須套用於所有互動元件
.button {
  border-radius: var(--radius-button);
  background: var(--color-text-primary);
  color: var(--color-bg);
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;

  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }
}
```

### 排版 Letter Spacing 規則

各字體尺寸對應的 letter-spacing 數值以 [`DESIGN.md` Typography 章節](../DESIGN.md) 的 `typography` token 為唯一來源，請勿在此處或程式碼中硬編碼。

---

## 響應式設計

```scss
// 斷點定義（Mobile-first）
$breakpoints: (
  'mobile-sm': 400px,
  'mobile':    600px,
  'tablet-sm': 768px,
  'tablet':    1024px,
  'desktop':   1200px,
  'desktop-lg': 1400px,
);

@mixin respond-to($bp) {
  @media (min-width: map-get($breakpoints, $bp)) {
    @content;
  }
}

// 使用範例
.feature-grid {
  display: grid;
  grid-template-columns: 1fr; // Mobile: 單欄

  @include respond-to('tablet-sm') {
    grid-template-columns: repeat(2, 1fr); // Tablet: 雙欄
  }

  @include respond-to('desktop') {
    grid-template-columns: repeat(3, 1fr); // Desktop: 三欄
  }
}
```

---

## 效能最佳化

### 圖片
```html
<!-- ✅ 使用 NgOptimizedImage -->
<img ngSrc="/assets/hero.png" width="1200" height="630" priority alt="Hero image" />
```

### 延遲載入
```html
<!-- ✅ 使用 @defer 延遲非關鍵內容 -->
@defer (on viewport) {
  <app-heavy-component />
} @placeholder {
  <div class="skeleton"></div>
} @loading {
  <app-spinner />
}
```

---

## 無障礙（A11y）規範

- 所有互動元件必須有 `aria-label` 或 `aria-labelledby`
- 所有圖片必須有 `alt` 屬性
- Focus Ring：`2px solid var(--color-focus)`（使用 `:focus-visible` 偽類，色值定義於 `_variables.scss`，來源為 DESIGN.md `focus` token）
- 語意化 HTML：`<nav>`、`<main>`、`<section>`、`<article>`、`<header>`、`<footer>`
- 色彩對比度符合 WCAG AA 標準（4.5:1 正文，3:1 大字）

---

## 目錄結構

```
src/
  app/
    core/
      guards/
      interceptors/
      services/
    shared/
      components/     # 共用 UI（Button、Badge、Card...）
      directives/
      pipes/
    features/
      hero/           # 首頁 Hero 區塊
      navigation/     # 主要導覽列
      cards/          # 功能卡片
      workflow/       # Workflow Pipeline
    layout/
      header/
      footer/
      main-layout/
  assets/
    fonts/            # Geist Sans / Geist Mono 字型檔
    images/
  styles/
    _variables.scss
    _typography.scss
    _reset.scss
    _mixins.scss
    global.scss
```

---

## 參考文件

- 完整設計規格：[`DESIGN.md`](../DESIGN.md)
- Agent 指引：[`AGENTS.md`](../AGENTS.md)
