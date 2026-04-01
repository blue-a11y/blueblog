"use client";

import { Button, Card } from "@heroui/react";

type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  summary: string;
  highlights: string[];
  accent: string;
};

type ContactLink = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend systems",
    description: "Shipping interfaces with clear hierarchy, resilient states, and fewer cursed one-off fixes.",
    items: ["Next.js 15", "React 19", "TypeScript", "HeroUI v3", "Tailwind CSS v4"],
  },
  {
    title: "Content architecture",
    description: "Editorial workflows that do not collapse the second real content shows up.",
    items: ["MDX", "Shiki", "Content modeling", "SEO structure", "Documentation systems"],
  },
  {
    title: "Product craft",
    description: "Turning vague ideas into something users can actually navigate without wanting to rage quit.",
    items: ["Design systems", "Interaction design", "Accessibility", "Performance tuning", "DX"],
  },
  {
    title: "Ops & workflow",
    description: "The boring automation layer that saves teams from spreadsheet archaeology.",
    items: ["Workflow automation", "Reporting", "Internal tooling", "Process design", "Analytics"],
  },
];

const timeline: TimelineEntry[] = [
  {
    period: "2026 — Now",
    title: "Frontend Engineer",
    org: "Independent product work",
    summary:
      "Building editorial websites, internal tools, and interface systems with an emphasis on taste, speed, and maintainability.",
    highlights: [
      "Designed and shipped polished product surfaces with Next.js App Router.",
      "Used design tokens and component systems to reduce visual drift across pages.",
      "Paired writing workflows with portfolio-grade presentation so the work actually feels finished.",
    ],
    accent: "from-sky-500/25 via-accent/18 to-transparent",
  },
  {
    period: "2024 — 2025",
    title: "Design System / UI Engineering",
    org: "Product and platform collaborations",
    summary:
      "Focused on reusable UI primitives, documentation habits, and smoother delivery patterns for teams shipping fast.",
    highlights: [
      "Mapped recurring interface problems into reusable components and layout patterns.",
      "Improved implementation consistency by aligning designers and frontend engineers on shared tokens.",
      "Reduced last-minute styling chaos with cleaner constraints and saner defaults.",
    ],
    accent: "from-emerald-500/25 via-emerald-400/18 to-transparent",
  },
  {
    period: "2020 — 2024",
    title: "Education",
    org: "Technical and interdisciplinary study",
    summary:
      "Built the foundation in software, web thinking, and product communication that later turned into actual shipped work.",
    highlights: [
      "Strengthened full-stack fundamentals while staying annoyingly opinionated about interface quality.",
      "Learned to translate abstract product goals into concrete systems and user flows.",
      "Developed a habit of documenting decisions instead of trusting future-me to remember anything.",
    ],
    accent: "from-amber-500/24 via-amber-400/16 to-transparent",
  },
];

const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "zhangxuan.nyuk@gmail.com",
    href: "mailto:zhangxuan.nyuk@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/zhangxuan",
    href: "https://github.com/zhangxuan",
    external: true,
  },
  {
    label: "X / Twitter",
    value: "@zhangxuan",
    href: "https://x.com/zhangxuan",
    external: true,
  },
  {
    label: "Feishu",
    value: "Blue / 张轩",
    href: "https://www.feishu.cn",
    external: true,
  },
];

export function AboutOverview() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-55" />
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />

      <section className="mx-auto flex min-h-screen w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-12">
        <div className="flex w-full flex-col gap-8 lg:gap-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_340px] xl:items-end">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex w-fit rounded-full border border-border/80 bg-card/75 px-3 py-1 text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase backdrop-blur-sm">
                About Blue
              </span>

              <div className="space-y-4">
                <p className="text-sm font-medium tracking-[0.28em] text-muted-foreground uppercase sm:text-base">
                  Frontend craft · Systems thinking · Writing with product intent
                </p>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl lg:text-6xl">
                  Building calm interfaces for messy problems.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-foreground/88 sm:text-lg">
                  I care about product surfaces that feel intentional: strong hierarchy, quieter motion, durable code,
                  and content structures that still make sense when the project stops being a toy.
                </p>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Translation: less UI confetti, more systems that hold up under real use. Radical concept, apparently.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  size="lg"
                  variant="primary"
                  className="rounded-full px-6 shadow-[0_16px_40px_-20px_var(--shadow)]"
                  onPress={() => {
                    window.location.href = "/projects";
                  }}
                >
                  View projects
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full border border-border/80 bg-card/70 px-6 backdrop-blur-sm"
                  onPress={() => {
                    window.location.href = "/blog";
                  }}
                >
                  Read writing
                </Button>
              </div>
            </div>

            <Card className="hero-card border border-border/80 bg-card/80 backdrop-blur-xl">
              <Card.Header className="flex flex-col items-start gap-3 border-b border-border/70 px-6 py-5">
                <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  Snapshot
                </span>
                <div className="space-y-2">
                  <Card.Title className="text-2xl tracking-[-0.03em]">What I optimize for</Card.Title>
                  <Card.Description className="text-sm leading-7 text-muted-foreground">
                    Strong defaults, useful systems, and interfaces people can understand without a training montage.
                  </Card.Description>
                </div>
              </Card.Header>
              <Card.Content className="space-y-4 px-6 py-6">
                <MetricItem label="Primary stack" value="Next.js 15 · React 19 · HeroUI v3" />
                <MetricItem label="Bias" value="Readable UI, clean structure, durable implementation" />
                <MetricItem label="Current focus" value="Editorial products, design systems, internal tooling" />
              </Card.Content>
            </Card>
          </div>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,360px)]">
            <Card className="border border-border/80 bg-card/78 shadow-[0_24px_70px_-48px_var(--shadow)] backdrop-blur-xl">
              <Card.Header className="flex flex-col gap-3 border-b border-border/70 px-6 py-5">
                <span className="inline-flex w-fit rounded-full bg-muted px-2.5 py-1 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  Profile
                </span>
                <div className="space-y-2">
                  <Card.Title className="text-2xl tracking-[-0.03em]">Personal intro</Card.Title>
                  <Card.Description className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    I work at the intersection of frontend engineering, product thinking, and written communication.
                  </Card.Description>
                </div>
              </Card.Header>
              <Card.Content className="space-y-4 px-6 py-6 text-sm leading-7 text-foreground/88 sm:text-base">
                <p>
                  My favorite projects sit somewhere between editorial design and product infrastructure: clean reading
                  experiences, reusable UI layers, and workflows that stop teams from tripping over the same problems every week.
                </p>
                <p>
                  I like systems that look simple because the complexity got handled under the hood — not because someone hid the mess under a gradient and prayed.
                </p>
                <p>
                  If a page feels easy to use, the code stays maintainable, and the design still has a pulse, then the job was probably done right.
                </p>
              </Card.Content>
            </Card>

            <Card className="border border-border/80 bg-card/78 backdrop-blur-xl">
              <Card.Header className="flex flex-col gap-3 border-b border-border/70 px-6 py-5">
                <span className="inline-flex w-fit rounded-full bg-muted px-2.5 py-1 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  Contact
                </span>
                <div className="space-y-2">
                  <Card.Title className="text-2xl tracking-[-0.03em]">Reach out</Card.Title>
                  <Card.Description className="text-sm leading-7 text-muted-foreground">
                    Email is reliable. GitHub works. Social links exist because apparently humans enjoy those.
                  </Card.Description>
                </div>
              </Card.Header>
              <Card.Content className="space-y-3 px-6 py-6">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="group rounded-[1.4rem] border border-border/75 bg-muted/55 px-4 py-4 transition-transform duration-200 hover:-translate-y-0.5 hover:border-border"
                  >
                    <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">{link.label}</p>
                    <p className="mt-2 text-sm font-medium text-foreground sm:text-base">{link.value}</p>
                  </a>
                ))}
              </Card.Content>
            </Card>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium tracking-[0.24em] text-muted-foreground uppercase">Skill matrix</p>
              <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-[2.5rem]">
                Technology grouped by what it actually does.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {skillGroups.map((group) => (
                <Card
                  key={group.title}
                  className="border border-border/80 bg-card/76 shadow-[0_24px_70px_-52px_var(--shadow)] backdrop-blur-xl"
                >
                  <Card.Header className="flex flex-col items-start gap-3 border-b border-border/70 px-6 py-5">
                    <div className="space-y-2">
                      <Card.Title className="text-xl tracking-[-0.03em]">{group.title}</Card.Title>
                      <Card.Description className="text-sm leading-7 text-muted-foreground">
                        {group.description}
                      </Card.Description>
                    </div>
                  </Card.Header>
                  <Card.Content className="flex flex-wrap gap-2 px-6 py-5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex rounded-full border border-border/75 bg-muted/60 px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-foreground/85 uppercase"
                      >
                        {item}
                      </span>
                    ))}
                  </Card.Content>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium tracking-[0.24em] text-muted-foreground uppercase">Timeline</p>
              <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-[2.5rem]">
                Education and work, minus the LinkedIn cosplay.
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-[15px] top-4 hidden h-[calc(100%-2rem)] w-px bg-linear-to-b from-border via-border/70 to-transparent md:block" />
              <div className="space-y-6 lg:space-y-8">
                {timeline.map((entry) => (
                  <article key={`${entry.period}-${entry.title}`} className="relative md:pl-12">
                    <div className="absolute top-8 left-0 hidden h-8 w-8 items-center justify-center rounded-full border border-border bg-card shadow-[0_12px_30px_-20px_var(--shadow)] md:flex">
                      <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                    </div>

                    <Card className="border border-border/80 bg-card/80 shadow-[0_24px_70px_-48px_var(--shadow)] backdrop-blur-xl">
                      <Card.Content className="grid gap-6 px-5 py-5 md:px-6 md:py-6 xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-8">
                        <div className="relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-muted/55 p-4 shadow-[0_20px_60px_-40px_var(--shadow)]">
                          <div className={`absolute inset-x-4 top-4 h-28 rounded-[1.35rem] bg-linear-to-br ${entry.accent}`} />
                          <div className="relative flex min-h-[200px] flex-col justify-between rounded-[1.35rem] border border-border/70 bg-card/82 p-5 backdrop-blur-sm">
                            <div className="space-y-3">
                              <span className="inline-flex w-fit rounded-full border border-border/75 bg-muted/65 px-2.5 py-1 text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                                {entry.period}
                              </span>
                              <div className="space-y-2">
                                <p className="text-lg font-semibold tracking-[-0.03em] text-foreground">{entry.title}</p>
                                <p className="text-sm leading-6 text-muted-foreground">{entry.org}</p>
                              </div>
                            </div>

                            <div className="rounded-2xl border border-border/70 bg-muted/55 px-3 py-3">
                              <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">Focus</p>
                              <p className="mt-2 text-sm font-medium text-foreground">Systems · Product · Execution</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2 border-b border-border/70 pb-4">
                            <p className="text-sm font-medium tracking-[0.22em] text-muted-foreground uppercase">{entry.period}</p>
                            <Card.Title className="text-2xl tracking-[-0.03em] sm:text-[2rem]">{entry.title}</Card.Title>
                            <Card.Description className="text-sm leading-7 text-muted-foreground sm:text-base">
                              {entry.org}
                            </Card.Description>
                          </div>

                          <p className="text-sm leading-7 text-foreground/88 sm:text-base">{entry.summary}</p>

                          <div className="space-y-3">
                            {entry.highlights.map((highlight) => (
                              <div key={highlight} className="rounded-2xl border border-border/70 bg-muted/50 p-4">
                                <p className="text-sm leading-7 text-foreground/88">{highlight}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card.Content>
                    </Card>
                  </article>
                ))}
              </div>
            </div>
          </section>
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
