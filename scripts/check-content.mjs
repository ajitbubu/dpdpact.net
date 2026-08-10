#!/usr/bin/env node
/**
 * Content integrity checks for the industry guides.
 *
 * The site's editorial position is that every claim is anchored to a provision
 * you can verify yourself. That only holds if the anchors are real, and the
 * anchors are hand-typed. A fat-fingered "§ 17(1)(e)" cites the wrong law about
 * loan defaults and nothing else in the toolchain would notice: `next build`
 * does not read prose, and this repo has no test framework.
 *
 * Ground truth for section numbers is `src/lib/dpdpa-data.ts`, read only.
 * That file holds the Act verbatim and must never be written to.
 *
 * WHAT THIS CANNOT CHECK, and says so at the end of every run: references to
 * the DPDP Rules, 2025 and their Schedules. The Rules text is not in this repo,
 * so "Rule 8(2)" and "Fourth Schedule" are reported as UNCHECKED rather than
 * silently counted as passing. The script proves shape, not truth.
 *
 * Every rule is self-tested against a planted-error fixture before any real
 * content is read (see `selfTest`). A validator whose regex quietly matches
 * nothing reports success forever and is worse than no validator, because it
 * manufactures confidence. If a rule stops catching its own bad case, this
 * exits non-zero and says the validator is broken.
 */

import crypto from "node:crypto";
import fs from "node:fs";

const ACT_FILE = "src/lib/dpdpa-data.ts";

/**
 * The Act, fingerprinted.
 *
 * `dpdpa-data.ts` holds the Digital Personal Data Protection Act, 2023
 * verbatim, checked against the MeitY publication. It is reference material,
 * not content to edit, and it has already been modified once by accident: a
 * tooling sweep rewrote em-dashes to hyphens across the repo, which changed
 * the closing punctuation of the enacting formula ("Be it enacted by
 * Parliament ... as follows:") from the dash the Gazette prints to a plain
 * hyphen. Deliberately described rather than quoted here, because quoting the
 * character would let the same sweep rewrite this comment too.
 *
 * That sweep runs outside this repo and cannot be configured from here, so
 * this is the backstop instead. If the file changes at all, the build stops.
 *
 * To change it deliberately: verify the new text against the MeitY PDF, then
 * update this constant in the same commit and say why in the message.
 */
const ACT_SHA256 =
  "02232ed6430f083e1318afcf382133341836df1f27a28330352f22415b19b1dd";
const CONTENT_FILE = "src/lib/industries.ts";
const MENU_FILE = "src/lib/industries-menu.ts";

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;

/** Section numbers the Act actually contains, e.g. {"1","2",…,"44"}. */
function parseActSections(source) {
  return new Set([...source.matchAll(/^\s+n: "([^"]+)",/gm)].map((m) => m[1]));
}

/** One entry per industry, flattened to what the rules need. */
function parseIndustries(source) {
  const blocks = [...source.matchAll(/^ {2}"([a-z-]+)": \{$/gm)];
  return blocks.map((m, i) => {
    const start = m.index;
    const end = i + 1 < blocks.length ? blocks[i + 1].index : source.length;
    const body = source.slice(start, end);
    const field = (name) => {
      const hit = body.match(
        new RegExp(`^\\s{4}${name}:\\s*\\n?\\s*"([^"]*)"`, "m"),
      );
      return hit ? hit[1] : null;
    };
    return {
      slug: m[1],
      metaTitle: field("metaTitle"),
      metaDescription: field("metaDescription"),
      published: field("published"),
      updated: field("updated"),
      // Every "§ 12" / "§ 12(3)(a)" anywhere in the entry, refs and prose alike.
      sectionRefs: [...body.matchAll(/§\s*(\d+)/g)].map((s) => s[1]),
      // Which named arrays exist, and whether any is empty.
      arrays: Object.fromEntries(
        ["standing", "provisions", "actions", "faq", "related"].map((key) => {
          const hit = body.match(new RegExp(`^\\s{4}${key}: \\[`, "m"));
          const empty = new RegExp(`^\\s{4}${key}: \\[\\],`, "m").test(body);
          return [key, hit ? (empty ? "empty" : "ok") : "missing"];
        }),
      ),
      unverifiable: [
        ...new Set(
          [...body.matchAll(/ref: "([^"]*(?:Rule|Schedule)[^"]*)"/g)].map(
            (r) => r[1],
          ),
        ),
      ],
    };
  });
}

/**
 * The rules. Each takes a model and returns human-readable failures.
 *
 * `bad` is the planted error the rule must catch in the self-test. Adding a
 * rule without a `bad` case is a self-test failure, on purpose.
 */
const RULES = [
  {
    name: "act-text-unmodified",
    check: ({ actHash }) =>
      actHash === ACT_SHA256
        ? []
        : [
            `${ACT_FILE} has changed (sha256 ${actHash.slice(0, 16)}...). ` +
              "It holds the Act verbatim and is not content to edit. If the change " +
              "is deliberate, verify against the MeitY publication and update " +
              "ACT_SHA256 in this script in the same commit.",
          ],
    bad: (m) => {
      m.actHash = "0".repeat(64);
      return m;
    },
  },
  {
    name: "section-refs-resolve",
    check: ({ industries, actSections }) =>
      industries.flatMap((ind) =>
        [...new Set(ind.sectionRefs)]
          .filter((n) => !actSections.has(n))
          .map((n) => `${ind.slug}: cites "§ ${n}", which is not a section of the Act`),
      ),
    bad: (m) => {
      m.industries[0].sectionRefs = ["999"];
      return m;
    },
  },
  {
    name: "no-empty-content",
    check: ({ industries }) =>
      industries.flatMap((ind) =>
        Object.entries(ind.arrays)
          .filter(([, state]) => state !== "ok")
          .map(([key, state]) => `${ind.slug}: ${key} is ${state}`),
      ),
    bad: (m) => {
      m.industries[0].arrays.faq = "empty";
      return m;
    },
  },
  {
    name: "meta-lengths",
    check: ({ industries }) =>
      industries.flatMap((ind) => {
        const out = [];
        if (!ind.metaTitle || ind.metaTitle.length > MAX_TITLE) {
          out.push(
            `${ind.slug}: metaTitle is ${ind.metaTitle?.length ?? 0} chars (max ${MAX_TITLE})`,
          );
        }
        if (!ind.metaDescription || ind.metaDescription.length > MAX_DESCRIPTION) {
          out.push(
            `${ind.slug}: metaDescription is ${ind.metaDescription?.length ?? 0} chars (max ${MAX_DESCRIPTION})`,
          );
        }
        return out;
      }),
    bad: (m) => {
      m.industries[0].metaTitle = "x".repeat(MAX_TITLE + 1);
      return m;
    },
  },
  {
    name: "dates-sane",
    check: ({ industries }) =>
      industries.flatMap((ind) => {
        const iso = /^\d{4}-\d{2}-\d{2}$/;
        if (!iso.test(ind.published ?? "") || !iso.test(ind.updated ?? "")) {
          return [`${ind.slug}: published/updated must be YYYY-MM-DD literals`];
        }
        return ind.updated < ind.published
          ? [`${ind.slug}: updated (${ind.updated}) precedes published (${ind.published})`]
          : [];
      }),
    bad: (m) => {
      m.industries[0].updated = "2020-01-01";
      return m;
    },
  },
  {
    name: "menu-and-content-agree",
    check: ({ industries, menuSlugs }) => {
      const content = new Set(industries.map((i) => i.slug));
      return [
        ...menuSlugs
          .filter((s) => !content.has(s))
          .map((s) => `"${s}" is in the menu but has no content entry`),
        ...[...content]
          .filter((s) => !menuSlugs.includes(s))
          .map((s) => `"${s}" has content but is not in the menu`),
      ];
    },
    bad: (m) => {
      m.menuSlugs = [...m.menuSlugs, "ghost-industry"];
      return m;
    },
  },
];

/** A model that must pass every rule, used as the self-test control. */
function cleanFixture() {
  return {
    actHash: ACT_SHA256,
    actSections: new Set(["8", "9"]),
    menuSlugs: ["fixture"],
    industries: [
      {
        slug: "fixture",
        metaTitle: "A title well under the limit",
        metaDescription: "A description well under the limit.",
        published: "2026-01-01",
        updated: "2026-01-02",
        sectionRefs: ["8", "9"],
        arrays: {
          standing: "ok",
          provisions: "ok",
          actions: "ok",
          faq: "ok",
          related: "ok",
        },
        unverifiable: [],
      },
    ],
  };
}

const clone = (m) => ({
  actHash: m.actHash,
  actSections: new Set(m.actSections),
  menuSlugs: [...m.menuSlugs],
  industries: m.industries.map((i) => ({
    ...i,
    sectionRefs: [...i.sectionRefs],
    arrays: { ...i.arrays },
  })),
});

/** Prove each rule fires on its own planted error and stays quiet on clean data. */
function selfTest() {
  const broken = [];
  for (const rule of RULES) {
    const onClean = rule.check(cleanFixture());
    if (onClean.length) {
      broken.push(`${rule.name}: fired on the clean fixture (${onClean[0]})`);
    }
    if (typeof rule.bad !== "function") {
      broken.push(`${rule.name}: has no planted-error case`);
      continue;
    }
    if (rule.check(rule.bad(clone(cleanFixture()))).length === 0) {
      broken.push(`${rule.name}: did NOT catch its own planted error`);
    }
  }
  return broken;
}

function main() {
  const broken = selfTest();
  if (broken.length) {
    console.error("check-content: THE VALIDATOR IS BROKEN\n");
    broken.forEach((b) => console.error(`  ${b}`));
    console.error("\nRules must catch their planted errors before content is trusted.");
    process.exit(1);
  }

  const actSource = fs.readFileSync(ACT_FILE, "utf8");
  const model = {
    actHash: crypto.createHash("sha256").update(actSource).digest("hex"),
    actSections: parseActSections(actSource),
    industries: parseIndustries(fs.readFileSync(CONTENT_FILE, "utf8")),
    menuSlugs: [
      ...fs
        .readFileSync(MENU_FILE, "utf8")
        .matchAll(/^ {2}"([a-z-]+)",$/gm),
    ].map((m) => m[1]),
  };

  if (model.industries.length === 0 || model.menuSlugs.length === 0) {
    console.error("check-content: parsed 0 industries or 0 menu slugs - the");
    console.error("source shape changed and the parser needs updating.");
    process.exit(1);
  }

  const failures = RULES.flatMap((rule) =>
    rule.check(model).map((f) => `[${rule.name}] ${f}`),
  );

  if (failures.length) {
    console.error(`check-content: ${failures.length} problem(s)\n`);
    failures.forEach((f) => console.error(`  ${f}`));
    process.exit(1);
  }

  const unchecked = [
    ...new Set(model.industries.flatMap((i) => i.unverifiable)),
  ].sort();

  console.log(
    `check-content: ${model.industries.length} industries, ` +
      `${model.actSections.size} Act sections, ${RULES.length} rules, all pass`,
  );
  if (unchecked.length) {
    console.log(
      `  UNCHECKED (${unchecked.length}) - the Rules text is not in this repo, ` +
        "so these are not verified:",
    );
    unchecked.forEach((u) => console.log(`    ${u}`));
  }
}

main();
