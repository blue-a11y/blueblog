"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Card, Input } from "@heroui/react";
import type { PostSummary } from "@/types/post";

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

const INITIAL_VISIBLE_POSTS = 6;
const LOAD_MORE_COUNT = 6;

type PostListProps = {
  posts: PostSummary[];
  tags: string[];
};

export function PostList({ posts, tags }: PostListProps) {
  const [activeTag, setActiveTag] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_POSTS);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = activeTag === "all" || post.tags.includes(activeTag);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [post.title, post.description, post.excerpt].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        );
      return matchesTag && matchesQuery;
    });
  }, [activeTag, normalizedQuery, posts]);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_POSTS);
  }, [activeTag, normalizedQuery]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;
  const isFiltered = activeTag !== "all" || normalizedQuery.length > 0;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl px-6 py-20 sm:px-10">
      <div className="w-full space-y-12">
        {/* Header */}
        <div className="space-y-4 fade-in">
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-foreground sm:text-5xl">
            Blog
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            Thoughts on frontend engineering, design systems, and building things for the web.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 fade-in fade-in-delay-1">
          <Input
            aria-label="Search posts"
            value={query}
            placeholder="Search posts…"
            onChange={(event) => setQuery(event.target.value)}
            className="max-w-md"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeTag === "all" ? "primary" : "ghost"}
              className="rounded-full px-4 text-sm"
              onPress={() => setActiveTag("all")}
            >
              All
            </Button>
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={activeTag === tag ? "primary" : "ghost"}
                className="rounded-full px-4 text-sm"
                onPress={() => setActiveTag(tag)}
              >
                {tag}
              </Button>
            ))}
            {isFiltered && (
              <Button
                variant="ghost"
                className="rounded-full px-4 text-sm text-muted-foreground"
                onPress={() => { setActiveTag("all"); setQuery(""); }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Post Grid */}
        {posts.length === 0 ? (
          <div className="fade-in rounded-2xl border border-dashed border-border/60 py-20 text-center">
            <p className="text-muted-foreground">No posts published yet.</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="fade-in rounded-2xl border border-dashed border-border/60 py-20 text-center">
            <p className="text-muted-foreground">No posts match your filter.</p>
            <Button
              variant="secondary"
              className="mt-4 rounded-full"
              onPress={() => { setActiveTag("all"); setQuery(""); }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              {visiblePosts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <Card className="h-full border border-border/60 bg-card/70 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-border hover:shadow-[0_16px_48px_-16px_var(--shadow)]">
                    <Card.Content className="flex h-full flex-col gap-4 p-6">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-muted/70 px-2.5 py-0.5 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-1 flex-col gap-2">
                        <h2 className="text-xl font-semibold tracking-[-0.02em] text-foreground group-hover:text-accent transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                          {post.description}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted-foreground">
                        <time>{dateFormatter.format(new Date(post.date))}</time>
                        <span>·</span>
                        <span>{post.readingTime} min read</span>
                      </div>
                    </Card.Content>
                  </Card>
                </a>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  className="rounded-full px-8"
                  onPress={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
                >
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
