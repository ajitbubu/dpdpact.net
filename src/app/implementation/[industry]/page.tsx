import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EditorialReview } from "@/components/editorial-review";
import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { RelatedGuides } from "@/components/related-guides";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { INDUSTRIES, getIndustry, industryPath } from "@/lib/industries";
import { routes } from "@/lib/routes";
import {
  ACT_SOURCE_PDF,
  CONTENT_UPDATED,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

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
  const industry = getIndustry(slug);
  if (!industry) return {};

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
  const industry = getIndustry(slug);
  if (!industry) notFound();

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
        datePublished: CONTENT_UPDATED,
        dateModified: CONTENT_UPDATED,
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
          <div className="flex items-center gap-[10px] text-text-secondary">
            <Icon size={20} strokeWidth={1.6} aria-hidden />
            <span className="font-mono text-[12px] uppercase tracking-[0.14em]">
              Implementation guide
            </span>
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
