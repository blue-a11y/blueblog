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
import { MonitorIcon, MoonIcon, SunIcon } from "@/components/common/ThemeIcons";

export function ThemeToggle() {
  const [selectedKey, setSelectedKey] = useState<string>(DEFAULT_THEME_PREFERENCE);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncThemeState = (preference: ThemePreference) => {
      const resolved = applyThemePreference(preference);
      setSelectedKey(preference === "system" ? "system" : resolved);
    };

    syncThemeState(getStoredThemePreference(window.localStorage));

    const handleSystemThemeChange = () => {
      const currentPreference = getStoredThemePreference(window.localStorage);
      if (currentPreference === "system") {
        syncThemeState("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const handleThemeChange = (key: Key | null) => {
    if (!key) return;
    const nextPreference = key.toString() as ThemePreference;
    window.localStorage.setItem(THEME_STORAGE_KEY, nextPreference);
    setSelectedKey(nextPreference);
    applyThemePreference(nextPreference);
  };

  return (
    <Tabs
      aria-label="Theme preference"
      selectedKey={selectedKey}
      onSelectionChange={handleThemeChange}
      className="shrink-0"
    >
      <Tabs.ListContainer className="shrink-0">
        <Tabs.List className="*:data-[selected=true]:text-foreground *:h-7 *:w-7 *:min-w-0 *:px-0 h-9 gap-1 rounded-full bg-zinc-100 p-1 dark:bg-zinc-900">
          <Tabs.Tab key="light" aria-label="Use light theme">
            <SunIcon className="h-4 w-4" />
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab key="dark" aria-label="Use dark theme">
            <MoonIcon className="h-4 w-4" />
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab key="system" aria-label="Follow system theme">
            <MonitorIcon className="h-4 w-4" />
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
