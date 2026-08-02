import type { Metadata } from "next";

import { PracticeTestClient } from "./practice-test-client";

export const metadata: Metadata = {
  title: "Free DPDP Act Practice Test",
  description:
    "Take a free 10-question DPDP Act practice test with random questions, instant explanations and the governing section after every answer.",
  alternates: { canonical: "/practice-test" },
};

export default function PracticeTestPage() {
  return <PracticeTestClient />;
}
