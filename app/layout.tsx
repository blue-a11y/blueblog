import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteNavbar } from "@/components/site-navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeScript = `
(() => {
  const storedTheme = window.localStorage.getItem("blueblog-theme");
  const theme = storedTheme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
})();
`;

export const metadata: Metadata = {
  title: "BlueBlog",
  description: "BlueBlog built with Next.js 15, HeroUI v3, and Tailwind CSS v4.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-theme="light"
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <div className="relative min-h-screen">
          <SiteNavbar />
          {children}
        </div>
      </body>
    </html>
  );
}
