import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ActivityTable } from "@/components/activity-table";
import { DataFlow } from "@/components/data-flow";
import { EditorialReview } from "@/components/editorial-review";
import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { RelatedGuides } from "@/components/related-guides";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  INDUSTRIES,
  getIndustry,
  industryJourney,
  industryPath,
  isIndustrySlug,
} from "@/lib/industries";
import { routes } from "@/lib/routes";
import { ACT_SOURCE_PDF, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  // `params` is string-typed even with `dynamicParams = false`, so narrow it
  // rather than cast: a cast here would reopen the hole the slug union closes.
  if (!isIndustrySlug(slug)) return {};
  const industry = getIndustry(slug);

  return {
    // Absolute: the site-wide `%s | DPDP Academy` template would push these
    // past the SERP limit, and the sector matters more than the brand here.
    title: { absolute: industry.metaTitle },
    description: industry.metaDescription,
    alternates: { canonical: `/implementation/${industry.slug}` },
    openGraph: { type: "article", title: industry.metaTitle },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  if (!isIndustrySlug(slug)) notFound();
  const industry = getIndustry(slug);

  const index = INDUSTRIES.findIndex((i) => i.slug === industry.slug);
  const prev = index > 0 ? INDUSTRIES[index - 1] : undefined;
  const next =
    index < INDUSTRIES.length - 1 ? INDUSTRIES[index + 1] : undefined;

  const url = `${SITE_URL}/implementation/${industry.slug}`;
  const Icon = industry.icon;

  /**
   * Article only. `PageHero` emits the `BreadcrumbList` and `Faq` emits the
   * `FAQPage` — repeating either here put two of each on the page.
   */
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: industry.metaTitle,
        description: industry.metaDescription,
        // Per-industry literals, never the site-wide CONTENT_UPDATED: bumping
        // that global for an unrelated edit used to rewrite the apparent
        // publication date of all nine guides.
        datePublished: industry.published,
        dateModified: industry.updated,
        author: { "@type": "Organization", name: `${SITE_NAME} Editorial` },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        mainEntityOfPage: url,
        isPartOf: `${SITE_URL}/implementation`,
        citation: [ACT_SOURCE_PDF],
      },
    ],
  };

  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="implementation" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />

        <PageHero
          breadcrumb={industry.name}
          parent={{ name: "Implementation", path: routes.implementation }}
          path={`/implementation/${industry.slug}`}
          eyebrow={industry.eyebrow}
          title={industry.heading}
          titleAccent={industry.headingAccent}
          lede={industry.lede}
        >
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px] text-text-secondary">
              <Icon size={20} strokeWidth={1.6} aria-hidden />
              <span className="font-mono text-[12px] uppercase tracking-[0.14em]">
                Implementation guide
              </span>
            </div>
            <p className="max-w-[70ch] text-[14px] leading-[1.6] text-text-muted">
              <span className="font-medium text-text-secondary">
                Covers:{" "}
              </span>
              {industry.covers.join(", ")}.
            </p>
          </div>
        </PageHero>

        <section className="border-b border-border">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(38px,5vw,60px)] px-[var(--space-5)] py-[clamp(42px,6vw,76px)]">
            {/* Why this sector is not simply "the Act, again". */}
            <div className="flex flex-col gap-[var(--space-4)]">
              <h2 className="font-display text-[clamp(26px,3.2vw,34px)] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
                Why this sector is treated differently
              </h2>
              <div className="flex max-w-[72ch] flex-col gap-[var(--space-4)]">
                {industry.standing.map((para, i) => (
                  <p key={i} className="text-[17px] leading-[1.7] text-text-secondary">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Numbers this sector needs at a glance. */}
            <div className="grid gap-[var(--space-4)] sm:grid-cols-3">
              {industry.thresholds.map((t) => (
                <div
                  key={t.label}
                  className="flex flex-col gap-[4px] rounded-sm border border-border bg-[var(--bg-sunken)] p-[var(--space-4)]"
                >
                  <span className="font-display text-[clamp(22px,2.6vw,28px)] font-semibold leading-[1.1] tracking-[-0.02em] text-primary-text">
                    {t.value}
                  </span>
                  <span className="text-[13.5px] leading-[1.45] text-text-secondary">
                    {t.label}
                  </span>
                  <span className="mt-[2px] font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
                    {t.ref}
                  </span>
                </div>
              ))}
            </div>

            {/* Derived view 1: one row per processing activity. */}
            <div className="flex flex-col gap-[var(--space-4)]">
              <h2 className="font-display text-[clamp(26px,3.2vw,34px)] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
                What you actually process
              </h2>
              <p className="max-w-[72ch] text-[15px] leading-[1.7] text-text-secondary">
                One row per activity, not per data type. Lawful basis and
                erasure attach to a purpose, so the same phone number can sit in
                three rows below with three different answers.
              </p>
              <ActivityTable activities={industry.activities} />
            </div>

            {/* Derived view 2: the same activities as actors and systems. */}
            <div className="flex flex-col gap-[var(--space-4)]">
              <h2 className="font-display text-[clamp(26px,3.2vw,34px)] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
                The data flow, and where it breaks
              </h2>
              <p className="max-w-[72ch] text-[15px] leading-[1.7] text-text-secondary">
                Each lane follows one activity through the actors and systems
                that touch the data. The failure mode sits on the hop where it
                happens, rather than in a list somewhere else on the page.
              </p>
              <DataFlow activities={industry.activities} />
            </div>

            {/* The provisions that do the work, quoted by reference. */}
            <div className="flex flex-col gap-[var(--space-4)]">
              <h2 className="font-display text-[clamp(26px,3.2vw,34px)] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
                The provisions that apply
              </h2>
              <div className="grid gap-[var(--space-4)] md:grid-cols-2">
                {industry.provisions.map((provision) => (
                  <Card
                    key={provision.ref + provision.title}
                    className="flex flex-col gap-[12px] p-[var(--space-5)]"
                  >
                    <Badge>{provision.ref}</Badge>
                    <h3 className="font-display text-[19px] font-semibold leading-[1.25] tracking-[-0.01em] text-text">
                      {provision.title}
                    </h3>
                    <p className="text-[15px] leading-[1.65] text-text-secondary">
                      {provision.body}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* What to actually do about it. */}
            <div className="flex flex-col gap-[var(--space-4)]">
              <h2 className="font-display text-[clamp(26px,3.2vw,34px)] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
                What to do about it
              </h2>
              <ol className="flex flex-col gap-[var(--space-4)]">
                {industry.actions.map((action, i) => (
                  <li
                    key={action.title}
                    className="flex gap-[var(--space-4)] border-b border-border pb-[var(--space-4)] last:border-0 last:pb-0"
                  >
                    <span
                      className="shrink-0 font-mono text-[13px] font-medium tabular-nums text-primary-text"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex max-w-[68ch] flex-col gap-[6px]">
                      <h3 className="font-display text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-text">
                        {action.title}
                      </h3>
                      <p className="text-[15px] leading-[1.65] text-text-secondary">
                        {action.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Derived view 3: the same controls, grouped into phases. */}
            <div className="flex flex-col gap-[var(--space-4)]">
              <h2 className="font-display text-[clamp(26px,3.2vw,34px)] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
                Sequence the work
              </h2>
              <p className="max-w-[72ch] text-[15px] leading-[1.7] text-text-secondary">
                The same controls as above, in the order they are worth doing.
                Each names the evidence you would put in front of an auditor,
                because a control you cannot evidence is a control you cannot
                prove you had.
              </p>
              <div className="grid gap-[var(--space-4)] md:grid-cols-3">
                {industryJourney(industry).map((phase, i) => (
                  <div
                    key={phase.key}
                    className="flex flex-col gap-[10px] rounded-sm border border-border p-[var(--space-4)]"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
                      Phase {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-[17px] font-semibold leading-[1.25] tracking-[-0.01em] text-text">
                      {phase.title}
                    </h3>
                    <p className="text-[13px] leading-[1.5] text-text-muted">
                      {phase.blurb}
                    </p>
                    <ul className="mt-[2px] flex flex-col gap-[12px] border-t border-border pt-[12px]">
                      {phase.steps.map((step) => (
                        <li key={step.activity} className="flex flex-col gap-[3px]">
                          <span className="font-sans text-[13px] font-semibold text-primary-text">
                            {step.activity}
                          </span>
                          <span className="text-[13px] leading-[1.55] text-text-secondary">
                            {step.control}
                          </span>
                          <span className="text-[12px] leading-[1.45] text-text-muted">
                            <span className="font-medium">Evidence: </span>
                            {step.evidence}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <p className="max-w-[72ch] text-[14px] leading-[1.65] text-text-secondary">
              Section and Schedule references above point at the statute itself.
              Read them in context in the{" "}
              <Link href={routes.readerFullText} className="text-primary-text underline">
                full text of the Act
              </Link>
              , or against the{" "}
              <a
                href={ACT_SOURCE_PDF}
                className="inline-flex items-center gap-[4px] text-primary-text underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                MeitY publication
                <ExternalLink size={13} aria-hidden />
              </a>
              . This is an educational summary, not legal advice for your
              organisation.
            </p>
          </div>
        </section>

        <Faq
          items={industry.faq}
          eyebrow={industry.name}
          heading={`${industry.name}: common questions`}
        />

        {/*
         * One real action. The checker is described by what it actually does -
         * a decision path through section 3 - because it answers scope only and
         * says so itself; calling it a personalised assessment would oversell it.
         */}
        <section className="border-b border-border bg-[var(--bg-sunken)]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[var(--space-4)] px-[var(--space-5)] py-[clamp(34px,4.5vw,56px)]">
            <h2 className="font-display text-[clamp(22px,2.8vw,30px)] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
              Know this well enough to prove it
            </h2>
            <p className="max-w-[62ch] text-[15px] leading-[1.7] text-text-secondary">
              The certification is a free, graded 15-question exam covering the
              Act end to end, not just this sector. Pass mark is 70%.
            </p>
            <div className="flex flex-wrap items-center gap-[var(--space-4)]">
              <LinkButton href={routes.certification} variant="secondary">
                Get certified
              </LinkButton>
              <Link
                href={routes.applicability}
                className="text-[14.5px] text-primary-text underline"
              >
                Not sure the Act reaches you at all? Walk section 3
              </Link>
            </div>
          </div>
        </section>

        {/* Sibling navigation: every industry page is one click from the next. */}
        <section className="border-b border-border">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[var(--space-4)] px-[var(--space-5)] py-[clamp(32px,4vw,52px)]">
            <div className="flex flex-wrap items-center justify-between gap-[var(--space-4)]">
              {prev ? (
                <Link
                  href={industryPath(prev.slug)}
                  className="inline-flex items-center gap-[8px] text-[15px] text-text-secondary no-underline hover:text-primary-text"
                >
                  <ArrowLeft size={16} aria-hidden />
                  {prev.name}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={industryPath(next.slug)}
                  className="inline-flex items-center gap-[8px] text-[15px] text-text-secondary no-underline hover:text-primary-text"
                >
                  {next.name}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              ) : (
                <span />
              )}
            </div>
            <Link
              href={routes.implementation}
              className="text-[15px] text-primary-text underline"
            >
              All industry implementation guides
            </Link>
          </div>
        </section>

        <RelatedGuides
          heading="Read next"
          guides={industry.related.map((r) => ({
            href: r.href,
            label: r.label,
            blurb: r.note,
          }))}
        />

        <EditorialReview scope={`${industry.name} implementation guide`} />
      </main>

      <SiteFooter />
    </div>
  );
}
