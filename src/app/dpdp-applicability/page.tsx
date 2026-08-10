import type { Metadata } from "next";
import Link from "next/link";

import { ApplicabilityClient } from "./applicability-client";
import { EditorialReview } from "@/components/editorial-review";
import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { ProvisionNotes } from "@/components/provision-notes";
import { RelatedGuides } from "@/components/related-guides";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { routes } from "@/lib/routes";
import { ACT_SOURCE_PDF, CONTENT_UPDATED, SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * The provisions the checker walks, written out in full.
 *
 * The tool is client-side, so on its own this route would serve a heading and
 * a button - the "app screen with nothing to rank" problem. Everything the
 * checker decides is therefore also stated here, server-rendered, where a
 * crawler and a reader without JavaScript can both use it.
 */
const TESTS = [
  {
    ref: "§ 2(t)",
    title: "It has to be personal data",
    body: "Any data about an individual who is identifiable by or in relation to that data. If nobody is identifiable, the Act is not engaged at all, however commercially sensitive the data may be.",
  },
  {
    ref: "§ 3(a)",
    title: "It has to be digital",
    body: "Collected in digital form, or collected non-digitally and digitised subsequently. Paper that stays on paper is outside the Act; the act of scanning it brings it inside.",
    note: "This is a trigger worth diarising rather than assuming. A backlog digitisation project changes the answer for every record it touches.",
  },
  {
    ref: "§ 3(a)–(b)",
    title: "It has to happen in India, or be aimed at India",
    body: "Processing within the territory of India is covered. So is processing outside India, where it is in connection with any activity related to offering goods or services to Data Principals within India.",
    note: "Note what is absent. GDPR Article 3 also catches monitoring the behaviour of people in the EU; section 3(b) has no monitoring limb, so analytics on Indian visitors is not by itself a trigger.",
  },
  {
    ref: "§ 3(c)(i)",
    title: "Unless it is purely personal or domestic",
    body: "Personal data processed by an individual for any personal or domestic purpose is excluded outright.",
    note: "The exclusion attaches to the purpose, not the person. A sole trader keeping customer records is not processing for a domestic purpose.",
  },
  {
    ref: "§ 3(c)(ii)",
    title: "Unless she published it, or the law required it published",
    body: "Data made or caused to be made publicly available by the Data Principal herself, or by any person under a legal obligation in India to publish it, is outside the Act.",
    note: "Leaked data is not publicly available in this sense, and neither is data a third party republished without being obliged to. GDPR has no comparable carve-out.",
  },
];

const FAQ = [
  {
    q: "Does the DPDP Act apply to a company outside India?",
    a: "It can. Section 3(b) reaches processing carried out wholly outside India where it is connected with offering goods or services to Data Principals within India. There is no establishment requirement and no user-number threshold.",
  },
  {
    q: "Does the Act apply to employee data?",
    a: "Yes - employee data is digital personal data like any other. What changes is the lawful basis: section 7(i) is a certain legitimate use covering employment purposes and safeguarding the employer from loss or liability, so consent is not always required.",
  },
  {
    q: "Does it apply to paper records?",
    a: "Not while they stay on paper. The Act covers personal data collected in digital form, and personal data collected non-digitally and digitised subsequently. Scanning a paper file brings it into scope from that point.",
  },
  {
    q: "Does the Act apply to publicly available data?",
    a: "No, where the individual made it public herself or someone was legally obliged to publish it. That is section 3(c)(ii), and it is one of the clearest differences from GDPR, which applies regardless of public availability.",
  },
  {
    q: "If the Act applies, when do the obligations actually bite?",
    a: "Sections 3 to 17 sit in the eighteen-month tranche of the commencement notification, which falls in mid-May 2027. Until then the SPDI Rules, 2011 continue to apply alongside.",
  },
  {
    q: "Is this checker legal advice?",
    a: "No. It walks the tests in section 3 and cites the provision behind each answer so you can check it against the text. Scope is only the first question, and section 17 can switch off large parts of the Act for particular grounds or notified classes.",
  },
];

export const metadata: Metadata = {
  title: "Does the DPDP Act Apply to You?",
  description:
    "Walk the section 3 tests: personal data, digital form, processing in or aimed at India, and the two exclusions. Every answer cites the provision behind it.",
  alternates: { canonical: "/dpdp-applicability" },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Does the DPDP Act, 2023 apply to you? The section 3 tests",
  description:
    "An interactive walk through section 3 of the DPDP Act, 2023 - what counts as digital personal data, the territorial and extraterritorial limbs, and the two exclusions in section 3(c).",
  datePublished: "2026-08-09",
  dateModified: CONTENT_UPDATED,
  author: { "@type": "Organization", name: SITE_NAME + " Editorial" },
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  mainEntityOfPage: SITE_URL + "/dpdp-applicability",
  isBasedOn: ACT_SOURCE_PDF,
  citation: [ACT_SOURCE_PDF, SITE_URL + "/reader/section-3"],
};

export default function ApplicabilityPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="overview" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />

        <PageHero
          breadcrumb="Applicability"
          path="/dpdp-applicability"
          eyebrow="§ 3 · Application of the Act"
          title="Five Questions Decide"
          titleAccent="Whether It Applies."
          lede="Scope is the first thing to settle and the easiest to get wrong. Section 3 sets two limbs that bring processing in and two exclusions that take it out - and none of them turns on how large you are or how much data you hold."
        />

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(30px,4vw,44px)] px-[var(--space-5)] py-[clamp(40px,5.4vw,70px)]">
            <ApplicabilityClient />
            <p className="m-0 max-w-[76ch] text-[14px] leading-[1.72] text-text-muted">
              Nothing you answer leaves your browser - the checker holds its
              state in the page and stores nothing. Every branch below is also
              written out in full, so the same reasoning is available without
              running the tool.
            </p>
          </div>
        </section>

        <ProvisionNotes
          eyebrow="The tests in full"
          heading="What section 3 actually asks"
          intro="Two limbs bring processing into the Act. Two exclusions take it back out. The checker walks these in order; here they are in one place."
          items={TESTS}
          tone="sunken"
        />

        <section className="border-t border-border bg-[var(--bg-app)]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[16px] px-[var(--space-5)] py-[clamp(38px,5vw,64px)]">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
              After scope
            </span>
            <h2 className="m-0 max-w-[28ch] font-display text-[clamp(24px,3.4vw,34px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              Being in scope is the beginning of the question
            </h2>
            <p className="m-0 max-w-[76ch] text-[15.5px] leading-[1.75] text-text-secondary">
              A yes here means the Act reaches your processing. It does not tell
              you which obligations apply, and two provisions can change that
              substantially. Section 7 lists nine certain legitimate uses that
              provide a lawful basis without consent. Section 17 exempts whole
              grounds - legal claims, courts and regulators, offences,
              non-resident data under a foreign contract, mergers and
              demergers, and defaulter asset tracing.
            </p>
            <p className="m-0 max-w-[76ch] text-[15.5px] leading-[1.75] text-text-secondary">
              Even inside an exemption, sections 8(1) and 8(5) survive:
              accountability, and reasonable security safeguards. There is no
              route through this Act that leaves you free to hold personal data
              insecurely.
            </p>
            <p className="m-0 max-w-[76ch] text-[14px] leading-[1.7] text-text-muted">
              Read it yourself:{" "}
              <Link href="/reader/section-3" className="font-semibold text-primary-text">
                section 3
              </Link>
              ,{" "}
              <Link href="/reader/section-7" className="font-semibold text-primary-text">
                section 7
              </Link>{" "}
              and{" "}
              <Link href="/reader/section-17" className="font-semibold text-primary-text">
                section 17
              </Link>
              .
            </p>
          </div>
        </section>

        <Faq items={FAQ} heading="Applicability, answered" />
      </main>

      <RelatedGuides
        heading="Next"
        guides={[
          {
            href: routes.overview,
            label: "Overview and scope (§§ 1–3)",
            blurb: "What the Act governs, and the exemptions in section 17.",
          },
          {
            href: routes.obligations,
            label: "Obligations (§§ 4–10)",
            blurb: "If it applies, this is the sequence you owe.",
          },
          {
            href: routes.spdi,
            label: "SPDI Rules vs the DPDP Act",
            blurb: "What still binds you until the DPDP obligations commence.",
          },
          {
            href: routes.gdpr,
            label: "DPDP vs GDPR",
            blurb: "Why the extraterritorial and public-data tests differ.",
          },
        ]}
      />

      <EditorialReview />
      <SiteFooter />
    </div>
  );
}
