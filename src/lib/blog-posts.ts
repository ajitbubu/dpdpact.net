import type { Route } from "next";

import { actPath } from "@/lib/act-sections";

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  published: string;
  updated: string;
  readTime: string;
  intro: string;
  sections: BlogSection[];
  sources: { label: string; href: string }[];
  related: { label: string; href: Route }[];
  downloads?: {
    label: string;
    description: string;
    href: string;
    format: "Markdown" | "CSV";
  }[];
}

const RULES_SOURCE =
  "https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf";
const COMMENCEMENT_SOURCE =
  "https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "dpdp-consent-notice-guide",
    title: "DPDP consent notices: what product teams need to ship",
    description:
      "A practical guide to DPDP consent notices, purpose-level consent, withdrawal and the implementation evidence product teams should retain.",
    category: "Consent management",
    published: "2026-08-02",
    updated: "2026-08-13",
    readTime: "13 min read",
    intro:
      "A DPDP consent journey is not complete because a checkbox exists. The notice, purpose language, affirmative action, withdrawal path and downstream system behaviour must work as one auditable flow.",
    sections: [
      {
        heading: "What section 5 actually requires in a notice",
        paragraphs: [
          "Section 5(1) is short and it is a list. Every request for consent must be accompanied or preceded by a notice telling the individual three things: the personal data and the purpose for which it is proposed to be processed, the manner in which she may exercise her rights under section 6(4) and section 13, and the manner in which she may complain to the Board. Rule 3 then requires that notice to be standalone, in clear and plain language, and to itemise rather than gesture.",
          "Most consent screens shipping in India today satisfy the first item and quietly skip the other two. A notice that describes what data is collected but never explains how to withdraw consent, how to exercise rights, or how to complain to the Data Protection Board is not a compliant notice - it is a data-collection statement wearing a notice's clothes.",
          "The three items are not decoration. They are the mechanism by which the Act's rights become reachable: a right the individual is never told about is a right she will not exercise.",
        ],
        bullets: [
          "The personal data, itemised - not a category label like usage data.",
          "Each specified purpose, described well enough to distinguish it from another use.",
          "How to withdraw consent, in the same place the consent is requested.",
          "How to exercise access, correction, erasure, grievance and nomination rights.",
          "How to complain to the Data Protection Board.",
        ],
      },
      {
        heading: "The notice must stand on its own",
        paragraphs: [
          "Rule 3 requires the notice to be standalone. That word is doing real work: it rules out the pattern where a consent checkbox carries one sentence and a link, and the actual disclosure lives fourteen screens deep in a privacy policy that also covers eight other products.",
          "A link to a fuller policy is fine as additional context. It cannot carry the information section 5 requires the notice itself to communicate. The test to apply in review is simple - if the reader never followed the link, would she still have received everything section 5(1) lists? If not, the notice is incomplete no matter how good the policy is.",
          "This is the single most common gap in consent flows built before the Rules were notified, because pre-Rules practice treated the privacy policy as the disclosure and the checkbox as the consent. The Rules separate them.",
        ],
      },
      {
        heading: "Language is a build requirement, not a localisation nice-to-have",
        paragraphs: [
          "Section 5(3) gives the individual the option to access the notice in English or any language specified in the Eighth Schedule to the Constitution. Section 6(3) repeats the requirement for the consent request itself. That is twenty-two scheduled languages plus English.",
          "The Act says option, not automatic translation into all of them - but the option has to be real and reachable at the point of consent. A product that renders its consent notice only in English has a design gap that no amount of back-end compliance work will close, and it is a gap that gets worse the more of India the product actually reaches.",
          "Treat the notice as versioned, translatable content with a content pipeline behind it, not as a hardcoded string in a component. Teams that hardcode it discover the problem when legal asks for the Marathi version two weeks before launch.",
        ],
      },
      {
        heading: "Consent has five adjectives, and each is a design constraint",
        paragraphs: [
          "Section 6(1) requires consent to be free, specific, informed, unconditional and unambiguous, given by a clear affirmative action, signifying agreement to processing for the specified purpose, and limited to such personal data as is necessary for that purpose.",
          "Read as engineering requirements rather than as legal adjectives, they rule out a familiar set of patterns. Pre-ticked boxes fail unambiguous and clear affirmative action. Consent bundled with terms of service fails free and specific. Consent that gates a service on processing unrelated to delivering it fails unconditional. Collecting fields you do not need for the stated purpose fails the necessity limb regardless of what the user agreed to.",
          "Section 6(2) adds a sharp edge: any part of consent that infringes the Act is invalid to the extent of the infringement. Consent is severable. An over-broad bundle does not fail safely as a whole - the compliant parts survive and the over-reaching parts simply are not consent, which usually means the processing that mattered most has no lawful basis.",
        ],
      },
      {
        heading: "Bundling is the failure that surfaces months later",
        paragraphs: [
          "Bundled consent rarely causes problems on the day it ships. It causes them the first time somebody withdraws. If one affirmative action covered account creation, marketing, analytics and a partner integration, then a withdrawal request arrives with no way to determine which processing must stop.",
          "The fix is architectural and it has to be in place before launch: a purpose identifier that travels with the consent record and connects three things - the exact wording the individual saw, the systems and processors that wording activated, and the retention rule that applies when it is revoked.",
          "Without that identifier, partial withdrawal is unimplementable, and teams end up either over-deleting (breaking the service) or under-deleting (continuing processing with no lawful basis). Both are worse than the modest cost of modelling purposes properly at the start.",
        ],
        bullets: [
          "Give every purpose a stable identifier, not a display name.",
          "Version the notice and consent copy; store the version with the event.",
          "Map each purpose to the systems, processors and retention rule it activates.",
          "Test partial withdrawal and re-consent as first-class flows, not edge cases.",
        ],
      },
      {
        heading: "Withdrawal must be as easy as consent - and that is a systems problem",
        paragraphs: [
          "Section 6(4) requires the ease of withdrawing to be comparable to the ease of giving. If consent was one tap at sign-up, withdrawal cannot require an email to support, a phone call during business hours, or navigating four levels of account settings.",
          "But the screen is the easy half. Section 6(6) requires the Data Fiduciary, within a reasonable time, to cease processing and to cause its Data Processors to cease. Withdrawal therefore has to propagate outward to every downstream system and every vendor that received the data under that purpose - which means you need to know who they are, which is the purpose map again.",
          "Section 6(5) provides useful relief in the other direction: the consequences of withdrawal are borne by the Data Principal, and withdrawal does not affect the legality of processing carried out before it. You are not required to unwind history. You are required to stop, and to make everyone acting for you stop.",
        ],
      },
      {
        heading: "Section 6(10) puts the burden of proof on you",
        paragraphs: [
          "This provision deserves more attention than it gets. Where consent is the basis of processing and a question arises in a proceeding, the Data Fiduciary is obliged to prove that a notice was given and that consent was given for the processing in accordance with the Act.",
          "The burden does not sit with the individual to show she never consented. It sits with the organisation to show she did. That inverts the evidentiary posture most consent implementations were built around, and it means a consent record is not internal hygiene - it is the thing standing between you and an adverse finding.",
          "A screenshot of the consent screen proves what the screen looked like at the time it was captured. It does not prove what this individual saw, when, in which language, or what the system did as a result. The record has to tie the person, the version, the action and the downstream effect together.",
        ],
      },
      {
        heading: "Consent Managers become real on 13 November 2026",
        paragraphs: [
          "Sections 6(7) to 6(9) create a role no other privacy law has: a registered intermediary through which an individual can give, manage, review and withdraw consent, accountable to her rather than to the organisations paying for the ecosystem. Rule 4 and the First Schedule set the registration conditions, including incorporation in India and a net worth of not less than two crore rupees.",
          "Registration opens on 13 November 2026, a full six months before most operational obligations commence on 13 May 2027. That ordering is deliberate and it matters for planning: the ecosystem is meant to exist before organisations must rely on it.",
          "For most Data Fiduciaries the practical question is not whether to become a Consent Manager but whether their consent architecture can accept and honour a consent decision that arrives from one. If your consent state is only ever written by your own front end, that integration will be a rebuild rather than a connector.",
        ],
      },
      {
        heading: "Consent obtained before the Act does not lapse - but it needs a notice",
        paragraphs: [
          "Section 5(2) handles the transition, and handles it more gently than many teams expect. Where consent was given before the Act commenced, the Data Fiduciary must, as soon as reasonably practicable, give the individual a notice covering the same three items - the data and purpose, how to exercise rights, how to complain to the Board.",
          "Crucially, section 5(2)(b) allows processing to continue until and unless she withdraws. There is no re-consent requirement and no cliff edge on which historic consent becomes void. What there is, is a notice obligation with no deadline attached other than reasonable practicability.",
          "The planning implication is that the legacy notice campaign is separable from the new-consent build. Teams often conflate the two and conclude they must re-paper their entire user base before May 2027. They must notify it. That is a different and much smaller project.",
        ],
      },
      {
        heading: "What to have in place before 13 May 2027",
        paragraphs: [
          "Most operational obligations, including sections 5 and 6, commence on 13 May 2027. The work that takes longest is not writing the notice copy - it is the purpose model underneath, because it touches every system that holds personal data.",
          "Sequence it so the architecture lands first and the copy lands last. Purpose identifiers, the map from purpose to systems and processors, and a withdrawal propagation path are all prerequisites for a notice that can honestly describe what happens. Copy written before that map exists tends to describe an intention rather than a behaviour.",
        ],
        bullets: [
          "A purpose register: every purpose, its identifier, its systems, its processors, its retention rule.",
          "Versioned notice and consent copy, translatable into Eighth Schedule languages.",
          "A consent event record adequate to discharge the section 6(10) burden.",
          "A withdrawal path that propagates to processors and is tested against them.",
          "A legacy notice plan under section 5(2) for consent obtained before commencement.",
        ],
      },
    ],
    sources: [
      { label: "DPDP Act reader - sections 5 and 6", href: "/reader" },
      { label: "DPDP Rules, 2025 Gazette", href: RULES_SOURCE },
    ],
    related: [
      { label: "DPDP Rules 2025 timeline", href: "/dpdp-rules-2025" },
      { label: "Downloadable DPDP compliance templates", href: "/dpdp-compliance-templates" },
      { label: "Section 6 - Consent", href: actPath("section-6") },
    ],
    downloads: [
      {
        label: "Consent notice drafting template",
        description: "A copy-ready Markdown structure for itemised purposes, affirmative choice, withdrawal, rights and the internal implementation record.",
        href: "/templates/dpdp-consent-notice-template.md",
        format: "Markdown",
      },
      {
        label: "Consent event register",
        description: "CSV columns for versioned consent and withdrawal evidence across systems and processors.",
        href: "/templates/dpdp-consent-register.csv",
        format: "CSV",
      },
    ],
  },
  {
    slug: "dpdp-breach-notification-guide",
    title: "DPDP breach notification: build the two-stage response",
    description:
      "Understand DPDP breach notifications to affected Data Principals and the Board, including the Rules' two-stage Board reporting process.",
    category: "Security & breach",
    published: "2026-08-02",
    updated: "2026-08-13",
    readTime: "12 min read",
    intro:
      "The DPDP framework does not make breach readiness a legal-team exercise after an incident. Detection, decision-making, evidence collection and communications must be designed before the clock starts.",
    sections: [
      {
        heading: "What actually counts as a personal data breach",
        paragraphs: [
          "Section 2(u) defines it broadly: any unauthorised processing, or accidental disclosure, acquisition, sharing, use, alteration, destruction or loss of access, that compromises the confidentiality, integrity or availability of personal data.",
          "Three words in that definition catch teams out. Accidental means intent is irrelevant - an email sent to the wrong recipient list qualifies. Alteration means a corrupting bug qualifies, not only a leak. And availability means a ransomware event that encrypts data you still hold, or a failed migration that loses access to it, is a breach even though nothing left the building.",
          "The practical consequence is that breach intake cannot be a security-team mailbox. Signals arrive from support (a user seeing another user's data), from reliability (a restore that failed), from vendors, and from engineers who notice a misconfigured bucket. If the intake path only understands external attacks, most reportable events will be classified as ordinary incidents and never reach the clock.",
        ],
      },
      {
        heading: "Two audiences, and they are not on the same clock",
        paragraphs: [
          "Section 8(6) requires intimation to the Board and to each affected Data Principal. Rule 7 then splits those into different timings, and this is the part most incident plans get wrong.",
          "Affected Data Principals must be informed without delay. There is no seventy-two hour grace period for telling the people whose data it is. The Board receives an initial intimation without delay as well, followed by fuller prescribed information within seventy-two hours, unless the Board allows longer on request.",
          "So the seventy-two hours is not the deadline for discovering what happened before you tell anyone. It is the deadline for the Board's detailed follow-up. Reading it as a general grace period is the single most expensive misreading of Rule 7, because it delays the individual notice that has no grace period at all.",
        ],
        bullets: [
          "Affected individuals: without delay, in the first stage.",
          "Board, stage one: intimation without delay.",
          "Board, stage two: prescribed detail within seventy-two hours, extendable on request.",
          "The clock starts on becoming aware, which makes detection capability a legal control.",
        ],
      },
      {
        heading: "Write the individual notice before the incident, not during it",
        paragraphs: [
          "The intimation to affected people has to describe the breach, its likely consequences, the measures being taken to mitigate risk, the safety measures they can take themselves, and the contact details of someone who can answer their questions.",
          "That last item connects to section 8(9), which requires publication of the business contact information of a Data Protection Officer, where applicable, or of a person able to answer questions about the processing. If nobody is named and reachable before an incident, the notice cannot be completed during one.",
          "Draft the template while calm. Incident-time writing produces either legalese nobody understands or reassurance that later turns out to be wrong, and both are worse than a plain description prepared in advance with the specifics left blank.",
        ],
      },
      {
        heading: "Rule 6 decides whether you can detect a breach at all",
        paragraphs: [
          "Section 8(5) requires reasonable security safeguards to prevent a breach. Rule 6 gives that content: measures such as encryption, obfuscation or masking, virtual tokens, access control, logs and monitoring, backups, and contractual measures binding processors.",
          "Two of those are really breach-response controls wearing security clothing. Logs and monitoring are what let you know an event happened and determine its scope. Backups are what turn an availability breach into a recoverable incident. An organisation with neither will discover breaches from its customers and will be unable to tell the Board what was affected.",
          "The Rules also require logs to be retained for a period sufficient to support investigation. Retention here works in the opposite direction to the erasure duty - you need the evidence to survive long enough to be useful. Those two obligations have to be reconciled deliberately rather than by whichever system happens to win.",
        ],
      },
      {
        heading: "Determining scope is the hard part, and it is a data problem",
        paragraphs: [
          "Every question the Board will ask is a scope question: which individuals, which data, over what period, through what route. Answering it requires knowing what personal data lives in the affected system and who it belongs to - which is the data inventory, built long before the incident.",
          "Organisations without a purpose and system map answer these questions by exporting everything and reading it, under time pressure, during an active incident. That is how seventy-two hours becomes impossible and how notices go out describing the wrong population.",
          "This is the strongest practical argument for doing the inventory work early. It is usually justified as a consent prerequisite, but its highest-value moment is the first serious incident.",
        ],
      },
      {
        heading: "Your processor's breach is your breach",
        paragraphs: [
          "Section 8(1) makes the Data Fiduciary responsible for compliance in respect of any processing undertaken by it or on its behalf, irrespective of any agreement to the contrary. A contractual clause allocating breach liability to a vendor does not move the statutory obligation.",
          "That means the notification duty is triggered by an event at a processor exactly as it is by one in your own systems - and your seventy-two hours does not restart because the vendor took a fortnight to tell you. Section 8(2) requires processors to be engaged under a valid contract; Rule 6 requires that contract to carry security measures.",
          "The clause that matters most is the notification clause, and it should require notice to you in hours rather than days, with a duty to preserve evidence and to co-operate with your investigation. Vendors will push back on tight timelines. The alternative is that you carry a statutory deadline you have no means of meeting.",
        ],
      },
      {
        heading: "Rehearse the decision, not just the technology",
        paragraphs: [
          "Most breach plans are tested as technical restores. The part that actually fails under pressure is the decision: is this a personal data breach, who decides, and on what evidence.",
          "Run the exercise on ambiguous cases rather than obvious ones - a misdirected export, a contractor who kept a copy, a logging bug that wrote personal data to an unsecured stream for months. Those are the ones where teams disagree, escalate slowly and lose the day that mattered.",
          "Record the decision and its reasoning either way. A defensible contemporaneous assessment concluding that an event was not reportable is worth far more later than a silent decision to do nothing.",
        ],
        bullets: [
          "A named decision-maker, with a named deputy, reachable out of hours.",
          "A written test for reportability, applied to ambiguous cases in advance.",
          "Pre-drafted individual and Board templates with the specifics left blank.",
          "A contact point published under section 8(9) before you need it.",
          "An evidence log started at the first signal, not after triage.",
        ],
      },
      {
        heading: "What the Schedule says about getting this wrong",
        paragraphs: [
          "The Schedule places breach-related failures at the top of the penalty range. Failure to take reasonable security safeguards to prevent a personal data breach carries a ceiling of two hundred and fifty crore rupees - the highest in the Act. Failure to notify the Board or affected Data Principals carries up to two hundred crore.",
          "Those are ceilings rather than tariffs. Section 33(2) requires the Board to have regard to the nature, gravity and duration of the breach, the type of personal data affected, whether the person mitigated the impact and how promptly, and their compliance history, among other factors.",
          "Read together, the two provisions reward exactly the behaviour a good plan produces: fast detection, prompt mitigation, honest and timely notification, and a record that shows all three. The organisation that reports quickly and mitigates well is being assessed on a different footing from the one that concealed the same event.",
        ],
      },
      {
        heading: "DPDP is not the only breach clock you are on",
        paragraphs: [
          "An Indian organisation handling a security incident is usually subject to more than one reporting duty at once, and the DPDP timeline is not the tightest of them.",
          "The CERT-In directions issued in April 2022 under section 70B(6) of the Information Technology Act, 2000 require specified cyber incidents to be reported within six hours of noticing them. Regulated sectors add more: banks, payment operators, insurers and market intermediaries carry their own incident-reporting obligations to the RBI, IRDAI or SEBI, with their own definitions and their own deadlines.",
          "These duties are cumulative, not alternative. Satisfying CERT-In does not discharge section 8(6), and telling the Board does not discharge a sectoral direction. A single incident-response runbook should carry every clock the organisation is on, side by side, because the six-hour one will expire while the team is still deciding whether the seventy-two-hour one has started.",
        ],
        bullets: [
          "CERT-In: six hours from noticing, for specified incident types.",
          "DPDP Board: intimation without delay, detail within seventy-two hours.",
          "Affected individuals: without delay, under Rule 7.",
          "Sectoral regulator: on its own terms, where you are regulated.",
          "Contractual: customer and partner notification clauses, often forty-eight hours.",
        ],
      },
      {
        heading: "The failures that recur",
        paragraphs: [
          "Incident reviews across organisations tend to surface the same handful of problems, and none of them are exotic. They are worth checking for directly rather than waiting to discover them under pressure.",
          "The most common is a detection gap: the event is real, but nothing in the estate would have surfaced it, so the clock never starts until a third party makes contact. The second is scope paralysis - the team knows a system was affected but cannot enumerate whose data was in it, so notification stalls while an export is analysed.",
          "The third is quieter and more damaging. Teams treat the seventy-two hours as permission to wait, and delay the individual notice that Rule 7 requires without delay. The Board's detailed report and the individual notice are different obligations with different timing, and conflating them converts a well-handled incident into a reporting failure.",
        ],
      },
      {
        heading: "What to build before 13 May 2027",
        paragraphs: [
          "The breach provisions commence with the main operational tranche on 13 May 2027. The build order matters, because the controls compound - detection makes notification possible, and inventory makes scope determination possible.",
          "Start with logging and inventory, because they have the longest lead time and the widest system footprint. Templates and decision procedures can be written in a week; the ability to answer which individuals were affected cannot.",
        ],
        bullets: [
          "Breach intake from security, support, reliability, vendors and engineering.",
          "Logging and monitoring adequate to detect and scope an event.",
          "A data inventory that maps systems to individuals and purposes.",
          "Processor contracts with tight notification and evidence-preservation duties.",
          "Pre-drafted notices for both audiences, and a published section 8(9) contact.",
          "A rehearsed reportability decision with a named owner.",
        ],
      },
    ],
    sources: [
      { label: "DPDP Act reader - section 8", href: "/reader" },
      { label: "DPDP Rules, 2025 Gazette", href: RULES_SOURCE },
    ],
    related: [
      { label: "Security safeguard obligations", href: "/obligations" },
      { label: "Downloadable breach response templates", href: "/dpdp-compliance-templates" },
      { label: "DPDP compliance deadline", href: "/dpdp-compliance-deadline" },
      { label: "Section 8 - General obligations of Data Fiduciary", href: actPath("section-8") },
    ],
    downloads: [
      {
        label: "Breach notification workbook",
        description: "A Markdown working file for first facts, Data Principal notice, both Board stages, processor coordination and closure.",
        href: "/templates/dpdp-breach-notification-workbook.md",
        format: "Markdown",
      },
      {
        label: "Breach incident register",
        description: "CSV columns for deadlines, submissions, evidence, ownership and corrective-action tracking.",
        href: "/templates/dpdp-breach-incident-register.csv",
        format: "CSV",
      },
    ],
  },
  {
    slug: "data-principal-request-workflow",
    title: "A practical Data Principal request workflow",
    description:
      "Design a DPDP request workflow for access information, correction, erasure, grievance redressal and nomination without creating operational dead ends.",
    category: "Data Principal rights",
    published: "2026-08-02",
    updated: "2026-08-02",
    readTime: "7 min read",
    intro:
      "A generic privacy inbox is not a rights programme. A dependable workflow identifies the requester, locates the relationship, assigns work across systems and processors, records decisions and preserves an escalation path.",
    sections: [
      {
        heading: "Publish an actionable entry point",
        paragraphs: [
          "Rule 14 expects Data Fiduciaries and Consent Managers to publish the means by which rights may be exercised and the identifiers needed to locate the relevant account or relationship.",
          "Ask only for information necessary to locate records and verify the requester. Requiring excessive identity data can create a new privacy and security risk.",
        ],
      },
      {
        heading: "Route the request by right and system",
        paragraphs: [
          "Access information, correction, erasure and grievance redressal do not follow the same operational path. Define the responsible team, source systems, processors, exceptions and evidence required for each.",
          "Erasure needs particular care. The organisation should distinguish data that is no longer necessary from data another law requires it to retain, record the override and schedule deletion when that obligation ends.",
        ],
        bullets: [
          "Create a case ID and acknowledgement.",
          "Verify identity proportionately.",
          "Search production systems and relevant processors.",
          "Record the response, exceptions and completion evidence.",
        ],
      },
      {
        heading: "Keep grievance handling from becoming a dead end",
        paragraphs: [
          "Section 13 gives the individual a grievance route before approaching the Board. Publish a contact point, set internal service levels and define escalation when the first-line team cannot resolve the matter.",
          "Analyse recurring requests and grievances. They often reveal notice language, retention logic or product controls that should be fixed at source rather than handled repeatedly as individual cases.",
        ],
      },
    ],
    sources: [
      { label: "Rights and duties study page", href: "/rights" },
      { label: "DPDP Rules, 2025 Gazette", href: RULES_SOURCE },
    ],
    related: [
      { label: "Compliance templates and request resources", href: "/dpdp-compliance-templates" },
      { label: "Data Principal rights explained", href: "/rights" },
      { label: "Section 13 - Right of grievance redressal", href: actPath("section-13") },
    ],
  },
  {
    slug: "dpdp-act-for-startups",
    title: "DPDP readiness for Indian startups: the first 90 days",
    description:
      "A focused 90-day DPDP readiness plan for Indian startups covering data mapping, notices, consent, vendors, rights, retention and breach response.",
    category: "Startups",
    published: "2026-08-02",
    updated: "2026-08-02",
    readTime: "8 min read",
    intro:
      "A startup does not need a large privacy department to begin DPDP readiness. It needs a reliable map, explicit ownership and a sequence that fixes product and operational dependencies before producing policy documents.",
    sections: [
      {
        heading: "Days 1–30: find the processing",
        paragraphs: [
          "List the customer, employee, prospect and vendor data the company actually uses. Connect each dataset to a purpose, system, processor, lawful ground, retention point and accountable owner.",
          "Start with high-volume and high-impact journeys such as onboarding, payments, support, analytics, recruiting and marketing. The goal is a useful decision map, not an exhaustive spreadsheet that nobody maintains.",
        ],
      },
      {
        heading: "Days 31–60: repair the public journeys",
        paragraphs: [
          "Rewrite notices around real purposes, separate consent where required and design withdrawal. Publish a rights and grievance channel that can locate records using identifiers the startup already controls.",
          "Review processors and sub-processors at the same time. Product changes cannot be made reliably without knowing which vendors receive the data and how deletion or incidents are communicated.",
        ],
      },
      {
        heading: "Days 61–90: prove the workflows",
        paragraphs: [
          "Test one withdrawal, one access or erasure request and one breach scenario end to end. Record where ownership, tooling or evidence fails and convert those gaps into a dated remediation backlog.",
          "Leadership should receive a short readiness report: material processing, top gaps, risk owners, target dates and decisions that require funding. This creates governance without pretending the programme is finished.",
        ],
        bullets: [
          "Do not wait for a perfect privacy policy before fixing the product.",
          "Do not assume a vendor's compliance replaces your accountability.",
          "Do not collect more data merely because storage is inexpensive.",
        ],
      },
    ],
    sources: [
      { label: "DPDP Rules 2025 timeline", href: "/dpdp-rules-2025" },
      { label: "Act commencement notification", href: COMMENCEMENT_SOURCE },
    ],
    related: [
      { label: "Interactive readiness checklist", href: "/dpdp-compliance-checklist" },
      { label: "Data Fiduciary obligations", href: "/obligations" },
      { label: "Section 17 - Exemptions", href: actPath("section-17") },
    ],
  },
  {
    slug: "dpdp-act-for-saas-companies",
    title: "DPDP for SaaS companies: map the role before the controls",
    description:
      "A practical DPDP guide for SaaS companies handling customer, workforce and product data as a Data Fiduciary, processor, or both.",
    category: "SaaS",
    published: "2026-08-02",
    updated: "2026-08-02",
    readTime: "8 min read",
    intro:
      "A SaaS company can be a Data Processor for customer-controlled product data and a Data Fiduciary for billing, security, workforce, account and marketing data. Controls fail when those roles are treated as one.",
    sections: [
      {
        heading: "Separate the processing relationships",
        paragraphs: [
          "Document who determines the purpose and means for each data flow. The contract label is relevant, but the operational decision-making is what makes the role map useful.",
          "A single customer relationship may contain several roles: processor for hosted records, fiduciary for user accounts, and independent fiduciary for fraud prevention or legal compliance where the SaaS provider determines that purpose.",
        ],
      },
      {
        heading: "Build processor cooperation into the platform",
        paragraphs: [
          "Customer-facing deletion, export, correction and incident features reduce manual work and help the customer discharge its own obligations. Document how sub-processors, backups and logs are treated rather than promising instant deletion everywhere.",
          "Contracts should define instructions, safeguards, incident escalation, sub-processing, rights assistance, return or deletion and audit evidence in terms that engineering and support can fulfil.",
        ],
      },
      {
        heading: "Control product analytics and secondary use",
        paragraphs: [
          "Telemetry collected to operate and secure a service should not drift into unrelated profiling or marketing without a documented purpose and ground. Keep purpose identifiers and access controls close to the data pipeline.",
          "For global SaaS products, map DPDP requirements beside GDPR and sector obligations without assuming one framework automatically satisfies another. A common control can have jurisdiction-specific triggers and notices.",
        ],
      },
    ],
    sources: [
      { label: "Key DPDP roles explained", href: "/roles" },
      { label: "DPDP Rules, 2025 Gazette", href: RULES_SOURCE },
    ],
    related: [
      { label: "Consent notice guide", href: blogPath("dpdp-consent-notice-guide") },
      { label: "Breach notification guide", href: blogPath("dpdp-breach-notification-guide") },
      { label: "Section 8 - General obligations of Data Fiduciary", href: actPath("section-8") },
    ],
  },
  {
    slug: "childrens-data-under-dpdp",
    title: "Children's data under the DPDP Act and Rules",
    description:
      "Understand verifiable parental consent, age assurance, prohibited processing and notified exemptions for children's personal data under DPDP.",
    category: "Children's data",
    published: "2026-08-02",
    updated: "2026-08-13",
    readTime: "11 min read",
    intro:
      "The DPDP Act defines a child as an individual under eighteen. Services likely to involve children need a product-level approach to age assurance, parental consent and prohibited processing-not a paragraph added to a privacy policy.",
    sections: [
      {
        heading: "Eighteen, not thirteen",
        paragraphs: [
          "Section 2(f) defines a child as an individual who has not completed the age of eighteen years. That single number is the most consequential design fact in the entire children's regime, and it is the one most often imported incorrectly from elsewhere.",
          "Products built to American norms assume thirteen, because that is where COPPA sits. Products built to European norms assume a member-state age between thirteen and sixteen under the GDPR. India sets it at eighteen with no sliding scale, which means a very large share of secondary-school and undergraduate users of an Indian consumer product are legally children.",
          "For an edtech platform, a gaming service or a social product with teenage users, this is not a narrow edge case to handle later. It may describe the majority of the user base, and it changes what the product is permitted to do with them.",
        ],
      },
      {
        heading: "Verifiable parental consent, before processing",
        paragraphs: [
          "Section 9(1) requires the Data Fiduciary, before processing any personal data of a child, to obtain verifiable consent of the parent. The obligation is a precondition, not a step that can be completed after onboarding.",
          "Verifiable is the operative word, and it sets a higher bar than the consent standard in section 6. Ordinary consent must be free, specific, informed, unconditional and unambiguous. Verifiable consent must additionally be attributable to a real adult who is genuinely this child's parent or lawful guardian - which is an identity problem, not a checkbox problem.",
          "A tick-box asserting I am over 18 or I am this child's parent verifies nothing. It records a claim. Where the Rules prescribe the manner, follow it exactly; where a product must design its own flow, the question to answer is what evidence would survive a Board asking how you knew that adult was that child's parent.",
        ],
      },
      {
        heading: "Persons with disability with a lawful guardian",
        paragraphs: [
          "Section 9(1) covers a second group in the same breath: a person with disability who has a lawful guardian. Verifiable consent of the lawful guardian is required on the same terms.",
          "This group is routinely dropped from implementations because it does not map onto an age check, and age is what engineering teams know how to build. Guardianship is a legal status established under other law, not something inferable from a date of birth, so the same flow will not detect it.",
          "The honest design answer is usually a declared route: a way for a guardian to identify themselves as acting for an adult with a lawful guardian, handled with the same verification rigour as parental consent, rather than an attempt to detect the situation automatically.",
        ],
      },
      {
        heading: "Two prohibitions that no consent can unlock",
        paragraphs: [
          "Sections 9(2) and 9(3) are not consent-gated. They are flat prohibitions, and this is the structural point teams most often miss: obtaining perfect verifiable parental consent does not license the conduct they forbid.",
          "Section 9(2) forbids processing likely to cause any detrimental effect on the well-being of a child. Section 9(3) forbids tracking, behavioural monitoring of children, and targeted advertising directed at children.",
          "A parent cannot consent to their child being behaviourally profiled for advertising, because the Act does not make that a matter for consent at all. Any product whose economics depend on advertising to under-eighteens in India needs to confront that at the business-model level rather than the consent-flow level.",
        ],
      },
      {
        heading: "What section 9(3) rules out in practice",
        paragraphs: [
          "Tracking and behavioural monitoring cover more than advertising pixels. Engagement optimisation that profiles a child's behaviour to decide what to show next, retention mechanics tuned on individual behavioural signals, and cross-service activity linking all sit uncomfortably close to the line.",
          "The safe reading is that a child account should not be subject to individual behavioural profiling for commercial optimisation. Aggregate, non-individualised analytics used to improve a service, and monitoring genuinely necessary for safety - abuse detection, for instance - are a different matter and are the strongest candidates for the carve-outs.",
          "This is the provision most likely to require a product change rather than a policy change, which is why it should be assessed early. A team that discovers in April 2027 that its recommendation system is not permissible for a third of its users has a rebuild, not a compliance task.",
        ],
      },
      {
        heading: "The Fourth Schedule carve-outs",
        paragraphs: [
          "Section 9(4) anticipated that a blanket rule would produce absurd results, and Rule 12 with the Fourth Schedule delivers the exceptions. Part A lists classes of Data Fiduciary exempt from sections 9(1) and 9(3); Part B lists exempt purposes.",
          "Part A begins with clinical establishments, mental health establishments and healthcare professionals, where processing is restricted to providing health services to the child. Without that carve-out, verifiable parental consent would gate a child's emergency care - which is exactly the outcome section 9(4) exists to prevent.",
          "Read the Schedule against your own activity rather than assuming either that it rescues you or that it does not apply. The exemptions are drawn by class and by purpose, and they are conditional - an exempt class processing for a non-exempt purpose is outside the carve-out.",
        ],
      },
      {
        heading: "Age assurance is the real engineering problem",
        paragraphs: [
          "Section 9 creates a duty that only bites once you know, or should know, that a user is a child - and the Act does not tell you how to find out. That gap is where most of the implementation effort actually goes.",
          "Three approaches exist and each has a cost. Self-declared age is cheap and weak. Verified identity is strong and excludes users who have no identity document, which disproportionately affects the children the provision protects. Inference from behaviour is a form of profiling and sits awkwardly beside section 9(3).",
          "There is no clean answer, which is why the decision should be made deliberately, documented with its reasoning, and revisited. A product that has never asked the question at all is in a materially worse position than one that chose a defensible method and wrote down why.",
        ],
      },
      {
        heading: "Section 9(5): a safe harbour that does not exist yet",
        paragraphs: [
          "Section 9(5) allows the Central Government, if satisfied that a Data Fiduciary processes children's data in a manner that is verifiably safe, to notify an age above which that Fiduciary is exempt from the section 9(1) and 9(3) obligations.",
          "This is a per-Fiduciary, discretionary mechanism rather than a general standard, and it is not something to build a launch plan around. Treat it as a possible future relief for organisations that have already built a strong regime, not as a route to avoid building one.",
          "The planning assumption for anything shipping before 13 May 2027 should be that sections 9(1) to 9(3) apply in full, with only the Fourth Schedule carve-outs available.",
        ],
      },
      {
        heading: "What an edtech, gaming or social product should build",
        paragraphs: [
          "The work divides into a determination layer, a consent layer and a restriction layer, and they are independent enough to be built in parallel by different teams.",
          "The restriction layer is the one to start with, because it is the one that can invalidate a product decision. Establishing which of your systems profile individuals, and whether they can be switched off per account, tells you early whether you have a configuration change or a rebuild.",
        ],
        bullets: [
          "An age determination method, chosen deliberately and documented with its reasoning.",
          "A verifiable parental consent flow that produces evidence, not a declaration.",
          "A separate route for lawful guardians of persons with disability.",
          "A per-account switch disabling behavioural profiling, tracking and targeted advertising.",
          "An assessment of section 9(2) well-being risk for features aimed at engagement.",
          "A Fourth Schedule assessment recording which carve-outs you rely on, and why.",
        ],
      },
      {
        heading: "How this differs from GDPR and COPPA",
        paragraphs: [
          "Teams porting an existing children's-privacy implementation into India usually find that the shape is familiar and the details are not. Three differences matter enough to redo the analysis rather than adapt it.",
          "The age is the first. COPPA sets thirteen; the GDPR sets a member-state age between thirteen and sixteen for information-society services; the DPDP Act sets eighteen with no variation. A user population that was largely adult under one regime can be largely child under this one.",
          "The second is that section 9(3) is a prohibition rather than a consent condition. Under the GDPR, profiling a child for marketing is lawful in principle with an appropriate basis and heightened safeguards. Under the DPDP Act, tracking, behavioural monitoring and targeted advertising directed at children are simply not permitted, and no consent cures that.",
          "The third is the absence of a general age-assurance standard. The GDPR requires reasonable efforts to verify consent taking available technology into account, and regulators have published detailed age-assurance guidance. The DPDP framework leaves the method to the Data Fiduciary, which places more of the burden of justifying the choice on you.",
        ],
      },
      {
        heading: "Write down the assessment, whatever you conclude",
        paragraphs: [
          "Because so much of section 9 turns on judgement - whether you have child users, whether a feature is behavioural monitoring, whether a Fourth Schedule carve-out applies - the record of how you decided is a substantial part of the compliance position.",
          "A short written assessment per product, revisited when the product changes materially, is enough. It should state whether children are expected users and on what evidence, which processing was assessed against section 9(3) and what was concluded, which carve-outs are relied on and why they apply, and what age-assurance method was chosen and what was rejected.",
          "The value of writing it down is not the document. It is that section 9(3) questions get answered by the people who know what the system does, at a point when the answer can still change the design, rather than by whoever is available during an inquiry.",
        ],
      },
      {
        heading: "Before 13 May 2027",
        paragraphs: [
          "Section 9 commences with the main operational tranche. The compliance work is unusually front-loaded compared with the rest of the Act, because two of the three obligations are product constraints rather than paperwork.",
          "Sequence it as: determine whether you have child users at all and roughly how many; assess which features section 9(3) forbids for them; then build consent and age assurance. Teams that reverse this order build an elaborate consent mechanism and then discover the underlying processing was never permissible.",
        ],
      },
    ],
    sources: [
      { label: "DPDP Act reader - section 9", href: "/reader" },
      { label: "DPDP Rules, 2025 Gazette", href: RULES_SOURCE },
    ],
    related: [
      { label: "Compliance checklist", href: "/dpdp-compliance-checklist" },
      { label: "DPDP penalties", href: "/penalties" },
      { label: "Section 9 - Personal data of children", href: actPath("section-9") },
    ],
  },
  {
    slug: "data-protection-officer-india-dpdp",
    title: "When does the DPDP Act require a Data Protection Officer?",
    description:
      "Understand when a Significant Data Fiduciary must appoint a DPO in India, what section 10 requires and what other organisations should prepare.",
    category: "Governance",
    published: "2026-08-02",
    updated: "2026-08-02",
    readTime: "6 min read",
    intro:
      "The DPDP Act does not require every Data Fiduciary to appoint a Data Protection Officer. The statutory DPO obligation attaches to an organisation designated as a Significant Data Fiduciary.",
    sections: [
      {
        heading: "Designation comes first",
        paragraphs: [
          "Under section 10, the Central Government may notify a Data Fiduciary or class as significant after considering factors such as volume and sensitivity, risk to Data Principals, sovereignty, electoral democracy, security and public order.",
          "Do not present an assumed revenue, employee or record threshold as law unless it appears in a valid notification. Monitor official notifications and document the person responsible for evaluating them.",
        ],
      },
      {
        heading: "What the statutory DPO role requires",
        paragraphs: [
          "A Significant Data Fiduciary must appoint a Data Protection Officer based in India who represents the organisation under the Act, is responsible to its board or similar governing body, and serves as the contact point for grievance redressal.",
          "The designation also brings a Data Protection Impact Assessment, periodic audit and other prescribed measures. The role therefore needs authority, access and operational support rather than a title alone.",
        ],
      },
      {
        heading: "Prepare accountability before designation",
        paragraphs: [
          "Organisations not designated as significant still need a published business contact capable of answering Data Principal questions and a grievance mechanism. Assigning privacy ownership can be sensible even where the statutory DPO title is not required.",
          "Keep the distinction explicit in public statements and contracts. Claiming to have a statutory DPO can create confusion if the organisation has not been designated and the role does not meet section 10.",
        ],
      },
    ],
    sources: [
      { label: "Key roles explained", href: "/roles" },
      { label: "DPDP Act reader - section 10", href: "/reader" },
    ],
    related: [
      { label: "DPDP Rules 2025 timeline", href: "/dpdp-rules-2025" },
      { label: "Data Fiduciary obligations", href: "/obligations" },
      { label: "Section 10 - Significant Data Fiduciary", href: actPath("section-10") },
    ],
  },
  {
    slug: "dpdp-data-retention-erasure-guide",
    title: "DPDP data retention and erasure: build the lifecycle",
    description:
      "Build a DPDP retention and erasure workflow that connects purpose completion, legal holds, processor deletion, notices and evidence.",
    category: "Retention & erasure",
    published: "2026-08-02",
    updated: "2026-08-13",
    readTime: "12 min read",
    intro:
      "DPDP retention is not a single number that can be copied into a policy. The defensible unit is a rule connecting a specified purpose, the event that completes it, any lawful retention requirement, every system copy and evidence of eventual erasure.",
    sections: [
      {
        heading: "Two independent triggers, whichever comes first",
        paragraphs: [
          "Section 8(7) requires a Data Fiduciary to erase personal data - and to cause its processors to erase it - on the earlier of two events: the Data Principal withdrawing her consent, or the point at which it is reasonable to assume the specified purpose is no longer being served.",
          "The phrase whichever is earlier does real work. Organisations tend to build only the first trigger, because withdrawal is an event that arrives with a request attached. The second trigger arrives silently: nobody asks for anything, and the obligation matures anyway.",
          "The whole duty is prefaced by unless retention is necessary for compliance with any law for the time being in force. That carve-out is genuine and it is narrower than it is usually treated as being - it is discussed further below.",
        ],
      },
      {
        heading: "Purpose no longer served is defined, not left to judgement",
        paragraphs: [
          "Section 8(8) supplies a test rather than leaving reasonableness at large. The purpose is deemed no longer served if the Data Principal does not approach the Data Fiduciary for the performance of the specified purpose, and does not exercise any of her rights in relation to the processing, for such period as may be prescribed.",
          "Note the conjunction. Both limbs must be satisfied. Someone who never logs in but files an access request has exercised a right, and the clock does not run. The deeming provision is an inactivity test on both fronts.",
          "Section 8(11) clarifies the first limb further: a Data Principal is considered not to have approached the Data Fiduciary during any period in which she has not initiated contact for the performance of the specified purpose. Passive receipt of your marketing email is not her approaching you.",
        ],
      },
      {
        heading: "The Third Schedule: three years, three classes",
        paragraphs: [
          "Rule 8(1) and the Third Schedule prescribe the period section 8(8) anticipated - but only for named classes. Those Data Fiduciaries must erase three years after the Data Principal last approached them or last exercised a right, or three years after the Rules commenced, whichever is latest, unless retention is required by law.",
          "The named classes come with user-count thresholds, and the thresholds are high. E-commerce entities and social media intermediaries are in scope at two crore or more registered users in India; online gaming intermediaries at fifty lakh or more.",
          "Read that carefully, because it is the most commonly misreported part of the Rules. There is no general three-year retention limit under the DPDP framework. There is a three-year rule for three classes of very large platform.",
        ],
        bullets: [
          "E-commerce entity: two crore or more registered users in India.",
          "Online gaming intermediary: fifty lakh or more registered users in India.",
          "Social media intermediary: two crore or more registered users in India.",
        ],
      },
      {
        heading: "If you are not in the Third Schedule, what applies?",
        paragraphs: [
          "For everyone else, section 8(7) still binds - the duty to erase on withdrawal or when the purpose is no longer served has not gone away. What is absent is a prescribed period that fixes the second trigger with a number.",
          "That is a harder position than having a deadline, not an easier one. You must form and document your own reasonable view of when each purpose stops being served, purpose by purpose, and be able to defend it. A retention schedule that says indefinite is not a view; it is the absence of one.",
          "The defensible approach is to set a period per purpose, tie it to the nature of that purpose, write down the reasoning, and review it. A three-year default borrowed from the Third Schedule may be reasonable for a consumer account and plainly unreasonable for a one-off enquiry form.",
        ],
      },
      {
        heading: "The legal-retention carve-out is narrower than it looks",
        paragraphs: [
          "Retention necessary for compliance with any law for the time being in force is a real and important exception. Tax records, statutory registers, sector-specific record-keeping under RBI, SEBI or IRDAI directions, and litigation holds all sit within it.",
          "Two limits are routinely overlooked. First, it is compliance with a law, not commercial convenience - we might need it for analytics, or it is useful for training a model, is not a legal requirement. Second, it justifies retaining the specific data the law requires for the period the law requires, not the whole record indefinitely.",
          "In practice this means the carve-out usually shrinks the dataset rather than exempting it. An invoice may need to survive for the statutory period; the browsing history that led to it does not. Mapping which fields are held under legal compulsion, and which merely travel with them, is the work most retention projects skip.",
        ],
      },
      {
        heading: "Erasure has to reach your processors",
        paragraphs: [
          "Section 8(7)(b) is explicit: the Data Fiduciary must cause its Data Processor to erase personal data that was made available to it. Erasing your own copy while a vendor keeps theirs does not discharge the duty, and section 8(1) makes you responsible for processing carried out on your behalf regardless of any contract to the contrary.",
          "This requires two things most organisations lack: a current list of which processors received which data under which purpose, and a contractual and technical route to instruct deletion and get confirmation.",
          "Ask vendors the awkward question early - what is your deletion SLA, does it cover backups, and what confirmation do you provide. The answers vary enormously, and discovering a vendor cannot delete on request is much cheaper before you have five years of data with them.",
        ],
      },
      {
        heading: "Backups, logs and the honest answer",
        paragraphs: [
          "Erasure runs into two systems that are designed to resist it. Backups exist precisely so that deleted things can come back, and logs are required by Rule 6 to be retained long enough to support breach investigation.",
          "The workable position is not to pretend these are erased on the same schedule as live data. It is to document them: state that live systems erase on the trigger, that backups age out on a defined cycle after which the data is unrecoverable, and that restoration from backup re-applies pending erasures. Then actually implement that last part, because it is where the design usually breaks.",
          "Logs need the same treatment in reverse. Where a log must retain personal data for investigation, hold it for a defined period tied to that purpose, minimise what is written, and erase on that schedule. Retention obligations pointing in opposite directions have to be reconciled explicitly, or the strictest system silently wins and the weakest silently loses.",
        ],
      },
      {
        heading: "Section 12 erasure on request is a different route",
        paragraphs: [
          "Alongside the automatic duty in section 8(7), section 12 gives the Data Principal a right to erasure on request. The two are easy to conflate and they behave differently: section 8(7) fires without anyone asking, while section 12 arrives as a request that must be handled through the published channel Rule 14 requires.",
          "A section 12 request also yields to the same legal-retention carve-out, so the answer is sometimes a partial erasure with an explanation rather than a clean deletion. Saying so plainly, with the provision relied on, is a better answer than a silent partial action.",
          "Build one erasure mechanism serving both routes. Organisations that build a rights-request workflow and a separate retention job usually find the two disagree, and the disagreement is discovered by a Data Principal.",
        ],
      },
      {
        heading: "Build a retention register with owners",
        paragraphs: [
          "The artefact that makes all of this tractable is a register: one row per purpose, recording what data is held for it, the trigger and period for erasure, the legal basis for any retention override, the systems and processors holding copies, and a named owner.",
          "It is the same register the consent work and the breach work need, viewed from a third angle - which is why doing it once, properly, is far cheaper than doing three partial versions for three projects.",
          "Owners matter more than the document. A retention rule with no named owner is not reviewed, and a rule that is not reviewed drifts from what the systems actually do within about two release cycles.",
        ],
        bullets: [
          "Purpose, and the data held for it.",
          "Erasure trigger and period, with the reasoning if not prescribed.",
          "Any legal retention override, naming the law and the fields it covers.",
          "Systems and processors holding a copy, with a deletion route for each.",
          "Backup ageing cycle and the re-application rule after a restore.",
          "A named owner and a review date.",
        ],
      },
      {
        heading: "Anonymisation is an alternative to deletion, if it is real",
        paragraphs: [
          "The Act applies to personal data - data about an identifiable individual. Data that genuinely cannot be linked back to a person is outside that definition, so irreversibly anonymising a dataset is a legitimate alternative to erasing it, and often a more useful one where the analytical value is real.",
          "The word carrying the weight is irreversibly. Removing a name while retaining a device identifier, an account number or a sufficiently distinctive combination of attributes is pseudonymisation, and pseudonymised data remains personal data because re-identification remains possible. Most of what organisations describe as anonymised is in fact pseudonymised.",
          "The honest test is adversarial: could this dataset be re-identified using other data we hold, or data that is publicly available? If yes, the retention duty still applies to it. Where anonymisation is genuine, record the method and the reasoning, because the claim that data fell outside the Act is one you may later have to support.",
        ],
      },
      {
        heading: "Getting the first pass done without boiling the ocean",
        paragraphs: [
          "A complete retention register across a mature estate is a long project, and treating it as an all-or-nothing exercise is the most reliable way to arrive at May 2027 with nothing in place.",
          "Sequence by risk instead. Start with the systems holding the most personal data about the most people, and with the purposes where the retention period is most obviously indefensible - the marketing list nobody has pruned since 2019, the support desk holding every attachment ever sent, the analytics warehouse with raw event data going back to launch.",
          "A register covering the top ten systems, with owners and real periods, is worth far more than a complete inventory that exists as a spreadsheet nobody executes against. Coverage can be extended; a policy that was never implemented anywhere cannot be defended at all.",
        ],
      },
      {
        heading: "What to do before 13 May 2027",
        paragraphs: [
          "Section 8 commences with the main operational tranche on 13 May 2027. If you are in a Third Schedule class, the three-year clock also runs from the Rules commencing, which means the first erasures under it fall due on a date you can calculate now.",
          "The long-lead item is finding the copies. Most organisations know their primary store and underestimate the analytics warehouse, the CRM, the support desk, the data lake and the vendor who has had a nightly export since 2021. Start there, because a retention rule you cannot execute everywhere is a policy rather than a control.",
        ],
      },
    ],
    sources: [
      { label: "DPDP Act reader - sections 6 and 8", href: "/reader" },
      { label: "DPDP Rules, 2025 Gazette - rule 8", href: RULES_SOURCE },
      { label: "Act commencement notification", href: COMMENCEMENT_SOURCE },
    ],
    related: [
      { label: "Data Principal request workflow", href: blogPath("data-principal-request-workflow") },
      { label: "Compliance checklist", href: "/dpdp-compliance-checklist" },
      { label: "Section 12 - Right to correction and erasure", href: actPath("section-12") },
    ],
  },
  {
    slug: "dpdp-processor-contracts-vendor-management",
    title: "DPDP processor contracts: clauses operations can prove",
    description:
      "Turn DPDP processor contracts into workable controls for instructions, safeguards, incidents, rights support, retention and evidence.",
    category: "Processors & vendors",
    published: "2026-08-02",
    updated: "2026-08-02",
    readTime: "8 min read",
    intro:
      "A processor clause is useful only when product, security, support and procurement can perform it. DPDP vendor governance should connect the signed terms to the real data flow, responsible owner and evidence produced during ordinary operations and incidents.",
    sections: [
      {
        heading: "Keep accountability with the Data Fiduciary",
        paragraphs: [
          "Section 8 makes the Data Fiduciary responsible for compliance in respect of processing undertaken by it or on its behalf. Section 8(2) permits engagement of a Data Processor only under a valid contract, so outsourcing the system does not outsource the accountability.",
          "Build a processor register from actual integrations, expense records and infrastructure-not only the contracts folder. For each processor, record the service, personal data, purpose, locations, sub-processors, owner and exit path.",
        ],
      },
      {
        heading: "Translate safeguards into enforceable terms",
        paragraphs: [
          "Rule 6 requires reasonable security safeguards for processing performed by a Data Fiduciary or its processor and specifically calls for an appropriate contractual provision on safeguards wherever applicable. The contract should point to a security schedule that can be assessed and updated.",
          "Incident escalation must arrive early enough for the Data Fiduciary to meet its own notification duties. Define the trigger, initial facts, continuing updates, evidence preservation and named communication channel instead of waiting for a complete forensic report.",
        ],
        bullets: [
          "Document instructions and permitted purposes.",
          "Set minimum access, logging, resilience and incident controls.",
          "Require cooperation with rights, erasure and regulatory inquiries.",
          "Define sub-processor notice, review and flow-down obligations.",
        ],
      },
      {
        heading: "Test the contract before renewal",
        paragraphs: [
          "Ask the service owner to demonstrate one rights request, one deletion path and one incident escalation. Compare the result with the signed terms and record gaps as renewal conditions or remediation work.",
          "Plan exit while the relationship is healthy. Specify export format, return or deletion, backup treatment, residual access, evidence and the time at which the processor must stop using the data. A termination clause without an executable owner is not an exit plan.",
        ],
      },
    ],
    sources: [
      { label: "DPDP Act reader - section 8", href: "/reader" },
      { label: "DPDP Rules, 2025 Gazette - rule 6", href: RULES_SOURCE },
    ],
    related: [
      { label: "DPDP guide for SaaS companies", href: blogPath("dpdp-act-for-saas-companies") },
      { label: "Breach notification guide", href: blogPath("dpdp-breach-notification-guide") },
      { label: "Section 8 - General obligations of Data Fiduciary", href: actPath("section-8") },
    ],
  },
  {
    slug: "dpdp-data-inventory-purpose-mapping",
    title: "DPDP data inventory: map purpose, systems and owners",
    description:
      "Create a practical DPDP data inventory linking personal data, purposes, legal grounds, notices, processors, retention and accountable owners.",
    category: "Data governance",
    published: "2026-08-02",
    updated: "2026-08-02",
    readTime: "7 min read",
    intro:
      "The DPDP Act does not prescribe a document called a record of processing activities. A maintained data inventory is nevertheless one of the simplest ways to make notices, consent, rights, safeguards, retention and processor oversight operate from the same facts.",
    sections: [
      {
        heading: "Map decisions, not just databases",
        paragraphs: [
          "A list of systems cannot explain why data is processed or what should happen when consent is withdrawn. Use one row or record per meaningful processing purpose and connect it to the data, people, source, destination and responsible owner.",
          "Begin with customer, workforce, applicant, vendor and prospect journeys. Interview the teams that run them and validate the answers against forms, event schemas, integrations, processor consoles and retention jobs.",
        ],
        bullets: [
          "Specified purpose and lawful ground.",
          "Data Principal group, data categories and collection source.",
          "Systems, processors, recipients and access owners.",
          "Notice or consent version, retention trigger and deletion method.",
        ],
      },
      {
        heading: "Use the map to test the notice",
        paragraphs: [
          "Rule 3 expects a standalone notice with an itemised description of personal data and the specified purpose. Compare each public notice with the current inventory to find hidden collection, vague purposes and secondary use that the user journey does not explain.",
          "Where consent is the ground, connect the purpose to the affirmative action and withdrawal control. Where section 7 is relied on, record the exact legitimate use rather than a generic label such as legal basis or business need.",
        ],
      },
      {
        heading: "Keep ownership and evidence current",
        paragraphs: [
          "Assign a business owner who can confirm the purpose and a technical owner who can identify systems and execute change. Review records when a product launches, a processor changes, an incident reveals an unknown flow or the law changes.",
          "Treat completeness as a managed risk rather than a one-time promise. Track unverified systems, stale records and unresolved owner questions, then prioritise the flows with the greatest volume, sensitivity or consequence for Data Principals.",
        ],
      },
    ],
    sources: [
      { label: "DPDP Act reader - sections 4 to 8", href: "/reader" },
      { label: "DPDP Rules, 2025 Gazette - rules 3 and 6", href: RULES_SOURCE },
    ],
    related: [
      { label: "Consent notice guide", href: blogPath("dpdp-consent-notice-guide") },
      { label: "Startup 90-day readiness plan", href: blogPath("dpdp-act-for-startups") },
      { label: "Section 5 - Notice", href: actPath("section-5") },
    ],
  },
];

/**
 * Every slug that actually exists, as a type.
 *
 * `typedRoutes` validates static routes but accepts anything after `/blog/`,
 * so it cannot catch a renamed post. This can: `blogPath` only compiles for a
 * slug that is really in `BLOG_POSTS` (or the hand-built primer route).
 */
export type BlogSlug =
  | "dpdp-consent-notice-guide"
  | "dpdp-breach-notification-guide"
  | "data-principal-request-workflow"
  | "dpdp-act-for-startups"
  | "dpdp-act-for-saas-companies"
  | "childrens-data-under-dpdp"
  | "data-protection-officer-india-dpdp"
  | "dpdp-data-retention-erasure-guide"
  | "dpdp-processor-contracts-vendor-management"
  | "dpdp-data-inventory-purpose-mapping"
  | "dpdp-act-2023-practical-primer";

export function blogPath(slug: BlogSlug): Route {
  return `/blog/${slug}` as Route;
}

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
