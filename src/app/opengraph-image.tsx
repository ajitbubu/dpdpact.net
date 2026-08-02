import { ImageResponse } from "next/og";

export const alt = "DPDP Academy — Know the law. Prove it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default social card, in the Bulletin palette. Tokens are inlined as literals
 * because `ImageResponse` renders in an isolated Satori context with no access
 * to the stylesheet or CSS variables.
 */
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
          background: "#F5F5F2",
          padding: "72px 80px",
          border: "20px solid #B4321A",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#B4321A",
            }}
          >
            India · Act No. 22 of 2023
          </div>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#14140F",
              fontFamily: "serif",
              maxWidth: 940,
            }}
          >
            Learn the Data Protection Act, Certify It Today
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Satori needs an explicit display on any node with >1 child. */}
            <div
              style={{
                display: "flex",
                fontSize: 40,
                color: "#14140F",
                fontFamily: "serif",
              }}
            >
              <span>DPDP</span>
              <span style={{ color: "#B4321A" }}>Academy</span>
            </div>
            <div style={{ fontSize: 24, letterSpacing: 4, color: "#4A483F" }}>
              KNOW THE LAW. PROVE IT.
            </div>
          </div>
          <div style={{ display: "flex", gap: 40, color: "#4A483F", fontSize: 26 }}>
            <div style={{ display: "flex" }}>9 Chapters</div>
            <div style={{ display: "flex" }}>44 Sections</div>
            <div style={{ display: "flex", color: "#B4321A" }}>Free exam</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
