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
    summary: "Semantic variants with onPress create clear primary, secondary, and low-emphasis actions.",
    tip: "Use it to review CTA hierarchy, disabled states, and immediate feedback.",
    snippet: `import { Button } from "@heroui/react";

<Button variant="primary" onPress={() => console.log("publish") }>
  Publish
</Button>`,
  },
  {
    id: "card",
    name: "Card",
    category: "Layout",
    summary: "Card.Header, Card.Content, and Card.Footer create predictable information hierarchy.",
    tip: "Best for content grouping, overview panels, and responsive information cards.",
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
    summary: "Modal v3 uses a fully composed structure for trigger, backdrop, container, and dialog layers.",
    tip: "Best for confirmations, secondary guidance, and lightweight flow overlays.",
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
    summary: "Form handles submission and constraints while TextField owns field-level structure.",
    tip: "Use it to review submit states, grouped validation, and response messaging.",
    snippet: `import { Form } from "@heroui/react";

<Form onSubmit={(event) => event.preventDefault()}>
  {/* fields */}
</Form>`,
  },
  {
    id: "textfield",
    name: "TextField",
    category: "Input",
    summary: "Label, Description, and FieldError provide accessible input structure with minimal overhead.",
    tip: "Best for input states, helper copy, errors, and multiline text.",
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
    detail: "Filter examples first, then decide which demo needs review.",
    tone: "soft",
  },
  {
    id: "compare",
    title: "Compare",
    detail: "Compare hierarchy and feedback patterns in light and dark themes.",
    tone: "secondary",
  },
  {
    id: "iterate",
    title: "Iterate",
    detail: "Reorder priorities to simulate a lightweight review workflow.",
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
  const [statusMessage, setStatusMessage] = useState("Component review surface is ready. Interactions update this panel live.");
  const [modalMessage, setModalMessage] = useState("This modal follows the HeroUI v3 compound pattern with no provider and no legacy click handlers.\n");
  const [formName, setFormName] = useState("BlueBlog Phase 4");
  const [email, setEmail] = useState("demo@blueblog.dev");
  const [notes, setNotes] = useState("Review Button, Modal, Form, and TextField behavior in both light and dark themes.\n");
  const [submitSummary, setSubmitSummary] = useState("No submission yet. Complete the form to validate the flow.");

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
    setStatusMessage(nextTheme === "dark" ? "Dark theme active. Review borders, contrast, and muted copy." : "Light theme active. Review spacing, elevation, and action clarity.");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nameIsInvalid || emailIsInvalid || notesLength < 12) {
      setSubmitSummary("Submission failed. Validation errors are blocking the request as expected.");
      setStatusMessage("Form validation blocked the submission and surfaced the expected error states.");
      return;
    }

    setSubmitSummary(`Demo submitted: ${formName} / ${email} / ${notesLength} characters in notes`);
    setStatusMessage("Form submission succeeded and feedback states updated correctly.");
  };

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 pb-20 pt-32 sm:px-10 lg:px-12">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
        <Card className="border border-border/70 bg-card shadow-[0_32px_120px_-64px_var(--shadow)] backdrop-blur transition-colors duration-300">
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
                This page shows real HeroUI v3 usage inside BlueBlog. Button, Card, Modal, Form,
                and TextField each have live demos, guidance, and code examples for acceptance review.
              </Card.Description>
            </div>
          </Card.Header>

          <Card.Content className="grid gap-6 py-6">
            <Card variant="transparent" className="border border-border/70 bg-background/90 transition-colors duration-300">
              <Card.Header className="gap-2">
                <Card.Title className="text-xl">Live component search</Card.Title>
                <Card.Description>
                  Type a keyword to filter component cards in real time and simulate a lightweight documentation search flow.
                </Card.Description>
              </Card.Header>
              <Card.Content className="grid gap-5">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
                  <TextField className="w-full" name="component-search">
                    <Label>Search component, category, or note</Label>
                    <Input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Try modal / validation / onPress"
                    />
                    <Description>Filtering is immediate here because the dataset is intentionally small.</Description>
                  </TextField>

                  <div className="rounded-2xl border border-border/65 bg-card/95 p-4 text-sm text-muted-foreground transition-colors duration-300">
                    <p className="font-medium text-foreground">Instant feedback</p>
                    <p className="mt-2">Keyword: {search || "none"}</p>
                    <p className="mt-1">Results: {filteredExamples.length} components</p>
                    <Button
                      variant="ghost"
                      className="mt-3 h-9 w-full rounded-full border border-border/70 transition-transform duration-200 hover:-translate-y-0.5"
                      onPress={() => setSearch("")}
                      isDisabled={search.length === 0}
                    >
                      Clear search
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredExamples.map((item) => (
                    <Card
                      key={item.id}
                      variant="transparent"
                      className="border border-border/65 bg-card/95 transition-all duration-200 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_18px_60px_-42px_var(--shadow)]"
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
                        <div className="rounded-2xl border border-border/60 bg-background/90 p-3 text-sm leading-6 text-muted-foreground transition-colors duration-300">
                          <p className="font-medium text-foreground">Usage note</p>
                          <p className="mt-1">{item.tip}</p>
                        </div>

                        <div className="rounded-2xl border border-border/60 bg-[oklch(from_var(--card)_calc(l-0.01)_c_h/0.92)] p-3 font-mono text-xs leading-6 text-foreground/90 transition-colors duration-300">
                          <p className="mb-2 font-sans text-sm font-medium text-foreground">Code sample</p>
                          <pre className="overflow-x-auto whitespace-pre-wrap">{item.snippet}</pre>
                        </div>
                      </Card.Content>
                    </Card>
                  ))}
                </div>

                {filteredExamples.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border/75 bg-background/90 px-5 py-8 text-center text-sm text-muted-foreground">
                    No matches found. Try a broader keyword.
                  </div>
                ) : null}
              </Card.Content>
            </Card>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.92fr)]">
              <Card variant="transparent" className="border border-border/70 bg-background/90 transition-colors duration-300">
                <Card.Header className="gap-2">
                  <Card.Title className="text-xl">Core interaction demos</Card.Title>
                  <Card.Description>
                    This section runs Button, Card, and Modal interactions together for a compact review pass.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="grid gap-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Button
                      variant="primary"
                      className="transition-transform duration-200 hover:-translate-y-0.5"
                      onPress={() => setStatusMessage("Primary action triggered successfully. Publish flow is now in preview state.")}
                    >
                      Primary action
                    </Button>
                    <Button
                      variant="secondary"
                      className="transition-transform duration-200 hover:-translate-y-0.5"
                      onPress={() => setStatusMessage("Secondary action triggered successfully. Comparison view is now active.")}
                    >
                      Secondary action
                    </Button>
                    <Button
                      variant="ghost"
                      className="transition-transform duration-200 hover:-translate-y-0.5"
                      onPress={() => setStatusMessage("Low-emphasis action triggered successfully. Lightweight feedback is now visible.")}
                    >
                      Ghost action
                    </Button>
                  </div>

                  <Card variant="transparent" className="border border-border/65 bg-card/95 transition-colors duration-300">
                    <Card.Header>
                      <Card.Title className="text-lg">Feedback panel</Card.Title>
                      <Card.Description>
                        Button actions and theme changes update this panel immediately so the page stays demonstrably interactive.
                      </Card.Description>
                    </Card.Header>
                    <Card.Content className="space-y-4 pt-0">
                      <div className="rounded-2xl border border-border/60 bg-background/90 p-4 text-sm leading-6 text-muted-foreground transition-colors duration-300">
                        {statusMessage}
                      </div>

                      <Modal>
                        <Modal.Trigger>
                          <Button
                            variant="outline"
                            className="rounded-full"
                            onPress={() => setModalMessage(`Current theme: ${theme}.\nLatest feedback: ${statusMessage}`)}
                          >
                            Open modal preview
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
                                  This modal uses the HeroUI v3 compound pattern: Trigger, Backdrop,
                                  Container, Dialog, Header, Body, and Footer are composed explicitly.
                                </p>
                                <div className="rounded-2xl border border-border/60 bg-background/90 p-4 whitespace-pre-wrap transition-colors duration-300">
                                  {modalMessage}
                                </div>
                              </Modal.Body>
                              <Modal.Footer className="border-t border-border/60 pt-4">
                                <Modal.CloseTrigger className="inline-flex min-h-10 items-center justify-center rounded-full border border-border px-4 text-sm font-medium text-foreground transition hover:bg-muted/70">
                                  Close
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

              <Card variant="transparent" className="border border-border/70 bg-background/90 transition-colors duration-300">
                <Card.Header className="gap-2">
                  <Card.Title className="text-xl">Reordering structure preview</Card.Title>
                  <Card.Description>
                    Start with native drag interactions and keep button fallbacks so the flow stays usable across device types.
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
                        setStatusMessage(`Reordered successfully: ${draggingId} moved around ${lane.title}.`);
                        setDraggingId(null);
                      }}
                      className={[
                        "flex flex-col gap-4 rounded-2xl border px-4 py-4 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between",
                        draggingId === lane.id
                          ? "border-accent/70 bg-accent/10 shadow-[0_16px_40px_-28px_var(--shadow)]"
                          : "border-border/65 bg-card/95",
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
                          Move up
                        </Button>
                        <Button
                          variant="ghost"
                          className="rounded-full px-3"
                          onPress={() => setLanes((current) => moveLane(current, lane.id, "down"))}
                          isDisabled={index === lanes.length - 1}
                        >
                          Move down
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
          <Card className="border border-border/70 bg-card shadow-[0_28px_90px_-60px_var(--shadow)] backdrop-blur transition-colors duration-300">
            <Card.Header className="gap-3 border-b border-border/60 pb-5">
              <Card.Title className="text-2xl font-semibold">Form + TextField Demo</Card.Title>
              <Card.Description className="leading-6">
                Use Form for submission and TextField for field structure and validation states.
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
                  <Label>Demo name</Label>
                  <Input placeholder="BlueBlog Phase 4 demo" />
                  <Description>Use at least 3 characters to trigger a valid name state.</Description>
                  <FieldError>{nameIsInvalid ? "Use at least 3 characters." : ""}</FieldError>
                </TextField>

                <TextField
                  className="w-full"
                  type="email"
                  name="demo-email"
                  isInvalid={emailIsInvalid}
                  value={email}
                  onChange={setEmail}
                >
                  <Label>Notification email</Label>
                  <Input placeholder="you@blueblog.dev" />
                  <Description>Enter a valid email address to review the error and success states.</Description>
                  <FieldError>{emailIsInvalid ? "Enter a valid email address." : ""}</FieldError>
                </TextField>

                <TextField className="w-full" name="demo-notes" isInvalid={notesLength > 0 && notesLength < 12}>
                  <Label>Demo notes</Label>
                  <TextArea
                    rows={5}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="List the interaction points this page should validate…"
                  />
                  <Description>Use at least 12 characters. Current count: {notesLength}.</Description>
                  <FieldError>{notesLength > 0 && notesLength < 12 ? "Add more detail to the notes field." : ""}</FieldError>
                </TextField>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button type="submit" variant="primary" className="transition-transform duration-200 hover:-translate-y-0.5">
                    Submit demo
                  </Button>
                  <Button
                    variant="secondary"
                    className="transition-transform duration-200 hover:-translate-y-0.5"
                    onPress={() => {
                      setFormName("HeroUI v3 Component Demo");
                      setEmail("team@blueblog.dev");
                      setNotes("Review theme compatibility, responsive layout, modal feedback, form validation, and reordering behavior.");
                      setStatusMessage("Sample content loaded. This state is ready for acceptance review.");
                    }}
                  >
                    Fill sample content
                  </Button>
                </div>
              </Form>
            </Card.Content>
            <Card.Footer className="border-t border-border/60 pt-5">
              <div className="w-full rounded-2xl border border-border/65 bg-background/90 p-4 text-sm leading-6 text-muted-foreground transition-colors duration-300">
                <p className="font-medium text-foreground">Submission result</p>
                <p className="mt-1">{submitSummary}</p>
              </div>
            </Card.Footer>
          </Card>

          <Card variant="transparent" className="border border-border/70 bg-card/95 transition-colors duration-300">
            <Card.Header className="gap-3">
              <Card.Title className="text-lg">Theme, responsive, and state checklist</Card.Title>
              <Card.Description>A compact checklist for theme, interaction, and responsive review.</Card.Description>
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
                <div key={item} className="rounded-2xl border border-border/65 bg-background/90 p-4 transition-colors duration-300">
                  {item}
                </div>
              ))}

              <div className="rounded-2xl border border-border/65 bg-background/90 p-4 transition-colors duration-300">
                <p className="font-medium text-foreground">Implementation notes</p>
                <ul className="mt-2 space-y-2 pl-5">
                  <li>HeroUI v3 compound patterns are used across Card, Modal, and TextField.</li>
                  <li>Interactive buttons consistently use onPress.</li>
                  <li>Layouts shift from single-column mobile to multi-column desktop without breaking hierarchy.</li>
                  <li>Motion stays subtle across card hover, button feedback, and theme transitions.</li>
                </ul>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </section>
  );
}
