import type { Industry } from "@/lib/industries";

/**
 * IndustryInfographic - the sector at a glance, as one graphic.
 *
 * A summary, not a second copy of the flow diagram. The diagram below it
 * follows each activity through its actors; this shows the shape of the whole
 * estate in one look: one body of personal data, branching into activities
 * that each have their own lawful basis and their own answer to "when does
 * this have to go".
 *
 * That branching IS the point the page argues. Lawful basis and erasure attach
 * to a purpose, not to a data category, so the same phone number sits under
 * three branches with three different erasure answers. A picture makes that
 * obvious faster than the table does.
 *
 *        PERSONAL DATA YOU HOLD
 *                  |
 *      +-----+-----+-----+-----+
 *      |     |     |     |
 *   Fulfil Market Dormant Rights      <- activity, with its provision
 *    § 6    § 6   § 8(7)  § 11
 *      |     |     |     |
 *   purpose  on   3 yrs  n/a          <- when it must go
 *   served  w/drawal
 *
 * Inline SVG rather than a raster: the text is real text, so it is crawlable
 * and stays sharp at any zoom; colours come from the same tokens as the rest
 * of the site, so it follows the theme; and because it is generated from the
 * activity data, a provision change updates the graphic instead of quietly
 * leaving it wrong. The downloadable PNG at ./infographic is built from the
 * same source for the same reason.
 */

const W = 1000;
const H = 430;

/** Colour per phase, so the branches read as a programme, not a list. */
const PHASE_FILL: Record<string, string> = {
  foundation: "var(--color-primary-text)",
  operationalise: "var(--color-text-secondary)",
  governance: "var(--color-text-muted)",
};

/** Wrap a label to a fixed character budget; SVG text does not wrap itself. */
function wrap(text: string, max: number, lines: number): string[] {
  const words = text.split(" ");
  const out: string[] = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > max) {
      out.push(line.trim());
      line = word;
      if (out.length === lines - 1) break;
    } else {
      line = (line + " " + word).trim();
    }
  }
  const rest = words.slice(out.join(" ").split(" ").filter(Boolean).length).join(" ");
  out.push(out.length === lines - 1 ? rest : line);
  return out.slice(0, lines).filter(Boolean);
}

export function IndustryInfographic({ industry }: { industry: Industry }) {
  const acts = industry.activities.slice(0, 5);
  const n = acts.length;

  const colW = (W - 120) / n;
  const x = (i: number) => 60 + colW * i + colW / 2;

  const rootY = 96;
  const boxY = 176;
  const boxH = 104;
  const tailY = boxY + boxH + 34;

  return (
    <figure className="m-0 flex flex-col gap-[12px]">
      {/*
       * Own scroll container, matching `diagrams.tsx`. A 1000-wide viewBox
       * scaled into a 350px phone renders 14px labels at about 5px, so it
       * keeps a legible minimum width and scrolls inside its own box instead.
       * `body` has `overflow-x-hidden`, so the scroller has to live here or the
       * graphic would simply be clipped. Everything it shows is also on the
       * page as text: the callouts, the table and the reflowing flow diagram.
       */}
      <div className="overflow-x-auto rounded-lg border border-border bg-surface p-[clamp(12px,2vw,20px)]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          className="min-w-[720px]"
          role="img"
          aria-label={`${industry.name}: one body of personal data branching into ${n} processing activities, each with its own lawful basis and erasure trigger`}
        >
          {/* Sector line */}
          <text
            x="60"
            y="34"
            fontSize="19"
            fontWeight="600"
            fill="var(--color-text)"
          >
            {industry.name}
          </text>
          <text
            x={W - 60}
            y="34"
            fontSize="13"
            textAnchor="end"
            letterSpacing="1.2"
            fill="var(--color-primary-text)"
          >
            {/* Not uppercased: "§ 17(1)(f)" would become "§ 17(1)(F)", and the
                case of a sub-clause letter is part of the citation. */}
            {industry.eyebrow}
          </text>
          <line
            x1="60"
            y1="52"
            x2={W - 60}
            y2="52"
            stroke="var(--color-border)"
          />

          {/* Root: the one body of data */}
          <rect
            x={W / 2 - 150}
            y={rootY - 26}
            width="300"
            height="40"
            rx="6"
            fill="var(--color-primary-tint)"
            stroke="var(--color-primary-text)"
          />
          <text
            x={W / 2}
            y={rootY}
            fontSize="14"
            fontWeight="600"
            textAnchor="middle"
            fill="var(--color-primary-text)"
          >
            The personal data you hold
          </text>

          {/* Branch lines: root down, across, then into each activity */}
          <path
            d={`M ${W / 2} ${rootY + 14} V ${boxY - 30}`}
            stroke="var(--color-border-strong)"
            fill="none"
          />
          <path
            d={`M ${x(0)} ${boxY - 30} H ${x(n - 1)}`}
            stroke="var(--color-border-strong)"
            fill="none"
          />

          {acts.map((activity, i) => {
            const cx = x(i);
            const fill = PHASE_FILL[activity.phase] ?? "var(--color-text)";
            return (
              <g key={activity.name}>
                <path
                  d={`M ${cx} ${boxY - 30} V ${boxY}`}
                  stroke="var(--color-border-strong)"
                  fill="none"
                />

                <rect
                  x={cx - colW / 2 + 10}
                  y={boxY}
                  width={colW - 20}
                  height={boxH}
                  rx="6"
                  fill="var(--color-canvas)"
                  stroke="var(--color-border)"
                />
                {/* Phase stripe: the colour carries which phase the control sits in. */}
                <rect
                  x={cx - colW / 2 + 10}
                  y={boxY}
                  width="3"
                  height={boxH}
                  rx="1.5"
                  fill={fill}
                />

                {wrap(activity.name, 20, 2).map((line, li) => (
                  <text
                    key={li}
                    x={cx}
                    y={boxY + 28 + li * 18}
                    fontSize="14"
                    fontWeight="600"
                    textAnchor="middle"
                    fill="var(--color-text)"
                  >
                    {line}
                  </text>
                ))}

                <text
                  x={cx}
                  y={boxY + 74}
                  fontSize="13"
                  fontWeight="600"
                  textAnchor="middle"
                  fill="var(--color-primary-text)"
                >
                  {activity.ground.ref}
                </text>
                <text
                  x={cx}
                  y={boxY + 92}
                  fontSize="11.5"
                  textAnchor="middle"
                  fill="var(--color-text-muted)"
                >
                  {activity.flow.length} systems touch it
                </text>

                {/* Tail: the erasure answer, which differs per branch. */}
                <path
                  d={`M ${cx} ${boxY + boxH} V ${tailY - 16}`}
                  stroke="var(--color-border-strong)"
                  strokeDasharray="3 3"
                  fill="none"
                />
                <text
                  x={cx}
                  y={tailY}
                  fontSize="12"
                  fontWeight="600"
                  textAnchor="middle"
                  fill="var(--color-text-secondary)"
                >
                  {activity.retention.ref}
                </text>
              </g>
            );
          })}

          {/* Thresholds band */}
          <line
            x1="60"
            y1={H - 74}
            x2={W - 60}
            y2={H - 74}
            stroke="var(--color-border)"
          />
          {industry.thresholds.slice(0, 3).map((t, i) => {
            const bx = 60 + ((W - 120) / 3) * i + 4;
            return (
              <g key={t.label}>
                <text
                  x={bx}
                  y={H - 44}
                  fontSize="21"
                  fontWeight="700"
                  fill="var(--color-primary-text)"
                >
                  {t.value}
                </text>
                <text
                  x={bx}
                  y={H - 24}
                  fontSize="12"
                  fill="var(--color-text-secondary)"
                >
                  {wrap(t.label, 38, 1)[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-[10px] text-[13px] leading-[1.7] text-text-muted">
        <span className="max-w-[62ch]">
        One body of personal data, {n} activities, {n} different answers to when
        it has to go. That is why the table below has a row per activity rather
        than per data type.
        </span>
        <a
          href={`/implementation/${industry.slug}/infographic`}
          download={`dpdp-${industry.slug}-infographic.png`}
          className="shrink-0 text-primary-text underline"
        >
          Download as PNG
        </a>
      </figcaption>
    </figure>
  );
}
