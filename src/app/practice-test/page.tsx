import type { Metadata } from "next";
import Link from "next/link";

import { PracticeTestClient } from "./practice-test-client";
import { Faq } from "@/components/faq";
import { breadcrumbSchema } from "@/lib/breadcrumbs";
import { routes } from "@/lib/routes";

/**
 * Questions about practising, and only about practising.
 *
 * `/certification` owns the programme questions - cost, pass mark, audience -
 * and `/exam` owns the questions about sitting the paper. Repeating either set
 * here would put three of this site's own pages in the same result, and this
 * is the weakest of the three to win a query about the credential.
 */
const FAQ = [
  {
    q: "What is the difference between the DPDP practice test and the certification exam?",
    a: "The practice test is ten questions with the explanation shown immediately after each answer, no timer and no record. The certification exam is fifteen questions in twenty minutes, graded at the end, and issues a credential at seventy per cent. Practise here as often as you like; sit the exam once you are consistently getting eight or more right.",
  },
  {
    q: "Are the practice questions the same as the exam questions?",
    a: "They are drawn from the same thirty-item bank covering all nine chapters and the Schedule, so the subject matter and the difficulty match. Both draw at random, so a practice run and an exam sitting will not be the same paper.",
  },
  {
    q: "Do I need to read the DPDP Act before taking the practice test?",
    a: "No, and starting cold is a reasonable way to find out what you do not know. Every answer names the section it comes from and links to that provision, so a wrong answer tells you precisely what to read next.",
  },
  {
    q: "Which parts of the DPDP Act do the practice questions cover?",
    a: "All nine chapters and the Schedule of penalties: scope and applicability under sections 1 to 3, the roles and definitions in section 2, Data Fiduciary obligations in sections 4 to 10, Data Principal rights and duties in sections 11 to 15, the Data Protection Board and appeals in Chapters V to VII, and the seven penalty heads in the Schedule.",
  },
  {
    q: "Is my practice score kept?",
    a: "No. The running count resets the moment you reload the page, and nothing about a practice run is written to storage or sent anywhere. Only a passed certification exam produces a stored credential.",
  },
];

/** Where a wrong answer should send you. One row per themed study page. */
const STUDY = [
  {
    href: routes.overview,
    label: "Overview and scope",
    detail: "Sections 1–3: what the Act governs and when it reaches abroad",
  },
  {
    href: routes.roles,
    label: "Key roles",
    detail:
      "Section 2: Data Principal, Fiduciary, Processor, Consent Manager, the Board",
  },
  {
    href: routes.rights,
    label: "Rights and duties",
    detail: "Sections 11–15: access, correction, erasure, grievance, nomination",
  },
  {
    href: routes.obligations,
    label: "Obligations",
    detail:
      "Sections 4–10: lawful purpose, notice, consent, safeguards, breach, children",
  },
  {
    href: routes.penalties,
    label: "Penalties and the Schedule",
    detail: "Section 33 and the Schedule: seven heads, up to ₹250 crore",
  },
  {
    href: routes.readerFullText,
    label: "The full statutory text",
    detail: "All 44 sections verbatim, as published in the Gazette",
  },
];

export const metadata: Metadata = {
  title: "Free DPDP Act Practice Test",
  description:
    "Take a free 10-question DPDP Act practice test with random questions, instant explanations and the governing section after every answer.",
  alternates: { canonical: "/practice-test" },
};

export default function PracticeTestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Practice Test", path: "/practice-test" },
            ]),
          ),
        }}
      />
      <PracticeTestClient
        study={
          <>
            <section className="border-t border-border bg-[var(--bg-app)]">
              <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(20px,3vw,28px)] px-[var(--space-5)] py-[clamp(40px,5.4vw,66px)]">
                <div className="flex flex-col gap-[12px]">
                  <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary-text">
                    After a wrong answer
                  </span>
                  <h2 className="m-0 font-display text-[clamp(23px,3.2vw,32px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
                    Read the provision, not the summary
                  </h2>
                  <p className="m-0 max-w-[70ch] text-[15px] leading-[1.75] text-text-secondary">
                    Every question in the bank is answerable from the statute
                    itself. Each explanation names the governing section, and
                    each of these pages sets that section in context before
                    linking through to the verbatim text.
                  </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[12px]">
                  {STUDY.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex flex-col gap-[6px] rounded-lg border border-border bg-surface p-[18px] no-underline hover:border-primary-text"
                    >
                      <span className="font-display text-[16.5px] font-semibold leading-[1.3] text-text">
                        {item.label}
                      </span>
                      <span className="text-[13.5px] leading-[1.65] text-text-secondary">
                        {item.detail}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <Faq items={FAQ} heading="Practising, answered" />
          </>
        }
      />
    </>
  );
}
