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
      {/* Capsule container */}
      <div className="mx-auto max-w-2xl">
        <nav className="flex items-center justify-between rounded-full border border-white/20 bg-white/60 px-4 py-2 shadow-lg shadow-black/5 backdrop-blur-2xl transition-colors dark:border-white/10 dark:bg-black/40 dark:shadow-black/20">
          {/* Logo */}
          <Link
            href="/"
            className="mr-1 flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-sm font-bold tracking-wide text-foreground">
              B
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {navigationItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                    active
                      ? "border-accent/20 bg-accent/10 text-foreground shadow-[0_10px_30px_-22px_var(--shadow)] dark:border-accent/25 dark:bg-accent/12"
                      : "border-transparent text-foreground/66 hover:border-border/80 hover:bg-card/75 hover:text-foreground"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                        active ? "bg-accent opacity-100" : "bg-foreground/18 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right side */}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-site-menu"
          className="mx-auto mt-2 max-w-2xl rounded-2xl border border-white/20 bg-white/70 p-3 shadow-lg shadow-black/5 backdrop-blur-2xl transition-colors dark:border-white/10 dark:bg-black/50 dark:shadow-black/20 md:hidden"
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
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "border-accent/22 bg-accent/10 text-foreground shadow-[0_16px_40px_-30px_var(--shadow)] dark:border-accent/28 dark:bg-accent/12"
                      : "border-transparent text-foreground/70 hover:border-border/70 hover:bg-card/75 hover:text-foreground"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`inline-flex h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                      active ? "bg-accent shadow-[0_0_0_4px_oklch(from_var(--accent)_l_c_h/0.12)]" : "bg-transparent"
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
