import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — remodeling and finish carpentry in ${site.location.city}, ${site.location.region}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#1d3a33",
          backgroundImage:
            "linear-gradient(rgba(242,237,226,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(242,237,226,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#f2ede2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="6" fill="#284c43" />
            <polyline points="7,17 20,8 33,17" fill="none" stroke="#d3a557" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="12,31 12,19 20,25 28,19 28,31" fill="none" stroke="#f2ede2" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, textTransform: "uppercase", color: "#d3a557" }}>
            {site.location.city}, {site.location.regionName}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>{site.shortName}</div>
          <div style={{ fontSize: 38, marginTop: 20, color: "#c9d3cc" }}>
            Kitchens · Baths · Basements · Floors · Trim · Decks · Additions
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, color: "#c9d3cc" }}>
          <span>Request an estimate</span>
          <span style={{ color: "#f2ede2", fontWeight: 700 }}>{site.phone.display}</span>
        </div>
      </div>
    ),
    size,
  );
}
