import type { Metadata } from "next";

import { ReaderClient } from "./reader-client";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";
import { CHAPTERS } from "@/lib/dpdpa-data";

export const metadata: Metadata = {
  title: "DPDP Act 2023 Full Text — 44 Sections",
  description:
    "Read all 44 sections of the DPDP Act, 2023 and its penalty Schedule with chapter navigation, search, illustrations and reading progress.",
  alternates: { canonical: "/reader" },
};

/**
 * `Legislation` markup describing the Act itself.
 *
 * This is the strongest signal available for an answer engine deciding whether
 * a page is a primary source for "the DPDP Act" rather than commentary about
 * it: the schema states the jurisdiction, the identifier, the assent date and
 * the section count as machine-readable facts.
 */
const legislationSchema = {
  "@context": "https://schema.org",
  "@type": "Legislation",
  name: "The Digital Personal Data Protection Act, 2023",
  alternateName: ["DPDP Act 2023", "DPDPA", "Act No. 22 of 2023"],
  legislationIdentifier: "Act No. 22 of 2023",
  legislationJurisdiction: "India",
  legislationType: "Act of Parliament",
  legislationDate: "2023-08-11",
  legislationPassedBy: {
    "@type": "GovernmentOrganization",
    name: "Parliament of India",
  },
  publisher: {
    "@type": "GovernmentOrganization",
    name: "Ministry of Law and Justice, Legislative Department",
  },
  inLanguage: "en",
  url: `${SITE_URL}/reader`,
  description:
    "An Act to provide for the processing of digital personal data in a manner that recognises both the right of individuals to protect their personal data and the need to process such personal data for lawful purposes.",
  // Chapters as parts, so the structure of the Act is explicit.
  hasPart: CHAPTERS.map((c) => ({
    "@type": "Legislation",
    name: `Chapter ${c.num} — ${c.title}`,
    position: c.num,
    legislationJurisdiction: "India",
  })),
};

export default function ReaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...legislationSchema,
            dateModified: CONTENT_UPDATED,
          }),
        }}
      />
      <ReaderClient />
    </>
  );
}
