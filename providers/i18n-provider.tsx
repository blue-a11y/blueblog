"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import en from "@/messages/en.json";
import zh from "@/messages/zh.json";

type Locale = "en" | "zh";
type Messages = typeof en;

const messagesMap: Record<Locale, Messages> = { en, zh };

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}>({
  locale: "en",
  setLocale: () => {},
  t: () => "",
});

export function I18nProvider({ children, initialLocale = "en" }: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const saved = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1];
    if (saved === "en" || saved === "zh") {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    document.cookie = `locale=${locale}; path=/; max-age=31536000`;
  }, [locale]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = messagesMap[locale];
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === "string" ? value : key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
