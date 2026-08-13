import type { Metadata } from "next";
import { AlertTriangle, ArrowRight, ExternalLink, Scale } from "lucide-react";
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
import { actPath } from "@/lib/act-sections";
import { routes } from "@/lib/routes";
import {
  CONTENT_UPDATED,
  CONTENT_UPDATED_LABEL,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const COMMENCEMENT_SOURCE =
  "https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf";
const IT_ACT_SOURCE =
  "https://www.indiacode.nic.in/bitstream/123456789/13116/1/it_act_2000_updated.pdf";
const SPDI_SOURCE =
  "https://cis-india.org/internet-governance/files/it-reasonable-security-practices-and-procedures-and-sensitive-personal-data-or-information-rules-2011.pdf";

/**
 * The four amendments in section 44, split by whether they have commenced.
 *
 * This split is the whole point of the page. Most commentary says "the DPDP
 * Act repealed section 43A", which is not yet true: 44(1) and 44(3) commenced
 * on publication, 44(2) did not.
 */
const AMENDMENTS = [
  {
    ref: "§ 44(1)",
    target: "TRAI Act, 1997 - section 14(c)",
    status: "In force",
    tone: "safe" as const,
    body: "Substitutes the sub-clauses listing which appeals the Telecom Disputes Settlement and Appellate Tribunal hears, adding the Appellate Tribunal under the DPDP Act. This is what makes TDSAT the appeal route from the Data Protection Board.",
  },
  {
    ref: "§ 44(3)",
    target: "RTI Act, 2005 - section 8(1)(j)",
    status: "In force",
    tone: "safe" as const,
    body: "Replaces the old public-interest balancing clause with a flat exemption: “information which relates to personal information”. This is the least-discussed change in the Act and the only one that narrows a right rather than creating one.",
  },
  {
    ref: "§ 44(2)(a)",
    target: "IT Act, 2000 - section 43A",
    status: "Not yet in force",
    tone: "warning" as const,
    body: "“Section 43A shall be omitted.” Until this commences, the compensation regime for negligent handling of sensitive personal data continues to operate alongside the DPDP Act.",
  },
  {
    ref: "§ 44(2)(c)",
    target: "IT Act, 2000 - section 87(2)(ob)",
    status: "Not yet in force",
    tone: "warning" as const,
    body: "Omits the rule-making power under which the SPDI Rules, 2011 were framed. This is the provision that ultimately strands the SPDI Rules, and it is why their fate is tied to section 44(2) rather than to the DPDP Rules.",
  },
];

/** What section 43A and the SPDI Rules actually require, while they last. */
const OUTGOING = [
  {
    ref: "IT Act § 43A",
    title: "Compensation without a ceiling",
    body: "A body corporate that possesses, deals with or handles sensitive personal data in a computer resource it owns, controls or operates, and is negligent in implementing and maintaining reasonable security practices, is liable to pay damages by way of compensation to the person affected. The section names no upper limit.",
  },
  {
    ref: "SPDI Rule 3",
    title: "A narrow definition of sensitive data",
    body: "Passwords, financial information such as bank account or card details, physical and mental health condition, sexual orientation, medical records and history, and biometric information. The DPDP Act abandons this category entirely: it regulates all digital personal data at one standard.",
  },
  {
    ref: "SPDI Rule 4",
    title: "A published privacy policy",
    body: "The body corporate must publish a policy covering the type of information collected, the purpose, the disclosure practice and the security practices followed. The DPDP Act replaces this with the itemised notice under section 5, which is given to the individual rather than posted on a website.",
  },
  {
    ref: "SPDI Rule 8",
    title: "A named security standard",
    body: "Reasonable security practices are satisfied by a documented programme, and IS/ISO/IEC 27001 is named as one such standard. The DPDP Act and Rules take the opposite approach and describe outcomes rather than certifying to a named standard.",
  },
];

/** The two regimes on the dimensions that actually change work. */
const COMPARISON = [
  {
    dimension: "What is protected",
    spdi: "Sensitive personal data or information only - a closed list of eight categories in Rule 3.",
    dpdp: "All digital personal data: any data about an identifiable individual, in digital form or digitised later. No sensitive tier at all.",
  },
  {
    dimension: "Who is bound",
    spdi: "A body corporate: a company, firm, sole proprietorship or association engaged in commercial or professional activity.",
    dpdp: "Any Data Fiduciary, including the State, subject to the exemptions in sections 7 and 17.",
  },
  {
    dimension: "Reach outside India",
    spdi: "No express extraterritorial provision.",
    dpdp: "Section 3 reaches processing outside India where it relates to offering goods or services to Data Principals in India.",
  },
  {
    dimension: "Lawful basis",
    spdi: "Consent for collection, plus a lawful-purpose and necessity test.",
    dpdp: "Consent under section 6, or one of the nine certain legitimate uses in section 7. Consent must be free, specific, informed, unconditional and unambiguous.",
  },
  {
    dimension: "Telling the individual",
    spdi: "A privacy policy published on the website, plus notice at the point of collection.",
    dpdp: "An itemised notice under section 5, given to the individual before or with the consent request, covering the data, the purpose, how to exercise rights and how to complain to the Board.",
  },
  {
    dimension: "Security",
    spdi: "Reasonable security practices, with IS/ISO/IEC 27001 named as a standard that satisfies the test.",
    dpdp: "Reasonable security safeguards to prevent a breach, under section 8(5). No named certification; the Rules describe outcomes.",
  },
  {
    dimension: "Breach reporting",
    spdi: "No general obligation to report to a regulator or to affected individuals under the SPDI Rules themselves.",
    dpdp: "Section 8(6) requires intimation to the Board and to every affected Data Principal, in the form and manner the Rules prescribe.",
  },
  {
    dimension: "Individual rights",
    spdi: "Review and correction of information, and withdrawal of consent.",
    dpdp: "Access, correction and erasure, grievance redressal and nomination, under sections 11 to 14.",
  },
  {
    dimension: "Consequence of failure",
    spdi: "Compensation to the affected person under section 43A, awarded by adjudication. No statutory ceiling.",
    dpdp: "Monetary penalties imposed by the Board under the Schedule, up to ₹250 crore for a security-safeguard failure. No individual compensation route.",
  },
];

const FAQ = [
  {
    q: "Has section 43A of the IT Act been repealed?",
    a: "Not yet. Section 44(2)(a) of the DPDP Act omits it, but that sub-section is in the eighteen-month tranche of the commencement notification and has not commenced. Section 43A remains live law until then, and a claim for compensation under it remains available.",
  },
  {
    q: "Are the SPDI Rules, 2011 still in force?",
    a: "Yes. They were made under section 87(2)(ob) of the IT Act, which section 44(2)(c) omits on the same eighteen-month timetable. Until that commences, an organisation handling sensitive personal data is expected to comply with the SPDI Rules and to be preparing for the DPDP Act at the same time.",
  },
  {
    q: "So do both regimes apply to me right now?",
    a: "In substance, yes, and that is the practical point of the transition window. The SPDI obligations are live today. Most of the DPDP Act obligations are not, but the Rules are notified, so what they will require is already known rather than speculative.",
  },
  {
    q: "What happens to a pending section 43A claim after the omission commences?",
    a: "The Act does not answer this on its face, and the position will depend on the general savings principles in the General Clauses Act, 1897 and on how the courts read the omission. This is a question for a lawyer on specific facts, not one this page can settle.",
  },
  {
    q: "Did the DPDP Act really change the Right to Information Act?",
    a: "Yes, and that change is already in force. Section 44(3) substitutes section 8(1)(j) of the RTI Act with a flat exemption for information relating to personal information, removing the earlier structure that allowed disclosure where a larger public interest justified it.",
  },
];

export const metadata: Metadata = {
  // Absolute: with the site-wide ` | DPDP Academy` suffix this runs to 62
  // characters and truncates in the SERP.
  title: { absolute: "SPDI Rules vs DPDP Act - What Changes, and When" },
  description:
    "Section 43A of the IT Act and the SPDI Rules, 2011 are still in force. What the DPDP Act repeals, what it already changed, and the dates each takes effect.",
  alternates: { canonical: "/dpdp-vs-spdi-rules" },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "SPDI Rules vs the DPDP Act: what is repealed, and when",
  description:
    "A provision-by-provision account of section 44 of the DPDP Act, 2023 - which amendments commenced on publication and which are scheduled - and what that means for IT Act section 43A and the SPDI Rules, 2011.",
  datePublished: "2026-08-09",
  dateModified: CONTENT_UPDATED,
  author: { "@type": "Organization", name: SITE_NAME + " Editorial" },
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  mainEntityOfPage: SITE_URL + "/dpdp-vs-spdi-rules",
  citation: [COMMENCEMENT_SOURCE, IT_ACT_SOURCE, SPDI_SOURCE],
};

export default function DpdpVsSpdiRulesPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="rules" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />

        <PageHero
          breadcrumb="SPDI Rules vs DPDP"
          path="/dpdp-vs-spdi-rules"
          eyebrow="§ 44 · IT Act § 43A · SPDI Rules, 2011"
          title="The Old Regime Is Not Gone."
          titleAccent="It Ends in May 2027."
          lede="Almost every summary of the DPDP Act says it repealed section 43A of the IT Act. Read the commencement notification and that is not yet true. The sub-section doing the repealing has not started, which means two data protection regimes apply to Indian organisations at the same time."
        >
          <div className="mt-[22px] flex flex-wrap gap-[10px]">
            <Badge tone="warning">SPDI Rules still live</Badge>
            <Badge tone="neutral">Current as of {CONTENT_UPDATED_LABEL}</Badge>
          </div>
        </PageHero>

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(38px,5vw,60px)] px-[var(--space-5)] py-[clamp(42px,6vw,76px)]">
            {/* ------------------------------------------- The headline fact */}
            <div className="flex flex-col gap-[14px] rounded-lg border-[1.5px] border-primary bg-surface p-[clamp(20px,3vw,30px)]">
              <span className="flex items-center gap-[10px]">
                <span className="inline-flex size-[40px] shrink-0 items-center justify-center rounded-sm bg-primary text-white">
                  <AlertTriangle size={20} aria-hidden="true" />
                </span>
                <span className="font-display text-[clamp(19px,2.4vw,23px)] font-semibold leading-[1.3] text-text">
                  Section 44 was split across two commencement dates
                </span>
              </span>
              <p className="m-0 max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                The commencement notification issued with the DPDP Rules on 13
                November 2025 brought sub-sections (1) and (3) of section 44
                into force immediately, and placed sub-section (2) in the
                eighteen-month tranche. So the Act has already amended the TRAI
                Act and the Right to Information Act, while the amendments to
                the Information Technology Act sit and wait.
              </p>
              <p className="m-0 max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                That single drafting decision is why an Indian organisation
                today owes duties under a 2011 rule-set and a 2023 statute at
                once, and why &ldquo;the DPDP Act replaced the SPDI Rules&rdquo;
                is a statement about 2027, not about now.
              </p>
            </div>

            {/* --------------------------------------- Amendment by amendment */}
            <div className="flex flex-col gap-[18px]">
              <div>
                <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  Section 44, provision by provision
                </span>
                <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                  Four amendments, two start dates
                </h2>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(288px,1fr))] gap-[16px]">
                {AMENDMENTS.map((item) => (
                  <Card key={item.ref} className="block h-full">
                    <div className="mb-[14px] flex items-start justify-between gap-[12px]">
                      <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-primary-text tabular-nums">
                        <ProvisionRef value={item.ref} />
                      </span>
                      <Badge tone={item.tone}>{item.status}</Badge>
                    </div>
                    <span className="mb-[9px] block font-display text-[17px] font-semibold leading-[1.3] text-text">
                      {item.target}
                    </span>
                    <span className="block text-[14px] leading-[1.72] text-text-secondary">
                      {item.body}
                    </span>
                  </Card>
                ))}
              </div>

              <p className="m-0 max-w-[74ch] text-[14px] leading-[1.7] text-text-muted">
                Read the provision yourself:{" "}
                <Link
                  href="/reader/section-44"
                  className="font-semibold text-primary-text"
                >
                  section 44 in full
                </Link>
                , and{" "}
                <Link
                  href="/reader/section-38"
                  className="font-semibold text-primary-text"
                >
                  section 38
                </Link>{" "}
                on how the Act sits alongside other laws.
              </p>
            </div>

            {/* ------------------------------------------ The outgoing regime */}
            <div className="flex flex-col gap-[18px]">
              <div>
                <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  Still binding today
                </span>
                <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                  What the 2011 regime still asks of you
                </h2>
                <p className="mb-0 mt-[12px] max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                  Section 43A was inserted by the IT (Amendment) Act, 2008 and
                  took effect in October 2009. The SPDI Rules were framed under
                  it two years later. Between them they are the whole of
                  India&apos;s general data protection law until section 44(2)
                  commences.
                </p>
              </div>

              <div className="overflow-hidden rounded-lg border border-border">
                {OUTGOING.map((item, i) => (
                  <div
                    key={item.ref}
                    className={
                      i % 2 === 0
                        ? "flex flex-wrap gap-[10px] bg-[var(--bg-sunken)] px-[20px] py-[18px]"
                        : "flex flex-wrap gap-[10px] px-[20px] py-[18px]"
                    }
                  >
                    <span className="flex-[0_0_130px] font-mono text-[13px] font-semibold text-primary-text">
                      <ProvisionRef value={item.ref} />
                    </span>
                    <span className="flex min-w-0 flex-[1_1_320px] flex-col gap-[6px]">
                      <span className="font-sans text-[15px] font-semibold text-text">
                        {item.title}
                      </span>
                      <span className="text-[14px] leading-[1.72] text-text-secondary">
                        {item.body}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ------------------------------------------ Side by side table */}
            <div className="flex flex-col gap-[18px]">
              <div>
                <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  Side by side
                </span>
                <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                  Nine dimensions that change the work
                </h2>
                <p className="mb-0 mt-[12px] max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                  The DPDP Act is not a bigger version of the SPDI Rules. It
                  changes what counts as protected data, who is answerable, and
                  what happens when something goes wrong.
                </p>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[var(--bg-sunken)]">
                      <th className="border-b border-border px-[16px] py-[13px] font-sans text-[12.5px] font-semibold leading-[1.4] text-text-secondary">
                        Dimension
                      </th>
                      <th className="border-b border-border px-[16px] py-[13px] font-sans text-[12.5px] font-semibold leading-[1.4] text-text-secondary">
                        SPDI Rules, 2011
                      </th>
                      <th className="border-b border-border px-[16px] py-[13px] font-sans text-[12.5px] font-semibold leading-[1.4] text-primary-text">
                        DPDP Act, 2023
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row) => (
                      <tr key={row.dimension}>
                        <td className="border-b border-border px-[16px] py-[14px] align-top font-sans text-[14px] font-semibold leading-[1.5] text-text">
                          {row.dimension}
                        </td>
                        <td className="border-b border-border px-[16px] py-[14px] align-top text-[13.5px] leading-[1.7] text-text-secondary">
                          {row.spdi}
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

            {/* --------------------------------------------- The overlap rule */}
            <div className="flex flex-col gap-[14px] rounded-lg border border-border bg-[var(--bg-sunken)] p-[clamp(20px,3vw,30px)]">
              <span className="flex items-center gap-[10px]">
                <span className="inline-flex size-[40px] shrink-0 items-center justify-center rounded-sm bg-primary-tint text-primary-text">
                  <Scale size={20} aria-hidden="true" />
                </span>
                <span className="font-display text-[clamp(18px,2.2vw,21px)] font-semibold leading-[1.3] text-text">
                  Which law wins while both apply
                </span>
              </span>
              <p className="m-0 max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                Section 38 answers this directly. The DPDP Act is{" "}
                <em>in addition to and not in derogation of</em> any other law
                in force, so the SPDI obligations are not displaced by
                implication. Where the two genuinely conflict, the DPDP Act
                prevails to the extent of that conflict. In practice the two
                rarely conflict: the DPDP Act asks for more, in more places, of
                more data.
              </p>
              <p className="m-0 max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                The safe reading for the transition window is the strict one.
                Keep the SPDI privacy policy and the named security standard,
                and build the DPDP notice, consent and breach machinery beside
                them rather than instead of them.
              </p>
            </div>

            {/* ------------------------------------------------- RTI sidebar */}
            <div className="flex flex-col gap-[12px]">
              <h2 className="m-0 font-display text-[clamp(22px,3vw,30px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                The change nobody mentions
              </h2>
              <p className="m-0 max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                Section 44(3) rewrote section 8(1)(j) of the Right to
                Information Act, and it did so on publication rather than on the
                eighteen-month clock. The clause used to exempt personal
                information whose disclosure had no relationship to public
                activity or interest, subject to a public-interest override. It
                now reads, in full: &ldquo;information which relates to personal
                information&rdquo;.
              </p>
              <p className="m-0 max-w-[74ch] text-[15px] leading-[1.75] text-text-secondary">
                Whatever view one takes of that, it is the one part of the DPDP
                Act that is fully operative today and it belongs in any honest
                account of what the statute did.
              </p>
            </div>

            {/* ---------------------------------------------------- Sources */}
            <div className="flex flex-col gap-[10px] rounded-lg border border-border bg-surface p-[22px]">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted">
                Primary sources
              </span>
              {[
                { href: COMMENCEMENT_SOURCE, label: "MeitY commencement notification, 13 November 2025" },
                { href: IT_ACT_SOURCE, label: "Information Technology Act, 2000 (India Code, updated)" },
                { href: SPDI_SOURCE, label: "IT (Reasonable Security Practices … SPDI) Rules, 2011" },
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
              <p className="mb-0 mt-[6px] text-[13px] leading-[1.7] text-text-muted">
                Statutory text on this page is quoted from the Act as published
                in the Gazette. Commencement dates are eighteen months and one
                year from the 13 November 2025 publication; advisers differ by a
                day on whether the operative date is the 13th or 14th, so treat
                mid-May 2027 as the planning horizon rather than a deadline to
                the hour.
              </p>
            </div>

            <div>
              <Link
                href={routes.rules}
                className="inline-flex items-center gap-[8px] text-[15px] font-semibold text-primary-text no-underline hover:underline"
              >
                See the full DPDP Rules 2025 commencement timeline
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <Faq items={FAQ} heading="SPDI and the DPDP Act, answered" />
      </main>

      <RelatedGuides
        heading="Where this fits"
        guides={[
          {
            href: routes.rules,
            label: "DPDP Rules 2025 - requirements and timeline",
            blurb:
              "The commencement tranches in full, and what each one turns on.",
          },
          {
            href: routes.obligations,
            label: "Obligations under the DPDP Act (§§ 4–10)",
            blurb:
              "The regime you are building towards: notice, consent, safeguards, breach reporting, erasure.",
          },
          {
            href: actPath("section-44"),
            label: "Section 44 - Amendments to certain Acts",
            blurb: "The provision itself, verbatim, with the sections it edits.",
          },
          {
            href: routes.checklist,
            label: "DPDP compliance checklist",
            blurb: "24 controls to work through before the Act fully applies.",
          },
        ]}
      />

      <EditorialReview />
      <SiteFooter />
    </div>
  );
}
