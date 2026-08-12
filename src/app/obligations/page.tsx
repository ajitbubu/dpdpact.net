import type { Metadata } from "next";
import { Baby, ShieldAlert } from "lucide-react";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { EditorialReview } from "@/components/editorial-review";
import { ConsentLifecycle } from "@/components/diagrams";
import { PageHero } from "@/components/page-hero";
import { RelatedGuides } from "@/components/related-guides";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Card } from "@/components/ui/card";
import { blogPath } from "@/lib/blog-posts";
import { routes } from "@/lib/routes";

const STEPS = [
  {
    step: "Step 01 · § 4",
    title: "Establish the ground",
    body: "Process only for a lawful purpose - one not expressly forbidden by law - with consent, or under a certain legitimate use.",
    accent: false,
  },
  {
    step: "Step 02 · § 5",
    title: "Give notice",
    body: "Itemise the data and purpose, how rights are exercised, and how to complain to the Board - before or with the consent request. Pre-Act consents need a fresh notice too.",
    accent: false,
  },
  {
    step: "Step 03 · § 6",
    title: "Take consent properly",
    body: "Free, specific, informed, unconditional, unambiguous, limited to the data necessary - withdrawable as easily as it was given, and provable by you in a proceeding.",
    accent: false,
  },
  {
    step: "Step 04 · § 8(5)",
    title: "Safeguard the data",
    body: "Reasonable security safeguards to prevent a personal data breach - including data held on your behalf by a processor. The single most expensive obligation to miss.",
    accent: false,
  },
  {
    step: "Step 05 · § 8(6)",
    title: "Report a breach",
    body: "Intimate the Board and every affected Data Principal in the prescribed form and manner. No materiality threshold appears in the section.",
    accent: true,
  },
  {
    step: "Step 06 · § 8(7)–(8)",
    title: "Erase when done",
    body: "On withdrawal of consent, or once the purpose is no longer served - and cause your processors to erase. The purpose is deemed served-out after the prescribed period of no contact.",
    accent: false,
  },
  {
    step: "Step 07 · § 8(9)–(10)",
    title: "Stay reachable",
    body: "Publish contact details of the Data Protection Officer or a person who can answer questions, and run an effective grievance mechanism.",
    accent: false,
  },
  {
    step: "Step 08 · § 8(3)",
    title: "Keep it accurate",
    body: "Where data will be used to make a decision affecting the Data Principal, or disclosed to another Fiduciary, ensure completeness, accuracy and consistency.",
    accent: false,
  },
];

const LEGITIMATE_USES = [
  {
    letter: "(a)",
    body: "Data voluntarily provided for a specified purpose, where consent was not refused",
  },
  {
    letter: "(b)",
    body: "State providing a prescribed subsidy, benefit, service, certificate, licence or permit",
  },
  {
    letter: "(c)",
    body: "State functions under law, sovereignty and integrity, or security of the State",
  },
  { letter: "(d)", body: "Legal obligations to disclose information to the State" },
  { letter: "(e)", body: "Compliance with a judgment, decree or order" },
  { letter: "(f)", body: "Medical emergency threatening life or health" },
  {
    letter: "(g)",
    body: "Epidemic, outbreak of disease or other public-health threat",
  },
  { letter: "(h)", body: "Disaster or breakdown of public order" },
  {
    letter: "(i)",
    body: "Employment purposes, or safeguarding the employer from loss or liability",
  },
];

/**
 * What the DPDP Rules, 2025 turn each statutory duty into.
 *
 * The Act states duties at the level of principle - "reasonable security
 * safeguards", "in such form and manner as may be prescribed". This is where
 * the prescribing happened, and it is the difference between knowing the
 * section and being able to implement it.
 */
const RULE_LAYER = [
  {
    act: "§ 5 - Notice",
    rule: "Rule 3",
    title: "The notice must itemise, not summarise",
    body: "An itemised description of the personal data to be processed, the specified purpose, and a specific description of the goods, services or uses that the processing enables. It must be presented in clear and plain language and stand independently of other information, with links to withdraw consent, exercise rights and complain to the Board.",
    build: "A privacy policy does not satisfy this. The notice is a discrete artefact tied to the consent request, and it has to name the data rather than gesture at categories.",
  },
  {
    act: "§ 8(5) - Safeguards",
    rule: "Rule 6",
    title: "Named measures, and a one-year log floor",
    body: "Encryption, obfuscation, masking or virtual tokens; appropriate access controls with visibility over who accessed what; retention of access logs and processing logs for at least one year; regular monitoring and review of those logs; business continuity and recovery arrangements; and the same obligations flowed down to processors by contract.",
    build: "The log floor is the operationally expensive one. One year of access and processing logs, monitored rather than merely stored, is an infrastructure commitment more than a policy commitment.",
  },
  {
    act: "§ 8(6) - Breach",
    rule: "Rule 7",
    title: "Two audiences, two clocks, no threshold",
    body: "Affected Data Principals are told without delay. The Board receives an initial intimation without delay, then a detailed report within 72 hours, extendable only by the Board. There is no harm threshold anywhere in the section or the rule.",
    build: "This is the widest gap from GDPR. Article 33 lets you skip notification where a breach is unlikely to result in risk, and only tells individuals when risk is high. Here every personal data breach is reportable to both.",
  },
  {
    act: "§ 8(7)–(8) - Erasure",
    rule: "Rule 8",
    title: "An inactivity clock, and a warning before deletion",
    body: "For specified classes of platform above stated user thresholds - e-commerce, online gaming and social media - personal data is erased after three years of user inactivity, with at least 48 hours notice to the individual before deletion. Separately, logs are kept a minimum of one year for lawful requests and investigations before being erased.",
    build: "Two systems, pulling opposite ways: delete the person's data on an inactivity timer, keep the logs about it for a year. Both need to be automated, and the 48-hour notice needs a delivery path that still works for a dormant account.",
  },
];

/** § 8(6) with Rule 7 laid out as the sequence you actually run. */
const BREACH_SEQUENCE = [
  {
    when: "On becoming aware",
    who: "Every affected Data Principal",
    what: "A description of the breach, its likely consequences, the measures being taken to mitigate it, and what the individual can do to protect themselves. Delivered through the channels you already hold for them.",
  },
  {
    when: "Without delay",
    who: "The Data Protection Board",
    what: "An initial intimation covering the nature and extent of the breach, when and where it occurred, and its likely impact.",
  },
  {
    when: "Within 72 hours",
    who: "The Data Protection Board",
    what: "A detailed report: the events and circumstances that led to the breach, the mitigation measures taken, the remedial steps to prevent recurrence, and confirmation of the intimations given to affected Data Principals. Extendable only on the Board's allowance.",
  },
];

export const metadata: Metadata = {
  title: "DPDP Act Obligations (§§ 4–10)",
  description:
    "DPDP Act sections 4–10 explained: lawful purpose, notice, consent, safeguards, breach reporting, erasure, children's data and SDF duties.",
  alternates: { canonical: "/obligations" },
};

export default function ObligationsPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="obligations" />

      <PageHero
        breadcrumb="Obligations"
        path="/obligations"
        eyebrow="Chapter II · Sections 4–10"
        title="The Compliance Lifecycle,"
        titleAccent="Ask To Erase"
        lede="Sections 4 to 10 read as a sequence - from the moment data is asked for to the moment it must be deleted. Accountability never moves: the Data Fiduciary answers for its processors, whatever the contract says."
      />

      <section className="bg-[var(--bg-app)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(30px,4vw,44px)] px-[var(--space-5)] py-[clamp(40px,5.4vw,70px)]">
          {/* ------------------------------------------ The eight-step cycle */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(258px,1fr))] gap-[18px]">
            {STEPS.map((step) => (
              <Card
                key={step.step}
                className={
                  step.accent
                    ? "block h-full shadow-[var(--shadow-raised)]"
                    : "block h-full"
                }
              >
                <span
                  className={
                    step.accent
                      ? "mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text tabular-nums"
                      : "mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted tabular-nums"
                  }
                >
                  {step.step}
                </span>
                <span className="mb-[8px] block font-display text-[18px] font-semibold leading-[1.25] text-text">
                  {step.title}
                </span>
                <span className="block text-[14px] leading-[1.7] text-text-secondary">
                  {step.body}
                </span>
              </Card>
            ))}
          </div>

          {/* --------------------------------- Children + Significant Fiduciaries */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px]">
            <div className="flex flex-col gap-[12px] rounded-lg border-[1.5px] border-primary bg-surface p-[clamp(20px,3vw,28px)]">
              <span className="flex items-center gap-[10px]">
                <span className="inline-flex size-[40px] items-center justify-center rounded-sm bg-primary text-white">
                  <Baby size={20} />
                </span>
                <span className="font-display text-[19px] font-semibold text-text">
                  Children - section 9
                </span>
              </span>
              <span className="text-[14.5px] leading-[1.75] text-text-secondary">
                Verifiable consent of the parent or lawful guardian before any
                processing. No processing likely to cause a detrimental effect
                on a child&apos;s well-being. No tracking, no behavioural
                monitoring, no targeted advertising directed at children.
              </span>
              <span className="font-mono text-[13px] leading-[1.6] text-text-muted tabular-nums">
                Government may exempt notified classes or purposes, or notify an
                age above which a verifiably safe Fiduciary is exempt. § 9(4)–(5)
              </span>
            </div>

            <div className="flex flex-col gap-[12px] rounded-lg border border-border bg-[var(--bg-sunken)] p-[clamp(20px,3vw,28px)]">
              <span className="flex items-center gap-[10px]">
                <span className="inline-flex size-[40px] items-center justify-center rounded-sm bg-primary-tint text-primary-text">
                  <ShieldAlert size={20} />
                </span>
                <span className="font-display text-[19px] font-semibold text-text">
                  Significant Data Fiduciaries - section 10
                </span>
              </span>
              <span className="text-[14.5px] leading-[1.75] text-text-secondary">
                Appoint a Data Protection Officer based in India, answerable to
                the board of directors and the contact point for grievances.
                Appoint an independent data auditor. Run periodic Data
                Protection Impact Assessments and audits.
              </span>
              <span className="font-mono text-[13px] leading-[1.6] text-text-muted tabular-nums">
                Notification turns on data volume and sensitivity, risk to
                rights, sovereignty and integrity of India, electoral democracy,
                security of the State and public order. § 10(1)
              </span>
            </div>
          </div>

          {/* --------------------------------------- Certain legitimate uses */}
          <div className="flex flex-col gap-[14px]">
            <h2 className="m-0 font-display text-[clamp(23px,3.2vw,32px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              Certain legitimate uses - section 7
            </h2>
            <p className="m-0 max-w-[74ch] text-[15px] leading-[1.7] text-text-secondary">
              Nine closed categories where consent is not the basis. Read them
              narrowly: they are the exception, not a second consent regime.
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(228px,1fr))] gap-[12px]">
              {LEGITIMATE_USES.map((use) => (
                <div
                  key={use.letter}
                  className="rounded-md border border-border bg-surface px-[17px] py-[15px] text-[14px] leading-[1.65] text-text-secondary"
                >
                  <strong className="text-text">{use.letter}</strong> {use.body}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-[var(--bg-app)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[20px] px-[var(--space-5)] py-[clamp(38px,5vw,64px)]">
          <div>
            <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
              At a glance
            </span>
            <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              The consent lifecycle, end to end
            </h2>
          </div>
          <ConsentLifecycle />
        </div>
      </section>

      {/* ------------------------------- Accountability is non-delegable */}
      <section className="border-t border-border bg-[var(--bg-sunken)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[16px] px-[var(--space-5)] py-[clamp(34px,5vw,58px)]">
          <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
            Section 8(1)
          </span>
          <h2 className="m-0 max-w-[24ch] font-display text-[clamp(24px,3.4vw,34px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
            The obligation you cannot contract away
          </h2>
          <p className="m-0 max-w-[76ch] text-[15.5px] leading-[1.75] text-text-secondary">
            Section 8(1) makes the Data Fiduciary responsible for compliance
            <em> irrespective of any agreement to the contrary</em>, and
            irrespective of any failure by the Data Principal to carry out her
            own duties. Two consequences follow, and both are easy to miss.
          </p>
          <p className="m-0 max-w-[76ch] text-[15.5px] leading-[1.75] text-text-secondary">
            First, a processor contract allocates work and cost, never
            liability. When a processor loses data, the Board still looks at the
            Data Fiduciary. Second, a Data Principal who breaches her section 15
            duties - say, by supplying false information - does not thereby
            reduce your obligations towards her data. Her breach is separately
            penalisable at up to ₹10,000; yours is not offset by it.
          </p>
          <p className="m-0 max-w-[76ch] text-[15.5px] leading-[1.75] text-text-muted">
            Note also the narrower scope of section 8(3). The duty to ensure
            completeness, accuracy and consistency bites only where the data is
            likely to be used for a decision affecting the Data Principal, or
            disclosed to another Data Fiduciary. It is not the general accuracy
            principle GDPR applies to all processing.
          </p>
        </div>
      </section>

      {/* ------------------------------- What the Rules turn duties into */}
      <section className="border-t border-border bg-[var(--bg-app)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[24px] px-[var(--space-5)] py-[clamp(38px,5vw,64px)]">
          <div>
            <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
              Act meets Rules
            </span>
            <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              Where &ldquo;as may be prescribed&rdquo; got prescribed
            </h2>
            <p className="mb-0 mt-[12px] max-w-[76ch] text-[15px] leading-[1.75] text-text-secondary">
              Four of these duties are stated in the Act as principles and
              filled in by the DPDP Rules, 2025. The Rules are where the
              engineering work actually lives.
            </p>
          </div>

          <div className="flex flex-col gap-[14px]">
            {RULE_LAYER.map((item) => (
              <div
                key={item.act}
                className="flex flex-wrap gap-[18px] rounded-lg border border-border bg-surface p-[clamp(18px,2.6vw,24px)]"
              >
                <div className="flex flex-[0_0_150px] flex-col gap-[6px]">
                  <span className="font-mono text-[12.5px] font-semibold text-primary-text">
                    {item.act}
                  </span>
                  <span className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-text-muted">
                    {item.rule}
                  </span>
                </div>
                <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-[9px]">
                  <span className="font-display text-[18px] font-semibold leading-[1.3] text-text">
                    {item.title}
                  </span>
                  <span className="text-[14.5px] leading-[1.75] text-text-secondary">
                    {item.body}
                  </span>
                  <span className="border-t border-border pt-[10px] text-[13.5px] leading-[1.7] text-text-muted">
                    <strong className="text-primary-text">
                      What it means to build:
                    </strong>{" "}
                    {item.build}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Worked example */}
      <section className="border-t border-border bg-[var(--bg-app)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[20px] px-[var(--space-5)] py-[clamp(38px,5vw,64px)]">
          <div>
            <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
              Worked example
            </span>
            <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              One phone number, four sections
            </h2>
            <p className="mb-0 mt-[12px] max-w-[76ch] text-[15px] leading-[1.75] text-text-secondary">
              A delivery app collects a customer&apos;s mobile number so it can
              send order updates. Six months later, marketing wants to use the
              same numbers for promotional messages. Follow the sections in
              order and the answer is not a judgement call.
            </p>
          </div>

          <div className="flex flex-col gap-[12px]">
            {[
              {
                s: "§ 4",
                q: "Is there a lawful basis for the original collection?",
                a: "Yes. The number is collected for order updates, a lawful purpose not forbidden by law, on the customer's consent. Nothing here is difficult.",
              },
              {
                s: "§ 5 + Rule 3",
                q: "What did the notice have to say?",
                a: "It had to itemise the personal data (the mobile number), state the specified purpose (delivery updates for orders placed), describe the service that enables, and link to withdrawal, rights and Board complaints - in plain language, standing on its own rather than buried in terms of service.",
              },
              {
                s: "§ 6(1)",
                q: "Does that consent stretch to marketing?",
                a: "No. Consent is limited to the personal data necessary for the specified purpose, and the specified purpose was order updates. Marketing is a different purpose, so it needs its own notice and its own consent. There is no legitimate-interest basis to fall back on, and none of the nine certain legitimate uses in section 7 covers promotional messaging.",
              },
              {
                s: "§ 8(7)–(8)",
                q: "When must the number be deleted?",
                a: "When the customer withdraws consent, or as soon as it is reasonable to assume the purpose is no longer served - whichever is earlier. The Act deems the purpose served-out once the customer neither approaches you for it nor exercises any right for the prescribed period, and section 8(11) clarifies that means no contact initiated by her. You must also cause your SMS processor to erase its copy.",
              },
            ].map((row) => (
              <div
                key={row.s}
                className="flex flex-wrap gap-[16px] rounded-lg border border-border bg-surface px-[20px] py-[18px]"
              >
                <span className="flex-[0_0_92px] font-mono text-[13px] font-semibold text-primary-text">
                  {row.s}
                </span>
                <span className="flex min-w-0 flex-[1_1_420px] flex-col gap-[7px]">
                  <span className="font-sans text-[15px] font-semibold leading-[1.45] text-text">
                    {row.q}
                  </span>
                  <span className="text-[14.5px] leading-[1.75] text-text-secondary">
                    {row.a}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <p className="m-0 max-w-[76ch] text-[14px] leading-[1.7] text-text-muted">
            The trap is step three. Teams arriving from GDPR reach for
            legitimate interests to justify the marketing use, find it missing,
            and then try to read section 7(a) - data voluntarily provided - as a
            substitute. It is not: 7(a) is tied to the purpose for which the
            data was volunteered, which brings you back to order updates.
          </p>
        </div>
      </section>

      {/* ------------------------------------------ Breach, as a sequence */}
      <section className="border-t border-border bg-[var(--bg-sunken)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[22px] px-[var(--space-5)] py-[clamp(38px,5vw,64px)]">
          <div>
            <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
              § 8(6) · Rule 7
            </span>
            <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              The breach sequence, in order
            </h2>
            <p className="mb-0 mt-[12px] max-w-[76ch] text-[15px] leading-[1.75] text-text-secondary">
              Two audiences and two clocks. Run them in parallel, because the
              obligation to the individual does not wait on the report to the
              Board.
            </p>
          </div>

          <div className="grid gap-[14px] min-[860px]:grid-cols-3">
            {BREACH_SEQUENCE.map((stage, i) => (
              <div
                key={stage.when}
                className="flex flex-col gap-[10px] rounded-lg border border-border bg-surface p-[20px]"
              >
                <span className="font-mono text-[12px] font-semibold text-primary-text tabular-nums">
                  0{i + 1} · {stage.when}
                </span>
                <span className="font-display text-[17px] font-semibold leading-[1.3] text-text">
                  {stage.who}
                </span>
                <span className="text-[14px] leading-[1.72] text-text-secondary">
                  {stage.what}
                </span>
              </div>
            ))}
          </div>

          <p className="m-0 max-w-[76ch] text-[14px] leading-[1.7] text-text-muted">
            Sections 4 to 10 sit in the eighteen-month tranche of the
            commencement notification, so these duties bite in mid-May 2027. The
            Rules are already notified, which means what they will require is
            known rather than speculative - see{" "}
            <Link href={routes.rules} className="font-semibold text-primary-text">
              the commencement timeline
            </Link>{" "}
            and{" "}
            <Link href={routes.spdi} className="font-semibold text-primary-text">
              what binds you until then
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand
        heading="Eight steps down. One Schedule to go."
        sub="See what each missed obligation costs before you sit the exam."
        secondary={{ href: routes.practiceTest, label: "Practice Test" }}
        primary={{ href: routes.penalties, label: "Next: Penalties" }}
      />

      <RelatedGuides
        heading="Implementing these obligations"
        guides={[
          {
            href: blogPath("dpdp-consent-notice-guide"),
            label: "DPDP consent notices: what product teams need to ship",
            blurb:
              "Purpose-level consent, the withdrawal path, and the implementation evidence to retain.",
          },
          {
            href: blogPath("childrens-data-under-dpdp"),
            label: "Children's data under the DPDP Act and Rules",
            blurb:
              "Verifiable parental consent, age assurance, prohibited processing and the notified exemptions.",
          },
          {
            href: blogPath("dpdp-data-retention-erasure-guide"),
            label: "DPDP data retention and erasure: build the lifecycle",
            blurb:
              "Purpose completion, legal holds and processor deletion as one workflow.",
          },
          {
            href: blogPath("dpdp-data-inventory-purpose-mapping"),
            label: "DPDP data inventory: map purpose, systems and owners",
            blurb:
              "Link personal data to purposes, legal grounds, notices, processors and accountable owners.",
          },
          {
            href: blogPath("dpdp-breach-notification-guide"),
            label: "DPDP breach notification: build the two-stage response",
            blurb:
              "Affected-person notices, both Board stages, processor coordination and editable response files.",
          },
          {
            href: routes.templates,
            label: "DPDP compliance templates and implementation resources",
            blurb:
              "Editable consent and breach files plus working structures for inventories, processors and rights requests.",
          },
        ]}
      />

      <EditorialReview />
      <SiteFooter />
    </div>
  );
}
