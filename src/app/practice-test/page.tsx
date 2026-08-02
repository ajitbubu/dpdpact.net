import type { Metadata } from "next";

import { PracticeTestClient } from "./practice-test-client";

export const metadata: Metadata = {
  title: "Free DPDP Act Practice Test",
  description:
    "Test yourself on the Digital Personal Data Protection Act, 2023. Ten questions drawn at random, an explanation and the governing section after every answer. Free and unlimited.",
  alternates: { canonical: "/practice-test" },
};

export default function PracticeTestPage() {
  return <PracticeTestClient />;
}
