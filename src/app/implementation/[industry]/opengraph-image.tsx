import { ImageResponse } from "next/og";

import { getIndustry, isIndustrySlug } from "@/lib/industries";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social cards, one per industry.
 *
 * These are metadata, not page content: they appear when someone pastes the
 * link into WhatsApp, Slack or LinkedIn and never render in the document. The
 * on-page visuals are the flow diagram and the threshold callouts.
 *
 * `generateImageMetadata` exists here so each card gets its own `alt` text.
 * A dynamic route can otherwise only export one static `alt` shared by all
 * nine, which would describe eight of them wrongly.
 * See node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-image-metadata.md
 */
export function generateImageMetadata({
  params,
}: {
  params: { industry: string };
}) {
  const industry = isIndustrySlug(params.industry)
    ? getIndustry(params.industry)
    : undefined;
  return [
    {
      id: "card",
      size,
      contentType,
      alt: industry
        ? `${industry.metaTitle} - ${SITE_NAME}`
        : `${SITE_NAME} industry guide`,
    },
  ];
}

export default async function IndustryOgImage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const industry = isIndustrySlug(slug) ? getIndustry(slug) : undefined;
  const headline = industry?.thresholds[0];

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
          padding: "68px 76px",
          border: "20px solid #B4321A",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#B4321A",
            }}
          >
            {industry?.eyebrow ?? "DPDP Act implementation"}
          </div>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.06,
              letterSpacing: -2,
              color: "#14140F",
              fontFamily: "serif",
              maxWidth: 960,
            }}
          >
            {industry?.metaTitle ?? "DPDP Act by industry"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          {/* Satori needs an explicit display on any node with >1 child. */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 40, color: "#B4321A", fontFamily: "serif" }}>
              {headline?.value ?? ""}
            </div>
            <div style={{ fontSize: 22, color: "#4A4A42" }}>
              {headline?.label ?? ""}
            </div>
          </div>
          <div style={{ fontSize: 26, color: "#14140F" }}>{SITE_NAME}</div>
        </div>
      </div>
    ),
    size,
  );
}
