# BlueBlog Developer Handoff

_Last updated: 2026-04-04_

## 1. 项目当前状态

### 已完成
- Next.js 15 App Router 站点骨架已完成。
- 首页、Blog、单篇文章、Projects、About、Playground、Showcase、Components Examples 页面已落地。
- 内容系统已可用：`contents/posts/*.mdx` → 解析 frontmatter → 生成列表页、详情页、RSS、搜索索引、sitemap。
- SEO 基线已落地：站点级 metadata、页面级 canonical、OG 图、Twitter card 图、robots、sitemap。
- RSS 已落地：`/feed.xml`。
- 最小可用全文搜索已落地：`/search-index.json` + 博客页客户端搜索。
- 性能第一轮已做：文章与搜索索引缓存、部分页面 `revalidate=3600`、移除部分不必要的 HeroUI 客户端负担。
- Vercel production 已上线。
- Vercel Speed Insights 已接入。
- 个人身份信息已统一到最新正式口径。

### 未完成 / 仍可继续做
- 自定义域名 `blueblog.me` 的最终 DNS / SSL / 面板状态需要持续观察并确认无异常。
- 暂无真实项目案例、真实文章封面、真实工作经历细节，当前内容仍偏示例化。
- 尚未补评论、订阅邮箱、CMS、草稿后台、统计看板等增强功能。
- 还没有自动化测试体系（目前以 lint/build/dev 人工回归为主）。

---

## 2. 技术栈
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- UI: HeroUI v3
- Styling: Tailwind CSS v4 + 全局 design tokens
- Content: MDX + `gray-matter`
- Code highlight: Shiki / `rehype-pretty-code`
- Deploy: Vercel
- Monitoring: Vercel Speed Insights

---

## 3. 目录结构

```text
app/
  about/
  blog/
    [slug]/
  components-examples/
  feed.xml/
  playground/
  projects/
  search-index.json/
  showcase/
  layout.tsx
  opengraph-image.tsx
  twitter-image.tsx
  robots.ts
  sitemap.ts
components/
  about/
  playground/
  projects/
  showcase/
  components-examples/
  home-hero.tsx
  post-list.tsx
  site-navbar.tsx
contents/
  posts/
lib/
  mdx.tsx
  posts.ts
  search.ts
  blog-search.ts
  site.ts
types/
.openclaw/
  PROGRESS.md
  tasks/
  DEVELOPER-HANDOFF.md
```

### 关键目录说明
- `app/`: 所有路由和 route handlers。
- `components/`: 页面组件和可复用 UI 片段。
- `contents/posts/`: 博客文章源文件，当前为 MDX。
- `lib/site.ts`: 站点级正式配置中心，域名、作者、邮箱、GitHub、SEO 基本文案都收口在这里。
- `lib/posts.ts`: 文章读取、frontmatter 解析、slug 生成、阅读时长、摘要生成、缓存。
- `.openclaw/`: 项目过程文档，不是运行时代码，但接手时非常有用。

---

## 4. 关键页面与路由
- `/`：首页 Hero，展示身份、主 CTA、基础社交入口。
- `/blog`：文章列表，支持标签筛选 + 客户端搜索。
- `/blog/[slug]`：文章详情页，MDX 渲染、阅读时间、上一篇/下一篇。
- `/projects`：项目展示页。
- `/about`：个人介绍、技能、时间线、联系方式。
- `/playground`：交互实验页。
- `/showcase`：风格展示页。
- `/components-examples`：组件用法展示页。
- `/feed.xml`：RSS。
- `/search-index.json`：博客静态搜索索引。
- `/sitemap.xml`：站点地图。
- `/robots.txt`：爬虫规则。
- `/opengraph-image`：站点 OG 图生成路由。
- `/twitter-image`：Twitter card 图生成路由。这里只是 card 类型命名，不代表展示 Twitter/X 身份。

---

## 5. 内容系统怎么工作（MDX / posts）

### 文章来源
- 所有文章放在 `contents/posts/`。
- 支持 `.md` / `.mdx`。
- `lib/posts.ts` 会递归扫描文件。

### Frontmatter 约定
当前使用字段：
- `title`
- `description`
- `date`（必须是 `YYYY-MM-DD`）
- `published`（默认 false）
- `tags`（数组）
- `coverImage`（可选，目前基本没用起来）

### 生成逻辑
- slug 规则：`YYYY-MM-DD` + 标题 slug 化，例如 `2026-03-30-shipping-clean-next-js-layouts`
- 摘要：从正文裁剪
- 阅读时长：按约 220 wpm 粗估
- `published: false` 的文章默认不会出现在公开页面

### 下游依赖
`getPostSummaries()` 同时服务于：
- `/blog`
- `/blog/[slug]`
- `/feed.xml`
- `/search-index.json`
- `/sitemap.xml`

所以你要改 frontmatter 规则时，别只盯着博客页，RSS 和 sitemap 也会跟着受影响。这种连锁反应要有点脑子。

---

## 6. SEO / RSS / 搜索 / Vercel / Speed Insights 当前状态

### SEO
- 根 metadata 在 `app/layout.tsx`
- 站点级配置在 `lib/site.ts`
- 页面级 metadata 已补到 blog/about/projects 等关键路由
- canonical 默认走 `https://blueblog.me`
- OG 图走 `app/opengraph-image.tsx`
- Twitter card 图走 `app/twitter-image.tsx`

### RSS
- `app/feed.xml/route.ts`
- 输出公开文章 RSS 2.0
- 1 小时 revalidate

### 搜索
- `app/search-index.json/route.ts` 提供静态索引
- `components/post-list.tsx` 在客户端做标题 / 描述 / 摘要 / 标签匹配
- 博客列表的输入框、筛选按钮、卡片和标签已在 2026-04-04 晚些时候收口为 HeroUI Input / Button / Card / Chip
- 目前是最小可用版，不是全文搜索引擎

### Vercel
- 已完成项目 link 与 production deploy
- 历史坑：千万别在 `app/` 子目录里执行 `vercel link/deploy`，那会把 Next.js 的 `app/` 目录误当项目根，直接 404，低级得离谱
- 必须在仓库根目录执行部署命令

### 主题系统
- 主题核心逻辑已收口到 `lib/theme.ts`
- 根布局 `app/layout.tsx` 会在首屏注入主题脚本，优先恢复 `localStorage` 中的 `light / dark / system` 偏好，减少首次加载闪烁
- 导航中的 `ThemeToggle` 已改为 HeroUI Tabs，支持 `light / dark / system` 三态
- `system` 模式下会监听 `prefers-color-scheme` 变化，并同步 `data-theme` / `color-scheme`

### Speed Insights
- 已安装 `@vercel/speed-insights`
- 在 `app/layout.tsx` 根布局注入 `SpeedInsights`
- 是否在面板里看见数据，还取决于线上流量和 Vercel 面板功能状态

---

## 7. 身份信息当前正式口径

**这是当前唯一有效口径，后续别再乱改。**

- 固定名称：`Blue`
- 邮箱：`xuanzhang194@gmail.com`
- GitHub：`https://github.com/blue-a11y`
- Twitter / X：**不展示**
- 默认站点 URL：`https://blueblog.me`

当前收口位置包括：
- `lib/site.ts`
- `components/home-hero.tsx`
- `components/about/about-overview.tsx`
- `app/about/page.tsx`
- `app/projects/page.tsx`
- 以及所有依赖 `siteConfig` 的 metadata / OG / canonical 输出

---

## 8. 本地开发命令

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

### 推荐开发检查流
1. 改代码
2. `npm run lint`
3. `npm run build`
4. `npm run dev`
5. 实际打开这些路径检查：
   - `/`
   - `/about`
   - `/projects`
   - `/blog`
   - `/blog/[任一已发布文章]`
   - `/feed.xml`
   - `/search-index.json`
   - `/sitemap.xml`

只看 build 通过就觉得自己牛逼，是最容易翻车的错觉。之前已经踩过了。

---

## 9. 部署方式

### 正确方式
在仓库根目录执行：

```bash
npx vercel whoami
npx vercel link --yes
npx vercel deploy --prod --yes
```

### 当前线上地址
- 正式域名：`https://blueblog.me`
- Vercel 公共别名：`https://blueblog-theta.vercel.app`

### 部署注意事项
- 不要在 `app/` 子目录 deploy。
- 如果 deployment 直链被访问保护拦住，不代表 public alias 挂了，要检查 alias。
- 每次部署后至少抽查：首页、About、Projects、Blog、文章页、RSS。

---

## 10. 下一步最值得做的任务（按优先级）

### P1：把内容从“像作品”变成“就是作品”
1. 补真实文章（至少 5-8 篇）
2. 补真实项目案例，替换示例占位项目
3. 给文章加封面图或更像样的 OG 变化策略

### P2：提升可维护性
4. 加基础自动化测试：至少路由 smoke test + 内容校验
5. 把部分仍依赖 HeroUI 的 client-heavy 组件继续瘦身
6. 补 README，别继续让项目门面还是 create-next-app 默认废话

### P3：增强博客能力
7. 加文章目录 TOC 高亮 / heading anchor
8. 加相关文章推荐
9. 加更细的搜索能力（按 tag、日期、分类）

### P4：运营和观测
10. 确认 `blueblog.me` 的 DNS、SSL、缓存策略完全稳定
11. 看一眼 Vercel Speed Insights 是否真的开始产数
12. 如需统计，再考虑是否补更完整 analytics，而不是把概念乱接一通

---

## 11. 已知注意事项 / 踩坑
- **部署坑**：`app/` 子目录误 deploy 会导致整站 404。
- **身份信息坑**：身份信息不要散落硬编码，优先改 `lib/site.ts`，页面尽量引用 `siteConfig`。
- **内容系统坑**：frontmatter 的 `date` 必须是 `YYYY-MM-DD`，否则 `lib/posts.ts` 会直接报错。
- **发布坑**：`published` 默认 false，文章不出现时先检查这个字段，别疑神疑鬼。
- **验证坑**：`npm run build` 通过不代表运行态没毛病；关键路由必须实际打开。
- **Twitter/X 口径**：可以保留 Twitter card metadata 类型，但页面上不要展示 Twitter/X 账号，也不要加 handle。

---

## 12. 接手建议
如果是未来的你自己回来接手，先看这几个文件，别瞎翻：
1. `lib/site.ts`
2. `lib/posts.ts`
3. `app/layout.tsx`
4. `app/blog/page.tsx`
5. `app/blog/[slug]/page.tsx`
6. `.openclaw/PROGRESS.md`
7. `.openclaw/tasks/2026-04-04.md`

看完这几个，项目七成脉络就清楚了。剩下的再细读组件，不然你会在无关代码里浪费时间。