import type { Metadata } from "next";
import {
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Flag,
} from "lucide-react";

import { EditorialReview } from "@/components/editorial-review";
import { Faq, type FaqItem } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const RULES_SOURCE =
  "https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf";
const COMMENCEMENT_SOURCE =
  "https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf";
const MEITY_HUB =
  "https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa";

export const metadata: Metadata = {
  title: "DPDP Compliance Deadline 2027 - Dates & Timeline",
  description:
    "Track the official DPDP compliance dates: provisions already in force, the 13 November 2026 Consent Manager phase and core duties from 13 May 2027.",
  alternates: { canonical: "/dpdp-compliance-deadline" },
};

const PHASES = [
  {
    date: "13 November 2025",
    state: "In force",
    tone: "safe" as const,
    icon: CheckCircle2,
    title: "Institutional and rule-making framework",
    body: "Rules 1, 2 and 17–21 commenced on publication with the linked Act provisions for definitions, the Data Protection Board, rule-making and related institutional machinery.",
    refs: "Rules 1, 2, 17–21 · linked provisions of Act §§ 1, 2, 18–26, 35 and 38–44",
  },
  {
    date: "13 November 2026",
    state: "Scheduled",
    tone: "warning" as const,
    icon: Clock3,
    title: "Consent Manager framework",
    body: "Rule 4, section 6(9) and the connected Board function are scheduled one year after Gazette publication. This phase establishes registration and operating obligations for Consent Managers.",
    refs: "Rule 4 · Act § 6(9) · § 27(1)(d)",
  },
  {
    date: "13 May 2027",
    state: "Core deadline",
    tone: "info" as const,
    icon: Flag,
    title: "Most operational obligations",
    body: "Most provisions on scope, notices, consent, Data Fiduciary obligations, rights, breaches, children, enforcement and penalties are scheduled eighteen months after Gazette publication.",
    refs: "Rules 3, 5–16 and 22–23 · most operative provisions of Act §§ 3–17 and 27–37",
  },
] as const;

const WORKSTREAMS = [
  {
    title: "Data and purpose inventory",
    deadline: "Before notice and consent design",
    evidence: "System register, purpose map, processor list, retention rule and accountable owner.",
  },
  {
    title: "Notices and consent",
    deadline: "Operational by 13 May 2027",
    evidence: "Versioned notice, purpose IDs, affirmative-action log, withdrawal path and downstream propagation test.",
  },
  {
    title: "Security and processor governance",
    deadline: "Operational by 13 May 2027",
    evidence: "Safeguard standard, access controls, logging, backups, incident detection and appropriate processor contract terms.",
  },
  {
    title: "Breach response",
    deadline: "Operational by 13 May 2027",
    evidence: "Detection route, decision authority, Data Principal notice, Board intimation workflow and 72-hour information pack.",
  },
  {
    title: "Rights and grievance handling",
    deadline: "Operational by 13 May 2027",
    evidence: "Published channel, identity standard, system search list, response record, escalation and contact information.",
  },
  {
    title: "Children and special cases",
    deadline: "Operational by 13 May 2027",
    evidence: "Age and parental-consent method, tracking restrictions, exemption analysis and product-control tests.",
  },
] as const;

const FAQS: FaqItem[] = [
  {
    q: "What is the main DPDP compliance deadline?",
    a: "Most operational provisions are scheduled to commence on 13 May 2027. The framework is phased, so some institutional provisions are already in force and the Consent Manager phase is scheduled earlier, on 13 November 2026.",
  },
  {
    q: "Is the whole DPDP Act already in force?",
    a: "No. The commencement notification phases the Act and Rules across 13 November 2025, 13 November 2026 and 13 May 2027 rather than commencing every provision together.",
  },
  {
    q: "Should organisations wait until May 2027?",
    a: "No. Inventories, product changes, processor negotiations, security controls, breach exercises and rights workflows require lead time and should be tested before their governing provisions commence.",
  },
  {
    q: "Can a later notification change these dates?",
    a: "Yes. Always check the Gazette and official MeitY publication page for later amendments, corrigenda or commencement notifications before relying on a deadline.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "DPDP compliance deadline: official dates and implementation timeline",
  datePublished: "2026-08-11",
  dateModified: "2026-08-11",
  author: { "@type": "Organization", name: `${SITE_NAME} Editorial` },
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  mainEntityOfPage: `${SITE_URL}${routes.deadline}`,
  citation: [RULES_SOURCE, COMMENCEMENT_SOURCE, MEITY_HUB],
};

export default function DpdpComplianceDeadlinePage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="rules" />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <PageHero
          breadcrumb="Compliance Deadline"
          path={routes.deadline}
          eyebrow="Official phased commencement · 2025–2027"
          title="The DPDP Compliance Deadline"
          titleAccent="Is Not One Date"
          lede="Institutional provisions are already in force, the Consent Manager framework is scheduled for 13 November 2026, and most operational duties are scheduled for 13 May 2027. Plan against the provision that governs each workstream."
        >
          <div className="mt-[22px] flex flex-wrap gap-[10px]">
            <Badge tone="safe">First phase in force</Badge>
            <Badge tone="warning">Next phase · 13 November 2026</Badge>
            <Badge tone="neutral">Core duties · 13 May 2027</Badge>
          </div>
        </PageHero>

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto w-full max-w-[1180px] px-[var(--space-5)] py-[clamp(42px,6vw,74px)]">
            <div className="mb-[24px] max-w-[720px]">
              <span className="mb-[9px] block font-mono text-[12px] uppercase tracking-[0.1em] text-primary-text">
                Commencement phases
              </span>
              <h2 className="m-0 font-display text-[clamp(26px,3.7vw,38px)] font-semibold tracking-[-0.028em] text-text">
                Three dates, three legal states
              </h2>
            </div>

            <div className="grid gap-[14px] min-[820px]:grid-cols-3">
              {PHASES.map(({ icon: Icon, date, state, tone, title, body, refs }) => (
                <article key={date} className="rounded-lg border border-border bg-surface p-[22px]">
                  <div className="mb-[18px] flex items-center justify-between gap-[12px]">
                    <Icon size={22} aria-hidden="true" className="text-primary-text" />
                    <Badge tone={tone}>{state}</Badge>
                  </div>
                  <span className="font-mono text-[12px] font-semibold text-primary-text">{date}</span>
                  <h3 className="mb-0 mt-[9px] font-display text-[21px] font-semibold leading-[1.25] text-text">{title}</h3>
                  <p className="mb-0 mt-[9px] text-[14px] leading-[1.7] text-text-secondary">{body}</p>
                  <p className="mb-0 mt-[14px] font-mono text-[10.5px] leading-[1.6] text-text-muted">{refs}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-[var(--bg-sunken)]">
          <div className="mx-auto w-full max-w-[1180px] px-[var(--space-5)] py-[clamp(42px,5.5vw,68px)]">
            <div className="mb-[22px] flex items-center gap-[10px]">
              <CalendarCheck2 size={23} aria-hidden="true" className="text-primary-text" />
              <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold text-text">
                Deadline by implementation workstream
              </h2>
            </div>
            <div className="overflow-x-auto rounded-lg border border-border bg-surface">
              <table className="min-w-[780px] w-full border-collapse text-left text-[13.5px]">
                <thead className="bg-[var(--bg-app)] text-text">
                  <tr>
                    <th className="border-b border-border px-[15px] py-[11px] font-semibold">Workstream</th>
                    <th className="border-b border-border px-[15px] py-[11px] font-semibold">Planning date</th>
                    <th className="border-b border-border px-[15px] py-[11px] font-semibold">Evidence to have ready</th>
                  </tr>
                </thead>
                <tbody>
                  {WORKSTREAMS.map((item) => (
                    <tr key={item.title}>
                      <td className="border-b border-border px-[15px] py-[12px] font-semibold text-text">{item.title}</td>
                      <td className="border-b border-border px-[15px] py-[12px] text-primary-text">{item.deadline}</td>
                      <td className="border-b border-border px-[15px] py-[12px] text-text-secondary">{item.evidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto grid w-full max-w-[1180px] gap-[24px] px-[var(--space-5)] py-[clamp(42px,6vw,72px)] min-[820px]:grid-cols-[1fr_auto] min-[820px]:items-center">
            <div>
              <h2 className="m-0 font-display text-[clamp(24px,3.4vw,34px)] font-semibold text-text">Turn the dates into owned work</h2>
              <p className="mb-0 mt-[10px] max-w-[70ch] text-[15px] leading-[1.75] text-text-secondary">
                Use the readiness checklist to find unsupported controls, then use the template hub to build the inventory, notice, processor, breach and rights artefacts behind them.
              </p>
            </div>
            <div className="flex flex-col gap-[10px] sm:flex-row min-[820px]:flex-col">
              <LinkButton href={routes.checklist} variant="primary" size="lg">Run the readiness checklist</LinkButton>
              <LinkButton href={routes.templates} variant="secondary" size="lg">Open compliance templates</LinkButton>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-[var(--bg-sunken)]">
          <div className="mx-auto w-full max-w-[1180px] px-[var(--space-5)] py-[clamp(34px,4.8vw,54px)]">
            <h2 className="m-0 font-display text-[24px] font-semibold text-text">Official sources</h2>
            <div className="mt-[16px] grid gap-[10px] min-[720px]:grid-cols-3">
              {[
                [RULES_SOURCE, "DPDP Rules, 2025 Gazette"],
                [COMMENCEMENT_SOURCE, "Act commencement notification"],
                [MEITY_HUB, "MeitY Rules publication hub"],
              ].map(([href, label]) => (
                <a key={href} href={href} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-[12px] rounded-sm border border-border bg-surface px-[16px] py-[14px] text-[13.5px] font-semibold text-text no-underline hover:border-primary-text">
                  {label}<ExternalLink size={16} aria-hidden="true" className="shrink-0 text-primary-text" />
                </a>
              ))}
            </div>
            <a href={routes.sources} className="mt-[14px] inline-block text-[13.5px] font-semibold text-primary-text no-underline">
              See the maintained official-source register →
            </a>
          </div>
        </section>

        <Faq items={FAQS} eyebrow="Deadline questions" heading="DPDP commencement, answered" />
      </main>
      <EditorialReview scope="the notified DPDP Rules, 2025 and commencement notifications" />
      <SiteFooter />
    </div>
  );
}
