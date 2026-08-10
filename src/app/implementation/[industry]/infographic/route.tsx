import { ImageResponse } from "next/og";

import { INDUSTRIES, getIndustry, isIndustrySlug } from "@/lib/industries";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * The industry infographic as a downloadable PNG.
 *
 * The page renders this as inline SVG, which is sharp, themed and crawlable.
 * This exists for the cases an SVG in a document cannot serve: dropping the
 * graphic into a slide deck, attaching it to a post, sending it to someone.
 *
 * Both come from the same `activities` data, so they cannot disagree about
 * what the law says. The layout is rebuilt rather than shared because
 * `ImageResponse` renders through Satori, which supports a flexbox subset and
 * not arbitrary SVG - so a single shared renderer is not available here.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ industry: industry.slug }));
}

const INK = "#14140F";
const ACCENT = "#B4321A";
const MUTED = "#6B6B60";
const LINE = "#DDDDD4";
const CANVAS = "#F5F5F2";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ industry: string }> },
) {
  const { industry: slug } = await params;
  if (!isIndustrySlug(slug)) {
    return new Response("Not found", { status: 404 });
  }
  const industry = getIndustry(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: CANVAS,
          padding: "48px 56px",
          border: `16px solid ${ACCENT}`,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderBottom: `2px solid ${LINE}`,
            paddingBottom: 16,
          }}
        >
          <div style={{ fontSize: 38, fontWeight: 700, color: INK }}>
            {industry.name}
          </div>
          <div style={{ fontSize: 19, color: ACCENT, letterSpacing: 2 }}>
            {industry.eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              color: ACCENT,
              border: `2px solid ${ACCENT}`,
              borderRadius: 8,
              padding: "12px 30px",
            }}
          >
            The personal data you hold
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 30, flex: 1 }}>
          {industry.activities.slice(0, 4).map((activity) => (
            <div
              key={activity.name}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                background: "#FFFFFF",
                border: `1px solid ${LINE}`,
                borderLeft: `5px solid ${ACCENT}`,
                borderRadius: 8,
                padding: "18px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: INK,
                  lineHeight: 1.25,
                }}
              >
                {activity.name}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 20,
                  fontWeight: 700,
                  color: ACCENT,
                  marginTop: 14,
                }}
              >
                {activity.ground.ref}
              </div>
              {/* One child, not two: Satori rejects a bare div with 2+ nodes. */}
              <div style={{ fontSize: 15, color: MUTED, marginTop: 6 }}>
                {`${activity.flow.length} systems touch it`}
              </div>
              <div
                style={{
                  fontSize: 15,
                  color: MUTED,
                  marginTop: 12,
                  lineHeight: 1.4,
                }}
              >
                {activity.purpose.length > 62
                  ? `${activity.purpose.slice(0, 59).replace(/\s+\S*$/, "")}...`
                  : activity.purpose}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 15,
                  color: MUTED,
                  marginTop: "auto",
                  borderTop: `1px solid ${LINE}`,
                  paddingTop: 10,
                }}
              >
                {`Erase: ${activity.retention.ref}`}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${LINE}`,
            marginTop: 26,
            paddingTop: 18,
          }}
        >
          {industry.thresholds.slice(0, 3).map((t) => (
            <div
              key={t.label}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <div style={{ fontSize: 32, fontWeight: 700, color: ACCENT }}>
                {t.value}
              </div>
              <div style={{ fontSize: 15, color: MUTED, marginTop: 2 }}>
                {t.label}
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ fontSize: 18, color: INK }}>{SITE_NAME}</div>
            <div style={{ fontSize: 14, color: MUTED }}>
              {SITE_URL.replace("https://", "")}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 680 },
  );
}
