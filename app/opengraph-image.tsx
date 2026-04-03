import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} open graph image`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage({
  searchParams,
}: {
  searchParams?: Promise<{ title?: string }>;
} = {}) {
  const { title } = (await searchParams) ?? {};
  const headline = title?.trim() || "Frontend systems, product craft, and quiet technical writing.";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at top left, rgba(135,182,255,0.28), transparent 34%), radial-gradient(circle at bottom right, rgba(109,211,183,0.22), transparent 30%), linear-gradient(135deg, #f8fbff 0%, #eef5ff 45%, #f7fbfa 100%)",
          color: "#08111f",
          padding: "72px",
          fontFamily: "Geist, Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: 28,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#52617a",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              border: "1px solid rgba(8,17,31,0.12)",
              background: "rgba(255,255,255,0.72)",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            B
          </div>
          BlueBlog
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: 900 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              borderRadius: 999,
              border: "1px solid rgba(8,17,31,0.1)",
              background: "rgba(255,255,255,0.66)",
              padding: "14px 24px",
              fontSize: 24,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#52617a",
            }}
          >
            Frontend engineer
          </div>
          <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 700, letterSpacing: "-0.06em" }}>{headline}</div>
          <div style={{ fontSize: 28, lineHeight: 1.5, color: "#425168", maxWidth: 760 }}>
            {siteConfig.shortDescription}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#52617a" }}>
          <div>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
          <div>{siteConfig.github.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    size,
  );
}
