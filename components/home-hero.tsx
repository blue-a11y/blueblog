"use client";

import { Button, Card } from "@heroui/react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/zhangxuan",
    label: "Open GitHub profile",
    icon: <GitHubIcon className="size-[18px]" />,
  },
  {
    name: "Feishu",
    href: "https://www.feishu.cn",
    label: "Open Feishu",
    icon: <FeishuIcon className="size-[18px]" />,
  },
  {
    name: "Email",
    href: "mailto:zhangxuan.nyuk@gmail.com",
    label: "Send email to Blue",
    icon: <MailIcon className="size-[18px]" />,
  },
];

export function HomeHero() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />

      <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-24 sm:px-10 lg:px-12">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          <div className="flex max-w-3xl flex-col justify-center gap-8">
            <div className="space-y-5 sm:space-y-6">
              <span className="inline-flex w-fit rounded-full border border-border/80 bg-card/75 px-3 py-1 text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase backdrop-blur-sm">
                BlueBlog / Personal log
              </span>

              <div className="space-y-4">
                <p className="text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase sm:text-base">
                  Frontend Engineer · Building things for the web
                </p>
                <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                  Blue
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-foreground/88 sm:text-xl sm:leading-9">
                  Building with React, Next.js, and design systems that make complex flows feel simple.
                </p>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Notes on product execution, UI decisions, and frontend systems shaped with less noise and better taste.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                variant="primary"
                className="rounded-full px-6 shadow-[0_16px_40px_-20px_var(--shadow)]"
                onPress={() => window.open("https://github.com/zhangxuan", "_blank", "noopener,noreferrer")}
              >
                <GitHubIcon className="size-4" />
                View GitHub
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full border border-border/80 bg-card/70 px-6 backdrop-blur-sm"
                onPress={() => {
                  window.location.href = "/blog";
                }}
              >
                <GridIcon className="size-4" />
                Read posts
              </Button>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  aria-label={link.label}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-card/65 text-muted-foreground shadow-[0_8px_24px_-18px_var(--shadow)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:text-foreground"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-start lg:justify-end">
            <Card className="hero-card w-full max-w-sm border border-border/80 bg-card/80 backdrop-blur-xl">
              <Card.Header className="flex flex-col items-start gap-3 border-b border-border/70 px-6 py-6">
                <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  Focus
                </span>
                <div className="space-y-2">
                  <Card.Title className="text-2xl tracking-[-0.03em]">Minimal by default</Card.Title>
                  <Card.Description className="text-sm leading-7 text-muted-foreground">
                    Quiet hierarchy, soft contrast, and steady spacing that keep attention on the work.
                  </Card.Description>
                </div>
              </Card.Header>
              <Card.Content className="space-y-4 px-6 py-6">
                <MetricItem label="Stack" value="Next.js 15 / React 19 / HeroUI v3" />
                <MetricItem label="Keywords" value="Design systems, frontend craft, DX" />
                <MetricItem label="Writing about" value="UI engineering, product details, web performance" />
              </Card.Content>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

type MetricItemProps = {
  label: string;
  value: string;
};

function MetricItem({ label, value }: MetricItemProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-muted/55 p-4">
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">{label}</p>
      <p className="mt-2 text-sm leading-7 text-foreground/90">{value}</p>
    </div>
  );
}

type IconProps = {
  className?: string;
};

function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19c-4.5 1.5-4.5-2.5-6-3m12 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-6 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77 5.44 5.44 0 0 0 3.5 8.52c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      />
    </svg>
  );
}

function FeishuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 3H7a3 3 0 0 0-3 3v5.5L9 9l4.5 2.5L18 9V6a3 3 0 0 0-3-3h-1.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 11.5V18a3 3 0 0 0 3 3h6.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21H17a3 3 0 0 0 3-3v-6.5L15 14l-1.5 7Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 3 3 3-3" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}

function GridIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}
