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
    summary: "Use compound structure for clear grouping, clean hierarchy, and readable layouts.",
    status: "Ready",
  },
  {
    name: "Button",
    category: "Action",
    summary: "Semantic variants with onPress make action priority and feedback feel consistent.",
    status: "Interactive",
  },
  {
    name: "TextField",
    category: "Forms",
    summary: "Label, Description, and FieldError provide accessible form structure out of the box.",
    status: "Interactive",
  },
  {
    name: "ProgressBar",
    category: "Feedback",
    summary: "Useful for upload progress, completion checks, and process visibility.",
    status: "Preview",
  },
];

const quickActions = [
  { label: "Review card hierarchy", variant: "primary" as const },
  { label: "Inspect form states", variant: "secondary" as const },
  { label: "Check theme coverage", variant: "outline" as const },
];

export function ShowcaseStudio() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);
  const [activeAction, setActiveAction] = useState<string>(quickActions[0].label);
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState(
    "Reviewing the HeroUI v3 showcase for hierarchy, theme coverage, and interaction quality.",
  );

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

    if (keyword.includes("theme")) {
      return spotlightComponents.filter((item) => item.category !== "Action");
    }

    if (keyword.includes("form")) {
      return spotlightComponents.filter(
        (item) => item.category === "Forms" || item.category === "Feedback",
      );
    }

    return spotlightComponents;
  }, [activeAction]);

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 pb-20 pt-32 sm:px-10 lg:px-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start">
        <Card className="border border-border/70 bg-card shadow-[0_32px_120px_-64px_var(--shadow)] backdrop-blur transition-colors duration-300">
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
                This page demonstrates how HeroUI v3 lands inside BlueBlog with production-style cards,
                button interactions, TextField patterns, responsive structure, and live theme previews.
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

              <Card variant="transparent" className="border border-border/70 bg-background/90">
                <Card.Header>
                  <Card.Title className="text-lg">Component spotlight</Card.Title>
                  <Card.Description>
                    Current focus: {activeAction}. Each action filters the list so the page behaves like a real
                    review surface, not a static mock.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="grid gap-3 sm:grid-cols-2">
                  {filteredSpots.map((item) => (
                    <article
                      key={item.name}
                      className="rounded-2xl border border-border/65 bg-card/95 p-4 transition-colors hover:border-accent/40"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.name}</p>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                        <Chip
                          variant={
                            item.status === "Interactive"
                              ? "primary"
                              : item.status === "Preview"
                                ? "soft"
                                : "secondary"
                          }
                        >
                          {item.status}
                        </Chip>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">{item.summary}</p>
                    </article>
                  ))}
                </Card.Content>
              </Card>
            </div>

            <Card variant="transparent" className="border border-border/70 bg-background/95">
              <Card.Header>
                <Card.Title className="text-lg">Theme preview check</Card.Title>
                <Card.Description>
                  Switch the active theme to review semantic color usage, readability, and component balance in
                  both modes.
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
                  <p className="text-sm font-medium text-foreground">Review note</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {theme === "dark"
                      ? "In dark mode, review borders, shadows, and muted copy to make sure the hierarchy stays readable."
                      : "In light mode, review elevation and button contrast so the layout stays crisp and intentional."}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showcase completion</span>
                    <span>{completion}%</span>
                  </div>
                  <ProgressBar aria-label="Showcase completion" value={completion} />
                </div>
              </Card.Content>
            </Card>
          </Card.Content>
        </Card>

        <Card className="border border-border/70 bg-card shadow-[0_28px_90px_-60px_var(--shadow)] backdrop-blur transition-colors duration-300">
          <Card.Header className="border-b border-border/60 pb-5">
            <Card.Title className="text-2xl font-semibold">Interactive form demo</Card.Title>
            <Card.Description className="leading-6">
              Use the TextField compound pattern to validate form structure, helper text, and lightweight feedback in one place.
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
              <Label>Notification email</Label>
              <Input placeholder="you@blueblog.dev" />
              <Description>Enter a valid email address to review helper text and error handling.</Description>
              <FieldError>{emailIsInvalid ? "Enter an email address with @." : ""}</FieldError>
            </TextField>

            <TextField className="w-full" name="showcase-notes">
              <Label>Showcase notes</Label>
              <TextArea
                rows={5}
                placeholder="Summarize what this showcase should validate…"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
              <Description>Characters: {notes.trim().length} / 200</Description>
            </TextField>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                variant="primary"
                onPress={() =>
                  setNotes(
                    "HeroUI v3 showcase ready for review across structure, interaction, and theme states.",
                  )
                }
              >
                Fill sample notes
              </Button>
              <Button variant="ghost" onPress={() => setNotes("")}>Clear notes</Button>
            </div>
          </Card.Content>
          <Card.Footer className="border-t border-border/60 pt-5">
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Current action</p>
                <p className="text-sm text-muted-foreground">{activeAction}</p>
              </div>
              <Button variant="secondary" onPress={() => setActiveAction("Check theme coverage")}>Sync panel state</Button>
            </div>
          </Card.Footer>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "No provider",
            detail: "HeroUI v3 works without an application provider in this setup.",
          },
          {
            title: "Compound pattern",
            detail: "Card.Header, Card.Content, TextField, Label, and Input follow the v3 compound pattern.",
          },
          {
            title: "Responsive layout",
            detail: "Single-column mobile and two-column desktop layouts keep spacing and hierarchy aligned.",
          },
        ].map((item) => (
          <Card key={item.title} variant="transparent" className="border border-border/70 bg-card/76 transition-colors duration-300">
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
