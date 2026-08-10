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
import { EditorialReview } from "@/components/editorial-review";
import { PageHero } from "@/components/page-hero";
import { ProvisionNotes } from "@/components/provision-notes";
import { RelatedGuides } from "@/components/related-guides";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Card } from "@/components/ui/card";
import { blogPath } from "@/lib/blog-posts";
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
    body: "Whoever determines the purpose and means of processing, alone or with others. Accountability sits here - irrespective of any agreement to the contrary, and irrespective of what a Data Principal does or fails to do.",
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
    body: "A wholly or partly automated operation on digital personal data - collection, storage, use, sharing, erasure and more. § 2(x)",
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
  name: "DPDP Act 2023 - defined terms",
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


/**
 * Who can actually be held to account, and for what.
 *
 * The cards above define the roles. This is the part that decides outcomes:
 * the Act loads almost everything onto the Data Fiduciary and reaches the
 * processor only through a contract.
 */
const LIABILITY = [
  {
    ref: "§ 2(s)",
    title: "Almost anything can be a Data Fiduciary",
    body: "“Person” includes an individual, a Hindu undivided family, a company, a firm, an association of persons or body of individuals whether incorporated or not, the State, and every artificial juristic person not already covered.",
    note: "The State is inside the definition, not outside it. A government department determining purpose and means is a Data Fiduciary, subject to the exemptions in sections 7 and 17.",
  },
  {
    ref: "§ 2(i)",
    title: "The test is purpose and means, not possession",
    body: "A Data Fiduciary is any person who, alone or with others, determines the purpose and means of processing. Holding the data is neither necessary nor sufficient - deciding why and how is what makes you one.",
    note: "“In conjunction with other persons” means two organisations can be Fiduciaries for the same processing. The Act sets out no apportionment between them.",
  },
  {
    ref: "§ 2(k) · § 8(2)",
    title: "The processor has no direct duties under the Act",
    body: "A Data Processor is any person who processes personal data on behalf of a Data Fiduciary. The Act does not impose obligations on it directly. Section 8(2) instead requires the Data Fiduciary to engage one only under a valid contract.",
    note: "This is a genuine structural break from GDPR, where Article 28 binds processors directly and a supervisory authority can act against them. Here, the contract is the whole of the mechanism.",
  },
  {
    ref: "§ 8(1)",
    title: "And the Fiduciary answers for the processor anyway",
    body: "The Data Fiduciary is responsible for compliance irrespective of any agreement to the contrary, and irrespective of any failure by the Data Principal to carry out her duties.",
    note: "So a processor contract allocates work and cost, never liability. When a processor loses data, the Board still looks at the Data Fiduciary.",
  },
  {
    ref: "§ 6(8)",
    title: "The Consent Manager answers to her, not to you",
    body: "The one role the Act points away from the Data Fiduciary. A Consent Manager is accountable to the Data Principal and acts on her behalf, even though the commercial relationship runs the other way.",
  },
];

/** §§ 18–26: the Board as an institution, not just a regulator. */
const BOARD = [
  {
    ref: "§ 18 · § 19",
    title: "A body corporate, appointed by the Government",
    body: "Established by the Central Government, with a Chairperson and Members appointed on the qualifications section 19 sets. Their salary and terms are prescribed by rules, and cannot be varied to their disadvantage after appointment.",
  },
  {
    ref: "§ 20(2)",
    title: "Two-year terms, renewable",
    body: "The Chairperson and every Member hold office for two years and are eligible for re-appointment. Short, by the standards of Indian regulators, and the renewability is the part worth noticing.",
    note: "The Fifth Schedule to the Rules fixes the pay: ₹4,50,000 a month for the Chairperson, ₹4,00,000 for other Members, consolidated, without house or car.",
  },
  {
    ref: "§ 28(1)",
    title: "A digital office by design",
    body: "The Board functions as far as practicable as a digital office - receipt of complaints, allocation, hearing and pronouncement of decisions all conducted digitally, without requiring anyone to appear in person.",
  },
  {
    ref: "§ 25",
    title: "Members and officers are public servants",
    body: "Deemed public servants within the meaning of section 21 of the Indian Penal Code, which brings the offences and protections attaching to that status.",
  },
];

export const metadata: Metadata = {
  title: "DPDP Act Key Roles Explained",
  description:
    "Understand six key DPDP Act roles, including Data Principal, Data Fiduciary, Processor, Consent Manager, SDF and the Data Protection Board.",
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
        path="/roles"
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

      <RelatedGuides
        heading="Who does what, in practice"
        guides={[
          {
            href: blogPath("data-protection-officer-india-dpdp"),
            label: "When does the DPDP Act require a Data Protection Officer?",
            blurb:
              "What section 10 requires of a Significant Data Fiduciary, and what everyone else should prepare.",
          },
          {
            href: blogPath("dpdp-processor-contracts-vendor-management"),
            label: "DPDP processor contracts: clauses operations can prove",
            blurb:
              "Instructions, safeguards, incidents, rights support, retention and evidence.",
          },
        ]}
      />

      <ProvisionNotes
        eyebrow="Who carries the risk"
        heading="The roles are a liability map"
        intro="Defining the six roles is the easy half. The half that decides outcomes is which of them the Act can actually hold to account - and the answer is lopsided."
        items={LIABILITY}
      />

      <ProvisionNotes
        eyebrow="§§ 18–26 · The Board"
        heading="The regulator, as an institution"
        intro="The Data Protection Board is the only body that can impose a penalty under this Act, and the only forum - section 39 bars civil courts from matters it is empowered to decide."
        items={BOARD}
        tone="sunken"
      />

      <EditorialReview />
      <SiteFooter />
    </div>
    </>
  );
}
