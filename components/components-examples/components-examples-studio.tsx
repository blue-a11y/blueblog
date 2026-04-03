"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Chip,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Modal,
  TextArea,
  TextField,
} from "@heroui/react";

/**
 * 这页是 Phase 4 第一轮的组件展示页。
 * 目标不是做一堆静态截图，而是拿真实交互去验证 HeroUI v3 在项目里的落地方式。
 *
 * 关键约束：
 * 1. 使用 HeroUI v3 复合组件模式（尤其是 Card / Modal / TextField）。
 * 2. 交互事件统一使用 onPress，而不是 onClick。
 * 3. 页面要在浅色 / 深色主题下都能正常显示。
 * 4. 每个主要组件都必须有“活的” demo，而不是摆拍。
 */

type ThemeMode = "light" | "dark";

type ComponentExample = {
  id: string;
  name: "Button" | "Card" | "Modal" | "Form" | "TextField";
  category: string;
  summary: string;
  tip: string;
  snippet: string;
};

type DemoLane = {
  id: string;
  title: string;
  detail: string;
  tone: "primary" | "secondary" | "soft";
};

const THEME_STORAGE_KEY = "blueblog-theme";

const componentExamples: ComponentExample[] = [
  {
    id: "button",
    name: "Button",
    category: "Action",
    summary: "语义化 variant 配合 onPress，主次动作清楚，别再把所有按钮都写成一个德行。",
    tip: "适合验证 CTA 层级、禁用态和即时反馈。",
    snippet: `import { Button } from "@heroui/react";

<Button variant="primary" onPress={() => console.log("publish") }>
  Publish
</Button>`,
  },
  {
    id: "card",
    name: "Card",
    category: "Layout",
    summary: "用 Card.Header / Card.Content / Card.Footer 拆结构，信息层级终于像个人写的。",
    tip: "适合做内容分组、概览面板和响应式信息卡。",
    snippet: `import { Card } from "@heroui/react";

<Card>
  <Card.Header>
    <Card.Title>Release Notes</Card.Title>
    <Card.Description>Structured content block</Card.Description>
  </Card.Header>
  <Card.Content>...</Card.Content>
</Card>`,
  },
  {
    id: "modal",
    name: "Modal",
    category: "Overlay",
    summary: "Modal v3 是标准复合组件，触发器、遮罩、容器、内容区都拆开，别偷懒乱包。",
    tip: "适合操作确认、二次说明和轻量流程弹层。",
    snippet: `import { Button, Modal } from "@heroui/react";

<Modal>
  <Modal.Trigger>
    <Button variant="secondary">Open</Button>
  </Modal.Trigger>
  <Modal.Backdrop>
    <Modal.Container>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Heading>Preview</Modal.Heading>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
</Modal>`,
  },
  {
    id: "form",
    name: "Form",
    category: "Validation",
    summary: "表单容器负责提交与约束，字段交给 TextField 组合，职责别搅成泥。",
    tip: "适合处理提交状态、批量校验和交互反馈。",
    snippet: `import { Form } from "@heroui/react";

<Form onSubmit={(event) => event.preventDefault()}>
  {/* fields */}
</Form>`,
  },
  {
    id: "textfield",
    name: "TextField",
    category: "Input",
    summary: "Label / Description / FieldError 这一套直接带上，可访问性不用自己乱缝。",
    tip: "适合展示输入、提示文案、错误态与多行文本。",
    snippet: `import { Description, FieldError, Input, Label, TextField } from "@heroui/react";

<TextField isInvalid>
  <Label>Email</Label>
  <Input placeholder="you@example.com" />
  <Description>We will only use this for updates.</Description>
  <FieldError>Invalid email format.</FieldError>
</TextField>`,
  },
];

const initialLanes: DemoLane[] = [
  {
    id: "discover",
    title: "Discover",
    detail: "先筛选组件，再决定要看哪个 demo。",
    tone: "soft",
  },
  {
    id: "compare",
    title: "Compare",
    detail: "对比浅色 / 深色主题下的层级和反馈。",
    tone: "secondary",
  },
  {
    id: "iterate",
    title: "Iterate",
    detail: "拖动优先级，模拟设计评审时的排序过程。",
    tone: "primary",
  },
];

function applyTheme(theme: ThemeMode) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function reorderLanes(items: DemoLane[], activeId: string, overId: string) {
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

function moveLane(items: DemoLane[], id: string, direction: "up" | "down") {
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

export function ComponentsExamplesStudio() {
  // 主题状态：让页面能直接在演示时切换明暗模式，避免只会在一种主题下装死。
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  // 搜索：实时过滤组件说明卡片，模拟文档页和组件库检索体验。
  const [search, setSearch] = useState("");

  // Demo 状态：给按钮、表单、Modal 做真实反馈，不搞假把式。
  const [statusMessage, setStatusMessage] = useState("组件展示页已就位，随便点，别客气。");
  const [modalMessage, setModalMessage] = useState("当前预览内容是 HeroUI v3 规范写法，没有 Provider，没有 onClick，终于像点样子。\n");
  const [formName, setFormName] = useState("BlueBlog Phase 4");
  const [email, setEmail] = useState("demo@blueblog.dev");
  const [notes, setNotes] = useState("需要重点检查 Button / Modal / Form / TextField 在双主题下的状态反馈。\n");
  const [submitSummary, setSubmitSummary] = useState("还没提交。先填点像样的内容再说。");

  // 交互式拖拽 demo：这里先做基础结构，后续要升级成更复杂的拖拽也方便扩展。
  const [lanes, setLanes] = useState<DemoLane[]>(initialLanes);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const resolvedTheme: ThemeMode = storedTheme === "dark" ? "dark" : "light";

    applyTheme(resolvedTheme);
    setTheme(resolvedTheme);
    setMounted(true);
  }, []);

  const emailIsInvalid = email.trim().length > 0 && !email.includes("@");
  const nameIsInvalid = formName.trim().length < 3;
  const notesLength = notes.trim().length;

  const filteredExamples = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return componentExamples;
    }

    return componentExamples.filter((item) => {
      const haystack = [item.name, item.category, item.summary, item.tip, item.snippet]
        .join(" ")
        .toLowerCase();

      return haystack.includes(keyword);
    });
  }, [search]);

  const previewChecklist = useMemo(() => {
    return [
      `Theme: ${mounted ? theme : "loading"}`,
      `Search hits: ${filteredExamples.length}`,
      `Drag order: ${lanes.map((lane) => lane.title).join(" → ")}`,
    ];
  }, [filteredExamples.length, lanes, mounted, theme]);

  const handleThemePreview = (nextTheme: ThemeMode) => {
    applyTheme(nextTheme);
    setTheme(nextTheme);
    setStatusMessage(nextTheme === "dark" ? "已切到暗色主题，去盯边框和对比度。" : "已切到亮色主题，去盯层级和留白。");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nameIsInvalid || emailIsInvalid || notesLength < 12) {
      setSubmitSummary("提交失败：字段没填对。基础校验都过不了，演示个鬼。");
      setStatusMessage("表单校验拦住了提交，错误态正常触发。");
      return;
    }

    setSubmitSummary(`已提交演示：${formName} / ${email} / 备注 ${notesLength} 字`);
    setStatusMessage("表单提交成功，交互反馈正常。嗯，这块还凑合。");
  };

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 pb-20 pt-32 sm:px-10 lg:px-12">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
        <Card className="border border-border/70 bg-card/88 shadow-[0_32px_120px_-64px_var(--shadow)] backdrop-blur transition-colors duration-300">
          <Card.Header className="gap-4 border-b border-border/60 pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <Chip variant="soft">/components-examples</Chip>
              <Chip variant="secondary">HeroUI v3</Chip>
              <Chip variant={theme === "dark" ? "primary" : "tertiary"}>
                Theme: {mounted ? theme : "loading"}
              </Chip>
              <Chip variant="soft">5 live demos</Chip>
            </div>

            <div className="space-y-3">
              <Card.Title className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                HeroUI Components Examples
              </Card.Title>
              <Card.Description className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                这页专门拿来展示 HeroUI v3 组件在 BlueBlog 里的真实用法：
                Button、Card、Modal、Form、TextField 全部有活 demo，有说明，也有代码示例。
                不是摆拍页，是拿来验收的。
              </Card.Description>
            </div>
          </Card.Header>

          <Card.Content className="grid gap-6 py-6">
            <Card variant="transparent" className="border border-border/70 bg-background/70 transition-colors duration-300">
              <Card.Header className="gap-2">
                <Card.Title className="text-xl">实时搜索组件示例</Card.Title>
                <Card.Description>
                  输入关键词立即过滤说明卡片，模拟组件文档查找体验。至少这玩意不是死页面。
                </Card.Description>
              </Card.Header>
              <Card.Content className="grid gap-5">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
                  <TextField className="w-full" name="component-search">
                    <Label>搜索组件 / 分类 / 说明</Label>
                    <Input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="比如 modal / validation / onPress"
                    />
                    <Description>实时过滤，无防抖也扛得住这点数据量，没必要过度装复杂。</Description>
                  </TextField>

                  <div className="rounded-2xl border border-border/65 bg-card/75 p-4 text-sm text-muted-foreground transition-colors duration-300">
                    <p className="font-medium text-foreground">即时反馈</p>
                    <p className="mt-2">关键词：{search || "（空）"}</p>
                    <p className="mt-1">结果：{filteredExamples.length} 个组件</p>
                    <Button
                      variant="ghost"
                      className="mt-3 h-9 w-full rounded-full border border-border/70 transition-transform duration-200 hover:-translate-y-0.5"
                      onPress={() => setSearch("")}
                      isDisabled={search.length === 0}
                    >
                      清空搜索
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredExamples.map((item) => (
                    <Card
                      key={item.id}
                      variant="transparent"
                      className="border border-border/65 bg-card/82 transition-all duration-200 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_18px_60px_-42px_var(--shadow)]"
                    >
                      <Card.Header className="gap-3 border-b border-border/55 pb-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Card.Title className="text-lg">{item.name}</Card.Title>
                            <Card.Description className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                              {item.category}
                            </Card.Description>
                          </div>
                          <Chip variant="soft">live</Chip>
                        </div>
                        <p className="text-sm leading-6 text-muted-foreground">{item.summary}</p>
                      </Card.Header>

                      <Card.Content className="space-y-4 pt-4">
                        <div className="rounded-2xl border border-border/60 bg-background/70 p-3 text-sm leading-6 text-muted-foreground transition-colors duration-300">
                          <p className="font-medium text-foreground">使用说明</p>
                          <p className="mt-1">{item.tip}</p>
                        </div>

                        <div className="rounded-2xl border border-border/60 bg-[oklch(from_var(--card)_calc(l-0.01)_c_h/0.92)] p-3 font-mono text-xs leading-6 text-foreground/90 transition-colors duration-300">
                          <p className="mb-2 font-sans text-sm font-medium text-foreground">代码示例</p>
                          <pre className="overflow-x-auto whitespace-pre-wrap">{item.snippet}</pre>
                        </div>
                      </Card.Content>
                    </Card>
                  ))}
                </div>

                {filteredExamples.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border/75 bg-background/70 px-5 py-8 text-center text-sm text-muted-foreground">
                    没搜到东西。关键词太离谱，或者你确实不知道自己在找什么。
                  </div>
                ) : null}
              </Card.Content>
            </Card>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.92fr)]">
              <Card variant="transparent" className="border border-border/70 bg-background/72 transition-colors duration-300">
                <Card.Header className="gap-2">
                  <Card.Title className="text-xl">核心组件互动演示</Card.Title>
                  <Card.Description>
                    一个区域里把 Button、Card、Modal 三种交互跑起来，省得拆得太散没人看得懂。
                  </Card.Description>
                </Card.Header>
                <Card.Content className="grid gap-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Button
                      variant="primary"
                      className="transition-transform duration-200 hover:-translate-y-0.5"
                      onPress={() => setStatusMessage("主按钮触发成功：发布动作已进入预览态。")}
                    >
                      Primary action
                    </Button>
                    <Button
                      variant="secondary"
                      className="transition-transform duration-200 hover:-translate-y-0.5"
                      onPress={() => setStatusMessage("次级动作触发成功：已切到比较视图。")}
                    >
                      Secondary action
                    </Button>
                    <Button
                      variant="ghost"
                      className="transition-transform duration-200 hover:-translate-y-0.5"
                      onPress={() => setStatusMessage("低优先级动作触发成功：现在看到的是轻反馈。")}
                    >
                      Ghost action
                    </Button>
                  </div>

                  <Card variant="transparent" className="border border-border/65 bg-card/80 transition-colors duration-300">
                    <Card.Header>
                      <Card.Title className="text-lg">反馈面板</Card.Title>
                      <Card.Description>
                        Button 和主题切换会即时更新这里，证明这块真在动，不是静态模板。
                      </Card.Description>
                    </Card.Header>
                    <Card.Content className="space-y-4 pt-0">
                      <div className="rounded-2xl border border-border/60 bg-background/70 p-4 text-sm leading-6 text-muted-foreground transition-colors duration-300">
                        {statusMessage}
                      </div>

                      <Modal>
                        <Modal.Trigger>
                          <Button variant="outline" className="rounded-full" onPress={() => setModalMessage(`当前主题：${theme}。\n最近反馈：${statusMessage}`)}>
                            打开 Modal 预览
                          </Button>
                        </Modal.Trigger>
                        <Modal.Backdrop>
                          <Modal.Container size="lg" placement="center">
                            <Modal.Dialog className="border border-border/70 bg-card/95 backdrop-blur">
                              <Modal.Header className="border-b border-border/60 pb-4">
                                <Modal.Heading className="text-lg font-semibold text-foreground">
                                  HeroUI Modal live preview
                                </Modal.Heading>
                              </Modal.Header>
                              <Modal.Body className="space-y-4 py-5 text-sm leading-7 text-muted-foreground">
                                <p>
                                  这是 Modal 复合组件写法：Trigger、Backdrop、Container、Dialog、Header、Body、Footer 全拆开。
                                  没偷懒，没乱套壳。
                                </p>
                                <div className="rounded-2xl border border-border/60 bg-background/70 p-4 whitespace-pre-wrap transition-colors duration-300">
                                  {modalMessage}
                                </div>
                              </Modal.Body>
                              <Modal.Footer className="border-t border-border/60 pt-4">
                                <Modal.CloseTrigger className="inline-flex min-h-10 items-center justify-center rounded-full border border-border px-4 text-sm font-medium text-foreground transition hover:bg-muted/70">
                                  关掉
                                </Modal.CloseTrigger>
                              </Modal.Footer>
                            </Modal.Dialog>
                          </Modal.Container>
                        </Modal.Backdrop>
                      </Modal>
                    </Card.Content>
                  </Card>
                </Card.Content>
              </Card>

              <Card variant="transparent" className="border border-border/70 bg-background/72 transition-colors duration-300">
                <Card.Header className="gap-2">
                  <Card.Title className="text-xl">拖拽排序结构预演</Card.Title>
                  <Card.Description>
                    先用原生 drag API 搭基础结构，再加按钮兜底，移动端和键盘用户不至于只能看着发呆。
                  </Card.Description>
                </Card.Header>
                <Card.Content className="space-y-3">
                  {lanes.map((lane, index) => (
                    <div
                      key={lane.id}
                      draggable
                      onDragStart={() => setDraggingId(lane.id)}
                      onDragEnd={() => setDraggingId(null)}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => {
                        if (!draggingId || draggingId === lane.id) {
                          return;
                        }

                        setLanes((current) => reorderLanes(current, draggingId, lane.id));
                        setStatusMessage(`拖拽完成：${draggingId} 已移动到 ${lane.title} 前后的位置。`);
                        setDraggingId(null);
                      }}
                      className={[
                        "flex flex-col gap-4 rounded-2xl border px-4 py-4 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between",
                        draggingId === lane.id
                          ? "border-accent/70 bg-accent/10 shadow-[0_16px_40px_-28px_var(--shadow)]"
                          : "border-border/65 bg-card/80",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/65 bg-background text-sm font-semibold text-foreground transition-colors duration-300">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{lane.title}</p>
                          <p className="text-sm text-muted-foreground">{lane.detail}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                        <Chip variant={lane.tone}>{lane.tone}</Chip>
                        <Button
                          variant="ghost"
                          className="rounded-full px-3"
                          onPress={() => setLanes((current) => moveLane(current, lane.id, "up"))}
                          isDisabled={index === 0}
                        >
                          上移
                        </Button>
                        <Button
                          variant="ghost"
                          className="rounded-full px-3"
                          onPress={() => setLanes((current) => moveLane(current, lane.id, "down"))}
                          isDisabled={index === lanes.length - 1}
                        >
                          下移
                        </Button>
                      </div>
                    </div>
                  ))}
                </Card.Content>
              </Card>
            </div>
          </Card.Content>
        </Card>

        <div className="grid gap-6">
          <Card className="border border-border/70 bg-card/88 shadow-[0_28px_90px_-60px_var(--shadow)] backdrop-blur transition-colors duration-300">
            <Card.Header className="gap-3 border-b border-border/60 pb-5">
              <Card.Title className="text-2xl font-semibold">Form + TextField Demo</Card.Title>
              <Card.Description className="leading-6">
                用 Form 做提交容器，用 TextField 负责字段结构和错误态。职责分层清楚，脑子终于上线了。
              </Card.Description>
            </Card.Header>
            <Card.Content className="space-y-5 py-6">
              <Form className="grid gap-4" onSubmit={handleSubmit}>
                <TextField
                  className="w-full"
                  name="demo-name"
                  isInvalid={nameIsInvalid}
                  value={formName}
                  onChange={setFormName}
                >
                  <Label>演示名称</Label>
                  <Input placeholder="BlueBlog Phase 4 demo" />
                  <Description>至少 3 个字符，别拿一个字母糊弄表单校验。</Description>
                  <FieldError>{nameIsInvalid ? "名称太短了，像没写一样。" : ""}</FieldError>
                </TextField>

                <TextField
                  className="w-full"
                  type="email"
                  name="demo-email"
                  isInvalid={emailIsInvalid}
                  value={email}
                  onChange={setEmail}
                >
                  <Label>通知邮箱</Label>
                  <Input placeholder="you@blueblog.dev" />
                  <Description>至少带个 @。基础格式都不对，就别装提交成功了。</Description>
                  <FieldError>{emailIsInvalid ? "邮箱格式不对。" : ""}</FieldError>
                </TextField>

                <TextField className="w-full" name="demo-notes" isInvalid={notesLength > 0 && notesLength < 12}>
                  <Label>演示备注</Label>
                  <TextArea
                    rows={5}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="写下本页要验证的交互要点…"
                  />
                  <Description>至少 12 个字，确保不是无意义废话。当前：{notesLength} 字。</Description>
                  <FieldError>{notesLength > 0 && notesLength < 12 ? "备注太短，没信息量。" : ""}</FieldError>
                </TextField>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button type="submit" variant="primary" className="transition-transform duration-200 hover:-translate-y-0.5">
                    提交演示
                  </Button>
                  <Button
                    variant="secondary"
                    className="transition-transform duration-200 hover:-translate-y-0.5"
                    onPress={() => {
                      setFormName("HeroUI v3 Component Demo");
                      setEmail("team@blueblog.dev");
                      setNotes("检查主题兼容、响应式布局、Modal 反馈、表单校验和拖拽排序基础结构。");
                      setStatusMessage("已填充默认演示内容，适合直接拿来验收。");
                    }}
                  >
                    填充示例
                  </Button>
                </div>
              </Form>
            </Card.Content>
            <Card.Footer className="border-t border-border/60 pt-5">
              <div className="w-full rounded-2xl border border-border/65 bg-background/70 p-4 text-sm leading-6 text-muted-foreground transition-colors duration-300">
                <p className="font-medium text-foreground">提交结果</p>
                <p className="mt-1">{submitSummary}</p>
              </div>
            </Card.Footer>
          </Card>

          <Card variant="transparent" className="border border-border/70 bg-card/82 transition-colors duration-300">
            <Card.Header className="gap-3">
              <Card.Title className="text-lg">主题 / 响应式 / 状态速查</Card.Title>
              <Card.Description>右侧做成小仪表盘，演示时不至于说两句就忘了自己测到哪。</Card.Description>
            </Card.Header>
            <Card.Content className="grid gap-4 text-sm text-muted-foreground">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={theme === "light" ? "primary" : "outline"}
                  onPress={() => handleThemePreview("light")}
                >
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "primary" : "outline"}
                  onPress={() => handleThemePreview("dark")}
                >
                  Dark
                </Button>
              </div>

              {previewChecklist.map((item) => (
                <div key={item} className="rounded-2xl border border-border/65 bg-background/70 p-4 transition-colors duration-300">
                  {item}
                </div>
              ))}

              <div className="rounded-2xl border border-border/65 bg-background/70 p-4 transition-colors duration-300">
                <p className="font-medium text-foreground">本页技术点</p>
                <ul className="mt-2 space-y-2 pl-5">
                  <li>HeroUI v3 复合组件模式：Card / Modal / TextField 全按规范拆分。</li>
                  <li>按钮交互统一使用 onPress，没有混进 onClick 这种老毛病。</li>
                  <li>布局采用移动端单列、桌面端分栏，响应式没偷工减料。</li>
                  <li>卡片悬浮、按钮位移、主题切换都有轻量动画反馈，但没过度花里胡哨。</li>
                </ul>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </section>
  );
}
