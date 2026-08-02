import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Scale,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { routes } from "@/lib/routes";

const TOPICS = [
  {
    icon: BookOpen,
    title: "Act explained",
    body: "Plain-language guides to the provisions, with the governing sections close at hand.",
  },
  {
    icon: BriefcaseBusiness,
    title: "For practitioners",
    body: "Practical notes for privacy, legal, security and product teams putting the Act into practice.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance playbooks",
    body: "Focused checklists for notices, consent, safeguards, breaches and Data Principal requests.",
  },
] as const;

export const metadata: Metadata = {
  title: "DPDP Blog — Practical Guides & Analysis",
  description:
    "Practical explainers, implementation notes and compliance guides for India's Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="blog" />

      <main>
        <section className="border-b border-border bg-[var(--bg-sunken)]">
          <div className="mx-auto grid w-full max-w-[1180px] gap-[clamp(28px,5vw,64px)] px-[var(--space-5)] py-[clamp(42px,6vw,76px)] min-[860px]:grid-cols-[minmax(0,1.35fr)_minmax(260px,.65fr)] min-[860px]:items-end">
            <div className="flex max-w-[760px] flex-col gap-[16px]">
              <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                DPDP Academy Journal
              </span>
              <h1 className="m-0 font-display text-[clamp(34px,5.5vw,58px)] font-semibold leading-[1.06] tracking-[-0.035em] text-text [text-wrap:balance]">
                Clear thinking for India&apos;s{" "}
                <span className="text-primary-text">
                  data protection era.
                </span>
              </h1>
              <p className="m-0 max-w-[63ch] text-[clamp(15.5px,1.7vw,18px)] leading-[1.75] text-text-secondary">
                Practical explainers and field notes on the DPDP Act — written
                for the people turning statutory language into everyday
                decisions.
              </p>
            </div>

            <div className="border-l-2 border-primary-text pl-[18px]">
              <p className="m-0 text-[14px] leading-[1.7] text-text-secondary">
                Every article distinguishes the text of the Act from practical
                interpretation. Educational content only, not legal advice.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto w-full max-w-[1180px] px-[var(--space-5)] py-[clamp(44px,6vw,76px)]">
            <div className="mb-[18px] flex items-center justify-between gap-[16px]">
              <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
                Featured article
              </span>
              <span className="hidden h-px flex-1 bg-border sm:block" />
              <span className="font-mono text-[12px] text-text-muted">
                6 min read
              </span>
            </div>

            <article className="grid overflow-hidden rounded-lg border border-border-strong bg-surface min-[820px]:grid-cols-[minmax(0,1.15fr)_minmax(300px,.85fr)]">
              <div className="flex flex-col justify-between gap-[34px] p-[clamp(24px,4vw,46px)]">
                <div className="flex flex-col items-start gap-[16px]">
                  <Badge>Start here</Badge>
                  <h2 className="m-0 max-w-[16ch] font-display text-[clamp(28px,4vw,44px)] font-semibold leading-[1.12] tracking-[-0.03em] text-text [text-wrap:balance]">
                    The DPDP Act, 2023: a practical primer
                  </h2>
                  <p className="m-0 max-w-[58ch] text-[15.5px] leading-[1.75] text-text-secondary">
                    Who the law covers, the two lawful grounds for processing,
                    the duties that shape a compliance programme, and a sensible
                    first move for any organisation.
                  </p>
                </div>

                <Link
                  href={routes.blogPrimer}
                  className="group inline-flex w-fit items-center gap-[9px] font-sans text-[14px] font-semibold text-primary-text no-underline"
                >
                  Read the primer
                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-[3px]"
                  />
                </Link>
              </div>

              <div className="flex min-h-[310px] flex-col justify-between border-t border-border-strong bg-primary p-[clamp(24px,4vw,42px)] text-white min-[820px]:border-l min-[820px]:border-t-0">
                <span className="font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-white/70">
                  Filed under · Foundations
                </span>
                <div className="flex items-end justify-between gap-[20px]">
                  <Scale size={82} strokeWidth={1} aria-hidden="true" />
                  <div className="text-right font-mono text-[12px] leading-[1.7] text-white/70">
                    <span className="block">01 August 2026</span>
                    <span className="block">DPDP Academy Editorial</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="border-t border-border bg-[var(--bg-app)]">
          <div className="mx-auto w-full max-w-[1180px] px-[var(--space-5)] py-[clamp(42px,6vw,72px)]">
            <div className="mb-[24px] flex flex-wrap items-end justify-between gap-[14px]">
              <div>
                <span className="mb-[9px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                  Latest guidance
                </span>
                <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                  Put the framework into practice
                </h2>
              </div>
              <span className="font-mono text-[12px] text-text-muted">
                Reviewed 02 August 2026
              </span>
            </div>

            <div className="grid gap-[14px] min-[720px]:grid-cols-2 min-[1040px]:grid-cols-3">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.slug}
                  className="flex min-h-[285px] flex-col justify-between rounded-lg border border-border bg-surface p-[22px]"
                >
                  <div>
                    <div className="mb-[14px] flex items-center justify-between gap-[10px] font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
                      <span className="text-primary-text">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="m-0 font-display text-[21px] font-semibold leading-[1.25] tracking-[-0.02em] text-text">
                      {post.title}
                    </h3>
                    <p className="mb-0 mt-[10px] text-[14px] leading-[1.7] text-text-secondary">
                      {post.description}
                    </p>
                  </div>
                  <Link
                    href={"/blog/" + post.slug}
                    className="group mt-[22px] inline-flex items-center gap-[8px] text-[13.5px] font-semibold text-primary-text no-underline"
                  >
                    Read guide
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-[2px]"
                    />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-[var(--bg-sunken)]">
          <div className="mx-auto w-full max-w-[1180px] px-[var(--space-5)] py-[clamp(40px,5vw,64px)]">
            <div className="mb-[24px] max-w-[660px]">
              <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
                What we write about
              </span>
              <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                From the letter of the law to the work it creates
              </h2>
            </div>

            <div className="grid gap-[14px] min-[720px]:grid-cols-3">
              {TOPICS.map(({ icon: Icon, title, body }, index) => (
                <div
                  key={title}
                  className="flex min-h-[220px] flex-col justify-between rounded-lg border border-border bg-surface p-[22px]"
                >
                  <div className="flex items-center justify-between">
                    <Icon
                      size={22}
                      aria-hidden="true"
                      className="text-primary-text"
                    />
                    <span className="font-mono text-[12px] text-text-muted">
                      0{index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="mb-[8px] font-display text-[20px] font-semibold text-text">
                      {title}
                    </h3>
                    <p className="m-0 text-[14px] leading-[1.7] text-text-secondary">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto flex w-full max-w-[1180px] flex-col items-start justify-between gap-[22px] px-[var(--space-5)] py-[clamp(40px,5vw,64px)] min-[760px]:flex-row min-[760px]:items-center">
            <div className="max-w-[650px]">
              <h2 className="m-0 font-display text-[clamp(24px,3vw,32px)] font-semibold text-text">
                Prefer the source material?
              </h2>
              <p className="mb-0 mt-[8px] text-[15px] leading-[1.7] text-text-secondary">
                Read all 44 sections and the Schedule in the Academy&apos;s
                searchable reader.
              </p>
            </div>
            <LinkButton href={routes.reader} variant="secondary" size="lg">
              Open the Act reader
            </LinkButton>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
