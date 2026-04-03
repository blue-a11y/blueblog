import "server-only";

import { getPostSummaries } from "@/lib/posts";
import type { BlogSearchEntry } from "@/types/post";

export async function getBlogSearchIndex(): Promise<BlogSearchEntry[]> {
  const posts = await getPostSummaries();

  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    excerpt: post.excerpt,
    tags: post.tags,
  }));
}
