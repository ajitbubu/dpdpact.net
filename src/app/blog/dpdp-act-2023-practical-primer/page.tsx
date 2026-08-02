
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { EditorialReview } from "@/components/editorial-review";
import { SiteNav } from "@/components/site-nav";
import { LinkButton } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "The DPDP Act, 2023: A Practical Primer",
  description:
    "A concise introduction to the DPDP Act: scope, lawful grounds, Data Fiduciary obligations, Data Principal rights and a practical starting point.",
  alternates: { canonical: "/blog/dpdp-act-2023-practical-primer" },
  openGraph: { type: "article", publishedTime: "2026-08-01" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "The DPDP Act, 2023: a practical primer",
  description:
    "A concise introduction to the scope, lawful grounds, duties and rights at the heart of India's DPDP Act.",
  datePublished: "2026-08-01",
  dateModified: "2026-08-01",
  author: { "@type": "Organization", name: SITE_NAME + " Editorial" },
  publisher: { "@type": "Organization", name: SITE_NAME },
  mainEntityOfPage: SITE_URL + "/blog/dpdp-act-2023-practical-primer",
};

const sectionHeading =
  "mb-[12px] mt-[clamp(34px,5vw,52px)] scroll-mt-[104px] font-display text-[clamp(23px,3vw,30px)] font-semibold leading-[1.25] tracking-[-0.02em] text-text";
const paragraph = "my-[16px] text-[16px] leading-[1.85] text-text-secondary";

export default function BlogPrimerPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="blog" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <header className="border-b border-border bg-[var(--bg-sunken)]">
          <div className="mx-auto w-full max-w-[900px] px-[var(--space-5)] py-[clamp(36px,6vw,76px)]">
            <Link
              href={routes.blog}
              className="mb-[30px] inline-flex items-center gap-[8px] text-[13px] font-semibold text-text-secondary no-underline hover:text-primary-text"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to the blog
            </Link>
            <div className="flex flex-col gap-[16px]">
              <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                Foundations · 6 min read
              </span>
              <h1 className="m-0 max-w-[18ch] font-display text-[clamp(36px,6vw,62px)] font-semibold leading-[1.07] tracking-[-0.04em] text-text [text-wrap:balance]">
                The DPDP Act, 2023: a practical primer
              </h1>
              <p className="m-0 max-w-[68ch] text-[clamp(16px,1.8vw,19px)] leading-[1.75] text-text-secondary">
                A clear starting point for understanding who the law covers,
                what it requires and how an organisation can begin preparing.
              </p>
              <div className="mt-[8px] flex flex-wrap gap-x-[18px] gap-y-[6px] font-mono text-[12px] text-text-muted">
                <span>01 August 2026</span>
                <span>DPDP Academy Editorial</span>
              </div>
            </div>
          </div>
        </header>

        <article className="bg-[var(--bg-app)]">
          <div className="mx-auto grid w-full max-w-[1000px] gap-[36px] px-[var(--space-5)] py-[clamp(42px,6vw,76px)] min-[860px]:grid-cols-[190px_minmax(0,700px)]">
            <aside className="hidden min-[860px]:block">
              <div className="sticky top-[104px] border-l border-border pl-[16px]">
                <span className="mb-[12px] block font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted">
                  In this article
                </span>
                <nav
                  className="flex flex-col gap-[10px] text-[13px] leading-[1.5]"
                  aria-label="Article contents"
                >
                  <a href="#scope" className="text-text-secondary no-underline hover:text-primary-text">
                    1. Scope
                  </a>
                  <a href="#grounds" className="text-text-secondary no-underline hover:text-primary-text">
                    2. Lawful grounds
                  </a>
                  <a href="#duties" className="text-text-secondary no-underline hover:text-primary-text">
                    3. Core duties
                  </a>
                  <a href="#rights" className="text-text-secondary no-underline hover:text-primary-text">
                    4. Individual rights
                  </a>
                  <a href="#start" className="text-text-secondary no-underline hover:text-primary-text">
                    5. Where to start
                  </a>
                </nav>
              </div>
            </aside>

            <div className="min-w-0">
              <p className="m-0 border-l-2 border-primary-text pl-[18px] text-[17px] font-medium leading-[1.8] text-text">
                The Digital Personal Data Protection Act, 2023 creates a focused
                framework for processing digital personal data in India. Its
                central bargain is simple: use personal data for a lawful
                purpose, respect the individual and remain accountable for how
                the data is handled.
              </p>

              <h2 id="scope" className={sectionHeading}>
                1. Begin with scope
              </h2>
              <p className={paragraph}>
                The Act applies to digital personal data processed in India,
                including information first collected offline and digitised
                later. It can also reach processing outside India when that
                processing is connected with offering goods or services to
                people in India.
              </p>
              <p className={paragraph}>
                Two exclusions are especially useful at the outset: personal
                data used by an individual for a personal or domestic purpose,
                and data made publicly available by the individual or under a
                legal obligation. The governing starting point is section 3.
              </p>

              <h2 id="grounds" className={sectionHeading}>
                2. Identify the lawful ground
              </h2>
              <p className={paragraph}>
                Processing must be for a lawful purpose and rest on either the
                Data Principal&apos;s consent or one of the &ldquo;certain
                legitimate uses&rdquo; in section 7. This choice should be made
                deliberately for each purpose; it shapes the notice, the
                operational workflow and what happens when an individual
                withdraws consent.
              </p>

              <div className="my-[28px] rounded-lg border border-border bg-[var(--bg-sunken)] p-[22px]">
                <span className="mb-[8px] block font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  Practical question
                </span>
                <p className="m-0 text-[15px] leading-[1.75] text-text-secondary">
                  For every personal-data use, can your team name the purpose,
                  the lawful ground, the data involved, the retention point and
                  the person accountable for the decision?
                </p>
              </div>

              <h2 id="duties" className={sectionHeading}>
                3. Build around the core duties
              </h2>
              <p className={paragraph}>
                The Data Fiduciary remains responsible for compliance,
                including processing carried out on its behalf by a Data
                Processor. Section 8 turns that accountability into concrete
                work: keep data accurate where decisions or disclosures depend
                on it, use reasonable security safeguards, notify breaches as
                prescribed, erase data when retention is no longer necessary,
                and provide an effective grievance mechanism.
              </p>
              <p className={paragraph}>
                Children&apos;s data and Significant Data Fiduciaries carry
                additional duties. These should be treated as separate
                workstreams rather than small additions to a general privacy
                notice.
              </p>

              <h2 id="rights" className={sectionHeading}>
                4. Design for individual rights
              </h2>
              <p className={paragraph}>
                The Act gives a Data Principal rights to information about
                processing, correction and erasure, grievance redressal, and
                nomination. A reliable request process needs more than an
                inbox: it needs identity checks, ownership, retrieval across
                systems, response tracking and a clear escalation route.
              </p>

              <h2 id="start" className={sectionHeading}>
                5. Start with a data-purpose map
              </h2>
              <p className={paragraph}>
                A useful first deliverable is not a policy. It is a compact map
                of the organisation&apos;s important processing activities:
                what personal data is used, for which purpose, under which
                ground, by which systems and vendors, for how long, and with
                what safeguard. That map exposes the gaps a policy can
                otherwise hide.
              </p>
              <p className={paragraph}>
                From there, prioritise public-facing notices and consent
                journeys, processor contracts, breach readiness, retention and
                deletion, and the workflow for Data Principal requests. The
                result is a compliance programme tied to actual processing
                rather than a stack of documents.
              </p>

              <div className="mt-[44px] border-y border-border py-[24px]">
                <p className="m-0 text-[13px] leading-[1.7] text-text-muted">
                  This article is an educational summary of the DPDP Act, 2023
                  and does not constitute legal advice. Consult the statutory
                  text and qualified counsel for decisions about a specific
                  organisation.
                </p>
              </div>

              <div className="mt-[30px] flex flex-wrap gap-[12px]">
                <LinkButton
                  href={routes.overview}
                  variant="primary"
                  size="lg"
                  iconRight={<ArrowRight size={17} />}
                >
                  Explore the Act overview
                </LinkButton>
                <LinkButton
                  href={routes.reader}
                  variant="secondary"
                  size="lg"
                >
                  Read the statutory text
                </LinkButton>
              </div>
            </div>
          </div>
        </article>
      </main>

      <EditorialReview scope="the Gazette text of the DPDP Act, 2023" />
      <SiteFooter />
    </div>
  );
}
