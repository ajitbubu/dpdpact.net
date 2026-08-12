import type { Metadata } from "next";
import { CircleSlash, Globe } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { EditorialReview } from "@/components/editorial-review";
import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { ProvisionNotes } from "@/components/provision-notes";
import { RelatedGuides } from "@/components/related-guides";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { blogPath } from "@/lib/blog-posts";
import { routes } from "@/lib/routes";

const BIG_IDEAS = [
  {
    n: "01",
    title: "A lawful basis is required",
    body: "Personal data may be processed only for a lawful purpose - with consent, or under one of the certain legitimate uses in section 7. There is no open-ended business-interest ground.",
  },
  {
    n: "02",
    title: "Notice comes first",
    body: "Every consent request is accompanied or preceded by a notice: the data, the purpose, how to exercise rights, how to complain - in English or any Eighth Schedule language.",
  },
  {
    n: "03",
    title: "The individual holds rights",
    body: "Access a summary of what is held and who it was shared with, correct or erase it, raise a grievance, and nominate someone to act on your behalf.",
  },
  {
    n: "04",
    title: "A digital regulator enforces it",
    body: "The Data Protection Board of India inquires into breaches as a digital office, may accept undertakings or direct mediation, and imposes the penalties in the Schedule.",
  },
];

const EXEMPTIONS = [
  {
    title: "Legal claims & courts",
    body: "Enforcing a legal right, and processing by courts, tribunals or regulatory bodies performing their functions. § 17(1)(a)–(b)",
  },
  {
    title: "Crime & investigation",
    body: "Prevention, detection, investigation or prosecution of any offence or contravention. § 17(1)(c)",
  },
  {
    title: "Research & statistics",
    body: "Allowed if no decision specific to a Data Principal is taken and prescribed standards are met. § 17(2)(b)",
  },
  {
    title: "Notified State instrumentalities",
    body: "In the interests of sovereignty, security of the State, friendly relations or public order. § 17(2)(a)",
  },
  {
    title: "Startups, if notified",
    body: "Government may exempt notified classes from §§ 5, 8(3), 8(7), 10 and 11. § 17(3)",
  },
  {
    title: "Cross-border transfers",
    body: "Transfers are open unless the Central Government restricts a country or territory by notification. § 16",
  },
];

const FAQ = [
  {
    q: "What is the DPDP Act 2023?",
    a: "The Digital Personal Data Protection Act, 2023 is India's first standalone data protection law. It received the President's assent on 11 August 2023 as Act No. 22 of 2023, and runs to 9 chapters, 44 sections and one Schedule of penalties. It governs the processing of digital personal data - data about an identifiable individual, held in digital form.",
  },
  {
    q: "Who does the DPDP Act apply to?",
    a: "It applies to anyone who determines the purpose and means of processing digital personal data - the Data Fiduciary - whether that data was collected in digital form or collected on paper and digitised later. Accountability sits with the Data Fiduciary irrespective of any agreement to the contrary.",
  },
  {
    q: "Does the DPDP Act apply outside India?",
    a: "Yes, where the processing is connected to offering goods or services to Data Principals within India. A company with no Indian presence is still within scope if it offers goods or services to people in India. This is section 3(b).",
  },
  {
    q: "What is not covered by the DPDP Act?",
    a: "Two things. Personal data processed by an individual for a purely personal or domestic purpose, and personal data the Data Principal made publicly available herself or that someone was legally obliged to publish. This is section 3(c).",
  },
  {
    q: "What are the lawful grounds for processing under the DPDP Act?",
    a: "Only two: the consent of the Data Principal, or one of the nine certain legitimate uses listed in section 7. There is no open-ended legitimate-interest ground of the kind found in the GDPR.",
  },
  {
    q: "What are the exemptions under section 17?",
    a: "Section 17 switches off most of Chapters II and III for enforcing legal rights, courts and tribunals, prevention and investigation of offences, notified State instrumentalities, and research or statistical purposes where no decision specific to a Data Principal is taken. The exemptions are conditional, not a blanket carve-out.",
  },
];


/** § 3(c): the two situations the Act simply does not reach. */
const OUT_OF_SCOPE = [
  {
    ref: "§ 3(c)(i)",
    title: "Personal or domestic purpose",
    body: "Personal data processed by an individual for any personal or domestic purpose falls outside the Act entirely. A contacts list, a family photo library, a personal address book.",
    note: "The exclusion attaches to the purpose, not to the person. An individual processing for a business purpose is not covered by it.",
  },
  {
    ref: "§ 3(c)(ii)",
    title: "Data she made public, or that law required published",
    body: "Personal data made or caused to be made publicly available either by the Data Principal herself, or by any person under a legal obligation in India to publish it.",
    note: "This is one of the sharpest divergences from GDPR, which has no general public-availability carve-out. A blogger's own published contact details, or a directors' register published under company law, sit outside this Act.",
  },
];


/**
 * The parts of section 17 the cards above do not cover.
 *
 * The grounds themselves are listed there; these are the carve-back that
 * survives an exemption, and the three powers the Government holds but has not
 * yet used.
 */
const EXEMPTION_DEPTH = [
  {
    ref: "§ 17(1)",
    title: "What survives an exemption",
    body: "Where a section 17(1) ground applies, Chapter II is disapplied - except sub-sections (1) and (5) of section 8. Chapter III and section 16 go too.",
    note: "So accountability and reasonable security safeguards continue to apply even to exempt processing. An exemption is never a licence to hold data insecurely.",
  },
  {
    ref: "§ 17(3)",
    title: "The startup exemption nobody plans for",
    body: "Having regard to the volume and nature of personal data processed, the Central Government may notify Data Fiduciaries or classes of them - expressly including startups - for whom section 5, sections 8(3) and 8(7), and sections 10 and 11 do not apply.",
    note: "That is notice, data accuracy, erasure, Significant Data Fiduciary duties and the right of access, switched off by notification. It is not automatic and no class has been notified, so it is something to watch rather than to rely on.",
  },
  {
    ref: "§ 17(4)",
    title: "The State keeps its data",
    body: "For processing by the State or its instrumentalities, the erasure duty in section 8(7) and the erasure right in section 12(3) do not apply - and where the processing does not involve a decision affecting the Data Principal, neither does the correction duty in section 12(2).",
    note: "A citizen has no right under this Act to have her data erased from a government system.",
  },
  {
    ref: "§ 17(5)",
    title: "A five-year power to suspend any provision",
    body: "Before five years from commencement, the Central Government may by notification declare that any provision of the Act shall not apply to any Data Fiduciary or class of them, for a period it specifies.",
    note: "A broad transitional power with no stated criteria. It expires; until then it sits over the whole framework.",
  },
];

export const metadata: Metadata = {
  title: "DPDP Act Overview & Scope",
  description:
    "Chapter I of the DPDP Act, sections 1–3: what the Act governs, when it reaches processing outside India, and the two situations it leaves alone.",
  alternates: { canonical: "/overview" },
};

export default function OverviewPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="overview" />

      <PageHero
        breadcrumb="Overview & Scope"
        path="/overview"
        eyebrow="Chapter I · Sections 1–3"
        title="What the Act Governs,"
        titleAccent="And Where It Stops"
        lede="The Digital Personal Data Protection Act, 2023 received the President's assent on 11 August 2023. It regulates the processing of digital personal data - data about an identifiable individual, held in digital form - and balances the individual's right to protect it against lawful needs to use it."
      >
        <div className="mt-[22px] flex flex-wrap gap-[10px]">
          <Badge>Act No. 22 of 2023</Badge>
          <Badge tone="neutral">Assented 11 August 2023</Badge>
          <Badge tone="neutral">In force on notified dates</Badge>
        </div>
      </PageHero>

      <section className="bg-[var(--bg-app)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(30px,4vw,48px)] px-[var(--space-5)] py-[clamp(40px,5.4vw,70px)]">
          {/* ------------------------------------------- The four big ideas */}
          <div className="flex flex-col gap-[16px]">
            <h2 className="m-0 font-display text-[clamp(23px,3.2vw,32px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              The four ideas that carry the law
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(268px,1fr))] gap-[18px]">
              {BIG_IDEAS.map((idea) => (
                <Card key={idea.n} className="block h-full">
                  <span className="mb-[10px] block font-sans text-[13px] font-semibold text-primary-text">
                    {idea.n}
                  </span>
                  <span className="mb-[8px] block font-display text-[18px] font-semibold leading-[1.25] text-text">
                    {idea.title}
                  </span>
                  <span className="block text-[14px] leading-[1.7] text-text-secondary">
                    {idea.body}
                  </span>
                </Card>
              ))}
            </div>
          </div>

          {/* --------------------------------------------- Where it applies */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px]">
            <Card className="block h-full">
              <span className="mb-[14px] flex items-center gap-[10px]">
                <span className="inline-flex size-[40px] items-center justify-center rounded-sm bg-primary-tint text-primary-text">
                  <Globe size={20} />
                </span>
                <span className="font-display text-[19px] font-semibold text-text">
                  Where it applies
                </span>
              </span>
              <span className="flex flex-col gap-[12px]">
                <span className="block text-[14.5px] leading-[1.75] text-text-secondary">
                  <strong className="text-text">Inside India</strong> - to
                  digital personal data collected in digital form, or collected
                  on paper and digitised later.
                </span>
                <span className="block text-[14.5px] leading-[1.75] text-text-secondary">
                  <strong className="text-text">Outside India</strong> - where
                  the processing is connected to offering goods or services to
                  Data Principals within India.
                </span>
                <span className="block font-mono text-[13px] leading-[1.6] text-text-muted tabular-nums">
                  Section 3(a)–(b)
                </span>
              </span>
            </Card>

            <Card className="block h-full">
              <span className="mb-[14px] flex items-center gap-[10px]">
                <span className="inline-flex size-[40px] items-center justify-center rounded-sm bg-primary-tint text-primary-text">
                  <CircleSlash size={20} />
                </span>
                <span className="font-display text-[19px] font-semibold text-text">
                  Where it does not
                </span>
              </span>
              <span className="flex flex-col gap-[12px]">
                <span className="block text-[14.5px] leading-[1.75] text-text-secondary">
                  <strong className="text-text">Personal or domestic use</strong>{" "}
                  - data an individual processes for her own purposes.
                </span>
                <span className="block text-[14.5px] leading-[1.75] text-text-secondary">
                  <strong className="text-text">Lawfully public data</strong> -
                  data the Data Principal made public herself, or that someone
                  was legally obliged to publish.
                </span>
                <span className="block font-mono text-[13px] leading-[1.6] text-text-muted tabular-nums">
                  Section 3(c)
                </span>
              </span>
            </Card>
          </div>

          {/* ------------------------------------- Illustration from the Act */}
          <div className="flex flex-col gap-[12px] rounded-lg border border-border bg-[var(--bg-sunken)] p-[clamp(20px,3vw,28px)]">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
              Illustration from the Act
            </span>
            <span className="max-w-[78ch] text-[15px] leading-[1.75] text-text-secondary">
              X, an individual, while blogging her views, has publicly made
              available her personal data on social media. In such case, the
              provisions of this Act shall not apply.
            </span>
          </div>

          {/* ------------------------------------------------- Exemptions */}
          <div className="flex flex-col gap-[16px]">
            <h2 className="m-0 font-display text-[clamp(23px,3.2vw,32px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              Exemptions worth remembering
            </h2>
            <p className="m-0 max-w-[74ch] text-[15px] leading-[1.7] text-text-secondary">
              Section 17 switches off most of Chapters II and III in defined
              situations. The exemptions are conditional, not a blanket
              carve-out.
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[14px]">
              {EXEMPTIONS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-border bg-surface px-[20px] py-[18px]"
                >
                  <span className="mb-[6px] block font-sans text-[14.5px] font-semibold text-text">
                    {item.title}
                  </span>
                  <span className="block text-[14px] leading-[1.7] text-text-secondary">
                    {item.body}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Faq items={FAQ} heading="The DPDP Act, answered" />

      <CtaBand
        heading="Know this chapter? Prove it in ten questions."
        sub="The practice test is free, unlimited, and shows the governing provision after every answer."
        secondary={{ href: routes.practiceTest, label: "Practice Test" }}
        primary={{ href: routes.roles, label: "Next: Key Roles" }}
      />

      <RelatedGuides
        heading="Where to start"
        guides={[
          {
            href: blogPath("dpdp-act-2023-practical-primer"),
            label: "The DPDP Act, 2023: a practical primer",
            blurb:
              "Scope, lawful grounds, obligations and rights, with a practical starting point.",
          },
          {
            href: blogPath("dpdp-act-for-startups"),
            label: "DPDP readiness for Indian startups: the first 90 days",
            blurb:
              "Data mapping, notices, consent, vendors, rights, retention and breach response.",
          },
          {
            href: blogPath("dpdp-act-for-saas-companies"),
            label: "DPDP for SaaS companies: map the role before the controls",
            blurb:
              "Customer, workforce and product data as a Data Fiduciary, a processor, or both.",
          },
          {
            href: routes.deadline,
            label: "DPDP compliance deadline: the three commencement phases",
            blurb:
              "What is in force, what starts in November 2026, and what is scheduled for May 2027.",
          },
          {
            href: routes.templates,
            label: "Free DPDP compliance templates",
            blurb:
              "Move from the framework into readiness, notice, inventory, processor, breach and rights artefacts.",
          },
        ]}
      />

      <ProvisionNotes
        eyebrow="§ 3(c) · Out of scope"
        heading="Two situations the Act never reaches"
        intro="Before asking which obligations apply, check whether the Act applies at all. These are exclusions from scope, not exemptions within it - nothing survives them."
        items={OUT_OF_SCOPE}
      />

      <ProvisionNotes
        eyebrow="§ 17 · Beyond the grounds"
        heading="What an exemption does not switch off"
        intro="The grounds are above. These four points decide how an exemption actually behaves - including two powers the Government holds and has not yet used."
        items={EXEMPTION_DEPTH}
        tone="sunken"
      />

      <EditorialReview />
      <SiteFooter />
    </div>
  );
}
