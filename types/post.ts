export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  published?: boolean;
  tags?: string[];
  coverImage?: string;
};

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  tags: string[];
  readingTime: number;
  content: string;
  excerpt: string;
  coverImage?: string;
  path: string;
}

export interface PostSummary extends Omit<Post, "content" | "path"> {}
