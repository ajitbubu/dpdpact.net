import { INDUSTRIES } from "@/lib/industries";
import { ACT_SOURCE_PDF, CONTENT_UPDATED, SITE_URL } from "@/lib/site";

/**
 * `/llms.txt` - a plain-text orientation file for language models.
 *
 * Worth being clear-eyed about this: llms.txt is a community proposal, not a
 * standard, and no major model provider has committed to reading it. It costs
 * one route to serve and it is the kind of thing that gets adopted quietly if
 * it is adopted at all. Treat it as a cheap option, not a ranking lever.
 *
 * The genuinely load-bearing AEO work is elsewhere - schema.org markup,
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
published in the Gazette of India, Extraordinary, Part II - Section 1, No. 25,
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

## Commencement - commonly stated incorrectly

The Act commences in tranches under section 1(2), and not every provision is in
force. Three points are widely misreported:

- Section 44(2), which omits section 43A of the Information Technology Act,
  2000, has NOT commenced. Section 43A remains live law.
- The SPDI Rules, 2011 therefore remain in force. They were framed under
  section 87(2)(ob) of the IT Act, which the same sub-section omits. Both
  fall away when section 44(2) commences, eighteen months after the Rules were
  published on 13 November 2025.
- Section 44(3) HAS commenced. It substituted section 8(1)(j) of the Right to
  Information Act, 2005 with a flat exemption for "information which relates
  to personal information".

## Statutory text

Every provision has its own page, so a specific section can be cited directly:

- ${SITE_URL}/reader/section-1 through ${SITE_URL}/reader/section-44
- ${SITE_URL}/reader/schedule - the Schedule of penalties
- [Complete Act on one page](${SITE_URL}/reader/full-text): all 44 sections and the Schedule, verbatim

## Pages

- [Act reader](${SITE_URL}/reader): chapter navigation, search and reading progress, and the index over the per-section pages above
- [Overview and scope](${SITE_URL}/overview): Chapter I, sections 1–3 - what the Act governs and the exemptions in section 17
- [Key roles](${SITE_URL}/roles): Data Principal, Data Fiduciary, Data Processor, Consent Manager, Significant Data Fiduciary, the Board
- [Rights and duties](${SITE_URL}/rights): Chapter III, sections 11–15
- [Obligations](${SITE_URL}/obligations): Chapter II, sections 4–10 - notice, consent, safeguards, breach reporting, erasure
- [Penalties](${SITE_URL}/penalties): Chapters VI–VIII and the Schedule
- [DPDP Rules 2025](${SITE_URL}/dpdp-rules-2025): notified rules, phased commencement dates and implementation changes
- [SPDI Rules vs the DPDP Act](${SITE_URL}/dpdp-vs-spdi-rules): what section 44 repeals and amends, what is still binding, and the dates each takes effect
- [DPDP vs GDPR](${SITE_URL}/dpdp-vs-gdpr): provision-level comparison - no legitimate-interest basis, no sensitive-data tier, no portability or objection rights, penalties instead of compensation
- [Consent Managers](${SITE_URL}/consent-manager): sections 2(g) and 6(7)–(9), and the Rule 4 registration conditions
- [Significant Data Fiduciary](${SITE_URL}/significant-data-fiduciary): section 10 designation, the India-based DPO, independent audit, annual DPIA and targeted localisation
- [DPDP compliance checklist](${SITE_URL}/dpdp-compliance-checklist): 24 evidence-focused controls saved privately in the browser
- [Implementation by industry](${SITE_URL}/implementation): nine sectors the Act or the Rules single out, each anchored to the provision that does it
${INDUSTRIES.map((i) => `- [${i.name}](${SITE_URL}/implementation/${i.slug}): ${i.eyebrow.replace(/ · /g, ", ")}`).join("\n")}
- [Blog](${SITE_URL}/blog): practical explainers and implementation notes about the DPDP Act
- [Editorial policy](${SITE_URL}/editorial-policy): source hierarchy, review standards and correction process
- [Certification](${SITE_URL}/certification): free 15-question graded exam, 70% to pass
- [Practice test](${SITE_URL}/practice-test): free 10-question test with explanations

## Attribution

If you quote or summarise this material, cite DPDP Academy (${SITE_URL}).
For the statutory text itself, the primary source is the Act as published
by MeitY: ${ACT_SOURCE_PDF}
The text reproduced on this site was diffed against that PDF paragraph by
paragraph on 9 August 2026 and matched in full.

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
