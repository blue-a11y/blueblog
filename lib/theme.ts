export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "blueblog-theme";
export const DEFAULT_THEME_PREFERENCE: ThemePreference = "system";

export function isThemePreference(value: string | null): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

export function getStoredThemePreference(storage: Pick<Storage, "getItem">): ThemePreference {
  const stored = storage.getItem(THEME_STORAGE_KEY);
  return isThemePreference(stored) ? stored : DEFAULT_THEME_PREFERENCE;
}

export function resolveTheme(preference: ThemePreference, prefersDark: boolean): ResolvedTheme {
  if (preference === "system") {
    return prefersDark ? "dark" : "light";
  }

  return preference;
}

export function applyThemePreference(preference: ThemePreference) {
  const resolvedTheme = resolveTheme(
    preference,
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  document.documentElement.setAttribute("data-theme", resolvedTheme);
  document.documentElement.setAttribute("data-theme-preference", preference);
  document.documentElement.style.colorScheme = resolvedTheme;

  return resolvedTheme;
}

export function getThemeScript() {
  return `(() => {
  const STORAGE_KEY = "${THEME_STORAGE_KEY}";
  const DEFAULT_THEME = "${DEFAULT_THEME_PREFERENCE}";
  const isThemePreference = (value) => value === "light" || value === "dark" || value === "system";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  const preference = isThemePreference(stored) ? stored : DEFAULT_THEME;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = preference === "system" ? (prefersDark ? "dark" : "light") : preference;
  document.documentElement.setAttribute("data-theme", resolved);
  document.documentElement.setAttribute("data-theme-preference", preference);
  document.documentElement.style.colorScheme = resolved;
})();`;
}
