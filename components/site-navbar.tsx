"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button, Card } from "@heroui/react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/showcase", label: "Showcase" },
  { href: "/playground", label: "Playground" },
  { href: "/about", label: "About" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeLabel = useMemo(() => {
    return navigationItems.find((item) => item.href === pathname)?.label ?? "BlueBlog";
  }, [pathname]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3">
        <Card className="pointer-events-auto border border-border/75 bg-card/78 shadow-[0_24px_80px_-48px_var(--shadow)] backdrop-blur-xl">
          <Card.Content className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-3 rounded-full px-2 py-1 transition hover:bg-muted/70"
              onClick={() => setMenuOpen(false)}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background text-sm font-semibold tracking-[0.18em] text-foreground uppercase">
                BB
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-[0.18em] text-foreground uppercase">
                  BlueBlog
                </p>
                <p className="truncate text-xs text-muted-foreground">Now browsing · {activeLabel}</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "primary" : "ghost"}
                    className="rounded-full px-4"
                    onPress={() => router.push(item.href)}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-3 lg:hidden"
                onPress={() => setMenuOpen((current) => !current)}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
              >
                <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
                <span className="hidden sm:inline">Menu</span>
              </Button>
            </div>
          </Card.Content>
        </Card>

        {menuOpen ? (
          <Card className="pointer-events-auto border border-border/75 bg-card/86 shadow-[0_24px_80px_-48px_var(--shadow)] backdrop-blur-xl lg:hidden">
            <Card.Content className="grid gap-2 px-3 py-3">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "primary" : "secondary"}
                    className="justify-start rounded-2xl px-4"
                    onPress={() => {
                      setMenuOpen(false);
                      router.push(item.href);
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
              <div className="pt-1 sm:hidden">
                <ThemeToggle />
              </div>
            </Card.Content>
          </Card>
        ) : null}
      </div>
    </header>
  );
}
