import type { Metadata } from "next";
import { ProjectShowcase } from "@/components/projects/project-showcase";
import { getOgImageUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected product, frontend, and interaction work shipped across experiments and production surfaces.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "BlueBlog projects",
    description: "Selected product, frontend, and interaction work shipped across experiments and production surfaces.",
    url: "/projects",
    images: [getOgImageUrl("Projects by Blue")],
  },
};

export default function ProjectsPage() {
  return <ProjectShowcase />;
}
