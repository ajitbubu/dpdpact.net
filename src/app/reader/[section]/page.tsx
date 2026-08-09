import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ActBlocks, ActScheduleTable } from "@/components/act-blocks";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { LinkButton } from "@/components/ui/button";
import {
  ACT_PARTS,
  getActNeighbours,
  getActPart,
  partDescription,
  partLabel,
  partStudyPage,
  partTitle,
} from "@/lib/act-sections";
import { breadcrumbSchema } from "@/lib/breadcrumbs";
import { ACT } from "@/lib/dpdpa-data";
import { routes } from "@/lib/routes";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return ACT_PARTS.map((part) => ({ section: part.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const part = getActPart(section);
  if (!part) return {};

  return {
    // Absolute: the site-wide `%s | DPDP Academy` template would push these
    // past the SERP limit, and "Section N" matters more than the brand here.
    title: { absolute: partTitle(part) },
    description: partDescription(part),
    alternates: { canonical: `/reader/${part.slug}` },
    openGraph: { type: "article", title: partTitle(part) },
  };
}

export default async function ActSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const part = getActPart(section);
  if (!part) notFound();

  const { prev, next } = getActNeighbours(part.slug);
  const study = partStudyPage(part);
  const url = `${SITE_URL}/reader/${part.slug}`;

  /**
   * `Legislation` again, but scoped to this provision and pointed at the Act
   * via `isPartOf` — the pairing that lets an answer engine cite a section
   * rather than the whole statute.
   */
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Legislation",
        "@id": `${url}#provision`,
        name: partLabel(part),
        legislationIdentifier:
          part.kind === "sch" ? "Schedule" : `Section ${part.n}`,
        legislationJurisdiction: "India",
        legislationType: "Act of Parliament",
        legislationDate: "2023-08-11",
        inLanguage: "en",
        url,
        dateModified: CONTENT_UPDATED,
        isPartOf: {
          "@type": "Legislation",
          name: ACT.title,
          legislationIdentifier: ACT.actNo,
          legislationJurisdiction: "India",
          url: `${SITE_URL}${routes.reader}`,
        },
        publisher: {
          "@type": "GovernmentOrganization",
          name: "Ministry of Law and Justice, Legislative Department",
        },
      },
      breadcrumbSchema([
        { name: "DPDP Act reader", path: routes.reader },
        { name: partLabel(part), path: `/reader/${part.slug}` },
      ]),
    ],
  };

  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="reader" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <header className="border-b border-border bg-[var(--bg-sunken)]">
          <div className="mx-auto w-full max-w-[860px] px-[var(--space-5)] py-[clamp(28px,4.4vw,52px)]">
            <nav
              aria-label="Breadcrumb"
              className="mb-[18px] flex flex-wrap items-center gap-[8px] text-[12.5px] text-text-muted"
            >
              <Link href={routes.home} className="text-text-muted no-underline">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href={routes.reader}
                className="text-text-muted no-underline"
              >
                DPDP Act reader
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-text-secondary">
                {part.kind === "sch" ? "The Schedule" : `Section ${part.n}`}
              </span>
            </nav>

            <div className="flex flex-col gap-[14px]">
              <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary-text">
                {part.kind === "sch"
                  ? "Schedule · see section 33(1)"
                  : `Chapter ${part.chNum} · ${part.chTitle}`}
              </span>
              <h1 className="m-0 font-display text-[clamp(27px,4.4vw,40px)] font-semibold leading-[1.18] tracking-[-0.03em] text-text [text-wrap:pretty]">
                {part.kind === "sch" ? (
                  "The Schedule — Monetary Penalties"
                ) : (
                  <>
                    <span className="text-primary-text">
                      Section {part.n}.
                    </span>{" "}
                    {part.heading}
                  </>
                )}
              </h1>
              <p className="m-0 text-[14px] leading-[1.7] text-text-muted">
                {ACT.title} ({ACT.actNo}) · assented {ACT.assent} · statutory
                text as published in the Gazette of India.
              </p>
            </div>
          </div>
        </header>

        <article className="bg-[var(--bg-app)]">
          <div className="mx-auto w-full max-w-[860px] px-[var(--space-5)] py-[clamp(32px,5vw,58px)]">
            {part.kind === "sch" ? (
              <ActScheduleTable />
            ) : (
              <ActBlocks blocks={part.blocks} />
            )}

            <div className="mt-[36px] flex flex-col gap-[10px] rounded-lg border border-border bg-surface p-[20px]">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted">
                Keep going
              </span>
              <Link
                href={study.href}
                className="inline-flex items-center gap-[8px] text-[14.5px] font-semibold text-primary-text no-underline hover:underline"
              >
                <BookOpen size={16} aria-hidden="true" />
                {study.label}
              </Link>
              {/* Chapter IX has no study page, so `study` already points at
                  the full text — don't render the same link twice. */}
              {study.href !== routes.readerFullText ? (
                <Link
                  href={routes.readerFullText}
                  className="inline-flex items-center gap-[8px] text-[14.5px] font-semibold text-primary-text no-underline hover:underline"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  Read the complete Act on one page
                </Link>
              ) : null}
            </div>

            <nav
              aria-label="Adjacent provisions"
              className="mt-[26px] grid gap-[10px] sm:grid-cols-2"
            >
              {prev ? (
                <Link
                  href={`/reader/${prev.slug}`}
                  className="group flex items-center gap-[10px] rounded-sm border border-border bg-surface px-[16px] py-[14px] text-[13.5px] font-semibold text-text no-underline hover:border-primary-text"
                >
                  <ArrowLeft
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-primary-text"
                  />
                  <span className="min-w-0">{partLabel(prev)}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/reader/${next.slug}`}
                  className="group flex items-center justify-end gap-[10px] rounded-sm border border-border bg-surface px-[16px] py-[14px] text-right text-[13.5px] font-semibold text-text no-underline hover:border-primary-text"
                >
                  <span className="min-w-0">{partLabel(next)}</span>
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-primary-text"
                  />
                </Link>
              ) : null}
            </nav>

            <div className="mt-[30px]">
              <LinkButton href={routes.reader} variant="secondary" size="lg">
                Back to all 44 sections
              </LinkButton>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
