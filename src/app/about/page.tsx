import type { Metadata } from "next";
import {
  BookOpenCheck,
  FileCheck2,
  GitFork,
  GraduationCap,
  Library,
  LockKeyhole,
  Scale,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Link from "next/link";

import { EditorialReview } from "@/components/editorial-review";
import { Faq } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { LEGAL_REVIEWED_ON } from "@/lib/editorial";
import { INDUSTRY_SLUGS } from "@/lib/industries-menu";
import { routes } from "@/lib/routes";
import { EXAM_COUNT, PASS_MARK, PRACTICE_COUNT } from "@/lib/dpdp-quiz";
import {
  ACT_SOURCE_PDF,
  CONTACT_EMAIL,
  HAS_LEGAL_ENTITY,
  LEGAL_ENTITY,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

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

/**
 * What the site actually publishes.
 *
 * Every number here is derived rather than typed: the industry count comes from
 * `INDUSTRY_SLUGS` and the exam figures from `dpdp-quiz`. A guide added or an
 * exam length changed updates this section on its own, which is the only way a
 * page like this stays true a year after it is written.
 */
const LIBRARY = [
  {
    icon: Library,
    title: "The Act, verbatim",
    body: `All 44 sections and the Schedule of penalties, reproduced as published in the Gazette. Every provision has its own page and its own stable URL, so a specific section can be cited directly.`,
    href: routes.reader,
    label: "Open the Act reader",
  },
  {
    icon: BookOpenCheck,
    title: "Explanatory guides",
    body: `Chapter-level explanations, a provision-level DPDP-versus-GDPR comparison, the notified Rules 2025 with their phased commencement dates, and ${INDUSTRY_SLUGS.length} sector implementation guides anchored to the provisions that single each sector out.`,
    href: routes.implementation,
    label: "Browse the guides",
  },
  {
    icon: Wrench,
    title: "Working tools",
    body: "An applicability checker, a penalty calculator built on the Schedule and the section 33(2) factors, a 24-control readiness checklist, and editable consent and breach templates in open formats.",
    href: routes.checklist,
    label: "Open the checklist",
  },
  {
    icon: GraduationCap,
    title: "Assessment",
    body: `A ${PRACTICE_COUNT}-question practice test with explanations after every answer, and a graded ${EXAM_COUNT}-question exam at ${PASS_MARK}% to pass. Both are free, with no sign-up and no card.`,
    href: routes.certification,
    label: "See the certification",
  },
] as const;

/**
 * Questions a reader asks before deciding whether to trust the site.
 *
 * Deliberately the awkward ones. A page that only answers the flattering
 * questions is the kind of page this site exists as an alternative to.
 */
const FAQ = [
  {
    q: "Is DPDP Academy an official government resource?",
    a: "No. It is an independent educational website, not affiliated with, endorsed by or operated by the Ministry of Electronics and Information Technology, the Data Protection Board of India, or any other government body. The Act's authoritative text is published by MeitY, and every page here links to it so you can check the reproduction against the original.",
  },
  {
    q: "Is the DPDP certification recognised by the government or an employer?",
    a: "It is not a government-issued qualification and is not accredited by the Data Protection Board. It is an educational assessment produced by this site: it evidences that you sat a graded test on the Act and scored above the pass mark, and nothing more. Treat it as study evidence rather than as a professional credential.",
  },
  {
    q: "Who writes the material on DPDP Academy?",
    a: "Content is published under the organisation-level bylines DPDP Academy Editorial and DPDP Academy Source Review. Those labels describe the work performed and are not a claim that a named lawyer has reviewed it. A personal byline will be added only with the contributor's approval, biography and relevant credentials.",
  },
  {
    q: "Can I rely on this site for legal advice?",
    a: "No. Nothing here is legal advice and no lawyer-client relationship arises from reading it. The statutory text is reproduced faithfully and the explanations cite the provisions they rest on, but applying the Act to a specific organisation needs a qualified practitioner who can take instructions and carry professional liability.",
  },
  {
    q: "How is the site funded?",
    a: "Everything is free to use with no account, no card and no paywall. There are no advertisements, no sponsored placements and no affiliate links, so no page is written to sell anything.",
  },
  {
    q: "How do I report an error?",
    a: `Email ${CONTACT_EMAIL} or open an issue in the public repository. Errors in the Act's text are corrected as soon as they are verified against the Gazette or the MeitY publication; every correction is recorded in the open.`,
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Independent educational resource for India's Digital Personal Data Protection Act, 2023 and the notified DPDP Rules, 2025.",
  sameAs: ["https://github.com/ajitbubu/dpdpact.net"],
  email: CONTACT_EMAIL,
  ...(HAS_LEGAL_ENTITY ? { legalName: LEGAL_ENTITY.name } : {}),
  publishingPrinciples: `${SITE_URL}${routes.editorialPolicy}`,
  knowsAbout: [
    "Digital Personal Data Protection Act, 2023",
    "Digital Personal Data Protection Rules, 2025",
    "Data Protection Board of India",
    "Indian data protection law",
  ],
};

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav active="about" />
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

            <section className="mt-[40px] border-t border-border pt-[32px]">
              <h2 className="m-0 font-display text-[28px] font-semibold text-text">
                What this site publishes
              </h2>
              <p className="mb-0 mt-[12px] max-w-[70ch] text-[15px] leading-[1.78] text-text-secondary">
                Everything is free to read, with no account and no paywall. The
                statutory text is reproduced verbatim; everything built on top
                of it is labelled as editorial explanation.
              </p>

              <div className="mt-[22px] grid gap-[14px] min-[720px]:grid-cols-2">
                {LIBRARY.map(({ icon: Icon, title, body, href, label }) => (
                  <article
                    key={title}
                    className="flex flex-col rounded-lg border border-border bg-surface p-[22px]"
                  >
                    <Icon
                      size={20}
                      aria-hidden="true"
                      className="mb-[14px] text-primary-text"
                    />
                    <h3 className="m-0 font-display text-[18px] font-semibold text-text">
                      {title}
                    </h3>
                    <p className="mb-0 mt-[8px] flex-1 text-[14px] leading-[1.7] text-text-secondary">
                      {body}
                    </p>
                    <Link
                      href={href}
                      className="mt-[14px] text-[13.5px] font-semibold text-primary-text no-underline"
                    >
                      {label} →
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-[40px] border-t border-border pt-[32px]">
              <h2 className="m-0 font-display text-[28px] font-semibold text-text">
                How the statutory text is kept accurate
              </h2>
              <p className="mb-0 mt-[12px] max-w-[70ch] text-[15px] leading-[1.78] text-text-secondary">
                A site that reproduces a statute is only worth reading if the
                reproduction can be checked. Three mechanisms make that
                possible, and all three are visible in the public repository.
              </p>

              <div className="mt-[22px] flex flex-col gap-[14px]">
                <article className="rounded-lg border border-border bg-surface p-[22px]">
                  <FileCheck2
                    size={20}
                    aria-hidden="true"
                    className="mb-[14px] text-primary-text"
                  />
                  <h3 className="m-0 font-display text-[18px] font-semibold text-text">
                    Diffed against the Government&apos;s own document
                  </h3>
                  <p className="mb-0 mt-[8px] text-[14px] leading-[1.7] text-text-secondary">
                    The transcription was compared paragraph by paragraph
                    against the Act as published by MeitY on 9 August 2026. All
                    365 paragraphs matched, the only differences being page
                    furniture the PDF extractor pulled out of the Gazette
                    margins.{" "}
                    <a
                      href={ACT_SOURCE_PDF}
                      className="font-semibold text-primary-text no-underline"
                    >
                      Read the source PDF
                    </a>{" "}
                    and check any provision yourself.
                  </p>
                </article>

                <article className="rounded-lg border border-border bg-surface p-[22px]">
                  <LockKeyhole
                    size={20}
                    aria-hidden="true"
                    className="mb-[14px] text-primary-text"
                  />
                  <h3 className="m-0 font-display text-[18px] font-semibold text-text">
                    Pinned so it cannot drift silently
                  </h3>
                  <p className="mb-0 mt-[8px] text-[14px] leading-[1.7] text-text-secondary">
                    The file holding the Act is fixed to a SHA-256 hash. Any
                    edit to the statutory text, deliberate or accidental, fails
                    the build until the change has been verified against the
                    MeitY publication and the hash updated in the same commit.
                    Prose can be improved; the Act cannot be quietly reworded.
                  </p>
                </article>

                <article className="rounded-lg border border-border bg-surface p-[22px]">
                  <Scale
                    size={20}
                    aria-hidden="true"
                    className="mb-[14px] text-primary-text"
                  />
                  <h3 className="m-0 font-display text-[18px] font-semibold text-text">
                    Every citation is resolved, not trusted
                  </h3>
                  <p className="mb-0 mt-[8px] text-[14px] leading-[1.7] text-text-secondary">
                    Section references in the industry guides are checked
                    against the sections that actually exist in the Act each
                    time the site is built. A guide citing a provision that is
                    not there does not ship. Where a claim rests on the Rules
                    rather than the Act, it is reported as unverified rather
                    than presented as checked.
                  </p>
                </article>
              </div>
            </section>

            <section className="mt-[40px] border-t border-border pt-[32px]">
              <h2 className="m-0 font-display text-[28px] font-semibold text-text">
                How this site treats your data
              </h2>
              <p className="mb-0 mt-[12px] max-w-[70ch] text-[15px] leading-[1.78] text-text-secondary">
                A site teaching a data protection law should be legible under
                that law. There is no account and no sign-up, so there is no
                user record to hold. Checklist progress, reading position and
                exam results are stored in your own browser and are never
                transmitted to the site. Analytics load only after you consent
                to them, and the consent banner is served from this domain
                rather than a third-party network, so asking you about tracking
                does not itself hand you to another party.
              </p>
              <div className="mt-[16px] flex flex-wrap gap-x-[22px] gap-y-[9px]">
                <Link
                  href={routes.privacy}
                  className="text-[13.5px] font-semibold text-primary-text no-underline"
                >
                  Privacy policy →
                </Link>
                <Link
                  href={routes.cookies}
                  className="text-[13.5px] font-semibold text-primary-text no-underline"
                >
                  Cookie policy →
                </Link>
              </div>
            </section>

            <section className="mt-[40px] border-t border-border pt-[32px]">
              <h2 className="m-0 font-display text-[28px] font-semibold text-text">
                How the statutory text is kept honest
              </h2>
              <p className="mb-0 mt-[12px] max-w-[70ch] text-[15px] leading-[1.78] text-text-secondary">
                Most sites that reproduce an Act retype it once and never check
                it again. Reproducing a statute incorrectly is the worst thing a
                resource like this can do, because a reader has no way to catch
                it, so the text here is held to a mechanical check rather than
                to good intentions.
              </p>
              <p className="mb-0 mt-[14px] max-w-[70ch] text-[15px] leading-[1.78] text-text-secondary">
                The transcription was compared against the MeitY publication
                paragraph by paragraph on {LEGAL_REVIEWED_ON}:{" "}
                <strong className="text-text">365 of 365 paragraphs matched</strong>
                , the only differences being page furniture the PDF extractor
                pulled out of the Gazette margins. The file holding that text is
                then pinned by a SHA-256 hash recorded in the build scripts. If
                a single character of the Act changes — deliberately, or through
                a stray find-and-replace across the repository — the build fails
                until someone re-verifies the text against the Government&apos;s
                own document and updates the hash in the same commit.
              </p>
              <p className="mb-0 mt-[14px] max-w-[70ch] text-[15px] leading-[1.78] text-text-secondary">
                Explanatory pages carry no such guarantee and do not pretend to.
                They are editorial summaries, they cite the provision they rest
                on, and they are the part of the site most worth arguing with.
              </p>
              <div className="mt-[16px] flex flex-wrap gap-x-[22px] gap-y-[9px]">
                <Link
                  href={routes.readerFullText}
                  className="text-[13.5px] font-semibold text-primary-text no-underline"
                >
                  Read the verbatim text →
                </Link>
                <Link
                  href={routes.glossary}
                  className="text-[13.5px] font-semibold text-primary-text no-underline"
                >
                  All 28 defined terms →
                </Link>
                <a
                  href={ACT_SOURCE_PDF}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13.5px] font-semibold text-primary-text no-underline"
                >
                  Check it against MeitY&apos;s PDF →
                </a>
              </div>
            </section>

            {HAS_LEGAL_ENTITY ? (
              <section className="mt-[40px] border-t border-border pt-[32px]">
                <h2 className="m-0 font-display text-[28px] font-semibold text-text">
                  Who operates {SITE_NAME}
                </h2>
                <p className="mb-0 mt-[12px] max-w-[70ch] text-[15px] leading-[1.78] text-text-secondary">
                  {SITE_NAME} is published by{" "}
                  <strong className="text-text">{LEGAL_ENTITY.name}</strong>
                  {LEGAL_ENTITY.form ? `, ${LEGAL_ENTITY.form}` : null}
                  {LEGAL_ENTITY.registrationNumber
                    ? ` (${LEGAL_ENTITY.registrationNumber})`
                    : null}
                  {LEGAL_ENTITY.jurisdiction
                    ? `, of ${LEGAL_ENTITY.jurisdiction}`
                    : null}
                  . Correspondence, including anything requiring a reply from a
                  person rather than a public thread, goes to{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-semibold text-primary-text"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </section>
            ) : null}

            <section className="mt-[40px] border-t border-border pt-[32px]">
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

            {/*
             * Disambiguation, not marketing.
             *
             * "DPDP" prefixes a crowded field of unrelated sites, several with
             * near-identical domains, and a reader who lands here from a search
             * has no way to tell which one they reached. Stating the identity
             * plainly is the cheapest correction available, and it is the same
             * fact the `Organization` schema on this page asserts.
             */}
            <section className="mt-[40px] border-t border-border pt-[32px]">
              <h2 className="m-0 font-display text-[28px] font-semibold text-text">
                Which site this is
              </h2>
              <p className="mb-0 mt-[12px] text-[15px] leading-[1.78] text-text-secondary">
                This is <strong className="text-text">{SITE_NAME}</strong>, at{" "}
                <strong className="text-text">dpdpact.net</strong>. It is not
                affiliated with, endorsed by or operated by the Ministry of
                Electronics and Information Technology, the Data Protection
                Board of India, or any other government body, law firm,
                university or compliance vendor. Several unrelated sites use
                similar names and near-identical domains; a page is part of this
                resource only if its address begins{" "}
                <code className="font-mono text-[13.5px] text-text">
                  https://dpdpact.net
                </code>
                .
              </p>
              <p className="mb-0 mt-[14px] text-[15px] leading-[1.78] text-text-secondary">
                Nothing here is a government-issued qualification. The
                certification is an educational assessment produced by this
                site, is not accredited by the Data Protection Board, and
                confers no legal or professional status. Where you need the
                authoritative text, the{" "}
                <Link
                  href={routes.sources}
                  className="font-semibold text-primary-text"
                >
                  official source register
                </Link>{" "}
                links to the Gazette and MeitY publications directly.
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
                  implementation and content changes can be inspected. If you
                  have found an error, write to{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-semibold text-primary-text"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
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

        <Faq items={FAQ} heading="About this resource, answered" />
      </main>

      <EditorialReview />
      <SiteFooter />
    </div>
  );
}
