import { getBlogSearchIndex } from "@/lib/search";

export const revalidate = 3600;

export async function GET() {
  const index = await getBlogSearchIndex();

  return Response.json(
    {
      generatedAt: new Date().toISOString(),
      total: index.length,
      items: index,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
