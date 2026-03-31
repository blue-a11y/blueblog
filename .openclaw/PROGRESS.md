# BlueBlog 项目进度

## 📋 项目概述

**项目名称**：BlueBlog — Blue 的个人技术博客
**产品定位**：不只是博客，是技术名片。让人一眼看出：这个人懂技术、有品味、能做完整产品。
**技术栈**：Next.js 15 (App Router) + HeroUI v3 + Tailwind CSS v4 + MDX + Shiki
**设计风格**：浅色为主 + 深浅色模式切换，精致的极简主义
**部署**：Vercel（泛域名）
**GitHub**：待创建

**⚠️ Subagent 调用规则**：所有项目开发任务必须使用 `sessions_spawn(agentId: "project-agent")`，不要用默认 subagent（默认继承 main 的 GLM 模型）。project-agent 默认 GPT-5.4。

**⚠️ 必须自测（2026-03-31 教训）**：每轮完成后必须启动 dev server 实际访问每个功能页验证。`npm run build` 通过 ≠ 功能正常！运行时错误（如 server/client 组件边界、404 路由）build 检测不到。自测方法：`npm run dev` + Playwright/curl 访问关键页面（首页、/blog、/blog/[slug]），确认无报错、无 404。

**⚠️ 项目定位**：BlueBlog 是纯网页项目（部署 Vercel），不是桌面应用。截图用浏览器视口，不要用桌面壳。

**核心文档**：
- 📊 [进度文件](./PROGRESS.md)（本文件）
- 📁 [每日任务](./tasks/)（按日期隔离的工作日志）

## 🎯 当前阶段与任务清单

### Phase 1：项目初始化 + HeroUI 集成 + 主题系统 + 首页
**状态**：✅ 已完成 | **完成日期**：2026-03-30

- [x] 创建 Next.js 15 项目 + HeroUI v3 + Tailwind v4 集成
- [x] 配置浅色/深色主题系统（oklch 变量 + `data-theme` 切换）
- [x] 首页 Hero 区域（名字 + 定位 + 动态背景）

### Phase 2：博客系统（MDX + 列表 + 详情 + 代码高亮）
**状态**：✅ 已完成 | **完成日期**：2026-03-31

- [ ] MDX 内容系统搭建（frontmatter + 文件解析）
- [ ] 博客列表页（分类筛选 + 搜索 + 卡片网格）
- [ ] 文章详情页（MDX 渲染 + Shiki 代码高亮）
- [ ] 代码块主题与 Shiki 高亮风格统一
- [ ] 侧边目录导航（TOC）
- [ ] 上一篇/下一篇
- [ ] 阅读时间估算 + 标签 + 日期
- [ ] 首批示例文章内容补齐（至少 2-3 篇）
- [ ] 内容目录结构与 slug 规则确定

### Phase 3：项目展示页 + 关于页
**状态**：📋 待开始 | **目标**：2-3 天

- [ ] 项目展示页（时间线布局 + 状态标记）
- [ ] 关于页（技能矩阵 + 经历时间线 + 联系方式）

### Phase 4：风格实验室 + 交互 Demo
**状态**：📋 待开始 | **目标**：3-4 天

- [ ] HeroUI 组件实际使用展示页
- [ ] 交互式 Demo（拖拽排序、实时搜索等）
- [ ] 主题切换交互（明/暗实时预览）

### Phase 5：SEO + RSS + 搜索 + 性能优化 + 部署
**状态**：📋 待开始 | **目标**：2-3 天

- [ ] SEO 优化（meta、sitemap、robots.txt）
- [ ] RSS 生成
- [ ] 全文搜索（客户端索引）
- [ ] 性能优化（ISR、图片懒加载、Bundle 分析）
- [ ] Vercel 部署 + 自定义域名配置

## 🎯 里程碑

| 里程碑 | 目标日期 | 状态 |
|--------|----------|------|
| Phase 1 完成（首页可预览） | 2026-03-30 | ✅ 已完成 |
| Phase 2 完成（博客系统可用） | 2026-04-08 | ✅ 已完成（2026-03-31） |
| Phase 3 完成（内容页完善） | 2026-04-11 | 📋 待开始 |
| Phase 4 完成（风格实验室） | 2026-04-15 | 📋 待开始 |
| Phase 5 完成（正式上线） | 2026-04-18 | 📋 待开始 |

## 📝 工作日志

### 2026-03-30（周一）04:00 — Phase 1 完成收尾
- 完成 **项目初始化验收**：确认 Next.js 15 App Router、HeroUI v3、Tailwind CSS v4 与 PostCSS 配置全部就位。
- 完成 **主题系统**：在 `app/globals.css` 建立 `:root` / `[data-theme="dark"]` 双主题设计 token，支持背景、文字、卡片、边框、强调色统一切换。
- 完成 **主题切换交互**：新增 `components/ThemeToggle.tsx`，基于 `data-theme` + `localStorage` 持久化主题，并在 `app/layout.tsx` 首屏注入脚本避免闪烁。
- 完成 **首页 Hero 区域**：抽离 `components/home-hero.tsx`，实现大号标题、定位语、技术描述、社交链接、HeroUI 组件组合与响应式布局。
- 完成 **视觉氛围强化**：补充首页微妙网格背景、渐变光晕、卡片漂浮动画，并兼容浅/深色主题与 reduced motion。
- 最终验证通过：`npm run build` ✅。
- Phase 1 正式收尾，下一阶段进入 **Phase 2：博客系统（MDX + 列表 + 详情 + 代码高亮）**。

### 2026-03-28（周六）22:50 — 项目规划
- 完成项目规划，确定技术栈和 Phase 划分
- 删除旧的 blue-blog 项目目录，全新开始
- 设计风格确认：浅色为主 + 深浅切换 + 极简精致
- UI 库确认：HeroUI v3（Tailwind v4 + React Aria）
- 域名：先使用 Vercel 泛域名

## 📝 项目经验

_（开发过程中积累的踩坑和最佳实践）_

## 🔧 技术细节备忘

### HeroUI v3 关键注意点
- **不需要 Provider**（v2 才需要 HeroUIProvider）
- **Tailwind CSS v4 是必须的**，不兼容 v3
- 组件用 **compound pattern**（`Card.Header`，不是 `title="x"` prop）
- 事件用 **`onPress`**，不是 `onClick`
- CSS 导入顺序已经按要求固定：`@import "tailwindcss";` → `@import "@heroui/styles";`

### 设计规范
- 浅色为主，oklch 精确调色
- 代码块始终深色底（不管页面模式）
- 大量留白 + 信息密度控制
- 每个页面至少一个"让人想截图分享"的时刻
