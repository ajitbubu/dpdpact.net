import type { Metadata } from "next";
import Link from "next/link";

import { PenaltyClient } from "./penalty-client";
import { EditorialReview } from "@/components/editorial-review";
import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { ProvisionNotes } from "@/components/provision-notes";
import { RelatedGuides } from "@/components/related-guides";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { SCHEDULE } from "@/lib/dpdpa-data";
import { routes } from "@/lib/routes";
import { ACT_SOURCE_PDF, CONTENT_UPDATED, SITE_NAME, SITE_URL } from "@/lib/site";

/** The seven factors, server-rendered so the page stands without the tool. */
const FACTORS = [
  {
    ref: "§ 33(2)(a)",
    title: "Nature, gravity and duration",
    body: "How serious the breach was and how long it ran. Duration is doing real work here: the same exposure left open for months reads differently from one closed in hours.",
  },
  {
    ref: "§ 33(2)(b)",
    title: "Type and nature of the personal data affected",
    body: "The Act has no sensitive-data tier, but the Board is told to have regard to the type of data at the penalty stage. Sensitivity re-enters here, as a factor rather than a category.",
  },
  {
    ref: "§ 33(2)(c)",
    title: "Repetitive nature of the breach",
    body: "Whether this has happened before. Two or more penalties can also trigger the section 37 blocking route, which is a separate and far heavier consequence.",
  },
  {
    ref: "§ 33(2)(d)",
    title: "Gain realised or loss avoided",
    body: "Whether the person profited from the breach or dodged a cost by it — cutting a security programme, for instance, and banking the saving.",
  },
  {
    ref: "§ 33(2)(e)",
    title: "Mitigation, and its timeliness",
    body: "Whether action was taken to mitigate the effects and consequences, and how quickly and effectively.",
    note: "This is the one factor you can move entirely before anything happens. A rehearsed incident response is a penalty argument, not just good hygiene.",
  },
  {
    ref: "§ 33(2)(f)",
    title: "Proportionality and deterrence",
    body: "Whether the penalty is proportionate and effective, having regard to the need to secure observance of the Act and deter breach.",
  },
  {
    ref: "§ 33(2)(g)",
    title: "Likely impact on the person",
    body: "What the penalty would do to the person it is imposed on. This is why the ₹250 crore ceiling is a ceiling and rarely an expectation.",
  },
];

const FAQ = [
  {
    q: "What is the maximum penalty under the DPDP Act?",
    a: "₹250 crore, for breach of the obligation in section 8(5) to take reasonable security safeguards to prevent a personal data breach. That is the highest of the seven heads in the Schedule.",
  },
  {
    q: "Can a tool calculate what I would actually be fined?",
    a: "No, and any tool that outputs a figure is inventing it. Section 33(1) requires the Board to determine that the breach is significant before any penalty, and section 33(2) lists seven factors with no weights and no formula. The Schedule sets ceilings; the Board sets amounts, recording its reasons.",
  },
  {
    q: "What is the smallest penalty in the Schedule?",
    a: "Up to ₹10,000, for breach of the Data Principal's own duties under section 15. It is the only head aimed at the individual rather than an organisation, and GDPR has no equivalent.",
  },
  {
    q: "Does the money go to the person whose data was breached?",
    a: "No. Section 34 credits all sums realised by way of penalty to the Consolidated Fund of India. The DPDP Act creates no compensation route at all, and section 39 bars civil courts from matters the Board can decide.",
  },
  {
    q: "Can a penalty be appealed?",
    a: "Yes, to the Appellate Tribunal — TDSAT — within sixty days of receiving the order, under section 29. The Tribunal endeavours to dispose of appeals within six months.",
  },
  {
    q: "When can penalties first be imposed?",
    a: "Sections 28 to 34 sit in the eighteen-month tranche of the commencement notification, so mid-May 2027. The Board itself was established in November 2025.",
  },
];

export const metadata: Metadata = {
  title: "DPDP Penalty Calculator — The Schedule",
  description:
    "The seven DPDP penalty heads and their ceilings, up to ₹250 crore, with the section 33(2) factors that decide where in the range a breach actually lands.",
  alternates: { canonical: "/dpdp-penalty-calculator" },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "DPDP penalties: the Schedule heads and the section 33(2) factors",
  description:
    "The seven penalty heads in the Schedule to the DPDP Act, 2023, the maximum for each, and the seven factors in section 33(2) that determine the amount within that ceiling.",
  datePublished: "2026-08-09",
  dateModified: CONTENT_UPDATED,
  author: { "@type": "Organization", name: SITE_NAME + " Editorial" },
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  mainEntityOfPage: SITE_URL + "/dpdp-penalty-calculator",
  isBasedOn: ACT_SOURCE_PDF,
  citation: [ACT_SOURCE_PDF, SITE_URL + "/reader/section-33"],
};

export default function PenaltyCalculatorPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="penalties" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />

        <PageHero
          breadcrumb="Penalty calculator"
          path="/dpdp-penalty-calculator"
          eyebrow="The Schedule · § 33"
          title="The Schedule Sets a Ceiling."
          titleAccent="Seven Factors Set the Number."
          lede="No tool can tell you what the Board would impose, and one that prints a figure is guessing. What can be shown is the statutory maximum for each head, and which way each of the seven factors in section 33(2) pushes on your facts."
        />

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(30px,4vw,44px)] px-[var(--space-5)] py-[clamp(40px,5.4vw,70px)]">
            <PenaltyClient />
            <p className="m-0 max-w-[76ch] text-[14px] leading-[1.72] text-text-muted">
              Nothing you select leaves your browser. Every head and every
              factor is also written out below, so the page works without the
              tool.
            </p>
          </div>
        </section>

        <section className="border-t border-border bg-[var(--bg-sunken)]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[20px] px-[var(--space-5)] py-[clamp(38px,5vw,64px)]">
            <div>
              <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                The Schedule · see § 33(1)
              </span>
              <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                Seven heads, seven ceilings
              </h2>
            </div>
            <div className="overflow-x-auto rounded-lg border border-border bg-surface">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead>
                  <tr className="bg-[var(--bg-sunken)]">
                    <th className="border-b border-border px-[14px] py-[12px] font-sans text-[12px] font-semibold text-text-secondary">
                      Sl.
                    </th>
                    <th className="border-b border-border px-[14px] py-[12px] font-sans text-[12px] font-semibold text-text-secondary">
                      Breach
                    </th>
                    <th className="border-b border-border px-[14px] py-[12px] font-sans text-[12px] font-semibold text-primary-text">
                      Maximum penalty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULE.rows.map((r) => (
                    <tr key={r.sl}>
                      <td className="border-b border-border px-[14px] py-[13px] align-top font-mono text-[13px] font-semibold text-primary-text tabular-nums">
                        {r.sl}
                      </td>
                      <td className="border-b border-border px-[14px] py-[13px] align-top text-[14px] leading-[1.7] text-text-secondary">
                        {r.breach}
                      </td>
                      <td className="border-b border-border px-[14px] py-[13px] align-top text-[14px] font-semibold leading-[1.6] text-text">
                        {r.penalty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="m-0 max-w-[76ch] text-[13.5px] leading-[1.7] text-text-muted">
              Reproduced from the Schedule to the Act. {SCHEDULE.note}
            </p>
          </div>
        </section>

        <ProvisionNotes
          eyebrow="§ 33(2)"
          heading="The seven factors, and which you can still change"
          intro="The Board must have regard to each of these in fixing an amount. The Act gives them no weights and no order of priority — but two of them are decided long before any breach occurs."
          items={FACTORS}
        />

        <section className="border-t border-border bg-[var(--bg-sunken)]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[14px] px-[var(--space-5)] py-[clamp(38px,5vw,64px)]">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
              Before the number
            </span>
            <h2 className="m-0 max-w-[28ch] font-display text-[clamp(24px,3.4vw,34px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              Two gates stand before any penalty
            </h2>
            <p className="m-0 max-w-[76ch] text-[15.5px] leading-[1.75] text-text-secondary">
              First, section 28(3): the Board decides whether there are
              sufficient grounds to proceed at all, and may close the matter
              with reasons recorded. Second, section 33(1): a penalty follows
              only where it determines the breach is <em>significant</em>, after
              giving an opportunity to be heard.
            </p>
            <p className="m-0 max-w-[76ch] text-[15.5px] leading-[1.75] text-text-secondary">
              A third exit sits in between. Under section 32 the Board may
              accept a voluntary undertaking at any stage, and acceptance bars
              proceedings on what it covers — though failing to honour a term is
              itself deemed a breach of the Act.
            </p>
            <p className="m-0 max-w-[76ch] text-[14px] leading-[1.7] text-text-muted">
              The whole path is drawn out on{" "}
              <Link href={routes.penalties} className="font-semibold text-primary-text">
                the penalties page
              </Link>
              , and the provisions are at{" "}
              <Link href="/reader/section-33" className="font-semibold text-primary-text">
                section 33
              </Link>{" "}
              and{" "}
              <Link href="/reader/schedule" className="font-semibold text-primary-text">
                the Schedule
              </Link>
              .
            </p>
          </div>
        </section>

        <Faq items={FAQ} heading="DPDP penalties, answered" />
      </main>

      <RelatedGuides
        heading="Related"
        guides={[
          {
            href: routes.penalties,
            label: "Penalties and enforcement (§§ 27–34)",
            blurb: "How a matter reaches the Board, and the two exits before any penalty.",
          },
          {
            href: routes.obligations,
            label: "Obligations (§§ 4–10)",
            blurb: "The duties whose breach the Schedule prices.",
          },
          {
            href: routes.applicability,
            label: "Does the DPDP Act apply to you?",
            blurb: "Walk the section 3 tests before worrying about the Schedule.",
          },
          {
            href: routes.gdpr,
            label: "DPDP vs GDPR",
            blurb: "Penalties here, compensation there — a different shape of risk.",
          },
        ]}
      />

      <EditorialReview />
      <SiteFooter />
    </div>
  );
}
