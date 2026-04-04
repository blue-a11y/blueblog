/**
 * Date formatting utilities for consistent display across the app.
 */

export const postDateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});

export function formatPostDate(dateString: string): string {
  return postDateFormatter.format(new Date(dateString));
}
