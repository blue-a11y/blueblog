"use client";

import { useMemo, useState } from "react";
import { Button, Card } from "@heroui/react";

type ProjectStatus = "Live" | "In Progress" | "Planned";

type Project = {
  year: string;
  title: string;
  status: ProjectStatus;
  summary: string;
  description: string;
  stack: string[];
  links: { label: string; href: string; external?: boolean }[];
};

const projects: Project[] = [
  {
    year: "2026",
    title: "OpenClaw Dashboard",
    status: "In Progress",
    summary: "本地桌面应用 — OpenClaw 专属 AI 使用洞察工具，查看模型消耗、Token 用量、成本分析。",
    description:
      "Next.js 14 + React 18 + Tailwind CSS + shadcn/ui 构建的本地仪表板，Swift 桌面壳封装。帮助用户清晰追踪 AI 模型用量、成本分布、会话历史，支持买断制（免费版 + Pro ¥49）商业模式。",
    stack: ["Next.js 14", "React 18", "Tailwind CSS", "shadcn/ui", "Swift", "Node Runtime"],
    links: [
      { label: "GitHub", href: "https://github.com/blue-a11y/agents-dashboard", external: true },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    year: "2026",
    title: "BlueBlog",
    status: "Live",
    summary: "个人发布平台，支持 MDX 写作流、设计 Token 驱动的主题系统、路由级 i18n。",
    description:
      "基于 Next.js 15 App Router 和 HeroUI v3。干净的阅读体验 + 作品集级展示 + 跨主题一致的设计系统。支持中文/英文路由级国际化。",
    stack: ["Next.js 15", "React 19", "HeroUI v3", "Tailwind CSS v4", "MDX", "next-intl"],
    links: [
      { label: "Read blog", href: "/blog" },
      { label: "About", href: "/about" },
    ],
  },
  {
    year: "2025",
    title: "Design System Sprint",
    status: "Live",
    summary: "Reusable component layer for product teams needing faster iteration without losing visual consistency.",
    description:
      "Focused on component primitives, design tokens, and documentation workflows to reduce UI drift across new features.",
    stack: ["React", "TypeScript", "Design Tokens", "Storybook"],
    links: [{ label: "Case study", href: "/blog" }],
  },
  {
    year: "2024",
    title: "Workflow Automation",
    status: "Planned",
    summary: "Lightweight internal tools for content operations, reporting, and repeatable delivery workflows.",
    description:
      "Structured dashboards, repeatable data flows, and low-friction admin actions to remove manual work from content operations.",
    stack: ["Automation", "Ops Design", "Data Flow"],
    links: [{ label: "Blog", href: "/blog" }],
  },
];

const statusColors: Record<ProjectStatus, string> = {
  Live: "text-emerald-600 dark:text-emerald-400",
  "In Progress": "text-sky-600 dark:text-sky-400",
  Planned: "text-amber-600 dark:text-amber-400",
};

const statusDot: Record<ProjectStatus, string> = {
  Live: "bg-emerald-500",
  "In Progress": "bg-sky-500",
  Planned: "bg-amber-500",
};

export function ProjectShowcase() {
  const [filter, setFilter] = useState<ProjectStatus | "All">("All");

  const filteredProjects = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.status === filter);
  }, [filter]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl px-6 py-20 sm:px-10">
      <div className="w-full space-y-12">
        <div className="space-y-4 fade-in">
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-foreground sm:text-5xl">
            Projects
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            A selection of things I&apos;ve built, with emphasis on structure, restraint, and clear execution.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 fade-in fade-in-delay-1">
          {(["All", "Live", "In Progress", "Planned"] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? "primary" : "ghost"}
              className="rounded-full px-4 text-sm"
              onPress={() => setFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredProjects.map((project, index) => (
            <article key={project.title} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="border border-border/60 bg-card/90 backdrop-blur-xl transition-all duration-200 hover:border-border hover:shadow-[0_16px_48px_-16px_var(--shadow)]">
                <Card.Content className="p-6 sm:p-8">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">{project.year}</span>
                        <span className="flex items-center gap-1.5 text-sm font-medium">
                          <span className={`inline-block h-1.5 w-1.5 rounded-full ${statusDot[project.status]}`} />
                          <span className={statusColors[project.status]}>{project.status}</span>
                        </span>
                      </div>

                      <h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">
                        {project.title}
                      </h2>

                      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-[11px] font-medium tracking-[0.1em] text-muted-foreground uppercase"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                      {project.links.map((link) => (
                        <Button
                          key={link.label}
                          variant={link.external ? "outline" : "secondary"}
                          className="rounded-full px-5 text-sm"
                          onPress={() => {
                            if (link.external) {
                              window.open(link.href, "_blank", "noopener,noreferrer");
                            } else {
                              window.location.href = link.href;
                            }
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
    </main>
  );
}
