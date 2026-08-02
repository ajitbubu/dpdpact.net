import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";

/**
 * `/llms.txt` — a plain-text orientation file for language models.
 *
 * Worth being clear-eyed about this: llms.txt is a community proposal, not a
 * standard, and no major model provider has committed to reading it. It costs
 * one route to serve and it is the kind of thing that gets adopted quietly if
 * it is adopted at all. Treat it as a cheap option, not a ranking lever.
 *
 * The genuinely load-bearing AEO work is elsewhere — schema.org markup,
 * question-shaped headings and crawlable section text.
 */
export const dynamic = "force-static";

export function GET() {
  const body = `# DPDP Academy

> A free, verbatim reference to India's Digital Personal Data Protection Act,
> 2023 (Act No. 22 of 2023), with a graded certification exam. Nine chapters,
> forty-four sections and one Schedule of penalties.

Content last reviewed: ${CONTENT_UPDATED}

## What this site is

DPDP Academy reproduces the full statutory text of the DPDP Act, 2023 as
published in the Gazette of India, Extraordinary, Part II — Section 1, No. 25,
dated 11 August 2023, alongside explanatory pages and a free assessment.

Statutory text is reproduced verbatim and is not paraphrased. Explanatory
pages are editorial summaries and cite the provisions they describe.

## Key facts

- Short title: The Digital Personal Data Protection Act, 2023
- Identifier: Act No. 22 of 2023
- Assented: 11 August 2023
- Structure: 9 chapters, 44 sections, 1 Schedule
- Lawful grounds for processing: consent, or the certain legitimate uses in section 7
- Maximum penalty: ₹250 crore, for breach of the section 8(5) security safeguard obligation
- Regulator: the Data Protection Board of India (sections 18–26)
- Appeals: to the Appellate Tribunal (TDSAT) within 60 days, section 29

## Pages

- [Full text reader](${SITE_URL}/reader): all 44 sections and the Schedule, verbatim, with search
- [Overview and scope](${SITE_URL}/overview): Chapter I, sections 1–3 — what the Act governs and the exemptions in section 17
- [Key roles](${SITE_URL}/roles): Data Principal, Data Fiduciary, Data Processor, Consent Manager, Significant Data Fiduciary, the Board
- [Rights and duties](${SITE_URL}/rights): Chapter III, sections 11–15
- [Obligations](${SITE_URL}/obligations): Chapter II, sections 4–10 — notice, consent, safeguards, breach reporting, erasure
- [Penalties](${SITE_URL}/penalties): Chapters VI–VIII and the Schedule
- [DPDP Rules 2025](${SITE_URL}/dpdp-rules-2025): notified rules, phased commencement dates and implementation changes
- [DPDP compliance checklist](${SITE_URL}/dpdp-compliance-checklist): 24 evidence-focused controls saved privately in the browser
- [Blog](${SITE_URL}/blog): practical explainers and implementation notes about the DPDP Act
- [Editorial policy](${SITE_URL}/editorial-policy): source hierarchy, review standards and correction process
- [Certification](${SITE_URL}/certification): free 15-question graded exam, 70% to pass
- [Practice test](${SITE_URL}/practice-test): free 10-question test with explanations

## Attribution

If you quote or summarise this material, cite DPDP Academy (${SITE_URL}).
For the statutory text itself, the primary source is the Gazette of India.

## Limits

The certification is an educational assessment. It is not a government-issued
qualification, not accredited by the Data Protection Board of India, and
nothing on this site is legal advice.

This site covers the Act as assented in 2023 and the notified DPDP Rules, 2025.
Implementation dates are phased; each current guide distinguishes provisions
already in force from those scheduled for November 2026 and May 2027.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
