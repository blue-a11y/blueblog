import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { getOgImageUrl, siteConfig } from "@/lib/site";
import { getThemeScript } from "@/lib/theme";
import { NextIntlClientProvider } from "next-intl";
import { locales } from "@/lib/i18n-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeScript = getThemeScript();

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | BlueBlog",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  category: "technology",
  keywords: siteConfig.keywords,
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": siteConfig.feedPath,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: getOgImageUrl(),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} open graph image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [getOgImageUrl()],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-theme="light"
      data-theme-preference="system"
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="relative min-h-screen">
            <SiteNavbar />
            <div className="pt-20">{children}</div>
          </div>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
