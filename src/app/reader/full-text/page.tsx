import type { Metadata } from "next";
import Link from "next/link";

import { ActBlocks, ActScheduleTable } from "@/components/act-blocks";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { LinkButton } from "@/components/ui/button";
import { getActPart } from "@/lib/act-sections";
import { breadcrumbSchema } from "@/lib/breadcrumbs";
import { ACT, CHAPTERS } from "@/lib/dpdpa-data";
import { LEGAL_REVIEWED_ON } from "@/lib/editorial";
import { routes } from "@/lib/routes";
import { ACT_SOURCE_PDF, CONTENT_UPDATED, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "DPDP Act 2023 - Full Text of All 44 Sections" },
  description:
    "The complete text of India's Digital Personal Data Protection Act, 2023 - all nine chapters, 44 sections and the Schedule, as published in the Gazette.",
  alternates: { canonical: routes.readerFullText },
};

const url = `${SITE_URL}${routes.readerFullText}`;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Legislation",
      "@id": `${url}#act`,
      name: ACT.title,
      alternateName: ["DPDP Act 2023", "DPDPA", ACT.actNo],
      legislationIdentifier: ACT.actNo,
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
      url,
      dateModified: CONTENT_UPDATED,
      isBasedOn: ACT_SOURCE_PDF,
      description: ACT.longTitle,
    },
    breadcrumbSchema([
      { name: "DPDP Act reader", path: routes.reader },
      { name: "Full text", path: routes.readerFullText },
    ]),
  ],
};

const SCHEDULE_PART = getActPart("schedule");

export default function ActFullTextPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="reader" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <header className="border-b border-border bg-[var(--bg-sunken)]">
          <div className="mx-auto w-full max-w-[880px] px-[var(--space-5)] py-[clamp(30px,4.6vw,56px)]">
            <nav
              aria-label="Breadcrumb"
              className="mb-[18px] flex flex-wrap items-center gap-[8px] text-[12.5px] text-text-muted"
            >
              <Link href={routes.home} className="text-text-muted no-underline">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href={routes.reader}
                className="text-text-muted no-underline"
              >
                DPDP Act reader
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-text-secondary">Full text</span>
            </nav>

            <div className="flex flex-col gap-[14px]">
              <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary-text">
                {ACT.actNo} · assented {ACT.assent}
              </span>
              <h1 className="m-0 max-w-[24ch] font-display text-[clamp(28px,4.6vw,42px)] font-semibold leading-[1.15] tracking-[-0.03em] text-text [text-wrap:pretty]">
                {ACT.title} -{" "}
                <span className="text-primary-text">Full Text</span>
              </h1>
              <p className="m-0 max-w-[68ch] text-[15.5px] leading-[1.75] text-text-secondary">
                {ACT.longTitle}
              </p>
              <p className="m-0 max-w-[68ch] text-[13.5px] leading-[1.7] text-text-muted">
                {ACT.gazette}{" "}
                <a
                  href={ACT_SOURCE_PDF}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-primary-text"
                >
                  Read the official MeitY PDF
                </a>
                . Last checked against that publication on {LEGAL_REVIEWED_ON}.
              </p>
              <div className="mt-[6px] flex flex-wrap gap-[10px]">
                <LinkButton href={routes.reader} variant="secondary">
                  Open the interactive reader
                </LinkButton>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-[var(--bg-app)]">
          <div className="mx-auto w-full max-w-[880px] px-[var(--space-5)] py-[clamp(32px,5vw,58px)]">
            <nav
              aria-label="Contents"
              className="mb-[44px] rounded-lg border border-border bg-surface p-[22px]"
            >
              <span className="mb-[14px] block font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted">
                Contents · 9 chapters · 44 sections · 1 Schedule
              </span>
              <ol className="m-0 flex list-none flex-col gap-[14px] p-0">
                {CHAPTERS.map((chapter) => (
                  <li key={chapter.id} className="flex flex-col gap-[6px]">
                    <span className="font-display text-[15px] font-semibold leading-[1.3] text-text">
                      Chapter {chapter.num} - {chapter.title}
                    </span>
                    <span className="flex flex-wrap gap-x-[14px] gap-y-[5px]">
                      {chapter.sections.map((section) => (
                        <a
                          key={section.n}
                          href={`#section-${section.n}`}
                          className="text-[13px] leading-[1.5] text-text-secondary no-underline hover:text-primary-text"
                        >
                          {section.n}. {section.heading}
                        </a>
                      ))}
                    </span>
                  </li>
                ))}
                <li>
                  <a
                    href="#schedule"
                    className="font-display text-[15px] font-semibold leading-[1.3] text-text no-underline hover:text-primary-text"
                  >
                    The Schedule - Monetary Penalties
                  </a>
                </li>
              </ol>
            </nav>

            <p className="mb-[38px] max-w-[68ch] font-sans text-[15.5px] font-semibold leading-[1.7] text-text">
              {ACT.enactment}
            </p>

            {CHAPTERS.map((chapter) => (
              <section key={chapter.id} className="mb-[44px]">
                <h2
                  id={chapter.id}
                  className="mb-[8px] scroll-mt-[90px] font-display text-[clamp(21px,2.8vw,27px)] font-semibold leading-[1.25] tracking-[-0.025em] text-text"
                >
                  Chapter {chapter.num} - {chapter.title}
                </h2>

                {chapter.sections.map((section) => (
                  <section key={section.n} className="mt-[30px]">
                    <h3
                      id={`section-${section.n}`}
                      className="mb-[14px] scroll-mt-[90px] font-display text-[19px] font-semibold leading-[1.35] tracking-[-0.015em] text-text"
                    >
                      <Link
                        href={`/reader/section-${section.n}`}
                        prefetch={false}
                        className="text-text no-underline hover:text-primary-text"
                      >
                        <span className="text-primary-text">{section.n}.</span>{" "}
                        {section.heading}
                      </Link>
                    </h3>
                    <ActBlocks blocks={section.blocks} />
                  </section>
                ))}
              </section>
            ))}

            <section>
              <h2
                id="schedule"
                className="mb-[16px] scroll-mt-[90px] font-display text-[clamp(21px,2.8vw,27px)] font-semibold leading-[1.25] tracking-[-0.025em] text-text"
              >
                <Link
                  href={`/reader/${SCHEDULE_PART?.slug ?? "schedule"}`}
                  className="text-text no-underline hover:text-primary-text"
                >
                  The Schedule - Monetary Penalties
                </Link>
              </h2>
              <ActScheduleTable />
            </section>

            <p className="mt-[38px] max-w-[68ch] text-[13.5px] leading-[1.7] text-text-muted">
              Statutory text reproduced from the Gazette of India. Educational
              content, not legal advice - see our{" "}
              <Link href={routes.editorialPolicy} className="text-primary-text">
                editorial policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
