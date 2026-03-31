import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Post, PostFrontmatter, PostSummary } from "@/types/post";

const POSTS_DIRECTORY = path.join(process.cwd(), "contents", "posts");
const WORDS_PER_MINUTE = 220;
const MDX_EXTENSION = /\.mdx?$/i;

function toSlugSegment(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function normalizeDate(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value !== "string") {
    throw new Error(`Invalid post date: ${String(value)}. Expected YYYY-MM-DD.`);
  }

  const match = value.match(/^\d{4}-\d{2}-\d{2}$/);

  if (!match) {
    throw new Error(`Invalid post date: ${value}. Expected YYYY-MM-DD.`);
  }

  return value;
}

function buildSlug(date: string, title: string) {
  const slugSegment = toSlugSegment(title);
  return slugSegment ? `${date}-${slugSegment}` : date;
}

function estimateReadingTime(content: string) {
  const plainText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#[\]()*_>~-]/g, " ");

  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function createExcerpt(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#[\]_*]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180)
    .trim();
}

function normalizeFrontmatter(frontmatter: PostFrontmatter, filePath: string) {
  const title = frontmatter.title?.trim();
  const description = frontmatter.description?.trim();
  const date = normalizeDate(frontmatter.date);

  if (!title) {
    throw new Error(`Missing post title in ${filePath}`);
  }

  if (!description) {
    throw new Error(`Missing post description in ${filePath}`);
  }

  return {
    title,
    description,
    date,
    published: frontmatter.published ?? false,
    tags: Array.isArray(frontmatter.tags)
      ? frontmatter.tags.map((tag) => tag.trim()).filter(Boolean)
      : [],
    coverImage: frontmatter.coverImage,
  };
}

async function collectPostFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectPostFiles(entryPath);
      }

      if (!MDX_EXTENSION.test(entry.name)) {
        return [];
      }

      return [entryPath];
    }),
  );

  return files.flat();
}

export async function getPostBySlug(slug: string, options: { includeDrafts?: boolean } = {}) {
  const posts = await getAllPosts({ includeDrafts: options.includeDrafts ?? true });
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getAllPosts(options: { includeDrafts?: boolean } = {}): Promise<Post[]> {
  const postFiles = await collectPostFiles(POSTS_DIRECTORY);

  const posts = await Promise.all(
    postFiles.map(async (filePath) => {
      const source = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(source);
      const frontmatter = normalizeFrontmatter(data as PostFrontmatter, filePath);
      const excerpt = createExcerpt(content);

      return {
        slug: buildSlug(frontmatter.date, frontmatter.title),
        title: frontmatter.title,
        description: frontmatter.description,
        date: frontmatter.date,
        published: frontmatter.published,
        tags: frontmatter.tags,
        readingTime: estimateReadingTime(content),
        content,
        excerpt: excerpt || frontmatter.description,
        coverImage: frontmatter.coverImage,
        path: filePath,
      } satisfies Post;
    }),
  );

  return posts
    .filter((post) => options.includeDrafts || post.published)
    .sort((left, right) => right.date.localeCompare(left.date));
}

export async function getPostSummaries(options: { includeDrafts?: boolean } = {}): Promise<PostSummary[]> {
  const posts = await getAllPosts(options);

  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    published: post.published,
    tags: post.tags,
    readingTime: post.readingTime,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
  }));
}

export async function getAllTags() {
  const posts = await getPostSummaries();
  return [...new Set(posts.flatMap((post) => post.tags))].sort((left, right) => left.localeCompare(right));
}

export async function getAdjacentPosts(slug: string) {
  const posts = await getPostSummaries();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return {
      previousPost: null,
      nextPost: null,
    };
  }

  return {
    previousPost: posts[index - 1] ?? null,
    nextPost: posts[index + 1] ?? null,
  };
}

export { buildSlug, estimateReadingTime, POSTS_DIRECTORY };
