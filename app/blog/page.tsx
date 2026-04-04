import type { Metadata } from "next";
import { PostList } from "@/components/post-list";

export const revalidate = 3600;
import { getAllTags, getPostSummaries } from "@/lib/posts";
import { getBlogSearchIndex } from "@/lib/search";
import { getOgImageUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on frontend engineering, product craft, interaction design, and calm UI systems.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": siteConfig.feedPath,
    },
  },
  openGraph: {
    title: "BlueBlog articles",
    description: "Notes on frontend engineering, product craft, interaction design, and calm UI systems.",
    url: "/blog",
    images: [getOgImageUrl("BlueBlog articles")],
  },
  twitter: {
    title: "BlueBlog articles",
    description: "Notes on frontend engineering, product craft, interaction design, and calm UI systems.",
    images: [getOgImageUrl("BlueBlog articles")],
  },
};

export default async function BlogPage() {
  const [posts, tags, searchIndex] = await Promise.all([getPostSummaries(), getAllTags(), getBlogSearchIndex()]);

  return <PostList posts={posts} tags={tags} searchIndex={searchIndex} />;
}
