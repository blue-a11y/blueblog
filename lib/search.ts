import "server-only";

import { unstable_cache } from "next/cache";
import { getPostSummaries } from "@/lib/posts";
import type { BlogSearchEntry } from "@/types/post";

const getBlogSearchIndexCached = unstable_cache(
  async (): Promise<BlogSearchEntry[]> => {
    const posts = await getPostSummaries();

    return posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      excerpt: post.excerpt,
      tags: post.tags,
    }));
  },
  ["blog-search-index"],
  { revalidate: 3600, tags: ["posts"] },
);

export async function getBlogSearchIndex(): Promise<BlogSearchEntry[]> {
  return getBlogSearchIndexCached();
}
