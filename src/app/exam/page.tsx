import type { Metadata } from "next";

import { ExamClient } from "./exam-client";
import { Faq } from "@/components/faq";
import { breadcrumbSchema } from "@/lib/breadcrumbs";

/**
 * Questions about sitting the paper.
 *
 * `/certification` answers the programme-level ones - what it costs, the pass
 * mark, who it is for - so these deliberately do not repeat them. Two pages
 * answering the same question compete with each other for it, and the exam is
 * the weaker page of the two to win on price or audience.
 */
const FAQ = [
  {
    q: "Is the DPDP Practitioner exam proctored?",
    a: "No. The online exam is un-proctored and open book: no camera, no screen recording and no invigilator. If your employer needs a supervised sitting, a proctored slot can be booked separately.",
  },
  {
    q: "How are the exam questions chosen?",
    a: "Fifteen single-choice questions are drawn at random from a thirty-question bank each time you sit the paper, covering all nine chapters of the Act and the Schedule of penalties. A retake draws a fresh set, so it is a different paper.",
  },
  {
    q: "Can I go back and change an answer?",
    a: "Yes. You can move freely between all fifteen questions until you submit, and there is no negative marking, so an unsure answer costs nothing. The paper submits itself when the twenty minutes run out.",
  },
  {
    q: "What happens if I do not pass the DPDP exam?",
    a: "You can retake it immediately, as often as you like, with no cooling-off period. Nothing is issued below seventy per cent and a failed attempt is not recorded anywhere.",
  },
  {
    q: "Do I need an account or an email address to take the exam?",
    a: "No. The only thing you type is the name to print on the certificate. Your result and credential are held in your own browser's local storage and never sent to a server, so clearing site data removes them.",
  },
  {
    q: "What does the DPDP certificate show?",
    a: "Your name exactly as typed, the score, the issue date and a credential ID in the form DPDP-2026-4271. It is an educational assessment, not a government-issued qualification.",
  },
];

export const metadata: Metadata = {
  title: "DPDP Act Certification Exam",
  description:
    "Take the 15-question Certified DPDP Practitioner exam in 20 minutes. Score 70% to pass; every answer cites the provision tested.",
  alternates: { canonical: "/exam" },
};

export default function ExamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: "Exam", path: "/exam" }]),
          ),
        }}
      />
      {/*
       * Server-rendered and passed in rather than built inside the client
       * component: it is the only part of this route a crawler can read, since
       * everything after the intro is state the exam produces at runtime.
       */}
      <ExamClient faq={<Faq items={FAQ} heading="Sitting the exam, answered" />} />
    </>
  );
}
