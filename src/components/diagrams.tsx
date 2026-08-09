import { CONTENT_UPDATED } from "@/lib/site";

/**
 * Inline SVG diagrams.
 *
 * Inline rather than `<img>` on purpose: no extra request, the labels stay in
 * the DOM where a crawler and a screen reader can both read them, and every
 * colour resolves through the site's own tokens so the diagrams follow the
 * theme instead of being baked bitmaps that drift from it.
 *
 * Each is wrapped in a horizontally scrollable frame. An SVG squeezed into a
 * 360px phone would render 13px labels at about five pixels; letting the frame
 * scroll keeps the type legible, and matches how the wide tables on this site
 * already behave.
 */
function Frame({
  children,
  minWidth,
  caption,
}: {
  children: React.ReactNode;
  minWidth: number;
  caption: string;
}) {
  return (
    <figure className="m-0 flex flex-col gap-[12px]">
      <div className="overflow-x-auto rounded-lg border border-border bg-surface p-[clamp(14px,2.4vw,24px)]">
        <div style={{ minWidth }}>{children}</div>
      </div>
      <figcaption className="text-[13px] leading-[1.7] text-text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

const LABEL = { fontSize: 12.5, fontWeight: 600 } as const;
const BODY = { fontSize: 11.5 } as const;

/* ------------------------------------------------------------------ */

/** The three commencement tranches, with a marker for the current date. */
export function CommencementTimeline() {
  const stops = [
    {
      x: 120,
      date: "13 Nov 2025",
      tag: "On publication",
      colour: "var(--color-safe)",
      lines: [
        "Board established (§§ 18–26)",
        "Rule-making, interpretation",
        "§ 44(1) TRAI · § 44(3) RTI",
      ],
    },
    {
      x: 430,
      date: "13 Nov 2026",
      tag: "+ 12 months",
      colour: "var(--color-warning)",
      lines: [
        "Consent Manager registration",
        "§ 6(9) · Rule 4",
        "§ 27(1)(d) Board power",
      ],
    },
    {
      x: 740,
      date: "13 May 2027",
      tag: "+ 18 months",
      colour: "var(--color-critical)",
      lines: [
        "§§ 3–17 · §§ 28–34 · § 37",
        "§ 44(2): IT Act § 43A omitted",
        "SPDI Rules, 2011 fall away",
      ],
    },
  ];

  return (
    <Frame
      minWidth={860}
      caption={`Commencement of the DPDP Act, 2023 and the DPDP Rules, 2025. Position of the “today” marker reflects the content review date, ${CONTENT_UPDATED}.`}
    >
      <svg
        viewBox="0 0 860 250"
        width="100%"
        height="auto"
        role="img"
        aria-labelledby="tl-title tl-desc"
      >
        <title id="tl-title">DPDP commencement timeline</title>
        <desc id="tl-desc">
          Three tranches. On 13 November 2025 the Data Protection Board,
          rule-making powers and the amendments to the TRAI and Right to
          Information Acts came into force. Twelve months later, on 13 November
          2026, Consent Manager registration under section 6(9) and Rule 4
          begins. Eighteen months after publication, in mid-May 2027, sections 3
          to 17 and 28 to 34 commence, along with section 44(2), which omits
          section 43A of the Information Technology Act and ends the SPDI Rules,
          2011.
        </desc>

        <line
          x1="60"
          y1="96"
          x2="800"
          y2="96"
          stroke="var(--color-border-strong)"
          strokeWidth="2"
        />

        {/* today marker: between the first and second tranche */}
        <g>
          <line
            x1="275"
            y1="70"
            x2="275"
            y2="122"
            stroke="var(--color-text-muted)"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <text
            x="275"
            y="60"
            textAnchor="middle"
            fill="var(--color-text-muted)"
            style={BODY}
          >
            today
          </text>
        </g>

        {stops.map((s) => (
          <g key={s.date}>
            <circle cx={s.x} cy="96" r="9" fill={s.colour} />
            <circle cx={s.x} cy="96" r="15" fill={s.colour} opacity="0.18" />
            <text
              x={s.x}
              y="42"
              textAnchor="middle"
              fill="var(--color-text)"
              style={{ fontSize: 14, fontWeight: 700 }}
            >
              {s.date}
            </text>
            <text
              x={s.x}
              y="61"
              textAnchor="middle"
              fill={s.colour}
              style={{ ...BODY, fontWeight: 600 }}
            >
              {s.tag}
            </text>
            {s.lines.map((line, i) => (
              <text
                key={line}
                x={s.x}
                y={135 + i * 19}
                textAnchor="middle"
                fill="var(--color-text-secondary)"
                style={BODY}
              >
                {line}
              </text>
            ))}
          </g>
        ))}

        <text
          x="60"
          y="228"
          fill="var(--color-text-muted)"
          style={{ fontSize: 11 }}
        >
          Rules published 13 November 2025. Tranches run one year and eighteen
          months from that date.
        </text>
      </svg>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */

/** Notice → consent → processing → withdrawal → erasure, with the § 6(7) route. */
export function ConsentLifecycle() {
  const box = (
    x: number,
    y: number,
    w: number,
    title: string,
    ref: string,
    accent = false,
  ) => (
    <g key={title + ref}>
      <rect
        x={x}
        y={y}
        width={w}
        height="58"
        rx="8"
        fill={accent ? "var(--color-primary-tint)" : "var(--color-canvas)"}
        stroke={accent ? "var(--color-primary-text)" : "var(--color-border)"}
        strokeWidth={accent ? 1.6 : 1.2}
      />
      <text
        x={x + w / 2}
        y={y + 25}
        textAnchor="middle"
        fill="var(--color-text)"
        style={LABEL}
      >
        {title}
      </text>
      <text
        x={x + w / 2}
        y={y + 43}
        textAnchor="middle"
        fill="var(--color-primary-text)"
        style={{ ...BODY, fontWeight: 600 }}
      >
        {ref}
      </text>
    </g>
  );

  const arrow = (x1: number, y1: number, x2: number, y2: number) => (
    <line
      key={`${x1}-${y1}-${x2}-${y2}`}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="var(--color-border-strong)"
      strokeWidth="1.6"
      markerEnd="url(#arrowhead)"
    />
  );

  return (
    <Frame
      minWidth={880}
      caption="The consent lifecycle under sections 5 to 8. Withdrawal is not the end of the obligation — it starts the erasure path, and that path reaches your processors too."
    >
      <svg
        viewBox="0 0 880 330"
        width="100%"
        height="auto"
        role="img"
        aria-labelledby="cl-title cl-desc"
      >
        <title id="cl-title">DPDP consent lifecycle</title>
        <desc id="cl-desc">
          A notice under section 5 precedes the consent request under section 6.
          Consent may be given directly or routed through a Consent Manager
          under section 6(7). Processing then proceeds under section 4. Consent
          can be withdrawn at any time under section 6(4), on which processing
          must cease under section 6(6). Erasure follows under section 8(7)(a),
          either on withdrawal or once the purpose is deemed no longer served
          under section 8(8), and the Data Fiduciary must cause its processors
          to erase under section 8(7)(b).
        </desc>

        <defs>
          <marker
            id="arrowhead"
            markerWidth="9"
            markerHeight="7"
            refX="8"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 9 3.5, 0 7" fill="var(--color-border-strong)" />
          </marker>
        </defs>

        {box(30, 40, 150, "Notice", "§ 5 · Rule 3")}
        {arrow(180, 69, 218, 69)}
        {box(222, 40, 150, "Consent", "§ 6(1)", true)}
        {arrow(372, 69, 410, 69)}
        {box(414, 40, 150, "Processing", "§ 4")}

        {/* consent manager side route */}
        {box(222, 150, 150, "Consent Manager", "§ 6(7)–(9)")}
        <line
          x1="297"
          y1="98"
          x2="297"
          y2="150"
          stroke="var(--color-border-strong)"
          strokeWidth="1.4"
          strokeDasharray="5 4"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="308"
          y="128"
          fill="var(--color-text-muted)"
          style={{ fontSize: 11 }}
        >
          her choice
        </text>

        {/* withdrawal path */}
        {box(414, 150, 150, "Withdrawal", "§ 6(4)")}
        <line
          x1="489"
          y1="98"
          x2="489"
          y2="150"
          stroke="var(--color-border-strong)"
          strokeWidth="1.6"
          markerEnd="url(#arrowhead)"
        />
        {arrow(564, 179, 602, 179)}
        {box(606, 150, 150, "Cease processing", "§ 6(6)")}

        {/* erasure */}
        {box(606, 250, 150, "Erase", "§ 8(7)(a)", true)}
        <line
          x1="681"
          y1="208"
          x2="681"
          y2="250"
          stroke="var(--color-border-strong)"
          strokeWidth="1.6"
          markerEnd="url(#arrowhead)"
        />
        {box(390, 250, 190, "Processor must erase", "§ 8(7)(b)")}
        <line
          x1="606"
          y1="279"
          x2="584"
          y2="279"
          stroke="var(--color-border-strong)"
          strokeWidth="1.6"
          markerEnd="url(#arrowhead)"
        />

        {/* inactivity route into erasure */}
        {box(30, 250, 200, "Purpose deemed served", "§ 8(8) · § 8(11)")}
        <line
          x1="230"
          y1="279"
          x2="386"
          y2="279"
          stroke="var(--color-border-strong)"
          strokeWidth="1.4"
          strokeDasharray="5 4"
          markerEnd="url(#arrowhead)"
        />

        <text
          x="30"
          y="322"
          fill="var(--color-text-muted)"
          style={{ fontSize: 11 }}
        >
          Dashed routes are alternatives, not additional steps.
        </text>
      </svg>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */

/** How a breach becomes a number: § 8(6) through § 33(2). */
export function PenaltyPath() {
  const node = (
    x: number,
    y: number,
    w: number,
    title: string,
    ref: string,
    tone: "plain" | "stop" | "go" = "plain",
  ) => {
    const stroke =
      tone === "stop"
        ? "var(--color-safe)"
        : tone === "go"
          ? "var(--color-critical)"
          : "var(--color-border)";
    return (
      <g key={title + ref}>
        <rect
          x={x}
          y={y}
          width={w}
          height="54"
          rx="8"
          fill="var(--color-canvas)"
          stroke={stroke}
          strokeWidth={tone === "plain" ? 1.2 : 1.6}
        />
        <text
          x={x + w / 2}
          y={y + 23}
          textAnchor="middle"
          fill="var(--color-text)"
          style={LABEL}
        >
          {title}
        </text>
        <text
          x={x + w / 2}
          y={y + 40}
          textAnchor="middle"
          fill={tone === "plain" ? "var(--color-primary-text)" : stroke}
          style={{ ...BODY, fontWeight: 600 }}
        >
          {ref}
        </text>
      </g>
    );
  };

  return (
    <Frame
      minWidth={900}
      caption="From breach to penalty. Two exits close the matter without any penalty at all, and the amount is set by the seven factors in section 33(2) — the Schedule only caps it."
    >
      <svg
        viewBox="0 0 900 440"
        width="100%"
        height="auto"
        role="img"
        aria-labelledby="pp-title pp-desc"
      >
        <title id="pp-title">How a DPDP breach becomes a penalty</title>
        <desc id="pp-desc">
          A personal data breach triggers notification to the Board and to
          affected Data Principals under section 8(6). That notification is
          itself an intake route under section 27(1)(a). The Board then decides
          whether there are sufficient grounds under section 28(3); if not it
          closes the matter with reasons recorded under section 28(4). If it
          inquires, the matter may still end in an accepted voluntary
          undertaking under section 32, which bars further proceedings. A
          penalty follows only where the Board determines the breach is
          significant under section 33(1). The amount is then fixed against the
          seven factors in section 33(2), capped by the Schedule, and is
          appealable to the Appellate Tribunal within sixty days under section
          29.
        </desc>

        <defs>
          <marker
            id="arrow2"
            markerWidth="9"
            markerHeight="7"
            refX="8"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 9 3.5, 0 7" fill="var(--color-border-strong)" />
          </marker>
        </defs>

        {/* row 1: the event and the notification */}
        {node(40, 24, 180, "Personal data breach", "§ 2(u)")}
        <line x1="220" y1="51" x2="252" y2="51" stroke="var(--color-border-strong)" strokeWidth="1.6" markerEnd="url(#arrow2)" />
        {node(256, 24, 204, "Notify Board + principals", "§ 8(6) · Rule 7")}
        <line x1="460" y1="51" x2="492" y2="51" stroke="var(--color-border-strong)" strokeWidth="1.6" markerEnd="url(#arrow2)" />
        {node(496, 24, 184, "Board intake", "§ 27(1)(a)")}

        {/* row 2: the first filter */}
        <line x1="588" y1="78" x2="588" y2="106" stroke="var(--color-border-strong)" strokeWidth="1.6" markerEnd="url(#arrow2)" />
        {node(496, 110, 184, "Sufficient grounds?", "§ 28(3)")}
        <line x1="680" y1="137" x2="716" y2="137" stroke="var(--color-safe)" strokeWidth="1.6" markerEnd="url(#arrow2)" />
        <text x="698" y="130" textAnchor="middle" fill="var(--color-safe)" style={{ fontSize: 11, fontWeight: 600 }}>no</text>
        {node(720, 110, 164, "Closed, reasons recorded", "§ 28(4)", "stop")}

        {/* row 3: inquiry, with the undertaking exit */}
        <line x1="588" y1="164" x2="588" y2="192" stroke="var(--color-critical)" strokeWidth="1.6" markerEnd="url(#arrow2)" />
        <text x="600" y="183" fill="var(--color-critical)" style={{ fontSize: 11, fontWeight: 600 }}>yes</text>
        {node(496, 196, 184, "Inquiry", "§ 28(5)–(7)", "go")}
        <line x1="496" y1="223" x2="464" y2="223" stroke="var(--color-safe)" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#arrow2)" />
        {node(268, 196, 192, "Undertaking accepted", "§ 32 — bar", "stop")}

        {/* row 4: the significance test */}
        <line x1="588" y1="250" x2="588" y2="278" stroke="var(--color-border-strong)" strokeWidth="1.6" markerEnd="url(#arrow2)" />
        {node(496, 282, 184, "Significant breach?", "§ 33(1)")}

        {/* row 5: the amount, and the appeal */}
        <line x1="588" y1="336" x2="588" y2="364" stroke="var(--color-critical)" strokeWidth="1.6" markerEnd="url(#arrow2)" />
        <text x="600" y="355" fill="var(--color-critical)" style={{ fontSize: 11, fontWeight: 600 }}>yes</text>
        {node(430, 368, 300, "Seven factors set the amount", "§ 33(2), capped by the Schedule", "go")}
        <line x1="730" y1="395" x2="758" y2="395" stroke="var(--color-border-strong)" strokeWidth="1.6" markerEnd="url(#arrow2)" />
        {node(762, 368, 130, "Appeal: TDSAT", "§ 29 · 60 days")}

        <text x="40" y="300" fill="var(--color-text-muted)" style={{ fontSize: 11 }}>Green edges end</text>
        <text x="40" y="316" fill="var(--color-text-muted)" style={{ fontSize: 11 }}>the matter with</text>
        <text x="40" y="332" fill="var(--color-text-muted)" style={{ fontSize: 11 }}>no penalty.</text>
</svg>
    </Frame>
  );
}
