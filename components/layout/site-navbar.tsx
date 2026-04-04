"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useTranslations } from "next-intl";
import { localeNames } from "@/lib/i18n-config";
import { useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n-config";

type NavLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
};

function NavLink({ href, label, isActive, onClick, variant = "desktop" }: NavLinkProps) {
  const baseClasses = variant === "desktop"
    ? "rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200"
    : "rounded-[1.15rem] border px-4 py-3 text-sm font-medium transition-all duration-200";

  const activeClasses = variant === "desktop"
    ? "border-border/80 bg-white/20 text-foreground shadow-[0_10px_30px_-24px_var(--shadow)] dark:bg-white/10"
    : "border-border/75 bg-white/20 text-foreground shadow-[0_12px_34px_-24px_var(--shadow)] dark:bg-white/10";

  const inactiveClasses = variant === "desktop"
    ? "border-transparent text-foreground/62 hover:border-border/70 hover:bg-white/12 hover:text-foreground dark:hover:bg-white/8"
    : "border-transparent text-foreground/70 hover:border-border/65 hover:bg-white/12 hover:text-foreground dark:hover:bg-white/8";

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {label}
    </Link>
  );
}

export function SiteNavbar() {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations();

  const isActive = (href: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(en|zh)/, "") || "/";
    return href === "/" ? pathWithoutLocale === "/" : pathWithoutLocale.startsWith(href);
  };

  const otherLocale = locale === "en" ? "zh" : "en";
  const otherLocaleLabel = localeNames[otherLocale];
  const currentPathWithoutLocale = pathname.replace(/^\/(en|zh)/, "") || "/";
  const switchLocaleHref = `/${otherLocale}${currentPathWithoutLocale}`;

  const navigationItems = [
    { href: "/", label: t("nav.home") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/playground", label: t("nav.lab") },
    { href: "/about", label: t("nav.about") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <nav className="relative mx-auto flex w-full max-w-2xl items-center justify-between overflow-hidden rounded-full border border-border/55 bg-background/18 px-3 py-2 shadow-[0_20px_60px_-34px_var(--shadow)] ring-1 ring-white/10 backdrop-blur-2xl transition-[background-color,border-color,box-shadow] duration-300 supports-[backdrop-filter]:bg-background/14">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/18 via-white/8 to-white/14 opacity-70 dark:from-white/10 dark:via-white/4 dark:to-white/8" />
          <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-border/55 to-transparent" />

          <Link
            href="/"
            className="relative mr-1 flex items-center gap-2 rounded-full border border-transparent px-2.5 py-1.5 transition-all duration-200 hover:border-border/70 hover:bg-white/10 dark:hover:bg-white/6"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border/65 bg-white/24 text-[0.7rem] font-bold tracking-[0.24em] text-foreground shadow-sm backdrop-blur-md dark:bg-white/10">
              B
            </span>
            <span className="hidden text-[11px] font-medium tracking-[0.22em] text-foreground/62 uppercase sm:inline">
              BlueBlog
            </span>
          </Link>

          <div className="relative hidden items-center gap-1 md:flex">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={isActive(item.href)}
              />
            ))}
          </div>

          <div className="relative flex items-center gap-1.5">
            <ThemeToggle />
            <Link href={switchLocaleHref}>
              <Button
                variant="ghost"
                className="h-9 rounded-full border border-transparent bg-white/8 px-3 text-xs font-medium text-foreground/62 transition-all duration-200 hover:border-border/70 hover:bg-white/14 hover:text-foreground dark:bg-white/6 dark:hover:bg-white/10"
              >
                {otherLocaleLabel}
              </Button>
            </Link>
            <Button
              isIconOnly
              variant="ghost"
              onPress={() => setMenuOpen((v) => !v)}
              className="h-9 w-9 rounded-full border border-transparent bg-white/8 text-foreground/62 transition-all duration-200 hover:border-border/70 hover:bg-white/14 hover:text-foreground dark:bg-white/6 dark:hover:bg-white/10 md:hidden"
              aria-label={menuOpen ? t("common.closeMenu") : t("common.openMenu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-site-menu"
            >
              <span className="text-sm leading-none">{menuOpen ? "✕" : "☰"}</span>
            </Button>
          </div>
        </nav>
      </div>

      {menuOpen && (
        <div
          id="mobile-site-menu"
          className="relative mx-auto mt-2 w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-[1.5rem] border border-border/55 bg-background/18 p-3 shadow-[0_24px_72px_-36px_var(--shadow)] ring-1 ring-white/10 backdrop-blur-2xl transition-[background-color,border-color,box-shadow] duration-300 supports-[backdrop-filter]:bg-background/14 md:hidden"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/18 via-white/8 to-white/14 opacity-70 dark:from-white/10 dark:via-white/4 dark:to-white/8" />

          <div className="relative mb-2 flex items-center justify-between rounded-[1.15rem] border border-border/45 bg-white/10 px-4 py-3 dark:bg-white/6">
            <div>
              <p className="text-[0.65rem] font-semibold tracking-[0.28em] text-foreground/52 uppercase">
                Navigation
              </p>
              <p className="mt-1 text-sm text-foreground/72">
                Minimal, quiet, and finally not muddy.
              </p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/55 bg-white/16 text-xs font-semibold tracking-[0.2em] text-foreground/78 dark:bg-white/10">
              BB
            </span>
          </div>

          <div className="relative flex flex-col gap-1.5">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={isActive(item.href)}
                onClick={() => setMenuOpen(false)}
                variant="mobile"
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
