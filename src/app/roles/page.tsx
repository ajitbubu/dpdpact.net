import type { Metadata } from "next";
import {
  Building2,
  GitCompareArrows,
  Landmark,
  Server,
  ShieldAlert,
  User,
} from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Card } from "@/components/ui/card";
import { routes } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

const ROLES = [
  {
    icon: User,
    ref: "§ 2(j)",
    title: "Data Principal",
    body: "The individual the personal data is about. Where she is a child, the expression includes her parents or lawful guardian; where she is a person with disability, her lawful guardian acting on her behalf.",
    accent: true,
  },
  {
    icon: Building2,
    ref: "§ 2(i)",
    title: "Data Fiduciary",
    body: "Whoever determines the purpose and means of processing, alone or with others. Accountability sits here — irrespective of any agreement to the contrary, and irrespective of what a Data Principal does or fails to do.",
    accent: true,
  },
  {
    icon: Server,
    ref: "§ 2(k) · § 8(2)",
    title: "Data Processor",
    body: "Processes personal data on behalf of a Data Fiduciary, and may only be engaged for offering goods or services under a valid contract. When the Fiduciary must erase data, it must cause its processors to erase too.",
    accent: false,
  },
  {
    icon: GitCompareArrows,
    ref: "§ 2(g) · § 6(7)–(9)",
    title: "Consent Manager",
    body: "A single point of contact, registered with the Board, through which a Data Principal can give, manage, review and withdraw consent on an accessible, transparent and interoperable platform. Accountable to her, not to the Fiduciary.",
    accent: false,
  },
  {
    icon: ShieldAlert,
    ref: "§ 10",
    title: "Significant Data Fiduciary",
    body: "Notified by the Central Government on volume and sensitivity of data, risk to rights, sovereignty, electoral democracy, security of the State and public order. Owes a DPO in India, an independent data auditor, and periodic DPIA and audit.",
    accent: false,
  },
  {
    icon: Landmark,
    ref: "§§ 18–26",
    title: "Data Protection Board of India",
    body: "A body corporate established by the Central Government, with a Chairperson and Members appointed for two-year terms, functioning as far as practicable as a digital office. Its officers are deemed public servants.",
    accent: false,
  },
];

const DEFINITIONS = [
  {
    term: "Personal data",
    body: "Any data about an individual who is identifiable by or in relation to such data. § 2(t)",
  },
  {
    term: "Processing",
    body: "A wholly or partly automated operation on digital personal data — collection, storage, use, sharing, erasure and more. § 2(x)",
  },
  {
    term: "Personal data breach",
    body: "Any unauthorised processing, or accidental disclosure, acquisition, sharing, use, alteration, destruction or loss of access, that compromises confidentiality, integrity or availability. § 2(u)",
  },
  {
    term: "Child",
    body: "An individual who has not completed the age of eighteen years. § 2(f)",
  },
  {
    term: "Specified purpose",
    body: "The purpose stated in the notice given by the Data Fiduciary to the Data Principal. § 2(za)",
  },
  {
    term: "Digital office",
    body: "An office conducting proceedings online end to end, from intimation to disposal. § 2(m)",
  },
];

/**
 * `DefinedTermSet` over the definitions already rendered on this page.
 *
 * "What is a Data Fiduciary" is a question an answer engine gets asked
 * directly; marking each term up gives it an unambiguous term/definition pair
 * to lift, tied to the section that defines it.
 */
const glossarySchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "DPDP Act 2023 — defined terms",
  url: `${SITE_URL}/roles`,
  hasDefinedTerm: [
    ...ROLES.map((r) => ({
      "@type": "DefinedTerm",
      name: r.title,
      description: r.body,
      termCode: r.ref,
      inDefinedTermSet: `${SITE_URL}/roles`,
    })),
    ...DEFINITIONS.map((d) => ({
      "@type": "DefinedTerm",
      name: d.term,
      description: d.body,
      inDefinedTermSet: `${SITE_URL}/roles`,
    })),
  ],
};

export const metadata: Metadata = {
  title: "DPDP Act Key Roles Explained",
  description:
    "The six defined roles in the DPDP Act 2023: Data Principal, Data Fiduciary, Data Processor, Consent Manager, Significant Data Fiduciary and the Data Protection Board of India.",
  alternates: { canonical: "/roles" },
};

export default function RolesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="roles" />

      <PageHero
        breadcrumb="Key Roles"
        eyebrow="Section 2 · Section 10 · Sections 18–26"
        title="Six Defined Roles Carry"
        titleAccent="Every Obligation"
        lede="Get the roles right and the rest of the Act reads itself: duties attach to the Data Fiduciary, rights attach to the Data Principal, and everything else is machinery around those two."
      />

      <section className="bg-[var(--bg-app)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(30px,4vw,44px)] px-[var(--space-5)] py-[clamp(40px,5.4vw,70px)]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(288px,1fr))] gap-[18px]">
            {ROLES.map(({ icon: Icon, ...role }) => (
              <Card key={role.title} className="block h-full">
                <span className="mb-[14px] flex items-center gap-[10px]">
                  <span
                    className={
                      role.accent
                        ? "inline-flex size-[44px] items-center justify-center rounded-md bg-primary text-white"
                        : "inline-flex size-[44px] items-center justify-center rounded-md bg-primary-tint text-primary-text"
                    }
                  >
                    <Icon size={21} />
                  </span>
                  <span
                    className={
                      role.accent
                        ? "font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text tabular-nums"
                        : "font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted tabular-nums"
                    }
                  >
                    {role.ref}
                  </span>
                </span>
                <span className="mb-[9px] block font-display text-[20px] font-semibold leading-[1.2] text-text">
                  {role.title}
                </span>
                <span className="block text-[14.5px] leading-[1.75] text-text-secondary">
                  {role.body}
                </span>
              </Card>
            ))}
          </div>

          <div className="flex flex-col gap-[16px]">
            <h2 className="m-0 font-display text-[clamp(23px,3.2vw,32px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              Definitions that decide exam questions
            </h2>
            <div className="overflow-hidden rounded-lg border border-border">
              <div className="grid grid-cols-[minmax(0,1fr)] bg-surface">
                {DEFINITIONS.map((def, i) => (
                  <div
                    key={def.term}
                    className={
                      i < DEFINITIONS.length - 1
                        ? "flex flex-wrap gap-[10px] border-b border-border px-[20px] py-[16px]"
                        : "flex flex-wrap gap-[10px] px-[20px] py-[16px]"
                    }
                  >
                    <span className="flex-[0_0_168px] font-sans text-[14px] font-semibold text-text">
                      {def.term}
                    </span>
                    <span className="min-w-0 flex-[1_1_260px] text-[14px] leading-[1.7] text-text-secondary">
                      {def.body}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Roles are the most tested topic on the exam."
        sub="Run a practice set now while the definitions are fresh."
        secondary={{ href: routes.practiceTest, label: "Practice Test" }}
        primary={{ href: routes.rights, label: "Next: Rights & Duties" }}
      />

      <SiteFooter />
    </div>
    </>
  );
}
