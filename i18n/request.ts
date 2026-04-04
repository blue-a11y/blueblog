import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import type { Locale } from "@/lib/i18n-config";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) as Locale | undefined;

  const supportedLocales: Locale[] = ["en", "zh"];
  if (!locale || !supportedLocales.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
