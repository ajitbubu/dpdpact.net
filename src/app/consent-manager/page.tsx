import type { Metadata } from "next";
import { Building2, ExternalLink, Fingerprint, ShieldQuestion } from "lucide-react";
import Link from "next/link";

import { EditorialReview } from "@/components/editorial-review";
import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { RelatedGuides } from "@/components/related-guides";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { blogPath } from "@/lib/blog-posts";
import { routes } from "@/lib/routes";
import { CONTENT_UPDATED, SITE_NAME, SITE_URL } from "@/lib/site";

const RULES_SOURCE =
  "https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf";
const MEITY_HUB =
  "https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa";

/** What the Act itself says. Quoted, because the definition does the work. */
const ACT_PROVISIONS = [
  {
    ref: "§ 2(g)",
    title: "The definition",
    body: "A person registered with the Board, who acts as a single point of contact to enable a Data Principal to give, manage, review and withdraw her consent through an accessible, transparent and interoperable platform.",
  },
  {
    ref: "§ 6(7)",
    title: "The routing right",
    body: "The Data Principal may give, manage, review or withdraw her consent to the Data Fiduciary through a Consent Manager. It is her choice to route consent this way, not the Data Fiduciary's.",
  },
  {
    ref: "§ 6(8)",
    title: "Whose side they are on",
    body: "The Consent Manager shall be accountable to the Data Principal and shall act on her behalf. This is the provision that makes the role unusual, and it is the one most likely to be misread.",
  },
  {
    ref: "§ 6(9)",
    title: "Registration is mandatory",
    body: "Every Consent Manager shall be registered with the Board, subject to such technical, operational, financial and other conditions as may be prescribed. Those conditions arrived with the Rules.",
  },
];

/** Rule 4 and the First Schedule, as reported consistently across sources. */
const ELIGIBILITY = [
  "A company incorporated in India, with sufficient technical, operational and financial capacity.",
  "Net worth of not less than two crore rupees.",
  "Directors and senior management with a general reputation and record of fairness and integrity.",
  "A memorandum and articles of association that bind the company to conflict-of-interest requirements.",
  "Independent certification that the platform meets data protection standards, and an interoperable design.",
];

const OBLIGATIONS = [
  "Enable a Data Principal to give, manage, review and withdraw consent for any Data Fiduciary, through a website or app.",
  "Ensure personal data routed through the platform stays unreadable to the Consent Manager itself. They carry consent, not content.",
  "Maintain records of consents, withdrawals and notices, and retain them for at least seven years.",
  "Avoid conflicts of interest with Data Fiduciaries, and act in a fiduciary capacity towards the individual.",
  "Publish transparency information and run effective audit mechanisms over the platform.",
];

const FAQ = [
  {
    q: "What is a Consent Manager, in one sentence?",
    a: "A Board-registered intermediary that gives an individual one place to grant, review and withdraw consent across many organisations, instead of chasing each company's own preference centre.",
  },
  {
    q: "Does my company need to become one?",
    a: "Almost certainly not. The role is a licensed business, not a compliance obligation. What Data Fiduciaries need is the ability to accept and honour consent that arrives through a Consent Manager, because section 6(7) makes that the individual's choice.",
  },
  {
    q: "When does registration open?",
    a: "Section 6(9) and Rule 4 sit in the one-year tranche of the commencement notification, which falls in mid-November 2026, one year after the Rules were published on 13 November 2025.",
  },
  {
    q: "Can a Consent Manager read the data it routes?",
    a: "No. The First Schedule requires that personal data shared through the platform remains unreadable to the Consent Manager. The design intent is that they hold the consent record and the routing, not the payload.",
  },
  {
    q: "Is there anything like this in GDPR?",
    a: "No. GDPR has no statutory consent-intermediary role. This is one of the genuinely original pieces of the Indian framework, closer in spirit to account aggregators in Indian financial regulation than to anything in European data protection law.",
  },
];

export const metadata: Metadata = {
  title: "Consent Managers Under the DPDP Act",
  description:
    "What a DPDP Consent Manager is, what sections 2(g) and 6(7)-(9) require, the Rule 4 registration conditions, and what Data Fiduciaries must be ready to accept.",
  alternates: { canonical: "/consent-manager" },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Consent Managers under the DPDP Act and the DPDP Rules, 2025",
  description:
    "The statutory basis for Consent Managers in sections 2(g) and 6(7) to 6(9) of the DPDP Act, the registration and operating conditions added by Rule 4 and the First Schedule, and what the role means for Data Fiduciaries.",
  datePublished: "2026-08-09",
  dateModified: CONTENT_UPDATED,
  author: { "@type": "Organization", name: SITE_NAME + " Editorial" },
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  mainEntityOfPage: SITE_URL + "/consent-manager",
  citation: [RULES_SOURCE, MEITY_HUB, SITE_URL + "/reader/section-6"],
};

export default function ConsentManagerPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="roles" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />

        <PageHero
          breadcrumb="Consent Managers"
          path="/consent-manager"
          eyebrow="§ 2(g) · § 6(7)–(9) · Rule 4 · First Schedule"
          title="A Role No Other Privacy Law Has."
          titleAccent="Registration Opens in 2026."
          lede="The Consent Manager is the most original idea in the DPDP Act: a licensed intermediary that an individual can use to give, review and withdraw consent across every organisation at once, and which the statute makes accountable to her rather than to whoever pays its bills."
        >
          <div className="mt-[22px] flex flex-wrap gap-[10px]">
            <Badge tone="primary">Unique to India</Badge>
            <Badge tone="neutral">Current as of {CONTENT_UPDATED}</Badge>
          </div>
        </PageHero>

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(38px,5vw,60px)] px-[var(--space-5)] py-[clamp(42px,6vw,76px)]">
            {/* ------------------------------------------ What the Act says */}
            <div className="flex flex-col gap-[18px]">
              <div>
                <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  In the Act
                </span>
                <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                  Four provisions create the role
                </h2>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(288px,1fr))] gap-[16px]">
                {ACT_PROVISIONS.map((item) => (
                  <Card key={item.ref} className="block h-full">
                    <span className="mb-[12px] block font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-primary-text tabular-nums">
                      {item.ref}
                    </span>
                    <span className="mb-[9px] block font-display text-[18px] font-semibold leading-[1.3] text-text">
                      {item.title}
                    </span>
                    <span className="block text-[14px] leading-[1.72] text-text-secondary">
                      {item.body}
                    </span>
                  </Card>
                ))}
              </div>

              <p className="m-0 max-w-[74ch] text-[14px] leading-[1.7] text-text-muted">
                Read them in place:{" "}
                <Link href="/reader/section-6" className="font-semibold text-primary-text">
                  section 6 on consent
                </Link>{" "}
                and{" "}
                <Link href="/reader/section-2" className="font-semibold text-primary-text">
                  section 2 on definitions
                </Link>
                .
              </p>
            </div>

            {/* ------------------------------------------ The structural point */}
            <div className="flex flex-col gap-[14px] rounded-lg border-[1.5px] border-primary bg-surface p-[clamp(20px,3vw,30px)]">
              <span className="flex items-center gap-[10px]">
                <span className="inline-flex size-[40px] shrink-0 items-center justify-center rounded-sm bg-primary text-white">
                  <ShieldQuestion size={20} aria-hidden="true" />
                </span>
                <span className="font-display text-[clamp(19px,2.4vw,23px)] font-semibold leading-[1.3] text-text">
                  Accountable to her, paid by someone else
                </span>
              </span>
              <p className="m-0 max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                Section 6(8) is a short sentence with a lot of weight in it. The
                Consent Manager is accountable to the Data Principal and acts on
                her behalf. But the commercial relationship, in every model
                anyone has proposed, runs the other way: Data Fiduciaries are
                the ones with a reason to pay for consent infrastructure.
              </p>
              <p className="m-0 max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                The Rules answer that tension with structure rather than
                prohibition: conflict-of-interest duties written into the
                constitutional documents of the company, a bar on acting for
                both sides, transparency obligations and audit. Whether that
                holds in practice is the open question of the whole framework,
                and it will not be answered until the first registrations are
                live.
              </p>
            </div>

            {/* ------------------------------------------- Rule 4 conditions */}
            <div className="grid gap-[16px] min-[860px]:grid-cols-2">
              <div className="flex flex-col gap-[14px] rounded-lg border border-border bg-surface p-[22px]">
                <span className="flex items-center gap-[10px]">
                  <span className="inline-flex size-[36px] items-center justify-center rounded-sm bg-primary-tint text-primary-text">
                    <Building2 size={18} aria-hidden="true" />
                  </span>
                  <span className="font-display text-[19px] font-semibold text-text">
                    Getting registered
                  </span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
                  First Schedule, Part A
                </span>
                <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
                  {ELIGIBILITY.map((item) => (
                    <li
                      key={item}
                      className="flex gap-[10px] text-[14px] leading-[1.7] text-text-secondary"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[9px] size-[5px] shrink-0 rounded-full bg-primary-text"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-[14px] rounded-lg border border-border bg-surface p-[22px]">
                <span className="flex items-center gap-[10px]">
                  <span className="inline-flex size-[36px] items-center justify-center rounded-sm bg-primary-tint text-primary-text">
                    <Fingerprint size={18} aria-hidden="true" />
                  </span>
                  <span className="font-display text-[19px] font-semibold text-text">
                    Staying registered
                  </span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
                  First Schedule, Part B
                </span>
                <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
                  {OBLIGATIONS.map((item) => (
                    <li
                      key={item}
                      className="flex gap-[10px] text-[14px] leading-[1.7] text-text-secondary"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[9px] size-[5px] shrink-0 rounded-full bg-primary-text"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="m-0 border-t border-border pt-[12px] text-[13.5px] leading-[1.65] text-text-muted">
                  The Board may suspend or cancel a registration after giving
                  the Consent Manager an opportunity to be heard.
                </p>
              </div>
            </div>

            {/* ------------------------------------------- What fiduciaries do */}
            <div className="flex flex-col gap-[12px]">
              <h2 className="m-0 font-display text-[clamp(22px,3vw,30px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                What this means if you are not becoming one
              </h2>
              <p className="m-0 max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                Most organisations reading this will never register. The
                obligation that reaches them is quieter: section 6(7) gives the
                individual the right to route consent through a Consent Manager,
                which means a Data Fiduciary has to be able to receive a consent
                signal it did not collect itself, honour a withdrawal that
                arrives the same way, and reconcile both against its own purpose
                records.
              </p>
              <p className="m-0 max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                If your consent store keys on a session or a form submission
                rather than on a durable purpose identifier tied to the
                individual, that is the piece to fix now. It is the same work
                the{" "}
                <Link
                  href="/blog/dpdp-consent-notice-guide"
                  className="font-semibold text-primary-text"
                >
                  consent notice guide
                </Link>{" "}
                describes, with an external caller added.
              </p>
            </div>

            {/* -------------------------------------------- Timing + honesty */}
            <div className="flex flex-col gap-[10px] rounded-lg border border-border bg-[var(--bg-sunken)] p-[22px]">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted">
                Timing, and what is not yet settled
              </span>
              <p className="m-0 max-w-[74ch] text-[14px] leading-[1.72] text-text-secondary">
                Section 6(9) and Rule 4 fall in the one-year tranche of the
                commencement notification, which lands in mid-November 2026.
                Registration is with the Data Protection Board, and MeitY
                invited applications for the Board&apos;s Chairperson and Members
                in May 2026. Public reporting since then differs on whether
                those appointments have been completed, so treat the Board&apos;s
                readiness to receive registrations as an open question rather
                than a settled fact.
              </p>
              <p className="m-0 max-w-[74ch] text-[14px] leading-[1.72] text-text-secondary">
                The Part A and Part B conditions above are summarised from the
                First Schedule to the DPDP Rules, 2025 as reported consistently
                across sources. Anyone actually applying should work from the
                Gazette text rather than from this summary.
              </p>
              <div className="mt-[6px] flex flex-col gap-[8px]">
                {[
                  { href: RULES_SOURCE, label: "DPDP Rules, 2025 - Gazette text" },
                  { href: MEITY_HUB, label: "MeitY DPDP Rules hub" },
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

        <Faq items={FAQ} heading="Consent Managers, answered" />
      </main>

      <RelatedGuides
        heading="Related"
        guides={[
          {
            href: routes.roles,
            label: "The six roles the DPDP Act defines",
            blurb:
              "Where the Consent Manager sits beside Data Principal, Fiduciary, Processor, SDF and the Board.",
          },
          {
            href: routes.rules,
            label: "DPDP Rules 2025 - requirements and timeline",
            blurb: "The commencement tranches, including the one Rule 4 sits in.",
          },
          {
            href: routes.deadline,
            label: "DPDP compliance deadline and Consent Manager start date",
            blurb: "The dedicated timeline for 13 November 2026 and 13 May 2027.",
          },
          {
            href: blogPath("dpdp-consent-notice-guide"),
            label: "DPDP consent notices: what product teams need to ship",
            blurb:
              "Purpose-level consent, withdrawal and the evidence to retain.",
          },
          {
            href: routes.templates,
            label: "Consent notice template and register",
            blurb: "Editable starter files and the implementation resources behind them.",
          },
          {
            href: routes.gdpr,
            label: "DPDP vs GDPR",
            blurb: "Why GDPR has no equivalent of this role at all.",
          },
        ]}
      />

      <EditorialReview />
      <SiteFooter />
    </div>
  );
}
