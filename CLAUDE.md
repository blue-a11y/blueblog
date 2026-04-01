@AGENTS.md

# BlueBlog 项目开发规范

## 📁 项目结构

```
blueblog/
├── app/                    # Next.js App Router（仅路由页面）
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   ├── globals.css         # 全局样式 + 主题变量
│   └── blog/
│       ├── page.tsx        # 博客列表页
│       └── [slug]/
│           └── page.tsx    # 文章详情页
├── components/             # React 组件
│   ├── ui/                 # 通用 UI 组件（可跨页面复用）
│   └── *.tsx               # 业务组件（页面级）
├── lib/                    # 工具函数 + 数据层
│   ├── posts.ts            # MDX 文章解析/查询
│   └── mdx.tsx             # MDX 渲染配置
├── types/                  # TypeScript 类型定义
│   └── post.ts
├── contents/posts/         # MDX 文章源文件
└── public/                 # 静态资源
```

## 📐 代码组织原则

### 页面 vs 组件 vs 工具
- **app/ 下只放路由页面**，不写业务逻辑。页面只负责：获取数据 → 传递给组件 → 渲染
- **components/ui/** 放通用可复用组件（Tag、Badge、Card wrapper 等），任何页面都可能用到
- **components/** 顶层放业务组件（PostList、HomeHero、ThemeToggle），和具体页面绑定
- **lib/** 放纯函数和数据层，不包含 React 组件

### 组件拆分规则
- 单文件超过 **150 行** → 考虑拆分子组件
- Props 超过 **5 个** → 用对象参数 `{ title, description, ... }: CardProps`
- 组件只在**一个页面**用到 → 放同目录或 `components/` 顶层
- 组件在**多个页面**用到 → 放 `components/ui/`

### Server vs Client 组件边界
- **默认 Server Component**，只有需要交互时才加 `"use client"`
- 需要交互 = useState / useEffect / onClick / onPress / 事件监听
- `buttonVariants()` 等客户端工具函数不能在 Server Component 中直接调用
- 如果 Server Component 需要客户端功能 → 抽成 Client Component 包裹

### 样式规范
- **不要写内联 style**，用 Tailwind 工具类
- 主题相关颜色用 CSS 变量（`var(--foreground)`、`var(--card)` 等）
- 主题切换相关变量定义在 `globals.css`，不要在组件里硬编码颜色值
- 代码块始终深色底，不管页面是浅色还是深色

### MDX 内容规范
- 文件名格式：`YYYY-MM-DD-title-slug.mdx`
- slug 生成规则：日期 + 标题转小写（`.` 替换为 `-`，空格替换为 `-`）
- frontmatter 必填：title、description、date、published、tags
- 不要在 MDX 文件中写开发注释

### TypeScript 规范
- 所有组件 props 必须定义类型接口
- lib/ 下的函数必须有参数和返回值类型
- 禁止 `any`，用 `unknown` 或具体类型替代
- 优先用 `interface` 而非 `type`

## ✅ 自测清单（每轮工作结束前）

1. `npm run build` 通过
2. `npm run dev` 启动后用 Playwright/curl 访问关键页面
3. 验证页面无 404、无报错、无控制台错误
4. 切换深浅主题验证样式正常
5. 移动端视口验证响应式布局
