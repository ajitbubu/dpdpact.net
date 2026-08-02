"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, CalendarClock, ListChecks } from "lucide-react";

import { CertificateSeal } from "@/components/certificate-seal";
import { Button, LinkButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsClient, useStored, writeStored } from "@/lib/browser-store";
import { prettyDate, type Credential } from "@/lib/credential";
import { routes } from "@/lib/routes";

const KEEP_GOING = [
  {
    href: routes.schedule,
    icon: CalendarClock,
    label: "Book a proctored sitting for your team",
  },
  {
    href: routes.reader,
    icon: BookOpen,
    label: "Re-read the Act, section by section",
  },
  {
    href: routes.practiceTest,
    icon: ListChecks,
    label: "Keep the practice test running weekly",
  },
];

/**
 * CertificateBody — the certificate page's content: heading and print actions,
 * the sample notice, the printed sheet itself, and the two panels below it.
 *
 * Shared by `/certificate` (inside the site chrome) and
 * `/certificate/standalone` (chrome-free, for printing and embedding), which
 * is exactly how the two source files differ.
 */
export function CertificateBody() {
  const cred = useStored<Credential>("dpdp.credential");
  const isClient = useIsClient();
  /**
   * `null` means "not edited on this page"; `""` means "deliberately cleared".
   * Collapsing the two would make the field impossible to empty, because the
   * stored name would flow straight back into it on the next render.
   */
  const [nameOverride, setNameOverride] = React.useState<string | null>(null);

  const today = isClient ? new Date().toISOString().slice(0, 10) : "";
  const sample = !cred;
  const holder = nameOverride?.trim() || cred?.name || "Ananya Sharma";
  const score = cred ? `${cred.pct}%` : "92%";
  const resultLine = cred
    ? `${cred.correct} of ${cred.total} correct · Pass`
    : "14 of 15 correct · Pass";
  const credId = cred ? cred.id : "DPDP-2026-0001";
  const issued = prettyDate(cred ? cred.date : today);

  function onNameChange(value: string) {
    setNameOverride(value);
    // Only persist a real name. Clearing the field to retype is normal
    // editing, but writing "" through would overwrite the issued credential
    // irrecoverably and drop `holder` to the sample name — so an emptied field
    // is treated as in-progress: the sheet shows the placeholder while the
    // stored credential keeps its name. /exam applies the same non-empty rule
    // at issue time.
    if (cred && value.trim()) {
      writeStored("dpdp.credential", { ...cred, name: value });
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-[clamp(16px,2.4vw,22px)] px-[var(--space-5)] pb-[clamp(36px,5vw,64px)] pt-[clamp(22px,3.4vw,40px)]">
      <div className="no-print flex flex-wrap items-end justify-between gap-[16px]">
        <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-[8px]">
          <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary-text">
            {sample ? "Sample credential" : "Issued credential"}
          </span>
          <h1 className="m-0 font-display text-[clamp(23px,3.4vw,32px)] font-semibold leading-[1.18] tracking-[-0.028em] text-text">
            Your Certificate
          </h1>
        </div>
        <div className="flex shrink-0 flex-wrap gap-[10px]">
          <Button variant="primary" size="lg" onClick={() => window.print()}>
            Print / Save as PDF
          </Button>
          <LinkButton href={routes.exam} size="lg" variant="secondary">
            {sample ? "Take the exam" : "Retake the exam"}
          </LinkButton>
        </div>
      </div>

      {sample && (
        <div className="no-print flex flex-wrap items-center gap-[14px] rounded-md border-[1.5px] border-primary bg-surface px-[18px] py-[16px]">
          <span className="min-w-0 flex-[1_1_280px] text-[14px] leading-[1.7] text-text-secondary">
            <strong className="text-text">This is a sample.</strong> Pass the
            15-question certification exam and your own certificate — with a real
            credential ID — is issued instantly.
          </span>
          <span className="flex shrink-0">
            <LinkButton href={routes.exam} variant="primary" size="sm">
              Take the exam
            </LinkButton>
          </span>
        </div>
      )}

      {/* ------------------------------------------------ The printed sheet */}
      <div className="cert-sheet relative overflow-hidden border border-border bg-[#FBFAF6] p-[clamp(10px,1.4vw,16px)] shadow-[var(--shadow-raised)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:repeating-radial-gradient(circle_at_50%_50%,transparent_0_15px,var(--color-primary-text)_15px_16px),repeating-linear-gradient(58deg,transparent_0_16px,var(--color-text)_16px_17px)] [background-size:210px_210px,auto]"
        />

        <div className="cert-sheet-frame relative border-[clamp(8px,1.1vw,13px)] border-primary-text p-[clamp(4px,.6vw,7px)]">
          <div className="relative flex flex-col items-center gap-[clamp(13px,1.9vw,20px)] border-[1.5px] border-text px-[clamp(20px,4.4vw,58px)] py-[clamp(26px,4.4vw,54px)] text-center">
            <span
              aria-hidden="true"
              className="absolute left-[10px] top-[10px] size-[13px] rotate-45 bg-primary-text"
            />
            <span
              aria-hidden="true"
              className="absolute right-[10px] top-[10px] size-[13px] rotate-45 bg-primary-text"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[10px] left-[10px] size-[13px] rotate-45 bg-primary-text"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[10px] right-[10px] size-[13px] rotate-45 bg-primary-text"
            />

            <span className="font-display text-[clamp(15px,2vw,22px)] font-semibold leading-none tracking-[0.02em] text-text">
              DPDP Academy
            </span>
            <h2 className="m-0 w-full font-display text-[clamp(30px,5.6vw,62px)] font-bold leading-[1.04] tracking-[-0.03em] text-text [text-wrap:balance]">
              DPDP Certified
            </h2>

            <span className="flex w-full max-w-[520px] items-center gap-[12px]">
              <span className="h-px flex-1 bg-text opacity-[0.35]" />
              <span
                aria-hidden="true"
                className="size-[9px] shrink-0 rotate-45 bg-primary-text"
              />
              <span className="h-px flex-1 bg-text opacity-[0.35]" />
            </span>

            <span className="font-mono text-[clamp(11px,1.3vw,13px)] font-medium uppercase tracking-[0.16em] text-text-secondary">
              In recognition of a working command of the
            </span>
            <span className="max-w-[26ch] font-display text-[clamp(17px,2.5vw,26px)] font-semibold leading-[1.25] tracking-[-0.02em] text-text [text-wrap:balance]">
              Digital Personal Data Protection Act, 2023
            </span>

            <span className="pt-[clamp(4px,1vw,10px)] font-mono text-[clamp(11px,1.3vw,13px)] font-medium uppercase tracking-[0.16em] text-text-secondary">
              This certificate is hereby awarded to
            </span>
            <span className="block w-full max-w-[660px] border-b-2 border-text pb-[clamp(6px,1.2vw,12px)] font-script text-[clamp(32px,6.4vw,64px)] font-normal leading-[1.25] text-text [text-wrap:balance]">
              {holder}
            </span>

            <p className="m-0 max-w-[64ch] text-[clamp(12.5px,1.5vw,15.5px)] leading-[1.8] text-text-secondary [text-wrap:pretty]">
              who sat and passed the DPDP Academy certification examination —
              nine chapters, forty-four sections and the Schedule of penalties —
              with a score of{" "}
              <strong className="font-mono font-medium text-primary-text tabular-nums">
                {score}
              </strong>
              .
            </p>

            <div className="flex w-full flex-wrap items-end justify-between gap-[clamp(18px,3vw,34px)] pt-[clamp(8px,1.8vw,18px)]">
              <span className="flex min-w-0 flex-[1_1_170px] flex-col items-start gap-[5px]">
                <span className="font-mono text-[clamp(10px,1.2vw,12px)] font-medium uppercase tracking-[0.16em] text-text-secondary">
                  On this day of
                </span>
                <span className="whitespace-nowrap font-display text-[clamp(14px,1.9vw,19px)] font-semibold text-text">
                  {issued}
                </span>
                <span className="h-px w-full max-w-[190px] bg-text opacity-[0.45]" />
                <span className="font-mono text-[clamp(10px,1.2vw,12px)] font-medium uppercase tracking-[0.12em] text-text-muted">
                  {resultLine}
                </span>
              </span>

              <CertificateSeal
                sizeClassName="size-[clamp(84px,11vw,116px)]"
                insetClassName="inset-[7px]"
              />

              <span className="flex min-w-0 flex-[1_1_170px] flex-col items-end gap-[5px]">
                <span className="font-mono text-[clamp(10px,1.2vw,12px)] font-medium uppercase tracking-[0.16em] text-text-secondary">
                  Issued by
                </span>
                <span className="whitespace-nowrap font-script text-[clamp(20px,2.8vw,30px)] font-normal leading-[1.1] text-text">
                  R. Iyer
                </span>
                <span className="h-px w-full max-w-[190px] bg-text opacity-[0.45]" />
                <span className="font-mono text-[clamp(10px,1.2vw,12px)] font-medium uppercase tracking-[0.12em] text-text-muted">
                  Programme Director
                </span>
              </span>
            </div>

            <span className="flex w-full flex-wrap justify-center gap-x-[18px] gap-y-[6px] pt-[clamp(4px,1vw,10px)] font-mono text-[clamp(10px,1.2vw,12px)] font-medium uppercase tracking-[0.1em] text-text-muted tabular-nums">
              <span>Credential {credId}</span>
              <span>Examination DPDP-CP · 15 items</span>
            </span>

            <span className="max-w-[80ch] text-[clamp(9.5px,1.1vw,11px)] leading-[1.7] text-text-muted">
              Verify this credential with the ID above. Awarded for an
              educational assessment of the Digital Personal Data Protection Act,
              2023 (Act No. 22 of 2023); it is not a government-issued
              qualification or legal advice.
            </span>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------- Below the fold */}
      <div className="no-print flex flex-wrap gap-[18px]">
        <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-[14px] rounded-lg border border-border bg-surface p-[clamp(18px,2.6vw,24px)]">
          <span className="font-sans text-[17px] font-semibold text-text">
            Name on the certificate
          </span>
          <label className="flex flex-col gap-[6px]">
            <span className="font-sans text-[13px] font-semibold text-text">
              Full name
            </span>
            <Input
              size="lg"
              placeholder="Ananya Sharma"
              value={nameOverride ?? cred?.name ?? ""}
              onChange={(e) => onNameChange(e.target.value)}
            />
            <span className="font-sans text-[12px] text-text-muted">
              Updates the certificate above instantly.
            </span>
          </label>
          <span className="text-[12.5px] leading-[1.7] text-text-muted">
            Stored in this browser only. Printing uses A4 landscape — choose
            &quot;Save as PDF&quot; in the print dialog for a shareable file.
          </span>
        </div>

        <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-[12px] rounded-lg border border-border bg-surface p-[clamp(18px,2.6vw,24px)]">
          <span className="font-sans text-[17px] font-semibold text-text">
            Keep going
          </span>
          {KEEP_GOING.map(({ icon: Icon, ...item }) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-[10px] text-[14.5px] text-text-secondary no-underline"
            >
              <span className="text-primary-text">
                <Icon size={18} />
              </span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
