import type { Metadata, Route } from "next";
import {
  ArrowRight,
  ClipboardCheck,
  Database,
  FileCheck2,
  FileText,
  Handshake,
  ShieldAlert,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { EditorialReview } from "@/components/editorial-review";
import { Faq, type FaqItem } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { blogPath } from "@/lib/blog-posts";
import { routes } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free DPDP Compliance Templates & Resources",
  description:
    "Use free DPDP compliance templates and implementation resources for readiness, notices, data inventories, processor contracts, breaches and rights requests.",
  alternates: { canonical: "/dpdp-compliance-templates" },
};

const RESOURCES: {
  icon: LucideIcon;
  title: string;
  category: string;
  description: string;
  produces: string;
  href: Route;
  action: string;
}[] = [
  {
    icon: ClipboardCheck,
    title: "DPDP readiness checklist",
    category: "Assessment",
    description:
      "Work through 24 controls across governance, consent, security, breaches, rights, children and assurance. Progress stays private in your browser.",
    produces: "A prioritised remediation backlog with named evidence owners.",
    href: routes.checklist,
    action: "Open interactive checklist",
  },
  {
    icon: FileText,
    title: "Consent notice drafting pack",
    category: "Notice and consent",
    description:
      "Structure an itemised notice, purpose-level consent request, withdrawal path and the evidence product teams should retain for each version.",
    produces: "A drafting brief for notice copy, consent events and withdrawal.",
    href: blogPath("dpdp-consent-notice-guide"),
    action: "Build the notice pack",
  },
  {
    icon: Database,
    title: "Data inventory worksheet",
    category: "Discovery",
    description:
      "Map the data, purpose, system, recipient, processor, retention rule, owner and evidence needed to govern each processing activity.",
    produces: "A field-tested column set for an operational data inventory.",
    href: blogPath("dpdp-data-inventory-purpose-mapping"),
    action: "Define the inventory",
  },
  {
    icon: Handshake,
    title: "Processor contract schedule",
    category: "Third parties",
    description:
      "Turn processor safeguards, incident support, deletion, audit evidence and sub-processor governance into a reviewable contract schedule.",
    produces: "A contract-review brief and processor evidence checklist.",
    href: blogPath("dpdp-processor-contracts-vendor-management"),
    action: "Review processor terms",
  },
  {
    icon: ShieldAlert,
    title: "Breach response pack",
    category: "Incident response",
    description:
      "Connect detection, triage, decision authority, Data Principal communication, Board reporting and the evidence retained after an incident.",
    produces: "A breach runbook outline and notification preparation list.",
    href: blogPath("dpdp-breach-notification-guide"),
    action: "Prepare the breach pack",
  },
  {
    icon: Workflow,
    title: "Data Principal request workflow",
    category: "Rights operations",
    description:
      "Design intake, identity checks, system searches, corrections, erasure decisions, approvals, response records and escalation as one owned workflow.",
    produces: "A request register schema and end-to-end operating workflow.",
    href: blogPath("data-principal-request-workflow"),
    action: "Map the request workflow",
  },
];

const BUILD_ORDER = [
  {
    step: "01",
    title: "Assess",
    body: "Run the readiness checklist and convert every unsupported answer into a named remediation item.",
  },
  {
    step: "02",
    title: "Map",
    body: "Build the inventory before drafting notices. A notice cannot be accurate if the underlying processing is unknown.",
  },
  {
    step: "03",
    title: "Document",
    body: "Draft the notice, processor schedule, breach pack and rights workflow against the systems and owners in the inventory.",
  },
  {
    step: "04",
    title: "Test",
    body: "Exercise withdrawal, erasure, processor escalation and breach reporting so the documents describe a process that works.",
  },
] as const;

const STARTER_FILES = [
  {
    label: "Consent notice drafting template",
    format: "Markdown",
    href: "/templates/dpdp-consent-notice-template.md",
  },
  {
    label: "Consent event register",
    format: "CSV",
    href: "/templates/dpdp-consent-register.csv",
  },
  {
    label: "Breach notification workbook",
    format: "Markdown",
    href: "/templates/dpdp-breach-notification-workbook.md",
  },
  {
    label: "Breach incident register",
    format: "CSV",
    href: "/templates/dpdp-breach-incident-register.csv",
  },
] as const;

const FAQS: FaqItem[] = [
  {
    q: "Are these DPDP templates legal advice?",
    a: "No. These are general educational resources for structuring implementation work, not a legal opinion for a particular organisation. Sector rules, notifications, contracts and the facts of your processing may require different controls or wording.",
  },
  {
    q: "Which DPDP compliance template should I start with?",
    a: "Start with the readiness checklist and data inventory. They expose what the organisation actually processes and which controls lack evidence before policy or notice drafting begins.",
  },
  {
    q: "Are editable downloads available?",
    a: "The current release provides browser-based checklists, drafting structures and implementation guides. Editable files will be added to this hub individually after their statutory sources, instructions and limitations have been reviewed.",
  },
  {
    q: "Does every organisation need every template?",
    a: "No. Select templates according to the processing you perform, the people and processors involved, any Significant Data Fiduciary designation, sector obligations and notified exemptions that apply.",
  },
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "DPDP compliance templates and implementation resources",
  numberOfItems: RESOURCES.length,
  itemListElement: RESOURCES.map((resource, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: resource.title,
    url: `${SITE_URL}${resource.href}`,
  })),
};

export default function DpdpComplianceTemplatesPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav />

      <main>
        <PageHero
          breadcrumb="Compliance Templates"
          path={routes.templates}
          eyebrow="Free implementation resources · No sign-up"
          title="DPDP Compliance Templates"
          titleAccent="That Lead to Evidence"
          lede="Start with the work product you need: a readiness backlog, data inventory, consent notice pack, processor schedule, breach runbook or Data Principal request workflow. Each resource explains the owners, fields and evidence behind the document."
        >
          <div className="mt-[22px] flex flex-wrap gap-[10px]">
            <Badge>Act + notified Rules 2025</Badge>
            <Badge tone="neutral">Six working resources</Badge>
            <Badge tone="neutral">Source-reviewed</Badge>
          </div>
        </PageHero>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto grid w-full max-w-[1180px] gap-[24px] px-[var(--space-5)] py-[clamp(42px,6vw,74px)] min-[960px]:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <div className="mb-[24px] max-w-[720px]">
                <span className="mb-[9px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  Resource library
                </span>
                <h2 className="m-0 font-display text-[clamp(26px,3.7vw,38px)] font-semibold leading-[1.18] tracking-[-0.028em] text-text">
                  Build the compliance operating set
                </h2>
                <p className="mb-0 mt-[12px] max-w-[68ch] text-[15px] leading-[1.75] text-text-secondary">
                  A useful template is more than polished wording. It names the
                  decision, the responsible team, the source data, the approval
                  path and the evidence that proves the process ran.
                </p>
              </div>

              <div className="grid gap-[14px] min-[720px]:grid-cols-2">
                {RESOURCES.map((resource) => {
                  const Icon = resource.icon;
                  return (
                    <article
                      key={resource.title}
                      className="flex min-h-[330px] flex-col justify-between rounded-lg border border-border bg-surface p-[22px]"
                    >
                      <div>
                        <div className="mb-[18px] flex items-center justify-between gap-[12px]">
                          <Icon
                            size={22}
                            strokeWidth={1.7}
                            aria-hidden="true"
                            className="text-primary-text"
                          />
                          <span className="font-mono text-[11px] uppercase tracking-[0.09em] text-text-muted">
                            {resource.category}
                          </span>
                        </div>
                        <h3 className="m-0 font-display text-[22px] font-semibold leading-[1.24] tracking-[-0.02em] text-text">
                          {resource.title}
                        </h3>
                        <p className="mb-0 mt-[10px] text-[14px] leading-[1.7] text-text-secondary">
                          {resource.description}
                        </p>
                        <div className="mt-[16px] border-l-2 border-primary-text pl-[12px]">
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-text-muted">
                            Work product
                          </span>
                          <p className="mb-0 mt-[4px] text-[13.5px] leading-[1.6] text-text-secondary">
                            {resource.produces}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={resource.href}
                        className="group mt-[22px] inline-flex w-fit items-center gap-[8px] text-[13.5px] font-semibold text-primary-text no-underline"
                      >
                        {resource.action}
                        <ArrowRight
                          size={16}
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-[2px]"
                        />
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside className="order-first min-[960px]:order-last">
              <div className="flex flex-col gap-[16px] min-[960px]:sticky min-[960px]:top-[96px]">
                <div className="rounded-lg border border-border bg-[var(--bg-sunken)] p-[20px]">
                  <FileCheck2
                    size={22}
                    aria-hidden="true"
                    className="mb-[12px] text-primary-text"
                  />
                  <h2 className="m-0 font-display text-[19px] font-semibold text-text">
                    Release standard
                  </h2>
                  <ul className="mb-0 mt-[12px] flex list-disc flex-col gap-[8px] pl-[18px] text-[13.5px] leading-[1.65] text-text-secondary">
                    <li>Governing section or rule identified.</li>
                    <li>Required facts separated from optional practice.</li>
                    <li>Owner and evidence fields included.</li>
                    <li>Limitations stated beside the resource.</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-warning bg-warning-tint p-[20px]">
                  <h2 className="m-0 font-display text-[18px] font-semibold text-text">
                    Adapt before use
                  </h2>
                  <p className="mb-0 mt-[8px] text-[13.5px] leading-[1.65] text-text-secondary">
                    Replace examples with your systems, purposes, retention
                    rules, processors, contacts and approval authorities. A
                    generic document cannot establish compliance by itself.
                  </p>
                </div>

                <LinkButton
                  href={routes.checklist}
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Start with the checklist
                </LinkButton>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-border bg-[var(--bg-sunken)]">
          <div className="mx-auto w-full max-w-[1180px] px-[var(--space-5)] py-[clamp(42px,5.5vw,68px)]">
            <div className="mb-[24px] max-w-[720px]">
              <span className="mb-[9px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                Recommended sequence
              </span>
              <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                Documents follow the operating model
              </h2>
            </div>

            <ol className="m-0 grid list-none gap-[12px] p-0 min-[720px]:grid-cols-2 min-[1040px]:grid-cols-4">
              {BUILD_ORDER.map((item) => (
                <li
                  key={item.step}
                  className="rounded-lg border border-border bg-surface p-[20px]"
                >
                  <span className="font-mono text-[12px] text-primary-text">
                    {item.step}
                  </span>
                  <h3 className="mb-0 mt-[22px] font-display text-[20px] font-semibold text-text">
                    {item.title}
                  </h3>
                  <p className="mb-0 mt-[8px] text-[13.5px] leading-[1.65] text-text-secondary">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-border bg-[var(--bg-app)]">
          <div className="mx-auto w-full max-w-[1180px] px-[var(--space-5)] py-[clamp(38px,5vw,62px)]">
            <div className="mb-[20px] max-w-[700px]">
              <span className="mb-[9px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                Editable downloads
              </span>
              <h2 className="m-0 font-display text-[clamp(24px,3.4vw,34px)] font-semibold text-text">
                Starter files you can inspect before downloading
              </h2>
              <p className="mb-0 mt-[9px] text-[14px] leading-[1.7] text-text-secondary">
                Open formats keep every instruction and placeholder visible. No email gate, macros or hidden processing.
              </p>
            </div>
            <div className="grid gap-[10px] min-[680px]:grid-cols-2 min-[1000px]:grid-cols-4">
              {STARTER_FILES.map((file) => (
                <a
                  key={file.href}
                  href={file.href}
                  download
                  className="flex min-h-[116px] flex-col justify-between rounded-sm border border-border bg-surface p-[16px] no-underline hover:border-primary-text"
                >
                  <span className="text-[13.5px] font-semibold leading-[1.45] text-text">{file.label}</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-primary-text">Download {file.format}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Faq
          items={FAQS}
          eyebrow="Using the library"
          heading="DPDP template questions"
        />
      </main>

      <EditorialReview scope="the DPDP Act, 2023 and notified DPDP Rules, 2025" />
      <SiteFooter />
    </div>
  );
}
