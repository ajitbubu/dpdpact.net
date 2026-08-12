import type { Metadata } from "next";
import { Check } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { EditorialReview } from "@/components/editorial-review";
import { PageHero } from "@/components/page-hero";
import { ProvisionNotes } from "@/components/provision-notes";
import { RelatedGuides } from "@/components/related-guides";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { blogPath } from "@/lib/blog-posts";
import { routes } from "@/lib/routes";

const RIGHTS = [
  {
    n: "11",
    title: "Right to access information about personal data",
    body: "On request, obtain a summary of the personal data being processed and the processing activities carried out, the identities of every other Data Fiduciary and Data Processor the data was shared with, and a description of what was shared.",
    note: "Limit: the sharing disclosure does not apply where data was shared with another Fiduciary authorised by law for prevention, detection or investigation of offences or cyber incidents. § 11(2)",
  },
  {
    n: "12",
    title: "Right to correction and erasure",
    body: "On a request to correct, complete or update, the Data Fiduciary must correct inaccurate or misleading data, complete what is incomplete, and update what is stale. On a request to erase, it must erase - unless retention is needed for the specified purpose or by law.",
    note: "§ 12(2)–(3)",
  },
  {
    n: "13",
    title: "Right of grievance redressal",
    body: "Readily available means of redress from the Data Fiduciary or Consent Manager for any act or omission about your personal data or the exercise of your rights. They must respond within the prescribed period.",
    note: "You must exhaust this route before approaching the Board. § 13(3)",
  },
  {
    n: "14",
    title: "Right to nominate",
    body: "Nominate another individual to exercise your rights in the event of death or incapacity - incapacity meaning inability to act due to unsoundness of mind or infirmity of body.",
    note: "§ 14(1)–(2)",
  },
];

const DUTIES = [
  "Comply with all applicable laws while exercising your rights. § 15(a)",
  "Do not impersonate another person when providing personal data. § 15(b)",
  "Do not suppress material information when applying for a State-issued document, identifier or proof of identity or address. § 15(c)",
  "Do not register a false or frivolous grievance or complaint with a Data Fiduciary or the Board. § 15(d)",
  "Furnish only verifiably authentic information when exercising correction or erasure. § 15(e)",
];


/**
 * What the Rules require before any of these rights can actually be used.
 *
 * The Act grants the rights; rule 14 and rule 9 are what make them
 * exercisable, and they put concrete numbers on two things the Act left open.
 */
const EXERCISE = [
  {
    ref: "Rule 14(1)",
    title: "Publish the means, and the identifier you need",
    body: "The Data Fiduciary - and the Consent Manager where applicable - must prominently publish, on its website or app or both, the means by which a request can be made, and the particulars such as a username or other identifier it needs in order to identify her under its terms of service.",
    note: "Both halves matter. A contact form with no statement of what identifies the requester puts the burden back on her, which is the opposite of what the rule asks.",
  },
  {
    ref: "Rule 14(3)",
    title: "Ninety days, and it is a ceiling",
    body: "Section 13(2) required a response to grievances within “such period as may be prescribed”. The Rules fix it: a reasonable period not exceeding ninety days, published prominently, with appropriate technical and organisational measures implemented to make the system actually respond within it.",
    note: "Ninety days is the outer limit, not a target. The rule asks for a reasonable period and then caps it - publishing “90 days” while routinely taking 89 is not obviously compliance with the first half.",
  },
  {
    ref: "Rule 9",
    title: "The contact has to travel with the answer",
    body: "Publish the business contact information of the Data Protection Officer, if applicable, or of a person who can answer questions about the processing - and repeat it in every response to a communication exercising a right.",
    note: "The second limb is easy to miss in an automated reply. It is a template change, not a policy change.",
  },
  {
    ref: "Rule 14(4)",
    title: "Nomination can be more than one person",
    body: "She may nominate one or more individuals, in accordance with the Fiduciary's terms of service and applicable law, using the means and particulars it requires.",
    note: "So a nomination field is not a single optional text box. It is a list, and it has to survive the death or incapacity it exists for.",
  },
];

/** The limits and quirks that decide how these rights behave in practice. */
const LIMITS = [
  {
    ref: "§ 11(2)",
    title: "The sharing disclosure has a carve-out",
    body: "The right to learn who your data was shared with does not apply where it was shared with another Data Fiduciary authorised by law to obtain it, in connection with the prevention, detection or investigation of offences or cyber incidents, or prosecution or punishment.",
    note: "So an access response can be complete and still not list every recipient. The gap is lawful, and it is worth knowing before you assume a disclosure was incomplete.",
  },
  {
    ref: "§ 12(3)",
    title: "Erasure yields to a retention obligation",
    body: "On a request the Data Fiduciary must erase - unless retention is necessary for the specified purpose or for compliance with any law in force.",
    note: "The second limb is why a deletion request does not empty a ledger a tax statute requires you to keep.",
  },
  {
    ref: "§ 13(3)",
    title: "She must come to you first",
    body: "The Data Principal shall exhaust the opportunity of redressing her grievance under section 13 before approaching the Board.",
    note: "A working grievance mechanism is therefore a genuine filter on regulatory exposure, not just a compliance artefact - every complaint it resolves is one that never reaches section 27(1)(b).",
  },
  {
    ref: "§ 15",
    title: "Rights come with enforceable duties",
    body: "Five duties sit on the Data Principal: comply with applicable law when exercising rights, do not impersonate, do not suppress material information for a State-issued document, do not register a false or frivolous grievance, and furnish only verifiably authentic information when seeking correction or erasure.",
    note: "Breach of these is a penalty head in the Schedule, capped at ₹10,000. GDPR has no equivalent - it places no obligations on the data subject at all.",
  },
];

export const metadata: Metadata = {
  title: "DPDP Act Rights & Duties (§§ 11–15)",
  description:
    "Learn the four rights and five duties of a Data Principal under DPDP Act sections 11–15, including access, erasure, grievances and nomination.",
  alternates: { canonical: "/rights" },
};

export default function RightsPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="rights" />

      <PageHero
        breadcrumb="Rights & Duties"
        path="/rights"
        eyebrow="Chapter III · Sections 11–15"
        title="Four Rights You Can Exercise,"
        titleAccent="Five Duties You Owe"
        lede="Rights run against the Data Fiduciary you gave consent to - including consent treated as given under section 7(a). Requests are made in the prescribed manner, and grievances go to the Fiduciary before the Board."
      />

      <section className="bg-[var(--bg-app)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(30px,4vw,44px)] px-[var(--space-5)] py-[clamp(40px,5.4vw,70px)]">
          {/* ------------------------------------------------- The four rights */}
          <div className="flex flex-col gap-[14px]">
            {RIGHTS.map((right) => (
              <div
                key={right.n}
                className="flex flex-wrap items-start gap-[14px] rounded-lg border border-border bg-surface p-[clamp(18px,2.6vw,24px)]"
              >
                <span className="inline-flex size-[52px] shrink-0 items-center justify-center rounded-md bg-primary font-mono text-[17px] font-semibold text-white">
                  {right.n}
                </span>
                <span className="flex min-w-0 flex-[1_1_300px] flex-col gap-[8px]">
                  <span className="font-display text-[clamp(18px,2.2vw,21px)] font-semibold leading-[1.25] text-text">
                    {right.title}
                  </span>
                  <span className="text-[14.5px] leading-[1.75] text-text-secondary">
                    {right.body}
                  </span>
                  <span className="font-mono text-[13px] leading-[1.6] text-text-muted tabular-nums">
                    {right.note}
                  </span>
                </span>
              </div>
            ))}
          </div>

          {/* ---------------------------------------------- Section 15 duties */}
          <div className="flex flex-col gap-[16px]">
            <h2 className="m-0 font-display text-[clamp(23px,3.2vw,32px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              Section 15 - the five duties
            </h2>
            <p className="m-0 max-w-[74ch] text-[15px] leading-[1.7] text-text-secondary">
              Duties are enforceable: breach of them is the one penalty head in
              the Schedule measured in thousands, not crores - up to ₹10,000.
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[14px]">
              {DUTIES.map((duty) => (
                <div
                  key={duty}
                  className="flex gap-[12px] rounded-lg border border-border bg-surface px-[20px] py-[18px]"
                >
                  <span className="shrink-0 text-primary-text">
                    <Check size={18} />
                  </span>
                  <span className="min-w-0 flex-1 text-[14px] leading-[1.7] text-text-secondary">
                    {duty}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* --------------------------------------------- Escalation order */}
          <div className="flex flex-col gap-[12px] rounded-lg border-[1.5px] border-primary bg-surface p-[clamp(20px,3vw,28px)]">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
              Escalation order
            </span>
            <span className="font-display text-[clamp(17px,2.2vw,20px)] font-semibold leading-[1.35] text-text">
              Data Fiduciary or Consent Manager → the Board → the Appellate
              Tribunal within 60 days → appeal under the TRAI Act
            </span>
            <span className="text-[14px] leading-[1.7] text-text-secondary">
              No civil court may entertain a matter the Board is empowered to
              decide, and no injunction may be granted against action taken
              under the Act. §§ 13, 27–29, 39
            </span>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Four rights, five duties, one exam."
        sub="Fifteen questions, twenty minutes, certificate the same minute you pass."
        secondary={{ href: routes.exam, label: "Take the exam" }}
        primary={{ href: routes.obligations, label: "Next: Obligations" }}
      />

      <RelatedGuides
        heading="Handling these rights in practice"
        guides={[
          {
            href: blogPath("data-principal-request-workflow"),
            label: "A practical Data Principal request workflow",
            blurb:
              "Access, correction, erasure, grievance redressal and nomination without operational dead ends.",
          },
          {
            href: blogPath("childrens-data-under-dpdp"),
            label: "Children's data under the DPDP Act and Rules",
            blurb:
              "Verifiable parental consent, age assurance and the notified exemptions.",
          },
          {
            href: routes.templates,
            label: "DPDP compliance templates and request resources",
            blurb:
              "The request workflow, evidence fields and related implementation files in one library.",
          },
          {
            href: routes.checklist,
            label: "DPDP readiness checklist",
            blurb:
              "Test whether rights channels, identity checks, processor routing and grievance evidence are in place.",
          },
        ]}
      />

      <ProvisionNotes
        eyebrow="Rule 14 · Rule 9"
        heading="What makes a right exercisable"
        intro="A right nobody can find is not much of a right. The Rules turn sections 11 to 14 into published means, a named identifier, a response deadline and a contact that travels with every answer."
        items={EXERCISE}
      />

      <ProvisionNotes
        eyebrow="The fine print"
        heading="Four limits worth knowing before you build"
        intro="Each of these changes how a request is handled, and none of them is obvious from the section headings alone."
        items={LIMITS}
        tone="sunken"
      />

      <EditorialReview />
      <SiteFooter />
    </div>
  );
}
