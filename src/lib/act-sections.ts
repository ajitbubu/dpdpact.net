import type { Route } from "next";
import { CHAPTERS, SCHEDULE, type Block } from "@/lib/dpdpa-data";

/**
 * The Act flattened into one addressable page per section, plus the Schedule.
 *
 * `reader-client.tsx` builds an equivalent list for its own paginated view,
 * but that one is a module-level const inside a client component and carries
 * a precomputed `text` field for search. This list exists so server components
 * can render the statutory text without pulling the reader's state machine in
 * with it.
 */
export interface ActPart {
  /** URL segment: `section-1` … `section-44`, or `schedule`. */
  slug: string;
  kind: "sec" | "sch";
  /** Section number as printed in the Act, or `"S"` for the Schedule. */
  n: string;
  heading: string;
  chNum: string;
  chTitle: string;
  blocks: Block[];
}

export const ACT_PARTS: ActPart[] = [
  ...CHAPTERS.flatMap((chapter) =>
    chapter.sections.map((section) => ({
      slug: `section-${section.n}`,
      kind: "sec" as const,
      n: section.n,
      heading: section.heading,
      chNum: chapter.num,
      chTitle: chapter.title,
      blocks: section.blocks,
    })),
  ),
  {
    slug: "schedule",
    kind: "sch" as const,
    n: "S",
    heading: SCHEDULE.title,
    chNum: "-",
    chTitle: SCHEDULE.title,
    blocks: [],
  },
];

const BY_SLUG = new Map(ACT_PARTS.map((part) => [part.slug, part]));

export function getActPart(slug: string): ActPart | undefined {
  return BY_SLUG.get(slug);
}

/**
 * A typed `/reader/...` path.
 *
 * `typedRoutes` types dynamic segments only when the literal flows through the
 * generic, so a bare `Route` rejects `"/reader/section-44"`. This narrows the
 * slug to a real shape and does the cast in one place.
 */
export type ActPartSlug = `section-${number}` | "schedule";

export function actPath(slug: ActPartSlug): Route {
  return `/reader/${slug}` as Route;
}

/** Neighbours for prev/next links, so every part is reachable by crawling. */
export function getActNeighbours(slug: string) {
  const i = ACT_PARTS.findIndex((part) => part.slug === slug);
  return {
    prev: i > 0 ? ACT_PARTS[i - 1] : undefined,
    next: i >= 0 && i < ACT_PARTS.length - 1 ? ACT_PARTS[i + 1] : undefined,
  };
}

/** Title as it appears in headings and metadata. */
export function partLabel(part: ActPart): string {
  return part.kind === "sch"
    ? "The Schedule - Monetary Penalties"
    : `Section ${part.n} - ${part.heading}`;
}

/** Trim to a whole word inside `max` characters. */
function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/**
 * Search title. Front-loads "Section N" because that is how the query is
 * typed, then clamps to 60 characters - fourteen statutory headings are long
 * enough to blow past the SERP limit on their own, one of them at 86
 * characters. The `<h1>` still carries the heading in full; only the title
 * tag is trimmed.
 */
export function partTitle(part: ActPart): string {
  return part.kind === "sch"
    ? "DPDP Act Schedule - Penalties Under Section 33"
    : clamp(`DPDP Act Section ${part.n} - ${part.heading}`, 60);
}

/** Description built from the section's own opening text, so no two match. */
export function partDescription(part: ActPart): string {
  if (part.kind === "sch") {
    return "The Schedule to India's DPDP Act, 2023: seven penalty heads and the maximum monetary penalty the Data Protection Board may impose for each.";
  }
  const opening = part.blocks.find((block) => block[0] === "p")?.[2] ?? "";
  const lede = `Full text of section ${part.n} of India's DPDP Act, 2023 - ${part.heading}.`;
  return clamp(opening ? `${lede} ${opening}` : lede, 158);
}

/**
 * Which study page explains this part, so each statutory page links onward to
 * the commentary rather than dead-ending. Keyed by section number.
 */
export function partStudyPage(part: ActPart): { href: Route; label: string } {
  if (part.kind === "sch") {
    return { href: "/penalties", label: "Penalties & the Schedule explained" };
  }
  const n = Number(part.n);
  if (n <= 3) return { href: "/overview", label: "Overview & scope explained" };
  if (n <= 10) return { href: "/obligations", label: "Obligations explained" };
  if (n <= 15) return { href: "/rights", label: "Rights & duties explained" };
  if (n <= 17) return { href: "/overview", label: "Overview & scope explained" };
  // 18–26 is the Board's constitution, which /roles covers. 27–34 is inquiry,
  // appeal, ADR and penalties - /penalties covers those and /roles never
  // mentions them, so the boundary sits at 26, not 32.
  if (n <= 26) return { href: "/roles", label: "Key roles explained" };
  if (n <= 34) return { href: "/penalties", label: "Penalties explained" };
  // Chapter IX (35–44) has no dedicated study page. Point at the full text
  // rather than claim a page explains it.
  return { href: "/reader/full-text", label: "Read the complete Act" };
}
