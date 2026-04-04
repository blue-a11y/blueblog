import type { Metadata } from "next";
import { InteractiveLab } from "@/components/playground/interactive-lab";
import { getOgImageUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lab",
  description: "Interactive UI experiments for motion, sorting, filtering, and product feel.",
  alternates: {
    canonical: "/playground",
  },
  openGraph: {
    title: "BlueBlog lab",
    description: "Interactive UI experiments for motion, sorting, filtering, and product feel.",
    url: "/playground",
    images: [getOgImageUrl("Interactive UI lab")],
  },
};

export default function PlaygroundPage() {
  return <InteractiveLab />;
}
