"use client";

import Link from "next/link";
import { Button, Chip } from "@heroui/react";
import { siteConfig } from "@/lib/site";
import { useTranslations } from "next-intl";

const socialLinks = [
  { name: "Email", href: `mailto:${siteConfig.email}`, icon: <MailIcon /> },
  { name: "GitHub", href: siteConfig.github, icon: <GitHubIcon /> },
];

export function HomeHero() {
  const t = useTranslations();

  return (
    <main className="relative isolate overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />

      <section className="mx-auto flex min-h-[92vh] w-full max-w-3xl items-center px-6 sm:px-10">
        <div className="flex w-full flex-col gap-10">
          <div className="space-y-8">
            <div className="fade-in space-y-6">
              <Chip variant="secondary" className="w-fit rounded-full border border-border/60 bg-card/90 px-3.5 py-1.5 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase backdrop-blur-sm">
                {t("home.role")}
              </Chip>

              <h1 className="text-5xl font-bold tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl leading-[1.1]">
                {t("home.greeting")}{" "}
                <span className="bg-gradient-to-r from-accent to-[oklch(from_var(--accent)_calc(l+0.08)_calc(c*0.8)_calc(h-15))] bg-clip-text text-transparent">
                  {siteConfig.personName}
                </span>
                .
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {t("home.description")}
              </p>
            </div>

            <div className="fade-in fade-in-delay-2 flex flex-wrap items-center gap-3">
              <Link href="/blog">
                <Button
                  variant="secondary"
                  className="min-h-12 rounded-full border border-accent/18 bg-accent/12 px-7 text-sm font-medium text-accent shadow-[0_18px_40px_-24px_oklch(from_var(--accent)_l_c_h/0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/28 hover:bg-accent/16"
                >
                  {t("home.readBlog")}
                </Button>
              </Link>
              <a href={`mailto:${siteConfig.email}`}>
                <Button
                  variant="outline"
                  className="min-h-12 rounded-full border border-border/60 bg-card/90 px-7 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-border hover:bg-muted/70"
                >
                  {t("home.email")}
                </Button>
              </a>
            </div>
          </div>

          <div className="fade-in fade-in-delay-3 flex items-center gap-4 border-t border-border/50 pt-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <Button
                  isIconOnly
                  variant="ghost"
                  aria-label={link.name}
                  className="rounded-full text-muted-foreground hover:text-foreground"
                >
                  {link.icon}
                </Button>
              </a>
            ))}
            <span className="text-sm text-muted-foreground/60">
              {t("home.builtWith")}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-[18px]">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.596 2 12.266c0 4.536 2.865 8.384 6.839 9.742.5.096.682-.223.682-.496 0-.245-.009-.894-.014-1.755-2.782.62-3.37-1.377-3.37-1.377-.455-1.187-1.11-1.503-1.11-1.503-.908-.638.069-.625.069-.625 1.004.072 1.532 1.057 1.532 1.057.892 1.57 2.341 1.116 2.91.854.091-.667.349-1.116.635-1.373-2.221-.261-4.555-1.14-4.555-5.073 0-1.121.39-2.037 1.029-2.754-.103-.262-.446-1.315.098-2.741 0 0 .84-.276 2.75 1.052A9.31 9.31 0 0 1 12 7.4c.85.004 1.706.118 2.504.346 1.908-1.328 2.747-1.052 2.747-1.052.546 1.426.203 2.479.1 2.741.64.717 1.027 1.633 1.027 2.754 0 3.943-2.338 4.808-4.566 5.063.359.319.679.948.679 1.911 0 1.379-.012 2.492-.012 2.83 0 .276.18.596.688.495C19.138 20.646 22 16.8 22 12.266 22 6.596 17.523 2 12 2Z" />
    </svg>
  );
}
