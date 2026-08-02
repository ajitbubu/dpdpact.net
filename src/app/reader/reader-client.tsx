"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStored, writeStored } from "@/lib/browser-store";
import { CHAPTERS, SCHEDULE, type Block } from "@/lib/dpdpa-data";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

/** Indent per nesting depth, matching the Gazette's clause layout. */
const PAD = ["0", "24px", "48px", "70px"];
const BODY_FONT_SIZE = "15.5px";

/**
 * The dark rail re-points the Sentinel colour tokens, so every Tailwind
 * utility inside it (`text-text-secondary`, `border-border`, …) resolves to
 * the sidebar palette without a second set of classes.
 */
const RAIL_TOKENS = {
  "--color-text": "#F5F5F2",
  "--color-text-secondary": "#C9C7BE",
  "--color-text-muted": "#95938A",
  "--color-border": "#33322A",
  "--color-surface-raised": "#26251F",
  "--color-primary": "#E0704F",
  "--color-primary-text": "#E0704F",
  "--color-primary-tint": "rgba(224,112,79,.16)",
  "--color-safe": "#7FB394",
} as React.CSSProperties;

interface Page {
  kind: "sec" | "sch";
  chId: string;
  chNum: string;
  chTitle: string;
  n: string;
  heading: string;
  blocks: Block[];
  text: string;
}

interface Segment {
  t: string;
  hit: boolean;
}

function flatten(page: Omit<Page, "text">): string {
  if (page.kind === "sch") {
    return SCHEDULE.rows.map((r) => `${r.breach} ${r.penalty}`).join(" ");
  }
  const out = [page.heading];
  page.blocks.forEach((b) => {
    if (b[0] === "p") out.push(b[2]);
    else if (b[0] === "ex") out.push(b[1]);
    else if (b[0] === "ill") out.push(`${b[1]} ${b[2].join(" ")}`);
  });
  return out.join(" ");
}

/** All 44 sections in order, with the Schedule as a final page. */
const PAGES: Page[] = (() => {
  const list: Omit<Page, "text">[] = [];
  CHAPTERS.forEach((c) =>
    c.sections.forEach((s) =>
      list.push({
        kind: "sec",
        chId: c.id,
        chNum: c.num,
        chTitle: c.title,
        n: s.n,
        heading: s.heading,
        blocks: s.blocks,
      }),
    ),
  );
  list.push({
    kind: "sch",
    chId: "schedule",
    chNum: "—",
    chTitle: "The Schedule",
    n: "S",
    heading: "The Schedule",
    blocks: [],
  });
  return list.map((p) => ({ ...p, text: flatten(p) }));
})();

const TOTAL = PAGES.length;
const INDEX_OF: Record<string, number> = {};
PAGES.forEach((p, i) => {
  if (p.kind === "sec") INDEX_OF[`s${p.n}`] = i;
});

function pageKey(i: number) {
  const p = PAGES[i];
  return p.kind === "sch" ? "sch" : `s${p.n}`;
}

/** Split `text` on `q`, marking the matches so they can be highlighted. */
function segs(text: string, q: string): Segment[] {
  if (!q) return [{ t: text, hit: false }];
  const lo = text.toLowerCase();
  const ql = q.toLowerCase();
  const out: Segment[] = [];
  let i = 0;
  for (;;) {
    const j = lo.indexOf(ql, i);
    if (j < 0) {
      if (i < text.length) out.push({ t: text.slice(i), hit: false });
      break;
    }
    if (j > i) out.push({ t: text.slice(i, j), hit: false });
    out.push({ t: text.slice(j, j + q.length), hit: true });
    i = j + q.length;
  }
  return out.length ? out : [{ t: text, hit: false }];
}

function countHits(text: string, q: string): number {
  const lo = text.toLowerCase();
  const ql = q.toLowerCase();
  let n = 0;
  let i = 0;
  for (;;) {
    const j = lo.indexOf(ql, i);
    if (j < 0) break;
    n++;
    i = j + ql.length;
  }
  return n;
}

function snips(text: string, q: string, max: number) {
  const lo = text.toLowerCase();
  const ql = q.toLowerCase();
  const out: { before: string; hit: string; after: string }[] = [];
  let i = 0;
  while (out.length < max) {
    const j = lo.indexOf(ql, i);
    if (j < 0) break;
    const from = Math.max(0, j - 78);
    const to = Math.min(text.length, j + ql.length + 104);
    out.push({
      before: (from > 0 ? "… " : "") + text.slice(from, j),
      hit: text.slice(j, j + ql.length),
      after: text.slice(j + ql.length, to) + (to < text.length ? " …" : ""),
    });
    i = j + ql.length;
  }
  return out;
}

function Highlight({ parts }: { parts: Segment[] }) {
  return (
    <>
      {parts.map((g, k) =>
        g.hit ? (
          <mark
            key={k}
            className="rounded-[2px] bg-[rgba(180,50,26,.26)] px-px text-text"
          >
            {g.t}
          </mark>
        ) : (
          <React.Fragment key={k}>{g.t}</React.Fragment>
        ),
      )}
    </>
  );
}

export function ReaderClient() {
  const [q, setQ] = React.useState("");
  const [modeOverride, setModeOverride] = React.useState<
    "toc" | "search" | "read" | null
  >(null);
  const [openOverride, setOpenOverride] = React.useState<
    Record<string, boolean>
  >({});
  /**
   * In-memory position, authoritative for this session.
   *
   * `writeStored` swallows storage failures (Safari with cookies blocked, a
   * webview, a full quota), so deriving `idx` from storage alone meant `goTo`
   * could switch to read mode while `idx` stayed -1 and the pane rendered
   * empty. Storage is now a persistence layer, not the source of truth.
   */
  const [navIdx, setNavIdx] = React.useState<number | null>(null);
  const [pageScrollProgress, setPageScrollProgress] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Position and reading progress live in localStorage, so a return visit
  // resumes where the reader left off.
  const storedPos = useStored<number>("dpdpa.pos");
  const read = useStored<Record<string, boolean>>("dpdpa.read") ?? {};

  const restored =
    storedPos !== null && storedPos >= 0 && storedPos < TOTAL ? storedPos : -1;
  const idx = navIdx ?? restored;
  const mode = modeOverride ?? (idx >= 0 ? "read" : "toc");

  const goTo = React.useCallback((i: number) => {
    if (i < 0 || i >= TOTAL) return;
    setNavIdx(i);
    writeStored("dpdpa.pos", i);
    setModeOverride("read");
    setOpenOverride((prev) => ({ ...prev, [PAGES[i].chId]: true }));
    setPageScrollProgress(0);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, []);

  // `/` focuses search; arrows step through the Act while reading.
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName || "";
      if (tag === "INPUT" || tag === "TEXTAREA") {
        if (e.key === "Escape") {
          (e.target as HTMLElement).blur();
          setQ("");
          setModeOverride(idx >= 0 ? "read" : "toc");
        }
        return;
      }
      if (e.key === "/") {
        const el = document.querySelector<HTMLInputElement>("input");
        if (el) {
          e.preventDefault();
          el.focus();
        }
        return;
      }
      if (mode !== "read") return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(idx + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(idx - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, mode, goTo]);

  const trimmed = q.trim();
  const hl = trimmed.length >= 2 ? trimmed : "";
  const readCount = Object.keys(read).filter((k) => read[k]).length;
  const readLabel = `${readCount} / ${TOTAL}`;
  const page = idx >= 0 ? PAGES[idx] : null;
  const readingProgress =
    mode === "read" && idx >= 0
      ? Math.min(100, ((idx + pageScrollProgress) / TOTAL) * 100)
      : 0;

  // Include progress within the current section. Previously the header bar
  // changed only when a reader selected another section, so scrolling appeared
  // to do nothing.
  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const element = scrollRef.current;
      if (!element || mode !== "read") {
        setPageScrollProgress(0);
        return;
      }
      const maxScroll = element.scrollHeight - element.clientHeight;
      setPageScrollProgress(
        maxScroll <= 0 ? 1 : Math.min(1, element.scrollTop / maxScroll),
      );
    });
    return () => window.cancelAnimationFrame(frame);
  }, [idx, mode]);

  function toggleRead() {
    const k = pageKey(idx);
    writeStored("dpdpa.read", { ...read, [k]: !read[k] });
  }

  function resetProgress() {
    writeStored("dpdpa.read", {});
  }

  /** Chapters default to open for the section being read, or the first one. */
  function isOpen(chId: string) {
    if (chId in openOverride) return openOverride[chId];
    return page ? page.chId === chId : chId === CHAPTERS[0].id;
  }

  const results =
    mode === "search" && trimmed.length >= 2
      ? PAGES.map((p, i) => ({ p, i, n: countHits(p.text, trimmed) })).filter(
          (r) => r.n > 0,
        )
      : [];

  const crumb = (() => {
    if (mode === "search")
      return {
        top: "Search",
        main: trimmed
          ? `“${trimmed}” across 44 sections and the Schedule`
          : "Search the Act",
      };
    if (mode === "toc" || !page)
      return {
        top: "Contents",
        main: "Act No. 22 of 2023 · assented 11 August 2023",
      };
    return page.kind === "sch"
      ? { top: "The Schedule", main: "Monetary penalties for breach" }
      : {
          top: `Chapter ${page.chNum} · ${page.chTitle}`,
          main: `Section ${page.n} — ${page.heading}`,
        };
  })();

  function neighbour(i: number) {
    if (i < 0 || i >= TOTAL) return null;
    const t = PAGES[i];
    return {
      label: t.kind === "sch" ? "The Schedule" : `${t.n}. ${t.heading}`,
      sub:
        t.kind === "sch"
          ? "Penalties · section 33(1)"
          : `Chapter ${t.chNum} · ${t.chTitle}`,
    };
  }

  const prev = mode === "read" ? neighbour(idx - 1) : null;
  const next = mode === "read" ? neighbour(idx + 1) : null;
  const matchN = page && hl ? countHits(page.text, hl) : 0;
  const isRead = idx >= 0 && !!read[pageKey(idx)];

  return (
    <div className="grid h-screen grid-cols-[314px_minmax(0,1fr)] overflow-hidden font-sans text-text">
      {/* --------------------------------------------------------- Dark rail */}
      <aside
        className="flex min-h-0 flex-col bg-[#14140F]"
        style={RAIL_TOKENS}
      >
        <div className="flex flex-col gap-[16px] border-b border-border px-[22px] pb-[18px] pt-[24px]">
          <Link
            href={routes.home}
            className="flex flex-col gap-[3px] self-start no-underline"
          >
            <span className="font-display text-[17px] font-semibold leading-none tracking-[-0.02em] text-white">
              DPDP<span className="text-primary-text">Academy</span>
            </span>
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-text-muted">
              ← Back to the site
            </span>
          </Link>
          <div className="flex flex-col gap-[7px]">
            <div className="font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.15em] text-primary-text">
              Act No. 22 of 2023
            </div>
            <div className="font-display text-[19px] font-semibold leading-[1.28] tracking-[-0.015em] text-white">
              The Digital Personal Data Protection Act
            </div>
            <div className="font-sans text-[12px] leading-[1.5] text-text-muted">
              9 Chapters · 44 Sections · 1 Schedule
            </div>
          </div>
        </div>

        <div className="px-[14px] pb-[6px] pt-[14px]">
          <button
            onClick={() => {
              setModeOverride("toc");
              setQ("");
            }}
            className={cn(
              "flex w-full cursor-pointer items-center gap-[10px] rounded-[8px] border border-border px-[12px] py-[10px] text-left font-sans text-[12.5px] font-semibold leading-[1.2] text-white hover:bg-surface-raised",
              mode === "toc" ? "bg-primary-tint" : "bg-transparent",
            )}
          >
            <span className="flex w-[13px] shrink-0 flex-col gap-[2px]">
              <span className="h-[1.5px] rounded-px bg-current opacity-[0.85]" />
              <span className="h-[1.5px] rounded-px bg-current opacity-[0.85]" />
              <span className="h-[1.5px] rounded-px bg-current opacity-[0.85]" />
            </span>
            <span className="flex-1">Contents &amp; Overview</span>
          </button>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-[3px] overflow-y-auto px-[12px] pb-[18px] pt-[6px]">
          {CHAPTERS.map((c) => {
            const active =
              mode === "read" && page !== null && page.chId === c.id;
            return (
              <div key={c.id} className="flex flex-col gap-[2px]">
                <button
                  onClick={() =>
                    setOpenOverride((prev) => ({ ...prev, [c.id]: !isOpen(c.id) }))
                  }
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-[10px] rounded-[8px] border-0 px-[10px] py-[9px] text-left font-sans text-[13px] font-semibold leading-[1.35] hover:bg-surface-raised",
                    active
                      ? "bg-primary-tint text-text"
                      : "bg-transparent text-text-secondary",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-[21px] min-w-[27px] shrink-0 items-center justify-center rounded-[5px] border font-mono text-[12px] font-semibold leading-none tracking-[0.03em]",
                      active
                        ? "border-primary bg-primary text-[#14140F]"
                        : "border-[rgba(224,112,79,.45)] bg-transparent text-primary-text",
                    )}
                  >
                    {c.num}
                  </span>
                  <span className="min-w-0 flex-1">{c.title}</span>
                  <span className="shrink-0 font-mono text-[12px] font-semibold leading-none text-text-muted">
                    {c.sections.length}
                  </span>
                </button>

                {isOpen(c.id) && (
                  <div className="mx-0 mb-[7px] ml-[22px] mt-px flex flex-col gap-px border-l border-border pl-[10px]">
                    {c.sections.map((s) => {
                      const i = INDEX_OF[`s${s.n}`];
                      const on = mode === "read" && idx === i;
                      const done = !!read[`s${s.n}`];
                      return (
                        <button
                          key={s.n}
                          onClick={() => goTo(i)}
                          className={cn(
                            "flex w-full cursor-pointer items-center gap-[8px] rounded-[7px] border-0 px-[9px] py-[6px] text-left font-sans text-[12.5px] leading-[1.4] hover:bg-surface-raised",
                            on
                              ? "bg-[rgba(180,50,26,.32)] font-semibold text-text"
                              : "bg-transparent font-normal text-text-secondary",
                          )}
                        >
                          <span
                            className={cn(
                              "size-[7px] shrink-0 rounded-full",
                              done
                                ? "bg-safe"
                                : on
                                  ? "bg-primary-text"
                                  : "bg-[rgba(245,245,242,.26)]",
                            )}
                          />
                          <span
                            className={cn(
                              "min-w-[16px] shrink-0 font-mono text-[12px] font-semibold leading-none",
                              on
                                ? "text-primary-text"
                                : "text-[rgba(245,245,242,.45)]",
                            )}
                          >
                            {s.n}
                          </span>
                          <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                            {s.heading}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 flex-col gap-[9px] border-t border-border px-[20px] pb-[17px] pt-[15px]">
          <div className="flex items-baseline justify-between gap-[8px]">
            <span className="font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.12em] text-text-muted">
              Reading Progress
            </span>
            <span className="font-mono text-[12px] font-semibold leading-none text-text">
              {readLabel}
            </span>
          </div>
          <div className="h-[6px] overflow-hidden rounded-full bg-[rgba(245,245,242,.14)]">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-[320ms] ease-[cubic-bezier(.4,0,.2,1)]"
              style={{ width: `${Math.round((readCount / TOTAL) * 100)}%` }}
            />
          </div>
          <button
            onClick={resetProgress}
            className="cursor-pointer self-start border-0 bg-transparent p-0 font-sans text-[12px] font-semibold leading-[1.4] text-text-muted underline hover:text-white"
          >
            Reset progress
          </button>
        </div>
      </aside>

      {/* ------------------------------------------------------------- Main */}
      <main className="flex min-h-0 min-w-0 flex-col bg-[var(--bg-sunken)]">
        <header className="shrink-0 border-b border-border bg-surface">
          <div className="flex items-center gap-[22px] px-[32px] py-[13px]">
            <div className="flex min-w-[220px] flex-[1_1_220px] flex-col gap-[4px]">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.13em] text-primary-text">
                {crumb.top}
              </div>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap font-sans text-[15px] font-semibold leading-[1.3] text-text">
                {crumb.main}
              </div>
            </div>
            <div className="w-[min(340px,32vw)] min-w-[150px] flex-[0_1_300px]">
              <Input
                placeholder="Search sections, clauses, illustrations"
                value={q}
                onChange={(e) => {
                  const v = e.target.value;
                  setQ(v);
                  setModeOverride(v.trim() ? "search" : idx >= 0 ? "read" : "toc");
                }}
              />
            </div>
            <div className="hidden shrink-0 items-center gap-[7px] font-sans text-[12px] font-semibold leading-none text-text-muted min-[1120px]:flex">
              <span className="inline-flex h-[19px] min-w-[19px] items-center justify-center rounded-[5px] border border-b-2 border-border bg-[var(--bg-sunken)] px-[5px] font-mono text-[12px] font-semibold leading-none text-text-secondary">
                /
              </span>
              <span>search</span>
              <span className="inline-flex h-[19px] min-w-[19px] items-center justify-center rounded-[5px] border border-b-2 border-border bg-[var(--bg-sunken)] px-[5px] font-mono text-[12px] font-semibold leading-none text-text-secondary">
                ←
              </span>
              <span className="inline-flex h-[19px] min-w-[19px] items-center justify-center rounded-[5px] border border-b-2 border-border bg-[var(--bg-sunken)] px-[5px] font-mono text-[12px] font-semibold leading-none text-text-secondary">
                →
              </span>
              <span>step</span>
            </div>
          </div>
          <div
            className="h-[3px] bg-surface-raised"
            role="progressbar"
            aria-label="Overall reading position"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(readingProgress)}
          >
            <div
              className="h-full bg-primary transition-[width] duration-[300ms] ease-[cubic-bezier(.4,0,.2,1)]"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        </header>

        <div
          ref={scrollRef}
          onScroll={(event) => {
            if (mode !== "read") return;
            const element = event.currentTarget;
            const maxScroll = element.scrollHeight - element.clientHeight;
            setPageScrollProgress(
              maxScroll <= 0
                ? 1
                : Math.min(1, element.scrollTop / maxScroll),
            );
          }}
          className="min-h-0 flex-1 overflow-y-auto px-[32px] pb-[96px] pt-[30px]"
        >
          {/* --------------------------------------------------- Contents */}
          {mode === "toc" && (
            <div className="mx-auto flex max-w-[1000px] flex-col gap-[24px]">
              <div className="flex flex-col gap-[18px] rounded-[12px] border border-border bg-surface px-[38px] pb-[30px] pt-[34px] shadow-[0_1px_4px_rgba(0,0,0,.08)]">
                <div className="flex items-center gap-[10px] font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.14em] text-primary-text">
                  <span>Gazette of India · Extraordinary</span>
                  <span className="size-[4px] rounded-full bg-border" />
                  <span className="text-text-muted">Assented 11 August 2023</span>
                </div>
                <h1 className="m-0 font-display text-[38px] font-semibold leading-[1.15] tracking-[-0.028em] text-text [text-wrap:pretty]">
                  The Digital Personal Data Protection Act, 2023
                </h1>
                <p className="m-0 max-w-[74ch] font-sans text-[16px] font-normal leading-[1.7] text-text-secondary [text-wrap:pretty]">
                  An Act to provide for the processing of digital personal data
                  in a manner that recognises both the right of individuals to
                  protect their personal data and the need to process such
                  personal data for lawful purposes and for matters connected
                  therewith or incidental thereto.
                </p>
                <p className="m-0 font-sans text-[14px] font-normal italic leading-[1.7] text-text-muted">
                  Be it enacted by Parliament in the Seventy-fourth Year of the
                  Republic of India as follows:—
                </p>
                <div className="flex flex-wrap gap-[10px] pt-[4px]">
                  {["9 Chapters", "44 Sections", "1 Schedule of penalties"].map(
                    (chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center gap-[7px] rounded-full border border-border bg-[var(--bg-sunken)] px-[13px] py-[7px] font-sans text-[12px] font-semibold leading-none text-text-secondary"
                      >
                        {chip}
                      </span>
                    ),
                  )}
                  <span className="inline-flex items-center gap-[7px] rounded-full border border-[rgba(180,50,26,.24)] bg-[rgba(180,50,26,.07)] px-[13px] py-[7px] font-sans text-[12px] font-semibold leading-none text-primary-text">
                    {readLabel} read
                  </span>
                </div>
                <div className="flex flex-wrap gap-[12px] pt-[6px]">
                  <Button
                    variant="primary"
                    onClick={() => goTo(idx > 0 ? idx : 0)}
                  >
                    {idx > 0
                      ? `Resume at section ${PAGES[idx].n}`
                      : "Start reading — Section 1"}
                  </Button>
                  <Button variant="secondary" onClick={() => goTo(TOTAL - 1)}>
                    Jump to the Schedule
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-[12px]">
                <div className="font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.13em] text-text-muted">
                  Chapters
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(302px,1fr))] gap-[16px]">
                  {CHAPTERS.map((c) => {
                    const readIn = c.sections.filter(
                      (s) => read[`s${s.n}`],
                    ).length;
                    return (
                      <button
                        key={c.id}
                        onClick={() => goTo(INDEX_OF[`s${c.sections[0].n}`])}
                        className="flex cursor-pointer flex-col gap-[12px] rounded-[12px] border border-border bg-surface p-[20px] text-left shadow-[0_1px_2px_rgba(0,0,0,.06)] hover:border-primary-text hover:shadow-[0_4px_12px_rgba(0,0,0,.1)]"
                      >
                        <div className="flex items-start gap-[12px]">
                          <span className="flex h-[30px] min-w-[38px] shrink-0 items-center justify-center rounded-[7px] bg-[rgba(180,50,26,.09)] px-[8px] font-mono text-[13px] font-semibold leading-none text-primary-text">
                            {c.num}
                          </span>
                          <span className="flex min-w-0 flex-1 flex-col gap-[4px]">
                            <span className="font-display text-[15.5px] font-semibold leading-[1.3] tracking-[-0.01em] text-text">
                              {c.title}
                            </span>
                            <span className="font-sans text-[12px] font-normal leading-[1.4] text-text-muted">
                              Sections {c.sections[0].n}–
                              {c.sections[c.sections.length - 1].n}
                            </span>
                          </span>
                        </div>
                        <div className="flex flex-col gap-[5px] border-t border-surface-raised pt-[2px]">
                          {c.sections.slice(0, 3).map((s) => (
                            <span
                              key={s.n}
                              className="block overflow-hidden text-ellipsis whitespace-nowrap font-sans text-[12.5px] font-normal leading-[1.5] text-text-secondary"
                            >
                              {s.n}. {s.heading}
                            </span>
                          ))}
                        </div>
                        <div className="flex w-full items-center gap-[8px]">
                          <span className="block h-[4px] flex-1 overflow-hidden rounded-full bg-surface-raised">
                            <span
                              className="block h-full rounded-full bg-primary-tint"
                              style={{
                                width: `${Math.round((readIn / c.sections.length) * 100)}%`,
                              }}
                            />
                          </span>
                          <span className="shrink-0 font-mono text-[12px] font-semibold leading-none text-text-muted">
                            {readIn}/{c.sections.length}
                          </span>
                        </div>
                      </button>
                    );
                  })}

                  <button
                    onClick={() => goTo(TOTAL - 1)}
                    className="flex cursor-pointer flex-col gap-[12px] rounded-[12px] border border-border bg-[var(--bg-sunken)] p-[20px] text-left hover:shadow-[0_8px_24px_rgba(0,0,0,.2)]"
                  >
                    <div className="flex items-start gap-[12px]">
                      <span className="flex h-[30px] min-w-[38px] shrink-0 items-center justify-center rounded-[7px] bg-primary-tint px-[8px] font-mono text-[12px] font-semibold leading-none text-primary-text">
                        S
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-[4px]">
                        <span className="font-display text-[15.5px] font-semibold leading-[1.3] tracking-[-0.01em] text-text">
                          The Schedule
                        </span>
                        <span className="font-sans text-[12px] font-normal leading-[1.4] text-text-muted">
                          Monetary penalties · see section 33(1)
                        </span>
                      </span>
                    </div>
                    <span className="font-sans text-[12.5px] font-normal leading-[1.6] text-text-secondary">
                      Seven graded penalty heads, from ₹10,000 for a Data
                      Principal&apos;s breach of duties up to ₹250 crore for
                      failing to take reasonable security safeguards.
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------- Search */}
          {mode === "search" && (
            <div className="mx-auto flex max-w-[900px] flex-col gap-[16px]">
              <div className="flex items-baseline justify-between gap-[16px]">
                <h2 className="m-0 font-display text-[21px] font-semibold leading-[1.2] tracking-[-0.02em]">
                  {trimmed.length < 2
                    ? "Keep typing to search the Act"
                    : results.length
                      ? `${results.length} ${results.length === 1 ? "section matches" : "sections match"} “${trimmed}”`
                      : `No results for “${trimmed}”`}
                </h2>
                <button
                  onClick={() => {
                    setQ("");
                    setModeOverride(idx >= 0 ? "read" : "toc");
                  }}
                  className="cursor-pointer border-0 bg-transparent p-0 font-sans text-[12.5px] font-semibold leading-none text-primary-text"
                >
                  Clear search
                </button>
              </div>

              {results.map(({ p, i, n }) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="flex w-full cursor-pointer flex-col gap-[9px] rounded-[12px] border border-border bg-surface px-[20px] py-[18px] text-left shadow-[0_1px_2px_rgba(0,0,0,.06)] hover:border-primary-text hover:shadow-[0_4px_12px_rgba(0,0,0,.1)]"
                >
                  <span className="flex flex-wrap items-center gap-[10px]">
                    <span className="inline-flex items-center rounded-[5px] bg-[rgba(180,50,26,.09)] px-[8px] py-[3px] font-mono text-[12px] font-semibold leading-[1.3] text-primary-text">
                      {p.kind === "sch" ? "Schedule" : `§ ${p.n}`}
                    </span>
                    <span className="font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.12em] text-text-muted">
                      {p.kind === "sch"
                        ? "Penalties"
                        : `Chapter ${p.chNum} · ${p.chTitle}`}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[rgba(180,50,26,.12)] px-[8px] py-[3px] font-sans text-[12px] font-semibold leading-[1.3] text-primary-text">
                      {n} {n === 1 ? "match" : "matches"}
                    </span>
                  </span>
                  <span className="font-display text-[16px] font-semibold leading-[1.35] tracking-[-0.012em] text-text">
                    {p.heading}
                  </span>
                  {snips(p.text, trimmed, 2).map((sn, k) => (
                    <span
                      key={k}
                      className="block font-sans text-[13.5px] font-normal leading-[1.75] text-text-secondary"
                    >
                      {sn.before}
                      <mark className="rounded-[2px] bg-[rgba(180,50,26,.26)] px-px text-text">
                        {sn.hit}
                      </mark>
                      {sn.after}
                    </span>
                  ))}
                </button>
              ))}

              {trimmed.length >= 2 && results.length === 0 && (
                <div className="flex flex-col items-center gap-[8px] rounded-[12px] border border-dashed border-border bg-surface px-[24px] py-[56px] text-center">
                  <div className="font-sans text-[16px] font-semibold leading-[1.3] text-text">
                    No matches in the Act
                  </div>
                  <div className="max-w-[44ch] font-sans text-[13.5px] font-normal leading-[1.6] text-text-muted">
                    Try a statutory term such as <em>consent</em>,{" "}
                    <em>Data Fiduciary</em>, <em>breach</em>, <em>child</em> or{" "}
                    <em>penalty</em>.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------- Read */}
          {mode === "read" && page && (
            <div className="mx-auto flex max-w-[840px] flex-col gap-[20px]">
              <article className="overflow-hidden rounded-[12px] border border-border bg-surface shadow-[0_1px_4px_rgba(0,0,0,.08)]">
                <div className="flex items-start gap-[18px] border-b border-border px-[34px] pb-[22px] pt-[26px]">
                  <div className="flex size-[58px] shrink-0 flex-col items-center justify-center gap-[2px] rounded-[12px] border border-[rgba(180,50,26,.22)] bg-[rgba(180,50,26,.08)]">
                    <span className="font-sans text-[8.5px] font-semibold uppercase leading-none tracking-[0.13em] text-primary-text">
                      {page.kind === "sch" ? "The" : "Sec"}
                    </span>
                    <span className="font-mono text-[21px] font-bold leading-none tracking-[-0.02em] text-primary-text tabular-nums">
                      {page.kind === "sch" ? "Sch" : page.n}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-[8px]">
                    <div className="font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.13em] text-text-muted">
                      {page.kind === "sch"
                        ? "Schedule · see section 33(1)"
                        : `Chapter ${page.chNum} · ${page.chTitle}`}
                    </div>
                    <h1 className="m-0 font-display text-[27px] font-semibold leading-[1.25] tracking-[-0.025em] text-text [text-wrap:pretty]">
                      {page.kind === "sch"
                        ? "The Schedule — Monetary Penalties"
                        : page.heading}
                    </h1>
                    {matchN > 0 && (
                      <div className="self-start rounded-full bg-[rgba(180,50,26,.12)] px-[10px] py-[4px] font-sans text-[12px] font-semibold leading-[1.4] text-primary-text">
                        {matchN} {matchN === 1 ? "match" : "matches"} for “{hl}”
                        highlighted below
                      </div>
                    )}
                  </div>
                  <button
                    onClick={toggleRead}
                    className={cn(
                      "flex shrink-0 cursor-pointer items-center gap-[8px] rounded-[8px] border px-[14px] py-[9px] font-sans text-[12.5px] font-semibold leading-none hover:border-primary-text",
                      isRead
                        ? "border-primary bg-primary-tint text-primary-text"
                        : "border-border bg-surface-raised text-text-secondary",
                    )}
                  >
                    <span className="inline-flex size-[16px] items-center justify-center rounded-full border-[1.5px] border-current font-sans text-[12px] font-semibold leading-none">
                      ✓
                    </span>
                    <span>{isRead ? "Read" : "Mark as read"}</span>
                  </button>
                </div>

                <div className="px-[34px] pb-[30px] pt-[26px]">
                  {page.blocks.map((b, k) => {
                    if (b[0] === "p") {
                      return (
                        <p
                          key={k}
                          className="mb-[13px] font-sans font-normal leading-[1.78] text-text-secondary [text-wrap:pretty]"
                          style={{
                            paddingLeft: PAD[b[1]] || "0",
                            fontSize: BODY_FONT_SIZE,
                          }}
                        >
                          <Highlight parts={segs(b[2], hl)} />
                        </p>
                      );
                    }
                    if (b[0] === "ex") {
                      return (
                        <p
                          key={k}
                          className="mb-[16px] mt-[2px] font-sans font-normal leading-[1.75] text-text-secondary"
                          style={{
                            paddingLeft: PAD[1],
                            fontSize: BODY_FONT_SIZE,
                          }}
                        >
                          <em className="font-semibold not-italic text-text">
                            Explanation.—
                          </em>
                          {b[1]}
                        </p>
                      );
                    }
                    return (
                      <div
                        key={k}
                        className="mb-[20px] mt-[6px] rounded-[10px] border border-[rgba(180,50,26,.35)] bg-[rgba(180,50,26,.05)] px-[18px] pb-[12px] pt-[15px]"
                        style={{ marginLeft: PAD[1] }}
                      >
                        <div className="mb-[10px] font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.13em] text-primary-text">
                          {b[1]}
                        </div>
                        {b[2].map((t, j) => (
                          <p
                            key={j}
                            className="mb-[8px] font-sans text-[14px] font-normal leading-[1.72] text-text-secondary [text-wrap:pretty]"
                          >
                            <Highlight parts={segs(t, hl)} />
                          </p>
                        ))}
                      </div>
                    );
                  })}

                  {page.kind === "sch" && (
                    <div className="flex flex-col gap-[16px]">
                      <div className="font-sans text-[13px] font-normal italic leading-[1.6] text-text-muted">
                        {SCHEDULE.note} — penalties the Data Protection Board may
                        impose on conclusion of an inquiry.
                      </div>
                      <div className="overflow-hidden rounded-[10px] border border-border">
                        <div className="grid grid-cols-[64px_minmax(0,1fr)_200px] border-b border-border bg-[var(--bg-sunken)]">
                          <div className="px-[14px] py-[12px] font-sans text-[12px] font-semibold leading-[1.4] text-text-secondary">
                            Sl. No.
                          </div>
                          <div className="px-[14px] py-[12px] font-sans text-[12px] font-semibold leading-[1.4] text-text-secondary">
                            Breach of provisions of this Act or rules made
                            thereunder
                          </div>
                          <div className="px-[14px] py-[12px] font-sans text-[12px] font-semibold leading-[1.4] text-text-secondary">
                            Penalty
                          </div>
                        </div>
                        {SCHEDULE.rows.map((r) => (
                          <div
                            key={r.sl}
                            className="grid grid-cols-[64px_minmax(0,1fr)_200px] border-b border-surface-raised"
                          >
                            <div className="px-[14px] py-[15px] font-mono text-[13px] font-semibold leading-[1.6] text-text-muted">
                              {r.sl}
                            </div>
                            <div className="px-[14px] py-[15px] font-sans text-[13.5px] font-normal leading-[1.7] text-text-secondary">
                              {r.breach}
                            </div>
                            <div className="px-[14px] py-[15px] font-sans text-[13px] font-semibold leading-[1.6] text-primary-text">
                              {r.penalty}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-right font-sans text-[12.5px] font-normal leading-[1.6] text-text-muted">
                        {SCHEDULE.signature}
                      </div>
                    </div>
                  )}
                </div>
              </article>

              <div className="grid grid-cols-2 gap-[14px]">
                {prev && (
                  <button
                    onClick={() => goTo(idx - 1)}
                    className="flex w-full cursor-pointer flex-col items-start gap-[5px] rounded-[12px] border border-border bg-surface px-[18px] py-[16px] text-left hover:border-primary-text hover:bg-[rgba(180,50,26,.03)]"
                  >
                    <span className="font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.13em] text-text-muted">
                      ← Previous
                    </span>
                    <span className="font-sans text-[14.5px] font-semibold leading-[1.35] text-text">
                      {prev.label}
                    </span>
                    <span className="font-sans text-[12px] font-normal leading-[1.4] text-text-muted">
                      {prev.sub}
                    </span>
                  </button>
                )}
                {next && (
                  <button
                    onClick={() => goTo(idx + 1)}
                    className="col-start-2 flex w-full cursor-pointer flex-col items-end gap-[5px] rounded-[12px] border border-border bg-surface px-[18px] py-[16px] text-right hover:border-primary-text hover:bg-[rgba(180,50,26,.03)]"
                  >
                    <span className="font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.13em] text-primary-text">
                      Next →
                    </span>
                    <span className="font-sans text-[14.5px] font-semibold leading-[1.35] text-text">
                      {next.label}
                    </span>
                    <span className="font-sans text-[12px] font-normal leading-[1.4] text-text-muted">
                      {next.sub}
                    </span>
                  </button>
                )}
              </div>

              <div className="flex items-center justify-center gap-[10px] pt-[2px]">
                <span className="font-sans text-[12px] font-semibold leading-[1.4] text-text-muted">
                  Section {idx + 1} of {TOTAL} · use ← → to move through the Act
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
