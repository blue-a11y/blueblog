import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://blueblog.me";

export const siteConfig = {
  name: "BlueBlog",
  feedPath: "/feed.xml",
  title: "BlueBlog · Frontend engineering, design systems, and product craft",
  description:
    "Personal site for 张轩, focused on frontend engineering, design systems, interaction experiments, and technical writing.",
  shortDescription: "Frontend engineering, design systems, interaction experiments, and technical writing.",
  author: "张轩",
  locale: "en_US",
  url: baseUrl.replace(/\/$/, ""),
  email: "zhangxuan.nyuk@gmail.com",
  keywords: [
    "BlueBlog",
    "张轩",
    "zhangxuan",
    "frontend engineer",
    "Next.js blog",
    "React",
    "design systems",
    "UI engineering",
    "technical writing",
  ],
  navigationRoutes: ["/", "/blog", "/projects", "/playground", "/showcase", "/components-examples", "/about"],
};

export function getSiteUrl(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, siteConfig.url).toString();
}

export function getFeedUrl() {
  return getSiteUrl(siteConfig.feedPath);
}

export function getOgImageUrl(title?: string) {
  const imageUrl = new URL("/opengraph-image", siteConfig.url);

  if (title) {
    imageUrl.searchParams.set("title", title);
  }

  return imageUrl.toString();
}

export function buildStaticRouteEntries(lastModified: Date): MetadataRoute.Sitemap {
  return siteConfig.navigationRoutes.map((route) => ({
    url: getSiteUrl(route),
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/blog" ? 0.9 : 0.7,
  }));
}
