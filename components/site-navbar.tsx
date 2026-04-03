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
  { href: "/playground", label: "Lab" },
  { href: "/about", label: "About" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeLabel = useMemo(() => {
    if (pathname === "/") return "Home";
    return navigationItems.find((item) => item.href === pathname)?.label ?? "BlueBlog";
  }, [pathname]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3">
        <Card className="pointer-events-auto border border-border/60 bg-card/80 shadow-[0_8px_32px_-12px_var(--shadow)] backdrop-blur-2xl">
          <Card.Content className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-4">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-3 rounded-full px-2 py-1 transition-colors hover:bg-muted/60"
              onClick={() => setMenuOpen(false)}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold tracking-wide text-accent-foreground">
                B
              </div>
              <div className="min-w-0 hidden sm:block">
                <p className="truncate text-sm font-semibold tracking-wide text-foreground">
                  BlueBlog
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "primary" : "ghost"}
                    className="rounded-full px-3.5 text-sm"
                    onPress={() => router.push(item.href)}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full px-2.5 md:hidden"
                onPress={() => setMenuOpen((current) => !current)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <span aria-hidden="true" className="text-lg leading-none">{menuOpen ? "✕" : "☰"}</span>
              </Button>
            </div>
          </Card.Content>
        </Card>

        {menuOpen && (
          <Card className="pointer-events-auto border border-border/60 bg-card/90 shadow-[0_8px_32px_-12px_var(--shadow)] backdrop-blur-2xl md:hidden">
            <Card.Content className="grid gap-1 px-3 py-3">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "primary" : "secondary"}
                    className="justify-start rounded-xl px-4"
                    onPress={() => {
                      setMenuOpen(false);
                      router.push(item.href);
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Card.Content>
          </Card>
        )}
      </div>
    </header>
  );
}
