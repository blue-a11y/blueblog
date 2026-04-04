"use client";

import { useEffect, useMemo, useState, type Key, type ReactElement, type SVGProps } from "react";
import { Dropdown } from "@heroui/react";
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
  Icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
}[] = [
  {
    key: "light",
    label: "Light",
    description: "Always use the light palette.",
    Icon: SunIcon,
  },
  {
    key: "dark",
    label: "Dark",
    description: "Always use the dark palette.",
    Icon: MoonIcon,
  },
  {
    key: "system",
    label: "System",
    description: "Follow the OS appearance.",
    Icon: MonitorIcon,
  },
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

  const activeTheme = useMemo(
    () => themeOptions.find((option) => option.key === themePreference) ?? themeOptions[2],
    [themePreference],
  );

  const triggerLabel = useMemo(() => {
    if (!mounted) return "Theme";
    return themePreference === "system" ? `Theme: System (${resolvedTheme})` : `Theme: ${activeTheme.label}`;
  }, [activeTheme.label, mounted, resolvedTheme, themePreference]);

  const TriggerIcon = themePreference === "system"
    ? resolvedTheme === "dark"
      ? MoonIcon
      : MonitorIcon
    : activeTheme.Icon;

  return (
    <Dropdown>
      <Dropdown.Trigger
        className="flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-white/8 text-foreground/68 transition-all duration-200 hover:border-border/70 hover:bg-white/14 hover:text-foreground dark:bg-white/6 dark:hover:bg-white/10"
        aria-label={triggerLabel}
      >
        <TriggerIcon className="h-4.5 w-4.5" />
      </Dropdown.Trigger>
      <Dropdown.Popover
        placement="bottom end"
        className="min-w-[14rem] rounded-2xl border border-border/60 bg-card/96 p-1 shadow-[0_18px_48px_-28px_var(--shadow)] backdrop-blur-xl"
      >
        <Dropdown.Menu aria-label="Theme preference" className="outline-none">
          {themeOptions.map((option) => {
            const selected = option.key === themePreference;
            const OptionIcon = option.Icon;

            return (
              <Dropdown.Item
                key={option.key}
                textValue={option.label}
                onAction={() => handleThemeChange(option.key)}
                className="rounded-2xl px-3 py-2.5 data-[hovered]:bg-white/12 dark:data-[hovered]:bg-white/8"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border border-border/55 bg-white/12 text-foreground/78 dark:bg-white/8">
                    <OptionIcon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3 text-sm font-medium text-foreground">
                      <span>{option.label}</span>
                      {selected ? <span className="text-xs text-accent">✓</span> : null}
                    </span>
                    <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                      {option.key === "system" && mounted
                        ? `${option.description} Currently ${resolvedTheme}.`
                        : option.description}
                    </span>
                  </span>
                </div>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
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
