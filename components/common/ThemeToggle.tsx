"use client";

import { useEffect, useState, type Key } from "react";
import { Tabs } from "@heroui/react";
import {
  applyThemePreference,
  DEFAULT_THEME_PREFERENCE,
  getStoredThemePreference,
  THEME_STORAGE_KEY,
  type ThemePreference,
} from "@/lib/theme";
import { SunIcon, MoonIcon } from "@/components/common/ThemeIcons";

export function ThemeToggle() {
  const [themePreference, setThemePreference] = useState<ThemePreference>(DEFAULT_THEME_PREFERENCE);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const initialPreference = getStoredThemePreference(window.localStorage);
    applyThemePreference(initialPreference);

    setThemePreference(initialPreference);

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      const nextPreference = getStoredThemePreference(window.localStorage);
      if (nextPreference !== "system") return;

      const nextResolvedTheme = nextPreference === "system" 
        ? (event.matches ? "dark" : "light") 
        : nextPreference;
      document.documentElement.setAttribute("data-theme", nextResolvedTheme);
      document.documentElement.setAttribute("data-theme-preference", "system");
      document.documentElement.style.colorScheme = nextResolvedTheme;
      setThemePreference("system");
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const handleThemeChange = (key: Key | null) => {
    if (!key) return;
    const nextPreference = key as ThemePreference;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextPreference);
    applyThemePreference(nextPreference);
    setThemePreference(nextPreference);
  };

  return (
    <Tabs
      aria-label="Theme preference"
      selectedKey={themePreference === "system" ? "light" : themePreference}
      onSelectionChange={handleThemeChange}
      className="shrink-0"
    >
      <Tabs.ListContainer className="shrink-0">
        <Tabs.List className="gap-1 rounded-full bg-zinc-100 p-1 dark:bg-zinc-900">
          <Tabs.Tab key="light" className="rounded-full px-3 data-[selected=true]:bg-white data-[selected=true]:text-zinc-900 data-[selected=true]:shadow-sm dark:data-[selected=true]:bg-zinc-800 dark:data-[selected=true]:text-zinc-100">
            <SunIcon className="h-4 w-4" />
            <Tabs.Indicator className="inset-0 rounded-full bg-white dark:bg-zinc-800" />
          </Tabs.Tab>
          <Tabs.Tab key="dark" className="rounded-full px-3 data-[selected=true]:bg-white data-[selected=true]:text-zinc-900 data-[selected=true]:shadow-sm dark:data-[selected=true]:bg-zinc-800 dark:data-[selected=true]:text-zinc-100">
            <MoonIcon className="h-4 w-4" />
            <Tabs.Indicator className="inset-0 rounded-full bg-white dark:bg-zinc-800" />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
