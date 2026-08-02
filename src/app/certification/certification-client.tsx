"use client";

import * as React from "react";
import { BadgeCheck, CalendarClock, Check, Zap } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { Button, LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { removeStored, useStored, writeStored } from "@/lib/browser-store";
import { prettyDate } from "@/lib/credential";
import { routes } from "@/lib/routes";

const GLANCE = [
  { label: "Questions", value: "15, randomised", accent: false },
  { label: "Time limit", value: "20 minutes", accent: false },
  { label: "Pass mark", value: "70% (11 of 15)", accent: true },
  { label: "Format", value: "Single-choice", accent: false },
  { label: "Result", value: "Immediate", accent: false },
];

const BLUEPRINT = [
  { topic: "Definitions and roles", provisions: "§ 2, § 10", weight: "27%" },
  {
    topic: "Notice, consent and legitimate uses",
    provisions: "§§ 4–7",
    weight: "20%",
  },
  {
    topic: "Fiduciary obligations, children, breaches",
    provisions: "§§ 8–9",
    weight: "20%",
  },
  { topic: "Rights, duties and grievances", provisions: "§§ 11–15", weight: "13%" },
  {
    topic: "Scope, transfers and exemptions",
    provisions: "§ 3, §§ 16–17",
    weight: "10%",
  },
  {
    topic: "Board, appeals and penalties",
    provisions: "§§ 18–34, Schedule",
    weight: "10%",
  },
];

const SCHEDULE_NOTES = [
  { icon: CalendarClock, text: "Slots run Monday to Saturday, 09:00–19:00 local time." },
  { icon: BadgeCheck, text: "Reschedule free of charge up to 24 hours before the slot." },
  {
    icon: Zap,
    text: "In a hurry? The instant exam is available right now, no booking.",
  },
];

const HOW_IT_WORKS = [
  {
    n: "01",
    title: "Enter your name",
    body: "It is printed on the certificate exactly as typed, so check the spelling.",
    accent: false,
  },
  {
    n: "02",
    title: "Answer 15 questions",
    body: "Twenty minutes on the clock. Move freely between questions before you submit.",
    accent: false,
  },
  {
    n: "03",
    title: "Score 70% or more",
    body: "Eleven correct out of fifteen. Review every answer with its section reference.",
    accent: false,
  },
  {
    n: "04",
    title: "Certificate issued",
    body: "A credential ID is generated and your certificate opens straight away — print it or save as PDF.",
    accent: true,
  },
];

const SLOTS = ["09:00", "11:00", "14:00", "16:30", "18:30"];
const SLOT_LABELS: Record<string, string> = {
  "09:00": "09:00 – 09:30",
  "11:00": "11:00 – 11:30",
  "14:00": "14:00 – 14:30",
  "16:30": "16:30 – 17:00",
  "18:30": "18:30 – 19:00",
};
const TIMEZONES = [
  "IST (UTC+5:30)",
  "GST (UTC+4)",
  "SGT (UTC+8)",
  "GMT (UTC+0)",
  "EST (UTC−5)",
];

interface Booking {
  ref: string;
  name: string;
  email: string;
  date: string;
  slot: string;
  tz: string;
}

const listItemClass = "text-[14px] text-text-secondary";

export function CertificationClient({ faq }: { faq?: React.ReactNode }) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    date: "",
    slot: "11:00",
    tz: "IST (UTC+5:30)",
  });
  const booking = useStored<Booking>("dpdp.booking");
  const [error, setError] = React.useState("");

  // Honour a `#schedule` deep link from the nav and footer.
  React.useEffect(() => {
    if (window.location.hash === "#schedule") scrollToSchedule();
  }, []);

  function scrollToSchedule() {
    const el = document.getElementById("schedule");
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
  }

  function set(k: keyof typeof form, v: string) {
    setForm((prev) => ({ ...prev, [k]: v }));
    setError("");
  }

  function submit() {
    if (!form.name.trim())
      return setError("Enter the name that should appear on your certificate.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim()))
      return setError("Enter a valid work email address.");
    if (!form.date) return setError("Choose a date for your sitting.");

    const ref = `PRX-${form.date.replace(/-/g, "").slice(2)}-${String(
      Math.floor(1000 + Math.random() * 8999),
    )}`;
    const next: Booking = {
      ref,
      name: form.name.trim(),
      email: form.email.trim(),
      date: form.date,
      slot: form.slot,
      tz: form.tz,
    };
    writeStored("dpdp.booking", next);
    setError("");
  }

  function resetBooking() {
    removeStored("dpdp.booking");
  }

  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="cert" />

      {/* -------------------------------------------------------------- Hero */}
      <section className="border-b border-border bg-[var(--bg-sunken)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center gap-[clamp(24px,4vw,44px)] px-[var(--space-5)] py-[clamp(30px,4.4vw,58px)]">
          <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-[14px]">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary-text">
              Certification Programme
            </span>
            <h1 className="m-0 font-display text-[clamp(29px,4.6vw,44px)] font-semibold leading-[1.15] tracking-[-0.03em] text-text [text-wrap:pretty]">
              Certified DPDP Practitioner,{" "}
              <span className="text-primary-text">Issued Instantly</span>
            </h1>
            <p className="m-0 max-w-[60ch] text-[clamp(15px,1.6vw,17px)] leading-[1.7] text-text-secondary [text-wrap:pretty]">
              One assessment, three ways to sit it. Practise for free, certify
              instantly, or book a proctored slot when your employer needs an
              invigilated result on a fixed date.
            </p>
            <div className="flex flex-wrap gap-[12px] pt-[4px]">
              <LinkButton href={routes.exam} variant="primary" size="lg">
                Start instant exam
              </LinkButton>
              <LinkButton
                href={routes.practiceTest}
                variant="secondary"
                size="lg"
              >
                Free practice test
              </LinkButton>
            </div>
          </div>

          <div className="flex min-w-0 flex-[0_1_320px] flex-col gap-[10px] rounded-lg border border-border bg-surface p-[clamp(18px,2.6vw,24px)] shadow-[var(--shadow-card)]">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
              Exam at a glance
            </span>
            {GLANCE.map((row, i) => (
              <div
                key={row.label}
                className={
                  i < GLANCE.length - 1
                    ? "flex justify-between gap-[12px] border-b border-border py-[9px]"
                    : "flex justify-between gap-[12px] py-[9px]"
                }
              >
                <span className="text-[14px] text-text-secondary">
                  {row.label}
                </span>
                <span
                  className={
                    row.accent
                      ? "font-sans text-[14px] font-semibold text-primary-text"
                      : "font-mono text-[14px] font-semibold text-text tabular-nums"
                  }
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------- Compare + blueprint */}
      <section className="bg-[var(--bg-app)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(28px,3.8vw,42px)] px-[var(--space-5)] py-[clamp(40px,5.4vw,70px)]">
          <div className="flex flex-col gap-[16px]">
            <h2 className="m-0 font-display text-[clamp(23px,3.2vw,32px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              Compare the three paths
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(276px,1fr))] gap-[18px]">
              <Card className="flex h-full flex-col items-start">
                <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
                  Free · unlimited
                </span>
                <span className="mb-[10px] block font-display text-[21px] font-semibold leading-[1.2] text-text">
                  Practice Test
                </span>
                <span className="mb-[16px] block text-[14px] leading-[1.7] text-text-secondary">
                  Ten questions, feedback and the governing provision after each
                  answer. Nothing is recorded and no certificate is issued.
                </span>
                <span className="mb-[20px] flex flex-col gap-[8px]">
                  <span className={listItemClass}>10 questions · no timer</span>
                  <span className={listItemClass}>
                    Explanation after every answer
                  </span>
                  <span className={listItemClass}>
                    Retake as often as you like
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
                    Instant
                  </span>
                  <Badge tone="primary">Most popular</Badge>
                </span>
                <span className="mb-[10px] block font-display text-[21px] font-semibold leading-[1.2] text-text">
                  Instant Certification
                </span>
                <span className="mb-[16px] block text-[14px] leading-[1.7] text-text-secondary">
                  Fifteen randomised questions under a twenty-minute clock. Pass
                  and the certificate is issued in the same session, with a
                  credential ID.
                </span>
                <span className="mb-[20px] flex flex-col gap-[8px]">
                  <span className={listItemClass}>15 questions · 20 minutes</span>
                  <span className={listItemClass}>
                    Answer review with section refs
                  </span>
                  <span className={listItemClass}>
                    Printable certificate, verifiable ID
                  </span>
                </span>
                <LinkButton href={routes.exam} variant="primary" size="lg">
                  Take the exam
                </LinkButton>
              </Card>

              <Card className="flex h-full flex-col items-start">
                <span className="block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
                  Scheduled · invigilated
                </span>
                <span className="my-[10px] block font-display text-[21px] font-semibold leading-[1.2] text-text">
                  Proctored Exam
                </span>
                <span className="mb-[16px] block text-[14px] leading-[1.7] text-text-secondary">
                  Book a supervised sitting on a date that suits your team. Photo
                  ID is checked before the paper unlocks.
                </span>
                <span className="mb-[20px] flex flex-col gap-[8px]">
                  <span className={listItemClass}>
                    Date, slot and timezone of your choice
                  </span>
                  <span className={listItemClass}>
                    Identity verified before start
                  </span>
                  <span className={listItemClass}>
                    Booking reference and joining details
                  </span>
                </span>
                <Button size="lg" variant="secondary" onClick={scrollToSchedule}>
                  Schedule a slot
                </Button>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-[16px]">
            <h2 className="m-0 font-display text-[clamp(23px,3.2vw,32px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              Exam blueprint
            </h2>
            <p className="m-0 max-w-[74ch] text-[15px] leading-[1.7] text-text-secondary">
              Every question is drawn from the Act itself and tagged with the
              provision it tests, so a wrong answer tells you exactly what to
              re-read.
            </p>
            <div className="overflow-hidden rounded-lg border border-border bg-surface">
              <div className="flex flex-wrap gap-[10px] border-b border-border bg-[var(--bg-sunken)] px-[20px] py-[14px]">
                <span className="flex-[1_1_220px] font-mono text-[12px] font-medium uppercase tracking-[0.06em] text-text-muted">
                  Topic
                </span>
                <span className="flex-[0_0_130px] font-mono text-[12px] font-medium uppercase tracking-[0.06em] text-text-muted">
                  Provisions
                </span>
                <span className="flex-[0_0_90px] font-mono text-[12px] font-medium uppercase tracking-[0.06em] text-text-muted">
                  Weight
                </span>
              </div>
              {BLUEPRINT.map((row, i) => (
                <div
                  key={row.topic}
                  className={
                    i < BLUEPRINT.length - 1
                      ? "flex flex-wrap gap-[10px] border-b border-border px-[20px] py-[15px]"
                      : "flex flex-wrap gap-[10px] px-[20px] py-[15px]"
                  }
                >
                  <span className="min-w-0 flex-[1_1_220px] text-[14.5px] text-text-secondary">
                    {row.topic}
                  </span>
                  <span className="flex-[0_0_130px] text-[14px] text-text-muted">
                    {row.provisions}
                  </span>
                  <span className="flex-[0_0_90px] font-mono text-[14px] font-semibold text-text tabular-nums">
                    {row.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Schedule form */}
      <section
        id="schedule"
        className="scroll-mt-[88px] border-y border-border bg-[var(--bg-sunken)]"
      >
        <div className="mx-auto flex w-full max-w-[1180px] flex-wrap gap-[clamp(26px,4vw,48px)] px-[var(--space-5)] py-[clamp(40px,5.4vw,70px)]">
          <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-[14px]">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary-text">
              Proctored sitting
            </span>
            <h2 className="m-0 font-display text-[clamp(23px,3.2vw,32px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
              Schedule your exam
            </h2>
            <p className="m-0 max-w-[46ch] text-[15px] leading-[1.7] text-text-secondary">
              Pick a date and slot. You will receive a booking reference and
              joining details; keep a photo ID handy on the day.
            </p>
            <div className="flex flex-col gap-[10px] pt-[6px]">
              {SCHEDULE_NOTES.map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-start gap-[10px]">
                  <span className="shrink-0 text-primary-text">
                    <Icon size={18} />
                  </span>
                  <span className="text-[14px] leading-[1.7] text-text-secondary">
                    {text}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="min-w-0 flex-[1_1_420px]">
            {booking ? (
              <div className="flex flex-col gap-[14px] rounded-lg border-[1.5px] border-primary bg-surface p-[clamp(22px,3vw,30px)] shadow-[var(--shadow-raised)]">
                <span className="inline-flex size-[48px] items-center justify-center rounded-md bg-primary text-white">
                  <Check size={24} />
                </span>
                <span className="font-display text-[clamp(20px,2.6vw,25px)] font-semibold leading-[1.2] text-text">
                  Your slot is reserved
                </span>
                <span className="text-[14.5px] leading-[1.7] text-text-secondary">
                  {booking.name} · {prettyDate(booking.date)} at {booking.slot}{" "}
                  {booking.tz}
                </span>
                <div className="flex flex-wrap gap-[10px]">
                  <span className="inline-flex items-center rounded-full bg-primary-tint px-[13px] py-[7px] font-mono text-[12.5px] font-semibold text-primary-text tabular-nums">
                    Booking {booking.ref}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-surface-raised px-[13px] py-[7px] font-sans text-[12.5px] font-semibold text-text-secondary">
                    Photo ID required
                  </span>
                </div>
                <span className="text-[13px] leading-[1.6] text-text-muted">
                  Joining details go to {booking.email}. Reschedule up to 24
                  hours before the slot.
                </span>
                <div className="flex flex-wrap gap-[12px] pt-[4px]">
                  <Button size="lg" variant="secondary" onClick={resetBooking}>
                    Book another slot
                  </Button>
                  <LinkButton
                    href={routes.practiceTest}
                    variant="primary"
                    size="lg"
                  >
                    Practise until then
                  </LinkButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-[16px] rounded-lg border border-border bg-surface p-[clamp(22px,3vw,30px)] shadow-[var(--shadow-card)]">
                <span className="font-display text-[19px] font-semibold leading-[1.25] text-text">
                  Booking details
                </span>

                <label className="flex flex-col gap-[6px]">
                  <span className="font-sans text-[13px] font-semibold text-text">
                    Full name (as it should appear on the certificate)
                  </span>
                  <Input
                    size="lg"
                    placeholder="Ananya Sharma"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </label>

                <label className="flex flex-col gap-[6px]">
                  <span className="font-sans text-[13px] font-semibold text-text">
                    Work email
                  </span>
                  <Input
                    size="lg"
                    type="email"
                    placeholder="you@company.in"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </label>

                <div className="flex flex-wrap gap-[14px]">
                  <label className="flex flex-col gap-[6px]">
                    <span className="font-sans text-[13px] font-semibold text-text">
                      Date
                    </span>
                    <Input
                      size="lg"
                      type="date"
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                    />
                  </label>
                  <label className="flex min-w-0 flex-[1_1_180px] flex-col gap-[6px]">
                    <span className="font-sans text-[13px] font-semibold text-text">
                      Slot
                    </span>
                    <select
                      className="field-select"
                      value={form.slot}
                      onChange={(e) => set("slot", e.target.value)}
                    >
                      {SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {SLOT_LABELS[slot]}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="flex flex-col gap-[6px]">
                  <span className="font-sans text-[13px] font-semibold text-text">
                    Timezone
                  </span>
                  <select
                    className="field-select"
                    value={form.tz}
                    onChange={(e) => set("tz", e.target.value)}
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </label>

                {error && (
                  <span className="text-[13px] leading-[1.6] text-primary-text">
                    {error}
                  </span>
                )}

                <div className="flex flex-wrap gap-[12px] pt-[2px]">
                  <Button variant="primary" size="lg" onClick={submit}>
                    Confirm booking
                  </Button>
                  <LinkButton href={routes.exam} size="lg" variant="ghost">
                    Or sit it now
                  </LinkButton>
                </div>

                <span className="text-[12.5px] leading-[1.6] text-text-muted">
                  Bookings are stored in this browser for the demo — no data
                  leaves your device.
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- How it works */}
      <section className="bg-[var(--bg-app)]">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[20px] px-[var(--space-5)] py-[clamp(40px,5.4vw,66px)]">
          <h2 className="m-0 font-display text-[clamp(23px,3.2vw,32px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
            How instant certification works
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[18px]">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.n}
                className={
                  step.accent
                    ? "flex flex-col gap-[10px] rounded-lg border-[1.5px] border-primary bg-surface p-[22px]"
                    : "flex flex-col gap-[10px] rounded-lg border border-border bg-surface p-[22px]"
                }
              >
                <span className="font-display text-[26px] font-semibold leading-none text-primary-text">
                  {step.n}
                </span>
                <span className="font-sans text-[15.5px] font-semibold text-text">
                  {step.title}
                </span>
                <span className="text-[14px] leading-[1.7] text-text-secondary">
                  {step.body}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-[12px] pt-[6px]">
            <LinkButton href={routes.exam} variant="primary" size="lg">
              Start the exam
            </LinkButton>
            <LinkButton href={routes.certificate} variant="secondary" size="lg">
              See a sample certificate
            </LinkButton>
          </div>
        </div>
      </section>

      {faq}

      <SiteFooter />
    </div>
  );
}
