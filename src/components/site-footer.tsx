import * as React from "react";
import Link from "next/link";

import { INDUSTRY_MENU, INDUSTRY_SLUGS, industryPath } from "@/lib/industries-menu";
import { routes } from "@/lib/routes";

const ACT_LINKS = [
  // Home, described by what it is rather than "Home". Anchor text is the only
  // thing an internal link tells a crawler about its target, and "Home" says
  // nothing; this appears on every page on the site.
  { href: routes.home, label: "DPDP Act 2023" },
  { href: routes.overview, label: "Overview & scope" },
  { href: routes.roles, label: "Key roles" },
  { href: routes.rights, label: "Rights & duties" },
  { href: routes.obligations, label: "Obligations" },
  { href: routes.penalties, label: "Penalties & the Board" },
  { href: routes.rules, label: "DPDP Rules 2025" },
  { href: routes.deadline, label: "DPDP compliance deadline" },
  { href: routes.spdi, label: "SPDI Rules vs DPDP" },
  { href: routes.gdpr, label: "DPDP vs GDPR" },
  { href: routes.consentManager, label: "Consent Managers" },
  { href: routes.sdf, label: "Significant Data Fiduciary" },
  { href: routes.reader, label: "Full text reader" },
  { href: routes.blog, label: "DPDP blog" },
];

const CERT_LINKS = [
  { href: routes.checklist, label: "Compliance checklist" },
  { href: routes.templates, label: "Compliance templates" },
  { href: routes.applicability, label: "Does DPDP apply to you?" },
  { href: routes.penaltyCalculator, label: "Penalty calculator" },
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
          {/*
           * A link, not a bare wordmark. The header logo was the only route
           * back to the homepage, and a logo is weak as an internal link: the
           * anchor text is what tells a crawler what the target is about.
           */}
          <Link
            href={routes.home}
            className="font-display text-[18px] font-semibold leading-none tracking-[-0.02em] text-text transition-colors hover:text-primary-text"
          >
            DPDP<span className="text-primary-text">Academy</span>
          </Link>
          <p className="max-w-[34ch] text-[14px] leading-[1.7] text-text-secondary">
            Study the Digital Personal Data Protection Act, 2023 section by
            section - then prove it with a graded certification.
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

        {/*
         * The Implementation mega menu renders only when open, so it gives a
         * crawler nothing. This column is where the industry pages actually
         * earn their site-wide internal links - the same job the other columns
         * already do for the study pages.
         */}
        <div className="flex flex-col gap-[11px]">
          <span className={columnHeadingClass}>By industry</span>
          {INDUSTRY_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={industryPath(slug)}
              className={columnLinkClass}
            >
              {INDUSTRY_MENU[slug].name}
            </Link>
          ))}
          <Link href={routes.implementation} className={columnLinkClass}>
            All implementation guides
          </Link>
        </div>

        <div className="flex flex-col gap-[11px]">
          <span className={columnHeadingClass}>Source</span>
          <span className="text-[14px] leading-[1.7] text-text-secondary">
            The Gazette of India, Extraordinary, Part II - Section 1, No. 25, 11
            August 2023.
          </span>
          <span className="text-[14px] leading-[1.7] text-text-secondary">
            Ministry of Law and Justice, Legislative Department.
          </span>
          <Link href={routes.sources} className={columnLinkClass}>
            Official source register
          </Link>
          <Link href={routes.editorialPolicy} className={columnLinkClass}>
            Editorial policy & corrections
          </Link>
          <Link href={routes.about} className={columnLinkClass}>
            About DPDP Academy
          </Link>
          <Link href={routes.contact} className={columnLinkClass}>
            Contact & corrections
          </Link>
          <Link href={routes.privacy} className={columnLinkClass}>
            Privacy policy
          </Link>
          <Link href={routes.cookies} className={columnLinkClass}>
            Cookie policy
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
