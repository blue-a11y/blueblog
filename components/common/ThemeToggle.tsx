"use client";

import { useEffect, useState, type Key } from "react";
import { Tabs } from "@heroui/react";
import {
  applyThemePreference,
  DEFAULT_THEME_PREFERENCE,
  getStoredThemePreference,
  resolveTheme,
  THEME_STORAGE_KEY,
  themeOptions,
  type ResolvedTheme,
  type ThemePreference,
} from "@/lib/theme";
import { SunIcon, MoonIcon, MonitorIcon } from "@/components/common/ThemeIcons";

export function ThemeToggle() {
  const [themePreference, setThemePreference] = useState<ThemePreference>(DEFAULT_THEME_PREFERENCE);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const initialPreference = getStoredThemePreference(window.localStorage);
    const initialResolvedTheme = applyThemePreference(initialPreference);

    setThemePreference(initialPreference);
    setResolvedTheme(initialResolvedTheme);

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

  const handleThemeChange = (key: Key | null) => {
    if (!key) return;

    const nextPreference = key as ThemePreference;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextPreference);
    const nextResolvedTheme = applyThemePreference(nextPreference);
    setThemePreference(nextPreference);
    setResolvedTheme(nextResolvedTheme);
  };

  const iconMap = {
    light: SunIcon,
    dark: MoonIcon,
    system: MonitorIcon,
  };

  return (
    <Tabs
      aria-label="Theme preference"
      selectedKey={themePreference}
      onSelectionChange={handleThemeChange}
      className="shrink-0"
    >
      <Tabs.ListContainer className="shrink-0">
        <Tabs.List className="h-9 min-w-0 gap-0.5 rounded-full border border-border/60 bg-white/8 p-0.5 shadow-[0_10px_30px_-24px_var(--shadow)] backdrop-blur-md dark:bg-white/6">
          {themeOptions.map((key) => {
            const Icon = iconMap[key];
            const ariaLabel = key === "system"
              ? `System theme (currently ${resolvedTheme})`
              : `${key} theme`;

            return (
              <Tabs.Tab
                id={key}
                key={key}
                aria-label={ariaLabel}
                className="h-7 min-w-0 rounded-full border border-transparent px-0 text-foreground/68 transition-colors data-[hovered]:text-foreground data-[selected=true]:border-border/70 data-[selected=true]:bg-white/18 data-[selected=true]:text-foreground dark:data-[selected=true]:bg-white/10"
              >
                <span className="flex h-7 w-7 items-center justify-center">
                  <Icon className="h-4 w-4" />
                </span>
              </Tabs.Tab>
            );
          })}
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
