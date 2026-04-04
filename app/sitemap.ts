import type { MetadataRoute } from "next";
import { getPostSummaries } from "@/lib/posts";

export const revalidate = 3600;
import { buildStaticRouteEntries, getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const posts = await getPostSummaries();

  const postEntries = posts.map((post) => ({
    url: getSiteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...buildStaticRouteEntries(lastModified), ...postEntries];
}
