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

    const handleSystemThemeChange = () => {
      const currentPreference = getStoredThemePreference(window.localStorage);
      if (currentPreference === "system") {
        applyThemePreference("system");
      }
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
        <Tabs.List className="*:data-[selected=true]:text-foreground *:h-7 *:w-7 *:min-w-0 *:px-0 h-9 gap-1 rounded-full bg-zinc-100 p-1 dark:bg-zinc-900">
          <Tabs.Tab key="light">
            <SunIcon className="h-4 w-4" />
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab key="dark">
            <MoonIcon className="h-4 w-4" />
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
