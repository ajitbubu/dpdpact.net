import type { Metadata } from "next";
import {
  BellRing,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileText,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Faq } from "@/components/faq";
import { EditorialReview } from "@/components/editorial-review";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { routes } from "@/lib/routes";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const RULES_SOURCE =
  "https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf";
const COMMENCEMENT_SOURCE =
  "https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf";
const MEITY_HUB =
  "https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa";

const TIMELINE = [
  {
    date: "13 November 2025",
    status: "In force",
    tone: "safe" as const,
    title: "Institutional framework begins",
    body: "Rules 1, 2 and 17–21 commenced on publication. The linked Act provisions include the Board, rule-making, interpretation and related institutional machinery.",
    refs: "Rules 1, 2, 17–21 · Act §§ 1(2), 2, 18–26, 35, 38–44 in part",
  },
  {
    date: "13 November 2026",
    status: "Scheduled",
    tone: "warning" as const,
    title: "Consent Manager framework",
    body: "Rule 4 is scheduled to commence one year after Gazette publication, alongside section 6(9) and the connected appellate provision.",
    refs: "Rule 4 · Act § 6(9) · § 27(1)(d)",
  },
  {
    date: "13 May 2027",
    status: "Scheduled",
    tone: "info" as const,
    title: "Core operational duties",
    body: "Most notice, consent, fiduciary obligation, rights, breach, penalty and implementation provisions are scheduled eighteen months after publication.",
    refs: "Rules 3, 5–16, 22–23 · most of Act §§ 3–17 and §§ 27–37",
  },
] as const;

const CHANGES = [
  {
    icon: FileText,
    title: "Notices become operational",
    body: "Rule 3 specifies a standalone, clear and plain-language notice that itemises the personal data and purpose, and explains how to withdraw consent, exercise rights and complain to the Board.",
    ref: "Rule 3 · Act § 5",
  },
  {
    icon: ShieldCheck,
    title: "Safeguards are specified",
    body: "Rule 6 describes minimum reasonable security safeguards, including controls such as encryption or masking, access controls, logs, backups, detection and processor contract measures.",
    ref: "Rule 6 · Act § 8(5)",
  },
  {
    icon: BellRing,
    title: "Breach notices have two stages",
    body: "Affected Data Principals must be informed without delay. The Board receives an initial intimation without delay and fuller prescribed information within seventy-two hours unless more time is allowed.",
    ref: "Rule 7 · Act § 8(6)",
  },
  {
    icon: Users,
    title: "Rights need published channels",
    body: "Data Fiduciaries and Consent Managers must publish how Data Principals can exercise rights and provide identifiers needed to locate the relevant account or relationship.",
    ref: "Rule 14 · Act §§ 11–14",
  },
] as const;

const FAQ = [
  {
    q: "Are the DPDP Rules, 2025 final?",
    a: "Yes. The Central Government notified the Digital Personal Data Protection Rules, 2025 in the Gazette on 13 November 2025. Their commencement is phased rather than simultaneous.",
  },
  {
    q: "Is the entire DPDP Act currently in force?",
    a: "No. Institutional and rule-making provisions commenced in November 2025, while other provisions are scheduled one year or eighteen months after Gazette publication.",
  },
  {
    q: "When do the main operational obligations commence?",
    a: "Most operational provisions are scheduled for 13 May 2027, eighteen months after publication. Rule 4 and the Consent Manager-related Act provision are scheduled for 13 November 2026.",
  },
  {
    q: "What should organisations do before May 2027?",
    a: "Organisations should map data and purposes, repair notices and consent journeys, document safeguards, prepare breach workflows, implement rights handling, set retention rules and review processor contracts.",
  },
];

export const metadata: Metadata = {
  title: "DPDP Rules 2025 — Requirements & Timeline",
  description:
    "Understand India's notified DPDP Rules, 2025: official commencement dates, notices, security safeguards, breach reporting, rights and preparation steps.",
  alternates: { canonical: "/dpdp-rules-2025" },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "DPDP Rules 2025: requirements and phased commencement timeline",
  datePublished: "2026-08-02",
  dateModified: "2026-08-02",
  author: { "@type": "Organization", name: SITE_NAME + " Editorial" },
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  mainEntityOfPage: SITE_URL + "/dpdp-rules-2025",
  citation: [RULES_SOURCE, COMMENCEMENT_SOURCE, MEITY_HUB],
};

export default function DpdpRulesPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="rules" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />

        <PageHero
          breadcrumb="DPDP Rules 2025"
          eyebrow="Notified 13 November 2025 · Phased to May 2027"
          title="The Rules Are Final."
          titleAccent="The Start Dates Are Phased."
          lede="The Digital Personal Data Protection Rules, 2025 turn the Act's framework into operational requirements for notices, security safeguards, breach reporting, children's data, rights and Consent Managers. Not every provision started on publication."
        >
          <div className="mt-[22px] flex flex-wrap gap-[10px]">
            <Badge tone="safe">Final rules notified</Badge>
            <Badge tone="neutral">Current as of 2 August 2026</Badge>
          </div>
        </PageHero>

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(38px,5vw,60px)] px-[var(--space-5)] py-[clamp(42px,6vw,76px)]">
            <div className="flex flex-col gap-[18px]">
              <div>
                <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  Commencement timeline
                </span>
                <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                  Three dates to plan around
                </h2>
              </div>

              <div className="grid gap-[16px] min-[780px]:grid-cols-3">
                {TIMELINE.map((item, index) => (
                  <Card key={item.date} className="block h-full">
                    <div className="mb-[20px] flex items-start justify-between gap-[12px]">
                      <span className="inline-flex size-[42px] items-center justify-center rounded-sm bg-primary-tint text-primary-text">
                        <CalendarDays size={21} aria-hidden="true" />
                      </span>
                      <Badge tone={item.tone}>{item.status}</Badge>
                    </div>
                    <span className="mb-[7px] block font-mono text-[12px] font-semibold text-primary-text">
                      0{index + 1} · {item.date}
                    </span>
                    <h3 className="mb-[9px] font-display text-[20px] font-semibold leading-[1.25] text-text">
                      {item.title}
                    </h3>
                    <p className="m-0 text-[14px] leading-[1.72] text-text-secondary">
                      {item.body}
                    </p>
                    <span className="mt-[14px] block font-mono text-[11px] leading-[1.6] text-text-muted">
                      {item.refs}
                    </span>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[18px]">
              <div>
                <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  Implementation
                </span>
                <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                  What the Rules add to the Act
                </h2>
              </div>

              <div className="grid gap-[16px] min-[720px]:grid-cols-2">
                {CHANGES.map(({ icon: Icon, title, body, ref }) => (
                  <div
                    key={title}
                    className="rounded-lg border border-border bg-surface p-[22px]"
                  >
                    <div className="mb-[14px] flex items-center gap-[11px]">
                      <span className="inline-flex size-[38px] items-center justify-center rounded-sm bg-primary-tint text-primary-text">
                        <Icon size={19} aria-hidden="true" />
                      </span>
                      <h3 className="m-0 font-display text-[19px] font-semibold text-text">
                        {title}
                      </h3>
                    </div>
                    <p className="m-0 text-[14.5px] leading-[1.75] text-text-secondary">
                      {body}
                    </p>
                    <span className="mt-[10px] block font-mono text-[11px] text-text-muted">
                      {ref}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-[20px] rounded-lg border border-border-strong bg-[var(--bg-sunken)] p-[clamp(22px,4vw,36px)] min-[820px]:grid-cols-[1fr_auto] min-[820px]:items-center">
              <div>
                <div className="mb-[10px] flex items-center gap-[9px]">
                  <CheckCircle2
                    size={20}
                    aria-hidden="true"
                    className="text-primary-text"
                  />
                  <h2 className="m-0 font-display text-[clamp(22px,3vw,30px)] font-semibold text-text">
                    Start with an evidence-backed readiness review
                  </h2>
                </div>
                <p className="m-0 max-w-[68ch] text-[15px] leading-[1.75] text-text-secondary">
                  Turn the statutory requirements into owned actions across
                  legal, product, security, engineering, HR and procurement.
                </p>
              </div>
              <LinkButton href="/dpdp-compliance-checklist" variant="primary" size="lg">
                Open the checklist
              </LinkButton>
            </div>

            <div className="flex flex-col gap-[14px]">
              <h2 className="m-0 font-display text-[clamp(23px,3vw,30px)] font-semibold text-text">
                Official sources
              </h2>
              <div className="grid gap-[10px] min-[720px]:grid-cols-3">
                {[
                  { href: RULES_SOURCE, label: "DPDP Rules, 2025 Gazette" },
                  {
                    href: COMMENCEMENT_SOURCE,
                    label: "Act commencement notification",
                  },
                  { href: MEITY_HUB, label: "MeitY DPDP Rules hub" },
                ].map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-[12px] rounded-sm border border-border bg-surface px-[16px] py-[14px] text-[13.5px] font-semibold text-text no-underline hover:border-primary-text"
                  >
                    {source.label}
                    <ExternalLink
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 text-primary-text"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-[20px]">
              <p className="m-0 text-[13px] leading-[1.7] text-text-muted">
                This page is an educational summary, not legal advice. Dates
                follow Gazette notifications available on the official MeitY
                website; always check for later amendments or notifications.
              </p>
            </div>
          </div>
        </section>

        <Faq
          items={FAQ}
          heading="DPDP Rules and commencement, answered"
          eyebrow="Current questions"
        />

        <section className="bg-primary text-white">
          <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-[20px] px-[var(--space-5)] py-[clamp(34px,4.6vw,54px)]">
            <div className="max-w-[680px]">
              <h2 className="m-0 font-display text-[clamp(22px,3vw,30px)] font-semibold">
                Read the Act beside the Rules.
              </h2>
              <p className="mb-0 mt-[8px] text-[14.5px] leading-[1.7] text-white/80">
                The Academy reader keeps all 44 sections and the Schedule
                searchable in one place.
              </p>
            </div>
            <LinkButton href={routes.reader} variant="secondary" size="lg">
              Open the Act reader
            </LinkButton>
          </div>
        </section>
      </main>

      <EditorialReview scope="the notified DPDP Rules, 2025 and commencement notifications" />
      <SiteFooter />
    </div>
  );
}
