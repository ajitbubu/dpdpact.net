import type { Metadata } from "next";

import { ExamClient } from "./exam-client";

export const metadata: Metadata = {
  title: "DPDP Act Certification Exam",
  description:
    "Sit the Certified DPDP Practitioner exam: 15 single-choice questions drawn from the Act, 20 minutes, pass at 70%. Every answer is reviewed with the provision it tests.",
  alternates: { canonical: "/exam" },
};

export default function ExamPage() {
  return <ExamClient />;
}
