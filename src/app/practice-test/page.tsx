import type { Metadata } from "next";

import { PracticeTestClient } from "./practice-test-client";
import { breadcrumbSchema } from "@/lib/breadcrumbs";

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
      <PracticeTestClient />
    </>
  );
}
