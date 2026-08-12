import type { Metadata } from "next";
import { Bug, GitFork, LockKeyhole, MessageSquareText } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Contact & Corrections",
  description:
    "Contact DPDP Academy about source corrections, technical defects and privacy questions through the project's public correction channel.",
  alternates: { canonical: "/contact" },
};

const CONTACTS = [
  {
    icon: Bug,
    title: "Content correction",
    body: "Identify the page, disputed sentence, governing source and proposed correction. Statutory errors receive priority.",
    label: "Open a correction issue",
    href: "https://github.com/ajitbubu/dpdpact.net/issues/new?labels=content&title=Content%20correction%3A%20",
  },
  {
    icon: GitFork,
    title: "Technical defect",
    body: "Report broken links, inaccessible controls, rendering problems, stale offline content or other reproducible defects.",
    label: "Open a technical issue",
    href: "https://github.com/ajitbubu/dpdpact.net/issues/new?labels=bug&title=Technical%20issue%3A%20",
  },
  {
    icon: MessageSquareText,
    title: "General feedback",
    body: "Suggest a guide, template, explanatory improvement or source that would make the public resource more useful.",
    label: "Share feedback",
    href: "https://github.com/ajitbubu/dpdpact.net/issues/new?labels=feedback&title=Feedback%3A%20",
  },
] as const;

export default function ContactPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav />
      <main>
        <PageHero
          breadcrumb="Contact"
          path={routes.contact}
          eyebrow="Corrections · Defects · Feedback"
          title="Contact and"
          titleAccent="Corrections"
          lede="DPDP Academy uses its public repository as the accountable correction record. Choose the route below and include enough source detail for another reader to reproduce the issue."
        />

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto w-full max-w-[920px] px-[var(--space-5)] py-[clamp(42px,6vw,72px)]">
            <div className="grid gap-[14px] min-[720px]:grid-cols-3">
              {CONTACTS.map(({ icon: Icon, title, body, label, href }) => (
                <article
                  key={title}
                  className="flex min-h-[290px] flex-col justify-between rounded-lg border border-border bg-surface p-[22px]"
                >
                  <div>
                    <Icon
                      size={22}
                      aria-hidden="true"
                      className="mb-[18px] text-primary-text"
                    />
                    <h2 className="m-0 font-display text-[20px] font-semibold text-text">
                      {title}
                    </h2>
                    <p className="mb-0 mt-[9px] text-[14px] leading-[1.7] text-text-secondary">
                      {body}
                    </p>
                  </div>
                  <a
                    href={href}
                    className="mt-[20px] text-[13.5px] font-semibold text-primary-text no-underline"
                  >
                    {label} →
                  </a>
                </article>
              ))}
            </div>

            <aside className="mt-[24px] flex gap-[12px] rounded-lg border border-warning bg-warning-tint p-[20px]">
              <LockKeyhole
                size={20}
                aria-hidden="true"
                className="mt-[2px] shrink-0 text-warning-text"
              />
              <div>
                <h2 className="m-0 font-display text-[18px] font-semibold text-text">
                  Do not post personal or confidential information
                </h2>
                <p className="mb-0 mt-[7px] text-[13.5px] leading-[1.68] text-text-secondary">
                  GitHub issues are public. For a privacy matter, open an issue
                  containing no personal data and ask the maintainer to provide
                  a private response channel. Do not include identity documents,
                  account details, case files or security-sensitive material.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
