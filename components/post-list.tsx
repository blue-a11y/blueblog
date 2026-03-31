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
  const hasPublishedPosts = posts.length > 0;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
      <div className="w-full space-y-10">
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
          <div className="space-y-5">
            <span className="inline-flex w-fit rounded-full border border-border/80 bg-card/70 px-3 py-1 text-xs font-medium tracking-[0.24em] text-muted-foreground uppercase backdrop-blur-sm">
              Blog index
            </span>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
                Writing about frontend craft and product detail.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                Browse local MDX posts with fast search, tag filters, and a cleaner reading flow.
              </p>
            </div>
          </div>

          <Card className="border border-border/80 bg-card/75 backdrop-blur-xl">
            <Card.Header className="flex flex-col items-start gap-2 border-b border-border/70 px-5 py-5">
              <Card.Title className="text-lg tracking-[-0.03em]">Overview</Card.Title>
              <Card.Description className="text-sm leading-7 text-muted-foreground">
                {posts.length} published posts and {tags.length} active tags.
              </Card.Description>
            </Card.Header>
            <Card.Content className="space-y-4 px-5 py-5">
              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-2">
                <div className="rounded-2xl border border-border/75 bg-muted/50 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Visible</p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    {filteredPosts.length}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/75 bg-muted/50 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Filter</p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {activeTag === "all" ? "All tags" : activeTag}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/75 bg-muted/50 px-4 py-3 sm:col-span-1 xl:col-span-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Search</p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {normalizedQuery.length === 0 ? "No query" : `“${query.trim()}”`}
                  </p>
                </div>
              </div>
            </Card.Content>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
          <div className="space-y-3">
            <label htmlFor="post-search" className="text-sm font-medium text-foreground">
              Search posts
            </label>
            <Input
              id="post-search"
              aria-label="Search posts"
              value={query}
              placeholder="Search by title or summary"
              onChange={(event) => setQuery(event.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <Button
              variant="ghost"
              className="rounded-full border border-border/80 px-4"
              onPress={() => {
                setActiveTag("all");
                setQuery("");
              }}
              isDisabled={!isFiltered}
            >
              Clear filters
            </Button>
            <p className="text-sm text-muted-foreground">
              {filteredPosts.length} result{filteredPosts.length === 1 ? "" : "s"}
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button
              variant={activeTag === "all" ? "primary" : "secondary"}
              className="rounded-full px-4"
              onPress={() => setActiveTag("all")}
            >
              All
            </Button>
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={activeTag === tag ? "primary" : "secondary"}
                className="rounded-full px-4"
                onPress={() => setActiveTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </section>

        {hasPublishedPosts ? (
          filteredPosts.length > 0 ? (
            <>
              <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {visiblePosts.map((post) => (
                  <Card
                    key={post.slug}
                    className="group h-full border border-border/80 bg-card/78 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1"
                  >
                    <Card.Header className="flex flex-col items-start gap-4 border-b border-border/70 px-6 py-6">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Button
                            key={`${post.slug}-${tag}`}
                            variant="ghost"
                            className="rounded-full border border-border/75 bg-muted/60 px-2.5 py-1 text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:border-accent/50 hover:text-foreground"
                            onPress={() => setActiveTag(tag)}
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <Card.Title className="text-2xl tracking-[-0.04em] text-foreground">
                          {post.title}
                        </Card.Title>
                        <Card.Description className="text-sm leading-7 text-muted-foreground">
                          {post.description}
                        </Card.Description>
                      </div>
                    </Card.Header>
                    <Card.Content className="flex h-full flex-col gap-6 px-6 py-6">
                      <p className="text-sm leading-7 text-foreground/88">{post.excerpt}</p>
                      <div className="mt-auto flex items-center justify-between gap-4 text-sm text-muted-foreground">
                        <div className="space-y-1">
                          <p>{dateFormatter.format(new Date(post.date))}</p>
                          <p>{post.readingTime} min read</p>
                        </div>
                        <Button
                          variant="secondary"
                          className="rounded-full border border-border/80 bg-card/70 px-4"
                          onPress={() => {
                            window.location.href = `/blog/${post.slug}`;
                          }}
                        >
                          Read post
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                ))}
              </section>

              {hasMore ? (
                <section className="flex justify-center pt-2">
                  <Button
                    variant="secondary"
                    className="rounded-full border border-border/80 px-6"
                    onPress={() => setVisibleCount((current) => current + LOAD_MORE_COUNT)}
                  >
                    Load more
                  </Button>
                </section>
              ) : null}
            </>
          ) : (
            <section>
              <Card className="border border-dashed border-border/80 bg-card/70 backdrop-blur-xl">
                <Card.Header className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                  <Card.Title className="text-2xl tracking-[-0.04em] text-foreground">
                    No posts found
                  </Card.Title>
                  <Card.Description className="max-w-xl text-sm leading-7 text-muted-foreground">
                    Try another tag or clear the search to see more writing.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="flex justify-center px-6 pb-10">
                  <Button
                    variant="secondary"
                    className="rounded-full border border-border/80 px-6"
                    onPress={() => {
                      setActiveTag("all");
                      setQuery("");
                    }}
                  >
                    Reset view
                  </Button>
                </Card.Content>
              </Card>
            </section>
          )
        ) : (
          <section>
            <Card className="border border-dashed border-border/80 bg-card/70 backdrop-blur-xl">
              <Card.Header className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                <Card.Title className="text-2xl tracking-[-0.04em] text-foreground">
                  No published posts yet
                </Card.Title>
                <Card.Description className="max-w-xl text-sm leading-7 text-muted-foreground">
                  Publish the first post to start building the archive.
                </Card.Description>
              </Card.Header>
            </Card>
          </section>
        )}
      </div>
    </main>
  );
}
