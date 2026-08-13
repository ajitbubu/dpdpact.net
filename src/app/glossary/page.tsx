import type { Metadata } from "next";
import Link from "next/link";

import { EditorialReview } from "@/components/editorial-review";
import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { ProvisionRef } from "@/components/provision-ref";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { actPath } from "@/lib/act-sections";
import { GLOSSARY } from "@/lib/glossary";
import { routes } from "@/lib/routes";
import {
  ACT_SOURCE_PDF,
  CONTENT_UPDATED,
  CONTENT_UPDATED_LABEL,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "DPDP Act Glossary - All 28 Defined Terms",
  description:
    "Every term defined in section 2 of the DPDP Act, 2023 - Data Fiduciary, Data Principal, Consent Manager, personal data breach and 24 more, quoted verbatim.",
  alternates: { canonical: "/glossary" },
};

const FAQ = [
  {
    q: "Where are the DPDP Act's definitions found?",
    a: "Section 2 of the Digital Personal Data Protection Act, 2023 defines twenty-eight terms, lettered from clause (a) to clause (zb). They govern the whole Act: a word used anywhere in the statute carries its section 2 meaning unless the context requires otherwise.",
  },
  {
    q: "What is the difference between a Data Fiduciary and a Data Processor?",
    a: "A Data Fiduciary determines the purpose and means of processing; a Data Processor only processes on the Fiduciary's behalf. The distinction matters because the Act places its obligations on the Fiduciary, and the Fiduciary remains answerable for what its processor does.",
  },
  {
    q: "Does the DPDP Act define sensitive personal data?",
    a: "No. Unlike the SPDI Rules, 2011 and the GDPR, the DPDP Act creates no special category of sensitive personal data. Every item in section 2 treats personal data as a single class, and the only tiering the Act creates is the Significant Data Fiduciary designation under section 10.",
  },
  {
    q: "Why does the DPDP Act use “she” throughout?",
    a: "Clause (y) of section 2 provides that “she” and its cognate expressions include a reference to a person of any gender. It is a drafting choice specific to this Act rather than a limitation on who the statute protects.",
  },
];

const url = `${SITE_URL}/glossary`;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DefinedTermSet",
      "@id": `${url}#terms`,
      name: "DPDP Act, 2023 defined terms",
      description:
        "The twenty-eight terms defined in section 2 of the Digital Personal Data Protection Act, 2023.",
      url,
      inLanguage: "en-IN",
      dateModified: CONTENT_UPDATED,
      hasDefinedTerm: GLOSSARY.map((entry) => ({
        "@type": "DefinedTerm",
        "@id": `${url}#${entry.slug}`,
        name: entry.term,
        description: entry.text,
        termCode: `Section 2(${entry.clause})`,
        inDefinedTermSet: `${url}#terms`,
      })),
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    // No `BreadcrumbList` here: `PageHero` emits one from its `path`, and two
    // on a page is a structured-data error rather than a stronger signal.
  ],
};

export default function GlossaryPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="reader" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <PageHero
          breadcrumb="Glossary"
          path="/glossary"
          eyebrow="§ 2(a)–(zb) · 28 defined terms"
          title="Every Term the DPDP Act Defines."
          titleAccent="Verbatim, Not Paraphrased."
          lede="Section 2 defines twenty-eight terms and they govern the whole Act: a word used anywhere in the statute carries its section 2 meaning unless the context otherwise requires. Each entry below is the clause as enacted, with a link to the provision it sits in."
        >
          <div className="mt-[22px] flex flex-wrap gap-[10px]">
            <Badge tone="primary">Section 2 in full</Badge>
            <Badge tone="neutral">
              Current as of {CONTENT_UPDATED_LABEL}
            </Badge>
          </div>
        </PageHero>

        <section className="border-t border-border bg-[var(--bg-sunken)]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[16px] px-[var(--space-5)] py-[clamp(28px,3.6vw,42px)]">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
              Jump to a term
            </span>
            <nav
              aria-label="Glossary index"
              className="flex flex-wrap gap-[7px]"
            >
              {GLOSSARY.map((entry) => (
                <a
                  key={entry.slug}
                  href={`#${entry.slug}`}
                  className="rounded-sm border border-border bg-surface px-[11px] py-[5px] text-[13px] text-text-secondary no-underline hover:border-primary-text hover:text-primary-text"
                >
                  {entry.term}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="border-t border-border bg-[var(--bg-app)]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[13px] px-[var(--space-5)] py-[clamp(38px,5vw,64px)]">
            {GLOSSARY.map((entry) => (
              <div
                key={entry.slug}
                id={entry.slug}
                className="flex flex-wrap gap-[16px] scroll-mt-[90px] rounded-lg border border-border bg-surface p-[clamp(18px,2.6vw,24px)]"
              >
                <span className="flex-[0_0_112px] font-mono text-[12.5px] font-semibold leading-[1.5] text-primary-text">
                  <ProvisionRef value={`§ 2(${entry.clause})`} />
                </span>
                <span className="flex min-w-0 flex-[1_1_420px] flex-col gap-[8px]">
                  <h2 className="m-0 font-display text-[17.5px] font-semibold leading-[1.3] text-text">
                    {entry.term}
                  </h2>
                  <p className="m-0 text-[14.5px] leading-[1.75] text-text-secondary">
                    {entry.text}
                  </p>
                  {entry.related ? (
                    <Link
                      href={entry.related.href}
                      className="text-[13.5px] font-semibold text-primary-text no-underline hover:underline"
                    >
                      {entry.related.label} →
                    </Link>
                  ) : null}
                </span>
              </div>
            ))}

            <p className="m-0 mt-[10px] max-w-[76ch] text-[13.5px] leading-[1.7] text-text-muted">
              Each definition is reproduced verbatim from{" "}
              <a
                href={ACT_SOURCE_PDF}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary-text"
              >
                the Act as published by MeitY (PDF)
              </a>
              . Read the clause in place in{" "}
              <Link
                href={actPath("section-2")}
                className="font-semibold text-primary-text"
              >
                section 2
              </Link>
              , or the whole statute in{" "}
              <Link
                href={routes.readerFullText}
                className="font-semibold text-primary-text"
              >
                the full-text reader
              </Link>
              .
            </p>
          </div>
        </section>

        <EditorialReview />

        <Faq items={FAQ} heading="Definitions, answered" />
      </main>

      <SiteFooter />
    </div>
  );
}
