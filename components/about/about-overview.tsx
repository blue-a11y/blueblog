"use client";

import { Button, Card } from "@heroui/react";
import { siteConfig } from "@/lib/site";

type SkillGroup = {
  title: string;
  items: string[];
};

type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  description: string;
};

const skills: SkillGroup[] = [
  { title: "Frontend", items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "HeroUI v3"] },
  { title: "Content", items: ["MDX", "Shiki", "Content Modeling", "SEO"] },
  { title: "Design", items: ["Design Systems", "Interaction Design", "Accessibility", "Performance"] },
  { title: "Tooling", items: ["Workflow Automation", "Internal Tools", "Analytics", "Process Design"] },
];

const timeline: TimelineEntry[] = [
  {
    period: "2026 — Now",
    title: "Frontend Engineer",
    org: "Independent",
    description: "Building editorial websites, internal tools, and interface systems with a focus on craft, speed, and maintainability.",
  },
  {
    period: "2024 — 2025",
    title: "UI Engineering",
    org: "Product teams",
    description: "Reusable UI primitives, design tokens, and delivery patterns for teams shipping fast without visual drift.",
  },
  {
    period: "2020 — 2024",
    title: "Education",
    org: "University",
    description: "Full-stack fundamentals with a persistent obsession with interface quality and product thinking.",
  },
];

const contactLinks: { label: string; value: string; href: string; external?: boolean }[] = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "GitHub", value: "blue-a11y", href: siteConfig.github, external: true },
];

export function AboutOverview() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl px-6 py-20 sm:px-10">
      <div className="w-full space-y-16">
        {/* Intro */}
        <div className="space-y-6 fade-in">
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-foreground sm:text-5xl">
            About
          </h1>
          <div className="max-w-2xl space-y-4">
            <p className="text-lg leading-relaxed text-foreground/90">
              I&apos;m Blue, a frontend engineer who cares about product surfaces that feel intentional — strong hierarchy,
              quieter motion, durable code, and content that still makes sense when the project stops being a toy.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              I work at the intersection of frontend engineering, product thinking, and written communication. 
              My favorite projects sit between editorial design and product infrastructure.
            </p>
          </div>
        </div>

        {/* Skills */}
        <section className="space-y-6 fade-in fade-in-delay-1">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">Skills</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((group) => (
              <Card key={group.title} className="border border-border/60 bg-card/90">
                <Card.Content className="p-5">
                  <p className="mb-3 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                    {group.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-muted/60 px-3 py-1 text-sm text-foreground/85"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="space-y-6 fade-in fade-in-delay-2">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">Timeline</h2>
          <div className="space-y-6">
            {timeline.map((entry) => (
              <Card key={entry.period} className="border border-border/60 bg-card/90">
                <Card.Content className="flex flex-col gap-2 p-5 sm:flex-row sm:items-start sm:gap-6">
                  <span className="shrink-0 text-sm font-medium text-muted-foreground w-32">
                    {entry.period}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{entry.title}</h3>
                    <p className="text-sm text-muted-foreground">{entry.org}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">{entry.description}</p>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="space-y-6 fade-in fade-in-delay-3">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">Contact</h2>
          <div className="flex flex-wrap gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                <Button variant="secondary" className="rounded-full px-5">
                  {link.label}: {link.value}
                </Button>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
