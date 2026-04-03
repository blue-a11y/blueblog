import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} twitter image`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
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
            "linear-gradient(160deg, #08111f 0%, #0f1f38 45%, #142947 100%)",
          color: "#f8fbff",
          padding: "72px",
          fontFamily: "Geist, Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px", fontSize: 28, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(248,251,255,0.68)" }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              border: "1px solid rgba(248,251,255,0.16)",
              background: "rgba(248,251,255,0.08)",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            B
          </div>
          BlueBlog
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: 900 }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, fontWeight: 700, letterSpacing: "-0.06em" }}>
            Frontend systems that stay sharp without getting loud.
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.45, color: "rgba(248,251,255,0.76)", maxWidth: 760 }}>
            {siteConfig.shortDescription}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "rgba(248,251,255,0.6)" }}>
          <div>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
          <div>@zhangxuan</div>
        </div>
      </div>
    ),
    size,
  );
}
