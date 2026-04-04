import type { Metadata } from "next";
import { ProjectShowcase } from "@/components/projects/project-showcase";
import { getOgImageUrl, siteConfig } from "@/lib/site";

const projectsDescription = "Selected product, frontend, and interaction work shipped across experiments and production surfaces.";

export const metadata: Metadata = {
  title: "Projects",
  description: projectsDescription,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `${siteConfig.personName}'s projects`,
    description: projectsDescription,
    url: "/projects",
    images: [getOgImageUrl(`Projects by ${siteConfig.personName}`)],
  },
};

export default function ProjectsPage() {
  return <ProjectShowcase />;
}
