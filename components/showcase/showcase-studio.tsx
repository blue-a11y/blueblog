"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Chip,
  Description,
  FieldError,
  Input,
  Label,
  ProgressBar,
  TextArea,
  TextField,
} from "@heroui/react";

type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "blueblog-theme";

function applyTheme(theme: ThemeMode) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

type ComponentSpotlight = {
  name: string;
  category: string;
  summary: string;
  status: "Ready" | "Interactive" | "Preview";
};

const spotlightComponents: ComponentSpotlight[] = [
  {
    name: "Card",
    category: "Layout",
    summary: "Compound pattern 直接拿来做信息分组，结构清楚，不用写一堆屎 props。",
    status: "Ready",
  },
  {
    name: "Button",
    category: "Action",
    summary: "语义化 variant + onPress，交互规范总算像点样子。",
    status: "Interactive",
  },
  {
    name: "TextField",
    category: "Forms",
    summary: "Label / Description / FieldError 一套齐活，可访问性不用再手搓。",
    status: "Interactive",
  },
  {
    name: "ProgressBar",
    category: "Feedback",
    summary: "用来展示上传、完成度、流程进度，比纯文字靠谱。",
    status: "Preview",
  },
];

const quickActions = [
  { label: "预览卡片层级", variant: "primary" as const },
  { label: "切换表单状态", variant: "secondary" as const },
  { label: "查看主题兼容", variant: "outline" as const },
];

export function ShowcaseStudio() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);
  const [activeAction, setActiveAction] = useState<string>(quickActions[0].label);
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("我在检查 HeroUI v3 的展示页，别把组件写成一锅粥。");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const resolvedTheme: ThemeMode = storedTheme === "dark" ? "dark" : "light";

    applyTheme(resolvedTheme);
    setTheme(resolvedTheme);
    setMounted(true);
  }, []);

  const emailIsInvalid = email.length > 0 && !email.includes("@");
  const completion = Math.min(100, 35 + Math.round((notes.trim().length / 140) * 65));

  const filteredSpots = useMemo(() => {
    const keyword = activeAction.toLowerCase();

    if (keyword.includes("主题")) {
      return spotlightComponents.filter((item) => item.category !== "Action");
    }

    if (keyword.includes("表单")) {
      return spotlightComponents.filter((item) => item.category === "Forms" || item.category === "Feedback");
    }

    return spotlightComponents;
  }, [activeAction]);

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 pb-20 pt-32 sm:px-10 lg:px-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start">
        <Card className="border border-border/70 bg-card/88 shadow-[0_32px_120px_-64px_var(--shadow)] backdrop-blur">
          <Card.Header className="gap-4 border-b border-border/60 pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <Chip variant="soft">/showcase</Chip>
              <Chip variant="secondary">HeroUI v3</Chip>
              <Chip variant={theme === "dark" ? "primary" : "tertiary"}>
                Theme: {mounted ? theme : "loading"}
              </Chip>
            </div>
            <div className="space-y-3">
              <Card.Title className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                HeroUI Showcase Studio
              </Card.Title>
              <Card.Description className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                这页专门拿来展示 HeroUI v3 组件怎么在 BlueBlog 里落地：有卡片结构、按钮交互、
                TextField 组合，还有主题兼容和响应式布局。Provider？不用。v2 那套老毛病别带进来。
              </Card.Description>
            </div>
          </Card.Header>
          <Card.Content className="grid gap-6 py-6 md:grid-cols-[minmax(0,1fr)_280px]">
            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant={action.variant}
                    className="w-full"
                    onPress={() => setActiveAction(action.label)}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>

              <Card variant="transparent" className="border border-border/70 bg-background/70">
                <Card.Header>
                  <Card.Title className="text-lg">组件观察台</Card.Title>
                  <Card.Description>
                    当前聚焦：{activeAction}。不同按钮会切换右侧列表，证明这页不只是摆拍。
                  </Card.Description>
                </Card.Header>
                <Card.Content className="grid gap-3 sm:grid-cols-2">
                  {filteredSpots.map((item) => (
                    <article
                      key={item.name}
                      className="rounded-2xl border border-border/65 bg-card/75 p-4 transition-colors hover:border-accent/40"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.name}</p>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                        <Chip variant={item.status === "Interactive" ? "primary" : item.status === "Preview" ? "soft" : "secondary"}>
                          {item.status}
                        </Chip>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">{item.summary}</p>
                    </article>
                  ))}
                </Card.Content>
              </Card>
            </div>

            <Card variant="transparent" className="border border-border/70 bg-background/75">
              <Card.Header>
                <Card.Title className="text-lg">主题兼容速查</Card.Title>
                <Card.Description>
                  直接切换预期主题，检查语义色和页面文案在明暗模式下有没有翻车。
                </Card.Description>
              </Card.Header>
              <Card.Content className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={theme === "light" ? "primary" : "outline"}
                    onPress={() => {
                      applyTheme("light");
                      setTheme("light");
                    }}
                  >
                    Light preview
                  </Button>
                  <Button
                    variant={theme === "dark" ? "primary" : "outline"}
                    onPress={() => {
                      applyTheme("dark");
                      setTheme("dark");
                    }}
                  >
                    Dark preview
                  </Button>
                </div>
                <div className="rounded-2xl border border-border/65 bg-card/85 p-4">
                  <p className="text-sm font-medium text-foreground">当前建议</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {theme === "dark"
                      ? "暗色下重点看边框、阴影和 muted 文案是否还清晰。写 UI 别只盯着亮色图。"
                      : "亮色下重点看层级和按钮对比度，别做成一坨发灰的假高级。"}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>展示页完成度</span>
                    <span>{completion}%</span>
                  </div>
                  <ProgressBar aria-label="Showcase completion" value={completion} />
                </div>
              </Card.Content>
            </Card>
          </Card.Content>
        </Card>

        <Card className="border border-border/70 bg-card/88 shadow-[0_28px_90px_-60px_var(--shadow)] backdrop-blur">
          <Card.Header className="border-b border-border/60 pb-5">
            <Card.Title className="text-2xl font-semibold">交互表单 Demo</Card.Title>
            <Card.Description className="leading-6">
              用 TextField compound pattern 搭个可交互表单，顺便证明 onPress 和校验都正常工作。
            </Card.Description>
          </Card.Header>
          <Card.Content className="space-y-5 py-6">
            <TextField
              className="w-full"
              type="email"
              name="showcase-email"
              isInvalid={emailIsInvalid}
              value={email}
              onChange={setEmail}
            >
              <Label>通知邮箱</Label>
              <Input placeholder="you@blueblog.dev" />
              <Description>输入一个带 @ 的邮箱，别把基础格式都写炸了。</Description>
              <FieldError>{emailIsInvalid ? "邮箱格式不对，至少加个 @ 吧。" : ""}</FieldError>
            </TextField>

            <TextField className="w-full" name="showcase-notes">
              <Label>展示备注</Label>
              <TextArea
                rows={5}
                placeholder="记录这页准备展示什么组件…"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
              <Description>字符数：{notes.trim().length} / 200</Description>
            </TextField>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="primary" onPress={() => setNotes("HeroUI v3 展示页已准备好，结构、交互、主题都过了一遍。")}>
                填充示例内容
              </Button>
              <Button variant="ghost" onPress={() => setNotes("")}>清空备注</Button>
            </div>
          </Card.Content>
          <Card.Footer className="border-t border-border/60 pt-5">
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">当前动作</p>
                <p className="text-sm text-muted-foreground">{activeAction}</p>
              </div>
              <Button variant="secondary" onPress={() => setActiveAction("查看主题兼容")}>同步右侧状态</Button>
            </div>
          </Card.Footer>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "无 Provider",
            detail: "HeroUI v3 直接用，不要再塞个 Provider 装忙。",
          },
          {
            title: "Compound pattern",
            detail: "Card.Header / Card.Content / TextField + Label + Input，全都按规范来。",
          },
          {
            title: "响应式布局",
            detail: "手机单列、桌面双栏，间距和层级都没偷工减料。",
          },
        ].map((item) => (
          <Card key={item.title} variant="transparent" className="border border-border/70 bg-card/76">
            <Card.Header>
              <Card.Title className="text-base">{item.title}</Card.Title>
              <Card.Description className="leading-6">{item.detail}</Card.Description>
            </Card.Header>
          </Card>
        ))}
      </div>
    </section>
  );
}
