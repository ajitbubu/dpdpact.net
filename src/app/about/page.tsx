import type { Metadata } from "next";
import { BookOpenCheck, GitFork, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { routes } from "@/lib/routes";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About DPDP Academy",
  description:
    "Learn how DPDP Academy sources, reviews and publishes educational material about India's DPDP Act, 2023 and notified Rules, 2025.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    icon: BookOpenCheck,
    title: "Primary sources first",
    body: "Statutory claims start with the Gazette of India, MeitY publications, notified Rules, corrigenda, commencement notifications and official decisions.",
  },
  {
    icon: Scale,
    title: "Law and practice separated",
    body: "Pages distinguish enacted requirements from implementation suggestions. Practical guidance is labelled as guidance and never presented as a government direction.",
  },
  {
    icon: ShieldCheck,
    title: "Limits stated plainly",
    body: "The site is educational, not a law firm, regulator, accredited university or government certification authority. It does not claim a named advocate has reviewed material unless that person is identified.",
  },
] as const;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  sameAs: ["https://github.com/ajitbubu/dpdpact.net"],
  publishingPrinciples: `${SITE_URL}${routes.editorialPolicy}`,
};

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav />
      <main>
        <PageHero
          breadcrumb="About"
          path={routes.about}
          eyebrow="Educational public resource"
          title="About"
          titleAccent="DPDP Academy"
          lede="DPDP Academy is an independent educational website for reading the Digital Personal Data Protection Act, 2023, understanding the notified Rules, and translating them into practical implementation work."
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto w-full max-w-[920px] px-[var(--space-5)] py-[clamp(42px,6vw,72px)]">
            <div className="grid gap-[14px] min-[720px]:grid-cols-3">
              {PRINCIPLES.map(({ icon: Icon, title, body }) => (
                <article
                  key={title}
                  className="rounded-lg border border-border bg-surface p-[22px]"
                >
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
                </article>
              ))}
            </div>

            <section className="mt-[36px] border-t border-border pt-[32px]">
              <h2 className="m-0 font-display text-[28px] font-semibold text-text">
                Who writes and reviews the material
              </h2>
              <p className="mb-0 mt-[12px] text-[15px] leading-[1.78] text-text-secondary">
                Content is currently published under the organisation-level
                bylines <strong className="text-text">DPDP Academy Editorial</strong>{" "}
                and <strong className="text-text">DPDP Academy Source Review</strong>.
                Those labels describe the work performed; they are not a claim
                that a named lawyer or other credentialed professional has
                reviewed it. A personal byline will be added only with the
                contributor&apos;s approval, biography and relevant credentials.
              </p>
            </section>

            <section className="mt-[32px] grid gap-[18px] rounded-lg border border-border bg-[var(--bg-sunken)] p-[clamp(22px,4vw,32px)] min-[720px]:grid-cols-[1fr_auto] min-[720px]:items-center">
              <div>
                <h2 className="m-0 font-display text-[24px] font-semibold text-text">
                  Public methodology and corrections
                </h2>
                <p className="mb-0 mt-[8px] text-[14px] leading-[1.7] text-text-secondary">
                  Review standards, source hierarchy and correction handling
                  are published. The application source is public so technical
                  implementation and content changes can be inspected.
                </p>
              </div>
              <div className="flex flex-col gap-[9px]">
                <Link
                  href={routes.editorialPolicy}
                  className="text-[13.5px] font-semibold text-primary-text no-underline"
                >
                  Editorial policy →
                </Link>
                <Link
                  href={routes.sources}
                  className="text-[13.5px] font-semibold text-primary-text no-underline"
                >
                  Official source register →
                </Link>
                <a
                  href="https://github.com/ajitbubu/dpdpact.net"
                  className="inline-flex items-center gap-[7px] text-[13.5px] font-semibold text-primary-text no-underline"
                >
                  <GitFork size={15} aria-hidden="true" /> Public repository
                </a>
              </div>
            </section>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
