import type { Metadata } from "next";
import { BookOpenCheck, FileSearch, RefreshCw, Scale } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import {
  EDITORIAL_AUTHOR,
  EDITORIAL_REVIEWER,
  LEGAL_REVIEWED_ON,
} from "@/lib/editorial";

const PRINCIPLES = [
  {
    icon: FileSearch,
    title: "Primary sources first",
    body: "Statutory claims are checked against the Gazette of India and official Ministry publications. Commentary and competitor material are not treated as authority for the law.",
  },
  {
    icon: Scale,
    title: "Law and interpretation stay separate",
    body: "Verbatim statutory text is identified as such. Explanations, examples and implementation suggestions are editorial summaries and are never presented as a substitute for legal advice.",
  },
  {
    icon: RefreshCw,
    title: "Dates and status are explicit",
    body: "Pages covering changing law display a review date and distinguish provisions already in force from provisions with a scheduled future commencement.",
  },
  {
    icon: BookOpenCheck,
    title: "Corrections remain visible",
    body: "Material corrections update the page review date and source trail. Readers can report an issue through the public repository linked below.",
  },
] as const;

export const metadata: Metadata = {
  title: "Editorial Policy, Sources & Corrections",
  description:
    "How DPDP Academy reviews legal education content, distinguishes statutory text from interpretation, cites sources and handles corrections.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav />

      <main>
        <PageHero
          breadcrumb="Editorial Policy"
          eyebrow="Sources · Review · Corrections"
          title="Trust Starts With"
          titleAccent="Showing The Work"
          lede="DPDP Academy is an independent educational project. It is not affiliated with the Government of India, MeitY or the Data Protection Board of India, and its certificate is not a government credential."
        />

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-[clamp(34px,5vw,52px)] px-[var(--space-5)] py-[clamp(42px,6vw,72px)]">
            <div className="grid gap-[14px] min-[720px]:grid-cols-2">
              {PRINCIPLES.map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="rounded-lg border border-border bg-surface p-[22px]"
                >
                  <Icon
                    size={21}
                    aria-hidden="true"
                    className="mb-[13px] text-primary-text"
                  />
                  <h2 className="m-0 font-display text-[20px] font-semibold text-text">
                    {title}
                  </h2>
                  <p className="mb-0 mt-[8px] text-[14.5px] leading-[1.75] text-text-secondary">
                    {body}
                  </p>
                </article>
              ))}
            </div>

            <section>
              <h2 className="m-0 font-display text-[27px] font-semibold text-text">
                Who prepares and reviews the material
              </h2>
              <dl className="mb-0 mt-[16px] grid gap-[12px] min-[720px]:grid-cols-2">
                <div className="rounded-lg border border-border bg-surface p-[20px]">
                  <dt className="font-display text-[18px] font-semibold text-text">
                    {EDITORIAL_AUTHOR.name}
                  </dt>
                  <dd className="mb-0 ml-0 mt-[7px] text-[14px] leading-[1.7] text-text-secondary">
                    {EDITORIAL_AUTHOR.role}. The team prepares explanations,
                    implementation notes and learning materials.
                  </dd>
                </div>
                <div className="rounded-lg border border-border bg-surface p-[20px]">
                  <dt className="font-display text-[18px] font-semibold text-text">
                    {EDITORIAL_REVIEWER.name}
                  </dt>
                  <dd className="mb-0 ml-0 mt-[7px] text-[14px] leading-[1.7] text-text-secondary">
                    {EDITORIAL_REVIEWER.role}. The current legal-source review
                    date is {LEGAL_REVIEWED_ON}.
                  </dd>
                </div>
              </dl>
              <p className="mb-0 mt-[14px] text-[14px] leading-[1.75] text-text-muted">
                These are organisation-level bylines, not claims that a named
                advocate has reviewed the material. Named professional
                credentials will appear only when the contributor has agreed to
                publish them.
              </p>
            </section>

            <section>
              <h2 className="m-0 font-display text-[27px] font-semibold text-text">
                Source hierarchy
              </h2>
              <ol className="mb-0 mt-[16px] flex list-decimal flex-col gap-[11px] pl-[20px] text-[15px] leading-[1.75] text-text-secondary">
                <li>Gazette of India Acts, Rules, corrigenda and notifications.</li>
                <li>Official MeitY and Data Protection Board publications.</li>
                <li>Judgments, orders and directions when they become available.</li>
                <li>Secondary practitioner commentary for context, clearly attributed.</li>
              </ol>
            </section>

            <section className="rounded-lg border border-border-strong bg-[var(--bg-sunken)] p-[clamp(22px,4vw,34px)]">
              <h2 className="m-0 font-display text-[25px] font-semibold text-text">
                Report a correction
              </h2>
              <p className="mb-0 mt-[10px] max-w-[68ch] text-[15px] leading-[1.75] text-text-secondary">
                Open an issue in the public project repository with the page URL,
                disputed statement and primary source. Do not include personal,
                confidential or case-specific information.
              </p>
              <a
                href="https://github.com/ajitbubu/dpdpact.net/issues"
                target="_blank"
                rel="noreferrer"
                className="mt-[18px] inline-flex text-[14px] font-semibold text-primary-text no-underline"
              >
                Report an editorial issue →
              </a>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
