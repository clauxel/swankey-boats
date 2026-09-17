import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.productModel} electric jet bass boat`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #070d12 0%, #0b1f2a 48%, #0f766e 160%)",
          color: "#e8eef2",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#67e8f9" }}>
            HUANQI INNOVATION · SWANKEY.BOATS
          </div>
          <div style={{ fontSize: 64, fontWeight: 650, lineHeight: 1.05, maxWidth: 920 }}>
            A New Electric Jet Bass Boat for Shallow Water
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <span>HQ E498 · 4.98 m class</span>
          <span>{site.brandSlogan}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
