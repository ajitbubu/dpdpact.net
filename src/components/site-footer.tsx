import * as React from "react";
import Link from "next/link";

import { routes } from "@/lib/routes";

const ACT_LINKS = [
  { href: routes.overview, label: "Overview & scope" },
  { href: routes.roles, label: "Key roles" },
  { href: routes.rights, label: "Rights & duties" },
  { href: routes.obligations, label: "Obligations" },
  { href: routes.penalties, label: "Penalties & the Board" },
  { href: routes.rules, label: "DPDP Rules 2025" },
  { href: routes.reader, label: "Full text reader" },
  { href: routes.blog, label: "DPDP blog" },
];

const CERT_LINKS = [
  { href: routes.checklist, label: "Compliance checklist" },
  { href: routes.certification, label: "Programme overview" },
  { href: routes.practiceTest, label: "Free practice test" },
  { href: routes.exam, label: "Instant certification exam" },
  { href: routes.schedule, label: "Schedule a proctored exam" },
  { href: routes.certificate, label: "My certificate" },
];

const columnLinkClass =
  "text-[14px] text-text-secondary no-underline hover:text-primary-text";

const columnHeadingClass =
  "font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[var(--bg-sunken)] font-sans text-text">
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-[repeat(auto-fit,minmax(212px,1fr))] gap-[var(--space-7)] px-[var(--space-5)] pb-[var(--space-6)] pt-[var(--space-8)]">
        <div className="flex flex-col gap-[12px]">
          <span className="font-display text-[18px] font-semibold leading-none tracking-[-0.02em] text-text">
            DPDP<span className="text-primary-text">Academy</span>
          </span>
          <p className="max-w-[34ch] text-[14px] leading-[1.7] text-text-secondary">
            Study the Digital Personal Data Protection Act, 2023 section by
            section — then prove it with a graded certification.
          </p>
          <div className="flex flex-wrap gap-[8px]">
            <span className="inline-block rounded-full bg-primary-tint px-[11px] py-[5px] font-sans text-[12px] font-semibold text-primary-text">
              Act No. 22 of 2023
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-[11px]">
          <span className={columnHeadingClass}>The Act</span>
          {ACT_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={columnLinkClass}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-[11px]">
          <span className={columnHeadingClass}>Certification</span>
          {CERT_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={columnLinkClass}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-[11px]">
          <span className={columnHeadingClass}>Source</span>
          <span className="text-[14px] leading-[1.7] text-text-secondary">
            The Gazette of India, Extraordinary, Part II — Section 1, No. 25, 11
            August 2023.
          </span>
          <span className="text-[14px] leading-[1.7] text-text-secondary">
            Ministry of Law and Justice, Legislative Department.
          </span>
          <Link href={routes.editorialPolicy} className={columnLinkClass}>
            Editorial policy & corrections
          </Link>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-[12px] border-t border-border px-[var(--space-5)] pb-[var(--space-6)] pt-[16px]">
        <span className="text-[12px] leading-[1.6] text-text-muted">
          Statutory text reproduced for study. Certification is an educational
          assessment, not legal advice or a government credential.
        </span>
        <span className="text-[12px] leading-[1.6] text-text-muted">
          9 Chapters · 44 Sections · 1 Schedule
        </span>
      </div>
    </footer>
  );
}
