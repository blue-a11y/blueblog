import type { Metadata } from "next";
import { AboutOverview } from "@/components/about/about-overview";
import { getOgImageUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Background, skills, selected experience, and contact details for 张轩.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About 张轩",
    description: "Background, skills, selected experience, and contact details for 张轩.",
    url: "/about",
    images: [getOgImageUrl("About 张轩")],
  },
};

export default function AboutPage() {
  return <AboutOverview />;
}
