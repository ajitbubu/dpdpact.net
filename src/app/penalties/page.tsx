import type { Metadata } from "next";
import { Gavel, Handshake, Search } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { EditorialReview } from "@/components/editorial-review";
import { PenaltyPath } from "@/components/diagrams";
import { ProvisionNotes } from "@/components/provision-notes";
import { RelatedGuides } from "@/components/related-guides";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { blogPath } from "@/lib/blog-posts";
import { routes } from "@/lib/routes";

/** Schedule entries, ordered by amount as the design presents them. */
const PENALTIES = [
  {
    entry: "Entry 1 · § 8(5)",
    breach:
      "Failure to take reasonable security safeguards to prevent a personal data breach",
    amount: "₹250 crore",
    featured: true,
  },
  {
    entry: "Entry 2 · § 8(6)",
    breach:
      "Failure to give the Board or affected Data Principals notice of a personal data breach",
    amount: "₹200 crore",
    featured: false,
  },
  {
    entry: "Entry 3 · § 9",
    breach: "Breach of the additional obligations in relation to children",
    amount: "₹200 crore",
    featured: false,
  },
  {
    entry: "Entry 4 · § 10",
    breach:
      "Breach of the additional obligations of a Significant Data Fiduciary",
    amount: "₹150 crore",
    featured: false,
  },
  {
    entry: "Entry 7 · any other provision",
    breach:
      "Breach of any other provision of the Act or the rules made under it",
    amount: "₹50 crore",
    featured: false,
  },
  {
    entry: "Entry 5 · § 15",
    breach: "Breach of a Data Principal's duties",
    amount: "₹10,000",
    featured: false,
  },
];

const ENFORCEMENT = [
  {
    icon: Search,
    title: "How an inquiry runs",
    body: "The Board decides whether there are sufficient grounds, records reasons for every step, follows natural justice, and may hold civil-court powers of summons, evidence and inspection. It may issue interim orders - but may not seize equipment or block access to premises in a way that disrupts day-to-day functioning.",
    ref: "§ 28",
  },
  {
    icon: Handshake,
    title: "Ways out short of penalty",
    body: "The Board may direct mediation where a complaint can be settled, and may accept a voluntary undertaking at any stage - which bars proceedings on its contents. Fail to honour a term and the breach is deemed a breach of the Act itself.",
    ref: "§§ 31–32",
  },
  {
    icon: Gavel,
    title: "Appeals and blocking",
    body: "Appeals go to the Appellate Tribunal within sixty days; it aims to dispose of them within six months and functions digitally. After penalties in two or more instances, the Central Government may - in the public interest and after a hearing - direct blocking of the Fiduciary's platform.",
    ref: "§§ 29–30, § 37",
  },
];

const FACTORS = [
  "Nature, gravity and duration",
  "Type of personal data affected",
  "Repetitive nature of the breach",
  "Gain realised or loss avoided",
  "Mitigation, and how timely it was",
  "Proportionality and deterrence",
  "Likely impact on the person",
];


/**
 * § 27(1): how a matter reaches the Board at all.
 *
 * The page already covers what happens once an inquiry starts. This is the
 * step before it, and the first entry is the one that surprises people.
 */
const INTAKE = [
  {
    ref: "§ 27(1)(a)",
    title: "Your own breach report",
    body: "On receiving an intimation of a personal data breach under section 8(6), the Board may direct urgent remedial or mitigation measures, and inquire into the breach.",
    note: "Reporting is mandatory and reporting is a trigger. The duty to notify under section 8(6) and the exposure to inquiry run through the same event, which is why the mitigation you can evidence matters so much at the section 33(2) stage.",
  },
  {
    ref: "§ 27(1)(b)",
    title: "A Data Principal's complaint",
    body: "About a personal data breach, about a Data Fiduciary's observance of its obligations in relation to her personal data, or about the exercise of her rights.",
    note: "She must exhaust the Fiduciary's own grievance mechanism first - section 13(3) - so a working grievance process is a genuine filter, not just a compliance box.",
  },
  {
    ref: "§ 27(1)(c)–(d)",
    title: "Consent Manager failures",
    body: "A complaint about a Consent Manager's obligations towards her personal data, or an intimation that one has broken a condition of its registration.",
    note: "Relevant from November 2026, when registration opens under Rule 4.",
  },
  {
    ref: "§ 27(1)(e)",
    title: "A Government reference about an intermediary",
    body: "Where the Central Government refers a breach of section 37(2) - an intermediary failing to comply with a blocking direction.",
  },
];

export const metadata: Metadata = {
  title: "DPDP Act Penalties & The Schedule",
  description:
    "Understand the seven DPDP Act penalty heads, the Board's inquiry process, statutory factors and maximum penalties from ₹10,000 to ₹250 crore.",
  alternates: { canonical: "/penalties" },
};

export default function PenaltiesPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="penalties" />

      <PageHero
        breadcrumb="Penalties & Enforcement"
        path="/penalties"
        eyebrow="Chapters VI–VIII · The Schedule"
        title="Seven Penalty Heads,"
        titleAccent="Up To ₹250 Crore"
        lede="Penalties follow an inquiry, never precede one. The Board weighs gravity, duration, repetition, gain or loss, mitigation and proportionality before fixing an amount - and everything realised goes to the Consolidated Fund of India."
      />

      <section className="bg-[var(--bg-app)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(30px,4vw,44px)] px-[var(--space-5)] py-[clamp(40px,5.4vw,70px)]">
          {/* -------------------------------------------- The Schedule table */}
          <div className="flex flex-col gap-[12px]">
            <h2 className="m-0 font-display text-[clamp(23px,3.2vw,32px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              Penalties in the Schedule
            </h2>
            {PENALTIES.map((row) => (
              <div
                key={row.entry}
                className={
                  row.featured
                    ? "flex flex-wrap items-center gap-[14px] rounded-lg border-[1.5px] border-primary bg-surface p-[clamp(18px,2.6vw,22px)] shadow-[var(--shadow-raised)]"
                    : "flex flex-wrap items-center gap-[14px] rounded-lg border border-border bg-surface p-[clamp(18px,2.6vw,22px)]"
                }
              >
                <span className="flex min-w-0 flex-[1_1_300px] flex-col gap-[5px]">
                  <span
                    className={
                      row.featured
                        ? "font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text tabular-nums"
                        : "font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted tabular-nums"
                    }
                  >
                    {row.entry}
                  </span>
                  <span className="text-[15px] leading-[1.7] text-text-secondary">
                    {row.breach}
                  </span>
                </span>
                <span
                  className={
                    row.featured
                      ? "shrink-0 whitespace-nowrap font-display text-[clamp(20px,2.8vw,26px)] font-semibold leading-[1.1] text-primary-text"
                      : "shrink-0 whitespace-nowrap font-display text-[clamp(20px,2.8vw,26px)] font-semibold leading-[1.1] text-text"
                  }
                >
                  {row.amount}
                </span>
              </div>
            ))}

            <div className="flex flex-wrap items-center gap-[14px] rounded-lg border border-border bg-[var(--bg-sunken)] p-[clamp(18px,2.6vw,22px)]">
              <span className="flex min-w-0 flex-[1_1_300px] flex-col gap-[5px]">
                <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted tabular-nums">
                  Entry 6 · § 32
                </span>
                <span className="text-[15px] leading-[1.7] text-text-secondary">
                  Breach of any term of a voluntary undertaking accepted by the
                  Board
                </span>
              </span>
              <span className="max-w-[240px] shrink-0 font-sans text-[14px] font-semibold leading-[1.5] text-text-secondary">
                Up to the extent applicable for the breach that triggered the
                proceedings
              </span>
            </div>
          </div>

          {/* ------------------------------------------------- Enforcement */}
          <div className="flex flex-col gap-[16px]">
            <h2 className="m-0 font-display text-[clamp(23px,3.2vw,32px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              How enforcement works
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(288px,1fr))] gap-[18px]">
              {ENFORCEMENT.map(({ icon: Icon, ...item }) => (
                <Card key={item.title} className="block h-full">
                <span className="mb-[14px] flex items-center gap-[10px]">
                  <span className="inline-flex size-[40px] items-center justify-center rounded-sm bg-primary-tint text-primary-text">
                    <Icon size={20} />
                  </span>
                  <span className="font-display text-[18px] font-semibold text-text">
                    {item.title}
                  </span>
                </span>
                <span className="block text-[14px] leading-[1.75] text-text-secondary">
                  {item.body}
                </span>
                <span className="mt-[10px] block text-[13px] leading-[1.6] text-text-muted">
                  {item.ref}
                </span>
                </Card>
              ))}
            </div>
          </div>

          {/* --------------------------------------------- Section 33(2) */}
          <div className="flex flex-col gap-[12px] rounded-lg border border-border bg-[var(--bg-sunken)] p-[clamp(20px,3vw,28px)]">
            <h2 className="m-0 font-display text-[clamp(21px,2.8vw,28px)] font-semibold leading-[1.2] tracking-[-0.02em] text-text">
              How the Board determines an amount
            </h2>
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
              Seven factors the Board must weigh · § 33(2)
            </span>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[10px]">
              {FACTORS.map((factor) => (
                <span
                  key={factor}
                  className="text-[14px] leading-[1.7] text-text-secondary"
                >
                  {factor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Ink closing band */}
      <section className="bg-primary text-white">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-[20px] px-[var(--space-5)] py-[clamp(34px,4.6vw,54px)]">
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-[10px]">
            <span className="font-display text-[clamp(22px,3vw,30px)] font-semibold leading-[1.2] tracking-[-0.02em]">
              You have read the whole Act. Now certify it.
            </span>
            <span className="text-[14.5px] leading-[1.7] opacity-90">
              Fifteen questions across all nine chapters and the Schedule. Pass
              at 70% and your certificate is issued instantly.
            </span>
          </div>
          <div className="flex shrink-0 flex-wrap gap-[12px]">
            <LinkButton
              href={routes.exam}
              variant="primary"
              size="lg"
              className="min-w-0"
            >
              Start the exam
            </LinkButton>
          </div>
        </div>
      </section>

      <RelatedGuides
        heading="Staying out of the Schedule"
        guides={[
          {
            href: blogPath("dpdp-breach-notification-guide"),
            label: "DPDP breach notification: build the two-stage response",
            blurb:
              "Notice to affected Data Principals and the Rules' two-stage Board reporting process.",
          },
          {
            href: blogPath("dpdp-act-2023-practical-primer"),
            label: "The DPDP Act, 2023: a practical primer",
            blurb:
              "Scope, lawful grounds, Data Fiduciary obligations and Data Principal rights in one pass.",
          },
        ]}
      />


      <section className="border-t border-border bg-[var(--bg-app)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[20px] px-[var(--space-5)] py-[clamp(38px,5vw,64px)]">
          <div>
            <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
              At a glance
            </span>
            <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              How a breach becomes a number
            </h2>
          </div>
          <PenaltyPath />
        </div>
      </section>

      <ProvisionNotes
        eyebrow="§ 27(1) · Before any inquiry"
        heading="Four ways a matter reaches the Board"
        intro="The page above covers how an inquiry runs. This is the step before it - and the first route in is the one organisations underestimate."
        items={INTAKE}
      />

      <section className="border-t border-border bg-[var(--bg-sunken)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[18px] px-[var(--space-5)] py-[clamp(38px,5vw,64px)]">
          <div>
            <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
              Worked example
            </span>
            <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              From a leaked database to a number
            </h2>
            <p className="mb-0 mt-[12px] max-w-[76ch] text-[15px] leading-[1.75] text-text-secondary">
              A misconfigured backup exposes 40,000 customer records. Trace the
              provisions in order and you can see where the amount is actually
              decided - and it is not in the Schedule.
            </p>
          </div>

          <div className="flex flex-col gap-[12px]">
            {[
              ["§ 8(6) + Rule 7", "You notify. Affected Data Principals without delay; the Board without delay, then a detailed report within 72 hours. There is no harm threshold to hide behind - 40,000 records or four, the duty is the same."],
              ["§ 27(1)(a)", "That notification is itself the Board's route in. It may direct urgent remedial measures immediately, and inquire into the breach."],
              ["§ 28(3)–(4)", "The Board decides whether there are sufficient grounds. If not, it closes the matter with reasons recorded. Many notifications should end here."],
              ["§ 33(1)", "If it does inquire, a penalty follows only where the Board determines the breach is significant, after giving you an opportunity to be heard."],
              ["Schedule, entry 1", "The relevant head is failure to take reasonable security safeguards under section 8(5) - the ₹250 crore ceiling. A ceiling, not a starting point."],
              ["§ 33(2)", "The number is then set against seven factors. A misconfiguration caught and closed in hours, with processors instructed and customers told, argues differently from the same exposure left open for months."],
            ].map(([ref, text]) => (
              <div
                key={ref}
                className="flex flex-wrap gap-[16px] rounded-lg border border-border bg-surface px-[20px] py-[17px]"
              >
                <span className="flex-[0_0_128px] font-mono text-[12.5px] font-semibold text-primary-text">
                  {ref}
                </span>
                <span className="min-w-0 flex-[1_1_420px] text-[14.5px] leading-[1.75] text-text-secondary">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <p className="m-0 max-w-[76ch] text-[14px] leading-[1.7] text-text-muted">
            Two of the seven factors are the ones you can influence before
            anything happens. Mitigation is credited explicitly, and its
            timeliness is part of the test - which makes a rehearsed incident
            response a penalty argument rather than merely good hygiene. The
            last factor lets the Board weigh the penalty&apos;s likely impact on
            the person, which is why the ceiling is rarely the expectation.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-[var(--bg-app)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[16px] px-[var(--space-5)] py-[clamp(38px,5vw,64px)]">
          <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
            § 34 · § 39
          </span>
          <h2 className="m-0 max-w-[26ch] font-display text-[clamp(24px,3.4vw,34px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
            Nobody gets paid, and no court will hear it
          </h2>
          <p className="m-0 max-w-[76ch] text-[15.5px] leading-[1.75] text-text-secondary">
            Section 34 credits every sum realised by way of penalty to the
            Consolidated Fund of India. Not a rupee reaches the person whose
            data was exposed. This Act creates no compensation route at all -
            unlike the outgoing section 43A of the IT Act, which awarded damages
            to the person harmed and remains available until section 44(2)
            commences, and unlike GDPR Article 82.
          </p>
          <p className="m-0 max-w-[76ch] text-[15.5px] leading-[1.75] text-text-secondary">
            Section 39 then bars civil courts from entertaining any suit or
            proceeding in a matter the Board is empowered to decide, and bars
            injunctions against action taken under the Act. The Board and the
            Appellate Tribunal are the entire forum.
          </p>
          <p className="m-0 max-w-[76ch] text-[14px] leading-[1.7] text-text-muted">
            For a compliance programme this changes the shape of the risk rather
            than its size: no class of private claimants, one regulator, and
            nothing to settle with the individual. For the individual it is the
            most significant thing the Act does not give her. See{" "}
            <Link href={routes.spdi} className="font-semibold text-primary-text">
              what section 43A still allows until 2027
            </Link>{" "}
            and{" "}
            <Link href={routes.gdpr} className="font-semibold text-primary-text">
              how this differs from GDPR
            </Link>
            .
          </p>
        </div>
      </section>

      <EditorialReview />
      <SiteFooter />
    </div>
  );
}
