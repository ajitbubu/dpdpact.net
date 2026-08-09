import type { Metadata } from "next";

import { ExamClient } from "./exam-client";

export const metadata: Metadata = {
  title: "DPDP Act Certification Exam",
  description:
    "Take the 15-question Certified DPDP Practitioner exam in 20 minutes. Score 70% to pass; every answer cites the provision tested.",
  alternates: { canonical: "/exam" },
  // An interface, not a document: the questions render client-side once the
  // exam starts, so there is nothing here for a crawler but chrome. Indexing
  // it would only dilute the site's average page quality.
  robots: { index: false, follow: true },
};

export default function ExamPage() {
  return <ExamClient />;
}
