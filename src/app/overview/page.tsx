import type { Metadata } from "next";
import { CircleSlash, Globe } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { EditorialReview } from "@/components/editorial-review";
import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { routes } from "@/lib/routes";

const BIG_IDEAS = [
  {
    n: "01",
    title: "A lawful basis is required",
    body: "Personal data may be processed only for a lawful purpose — with consent, or under one of the certain legitimate uses in section 7. There is no open-ended business-interest ground.",
  },
  {
    n: "02",
    title: "Notice comes first",
    body: "Every consent request is accompanied or preceded by a notice: the data, the purpose, how to exercise rights, how to complain — in English or any Eighth Schedule language.",
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
    a: "The Digital Personal Data Protection Act, 2023 is India's first standalone data protection law. It received the President's assent on 11 August 2023 as Act No. 22 of 2023, and runs to 9 chapters, 44 sections and one Schedule of penalties. It governs the processing of digital personal data — data about an identifiable individual, held in digital form.",
  },
  {
    q: "Who does the DPDP Act apply to?",
    a: "It applies to anyone who determines the purpose and means of processing digital personal data — the Data Fiduciary — whether that data was collected in digital form or collected on paper and digitised later. Accountability sits with the Data Fiduciary irrespective of any agreement to the contrary.",
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
        eyebrow="Chapter I · Sections 1–3"
        title="What the Act Governs,"
        titleAccent="And Where It Stops"
        lede="The Digital Personal Data Protection Act, 2023 received the President's assent on 11 August 2023. It regulates the processing of digital personal data — data about an identifiable individual, held in digital form — and balances the individual's right to protect it against lawful needs to use it."
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
                  <strong className="text-text">Inside India</strong> — to
                  digital personal data collected in digital form, or collected
                  on paper and digitised later.
                </span>
                <span className="block text-[14.5px] leading-[1.75] text-text-secondary">
                  <strong className="text-text">Outside India</strong> — where
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
                  — data an individual processes for her own purposes.
                </span>
                <span className="block text-[14.5px] leading-[1.75] text-text-secondary">
                  <strong className="text-text">Lawfully public data</strong> —
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

      <EditorialReview />
      <SiteFooter />
    </div>
  );
}
