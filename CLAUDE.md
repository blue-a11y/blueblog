# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在本仓库中工作时提供指导。详细编码规范见 `src/CLAUDE.md`。

## 技术栈

- React 19 + TypeScript 6 + Vite 8
- React Compiler（通过 babel-plugin-react-compiler + @rolldown/plugin-babel）
- react-router 7
- Tailwind CSS v4（OKLCH 色彩空间，`@theme inline` 指令）
- framer-motion 动画库
- @base-ui/react 基础组件原语
- class-variance-authority (CVA) 组件变体管理
- ahooks 功能类 Hook 库
- pnpm 包管理器

## 命令

- `pnpm dev` — 开发服务器（HMR）
- `pnpm build` — 先类型检查 (`tsc -b`) 再 Vite 构建
- `pnpm lint` — ESLint 检查所有文件
- `pnpm preview` — 预览生产构建
- `pnpm exec prettier --write <file>` — 格式化指定文件
- `pnpm dlx shadcn@latest add <component>` — 添加 shadcn 组件

## 架构

Vite + React SPA，使用客户端路由。入口：`src/main.tsx` → `src/App.tsx`。路由配置在 `App.tsx` 中使用 react-router `<Routes>`。

### 目录结构

```
src/
├── api/                — 接口请求层
│   ├── request.ts        请求封装（baseUrl、拦截器、错误处理）
│   └── modules/          按业务模块拆分的接口定义（user.ts、blog.ts）
├── assets/             — 静态资源（图片、字体、SVG 等）
├── components/         — 全局可复用组件
│   ├── ui/               基础 UI 原子组件（Button、Avatar、Input）
│   └── business/         业务通用组件（Header、Footer、Sidebar）
├── hooks/              — 业务类自定义 Hooks（功能类优先用 ahooks）
├── layout/             — 页面布局组件（主布局、空白布局等）
├── lib/                — 第三方库封装（二次包装、配置）
├── helpers/            — 通用工具函数（cn、formatDate、validator）
├── pages/              — 路由页面组件（按路由拆分目录）
│   ├── home/
│   │   ├── index.tsx      页面入口
│   │   ├── components/    页面私有子组件
│   │   └── hooks/         页面私有 hooks
│   └── blog/
│       ├── index.tsx
│       └── components/
├── stores/             — 全局状态管理（按模块拆分）
├── styles/             — 全局样式文件（theme、reset、全局 CSS）
├── types/              — 全局公共类型定义（按模块拆分）
├── constants/          — 全局常量（枚举映射、配置项）
├── App.tsx             — 应用根组件（路由配置）
└── main.tsx            — 入口文件（挂载根节点）
```

**文件归属原则：** 仅单个页面使用的组件/hooks/类型/常量，放在该页面目录内的子目录中；两处以上使用则提升到对应的公共目录。

样式：Tailwind CSS v4，自定义 design tokens 定义在 `src/index.css`。主题使用 OKLCH 色彩空间，通过 `.dark` 类实现深色模式。所有组件样式使用 Tailwind 工具类，不使用单独的 CSS 文件。

已启用 React Compiler —— 避免它无法优化的模式（修改 props/state、重新赋值捕获了 props 的 let 绑定）。

## TypeScript

编译目标 ES2023，bundler 模块解析，启用 `verbatimModuleSyntax`（纯类型导入使用 `import type`）。严格检查：`noUnusedLocals`、`noUnusedParameters`、`noFallthroughCasesInSwitch`。

## ESLint

扁平配置，位于 `eslint.config.js`。包含 JS recommended、TypeScript recommended、React Hooks、React Refresh（Vite）、Prettier 兼容。忽略 `dist/`。

## Prettier

配置位于 `.prettierrc`，关键规则：双引号、分号、2 空格缩进、尾逗号、行宽 100、Tailwind class 排序（prettier-plugin-tailwindcss）。

**代码编写完成后必须运行 `pnpm exec prettier --write <file>` 格式化**，确保输出符合项目风格规范。

## shadcn/ui

项目已集成 shadcn/ui（配置见 `components.json`），用于快速添加 UI 基础组件。

**添加组件：** `pnpm dlx shadcn@latest add <component>`，组件将自动安装到 `src/components/ui/` 目录。

**注意事项：**
- shadcn 生成的代码可能使用 `function` 声明和 `interface`，添加后需按编码规范调整为箭头函数 + `type`
- shadcn 组件的 import 路径别名使用 `@/` 前缀（已在 `components.json` 中配置）
- 不要修改 shadcn 组件的核心逻辑，只做风格适配
