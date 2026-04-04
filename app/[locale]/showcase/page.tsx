import type { Metadata } from "next";
import { ShowcaseStudio } from "@/components/showcase/showcase-studio";
import { getOgImageUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Showcase",
  description: "A style lab for theme direction, surface depth, and polished interface presentation.",
  alternates: {
    canonical: "/showcase",
  },
  openGraph: {
    title: "BlueBlog showcase",
    description: "A style lab for theme direction, surface depth, and polished interface presentation.",
    url: "/showcase",
    images: [getOgImageUrl("BlueBlog showcase")],
  },
};

export default function ShowcasePage() {
  return <ShowcaseStudio />;
}
