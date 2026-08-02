import type { Metadata } from "next";

import { CertificationClient } from "./certification-client";
import { Faq } from "@/components/faq";
import { SITE_URL } from "@/lib/site";

const FAQ = [
  {
    q: "Is the DPDP Act certification free?",
    a: "Yes. The practice test, the graded exam and the certificate are all free, with no sign-up and no card. Most DPDP and DPO certifications in India are priced between ₹1,500 and ₹50,000.",
  },
  {
    q: "How long does the DPDP certification exam take?",
    a: "Twenty minutes. The paper is 15 single-choice questions drawn at random from a 30-item bank covering all nine chapters and the Schedule, and it submits itself when the clock runs out.",
  },
  {
    q: "What is the pass mark for the DPDP exam?",
    a: "70%, which is 11 correct out of 15. Score that or higher and the certificate is issued the moment you submit, with a credential ID and the issue date.",
  },
  {
    q: "Is this a government-recognised DPDP certification?",
    a: "No. It is an educational assessment, not a government-issued qualification and not legal advice. The Data Protection Board of India does not accredit training providers, and no DPDP certification in India is government-issued.",
  },
  {
    q: "Can I retake the DPDP exam?",
    a: "Yes, as many times as you like. Questions are drawn at random each attempt, and there is no cooling-off period or limit.",
  },
  {
    q: "Who is the DPDP certification for?",
    a: "Compliance officers, Data Protection Officers, privacy and legal professionals, and students who need a working command of the Act. Every question cites the provision it tests, so a wrong answer points at what to re-read.",
  },
];

export const metadata: Metadata = {
  title: "Free DPDP Act Certification",
  description:
    "Earn a free DPDP Act certificate: 15 questions, 20 minutes and 70% to pass, with an instant result and credential ID.",
  alternates: { canonical: "/certification" },
};

/**
 * `Course` markup so the certification can surface as a rich result.
 * `offers` is priced at zero because the exam is genuinely free — that is the
 * differentiator against the paid DPO programmes this competes with.
 */
const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Certified DPDP Practitioner",
  description:
    "A graded assessment of the Digital Personal Data Protection Act, 2023 — nine chapters, forty-four sections and the Schedule of penalties.",
  url: `${SITE_URL}/certification`,
  provider: {
    "@type": "Organization",
    name: "DPDP Academy",
    url: SITE_URL,
  },
  educationalCredentialAwarded: "Certified DPDP Practitioner",
  inLanguage: "en",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    category: "Free",
    availability: "https://schema.org/InStock",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    courseWorkload: "PT20M",
  },
};

export default function CertificationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <CertificationClient faq={<Faq items={FAQ} heading="Certification, answered" />} />
    </>
  );
}
