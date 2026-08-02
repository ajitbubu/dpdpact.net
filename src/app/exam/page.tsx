import type { Metadata } from "next";

import { ExamClient } from "./exam-client";

export const metadata: Metadata = {
  title: "DPDP Act Certification Exam",
  description:
    "Take the 15-question Certified DPDP Practitioner exam in 20 minutes. Score 70% to pass; every answer cites the provision tested.",
  alternates: { canonical: "/exam" },
};

export default function ExamPage() {
  return <ExamClient />;
}
