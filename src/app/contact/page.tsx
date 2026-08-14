import type { Metadata } from "next";
import Link from "next/link";
import {
  Bug,
  GitFork,
  LockKeyhole,
  Mail,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { routes } from "@/lib/routes";
import {
  CONTACT_EMAIL,
  HAS_LEGAL_ENTITY,
  LEGAL_ENTITY,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Corrections",
  description:
    "Reach DPDP Academy by email or through the public correction record: statutory corrections, technical defects, data-protection requests and feedback.",
  alternates: { canonical: "/contact" },
};

/**
 * Public issue routes.
 *
 * Kept alongside email rather than replaced by it. The repository is the
 * accountable record - a correction and its resolution stay readable by
 * anyone - and that is a genuine editorial asset. Email exists because the
 * people most worth hearing from will not open a GitHub account to reach you.
 */
const ISSUE_ROUTES = [
  {
    icon: Bug,
    title: "Content correction",
    body: "Identify the page, the disputed sentence, the governing source and your proposed correction. Statutory errors are treated as urgent.",
    label: "Open a correction issue",
    href: "https://github.com/ajitbubu/dpdpact.net/issues/new?labels=content&title=Content%20correction%3A%20",
  },
  {
    icon: GitFork,
    title: "Technical defect",
    body: "Broken links, inaccessible controls, rendering problems, stale offline content or any other reproducible defect.",
    label: "Open a technical issue",
    href: "https://github.com/ajitbubu/dpdpact.net/issues/new?labels=bug&title=Technical%20issue%3A%20",
  },
  {
    icon: MessageSquareText,
    title: "General feedback",
    body: "A guide, template, explanation or source that would make the public resource more useful than it currently is.",
    label: "Share feedback",
    href: "https://github.com/ajitbubu/dpdpact.net/issues/new?labels=feedback&title=Feedback%3A%20",
  },
] as const;

const FAQ = [
  {
    q: "How do I report an error in the DPDP Act text on this site?",
    a: `Email ${CONTACT_EMAIL} or open a correction issue with the section number and the wording you believe is wrong. The statutory text is reproduced from the MeitY publication and checked against it, so a discrepancy in the Act text is treated as urgent and corrected ahead of anything else.`,
  },
  {
    q: "Will DPDP Academy answer a legal question about my organisation?",
    a: "No. This is an educational resource, not a law firm, and it does not give advice on specific facts. Questions about how the Act applies to a particular organisation need a qualified practitioner who can take instructions and carry professional liability.",
  },
  {
    q: "How quickly are corrections handled?",
    a: "Statutory text errors are corrected as soon as they are verified against the Gazette or the MeitY publication. Other corrections are worked through in the order received. Every accepted correction changes the page and, where the change is material, the site's content-review date.",
  },
  {
    q: "Can I reuse or republish material from this site?",
    a: `The Act's text is a government work and carries its own terms; take it from the official source rather than from here if you intend to republish. For the explanatory material, ask at ${CONTACT_EMAIL} and say what you would like to use and where.`,
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}${routes.contact}#page`,
  url: `${SITE_URL}${routes.contact}`,
  name: `Contact ${SITE_NAME}`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  mainEntity: {
    "@id": `${SITE_URL}/#organization`,
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    ...(HAS_LEGAL_ENTITY ? { legalName: LEGAL_ENTITY.name } : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "corrections and feedback",
        email: CONTACT_EMAIL,
        url: `${SITE_URL}${routes.contact}`,
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        contactType: "data protection",
        email: CONTACT_EMAIL,
        url: `${SITE_URL}${routes.privacy}`,
        availableLanguage: "English",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <PageHero
          breadcrumb="Contact"
          path={routes.contact}
          eyebrow="Corrections · Defects · Data protection"
          title="Contact and"
          titleAccent="Corrections"
          lede="Email reaches a person. The public repository is the accountable record, where a correction and its resolution stay readable by anyone. Both routes are below; use whichever suits what you are reporting."
        />

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto w-full max-w-[920px] px-[var(--space-5)] py-[clamp(42px,6vw,72px)]">
            <div className="flex flex-col gap-[16px] rounded-lg border border-border-strong bg-surface p-[clamp(22px,4vw,32px)]">
              <div className="flex items-start gap-[12px]">
                <Mail
                  size={22}
                  aria-hidden="true"
                  className="mt-[3px] shrink-0 text-primary-text"
                />
                <div>
                  <h2 className="m-0 font-display text-[24px] font-semibold text-text">
                    Email
                  </h2>
                  <p className="mb-0 mt-[8px] max-w-[64ch] text-[15px] leading-[1.75] text-text-secondary">
                    One address, for every kind of message: corrections,
                    permissions, data-protection requests and anything that
                    should not be posted in public.
                  </p>
                </div>
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-mono text-[clamp(16px,2.6vw,21px)] font-semibold text-primary-text no-underline hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="m-0 max-w-[70ch] text-[13.5px] leading-[1.7] text-text-muted">
                Please say which page you mean and quote the sentence in
                question. A correction that names its source can be verified and
                applied the same day; one that does not has to be researched
                from scratch before anything can change.
              </p>
            </div>

            <h2 className="mb-[14px] mt-[40px] font-display text-[24px] font-semibold text-text">
              Or use the public record
            </h2>
            <div className="grid gap-[14px] min-[720px]:grid-cols-3">
              {ISSUE_ROUTES.map(({ icon: Icon, title, body, label, href }) => (
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
                    <h3 className="m-0 font-display text-[20px] font-semibold text-text">
                      {title}
                    </h3>
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

            <section className="mt-[24px] flex gap-[12px] rounded-lg border border-border bg-[var(--bg-sunken)] p-[20px]">
              <ShieldCheck
                size={20}
                aria-hidden="true"
                className="mt-[2px] shrink-0 text-primary-text"
              />
              <div>
                <h2 className="m-0 font-display text-[18px] font-semibold text-text">
                  Data-protection requests
                </h2>
                <p className="mb-0 mt-[7px] max-w-[74ch] text-[13.5px] leading-[1.68] text-text-secondary">
                  To ask what personal data this site holds about you, or to
                  have it corrected or erased, email {CONTACT_EMAIL} with
                  &ldquo;data protection&rdquo; in the subject line. The{" "}
                  <Link
                    href={routes.privacy}
                    className="font-semibold text-primary-text"
                  >
                    privacy policy
                  </Link>{" "}
                  sets out what is actually collected, which is very little:
                  study progress and exam results stay in your own browser and
                  are never sent to a server.
                </p>
              </div>
            </section>

            <aside className="mt-[14px] flex gap-[12px] rounded-lg border border-warning bg-warning-tint p-[20px]">
              <LockKeyhole
                size={20}
                aria-hidden="true"
                className="mt-[2px] shrink-0 text-warning-text"
              />
              <div>
                <h2 className="m-0 font-display text-[18px] font-semibold text-text">
                  Do not post personal or confidential information
                </h2>
                <p className="mb-0 mt-[7px] max-w-[74ch] text-[13.5px] leading-[1.68] text-text-secondary">
                  GitHub issues are public and are indexed by search engines.
                  Anything private belongs in email instead. Do not send
                  identity documents, account credentials, case files or
                  security-sensitive material through either route.
                </p>
              </div>
            </aside>

            {HAS_LEGAL_ENTITY ? (
              <section className="mt-[24px] border-t border-border pt-[24px]">
                <h2 className="m-0 font-display text-[20px] font-semibold text-text">
                  Who operates this site
                </h2>
                <p className="mb-0 mt-[8px] max-w-[74ch] text-[14px] leading-[1.7] text-text-secondary">
                  {SITE_NAME} is published by{" "}
                  <strong className="text-text">{LEGAL_ENTITY.name}</strong>
                  {LEGAL_ENTITY.form ? `, ${LEGAL_ENTITY.form}` : null}
                  {LEGAL_ENTITY.registrationNumber
                    ? ` (${LEGAL_ENTITY.registrationNumber})`
                    : null}
                  {LEGAL_ENTITY.jurisdiction
                    ? `, of ${LEGAL_ENTITY.jurisdiction}`
                    : null}
                  .
                </p>
              </section>
            ) : null}
          </div>
        </section>

        <Faq items={FAQ} heading="Getting in touch, answered" />
      </main>
      <SiteFooter />
    </div>
  );
}
