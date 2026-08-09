import type { Metadata } from "next";
import Link from "next/link";

import { ReaderClient } from "./reader-client";
import { breadcrumbSchema } from "@/lib/breadcrumbs";
import { routes } from "@/lib/routes";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";
import { CHAPTERS } from "@/lib/dpdpa-data";

export const metadata: Metadata = {
  // The full text lives at /reader/full-text and each provision at
  // /reader/section-N. This page is the reader app and the index over them,
  // so it no longer claims to be the text itself.
  title: "DPDP Act 2023 Reader — All 44 Sections",
  description:
    "Read the DPDP Act, 2023 section by section with chapter navigation, search, illustrations and reading progress. Jump straight to any of the 44 sections.",
  alternates: { canonical: "/reader" },
};

/**
 * `Legislation` markup describing the Act itself.
 *
 * This is the strongest signal available for an answer engine deciding whether
 * a page is a primary source for "the DPDP Act" rather than commentary about
 * it: the schema states the jurisdiction, the identifier, the assent date and
 * the section count as machine-readable facts.
 */
const legislationSchema = {
  "@context": "https://schema.org",
  "@type": "Legislation",
  name: "The Digital Personal Data Protection Act, 2023",
  alternateName: ["DPDP Act 2023", "DPDPA", "Act No. 22 of 2023"],
  legislationIdentifier: "Act No. 22 of 2023",
  legislationJurisdiction: "India",
  legislationType: "Act of Parliament",
  legislationDate: "2023-08-11",
  legislationPassedBy: {
    "@type": "GovernmentOrganization",
    name: "Parliament of India",
  },
  publisher: {
    "@type": "GovernmentOrganization",
    name: "Ministry of Law and Justice, Legislative Department",
  },
  inLanguage: "en",
  url: `${SITE_URL}/reader`,
  description:
    "An Act to provide for the processing of digital personal data in a manner that recognises both the right of individuals to protect their personal data and the need to process such personal data for lawful purposes.",
  // Chapters as parts, so the structure of the Act is explicit.
  hasPart: CHAPTERS.map((c) => ({
    "@type": "Legislation",
    name: `Chapter ${c.num} — ${c.title}`,
    position: c.num,
    legislationJurisdiction: "India",
  })),
};

const readerBreadcrumb = breadcrumbSchema([
  { name: "DPDP Act reader", path: routes.reader },
]);

/**
 * A plain index of every provision, rendered on the server.
 *
 * `ReaderClient` navigates by state, not by href — its chapter rail collapses
 * to the open chapter and its landing view previews three sections each, so a
 * crawler following this page finds no route to the other 41. This directory
 * is the crawlable path to them, and the reason the per-section pages get
 * discovered at all.
 */
function SectionDirectory() {
  return (
    <section className="border-t border-border bg-[var(--bg-sunken)]">
      <div className="mx-auto w-full max-w-[1180px] px-[var(--space-5)] py-[clamp(34px,5vw,60px)]">
        <h2 className="m-0 font-display text-[clamp(21px,2.8vw,28px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
          Every section, on its own page
        </h2>
        <p className="mb-[26px] mt-[10px] max-w-[68ch] text-[15px] leading-[1.7] text-text-secondary">
          Each provision below is a standalone page with its full statutory
          text, chapter context and links to the sections either side of it.
          Prefer one long document?{" "}
          <Link
            href={routes.readerFullText}
            className="font-semibold text-primary-text"
          >
            Read the complete Act on one page
          </Link>
          .
        </p>

        <div className="grid gap-[26px] min-[720px]:grid-cols-2 min-[1020px]:grid-cols-3">
          {CHAPTERS.map((chapter) => (
            <div key={chapter.id} className="flex flex-col gap-[10px]">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-primary-text">
                Chapter {chapter.num} · {chapter.title}
              </span>
              <ul className="m-0 flex list-none flex-col gap-[7px] p-0">
                {chapter.sections.map((section) => (
                  <li key={section.n}>
                    <Link
                      href={`/reader/section-${section.n}`}
                      // A crawl path, not a hot navigation surface: without
                      // this, 45 route payloads prefetch on scroll (~160 KB
                      // brotli) for links most visitors never click.
                      prefetch={false}
                      className="text-[13.5px] leading-[1.5] text-text-secondary no-underline hover:text-primary-text"
                    >
                      <span className="font-mono text-text-muted tabular-nums">
                        {section.n}.
                      </span>{" "}
                      {section.heading}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-[10px]">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-primary-text">
              Schedule
            </span>
            <ul className="m-0 flex list-none flex-col gap-[7px] p-0">
              <li>
                <Link
                  href="/reader/schedule"
                  prefetch={false}
                  className="text-[13.5px] leading-[1.5] text-text-secondary no-underline hover:text-primary-text"
                >
                  The Schedule — Monetary Penalties
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ReaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...legislationSchema,
            dateModified: CONTENT_UPDATED,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(readerBreadcrumb) }}
      />
      {/* Passed in rather than rendered after: ReaderClient owns the site
          footer, so a sibling here would render underneath it. */}
      <ReaderClient footerSlot={<SectionDirectory />} />
    </>
  );
}
