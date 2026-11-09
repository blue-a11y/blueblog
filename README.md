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
public/                 — 静态资源（头像、图标）
src/
├── components/
│   └── ui/             — 可复用动画与视觉组件
├── layout/             — 页面布局
├── lib/                — 通用工具函数
├── pages/
│   └── home/
│       ├── constants/  — 首页内容与动效配置
│       ├── types/      — 首页私有类型
│       ├── views/      — 首页视图组件
│       └── index.tsx   — 首页入口
├── types/              — 第三方库类型声明
├── App.tsx             — 根组件（路由配置）
├── index.css           — 全局样式与主题
└── main.tsx            — 入口文件
```
