"use client";

import { useEffect, useState, type Key, type ReactElement, type SVGProps } from "react";
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
  Icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
}[] = [
  {
    key: "light",
    label: "Light",
    Icon: SunIcon,
  },
  {
    key: "dark",
    label: "Dark",
    Icon: MoonIcon,
  },
  {
    key: "system",
    label: "System",
    Icon: MonitorIcon,
  },
];

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

  return (
    <Tabs
      aria-label="Theme preference"
      selectedKey={themePreference}
      onSelectionChange={handleThemeChange}
      className="shrink-0"
    >
      <Tabs.ListContainer className="shrink-0">
        <Tabs.List className="h-9 min-w-0 gap-0.5 rounded-full border border-border/60 bg-white/8 p-0.5 shadow-[0_10px_30px_-24px_var(--shadow)] backdrop-blur-md dark:bg-white/6">
          {themeOptions.map((option) => {
            const Icon = option.Icon;
            const ariaLabel = option.key === "system"
              ? `${option.label} theme (currently ${resolvedTheme})`
              : `${option.label} theme`;

            return (
              <Tabs.Tab
                id={option.key}
                key={option.key}
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

function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07 6.7 17.3M17.3 6.7l1.77-1.77" />
    </svg>
  );
}

function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

function MonitorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}
