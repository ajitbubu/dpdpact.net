import type { Metadata } from "next";
import { Download, ExternalLink, FileCheck2, GitFork } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { routes } from "@/lib/routes";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "DPDP Act & Rules Official Source Register",
  description:
    "Official Gazette and MeitY sources used by DPDP Academy for the DPDP Act, 2023, Rules, 2025 and phased commencement dates.",
  alternates: { canonical: "/sources" },
};

const SOURCES = [
  {
    title: "Digital Personal Data Protection Act, 2023",
    authority: "Ministry of Electronics and Information Technology",
    supports: "The enacted 44 sections, nine chapters and Schedule reproduced by the reader.",
    href: "https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf",
    checked: "9 August 2026",
  },
  {
    title: "Digital Personal Data Protection Rules, 2025",
    authority: "Gazette publication hosted by MeitY",
    supports: "The 23 notified Rules, seven Schedules and operational requirements discussed throughout the site.",
    href: "https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf",
    checked: "11 August 2026",
  },
  {
    title: "DPDP Act commencement notification",
    authority: "Gazette publication hosted by MeitY",
    supports: "The phased dates of 13 November 2025, 13 November 2026 and 13 May 2027.",
    href: "https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf",
    checked: "11 August 2026",
  },
  {
    title: "MeitY DPDP Rules publication hub",
    authority: "Ministry of Electronics and Information Technology",
    supports: "The current publication point for the Rules, commencement material, Board documents and corrigenda.",
    href: "https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa",
    checked: "11 August 2026",
  },
] as const;

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "DPDP Act and Rules official source register",
  url: `${SITE_URL}${routes.sources}`,
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  hasPart: SOURCES.map((source) => ({
    "@type": "DigitalDocument",
    name: source.title,
    url: source.href,
  })),
};

export default function SourcesPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav />
      <main>
        <PageHero
          breadcrumb="Official Sources"
          path={routes.sources}
          eyebrow="Gazette and MeitY source register"
          title="Check the Source"
          titleAccent="Behind the Explanation"
          lede="These are the primary official publications used for statutory text, Rules commentary and commencement dates. Each entry says what it supports and when the link was last checked."
        >
          <div className="mt-[22px] flex flex-wrap gap-[10px]">
            <Badge>Four primary publications</Badge>
            <Badge tone="neutral">Last checked 11 August 2026</Badge>
          </div>
        </PageHero>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto w-full max-w-[960px] px-[var(--space-5)] py-[clamp(42px,6vw,72px)]">
            <div className="grid gap-[14px] min-[720px]:grid-cols-2">
              {SOURCES.map((source) => (
                <article key={source.href} className="flex min-h-[290px] flex-col justify-between rounded-lg border border-border bg-surface p-[22px]">
                  <div>
                    <FileCheck2 size={22} aria-hidden="true" className="mb-[18px] text-primary-text" />
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.09em] text-text-muted">{source.authority}</span>
                    <h2 className="mb-0 mt-[7px] font-display text-[21px] font-semibold leading-[1.28] text-text">{source.title}</h2>
                    <p className="mb-0 mt-[10px] text-[14px] leading-[1.7] text-text-secondary">{source.supports}</p>
                  </div>
                  <div className="mt-[20px] flex items-center justify-between gap-[12px]">
                    <a href={source.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-[7px] text-[13.5px] font-semibold text-primary-text no-underline">
                      Open official source <ExternalLink size={14} aria-hidden="true" />
                    </a>
                    <span className="font-mono text-[10px] text-text-muted">{source.checked}</span>
                  </div>
                </article>
              ))}
            </div>

            <section className="mt-[26px] grid gap-[18px] rounded-lg border border-border-strong bg-[var(--bg-sunken)] p-[clamp(22px,4vw,32px)] min-[720px]:grid-cols-[1fr_auto] min-[720px]:items-center">
              <div>
                <h2 className="m-0 font-display text-[24px] font-semibold text-text">Reuse the commencement data</h2>
                <p className="mb-0 mt-[8px] text-[14px] leading-[1.7] text-text-secondary">
                  Download the three commencement phases as an open CSV with the official source and last-checked date in every row.
                </p>
              </div>
              <a href="/resources/dpdp-commencement-timeline.csv" download className="inline-flex items-center justify-center gap-[8px] rounded-md border border-primary bg-primary px-[18px] py-[13px] text-[14px] font-semibold text-white no-underline">
                <Download size={16} aria-hidden="true" /> Download CSV
              </a>
            </section>

            <section className="mt-[26px] flex gap-[12px] rounded-lg border border-border bg-surface p-[20px]">
              <GitFork size={20} aria-hidden="true" className="mt-[2px] shrink-0 text-primary-text" />
              <div>
                <h2 className="m-0 font-display text-[19px] font-semibold text-text">Corrections are inspectable</h2>
                <p className="mb-0 mt-[7px] text-[13.5px] leading-[1.68] text-text-secondary">
                  Source changes and correction reports are handled in the public repository. Cite the official publication for the law; cite a DPDP Academy page only for its original explanation, workflow or dataset.
                </p>
                <a href="https://github.com/ajitbubu/dpdpact.net/issues/new?labels=content&title=Source%20correction%3A%20" className="mt-[9px] inline-block text-[13px] font-semibold text-primary-text no-underline">Report a source problem →</a>
              </div>
            </section>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
