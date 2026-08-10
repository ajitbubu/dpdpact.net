import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

import { EditorialReview } from "@/components/editorial-review";
import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { RelatedGuides } from "@/components/related-guides";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Card } from "@/components/ui/card";
import { INDUSTRIES, industryPath } from "@/lib/industries";
import { routes } from "@/lib/routes";
import {
  ACT_SOURCE_PDF,
  CONTENT_UPDATED,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "DPDP Act by Industry: Implementation Guides" },
  description:
    "How India's DPDP Act applies sector by sector - e-commerce, online gaming, social media, healthcare, financial services, EdTech, SaaS, startups and government. Each guide is anchored to a specific provision.",
  alternates: { canonical: "/implementation" },
};

const FAQ = [
  {
    q: "Does the DPDP Act have different rules for different industries?",
    a: "Mostly no, and that is the point worth understanding first. The Act defines a Data Fiduciary by what it does with personal data rather than by sector, and almost every obligation applies identically everywhere. The exceptions are specific and findable: the Third Schedule to the Rules names three classes with their own retention thresholds, the Fourth Schedule disapplies the children's provisions for defined classes, and sections 17(1)(d), 17(1)(f), 17(2)(a), 17(3) and 7(b) carve out particular situations.",
  },
  {
    q: "Which industries are actually named in the Act or the Rules?",
    a: "E-commerce entities, online gaming intermediaries and social media intermediaries are named in the Third Schedule with user-count thresholds. Clinical establishments, mental health establishments and healthcare professionals begin Part A of the Fourth Schedule. Financial institutions appear in section 17(1)(f). Startups are named in section 17(3). The State and its instrumentalities appear in sections 7(b) and 17(2)(a).",
  },
  {
    q: "My sector is not listed here. What applies to me?",
    a: "The whole Act, without sector-specific modification - which is the ordinary case rather than a gap. Start with the eleven obligations in Chapter II and the rights in Chapter III, then check whether you cross a Significant Data Fiduciary threshold under section 10. We have not written a page for sectors with no distinct statutory treatment, because it would be the same guidance with a different heading.",
  },
  {
    q: "Do these guides replace legal advice?",
    a: "No. They are educational summaries anchored to specific provisions so you can verify each claim against the statute yourself, and every page links to the section text and to the MeitY publication. Applying them to your organisation's facts - particularly on the exemptions, which are all bounded by purpose - is work for a qualified adviser.",
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "DPDP Act by industry",
      description:
        "Sector-by-sector implementation guides for India's Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025.",
      url: `${SITE_URL}/implementation`,
      isPartOf: `${SITE_URL}/#website`,
      dateModified: CONTENT_UPDATED,
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      citation: [ACT_SOURCE_PDF],
      hasPart: INDUSTRIES.map((industry) => ({
        "@type": "Article",
        headline: industry.metaTitle,
        description: industry.metaDescription,
        url: `${SITE_URL}/implementation/${industry.slug}`,
      })),
    },
  ],
};

export default function ImplementationPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="implementation" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />

        <PageHero
          breadcrumb="Implementation"
          path="/implementation"
          eyebrow="Nine sectors · each anchored to a provision"
          title="The Act Is Sector-Neutral."
          titleAccent="Except Where It Isn't."
          lede="The DPDP Act defines a Data Fiduciary by what it does with personal data, not by what industry it is in. But the Rules name three classes outright, and six more sectors have a provision written around them. These are those sectors."
        />

        <section className="border-b border-border">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(38px,5vw,60px)] px-[var(--space-5)] py-[clamp(42px,6vw,76px)]">
            <div className="flex max-w-[72ch] flex-col gap-[var(--space-4)]">
              <p className="text-[17px] leading-[1.7] text-text-secondary">
                Most sector guidance on this Act is the same checklist with a
                different logo, and it is worth saying why. The statute is
                deliberately drafted to be sector-neutral: obligations attach to
                the processing of digital personal data, so a hospital, a bank
                and a bookshop owe substantially the same duties. Writing nine
                versions of that is not useful to anyone.
              </p>
              <p className="text-[17px] leading-[1.7] text-text-secondary">
                What is useful is the set of places where the framework does
                distinguish. There are more of them than the Act alone suggests,
                because most sit in the Rules: the Third Schedule names
                e-commerce, online gaming and social media with their own
                retention clocks and user-count thresholds, and the Fourth
                Schedule switches the children&rsquo;s provisions off for
                clinical care. The Act itself reserves section 17(1)(f) for
                lenders, section 17(1)(d) for offshore IT services, section
                17(3) for startups and sections 7(b) and 17(2)(a) for the State.
              </p>
              <p className="text-[17px] leading-[1.7] text-text-secondary">
                Each guide below names the provision it rests on. If your sector
                is not here, that is the answer rather than an omission - the
                general regime applies, and the{" "}
                <Link href={routes.obligations} className="text-primary-text underline">
                  eleven obligations
                </Link>{" "}
                are the right place to start.
              </p>
            </div>

            {/*
             * Scannable index. Every column is derived from the same industry
             * data the cards and the guides use, so there is no third place for
             * a fact to live and drift.
             */}
            <div className="flex flex-col gap-[var(--space-4)]">
              <h2 className="font-display text-[clamp(24px,3vw,30px)] font-semibold leading-[1.15] tracking-[-0.02em] text-text">
                The nine at a glance
              </h2>
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Each sector, what it also covers, the number that matters and
                  the provision that sets it
                </caption>
                <thead>
                  <tr className="border-b border-border">
                    {["Sector", "Also covers", "The number that matters"].map(
                      (h) => (
                        <th
                          key={h}
                          scope="col"
                          className="py-[10px] pr-[12px] align-bottom font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted last:pr-0"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {INDUSTRIES.map((industry) => {
                    const headline = industry.thresholds[0];
                    return (
                      <tr
                        key={industry.slug}
                        className="border-b border-border align-top last:border-0"
                      >
                        <th scope="row" className="w-[26%] py-[12px] pr-[12px] text-left">
                          <Link
                            href={industryPath(industry.slug)}
                            className="font-sans text-[14px] font-semibold leading-[1.3] text-primary-text underline"
                          >
                            {industry.name}
                          </Link>
                        </th>
                        <td className="w-[42%] py-[12px] pr-[12px] text-[12.5px] leading-[1.5] text-text-secondary">
                          {industry.covers.join(", ")}
                        </td>
                        <td className="w-[32%] py-[12px] align-top">
                          <span className="block font-sans text-[14px] font-semibold text-text">
                            {headline.value}
                          </span>
                          <span className="block text-[12.5px] leading-[1.45] text-text-secondary">
                            {headline.label}
                          </span>
                          <span className="mt-[2px] block font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
                            {headline.ref}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRIES.map((industry) => {
                const Icon = industry.icon;
                return (
                  <Card key={industry.slug} className="p-0">
                    <Link
                      href={industryPath(industry.slug)}
                      className="flex h-full flex-col gap-[12px] p-[var(--space-5)] no-underline"
                    >
                      <span className="flex items-center gap-[10px]">
                        <Icon
                          size={22}
                          strokeWidth={1.6}
                          className="text-primary-text"
                          aria-hidden
                        />
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
                          {industry.eyebrow}
                        </span>
                      </span>
                      <span className="font-display text-[19px] font-semibold leading-[1.25] tracking-[-0.01em] text-text">
                        {industry.name}
                      </span>
                      <span className="text-[15px] leading-[1.6] text-text-secondary">
                        {industry.lede}
                      </span>
                      <span className="mt-auto inline-flex items-center gap-[6px] pt-[8px] text-[14px] font-medium text-primary-text">
                        Read the guide
                        <ArrowRight size={15} aria-hidden />
                      </span>
                    </Link>
                  </Card>
                );
              })}
            </div>

            <p className="max-w-[72ch] text-[14px] leading-[1.65] text-text-secondary">
              Every provision cited across these guides can be read in context
              in the{" "}
              <Link href={routes.readerFullText} className="text-primary-text underline">
                full text of the Act
              </Link>{" "}
              or verified against the{" "}
              <a
                href={ACT_SOURCE_PDF}
                className="inline-flex items-center gap-[4px] text-primary-text underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                MeitY publication
                <ExternalLink size={13} aria-hidden />
              </a>
              .
            </p>
          </div>
        </section>

        <Faq
          items={FAQ}
          eyebrow="Implementation"
          heading="Applying the Act by sector"
        />

        <RelatedGuides
          heading="Start here instead"
          guides={[
            {
              href: routes.obligations,
              label: "The eleven obligations",
              blurb: "Chapter II, which applies to every sector on this page",
            },
            {
              href: routes.applicability,
              label: "Applicability checker",
              blurb: "Work out which provisions reach your organisation",
            },
            {
              href: routes.checklist,
              label: "Compliance checklist",
              blurb: "A working sequence once you know what applies",
            },
          ]}
        />

        <EditorialReview scope="industry implementation guides" />
      </main>

      <SiteFooter />
    </div>
  );
}
