import createMiddleware from "next-intl/middleware";
import { defaultLocale } from "@/lib/i18n-config";

export default createMiddleware({
  locales: ["en", "zh"],
  defaultLocale,
  localePrefix: "as-needed",
});

export const config = {
  matcher: [
    '/',
    '/(en|zh)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ],
};
