"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Card, Chip, Input } from "@heroui/react";

type ThemeMode = "light" | "dark";
const THEME_KEY = "blueblog-theme";

type DemoCard = {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
};

const demoCards: DemoCard[] = [
  { id: "hero-shell", name: "Hero Shell", category: "Layout", description: "Homepage hero card structure — hierarchy, spacing, and shadows.", tags: ["hero", "layout"] },
  { id: "post-card", name: "Post Card", category: "Content", description: "Blog list card — title, excerpt, and meta readability.", tags: ["blog", "content"] },
  { id: "theme-switch", name: "Theme Switch", category: "Interaction", description: "Theme toggle — light/dark color consistency check.", tags: ["theme", "dark"] },
  { id: "metric-panel", name: "Metric Panel", category: "Dashboard", description: "Data overview — numbers, labels, and supporting text.", tags: ["stats", "dashboard"] },
  { id: "cta-stack", name: "CTA Stack", category: "Action", description: "Button group — primary/secondary action clarity.", tags: ["cta", "button"] },
  { id: "notes-drawer", name: "Notes Drawer", category: "Utility", description: "Sidebar notes — secondary content layer on dark/light.", tags: ["drawer", "utility"] },
];

function applyTheme(theme: ThemeMode) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(THEME_KEY, theme);
}

export function InteractiveLab() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);
  const [cards, setCards] = useState(demoCards);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 280);
    return () => window.clearTimeout(t);
  }, [search]);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    const resolved: ThemeMode = stored === "dark" ? "dark" : "light";
    applyTheme(resolved);
    setTheme(resolved);
    setMounted(true);
  }, []);

  const filteredCards = useMemo(() => {
    if (!debouncedSearch) return cards;
    return cards.filter((c) =>
      [c.name, c.category, c.description, ...c.tags].join(" ").toLowerCase().includes(debouncedSearch),
    );
  }, [cards, debouncedSearch]);

  const moveItem = (items: DemoCard[], id: string, dir: "up" | "down") => {
    const i = items.findIndex((x) => x.id === id);
    if (i < 0) return items;
    const j = dir === "up" ? i - 1 : i + 1;
    if (j < 0 || j >= items.length) return items;
    const next = [...items];
    const [moved] = next.splice(i, 1);
    next.splice(j, 0, moved);
    return next;
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl px-6 py-20 sm:px-10">
      <div className="w-full space-y-12">
        <div className="space-y-4 fade-in">
          <div className="flex flex-wrap items-center gap-2">
            <Chip variant="soft">Playground</Chip>
            <Chip variant="secondary">HeroUI v3</Chip>
          </div>
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-foreground sm:text-5xl">
            Interactive Lab
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            Live demos for search, debounce, theme switching, and drag-to-reorder — all running client-side.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,1fr)]">
          {/* Search & Cards */}
          <div className="space-y-6 fade-in fade-in-delay-1">
            <div className="space-y-3">
              <label htmlFor="lab-search" className="text-sm font-medium text-foreground">
                Search components
              </label>
              <div className="flex gap-3">
                <Input
                  id="lab-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="theme, card, dashboard…"
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  className="rounded-full px-4"
                  onPress={() => setSearch("")}
                  isDisabled={!search}
                >
                  Clear
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Debounced 280ms · {filteredCards.length} result{filteredCards.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {filteredCards.map((card) => (
                <Card
                  key={card.id}
                  className="border border-border/60 bg-card/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-border"
                >
                  <Card.Content className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-foreground">{card.name}</p>
                        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{card.category}</p>
                      </div>
                      <Chip variant="soft" className="text-xs">{card.tags[0]}</Chip>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                  </Card.Content>
                </Card>
              ))}
            </div>

            {filteredCards.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">No matches found.</p>
            )}
          </div>

          {/* Sidebar: Theme + Drag */}
          <div className="space-y-6 fade-in fade-in-delay-2">
            {/* Theme Toggle */}
            <Card className="border border-border/60 bg-card/70">
              <Card.Content className="p-5 space-y-4">
                <p className="text-sm font-medium text-foreground">Theme</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={theme === "light" ? "primary" : "outline"}
                    className="rounded-full"
                    onPress={() => { applyTheme("light"); setTheme("light"); }}
                  >
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "primary" : "outline"}
                    className="rounded-full"
                    onPress={() => { applyTheme("dark"); setTheme("dark"); }}
                  >
                    Dark
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {mounted ? `${theme === "dark" ? "Dark" : "Light"} mode active` : "Loading…"}
                </p>
              </Card.Content>
            </Card>

            {/* Drag reorder */}
            <Card className="border border-border/60 bg-card/70">
              <Card.Content className="p-5 space-y-3">
                <p className="text-sm font-medium text-foreground">Drag to reorder</p>
                {cards.map((card, i) => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={() => setDraggingId(card.id)}
                    onDragEnd={() => setDraggingId(null)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (!draggingId || draggingId === card.id) return;
                      const ci = cards.findIndex((c) => c.id === draggingId);
                      const ni = cards.findIndex((c) => c.id === card.id);
                      const next = [...cards];
                      const [moved] = next.splice(ci, 1);
                      next.splice(ni, 0, moved);
                      setCards(next);
                      setDraggingId(null);
                    }}
                    className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                      draggingId === card.id
                        ? "border-accent/50 bg-accent/5"
                        : "border-border/50 bg-muted/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-5">{i + 1}</span>
                      <span className="font-medium text-foreground">{card.name}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="px-2 text-xs" isDisabled={i === 0} onPress={() => setCards((c) => moveItem(c, card.id, "up"))}>↑</Button>
                      <Button variant="ghost" size="sm" className="px-2 text-xs" isDisabled={i === cards.length - 1} onPress={() => setCards((c) => moveItem(c, card.id, "down"))}>↓</Button>
                    </div>
                  </div>
                ))}
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
