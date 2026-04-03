import type { Metadata } from "next";
import { AboutOverview } from "@/components/about/about-overview";
import { getOgImageUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Background, skills, selected experience, and contact details for Blue.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Blue",
    description: "Background, skills, selected experience, and contact details for Blue.",
    url: "/about",
    images: [getOgImageUrl("About Blue")],
  },
};

export default function AboutPage() {
  return <AboutOverview />;
}
