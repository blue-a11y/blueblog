import type { Metadata } from "next";
import { ComponentsExamplesStudio } from "@/components/components-examples/components-examples-studio";
import { getOgImageUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Components Examples",
  description: "HeroUI-based component patterns, form states, and interaction references used across BlueBlog.",
  alternates: {
    canonical: "/components-examples",
  },
  openGraph: {
    title: "BlueBlog component examples",
    description: "HeroUI-based component patterns, form states, and interaction references used across BlueBlog.",
    url: "/components-examples",
    images: [getOgImageUrl("Component examples")],
  },
};

export default function ComponentsExamplesPage() {
  return <ComponentsExamplesStudio />;
}
