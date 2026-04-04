import { getPostSummaries } from "@/lib/posts";
import { getSiteUrl, siteConfig } from "@/lib/site";

export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatRssDate(date: string) {
  return new Date(`${date}T00:00:00.000Z`).toUTCString();
}

export async function GET() {
  const posts = await getPostSummaries();
  const lastBuildDate = posts[0]?.date ? formatRssDate(posts[0].date) : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = getSiteUrl(`/blog/${post.slug}`);
      const description = `${post.description} Estimated reading time: ${post.readingTime} min.`;
      const categories = post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("");

      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${formatRssDate(post.date)}</pubDate>
  <description><![CDATA[${description}]]></description>
  ${categories}
</item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(siteConfig.name)}</title>
  <description>${escapeXml(siteConfig.description)}</description>
  <link>${siteConfig.url}</link>
  <language>en-us</language>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
  <ttl>60</ttl>
  <atom:link href="${getSiteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
