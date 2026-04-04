"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button, Chip } from "@heroui/react";
import { createSearchLookup, matchesBlogSearch } from "@/lib/blog-search";
import { formatPostDate } from "@/lib/format";
import { useTranslations } from "next-intl";
import type { BlogSearchEntry, PostSummary } from "@/types/post";

const INITIAL_VISIBLE_POSTS = 6;
const LOAD_MORE_COUNT = 6;

type PostListProps = {
  posts: PostSummary[];
  tags: string[];
  searchIndex: BlogSearchEntry[];
};

function FilterButton({
  active,
  children,
  onPress,
  muted = false,
}: {
  active?: boolean;
  children: React.ReactNode;
  onPress: () => void;
  muted?: boolean;
}) {
  return (
    <Button
      variant={active ? "primary" : "outline"}
      onPress={onPress}
      className={[
        "rounded-full px-4 text-sm",
        !active ? "border-border/70 bg-card/70 text-foreground hover:border-border hover:bg-muted/70" : "",
        muted ? "text-muted-foreground" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Button>
  );
}

export function PostList({ posts, tags, searchIndex }: PostListProps) {
  const t = useTranslations();
  const [activeTag, setActiveTag] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_POSTS);

  const normalizedQuery = query.trim().toLowerCase();

  const searchLookup = useMemo(() => createSearchLookup(searchIndex), [searchIndex]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = activeTag === "all" || post.tags.includes(activeTag);
      const haystack = searchLookup.get(post.slug) ?? "";
      const matchesQuery = matchesBlogSearch(haystack, normalizedQuery);

      return matchesTag && matchesQuery;
    });
  }, [activeTag, normalizedQuery, posts, searchLookup]);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_POSTS);
  }, [activeTag, normalizedQuery]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;
  const isFiltered = activeTag !== "all" || normalizedQuery.length > 0;

  const resultText = filteredPosts.length === 1 ? t("blog.results") : t("blog.resultsPlural");

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl px-6 py-20 sm:px-10">
      <div className="w-full space-y-12">
        <div className="fade-in space-y-4">
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-foreground sm:text-5xl">{t("blog.title")}</h1>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            {t("blog.subtitle")}
          </p>
        </div>

        <div className="fade-in fade-in-delay-1 space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-md space-y-2">
              <Input
                aria-label={t("blog.searchPlaceholder")}
                value={query}
                placeholder={t("blog.searchPlaceholder")}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                {filteredPosts.length} {resultText}
                {normalizedQuery ? (
                  <>
                    {" "}{t("blog.for")} <span className="font-medium text-foreground">&ldquo;{query.trim()}&rdquo;</span>
                  </>
                ) : null}
                {activeTag !== "all" ? (
                  <>
                    {" "}{t("blog.in")} <span className="font-medium text-foreground">{activeTag}</span>
                  </>
                ) : null}
              </p>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
              {t("blog.searchHint")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip
              size="sm"
              variant={activeTag === "all" ? "solid" : "flat"}
              color={activeTag === "all" ? "primary" : "default"}
              className="cursor-pointer select-none transition-transform active:scale-95"
              onPress={() => setActiveTag("all")}
            >
              {t("blog.all")}
            </Chip>
            {tags.map((tag) => (
              <Chip
                key={tag}
                size="sm"
                variant={activeTag === tag ? "solid" : "flat"}
                color={activeTag === tag ? "primary" : "default"}
                className="cursor-pointer select-none transition-transform active:scale-95"
                onPress={() => setActiveTag(tag)}
              >
                {tag}
              </Chip>
            ))}
            {isFiltered ? (
              <Chip
                size="sm"
                variant="flat"
                className="cursor-pointer select-none text-muted-foreground transition-transform active:scale-95"
                onPress={() => {
                  setActiveTag("all");
                  setQuery("");
                }}
              >
                {t("blog.clear")}
              </Chip>
            ) : null}
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="fade-in rounded-2xl border border-dashed border-border/60 py-20 text-center">
            <p className="text-muted-foreground">{t("blog.noPosts")}</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <Card className="fade-in rounded-[28px] border border-dashed border-border/60 bg-card/50 px-6 py-16 text-center shadow-[0_24px_80px_-40px_var(--shadow)]">
            <Card.Content className="mx-auto max-w-md space-y-3 p-0">
              <p className="text-sm font-medium tracking-[0.22em] text-muted-foreground uppercase">{t("blog.noMatches")}</p>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{t("blog.nothingFound")}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t("blog.tryBroader")}
              </p>
              <div className="pt-3">
                <Button
                  variant="outline"
                  className="rounded-full border-border/70 bg-card/80 px-5 py-2.5 text-sm font-medium text-foreground hover:border-border hover:bg-muted/70"
                  onPress={() => {
                    setActiveTag("all");
                    setQuery("");
                  }}
                >
                  {t("blog.clearFilters")}
                </Button>
              </div>
            </Card.Content>
          </Card>
        ) : (
          <>
            <div className="grid gap-y-12 gap-x-12 lg:grid-cols-2">
              {visiblePosts.map((post) => (
                <article key={post.slug} className="group relative flex flex-col items-start">
                  <Link href={`/blog/${post.slug}`} className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50" />
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Chip
                          key={tag}
                          size="sm"
                          variant="flat"
                          className="bg-zinc-100 text-[10px] font-medium tracking-wider text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                        >
                          {tag}
                        </Chip>
                      ))}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                        {post.title}
                      </h2>
                      <time className="relative z-10 order-first mb-1 flex items-center gap-2 pl-3.5 text-sm text-zinc-400 dark:text-zinc-500">
                        <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                        </span>
                        {formatPostDate(post.date)} <span className="text-zinc-300 dark:text-zinc-600">·</span> {post.readingTime} min
                      </time>
                      <p className="relative z-10 mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {post.description}
                      </p>
                      <div className="relative z-10 mt-2 flex items-center text-sm font-medium text-teal-500">
                        Read article
                        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-1 h-4 w-4 stroke-current">
                          <path d="M6.75 5.75 9.25 8l-2.5 2.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {hasMore ? (
              <div className="flex justify-center">
                <Button
                  variant="faded"
                  className="rounded-full px-8 text-sm font-medium text-foreground"
                  onPress={() => setVisibleCount((count) => count + LOAD_MORE_COUNT)}
                >
                  {t("blog.loadMore")}
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}
