import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { getAllTags, getPostSummaries } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog · BlueBlog",
  description: "Local MDX posts parsed with frontmatter metadata and draft control.",
};

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getPostSummaries(), getAllTags()]);

  return <PostList posts={posts} tags={tags} />;
}
