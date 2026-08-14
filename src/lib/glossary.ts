import type { Route } from "next";

import { CHAPTERS } from "@/lib/dpdpa-data";
import { routes } from "@/lib/routes";

export interface GlossaryTerm {
  /** Clause letter as printed in the Act: `a` … `z`, `za`, `zb`. */
  clause: string;
  /** The defined term, without its quotation marks. */
  term: string;
  /** The full clause text, verbatim, including the leading `(a)`. */
  text: string;
  /** URL fragment. Derived from the term, so it is stable and readable. */
  slug: string;
  /** A page on this site that treats the term at length, where one exists. */
  related?: { href: Route; label: string };
}

/**
 * Pages that explain a defined term properly, keyed by the term itself.
 *
 * Deliberately sparse. A glossary entry that links to a page which only
 * mentions the word is worse than one that links nowhere, because it spends
 * the reader's click without answering the question they arrived with.
 */
const RELATED: Record<string, { href: Route; label: string }> = {
  "Consent Manager": {
    href: routes.consentManager,
    label: "Consent Managers under the DPDP Act",
  },
  "Significant Data Fiduciary": {
    href: routes.sdf,
    label: "Significant Data Fiduciary obligations",
  },
  "Data Fiduciary": { href: routes.roles, label: "Key roles explained" },
  "Data Principal": { href: routes.roles, label: "Key roles explained" },
  "Data Processor": { href: routes.roles, label: "Key roles explained" },
  Board: { href: routes.roles, label: "Key roles explained" },
  "personal data breach": {
    href: routes.obligations,
    label: "Breach reporting under section 8",
  },
  "digital personal data": {
    href: routes.overview,
    label: "Overview and scope",
  },
  "personal data": { href: routes.overview, label: "Overview and scope" },
  processing: { href: routes.applicability, label: "Does the Act apply to you?" },
  child: { href: routes.obligations, label: "Children's data under section 9" },
};

/**
 * Every term defined in section 2, parsed out of the pinned statutory text.
 *
 * Derived rather than transcribed on purpose: `dpdpa-data.ts` is SHA-256
 * pinned against the MeitY publication, so a glossary built from it cannot
 * drift from the Act. A hand-written one silently could, and this is exactly
 * the kind of page nobody re-checks.
 *
 * Clause `(x) "processing"` and `(y) "she"` do not follow the `means` /
 * `includes` pattern the other twenty-six share, so the match deliberately
 * stops at the closing quotation mark rather than requiring a verb.
 */
export const GLOSSARY: GlossaryTerm[] = (() => {
  const definitions = CHAPTERS.flatMap((chapter) => chapter.sections).find(
    (section) => section.n === "2",
  );
  if (!definitions) return [];

  const out: GlossaryTerm[] = [];

  for (const block of definitions.blocks) {
    if (block[0] !== "p") continue;
    const text = block[2];
    const match = /^\((\w{1,2})\)\s*[“"]([^”"]+)[”"]/.exec(text);
    if (!match) continue;

    const term = match[2];
    out.push({
      clause: match[1],
      term,
      text,
      slug: term
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
      related: RELATED[term],
    });
  }

  return out;
})();
