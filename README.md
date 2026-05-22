# blueblog

blue 的个人博客前端项目。

## 技术栈

- **React 19** + **TypeScript 6** + **Vite 8**
- **React Compiler** — 自动记忆化优化
- **react-router 7** — 客户端路由
- **Tailwind CSS v4** — OKLCH 色彩空间、@theme inline 指令
- **framer-motion** — 动画库
- **shadcn/ui** — UI 基础组件
- **pnpm** — 包管理器

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产包
pnpm build

# 预览生产构建
pnpm preview

# ESLint 检查
pnpm lint

# 格式化代码
pnpm format
```

## 项目结构

```
src/
├── api/          — 接口请求层
├── assets/       — 静态资源
├── components/   — 全局组件（ui / business）
├── hooks/        — 业务自定义 Hooks
├── layout/       — 页面布局
├── lib/          — 第三方库封装
├── helpers/      — 通用工具函数
├── pages/        — 路由页面（按页面拆分目录）
├── stores/       — 全局状态管理
├── styles/       — 全局样式
├── types/        — 公共类型
├── constants/    — 全局常量
├── App.tsx       — 根组件（路由配置）
└── main.tsx      — 入口文件
```
