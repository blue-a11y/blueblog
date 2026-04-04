"use client";

import { useEffect, useMemo, useState, type Key } from "react";
import { Tabs } from "@heroui/react";
import {
  applyThemePreference,
  DEFAULT_THEME_PREFERENCE,
  getStoredThemePreference,
  resolveTheme,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemePreference,
} from "@/lib/theme";

const themeOptions: {
  key: ThemePreference;
  label: string;
  description: string;
  icon: string;
}[] = [
  { key: "light", label: "Light", description: "Always use the light palette.", icon: "☀️" },
  { key: "dark", label: "Dark", description: "Always use the dark palette.", icon: "🌙" },
  { key: "system", label: "System", description: "Follow the OS appearance.", icon: "🖥️" },
];

export function ThemeToggle() {
  const [themePreference, setThemePreference] = useState<ThemePreference>(DEFAULT_THEME_PREFERENCE);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const initialPreference = getStoredThemePreference(window.localStorage);
    const initialResolvedTheme = applyThemePreference(initialPreference);

    setThemePreference(initialPreference);
    setResolvedTheme(initialResolvedTheme);
    setMounted(true);

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const nextPreference = getStoredThemePreference(window.localStorage);
      if (nextPreference !== "system") return;

      const nextResolvedTheme = resolveTheme("system", event.matches);
      document.documentElement.setAttribute("data-theme", nextResolvedTheme);
      document.documentElement.setAttribute("data-theme-preference", "system");
      document.documentElement.style.colorScheme = nextResolvedTheme;
      setResolvedTheme(nextResolvedTheme);
      setThemePreference("system");
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const handleThemeChange = (key: Key) => {
    const nextPreference = key as ThemePreference;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextPreference);
    const nextResolvedTheme = applyThemePreference(nextPreference);
    setThemePreference(nextPreference);
    setResolvedTheme(nextResolvedTheme);
  };

  const activeThemeLabel = useMemo(() => {
    if (!mounted) return "Theme";
    return themePreference === "system" ? `System · ${resolvedTheme}` : themePreference;
  }, [mounted, resolvedTheme, themePreference]);

  return (
    <div className="flex flex-col gap-2">
      <Tabs
        aria-label="Theme preference"
        selectedKey={themePreference}
        onSelectionChange={handleThemeChange}
        variant="secondary"
        className="w-full"
      >
        <Tabs.List className="gap-1 rounded-full border border-border/60 bg-card/92 p-1 shadow-sm backdrop-blur-md">
          {themeOptions.map((option) => (
            <Tabs.Tab
              key={option.key}
              id={option.key}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-foreground/78 transition-colors"
            >
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true">{option.icon}</span>
                <span>{option.label}</span>
              </span>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <p className="px-1 text-[11px] text-muted-foreground">
        {mounted
          ? `Theme: ${activeThemeLabel}. ${themeOptions.find((option) => option.key === themePreference)?.description}`
          : "Loading theme preference…"}
      </p>
    </div>
  );
}
