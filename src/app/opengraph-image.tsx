import { ImageResponse } from "next/og";

import { palette } from "@/content/palette";
import { site } from "@/content/site";
import { prolog } from "@/content/story";

export const alt = `${site.name}: ${prolog.headlineLead} ${prolog.headlineEmphasis}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Built at build time from the same tokens and copy as the page, so the share preview never drifts from the site.
export default function OpengraphImage() {
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
          background: palette.paper,
          color: palette.ink,
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontStyle: "italic" }}>{site.name}</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1 }}>
          <span>{prolog.headlineLead}</span>
          <span style={{ fontStyle: "italic" }}>{prolog.headlineEmphasis}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 28 }}>
          <span style={{ background: palette.ember, color: palette.ink, padding: "12px 28px", borderRadius: 999 }}>
            Unduh di Google Play
          </span>
          <span style={{ color: palette.slate }}>{prolog.kicker}</span>
        </div>
      </div>
    ),
    size,
  );
}
