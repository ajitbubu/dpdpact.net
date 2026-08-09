import type { Metadata } from "next";
import { ArrowRight, CircleSlash, Recycle, Scale } from "lucide-react";
import Link from "next/link";

import { EditorialReview } from "@/components/editorial-review";
import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { RelatedGuides } from "@/components/related-guides";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { routes } from "@/lib/routes";
import { CONTENT_UPDATED, SITE_NAME, SITE_URL } from "@/lib/site";

const GDPR_SOURCE = "https://eur-lex.europa.eu/eli/reg/2016/679/oj";

/**
 * The four differences that change how a system is built, not just how a
 * policy is worded. Everything else in the comparison table is detail around
 * these.
 */
const STRUCTURAL = [
  {
    icon: CircleSlash,
    title: "There is no legitimate interest",
    body: "GDPR Article 6(1)(f) carries an enormous amount of ordinary corporate processing: analytics, fraud prevention, direct marketing, intra-group transfers. The DPDP Act has no equivalent. Processing rests on consent under section 6, or on one of the nine certain legitimate uses in section 7, and that list is closed and largely State-facing.",
    consequence: "Anything your GDPR record of processing justifies on legitimate interests needs a fresh basis in India, and for most commercial purposes the only one available is consent.",
  },
  {
    icon: Scale,
    title: "There is no sensitive data tier",
    body: "GDPR Article 9 fences off health, biometrics, religion, sexual orientation and more, with a separate set of conditions. The DPDP Act regulates all digital personal data at a single standard. The outgoing SPDI Rules had a sensitive category; the Act deliberately drops it.",
    consequence: "Controls keyed to a special-category flag do not map. The DPDP question is not what kind of data it is, but whether you have a lawful basis and a notice for the purpose.",
  },
  {
    icon: CircleSlash,
    title: "Three GDPR rights simply do not exist",
    body: "There is no right to data portability, no right to object to processing, and no right not to be subject to solely automated decisions. The DPDP Act gives four rights: access to information about processing, correction and erasure, grievance redressal, and nomination.",
    consequence: "A GDPR rights engine over-delivers on scope but under-delivers on one thing India adds: nomination, which lets an individual appoint someone to exercise rights on death or incapacity.",
  },
  {
    icon: Scale,
    title: "Penalties replace compensation",
    body: "GDPR Article 82 gives the individual a right to compensation for material or non-material damage. The DPDP Act gives the Data Protection Board a power to impose monetary penalties, and section 34 sends those sums to the Consolidated Fund of India. The individual gets a grievance route and an appeal, not damages.",
    consequence: "Your exposure model changes shape: fewer claimant-driven risks, one regulator-driven risk, capped by the Schedule at ₹250 crore for a security-safeguard failure.",
  },
];

/** The comparison people actually come for. DPDP column verified against the Act. */
const ROWS = [
  {
    dim: "Territorial reach",
    gdpr: "Article 3: establishment in the EU, or offering goods or services to, or monitoring behaviour of, people in the EU.",
    dpdp: "Section 3: digital personal data processed in India, and processing outside India connected with offering goods or services to Data Principals in India. Monitoring alone is not a trigger.",
  },
  {
    dim: "Publicly available data",
    gdpr: "No general carve-out. Public availability does not remove the data from scope.",
    dpdp: "Section 3(c)(ii) excludes data the individual made public herself, or that someone was legally obliged to publish.",
  },
  {
    dim: "Lawful bases",
    gdpr: "Six, including contract, legal obligation, vital interests, public task and legitimate interests.",
    dpdp: "Consent, or the nine certain legitimate uses in section 7. No contract basis and no legitimate interests.",
  },
  {
    dim: "Consent standard",
    gdpr: "Freely given, specific, informed, unambiguous, by clear affirmative action; withdrawable as easily as given.",
    dpdp: "The same, plus unconditional, and limited to the data necessary for the purpose. Section 6(1).",
  },
  {
    dim: "Special categories",
    gdpr: "Article 9 fences off health, biometrics, race, religion, politics, sexual orientation, trade union membership.",
    dpdp: "No tier. All digital personal data is treated at one standard.",
  },
  {
    dim: "Children",
    gdpr: "Article 8 sets 16 for information society services, with member states free to lower it to no less than 13.",
    dpdp: "Under 18, with verifiable parental consent. Tracking, behavioural monitoring and targeted advertising directed at children are prohibited outright by section 9(3).",
  },
  {
    dim: "Individual rights",
    gdpr: "Access, rectification, erasure, restriction, portability, objection, and rights around automated decision-making.",
    dpdp: "Access to information about processing, correction and erasure, grievance redressal, and nomination. Sections 11 to 14.",
  },
  {
    dim: "Duties on the individual",
    gdpr: "None. GDPR imposes nothing on the data subject.",
    dpdp: "Section 15 imposes five duties, and breaching them is a penalty head in the Schedule carrying up to ₹10,000.",
  },
  {
    dim: "Breach notification",
    gdpr: "Article 33: to the supervisory authority within 72 hours where feasible, unless unlikely to result in risk. Article 34: to individuals only where high risk.",
    dpdp: "Section 8(6): intimate the Board and every affected Data Principal, in the form and manner prescribed. The section states no materiality threshold.",
  },
  {
    dim: "DPO",
    gdpr: "Article 37: required for public authorities, large-scale systematic monitoring, or large-scale special-category processing.",
    dpdp: "Only for a Significant Data Fiduciary. The DPO must be based in India and answerable to the board of directors. Section 10(2)(a).",
  },
  {
    dim: "Impact assessments",
    gdpr: "Article 35: triggered by high risk, whoever the controller is.",
    dpdp: "Periodic Data Protection Impact Assessment, but only for a Significant Data Fiduciary. Section 10(2)(c).",
  },
  {
    dim: "Cross-border transfers",
    gdpr: "Permitted where there is adequacy, or safeguards such as standard contractual clauses or binding corporate rules, or a derogation applies.",
    dpdp: "Permitted by default. Section 16 lets the Central Government restrict transfers to notified countries, and preserves any stricter sectoral rule already in force.",
  },
  {
    dim: "Consent intermediaries",
    gdpr: "No statutory concept.",
    dpdp: "Consent Managers, registered with the Board, through which an individual can give, manage, review and withdraw consent. Accountable to her, not to the Data Fiduciary.",
  },
  {
    dim: "Maximum exposure",
    gdpr: "Up to €20 million or 4% of worldwide annual turnover, whichever is higher, plus an individual right to compensation.",
    dpdp: "Up to ₹250 crore per penalty head under the Schedule. No statutory compensation route for the individual.",
  },
];

/** Honest reuse guidance for teams already running a GDPR programme. */
const REUSE = [
  {
    verdict: "Reuses well",
    tone: "safe" as const,
    items: [
      "Your data inventory and processing records — the underlying mapping is the same work.",
      "Processor due diligence and contract machinery; section 8(2) also requires a valid contract.",
      "Security engineering. Section 8(5) asks for reasonable safeguards without naming a standard, so an existing ISO 27001 or SOC 2 programme is evidence, not waste.",
      "Retention and deletion tooling, which section 8(7) needs in a very similar shape.",
    ],
  },
  {
    verdict: "Needs rebuilding",
    tone: "warning" as const,
    items: [
      "Every legitimate-interest assessment. There is nothing to map it onto.",
      "Consent capture, because DPDP consent must be unconditional and itemised against a section 5 notice.",
      "Breach triage, since the GDPR risk threshold does not appear in section 8(6).",
      "Special-category handling, which has no counterpart and may be over-engineered for India.",
      "Rights fulfilment, which needs nomination added and portability removed.",
    ],
  },
];

const FAQ = [
  {
    q: "Is the DPDP Act basically India's GDPR?",
    a: "No. They share vocabulary and a consent-and-notice backbone, but the DPDP Act has no legitimate interests basis, no special-category tier, no portability or objection rights, and no individual right to compensation. It also does something GDPR never does: it places enforceable duties on the individual.",
  },
  {
    q: "If we are already GDPR compliant, are we DPDP compliant?",
    a: "Not automatically, and the gap is usually in the same place. Most GDPR programmes lean on legitimate interests for analytics, fraud prevention and marketing. India has no such basis, so that processing needs consent or it needs to stop.",
  },
  {
    q: "Does the DPDP Act require data localisation?",
    a: "Not as a general rule. Section 16 works the other way round from GDPR: transfers are permitted unless the Central Government notifies a country as restricted. Section 16(2) preserves stricter sectoral requirements that already exist, such as those applying to regulated financial entities.",
  },
  {
    q: "Which is stricter?",
    a: "Neither, cleanly. GDPR is broader in rights and in lawful bases. The DPDP Act is narrower on bases, which makes consent harder to avoid, and it is unusually strict on children, where tracking and targeted advertising are prohibited outright rather than risk-assessed.",
  },
  {
    q: "Do GDPR standard contractual clauses satisfy the DPDP Act?",
    a: "They are not a DPDP instrument and nothing in the Act recognises them. Because section 16 permits transfer by default, SCCs are also not usually needed for the DPDP question. They remain relevant to the GDPR side of the same transfer.",
  },
];

export const metadata: Metadata = {
  title: "DPDP Act vs GDPR — What Actually Differs",
  description:
    "A provision-level comparison of India's DPDP Act, 2023 and the EU GDPR: lawful bases, rights, children, breach reporting, transfers and penalties.",
  alternates: { canonical: "/dpdp-vs-gdpr" },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "DPDP Act vs GDPR: a provision-level comparison",
  description:
    "Where India's Digital Personal Data Protection Act, 2023 and the EU General Data Protection Regulation genuinely diverge, and what a GDPR programme can and cannot reuse.",
  datePublished: "2026-08-09",
  dateModified: CONTENT_UPDATED,
  author: { "@type": "Organization", name: SITE_NAME + " Editorial" },
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  mainEntityOfPage: SITE_URL + "/dpdp-vs-gdpr",
  citation: [GDPR_SOURCE, SITE_URL + routes.readerFullText],
};

export default function DpdpVsGdprPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="overview" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />

        <PageHero
          breadcrumb="DPDP vs GDPR"
          path="/dpdp-vs-gdpr"
          eyebrow="DPDP Act, 2023 · Regulation (EU) 2016/679"
          title="Same Vocabulary."
          titleAccent="Different Machine."
          lede="The DPDP Act borrows GDPR's grammar — notice, consent, processors, breach reporting — and then removes the provision most GDPR programmes are actually built on. If you map one onto the other clause by clause, the mapping fails in four specific places."
        >
          <div className="mt-[22px] flex flex-wrap gap-[10px]">
            <Badge tone="primary">Provision-level</Badge>
            <Badge tone="neutral">Current as of {CONTENT_UPDATED}</Badge>
          </div>
        </PageHero>

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(38px,5vw,60px)] px-[var(--space-5)] py-[clamp(42px,6vw,76px)]">
            {/* ------------------------------------- Four structural breaks */}
            <div className="flex flex-col gap-[18px]">
              <div>
                <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  Where the mapping breaks
                </span>
                <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                  Four differences that change the architecture
                </h2>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[16px]">
                {STRUCTURAL.map(({ icon: Icon, ...item }) => (
                  <Card key={item.title} className="block h-full">
                    <span className="mb-[14px] inline-flex size-[42px] items-center justify-center rounded-sm bg-primary-tint text-primary-text">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="mb-[9px] block font-display text-[19px] font-semibold leading-[1.25] text-text">
                      {item.title}
                    </span>
                    <span className="mb-[12px] block text-[14px] leading-[1.72] text-text-secondary">
                      {item.body}
                    </span>
                    <span className="block border-t border-border pt-[12px] text-[13.5px] leading-[1.65] text-text-muted">
                      <strong className="text-primary-text">
                        What it costs you:
                      </strong>{" "}
                      {item.consequence}
                    </span>
                  </Card>
                ))}
              </div>
            </div>

            {/* --------------------------------------------- Comparison table */}
            <div className="flex flex-col gap-[18px]">
              <div>
                <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  Side by side
                </span>
                <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                  Fourteen dimensions, with the provisions
                </h2>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[var(--bg-sunken)]">
                      <th className="border-b border-border px-[16px] py-[13px] font-sans text-[12.5px] font-semibold leading-[1.4] text-text-secondary">
                        Dimension
                      </th>
                      <th className="border-b border-border px-[16px] py-[13px] font-sans text-[12.5px] font-semibold leading-[1.4] text-text-secondary">
                        EU GDPR
                      </th>
                      <th className="border-b border-border px-[16px] py-[13px] font-sans text-[12.5px] font-semibold leading-[1.4] text-primary-text">
                        DPDP Act, 2023
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row) => (
                      <tr key={row.dim}>
                        <td className="border-b border-border px-[16px] py-[14px] align-top font-sans text-[14px] font-semibold leading-[1.5] text-text">
                          {row.dim}
                        </td>
                        <td className="border-b border-border px-[16px] py-[14px] align-top text-[13.5px] leading-[1.7] text-text-secondary">
                          {row.gdpr}
                        </td>
                        <td className="border-b border-border px-[16px] py-[14px] align-top text-[13.5px] leading-[1.7] text-text-secondary">
                          {row.dpdp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ------------------------------------------------ Reuse guidance */}
            <div className="flex flex-col gap-[18px]">
              <div>
                <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  If you already run GDPR
                </span>
                <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                  What carries over, and what does not
                </h2>
                <p className="mb-0 mt-[12px] max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                  A GDPR programme is a genuine head start, but it is a head
                  start on the plumbing rather than on the legal analysis. The
                  expensive part to redo is the part you did first.
                </p>
              </div>

              <div className="grid gap-[16px] min-[780px]:grid-cols-2">
                {REUSE.map((block) => (
                  <div
                    key={block.verdict}
                    className="flex flex-col gap-[12px] rounded-lg border border-border bg-surface p-[22px]"
                  >
                    <span className="flex items-center gap-[10px]">
                      <span className="inline-flex size-[36px] items-center justify-center rounded-sm bg-primary-tint text-primary-text">
                        <Recycle size={18} aria-hidden="true" />
                      </span>
                      <Badge tone={block.tone}>{block.verdict}</Badge>
                    </span>
                    <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
                      {block.items.map((item) => (
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
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------ Caveat */}
            <div className="flex flex-col gap-[10px] rounded-lg border border-border bg-[var(--bg-sunken)] p-[22px]">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted">
                Reading this comparison honestly
              </span>
              <p className="m-0 max-w-[74ch] text-[14px] leading-[1.72] text-text-secondary">
                The DPDP column is taken from the Act as published in the
                Gazette and is linked to the provision in every row you can
                check. The GDPR column describes Regulation (EU) 2016/679 as it
                stands today; its substantive obligations are unchanged, though
                a separate procedural regulation on cross-border enforcement
                came into force in January 2026 and applies to new cross-border
                cases from April 2027.
              </p>
              <p className="m-0 max-w-[74ch] text-[14px] leading-[1.72] text-text-secondary">
                Most DPDP obligations are themselves not yet in force. See{" "}
                <Link href={routes.rules} className="font-semibold text-primary-text">
                  the commencement timeline
                </Link>{" "}
                and{" "}
                <Link href={routes.spdi} className="font-semibold text-primary-text">
                  what still applies until then
                </Link>
                .
              </p>
              <a
                href={GDPR_SOURCE}
                target="_blank"
                rel="noreferrer"
                className="mt-[4px] inline-flex items-center gap-[7px] text-[13.5px] font-semibold text-primary-text no-underline"
              >
                Regulation (EU) 2016/679 on EUR-Lex
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <Faq items={FAQ} heading="DPDP and GDPR, answered" />
      </main>

      <RelatedGuides
        heading="Go deeper on the Indian side"
        guides={[
          {
            href: routes.obligations,
            label: "Obligations under the DPDP Act (§§ 4–10)",
            blurb:
              "Notice, consent, safeguards, breach reporting and erasure, in the order they apply.",
          },
          {
            href: routes.rights,
            label: "Rights and duties (§§ 11–15)",
            blurb:
              "The four rights, and the five duties GDPR has no equivalent for.",
          },
          {
            href: routes.spdi,
            label: "SPDI Rules vs the DPDP Act",
            blurb:
              "What is repealed, what is still binding, and the dates each takes effect.",
          },
          {
            href: routes.readerFullText,
            label: "The DPDP Act in full",
            blurb: "All 44 sections and the Schedule, verbatim.",
          },
        ]}
      />

      <EditorialReview />
      <SiteFooter />
    </div>
  );
}
