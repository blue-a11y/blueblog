import type { BlogSearchEntry } from "@/types/post";

export function buildSearchText(entry: BlogSearchEntry) {
  return `${entry.title}\n${entry.description}\n${entry.excerpt}\n${entry.tags.join(" ")}`.toLowerCase();
}

export function createSearchLookup(entries: BlogSearchEntry[]) {
  return new Map(entries.map((entry) => [entry.slug, buildSearchText(entry)]));
}

export function matchesBlogSearch(haystack: string, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  return normalizedQuery.length === 0 || haystack.includes(normalizedQuery);
}
