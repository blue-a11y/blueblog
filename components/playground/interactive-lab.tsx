"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Card, Chip, Input } from "@heroui/react";

type DemoCard = {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
};

type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "blueblog-theme";

const demoCards: DemoCard[] = [
  {
    id: "hero-shell",
    name: "Hero Shell",
    category: "Layout",
    description: "首页头图卡片结构，重点看层级、留白和阴影有没有写成一锅粥。",
    tags: ["hero", "layout", "landing"],
  },
  {
    id: "post-card",
    name: "Post Card",
    category: "Content",
    description: "文章列表卡片，用来验证标题、摘要和 meta 信息在窄屏下还能不能看。",
    tags: ["blog", "content", "grid"],
  },
  {
    id: "theme-switch",
    name: "Theme Switch",
    category: "Interaction",
    description: "主题切换区域，检查明暗模式颜色是不是都还像个人写的。",
    tags: ["theme", "toggle", "dark"],
  },
  {
    id: "metric-panel",
    name: "Metric Panel",
    category: "Dashboard",
    description: "数据概览面板，拿来测试数字、标签和辅助文案的可读性。",
    tags: ["stats", "dashboard", "panel"],
  },
  {
    id: "cta-stack",
    name: "CTA Stack",
    category: "Action",
    description: "按钮区块，检查主次操作按钮在不同主题里会不会互相抢戏。",
    tags: ["cta", "button", "action"],
  },
  {
    id: "notes-drawer",
    name: "Notes Drawer",
    category: "Utility",
    description: "边栏备注抽屉，用来观察次级内容在深浅背景上的层次变化。",
    tags: ["drawer", "utility", "notes"],
  },
];

function applyTheme(theme: ThemeMode) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function reorderItems(items: DemoCard[], activeId: string, overId: string) {
  const currentIndex = items.findIndex((item) => item.id === activeId);
  const nextIndex = items.findIndex((item) => item.id === overId);

  if (currentIndex === -1 || nextIndex === -1 || currentIndex === nextIndex) {
    return items;
  }

  const nextItems = [...items];
  const [moved] = nextItems.splice(currentIndex, 1);
  nextItems.splice(nextIndex, 0, moved);
  return nextItems;
}

function moveItem(items: DemoCard[], id: string, direction: "up" | "down") {
  const currentIndex = items.findIndex((item) => item.id === id);

  if (currentIndex === -1) {
    return items;
  }

  const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (nextIndex < 0 || nextIndex >= items.length) {
    return items;
  }

  const nextItems = [...items];
  const [moved] = nextItems.splice(currentIndex, 1);
  nextItems.splice(nextIndex, 0, moved);
  return nextItems;
}

export function InteractiveLab() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);
  const [cards, setCards] = useState(demoCards);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 280);

    return () => window.clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const resolvedTheme: ThemeMode = storedTheme === "dark" ? "dark" : "light";

    applyTheme(resolvedTheme);
    setTheme(resolvedTheme);
    setMounted(true);
  }, []);

  const filteredCards = useMemo(() => {
    if (!debouncedSearch) {
      return cards;
    }

    return cards.filter((card) => {
      const haystack = [card.name, card.category, card.description, ...card.tags]
        .join(" ")
        .toLowerCase();

      return haystack.includes(debouncedSearch);
    });
  }, [cards, debouncedSearch]);

  const themePreviewTone = theme === "dark"
    ? "暗色预览现在是主场。重点盯着边框、阴影和 muted 文案，别让组件在黑底里直接失踪。"
    : "亮色预览现在在线。检查卡片分层和按钮对比度，别做成一屏发灰的伪高级。";

  const handleThemeSwitch = (nextTheme: ThemeMode) => {
    applyTheme(nextTheme);
    setTheme(nextTheme);
  };

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 pb-20 pt-32 sm:px-10 lg:px-12">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] xl:items-start">
        <Card className="border border-border/70 bg-card/88 shadow-[0_32px_120px_-64px_var(--shadow)] backdrop-blur">
          <Card.Header className="gap-4 border-b border-border/60 pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <Chip variant="soft">/playground</Chip>
              <Chip variant="secondary">HeroUI v3</Chip>
              <Chip variant={theme === "dark" ? "primary" : "tertiary"}>
                Theme: {mounted ? theme : "loading"}
              </Chip>
              <Chip variant="soft">Debounce 280ms</Chip>
            </div>
            <div className="space-y-3">
              <Card.Title className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Interactive Playground
              </Card.Title>
              <Card.Description className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                这页不是摆拍，是拿来现场验证交互的。实时搜索、防抖、主题切换、拖拽排序都塞进来了。
                UI 如果还能写崩，那真是基本功烂到家了。
              </Card.Description>
            </div>
          </Card.Header>

          <Card.Content className="grid gap-6 py-6">
            <Card variant="transparent" className="border border-border/70 bg-background/70">
              <Card.Header className="gap-2">
                <Card.Title className="text-xl">实时搜索过滤</Card.Title>
                <Card.Description>
                  输入关键词后先等 280ms 再过滤，模拟真实搜索输入，省得每敲一个字就把渲染抡一遍。
                </Card.Description>
              </Card.Header>
              <Card.Content className="grid gap-5">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
                  <div className="space-y-2">
                    <label htmlFor="playground-search" className="text-sm font-medium text-foreground">
                      搜索组件、分类或标签
                    </label>
                    <Input
                      id="playground-search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="比如 theme / card / dashboard"
                    />
                    <p className="text-xs leading-6 text-muted-foreground">支持组件名、分类、描述和标签模糊匹配。输入乱七八糟也不至于把页面抡死。</p>
                  </div>
                  <div className="rounded-2xl border border-border/65 bg-card/75 p-4 text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">防抖状态</p>
                    <p className="mt-2">原始输入：{search || "（空）"}</p>
                    <p className="mt-1">生效关键词：{debouncedSearch || "（空）"}</p>
                    <p className="mt-1">匹配结果：{filteredCards.length} 张卡片</p>
                    <Button
                      variant="ghost"
                      className="mt-3 h-9 w-full rounded-full border border-border/70"
                      onPress={() => setSearch("")}
                      isDisabled={search.length === 0}
                    >
                      清空搜索
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredCards.map((card) => (
                    <Card
                      key={card.id}
                      variant="transparent"
                      className="border border-border/65 bg-card/78 transition-transform duration-200 hover:-translate-y-1 hover:border-accent/40"
                    >
                      <Card.Header className="gap-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Card.Title className="text-lg">{card.name}</Card.Title>
                            <Card.Description className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                              {card.category}
                            </Card.Description>
                          </div>
                          <Chip variant="soft">{card.tags[0]}</Chip>
                        </div>
                      </Card.Header>
                      <Card.Content className="space-y-4 pt-0">
                        <p className="text-sm leading-6 text-muted-foreground">{card.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {card.tags.map((tag) => (
                            <Chip key={tag} variant="tertiary" className="text-xs">
                              #{tag}
                            </Chip>
                          ))}
                        </div>
                      </Card.Content>
                    </Card>
                  ))}
                </div>

                {filteredCards.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border/75 bg-background/70 px-5 py-8 text-center text-sm text-muted-foreground">
                    没搜到东西。关键词太离谱，或者数据集还不够大，反正不是组件的锅。
                  </div>
                ) : null}
              </Card.Content>
            </Card>

            <Card variant="transparent" className="border border-border/70 bg-background/70">
              <Card.Header className="gap-2">
                <Card.Title className="text-xl">拖拽排序 Demo</Card.Title>
                <Card.Description>
                  原生 drag API 就够了，别什么小活都想上重库。拖动卡片，列表顺序会立即更新。
                </Card.Description>
              </Card.Header>
              <Card.Content className="space-y-3">
                <div className="rounded-2xl border border-border/65 bg-card/75 p-4 text-sm leading-6 text-muted-foreground">
                  拖拽能用，但我顺手补了上下移动按钮，免得移动端和键盘用户只能干瞪眼。
                </div>
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={() => setDraggingId(card.id)}
                    onDragEnd={() => setDraggingId(null)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => {
                      if (!draggingId || draggingId === card.id) {
                        return;
                      }

                      setCards((current) => reorderItems(current, draggingId, card.id));
                      setDraggingId(null);
                    }}
                    className={[
                      "flex flex-col gap-4 rounded-2xl border px-4 py-4 transition sm:flex-row sm:items-center sm:justify-between",
                      draggingId === card.id
                        ? "border-accent/70 bg-accent/10 shadow-[0_16px_40px_-28px_var(--shadow)]"
                        : "border-border/65 bg-card/78",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/65 bg-background text-sm font-semibold text-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{card.name}</p>
                        <p className="text-sm text-muted-foreground">{card.category}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <Button
                        variant="ghost"
                        className="rounded-full px-3"
                        onPress={() => setCards((current) => moveItem(current, card.id, "up"))}
                        isDisabled={index === 0}
                      >
                        上移
                      </Button>
                      <Button
                        variant="ghost"
                        className="rounded-full px-3"
                        onPress={() => setCards((current) => moveItem(current, card.id, "down"))}
                        isDisabled={index === cards.length - 1}
                      >
                        下移
                      </Button>
                      <Chip variant="secondary">拖我</Chip>
                    </div>
                  </div>
                ))}
              </Card.Content>
            </Card>
          </Card.Content>
        </Card>

        <div className="grid gap-6">
          <Card className="border border-border/70 bg-card/88 shadow-[0_28px_90px_-60px_var(--shadow)] backdrop-blur">
            <Card.Header className="gap-3 border-b border-border/60 pb-5">
              <Card.Title className="text-2xl font-semibold">主题切换实时预览</Card.Title>
              <Card.Description className="leading-6">
                直接改全局 data-theme，和页面头部的主题按钮共用一套存储。别再搞两套状态互相打架。
              </Card.Description>
            </Card.Header>
            <Card.Content className="space-y-5 py-6">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={theme === "light" ? "primary" : "outline"}
                  onPress={() => handleThemeSwitch("light")}
                >
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "primary" : "outline"}
                  onPress={() => handleThemeSwitch("dark")}
                >
                  Dark
                </Button>
              </div>

              <div className="rounded-3xl border border-border/65 bg-background/75 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">实时主题反馈</p>
                    <p className="mt-1 text-sm text-muted-foreground">{themePreviewTone}</p>
                  </div>
                  <Chip variant={theme === "dark" ? "primary" : "secondary"}>
                    {theme === "dark" ? "Dark active" : "Light active"}
                  </Chip>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Card variant="transparent" className="border border-border/65 bg-card/85">
                    <Card.Header className="gap-2">
                      <Card.Title className="text-base">Primary action</Card.Title>
                      <Card.Description>主按钮和强调色的对比度检查。</Card.Description>
                    </Card.Header>
                    <Card.Content className="pt-0">
                      <Button variant="primary" className="w-full">
                        发布预览
                      </Button>
                    </Card.Content>
                  </Card>

                  <Card variant="transparent" className="border border-border/65 bg-card/85">
                    <Card.Header className="gap-2">
                      <Card.Title className="text-base">Outline action</Card.Title>
                      <Card.Description>次级动作在暗色下也不能像没加载出来。</Card.Description>
                    </Card.Header>
                    <Card.Content className="pt-0">
                      <Button variant="outline" className="w-full">
                        查看变更
                      </Button>
                    </Card.Content>
                  </Card>
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card variant="transparent" className="border border-border/70 bg-card/80">
            <Card.Header>
              <Card.Title className="text-lg">本页检查点</Card.Title>
              <Card.Description>省流版，免得有人连自己做了什么都说不清。</Card.Description>
            </Card.Header>
            <Card.Content className="grid gap-3 text-sm text-muted-foreground">
              <div className="rounded-2xl border border-border/65 bg-background/70 p-4">
                <p className="font-medium text-foreground">客户端组件</p>
                <p className="mt-1">整页使用 <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">use client</code>，避免把交互逻辑塞进服务端瞎折腾。</p>
              </div>
              <div className="rounded-2xl border border-border/65 bg-background/70 p-4">
                <p className="font-medium text-foreground">HeroUI compound pattern</p>
                <p className="mt-1">统一用 Card.Header / Card.Content / Card.Title 组合，不走 v2 那套过时写法。</p>
              </div>
              <div className="rounded-2xl border border-border/65 bg-background/70 p-4">
                <p className="font-medium text-foreground">响应式布局</p>
                <p className="mt-1">移动端单列，桌面端分栏。不是只会在自己那块大屏上看着爽。</p>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </section>
  );
}
