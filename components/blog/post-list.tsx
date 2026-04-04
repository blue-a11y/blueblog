"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button, Card, Chip, Input } from "@heroui/react";
import { createSearchLookup, matchesBlogSearch } from "@/lib/blog-search";
import { formatPostDate } from "@/lib/format";
import { useI18n } from "@/providers/i18n-provider";
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
  const { t } = useI18n();
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
            <FilterButton active={activeTag === "all"} onPress={() => setActiveTag("all")}>{t("blog.all")}</FilterButton>
            {tags.map((tag) => (
              <FilterButton key={tag} active={activeTag === tag} onPress={() => setActiveTag(tag)}>
                {tag}
              </FilterButton>
            ))}
            {isFiltered ? (
              <FilterButton muted onPress={() => {
                setActiveTag("all");
                setQuery("");
              }}>
                {t("blog.clear")}
              </FilterButton>
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
            <div className="grid gap-5 sm:grid-cols-2">
              {visiblePosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <Card className="flex h-full rounded-[1.75rem] border border-border/60 bg-card/90 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-border hover:shadow-[0_16px_48px_-16px_var(--shadow)]">
                    <Card.Content className="flex h-full flex-col gap-4 p-6">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Chip
                            key={tag}
                            variant="soft"
                            className="rounded-full bg-muted/70 px-2.5 py-0.5 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase"
                          >
                            {tag}
                          </Chip>
                        ))}
                      </div>

                      <div className="flex flex-1 flex-col gap-2">
                        <h2 className="text-xl font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
                          {post.title}
                        </h2>
                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                      </div>

                      <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-muted-foreground">
                        <time>{formatPostDate(post.date)}</time>
                        <span>·</span>
                        <span>{post.readingTime} {t("blog.minRead")}</span>
                      </div>
                    </Card.Content>
                  </Card>
                </Link>
              ))}
            </div>

            {hasMore ? (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="rounded-full border border-border/70 bg-card/80 px-8 py-3 text-sm font-medium text-foreground transition-colors hover:border-border hover:bg-muted/70"
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
