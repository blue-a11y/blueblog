import type { Metadata } from "next";
import { AboutOverview } from "@/components/about/about-overview";
import { getOgImageUrl, siteConfig } from "@/lib/site";

const aboutDescription = `Background, skills, selected experience, and contact details for ${siteConfig.personName}.`;

export const metadata: Metadata = {
  title: "About",
  description: aboutDescription,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About ${siteConfig.personName}`,
    description: aboutDescription,
    url: "/about",
    images: [getOgImageUrl(`About ${siteConfig.personName}`)],
  },
};

export default function AboutPage() {
  return <AboutOverview />;
}
