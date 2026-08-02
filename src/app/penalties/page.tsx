import type { Metadata } from "next";
import { Gavel, Handshake, Search } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    body: "The Board decides whether there are sufficient grounds, records reasons for every step, follows natural justice, and may hold civil-court powers of summons, evidence and inspection. It may issue interim orders — but may not seize equipment or block access to premises in a way that disrupts day-to-day functioning.",
    ref: "§ 28",
  },
  {
    icon: Handshake,
    title: "Ways out short of penalty",
    body: "The Board may direct mediation where a complaint can be settled, and may accept a voluntary undertaking at any stage — which bars proceedings on its contents. Fail to honour a term and the breach is deemed a breach of the Act itself.",
    ref: "§§ 31–32",
  },
  {
    icon: Gavel,
    title: "Appeals and blocking",
    body: "Appeals go to the Appellate Tribunal within sixty days; it aims to dispose of them within six months and functions digitally. After penalties in two or more instances, the Central Government may — in the public interest and after a hearing — direct blocking of the Fiduciary's platform.",
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

export const metadata: Metadata = {
  title: "DPDP Act Penalties & The Schedule",
  description:
    "The seven penalty heads in the Schedule to the DPDP Act 2023, from ₹10,000 for a Data Principal's duties to ₹250 crore for failing to take reasonable security safeguards.",
  alternates: { canonical: "/penalties" },
};

export default function PenaltiesPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="penalties" />

      <PageHero
        breadcrumb="Penalties & Enforcement"
        eyebrow="Chapters VI–VIII · The Schedule"
        title="Seven Penalty Heads,"
        titleAccent="Up To ₹250 Crore"
        lede="Penalties follow an inquiry, never precede one. The Board weighs gravity, duration, repetition, gain or loss, mitigation and proportionality before fixing an amount — and everything realised goes to the Consolidated Fund of India."
      />

      <section className="bg-[var(--bg-app)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(30px,4vw,44px)] px-[var(--space-5)] py-[clamp(40px,5.4vw,70px)]">
          {/* -------------------------------------------- The Schedule table */}
          <div className="flex flex-col gap-[12px]">
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

          {/* --------------------------------------------- Section 33(2) */}
          <div className="flex flex-col gap-[12px] rounded-lg border border-border bg-[var(--bg-sunken)] p-[clamp(20px,3vw,28px)]">
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

      <SiteFooter />
    </div>
  );
}
