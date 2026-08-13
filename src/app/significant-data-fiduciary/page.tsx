import type { Metadata } from "next";
import { ExternalLink, Gavel, Globe2, ScanSearch, UserCog } from "lucide-react";
import Link from "next/link";

import { EditorialReview } from "@/components/editorial-review";
import { Faq } from "@/components/faq";
import { ProvisionRef } from "@/components/provision-ref";
import { PageHero } from "@/components/page-hero";
import { RelatedGuides } from "@/components/related-guides";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { blogPath } from "@/lib/blog-posts";
import { routes } from "@/lib/routes";
import {
  CONTENT_UPDATED,
  CONTENT_UPDATED_LABEL,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const RULES_SOURCE =
  "https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf";
const SFLC_SOURCE =
  "https://sflc.in/dpdp-rules-2025-significant-data-fiduciaries-and-data-transfers/";

/** § 10(1): the factors the Government weighs. Verbatim from the Act. */
const FACTORS = [
  "The volume and sensitivity of personal data processed",
  "Risk to the rights of the Data Principal",
  "Potential impact on the sovereignty and integrity of India",
  "Risk to electoral democracy",
  "Security of the State",
  "Public order",
];

/** § 10(2): what designation actually obliges you to do. */
const ACT_DUTIES = [
  {
    icon: UserCog,
    title: "A Data Protection Officer, in India",
    body: "Not merely a privacy lead. The DPO represents the Significant Data Fiduciary under the Act, must be based in India, must be an individual answerable to the board of directors or equivalent governing body, and is the contact point for grievance redressal.",
    ref: "§ 10(2)(a)",
  },
  {
    icon: ScanSearch,
    title: "An independent data auditor",
    body: "Appointed to carry out a data audit and evaluate the organisation's compliance with the Act. The Act requires independence, which rules out marking your own homework through an internal audit function alone.",
    ref: "§ 10(2)(b)",
  },
  {
    icon: Gavel,
    title: "Periodic DPIA and audit",
    body: "A Data Protection Impact Assessment describing the rights of Data Principals and the purpose of processing, then assessing and managing the risk to those rights. Plus a periodic audit, and whatever further measures the Rules prescribe.",
    ref: "§ 10(2)(c)",
  },
];

/** What the Rules add on top of section 10. Substance is consistent across sources. */
const RULE_DUTIES = [
  {
    title: "Every twelve months, not merely periodically",
    body: "The Act says periodic. The Rules put a number on it: the DPIA and the audit are each carried out once every twelve months from the date of designation.",
  },
  {
    title: "The Board sees the findings",
    body: "A report containing significant observations from the assessment and audit is furnished to the Data Protection Board. This is the part that changes the stakes - the regulator receives your own auditor's list of problems.",
  },
  {
    title: "Algorithmic due diligence",
    body: "An obligation to verify that algorithmic software used to process personal data is not likely to pose a risk to the rights of Data Principals. Recommendation engines, ranking, content moderation and automated decisioning all fall inside this, and nothing comparable applies to an ordinary Data Fiduciary.",
  },
  {
    title: "Targeted localisation, not blanket localisation",
    body: "Categories of personal data specified by the Central Government, on the recommendation of a committee it constitutes, must not be transferred outside India. Everything else continues to follow section 16, which permits transfer unless a country is notified as restricted.",
  },
];

const FAQ = [
  {
    q: "How do I know if my company is a Significant Data Fiduciary?",
    a: "You are one when the Central Government notifies you, or a class you belong to, as one. There is no threshold you cross automatically - no user count, no revenue line, no volume of records. Section 10(1) lists the factors the Government weighs, not a test you can apply to yourself.",
  },
  {
    q: "Does the DPDP Act require Significant Data Fiduciaries to keep all data in India?",
    a: "No, and this is the most commonly misstated part of the framework. The obligation is targeted: only categories of personal data specified by the Central Government are restricted from leaving India. All other personal data continues under section 16, which permits transfer by default.",
  },
  {
    q: "Can our existing internal audit team do the data audit?",
    a: "Section 10(2)(b) requires an independent data auditor. Whether an internal function is sufficiently independent is a judgement call that depends on reporting lines and on how the Board reads the requirement, and it is worth taking advice on rather than assuming.",
  },
  {
    q: "Is the DPO the same as a GDPR DPO?",
    a: "The duties rhyme but the trigger and the seniority differ. GDPR Article 37 keys off public authority status or large-scale monitoring or special-category processing, and applies to controllers generally. The DPDP DPO exists only for a Significant Data Fiduciary, must be in India, and must answer to the board of directors.",
  },
  {
    q: "When do these obligations start?",
    a: "Section 10 sits in the eighteen-month tranche of the commencement notification, which lands in mid-May 2027. Designation itself requires a Government notification, so no organisation is a Significant Data Fiduciary until one is issued.",
  },
];

export const metadata: Metadata = {
  title: "Significant Data Fiduciary Obligations (§ 10)",
  description:
    "Who is notified as a Significant Data Fiduciary under DPDP section 10, and what designation adds: an India-based DPO, independent audit and annual DPIA.",
  alternates: { canonical: "/significant-data-fiduciary" },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Significant Data Fiduciaries: designation and additional obligations under the DPDP Act",
  description:
    "Section 10 of the DPDP Act, 2023 and the additional obligations the DPDP Rules, 2025 place on a Significant Data Fiduciary, including annual DPIA and audit, algorithmic due diligence and targeted data localisation.",
  datePublished: "2026-08-09",
  dateModified: CONTENT_UPDATED,
  author: { "@type": "Organization", name: SITE_NAME + " Editorial" },
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  mainEntityOfPage: SITE_URL + "/significant-data-fiduciary",
  citation: [RULES_SOURCE, SFLC_SOURCE, SITE_URL + "/reader/section-10"],
};

export default function SignificantDataFiduciaryPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="roles" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />

        <PageHero
          breadcrumb="Significant Data Fiduciary"
          path="/significant-data-fiduciary"
          eyebrow="§ 10 · DPDP Rules, 2025"
          title="You Do Not Become One."
          titleAccent="You Are Notified As One."
          lede="Significant Data Fiduciary is the only tier the DPDP Act creates, and it is not a threshold an organisation crosses by growing. The Central Government designates you, weighing factors that include risk to electoral democracy and the sovereignty of India alongside the volume of data you hold."
        >
          <div className="mt-[22px] flex flex-wrap gap-[10px]">
            <Badge tone="primary">Designation, not a threshold</Badge>
            <Badge tone="neutral">Current as of {CONTENT_UPDATED_LABEL}</Badge>
          </div>
        </PageHero>

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(38px,5vw,60px)] px-[var(--space-5)] py-[clamp(42px,6vw,76px)]">
            {/* --------------------------------------------- The six factors */}
            <div className="flex flex-col gap-[16px]">
              <div>
                <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  Section 10(1)
                </span>
                <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                  Six factors, and only one is about size
                </h2>
                <p className="mb-0 mt-[12px] max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                  The list is expressly non-exhaustive: the Government assesses
                  &ldquo;such relevant factors as it may determine,
                  including&rdquo; these six. Note how much of it is about the
                  State rather than about the individual.
                </p>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[12px]">
                {FACTORS.map((factor, i) => (
                  <div
                    key={factor}
                    className="flex gap-[12px] rounded-md border border-border bg-surface px-[18px] py-[16px]"
                  >
                    <span className="font-mono text-[13px] font-semibold text-primary-text tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="text-[14px] leading-[1.65] text-text-secondary">
                      {factor}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ------------------------------------------ What the Act adds */}
            <div className="flex flex-col gap-[18px]">
              <div>
                <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  Section 10(2)
                </span>
                <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                  Three obligations on top of everything else
                </h2>
                <p className="mb-0 mt-[12px] max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                  Designation does not replace the ordinary duties in sections 4
                  to 9. It adds to them.
                </p>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[16px]">
                {ACT_DUTIES.map(({ icon: Icon, ...duty }) => (
                  <Card key={duty.ref} className="block h-full">
                    <div className="mb-[14px] flex items-center justify-between gap-[10px]">
                      <span className="inline-flex size-[42px] items-center justify-center rounded-sm bg-primary-tint text-primary-text">
                        <Icon size={20} aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[12px] font-semibold text-text-muted tabular-nums">
                        <ProvisionRef value={duty.ref} />
                      </span>
                    </div>
                    <span className="mb-[9px] block font-display text-[18px] font-semibold leading-[1.3] text-text">
                      {duty.title}
                    </span>
                    <span className="block text-[14px] leading-[1.72] text-text-secondary">
                      {duty.body}
                    </span>
                  </Card>
                ))}
              </div>

              <p className="m-0 max-w-[74ch] text-[14px] leading-[1.7] text-text-muted">
                Read it verbatim:{" "}
                <Link
                  href="/reader/section-10"
                  className="font-semibold text-primary-text"
                >
                  section 10 in full
                </Link>
                .
              </p>
            </div>

            {/* ------------------------------------------- What the Rules add */}
            <div className="flex flex-col gap-[18px]">
              <div>
                <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  DPDP Rules, 2025
                </span>
                <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                  What the Rules turn &ldquo;periodic&rdquo; into
                </h2>
              </div>

              <div className="overflow-hidden rounded-lg border border-border">
                {RULE_DUTIES.map((duty, i) => (
                  <div
                    key={duty.title}
                    className={
                      i % 2 === 0
                        ? "flex flex-col gap-[7px] bg-[var(--bg-sunken)] px-[20px] py-[18px]"
                        : "flex flex-col gap-[7px] px-[20px] py-[18px]"
                    }
                  >
                    <span className="font-sans text-[15.5px] font-semibold text-text">
                      {duty.title}
                    </span>
                    <span className="max-w-[80ch] text-[14px] leading-[1.72] text-text-secondary">
                      {duty.body}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ------------------------------------------ Localisation myth */}
            <div className="flex flex-col gap-[14px] rounded-lg border-[1.5px] border-primary bg-surface p-[clamp(20px,3vw,30px)]">
              <span className="flex items-center gap-[10px]">
                <span className="inline-flex size-[40px] shrink-0 items-center justify-center rounded-sm bg-primary text-white">
                  <Globe2 size={20} aria-hidden="true" />
                </span>
                <span className="font-display text-[clamp(19px,2.4vw,23px)] font-semibold leading-[1.3] text-text">
                  The localisation claim, stated accurately
                </span>
              </span>
              <p className="m-0 max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                A great deal of published commentary says the Rules impose data
                localisation on Significant Data Fiduciaries. Read carefully,
                the obligation is narrower and conditional: it bites only on
                categories of personal data that the Central Government
                specifies, on the recommendation of a committee it constitutes.
                Until such a specification exists, there is nothing to localise
                under this head.
              </p>
              <p className="m-0 max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                Everything outside any specified category continues under{" "}
                <Link
                  href="/reader/section-16"
                  className="font-semibold text-primary-text"
                >
                  section 16
                </Link>
                , which permits transfer unless the Government notifies a
                country as restricted, and which expressly preserves stricter
                sectoral rules that already apply - the RBI&apos;s payment data
                requirements being the obvious example.
              </p>
            </div>

            {/* ------------------------------------------------ Sources note */}
            <div className="flex flex-col gap-[10px] rounded-lg border border-border bg-[var(--bg-sunken)] p-[22px]">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted">
                Sources, and one caveat
              </span>
              <p className="m-0 max-w-[74ch] text-[14px] leading-[1.72] text-text-secondary">
                Section 10 is quoted from the Act as published in the Gazette.
                The obligations attributed to the Rules are consistent across
                published analyses, but those analyses do not agree on the rule
                number - some place them at Rule 12 and others at Rule 13. The
                substance is not in dispute; the citation is. Work from the
                Gazette text if you need to cite a rule.
              </p>
              <div className="mt-[6px] flex flex-col gap-[8px]">
                {[
                  { href: RULES_SOURCE, label: "DPDP Rules, 2025 - Gazette text" },
                  { href: SFLC_SOURCE, label: "SFLC.in on SDFs and data transfers" },
                ].map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-[7px] text-[13.5px] font-semibold text-primary-text no-underline"
                  >
                    {source.label}
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Faq items={FAQ} heading="Significant Data Fiduciaries, answered" />
      </main>

      <RelatedGuides
        heading="Related"
        guides={[
          {
            href: routes.roles,
            label: "The six roles the DPDP Act defines",
            blurb:
              "Where the Significant Data Fiduciary sits among Principal, Fiduciary, Processor, Consent Manager and the Board.",
          },
          {
            href: blogPath("data-protection-officer-india-dpdp"),
            label: "When does the DPDP Act require a DPO?",
            blurb:
              "The section 10 trigger, and what everyone else should prepare anyway.",
          },
          {
            href: routes.gdpr,
            label: "DPDP vs GDPR",
            blurb:
              "Why GDPR's DPIA and DPO triggers do not map onto this designation.",
          },
          {
            href: routes.obligations,
            label: "Obligations under the DPDP Act (§§ 4–10)",
            blurb: "The baseline duties designation is added on top of.",
          },
        ]}
      />

      <EditorialReview />
      <SiteFooter />
    </div>
  );
}
