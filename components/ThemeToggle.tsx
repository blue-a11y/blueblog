"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";

type Theme = "light" | "dark";

const STORAGE_KEY = "blueblog-theme";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    const resolvedTheme: Theme = storedTheme === "dark" ? "dark" : "light";

    applyTheme(resolvedTheme);
    setTheme(resolvedTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full border border-border bg-card/80 px-4 text-sm text-foreground shadow-sm backdrop-blur transition hover:bg-muted"
      onPress={toggleTheme}
      aria-label={mounted ? `切换到${theme === "light" ? "深色" : "浅色"}主题` : "切换主题"}
    >
      <span aria-hidden="true" className="text-base leading-none">
        {mounted ? (theme === "light" ? "🌙" : "☀️") : "◐"}
      </span>
      <span>{mounted ? (theme === "light" ? "深色模式" : "浅色模式") : "主题切换"}</span>
    </Button>
  );
}
