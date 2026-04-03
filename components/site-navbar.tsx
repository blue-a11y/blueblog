"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/playground", label: "Lab" },
  { href: "/about", label: "About" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <nav className="mx-auto flex w-full max-w-2xl items-center justify-between rounded-full border border-border/70 bg-card/82 px-4 py-2 shadow-[0_18px_48px_-30px_var(--shadow)] backdrop-blur-xl transition-colors">
          <Link
            href="/"
            className="mr-1 flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors hover:bg-foreground/5 dark:hover:bg-foreground/10"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-sm font-bold tracking-wide text-foreground">
              B
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navigationItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                    active
                      ? "border-border bg-muted/70 text-foreground"
                      : "border-transparent text-foreground/66 hover:border-border/80 hover:bg-card/88 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-site-menu"
            >
              <span className="text-sm leading-none">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </nav>
      </div>

      {menuOpen && (
        <div
          id="mobile-site-menu"
          className="mx-auto mt-2 w-[calc(100%-2rem)] max-w-2xl rounded-2xl border border-border/70 bg-card/88 p-3 shadow-[0_22px_56px_-34px_var(--shadow)] backdrop-blur-xl transition-colors md:hidden"
        >
          <div className="flex flex-col gap-1.5">
            {navigationItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "border-border bg-muted/80 text-foreground"
                      : "border-transparent text-foreground/70 hover:border-border/75 hover:bg-card/92 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
