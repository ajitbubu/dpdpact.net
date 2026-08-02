import type { Metadata } from "next";
import { Check } from "lucide-react";

import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
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
    body: "On a request to correct, complete or update, the Data Fiduciary must correct inaccurate or misleading data, complete what is incomplete, and update what is stale. On a request to erase, it must erase — unless retention is needed for the specified purpose or by law.",
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
    body: "Nominate another individual to exercise your rights in the event of death or incapacity — incapacity meaning inability to act due to unsoundness of mind or infirmity of body.",
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

export const metadata: Metadata = {
  title: "DPDP Act Rights & Duties (§§ 11–15)",
  description:
    "Chapter III of the DPDP Act: the four rights of a Data Principal — access, correction and erasure, grievance redressal, nomination — and the five duties under section 15.",
  alternates: { canonical: "/rights" },
};

export default function RightsPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="rights" />

      <PageHero
        breadcrumb="Rights & Duties"
        eyebrow="Chapter III · Sections 11–15"
        title="Four Rights You Can Exercise,"
        titleAccent="Five Duties You Owe"
        lede="Rights run against the Data Fiduciary you gave consent to — including consent treated as given under section 7(a). Requests are made in the prescribed manner, and grievances go to the Fiduciary before the Board."
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
              Section 15 — the five duties
            </h2>
            <p className="m-0 max-w-[74ch] text-[15px] leading-[1.7] text-text-secondary">
              Duties are enforceable: breach of them is the one penalty head in
              the Schedule measured in thousands, not crores — up to ₹10,000.
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

      <SiteFooter />
    </div>
  );
}
