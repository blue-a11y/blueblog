import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/lib/i18n-config";

export default createMiddleware({
  locales,
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
