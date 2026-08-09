import * as React from "react";
import Link from "next/link";

import { breadcrumbSchema } from "@/lib/breadcrumbs";
import { routes } from "@/lib/routes";

/**
 * PageHero — the masthead the five study pages share: breadcrumb, provision
 * eyebrow, a two-tone headline and a lede. `children` renders under the lede
 * (Overview uses it for its badge row).
 *
 * Pass `path` to emit the matching `BreadcrumbList`. Keeping the markup here
 * rather than in each page is what stops it drifting from the trail the
 * reader actually sees above the headline.
 */
export function PageHero({
  breadcrumb,
  path,
  eyebrow,
  title,
  titleAccent,
  lede,
  children,
}: {
  breadcrumb: string;
  /** Canonical path, used for the `BreadcrumbList`. Required so a page cannot
   * render the visual trail while silently emitting no schema. */
  path: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-border bg-[var(--bg-sunken)]">
      {path ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              breadcrumbSchema([{ name: breadcrumb, path }]),
            ),
          }}
        />
      ) : null}
      <div className="mx-auto w-full max-w-[1180px] px-[var(--space-5)] py-[clamp(30px,4.4vw,56px)]">
        <div className="mb-[18px] flex items-center gap-[8px] text-[12.5px] text-text-muted">
          <Link href={routes.home} className="text-text-muted no-underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-text-secondary">{breadcrumb}</span>
        </div>

        <div className="flex max-w-[70ch] flex-col gap-[14px]">
          <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary-text">
            {eyebrow}
          </span>
          <h1 className="m-0 font-display text-[clamp(29px,4.6vw,44px)] font-semibold leading-[1.15] tracking-[-0.03em] text-text [text-wrap:pretty]">
            {title} <span className="text-primary-text">{titleAccent}</span>
          </h1>
          <p className="m-0 text-[clamp(15px,1.6vw,17px)] leading-[1.7] text-text-secondary [text-wrap:pretty]">
            {lede}
          </p>
        </div>

        {children}
      </div>
    </section>
  );
}
