"use client";

import { useMemo, useState } from "react";
import { Button, Card } from "@heroui/react";

type ProjectStatus = "Live" | "In Progress" | "Planned";

type ProjectItem = {
  year: string;
  title: string;
  status: ProjectStatus;
  summary: string;
  description: string;
  impact: string;
  stack: string[];
  links: {
    label: string;
    href: string;
    external?: boolean;
  }[];
  accent: string;
  previewLabel: string;
};

const projects: ProjectItem[] = [
  {
    year: "2026",
    title: "BlueBlog",
    status: "In Progress",
    summary: "A personal publishing platform focused on clean reading, thoughtful motion, and durable frontend patterns.",
    description:
      "Built with Next.js 15 App Router and HeroUI v3, this site pairs editorial layouts with a design-token-driven theme system, MDX writing flow, and portfolio-grade presentation.",
    impact: "Current build for essays, project notes, and system-level UI experiments.",
    stack: ["Next.js 15", "React 19", "HeroUI v3", "Tailwind CSS v4", "MDX"],
    links: [
      { label: "Open blog", href: "/blog" },
      { label: "Back home", href: "/" },
    ],
    accent: "from-sky-500/22 via-accent/18 to-transparent",
    previewLabel: "Editorial system",
  },
  {
    year: "2025",
    title: "Design System Sprint",
    status: "Live",
    summary: "A reusable component layer for product teams that needed faster iteration without losing visual discipline.",
    description:
      "Focused on component primitives, design tokens, and documentation workflows so teams could ship new surfaces with less visual drift and fewer one-off UI decisions.",
    impact: "Reduced UI drift across new features and improved delivery consistency.",
    stack: ["React", "TypeScript", "Design Tokens", "Documentation"],
    links: [{ label: "View case note", href: "/blog" }],
    accent: "from-emerald-500/22 via-emerald-400/16 to-transparent",
    previewLabel: "System rollout",
  },
  {
    year: "2024",
    title: "Workflow Automation Lab",
    status: "Planned",
    summary: "A lightweight set of internal tools for content operations, reporting, and repeatable delivery workflows.",
    description:
      "The next systems build: structured operator dashboards, repeatable data flows, and low-friction admin actions that remove boring manual work from content operations.",
    impact: "Planned as the next systems project after the blog foundation is complete.",
    stack: ["Automation", "Ops Design", "Data Flow"],
    links: [{ label: "Explore writing", href: "/blog" }],
    accent: "from-amber-500/24 via-amber-400/16 to-transparent",
    previewLabel: "Ops tooling",
  },
];

const statusTone: Record<ProjectStatus, string> = {
  Live: "border-emerald-500/25 bg-emerald-500/12 text-emerald-600 dark:text-emerald-300",
  "In Progress": "border-sky-500/25 bg-sky-500/12 text-sky-600 dark:text-sky-300",
  Planned: "border-amber-500/25 bg-amber-500/12 text-amber-600 dark:text-amber-300",
};

const statusFilters: Array<ProjectStatus | "All"> = ["All", "Live", "In Progress", "Planned"];

const stackFilters = Array.from(new Set(projects.flatMap((project) => project.stack)));

export function ProjectShowcase() {
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | "All">("All");
  const [activeStack, setActiveStack] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesStatus = activeStatus === "All" || project.status === activeStatus;
      const matchesStack = activeStack === "All" || project.stack.includes(activeStack);
      return matchesStatus && matchesStack;
    });
  }, [activeStack, activeStatus]);

  const liveCount = projects.filter((project) => project.status === "Live").length;
  const inProgressCount = projects.filter((project) => project.status === "In Progress").length;
  const visibleStacks = useMemo(() => {
    return Array.from(new Set(filteredProjects.flatMap((project) => project.stack)));
  }, [filteredProjects]);
  const isFiltered = activeStatus !== "All" || activeStack !== "All";

  return (
    <main className="relative isolate overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" />
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />

      <section className="mx-auto flex min-h-screen w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-12">
        <div className="flex w-full flex-col gap-10 lg:gap-14">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.12fr)_340px] xl:items-end">
            <div className="max-w-3xl space-y-6">
              <span className="inline-flex w-fit rounded-full border border-border/80 bg-card/75 px-3 py-1 text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase backdrop-blur-sm">
                Selected projects
              </span>

              <div className="space-y-4">
                <p className="text-sm font-medium tracking-[0.28em] text-muted-foreground uppercase sm:text-base">
                  Timeline view · Product work · Frontend systems
                </p>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl lg:text-6xl">
                  Projects shaped with structure, restraint, and clear execution.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Filter by build status or stack, then drill into the project cards for a clearer read on scope,
                  presentation, and product intent.
                </p>
              </div>
            </div>

            <Card className="border border-border/80 bg-card/80 backdrop-blur-xl">
              <Card.Header className="flex flex-col items-start gap-3 border-b border-border/70 px-6 py-5">
                <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  Snapshot
                </span>
                <div className="space-y-2">
                  <Card.Title className="text-2xl tracking-[-0.03em]">Phase 3 in motion</Card.Title>
                  <Card.Description className="text-sm leading-7 text-muted-foreground">
                    The project layer now has detail cards, stack filters, and a cleaner responsive structure.
                  </Card.Description>
                </div>
              </Card.Header>
              <Card.Content className="space-y-4 px-6 py-6">
                <SummaryItem label="Visible now" value={`${filteredProjects.length} project${filteredProjects.length === 1 ? "" : "s"}`} />
                <SummaryItem label="Shipping" value={`${liveCount} live / ${inProgressCount} in progress`} />
                <SummaryItem label="Filter state" value={isFiltered ? `${activeStatus} · ${activeStack}` : "Showing the full archive"} />
              </Card.Content>
            </Card>
          </div>

          <Card className="border border-border/80 bg-card/76 shadow-[0_24px_70px_-48px_var(--shadow)] backdrop-blur-xl">
            <Card.Header className="flex flex-col gap-4 border-b border-border/70 px-5 py-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2">
                <Card.Title className="text-2xl tracking-[-0.03em]">Filter the project archive</Card.Title>
                <Card.Description className="max-w-2xl text-sm leading-7 text-muted-foreground">
                  Status handles delivery stage. Stack handles implementation flavor. Revolutionary stuff, I know.
                </Card.Description>
              </div>
              <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:min-w-[280px]">
                <FilterMetric label="Projects" value={String(filteredProjects.length)} />
                <FilterMetric label="Stacks shown" value={String(visibleStacks.length)} />
              </div>
            </Card.Header>
            <Card.Content className="flex flex-col gap-5 px-5 py-5">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">By status</p>
                <div className="flex flex-wrap gap-3">
                  {statusFilters.map((status) => (
                    <Button
                      key={status}
                      variant={activeStatus === status ? "primary" : "secondary"}
                      className="rounded-full px-4"
                      onPress={() => setActiveStatus(status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">By stack</p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={activeStack === "All" ? "primary" : "secondary"}
                    className="rounded-full px-4"
                    onPress={() => setActiveStack("All")}
                  >
                    All
                  </Button>
                  {stackFilters.map((stack) => (
                    <Button
                      key={stack}
                      variant={activeStack === stack ? "primary" : "secondary"}
                      className="rounded-full px-4"
                      onPress={() => setActiveStack(stack)}
                    >
                      {stack}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
                <p className="text-sm text-muted-foreground">
                  {filteredProjects.length} result{filteredProjects.length === 1 ? "" : "s"}
                  {isFiltered ? " after filtering" : " in the full archive"}
                </p>
                <Button
                  variant="ghost"
                  className="rounded-full border border-border/80 px-4"
                  onPress={() => {
                    setActiveStatus("All");
                    setActiveStack("All");
                  }}
                  isDisabled={!isFiltered}
                >
                  Clear filters
                </Button>
              </div>
            </Card.Content>
          </Card>

          {filteredProjects.length > 0 ? (
            <div className="relative">
              <div className="absolute left-[15px] top-4 hidden h-[calc(100%-2rem)] w-px bg-linear-to-b from-border via-border/70 to-transparent md:block" />
              <div className="space-y-6 lg:space-y-8">
                {filteredProjects.map((project) => (
                  <article key={`${project.year}-${project.title}`} className="relative md:pl-12">
                    <div className="absolute top-8 left-0 hidden h-8 w-8 items-center justify-center rounded-full border border-border bg-card shadow-[0_12px_30px_-20px_var(--shadow)] md:flex">
                      <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                    </div>

                    <Card className="border border-border/80 bg-card/82 shadow-[0_24px_70px_-48px_var(--shadow)] backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5">
                      <Card.Content className="grid gap-6 px-5 py-5 md:px-6 md:py-6 xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-8">
                        <ProjectPreview project={project} />

                        <div className="flex flex-col gap-6">
                          <div className="flex flex-col gap-5 border-b border-border/70 pb-5 lg:flex-row lg:items-start lg:justify-between">
                            <div className="space-y-3">
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="text-sm font-medium tracking-[0.24em] text-muted-foreground uppercase">{project.year}</span>
                                <StatusBadge status={project.status} />
                              </div>
                              <div className="space-y-2">
                                <Card.Title className="text-2xl tracking-[-0.03em] sm:text-[2rem]">{project.title}</Card.Title>
                                <Card.Description className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                                  {project.summary}
                                </Card.Description>
                              </div>
                            </div>

                            <div className="grid gap-3 sm:min-w-60">
                              <MetaCard label="Impact" value={project.impact} />
                            </div>
                          </div>

                          <p className="text-sm leading-7 text-foreground/88 sm:text-base">{project.description}</p>

                          <div className="space-y-3">
                            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Tech stack</p>
                            <div className="flex flex-wrap gap-2">
                              {project.stack.map((item) => (
                                <Button
                                  key={item}
                                  variant={activeStack === item ? "primary" : "ghost"}
                                  className="rounded-full border border-border/75 bg-muted/65 px-3 py-1 text-[11px] font-medium tracking-[0.16em] uppercase"
                                  onPress={() => setActiveStack(item)}
                                >
                                  {item}
                                </Button>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            {project.links.map((link, index) => (
                              <Button
                                key={`${project.title}-${link.label}`}
                                variant={index === 0 ? "primary" : "secondary"}
                                className="rounded-full px-5"
                                onPress={() => {
                                  if (link.external) {
                                    window.open(link.href, "_blank", "noopener,noreferrer");
                                    return;
                                  }

                                  window.location.href = link.href;
                                }}
                              >
                                {link.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </Card.Content>
                    </Card>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <Card className="border border-dashed border-border/80 bg-card/72 backdrop-blur-xl">
              <Card.Content className="flex flex-col items-start gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <Card.Title className="text-xl tracking-[-0.03em]">No projects matched that filter.</Card.Title>
                  <Card.Description className="text-sm leading-7 text-muted-foreground">
                    Congratulations, you filtered the list into the void. Clear the filters and try again.
                  </Card.Description>
                </div>
                <Button
                  variant="secondary"
                  className="rounded-full border border-border/80 px-5"
                  onPress={() => {
                    setActiveStatus("All");
                    setActiveStack("All");
                  }}
                >
                  Reset filters
                </Button>
              </Card.Content>
            </Card>
          )}
        </div>
      </section>
    </main>
  );
}

type SummaryItemProps = {
  label: string;
  value: string;
};

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-muted/55 p-4">
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">{label}</p>
      <p className="mt-2 text-sm leading-7 text-foreground/90">{value}</p>
    </div>
  );
}

function MetaCard({ label, value }: SummaryItemProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-muted/50 p-4">
      <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">{label}</p>
      <p className="mt-2 text-sm leading-7 text-foreground/88">{value}</p>
    </div>
  );
}

function FilterMetric({ label, value }: SummaryItemProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-muted/50 px-4 py-3">
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">{label}</p>
      <p className="mt-2 text-xl font-semibold tracking-[-0.04em] text-foreground">{value}</p>
    </div>
  );
}

function ProjectPreview({ project }: { project: ProjectItem }) {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-border/80 bg-muted/55 p-4 shadow-[0_20px_60px_-40px_var(--shadow)]">
        <div className={`absolute inset-x-4 top-4 h-28 rounded-[1.35rem] bg-linear-to-br ${project.accent}`} />
        <div className="relative flex min-h-[200px] flex-col justify-between rounded-[1.35rem] border border-border/70 bg-card/82 p-5 backdrop-blur-sm">
          <div className="space-y-3">
            <span className="inline-flex w-fit rounded-full border border-border/75 bg-muted/65 px-2.5 py-1 text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              {project.previewLabel}
            </span>
            <div className="space-y-2">
              <p className="text-lg font-semibold tracking-[-0.03em] text-foreground">{project.title}</p>
              <p className="text-sm leading-6 text-muted-foreground">{project.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-5 text-sm">
            <div className="rounded-2xl border border-border/70 bg-muted/55 px-3 py-3">
              <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">Status</p>
              <p className="mt-2 font-medium text-foreground">{project.status}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-muted/55 px-3 py-3">
              <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">Stack</p>
              <p className="mt-2 font-medium text-foreground">{project.stack.length} items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase ${statusTone[status]}`}
    >
      {status}
    </span>
  );
}
