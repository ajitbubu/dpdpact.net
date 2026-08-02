import type { Metadata } from "next";
import {
  BookOpen,
  CalendarClock,
  Compass,
  Gavel,
  GitBranch,
  ListChecks,
  Scale,
  ShieldCheck,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { CertificateSeal } from "@/components/certificate-seal";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { routes } from "@/lib/routes";

const STUDY_PATH = [
  {
    href: routes.overview,
    icon: Compass,
    range: "Chapter I · §§ 1–3",
    title: "Overview & Scope",
    body: "What the Act governs, where it reaches beyond India, and the two situations it leaves alone.",
    accent: false,
  },
  {
    href: routes.roles,
    icon: Users,
    range: "§ 2 · § 10 · §§ 18–26",
    title: "Key Roles",
    body: "Data Principal, Data Fiduciary, Processor, Consent Manager, Significant Data Fiduciary, the Board.",
    accent: false,
  },
  {
    href: routes.rights,
    icon: UserCheck,
    range: "Chapter III · §§ 11–15",
    title: "Rights & Duties",
    body: "Four rights of the individual, five duties that come with them, and the order of escalation.",
    accent: false,
  },
  {
    href: routes.obligations,
    icon: GitBranch,
    range: "Chapter II · §§ 4–10",
    title: "Obligations",
    body: "Notice, consent, safeguards, breach reporting, erasure — the compliance lifecycle in order.",
    accent: false,
  },
  {
    href: routes.penalties,
    icon: Gavel,
    range: "Chapters VI–VIII · Schedule",
    title: "Penalties & Enforcement",
    body: "How the Board inquires, what it can order, and the seven penalty heads up to ₹250 crore.",
    accent: false,
  },
  {
    href: routes.reader,
    icon: BookOpen,
    range: "All 44 sections",
    title: "Full Text Reader",
    body: "The verbatim Act with search, illustrations, section-by-section stepping and reading progress.",
    accent: true,
  },
] as const;

const PROMISES = [
  { icon: Scale, label: "Official Gazette text, verbatim" },
  { icon: ListChecks, label: "Every answer cites its section" },
  { icon: Zap, label: "Instant certification, no waiting" },
  { icon: CalendarClock, label: "Or schedule a proctored slot" },
] as const;

export const metadata: Metadata = {
  title: "DPDP Academy — Learn the DPDP Act 2023, Certify Free",
  description:
    "Study India's Digital Personal Data Protection Act, 2023 — 9 chapters, 44 sections and the Schedule of penalties — then sit a free graded exam and get a certificate instantly.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="home" />

      {/* ------------------------------------------------------------- Hero */}
      <section className="bg-[var(--bg-app)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center gap-[clamp(28px,5vw,56px)] px-[var(--space-5)] pb-[clamp(40px,6vw,80px)] pt-[clamp(36px,6vw,72px)]">
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-[clamp(16px,2.2vw,22px)]">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary-text">
              India · Act No. 22 of 2023 · DPDP
            </span>
            <h1 className="m-0 font-display text-[clamp(32px,5.4vw,52px)] font-semibold leading-[1.12] tracking-[-0.03em] text-text [text-wrap:pretty]">
              Learn the DPDP Act,{" "}
              <span className="text-primary-text">Certify It Today</span>
            </h1>
            <p className="m-0 max-w-[56ch] text-[clamp(15px,1.6vw,17px)] leading-[1.7] text-text-secondary [text-wrap:pretty]">
              Nine chapters, forty-four sections, one Schedule of penalties —
              broken into study pages you can finish in an afternoon. Then sit a
              graded exam and walk away with a certificate the same minute.
            </p>
            <div className="flex flex-wrap gap-[12px] pt-[4px]">
              <LinkButton href={routes.exam} variant="primary" size="lg">
                Get Certified
              </LinkButton>
              <LinkButton
                href={routes.practiceTest}
                variant="secondary"
                size="lg"
              >
                Free Practice Test
              </LinkButton>
            </div>
            <span className="text-[13px] text-text-muted">
              15 questions · 20 minutes · instant result. No credit card.
            </span>
            <div className="mt-[clamp(8px,1.6vw,14px)] grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[12px]">
              <StatCard label="Sections covered" value="44" tone="info" />
              <StatCard label="Question bank" value="30" tone="neutral" />
              <StatCard label="Pass mark" value="70" unit="%" tone="safe" />
            </div>
          </div>

          <div className="flex min-w-0 flex-[1_1_320px] justify-center">
            <div className="relative w-full max-w-[460px]">
              <div className="relative overflow-hidden border border-border bg-[#FBFAF6] p-[10px] shadow-[var(--shadow-raised)]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:repeating-radial-gradient(circle_at_50%_50%,transparent_0_15px,var(--color-primary-text)_15px_16px),repeating-linear-gradient(58deg,transparent_0_16px,var(--color-text)_16px_17px)] [background-size:210px_210px,auto]"
                />
                <div className="relative border-[9px] border-primary-text p-[5px]">
                  <div className="relative flex flex-col items-center gap-[13px] border-[1.5px] border-text px-[20px] py-[26px] text-center">
                    <span
                      aria-hidden="true"
                      className="absolute left-[8px] top-[8px] size-[10px] rotate-45 bg-primary-text"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute right-[8px] top-[8px] size-[10px] rotate-45 bg-primary-text"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-[8px] left-[8px] size-[10px] rotate-45 bg-primary-text"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-[8px] right-[8px] size-[10px] rotate-45 bg-primary-text"
                    />

                    <span className="font-display text-[14px] font-semibold leading-none text-text">
                      Certificate of
                    </span>
                    <span className="font-display text-[clamp(24px,3.4vw,32px)] font-bold leading-[1.06] tracking-[-0.03em] text-text [text-wrap:balance]">
                      Professional Achievement
                    </span>

                    <span className="flex w-full max-w-[250px] items-center gap-[10px]">
                      <span className="h-px flex-1 bg-text opacity-[0.35]" />
                      <span
                        aria-hidden="true"
                        className="size-[7px] shrink-0 rotate-45 bg-primary-text"
                      />
                      <span className="h-px flex-1 bg-text opacity-[0.35]" />
                    </span>

                    <span className="font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-text-secondary">
                      Awarded to
                    </span>
                    <span className="block w-full max-w-[300px] border-b-2 border-text pb-[8px] font-script text-[clamp(30px,4.2vw,40px)] font-normal leading-[1.25] text-text">
                      Your Name Here
                    </span>

                    <span className="max-w-[34ch] text-[12px] leading-[1.7] text-text-secondary [text-wrap:pretty]">
                      for a working command of the Digital Personal Data
                      Protection Act, 2023 — nine chapters and the Schedule of
                      penalties.
                    </span>

                    <div className="flex w-full items-end justify-between gap-[14px] pt-[2px]">
                      <span className="flex min-w-0 flex-[1_1_0] flex-col items-start gap-[4px]">
                        <span className="font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-text-secondary">
                          Issued
                        </span>
                        <span className="whitespace-nowrap font-display text-[14px] font-semibold text-text">
                          Today
                        </span>
                        <span className="h-px w-full max-w-[110px] bg-text opacity-[0.45]" />
                      </span>

                      <CertificateSeal size={78} iconSize={24} labelSize={8} />

                      <span className="flex min-w-0 flex-[1_1_0] flex-col items-end gap-[4px]">
                        <span className="whitespace-nowrap font-script text-[20px] font-normal leading-[1.1] text-text">
                          R. Iyer
                        </span>
                        <span className="h-px w-full max-w-[110px] bg-text opacity-[0.45]" />
                        <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
                          Director
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[-18px] left-[-14px] flex items-center gap-[10px] rounded-md border border-border bg-surface px-[16px] py-[12px] shadow-[var(--shadow-raised)]">
                <span className="inline-flex size-[34px] items-center justify-center rounded-sm bg-primary-tint text-primary-text">
                  <ShieldCheck size={20} />
                </span>
                <span className="flex flex-col gap-px">
                  <span className="font-sans text-[12.5px] font-semibold text-text">
                    Graded instantly
                  </span>
                  <span className="text-[12px] text-text-muted">
                    Result in one click
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Promise strip */}
      <section className="border-y border-border bg-[var(--bg-sunken)]">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[16px] px-[var(--space-5)] py-[clamp(20px,3vw,26px)]">
          {PROMISES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-start gap-[10px]">
              <span className="shrink-0 text-primary-text">
                <Icon size={18} />
              </span>
              <span className="text-[14px] leading-[1.6] text-text-secondary">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- Study path */}
      <section className="bg-[var(--bg-app)]">
        <div className="mx-auto w-full max-w-[1180px] px-[var(--space-5)] py-[clamp(44px,6vw,78px)]">
          <div className="flex max-w-[66ch] flex-col gap-[12px]">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary-text">
              Study Path
            </span>
            <h2 className="m-0 font-display text-[clamp(25px,3.6vw,38px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text [text-wrap:pretty]">
              Six pages. The whole Act.
            </h2>
            <p className="m-0 text-[clamp(14.5px,1.5vw,16.5px)] leading-[1.7] text-text-secondary">
              Each page holds one theme of the law with the exact provisions
              behind it — read in order, or jump to what you are being audited
              on.
            </p>
          </div>

          <div className="mt-[clamp(24px,3.4vw,38px)] grid grid-cols-[repeat(auto-fit,minmax(272px,1fr))] gap-[18px]">
            {STUDY_PATH.map(({ icon: Icon, ...item }) => (
              <Link
                key={item.href}
                href={item.href}
                className="block no-underline"
              >
                <Card className="block h-full">
                  <span
                    className={
                      item.accent
                        ? "mb-[16px] inline-flex size-[48px] items-center justify-center rounded-md bg-primary text-white"
                        : "mb-[16px] inline-flex size-[48px] items-center justify-center rounded-md bg-primary-tint text-primary-text"
                    }
                  >
                    <Icon size={22} />
                  </span>
                  <span
                    className={
                      item.accent
                        ? "mb-[8px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text"
                        : "mb-[8px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted"
                    }
                  >
                    {item.range}
                  </span>
                  <span className="mb-[8px] block font-display text-[19px] font-semibold leading-[1.25] text-text">
                    {item.title}
                  </span>
                  <span className="block text-[14px] leading-[1.7] text-text-secondary">
                    {item.body}
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Exam at a glance */}
      <section className="border-y border-border bg-[var(--bg-sunken)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[20px] px-[var(--space-5)] py-[clamp(34px,4.6vw,52px)]">
          <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-text-muted">
            Certification exam · at a glance
          </span>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[14px]">
            <StatCard label="Questions per exam" value="15" tone="info" />
            <StatCard label="Time limit" value="20" unit="min" tone="neutral" />
            <StatCard label="Pass mark" value="70" unit="%" tone="safe" />
            <StatCard
              label="Wait for the result"
              value="0"
              unit="sec"
              tone="safe"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Three paths */}
      <section className="bg-[var(--bg-app)]">
        <div className="mx-auto w-full max-w-[1180px] px-[var(--space-5)] py-[clamp(44px,6vw,78px)]">
          <div className="mb-[clamp(24px,3.4vw,36px)] flex flex-wrap items-end justify-between gap-[18px]">
            <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-[12px]">
              <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary-text">
                Certification
              </span>
              <h2 className="m-0 font-display text-[clamp(25px,3.6vw,38px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                Three ways to prove it
              </h2>
            </div>
            <div className="flex shrink-0">
              <LinkButton
                href={routes.certification}
                size="lg"
                variant="secondary"
              >
                Compare all paths
              </LinkButton>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[18px]">
            <Card className="flex h-full flex-col items-start">
              <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
                Step 1 · Free
              </span>
              <span className="mb-[10px] block font-display text-[21px] font-semibold leading-[1.2] text-text">
                Practice Test
              </span>
              <span className="mb-[18px] block text-[14px] leading-[1.7] text-text-secondary">
                Ten questions, answer-by-answer feedback with the provision that
                governs it. Unlimited attempts, nothing recorded.
              </span>
              <span className="mb-[20px] flex flex-col gap-[8px]">
                <span className="text-[14px] text-text-secondary">
                  · Instant explanation per answer
                </span>
                <span className="text-[14px] text-text-secondary">
                  · No time limit
                </span>
                <span className="text-[14px] text-text-secondary">
                  · Section references throughout
                </span>
              </span>
              <LinkButton
                href={routes.practiceTest}
                size="lg"
                variant="secondary"
              >
                Start practising
              </LinkButton>
            </Card>

            <Card className="flex h-full flex-col items-start shadow-[var(--shadow-raised)]">
              <span className="mb-[10px] flex items-center gap-[10px]">
                <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  Step 2 · Instant
                </span>
                <Badge tone="primary">Most popular</Badge>
              </span>
              <span className="mb-[10px] block font-display text-[21px] font-semibold leading-[1.2] text-text">
                Instant Certification
              </span>
              <span className="mb-[18px] block text-[14px] leading-[1.7] text-text-secondary">
                Fifteen questions drawn at random, twenty minutes on the clock.
                Score 70% or more and your certificate is issued on the spot.
              </span>
              <span className="mb-[20px] flex flex-col gap-[8px]">
                <span className="text-[14px] text-text-secondary">
                  · Certificate issued immediately
                </span>
                <span className="text-[14px] text-text-secondary">
                  · Credential ID and verification line
                </span>
                <span className="text-[14px] text-text-secondary">
                  · Retake whenever you like
                </span>
              </span>
              <LinkButton href={routes.exam} variant="secondary" size="lg">
                Take the exam
              </LinkButton>
            </Card>

            <Card className="flex h-full flex-col items-start">
              <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
                Step 3 · Scheduled
              </span>
              <span className="mb-[10px] block font-display text-[21px] font-semibold leading-[1.2] text-text">
                Proctored Exam
              </span>
              <span className="mb-[18px] block text-[14px] leading-[1.7] text-text-secondary">
                Book a supervised slot when your employer needs an invigilated
                result on a fixed date.
              </span>
              <span className="mb-[20px] flex flex-col gap-[8px]">
                <span className="text-[14px] text-text-secondary">
                  · Choose date, slot and timezone
                </span>
                <span className="text-[14px] text-text-secondary">
                  · Photo ID check before start
                </span>
                <span className="text-[14px] text-text-secondary">
                  · Confirmation with joining details
                </span>
              </span>
              <LinkButton href={routes.schedule} size="lg" variant="secondary">
                Schedule a slot
              </LinkButton>
            </Card>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
