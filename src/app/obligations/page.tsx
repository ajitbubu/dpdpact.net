import type { Metadata } from "next";
import { Baby, ShieldAlert } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { EditorialReview } from "@/components/editorial-review";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Card } from "@/components/ui/card";
import { routes } from "@/lib/routes";

const STEPS = [
  {
    step: "Step 01 · § 4",
    title: "Establish the ground",
    body: "Process only for a lawful purpose — one not expressly forbidden by law — with consent, or under a certain legitimate use.",
    accent: false,
  },
  {
    step: "Step 02 · § 5",
    title: "Give notice",
    body: "Itemise the data and purpose, how rights are exercised, and how to complain to the Board — before or with the consent request. Pre-Act consents need a fresh notice too.",
    accent: false,
  },
  {
    step: "Step 03 · § 6",
    title: "Take consent properly",
    body: "Free, specific, informed, unconditional, unambiguous, limited to the data necessary — withdrawable as easily as it was given, and provable by you in a proceeding.",
    accent: false,
  },
  {
    step: "Step 04 · § 8(5)",
    title: "Safeguard the data",
    body: "Reasonable security safeguards to prevent a personal data breach — including data held on your behalf by a processor. The single most expensive obligation to miss.",
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
    body: "On withdrawal of consent, or once the purpose is no longer served — and cause your processors to erase. The purpose is deemed served-out after the prescribed period of no contact.",
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
        eyebrow="Chapter II · Sections 4–10"
        title="The Compliance Lifecycle,"
        titleAccent="Ask To Erase"
        lede="Sections 4 to 10 read as a sequence — from the moment data is asked for to the moment it must be deleted. Accountability never moves: the Data Fiduciary answers for its processors, whatever the contract says."
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
                  Children — section 9
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
                  Significant Data Fiduciaries — section 10
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
              Certain legitimate uses — section 7
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

      <CtaBand
        heading="Eight steps down. One Schedule to go."
        sub="See what each missed obligation costs before you sit the exam."
        secondary={{ href: routes.practiceTest, label: "Practice Test" }}
        primary={{ href: routes.penalties, label: "Next: Penalties" }}
      />

      <EditorialReview />
      <SiteFooter />
    </div>
  );
}
