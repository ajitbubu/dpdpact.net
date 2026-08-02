import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { LinkButton } from "@/components/ui/button";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-posts";
import {
  EDITORIAL_AUTHOR,
  EDITORIAL_REVIEWER,
  LEGAL_REVIEWED_ON,
} from "@/lib/editorial";
import { routes } from "@/lib/routes";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: "/blog/" + post.slug },
    openGraph: {
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated,
      section: post.category,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.updated,
    articleSection: post.category,
    author: {
      "@type": "Organization",
      name: EDITORIAL_AUTHOR.name,
      description: EDITORIAL_AUTHOR.role,
    },
    reviewedBy: {
      "@type": "Organization",
      name: EDITORIAL_REVIEWER.name,
      description: EDITORIAL_REVIEWER.role,
    },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: SITE_URL + "/blog/" + post.slug,
    citation: post.sources.map((source) =>
      source.href.startsWith("/") ? SITE_URL + source.href : source.href,
    ),
  };

  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="blog" />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        <header className="border-b border-border bg-[var(--bg-sunken)]">
          <div className="mx-auto w-full max-w-[900px] px-[var(--space-5)] py-[clamp(36px,6vw,76px)]">
            <Link
              href={routes.blog}
              className="mb-[30px] inline-flex items-center gap-[8px] text-[13px] font-semibold text-text-secondary no-underline hover:text-primary-text"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to the blog
            </Link>
            <div className="flex flex-col gap-[16px]">
              <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                {post.category} · {post.readTime}
              </span>
              <h1 className="m-0 max-w-[20ch] font-display text-[clamp(35px,5.7vw,58px)] font-semibold leading-[1.08] tracking-[-0.04em] text-text [text-wrap:balance]">
                {post.title}
              </h1>
              <p className="m-0 max-w-[68ch] text-[clamp(16px,1.8vw,19px)] leading-[1.75] text-text-secondary">
                {post.intro}
              </p>
              <div className="mt-[8px] flex flex-wrap gap-x-[18px] gap-y-[6px] font-mono text-[12px] text-text-muted">
                <span>Published 2 August 2026</span>
                <span>
                  By {EDITORIAL_AUTHOR.name} · {EDITORIAL_AUTHOR.role}
                </span>
                <span>
                  Reviewed by {EDITORIAL_REVIEWER.name} · {LEGAL_REVIEWED_ON}
                </span>
              </div>
            </div>
          </div>
        </header>

        <article className="bg-[var(--bg-app)]">
          <div className="mx-auto grid w-full max-w-[1020px] gap-[38px] px-[var(--space-5)] py-[clamp(42px,6vw,76px)] min-[900px]:grid-cols-[210px_minmax(0,700px)]">
            <aside className="hidden min-[900px]:block">
              <div className="sticky top-[104px] border-l border-border pl-[16px]">
                <span className="mb-[12px] block font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted">
                  In this article
                </span>
                <nav
                  aria-label="Article contents"
                  className="flex flex-col gap-[10px]"
                >
                  {post.sections.map((section, index) => (
                    <a
                      key={section.heading}
                      href={"#section-" + (index + 1)}
                      className="text-[13px] leading-[1.5] text-text-secondary no-underline hover:text-primary-text"
                    >
                      {index + 1}. {section.heading}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="min-w-0">
              {post.sections.map((section, index) => (
                <section key={section.heading}>
                  <h2
                    id={"section-" + (index + 1)}
                    className="mb-[12px] mt-0 scroll-mt-[104px] pt-[clamp(18px,3vw,30px)] font-display text-[clamp(24px,3vw,31px)] font-semibold leading-[1.25] tracking-[-0.025em] text-text first:pt-0"
                  >
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="my-[16px] text-[16px] leading-[1.85] text-text-secondary"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets ? (
                    <ul className="my-[22px] flex list-none flex-col gap-[10px] rounded-lg border border-border bg-[var(--bg-sunken)] p-[20px]">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-[10px] text-[14.5px] leading-[1.7] text-text-secondary"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[9px] size-[5px] shrink-0 rounded-full bg-primary-text"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <section className="mt-[42px] border-y border-border py-[24px]">
                <div className="mb-[13px] flex items-center gap-[9px]">
                  <ShieldCheck
                    size={19}
                    aria-hidden="true"
                    className="text-primary-text"
                  />
                  <h2 className="m-0 font-display text-[20px] font-semibold text-text">
                    Sources and editorial review
                  </h2>
                </div>
                <p className="m-0 text-[13.5px] leading-[1.7] text-text-muted">
                  Prepared by {EDITORIAL_AUTHOR.name} ({EDITORIAL_AUTHOR.role}).
                  Reviewed by {EDITORIAL_REVIEWER.name} using the sources below
                  on {LEGAL_REVIEWED_ON}. Statutory text, notified Rules and
                  practical interpretation are kept distinct. Educational
                  content, not legal advice.
                </p>
                <div className="mt-[14px] flex flex-col gap-[8px]">
                  {post.sources.map((source) => (
                    <a
                      key={source.href}
                      href={source.href}
                      target={source.href.startsWith("/") ? undefined : "_blank"}
                      rel={source.href.startsWith("/") ? undefined : "noreferrer"}
                      className="inline-flex items-center gap-[7px] text-[13px] font-semibold text-primary-text no-underline"
                    >
                      {source.label}
                      {!source.href.startsWith("/") ? (
                        <ExternalLink size={14} aria-hidden="true" />
                      ) : null}
                    </a>
                  ))}
                </div>
              </section>

              <section className="mt-[28px]">
                <h2 className="m-0 font-display text-[22px] font-semibold text-text">
                  Continue reading
                </h2>
                <div className="mt-[14px] grid gap-[10px] sm:grid-cols-2">
                  {post.related.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-center justify-between gap-[12px] rounded-sm border border-border bg-surface px-[16px] py-[14px] text-[13.5px] font-semibold text-text no-underline hover:border-primary-text"
                    >
                      {item.label}
                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="shrink-0 text-primary-text transition-transform group-hover:translate-x-[2px]"
                      />
                    </Link>
                  ))}
                </div>
              </section>

              <div className="mt-[30px]">
                <LinkButton href={routes.blog} variant="secondary" size="lg">
                  View all DPDP articles
                </LinkButton>
              </div>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
