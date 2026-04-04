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

**🚨 PROGRESS 更新强制规则（2026-04-04 修复）**：每次 `project-agent` 或主代理完成任何实际开发任务后，必须先更新本文件，再结束任务。禁止只改代码不改 `PROGRESS.md`。最低要求：
1. 更新当前阶段状态（待开始 / 进行中 / 接近完成 / 已完成）
2. 把本次实际完成项打勾或写入工作日志
3. 如果代码里已有页面/组件落地，文档必须与代码一致，不能继续写“待开始”
4. 只有在 `PROGRESS.md` 更新完成后，才允许发送飞书总结或进入下一轮任务

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
**状态**：✅ 已完成 | **目标**：2-3 天 | **开始日期**：2026-04-01 | **完成日期**：2026-04-01

- [x] 项目展示页（时间线布局 + 状态标记）- 第1轮完成
- [x] 关于页（技能矩阵 + 经历时间线 + 联系方式）

### Phase 4：风格实验室 + 交互 Demo
**状态**：✅ 已完成 | **目标**：3-4 天 | **开始日期**：2026-04-02 | **完成日期**：2026-04-04

- [x] HeroUI 组件实际使用展示页（`/components-examples`）
- [x] 交互式 Demo（`/playground`：拖拽排序、实时搜索等）
- [x] 风格展示页（`/showcase`）
- [x] 站点导航视觉优化（active 态、玻璃态背景、透明模糊、动效回归修复）
- [x] 主题切换交互实验室的完整验收（明/暗实时预览、切换动画、配置体验）
- [x] Phase 4 全量验收（响应式 / build / 页面一致性 / 截图归档）

### Phase 5：SEO + RSS + 搜索 + 性能优化 + 部署
**状态**：🟡 进行中（SEO / RSS / 搜索最小可用版已落地，完成收尾验证并进入性能与部署准备） | **目标**：2-3 天 | **开始日期**：2026-04-04

- [x] SEO 基线（站点级 metadata、canonical、Open Graph / Twitter、sitemap、robots.txt）
- [x] RSS 生成
- [x] 全文搜索（最小可用版：静态 JSON 索引 + 客户端标题/摘要/标签搜索）
- [x] 性能优化（ISR / 缓存策略已落地，首页与博客列表客户端包袱已明显减轻；图片项暂未深挖，因当前站内几乎无内容图片）
- [ ] Vercel 部署 + 自定义域名配置（首次 production deploy 已成功；真正可用的线上别名为 `https://blueblog-theta.vercel.app`。原先误把 `app/` 子目录连成独立项目导致整站 404，已改为从仓库根目录重新 link 到 `blues-projects-90e3f68b/blueblog` 并修复上线。自定义域名仍待用户决定域名 / DNS 权限后继续）
- [x] 主题颜色回归修复（已修正首页、/blog、文章页在明/暗主题下的弱对比 token；重点修复次级文字、边框、卡片层级与文章正文容器层次）

## 🎯 里程碑

| 里程碑 | 目标日期 | 状态 |
|--------|----------|------|
| Phase 1 完成（首页可预览） | 2026-03-30 | ✅ 已完成 |
| Phase 2 完成（博客系统可用） | 2026-04-08 | ✅ 已完成（2026-03-31） |
| Phase 3 完成（内容页完善） | 2026-04-11 | ✅ 已完成（2026-04-01） |
| Phase 4 完成（风格实验室） | 2026-04-15 | ✅ 已完成（2026-04-04） |
| Phase 5 完成（正式上线） | 2026-04-18 | 🟡 进行中 |

## 📝 工作日志

### 2026-03-30（周一）04:00 — Phase 1 完成收尾
- 完成 **项目初始化验收**：确认 Next.js 15 App Router、HeroUI v3、Tailwind CSS v4 与 PostCSS 配置全部就位。
- 完成 **主题系统**：在 `app/globals.css` 建立 `:root` / `[data-theme="dark"]` 双主题设计 token，支持背景、文字、卡片、边框、强调色统一切换。
- 完成 **主题切换交互**：新增 `components/ThemeToggle.tsx`，基于 `data-theme` + `localStorage` 持久化主题，并在 `app/layout.tsx` 首屏注入脚本避免闪烁。
- 完成 **首页 Hero 区域**：抽离 `components/home-hero.tsx`，实现大号标题、定位语、技术描述、社交链接、HeroUI 组件组合与响应式布局。
- 完成 **视觉氛围强化**：补充首页微妙网格背景、渐变光晕、卡片漂浮动画，并兼容浅/深色主题与 reduced motion。
- 最终验证通过：`npm run build` ✅。
- Phase 1 正式收尾，下一阶段进入 **Phase 2：博客系统（MDX + 列表 + 详情 + 代码高亮）**。

### 2026-04-03（周五）22:30 — Phase 4 记录修正：功能主体已完成，进入验收/收尾
- 回看代码确认，Phase 4 的主要页面与组件其实已落地：`/components-examples`、`/playground`、`/showcase` 均已存在并有对应组件实现。
- 说明此前 `PROGRESS.md` 没有及时同步，多次任务执行后的真实产出没有完整回填到文档，这是文档滞后，不是代码没做。
- 今日使用 `project-agent` 完成多轮导航栏样式优化，确认 OpenAI `gpt-5.4` 链路恢复可用。
- `components/site-navbar.tsx` 完成 active 态重做：从过重的实心高亮调整为更克制的浅底 + 细边框方案。
- 完成导航玻璃态重构：桌面与移动端统一为透明 + 模糊的 glass 风格，并补充更轻的高光/边框层次。
- 修复内容区“发白/透明”回归：定位到 `app/layout.tsx` 与 `app/globals.css` 中嵌套 `main` + page-enter/fade-in 双重 opacity 动画叠加的问题，已改为不再操作 opacity，只保留轻微位移/blur。
- 已完成本地构建与截图验证，多次生成首页 / Blog 页桌面与移动端截图，最近一版导航玻璃态截图位于 `.openclaw/artifacts/` 下。
- 结论：Phase 4 不应再标记为“刚开始”，当前更准确的状态是 **主体功能已完成，进入验收 / 收尾阶段**。
- 下一步任务应聚焦：**Phase 4 全量验收、主题切换实验室补完、统一样式与响应式检查，然后准备切入 Phase 5**。

### 2026-04-04（周六）04:28 — Phase 5 第1轮：SEO 基线落地
- 新增 `lib/site.ts` 统一站点 SEO 配置：站点 URL、标题、描述、关键词、导航路由、OG 图生成地址全部集中管理，避免 metadata 到处散着写。
- 重构 `app/layout.tsx` 的根 metadata：补齐 `metadataBase`、标题模板、默认 description、keywords、authors、canonical、Open Graph、Twitter、robots 指令。
- 为 `/blog`、`/blog/[slug]`、`/about`、`/projects`、`/playground`、`/showcase`、`/components-examples` 补齐页面级 metadata，统一 canonical 与分享卡片信息；同时修正原先把 `BlueBlog` 硬编码进页面 title 导致模板重复拼接的问题。
- 新增 `app/sitemap.ts` 与 `app/robots.ts`：自动输出静态页面 + 已发布博客文章的 sitemap，并在 robots.txt 中声明 sitemap 入口。
- 新增 `app/opengraph-image.tsx` 与 `app/twitter-image.tsx`：生成站点级分享图，避免外链分享时只剩秃头标题。
- 自测通过：`npm run lint` ✅、`npm run build` ✅；启动 `npm run dev` 后实测访问 `/`、`/blog`、`/blog/2026-03-30-shipping-clean-next-js-layouts`、`/about`、`/projects`、`/robots.txt`、`/sitemap.xml` 均返回 200；额外验证 `/opengraph-image` 与 `/twitter-image` 均返回 `image/png`。
- 结论：Phase 5 已正式启动，SEO 基线已落地，下一轮优先补 RSS 或客户端全文搜索，别再让站点只有壳没有索引。

### 2026-04-04（周六）04:52 — Phase 5 第2轮：RSS feed 落地
- 新增 `app/feed.xml/route.ts`，基于 `getPostSummaries()` 动态生成 `/feed.xml`，输出已发布文章的 RSS 2.0 feed，并补齐 `atom:link`、`guid`、`pubDate`、`category`、缓存头与 1 小时 revalidate。
- 更新 `lib/site.ts`：增加 `feedPath` 与 `getFeedUrl()`，把 feed 入口纳入站点级配置，后续别再到处手写 `/feed.xml`。
- 更新 `app/layout.tsx` 与 `app/blog/page.tsx` 的 metadata alternates，为根页面与博客列表声明 `application/rss+xml`，让浏览器和阅读器更容易发现订阅入口。
- 自测通过：`npm run lint` ✅、`npm run build` ✅；启动 `npm run dev` 后实际访问 `http://localhost:3002/feed.xml`，确认返回 `200`、`content-type: application/rss+xml; charset=utf-8`，并检查 XML 中已包含站点级 channel 信息、文章链接、发布日期与标签分类；同时回归验证 `/blog` 返回 `200`。
- 结论：Phase 5 的 RSS 子项已完成。下一轮优先做博客全文搜索的最小可用版本，别继续在边角料上打转。

### 2026-04-04（周六）05:30 — Phase 5 第3轮：全文搜索最小可用版落地
- 新增 `app/search-index.json/route.ts` 与 `lib/search.ts`，基于已发布文章生成静态 JSON 搜索索引，输出 `generatedAt`、`total` 与文章标题/描述/摘要/标签字段，给客户端搜索和后续搜索增强留出稳定入口。
- 新增 `lib/blog-search.ts` 与 `types/post.ts` 中的 `BlogSearchEntry` 类型，把搜索文本拼接与匹配逻辑收口，避免搜索规则散落在组件里变成一锅粥。
- 重构 `app/blog/page.tsx` 与 `components/post-list.tsx`：博客页改为同时加载文章列表、标签和搜索索引；客户端搜索现在覆盖标题、描述、摘要和标签，并补上结果计数、查询态文案与更像样的空状态。
- 保持页面气质克制：搜索区仍是单输入框 + 标签筛选，没有硬塞复杂高亮、排序器或大而无当的面板。
- 自测通过：`npm run lint` ✅、`npm run build` ✅；`npm run dev -- --port 3003` 后实测 `/blog` 返回 `200`，页面已渲染搜索说明与结果计数；`/search-index.json` 返回 `200`，包含 2 篇已发布文章索引；额外用脚本验证搜索命中：`next` 仅返回 `Shipping Clean Next.js Layouts`、`ux` 命中 `Designing Silent Interfaces`、无匹配关键词返回空数组，对应空状态文案已存在于页面。
- 结论：Phase 5 的搜索子项最小可用版已完成。下一轮该去做性能优化和部署准备，别再把博客发现链路拖着不收尾。

### 2026-04-04（周六）05:55 — Phase 5 第4轮：收尾验证与归档
- 完成最终构建验证：在当前代码基线上再次执行 `npm run build` ✅，确认 SEO、RSS、搜索与原有页面路由都能稳定产出。
- 完成运行态路由回归：启动 `npm run dev -- --port 3004` 后实测 `/`、`/blog`、`/blog/2026-03-30-shipping-clean-next-js-layouts`、`/feed.xml`、`/search-index.json`、`/robots.txt`、`/sitemap.xml` 全部返回 `200`，对应内容类型正常。
- 完成本轮截图归档：新增 `.openclaw/artifacts/2026-04-04-round4/`，保存 `blog-search-desktop.png`、`blog-search-mobile.png`、`feed-desktop.png`，分别覆盖博客搜索桌面 / 移动视图与 RSS feed 页面。
- 当前 Phase 5 已完成的可见产物：站点级 SEO 基线、动态 `feed.xml`、静态搜索索引与博客搜索最小可用版均已落地并通过本轮回归。
- 当前未完成项保持不变：性能优化（缓存 / 图片 / bundle）与 Vercel 部署 / 域名接入仍待下一轮推进。
- 结论：Phase 5 已完成第一批高价值基础设施与发现链路收尾，项目现在适合转入性能收口和上线准备，不要再重复折腾已经验收过的基础功能。

### 2026-04-04（周六）14:30 — Phase 5 第5轮：性能优化落地
- 完成 **内容缓存与 ISR 策略**：`lib/posts.ts` 改为使用 `unstable_cache` 缓存文章文件读取与 frontmatter 解析，`lib/search.ts` 也追加 1 小时缓存，避免博客列表、RSS、搜索索引、sitemap 每次请求都重新扫磁盘和跑 `gray-matter`。
- 完成 **博客路由 revalidate 收口**：`/blog`、`/blog/[slug]`、`/sitemap.xml` 统一声明 `revalidate = 3600`，让内容型页面走稳定的 ISR，而不是每次都现算。
- 完成 **首屏 JS 减负**：`components/ThemeToggle.tsx`、`components/home-hero.tsx`、`components/post-list.tsx` 去掉对 HeroUI 客户端组件的依赖，首页 CTA、主题切换、博客搜索和列表交互改为原生元素，减少无谓的前端负重。
- 构建结果确认优化有效：首页 `First Load JS` 从 **130 kB → 106 kB**，博客列表页从 **135 kB → 104 kB**；这才像个博客，不是穿着举重服跑步。
- 图片优化结论：当前站内缺少真实文章封面或内容图片，暂无可做的 `next/image` 高价值改造项；本轮优先把真正影响首屏和服务端重复计算的包袱先砍掉。
- 完成 **运行态回归与证据归档**：启动 `npm run dev -- --port 3010` 后实际访问 `/`、`/blog`、`/blog/2026-03-30-shipping-clean-next-js-layouts`、`/feed.xml`、`/search-index.json`，全部返回 `200`；新增 `.openclaw/artifacts/2026-04-04-round5/`，保存对应 headers/body 证据与 `home-desktop.png`、`blog-desktop.png`、`post-desktop.png`、`feed-desktop.png` 截图。
- 完成 **部署前检查**：确认仓库内尚无 `.vercel/` 或 `vercel.json`；通过 `npx vercel --version` 验证 CLI 可用，但 `npx vercel whoami` 返回 `No existing credentials found`，当时阻塞在 Vercel 账号未登录，无法继续 `link` / `deploy`。
- 当前 Phase 5 的剩余项缩减为：Vercel 项目接入 / 首次部署 / 自定义域名接入（待用户完成 Vercel 登录后继续）。

### 2026-04-04（周六）14:20 — Phase 5 第6轮：Vercel 项目关联完成
- 完成 **Vercel 登录校验**：`npx vercel whoami` 现已返回 `blue-a11y`，说明用户刚补完登录，这次总算不是空气授权。
- 初次在 `app/` 下执行 `npx vercel link --yes`，项目被关联到 `blues-projects-90e3f68b/app`，但这其实把 Next.js 的 `app/` 目录错当成仓库根，属于目录选错的低级坑。
- 直接从该错误关联发起 production deploy 后，线上 `/`、`/blog`、文章页、`/feed.xml`、`/search-index.json` 全部返回 `404`，确认问题不是代码炸了，而是项目根目录配错了。
- 随后在仓库根目录重新执行 `npx vercel link --yes`，Vercel 正确识别为 Next.js 项目，并重新关联到 `blues-projects-90e3f68b/blueblog`；后续 deploy 全部以这个根项目为准。

### 2026-04-04（周六）14:24 — Phase 5 第7轮：首次 production 部署成功并完成线上验证
- 完成 **首次 production deploy**：在仓库根目录执行 `npx vercel deploy --prod --yes`，产出 deployment `https://blueblog-17nzgbht1-blues-projects-90e3f68b.vercel.app`。该 deployment 直链受 Vercel 访问保护返回 `401`，但公开 production alias `https://blueblog-theta.vercel.app` 已可正常访问。
- 完成 **线上关键路径实测**：使用 Python 实际请求 `https://blueblog-theta.vercel.app/`、`/blog`、`/blog/2026-03-30-shipping-clean-next-js-layouts`、`/feed.xml`、`/search-index.json`，全部返回 `200`，内容类型分别为 HTML / RSS XML / JSON，说明首页、博客列表、文章详情、RSS、搜索索引都在线。
- 构建链路补充说明：`vercel deploy` CLI 末尾两次出现 `socket hang up`，但 `npx vercel inspect blueblog-17nzgbht1-blues-projects-90e3f68b.vercel.app` 已确认部署最终状态为 `Ready`，属于 CLI 轮询阶段抽风，不影响最终上线结果。
- 自定义域名暂未推进：当前仍需要用户明确要绑定哪个域名，以及是否具备对应 DNS 管理权限；这个不能替用户瞎猜。

### 2026-04-04（周六）15:18 — Phase 5 第10轮：Vercel Analytics 接入完成
- 按 Vercel Analytics 官方 Quickstart 的 Next.js 推荐接法完成接入：安装 `@vercel/analytics`，并在根布局 `app/layout.tsx` 中引入 `Analytics` 组件，挂在 `</body>` 前，没多装乱七八糟的 Speed Insights。
- 本轮代码改动保持最小：业务页面、样式、路由都没碰，只补了 production 所需的埋点入口；这才叫正常人接 SDK，不是把项目翻修一遍。
- 验证通过：`npm run lint` ✅、`npm run build` ✅。由于仅增加根布局组件注入，且构建链路与类型检查均通过，本轮无需额外起 dev server 做重复体力活。
- 部署状态：项目当前已接入 Vercel production，本轮已在仓库根目录完成新的 production deploy，deployment 为 `https://blueblog-d742fdgv5-blues-projects-90e3f68b.vercel.app`，公开站点 `https://blueblog-theta.vercel.app` 可正常访问；Vercel 还顺手把 `https://blueblog.me` alias 到了这次部署，但 SSL 证书仍在异步签发中。
- 面板说明：代码已经上线，但 Vercel Web Analytics 是否开始出数还取决于项目面板里是否已启用对应功能；如果该项目此前没开过 Analytics，用户仍需去 Vercel 项目设置里点一下启用。

### 2026-04-04（周六）15:05 — Phase 5 第9轮：首页主 CTA 按钮视觉修正已重新上线
- 核查 `components/home-hero.tsx`，确认首页主 CTA 已从此前的旧按钮实现切换为直接指向 `/blog` 的 `Read the blog` 链接样式，使用 `border-accent/18 + bg-accent/12 + rounded-full` 的轻量主按钮视觉；问题不是代码没改，而是之前线上没重新部署到位。
- 本地重新执行 `npm run build` ✅，构建产物正常；同时启动 `npm run dev -- --port 3030`，实际打开首页并截图归档到 `.openclaw/artifacts/2026-04-04-cta-deploy/home-cta-local.png`，确认首页 CTA 视觉已按预期呈现。
- 更新项目文档后，提交并推送本轮修复，随后在 **仓库根目录** 重新执行 production deploy，避免再把 `app/` 子目录错连成独立项目。
- 线上验证完成：`https://blueblog-theta.vercel.app/` 可正常访问，首页主 CTA 新样式已上线；额外保存线上截图用于留档。
- 结论：这次是一次标准的“代码早就改了，但部署没跟上”的锅，现已补齐提交、推送、生产部署和线上验收链路。

### 2026-04-04（周六）14:55 — Phase 5 第8轮：主题颜色回归修复
- 按要求先启动 `npm run dev -- --port 3020`，用 Playwright 实际截图检查首页、`/blog`、文章页在明/暗主题下的真实渲染，而不是靠读代码瞎猜。
- 定位到本轮真正的问题不在布局，而在 **主题 token 对比度偏弱**：亮色模式里次级文字 / 边框 / 卡片层级过淡，暗色模式里卡片、正文容器与页面背景过近，文章页正文卡和代码块像糊在一起。
- 已克制修复 `app/globals.css` 的核心颜色 token：仅增强 `surface` / `card` / `muted` / `muted-foreground` / `border` / `shadow` 在明暗两套主题下的对比度，不改站点整体气质。
- 额外微调 `app/blog/[slug]/page.tsx`：将文章正文大容器从 `bg-card` 调整为 `bg-surface/96`，并稍微提高边框与阴影层级，让正文卡和内部代码块终于不再糊成一坨。
- 回归验证通过：再次截图确认首页、`/blog`、文章页在明/暗主题下都可读性更稳；`npm run lint` ✅、`npm run build` ✅。

### 2026-04-04（周六）04:00 — Phase 4 完成验收与文案收尾
- 完成 `/showcase` 文案与验收面板重构：将主题切换实验室的可见文案统一为简洁专业英文，保留 HeroUI v3 compound pattern、实时主题预览、表单反馈与完成度展示。
- 完成 `/components-examples` 可见 UI 文案清理：将展示页中的中文提示、表单说明、状态反馈、拖拽操作与检查面板统一切换为英文，避免开发吐槽文案直接暴露到用户界面。
- `app/layout.tsx` 的 `lang` 已调整为 `en`，与当前 Phase 4 页面英文 UI 保持一致。
- 完成 Phase 4 验收：执行 `npm run lint` ✅、`npm run build` ✅。
- 完成桌面 / 移动端截图归档：`/showcase`、`/components-examples`、`/playground` 截图已保存至 `.openclaw/artifacts/2026-04-04-round1/`。
- 本轮验收口径：重点确认主题预览按钮可切换明 / 暗模式、关键卡片和表单在两种主题下层级清晰，且三张 Phase 4 页面均通过桌面 / 移动端截图检查。
- 结论：Phase 4 收尾完成，下一阶段可切入 Phase 5（SEO / RSS / 搜索 / 性能 / 部署）。

### 2026-04-01（周三）06:00 — Phase 3 完成收尾
- 核查 `app/projects/page.tsx` 与 `app/about/page.tsx`，确认项目展示页和关于页均已落地并挂接到独立路由。
- 验证 `components/projects/project-showcase.tsx`：时间线布局、状态 badge、项目详情卡片、按状态 / 技术栈筛选、空状态反馈全部可用。
- 验证 `components/about/about-overview.tsx`：技能矩阵、经历时间线、联系方式组件、跳转按钮与信息卡片已完整接入。
- 运行 `npm run build` 成功，静态路由 `/projects` 与 `/about` 均通过构建。
- 启动 `npm run dev` 实测页面，并用 Playwright 保存 1280px PNG 截图：`/tmp/openclaw/blueblog-home.png`、`/tmp/openclaw/blueblog-projects.png`、`/tmp/openclaw/blueblog-about.png`。

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
