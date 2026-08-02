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
  related: { label: string; href: string }[];
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
    updated: "2026-08-02",
    readTime: "8 min read",
    intro:
      "A DPDP consent journey is not complete because a checkbox exists. The notice, purpose language, affirmative action, withdrawal path and downstream system behaviour must work as one auditable flow.",
    sections: [
      {
        heading: "Start with the notice, not the checkbox",
        paragraphs: [
          "Section 5 and Rule 3 require the individual to receive a clear account of the personal data and the specified purpose before consent is requested. Product teams should translate the legal purpose into language a user can understand without opening a separate policy.",
          "The notice should stand on its own. Linking to a long privacy policy may provide additional context, but it should not carry the information the consent screen itself is required to communicate.",
        ],
        bullets: [
          "Itemise the personal data or meaningful categories involved.",
          "Describe each purpose specifically enough to distinguish it from another use.",
          "Explain withdrawal, rights, grievance handling and access to the Board.",
        ],
      },
      {
        heading: "Treat each purpose as a system decision",
        paragraphs: [
          "Consent under section 6 must be free, specific, informed, unconditional and unambiguous. A bundled decision creates operational ambiguity: when a person withdraws one purpose, the system cannot reliably determine which processing must stop.",
          "Maintain a purpose identifier that connects the wording shown to the individual with the systems, processors and retention rule activated by that choice.",
        ],
        bullets: [
          "Version the exact notice and consent language.",
          "Record the affirmative action, timestamp and purpose identifier.",
          "Test partial withdrawal and re-consent as first-class scenarios.",
        ],
      },
      {
        heading: "Design withdrawal before launch",
        paragraphs: [
          "Withdrawal must be as easy as giving consent. That requires more than a preference screen: processing based on the withdrawn consent must cease, processors must receive the change, and erasure must occur unless another law requires retention.",
          "A launch checklist should therefore include negative-path testing. Confirm what happens when the user has multiple accounts, a processor is temporarily unavailable, or a lawful retention override applies.",
        ],
      },
    ],
    sources: [
      { label: "DPDP Act reader — sections 5 and 6", href: "/reader" },
      { label: "DPDP Rules, 2025 Gazette", href: RULES_SOURCE },
    ],
    related: [
      { label: "DPDP Rules 2025 timeline", href: "/dpdp-rules-2025" },
      { label: "Compliance checklist", href: "/dpdp-compliance-checklist" },
    ],
  },
  {
    slug: "dpdp-breach-notification-guide",
    title: "DPDP breach notification: build the two-stage response",
    description:
      "Understand DPDP breach notifications to affected Data Principals and the Board, including the Rules' two-stage Board reporting process.",
    category: "Security & breach",
    published: "2026-08-02",
    updated: "2026-08-02",
    readTime: "8 min read",
    intro:
      "The DPDP framework does not make breach readiness a legal-team exercise after an incident. Detection, decision-making, evidence collection and communications must be designed before the clock starts.",
    sections: [
      {
        heading: "Know what triggers the workflow",
        paragraphs: [
          "The Act defines a personal data breach broadly: unauthorised processing or accidental disclosure, acquisition, sharing, use, alteration, destruction or loss of access that compromises confidentiality, integrity or availability.",
          "An incident workflow should therefore receive signals from security, reliability, support, vendors and business teams. Limiting intake to confirmed external attacks misses accidental and availability events.",
        ],
      },
      {
        heading: "Prepare two audiences and two Board stages",
        paragraphs: [
          "Rule 7 requires affected Data Principals to be informed without delay in a concise, clear and plain manner. The notice should explain the nature and likely consequences, mitigation already taken, recommended safety measures and a contact point.",
          "The Board receives an initial description without delay. A fuller submission follows within seventy-two hours unless the Board allows more time, including findings, circumstances, mitigation, responsible persons and communications to affected individuals.",
        ],
        bullets: [
          "Pre-approve individual and Board notification templates.",
          "Name the executive who can authorise communication.",
          "Track facts, decisions and timestamps from the first alert.",
        ],
      },
      {
        heading: "Make processors part of the clock",
        paragraphs: [
          "The Data Fiduciary remains accountable when processing is performed by a processor. Contracts should require prompt escalation, evidence preservation, continuing updates and cooperation with communications.",
          "Exercise the playbook with a processor outage or delayed fact pattern. A tabletop test is useful only if it reveals whether the organisation can produce the information the Rules actually request.",
        ],
      },
    ],
    sources: [
      { label: "DPDP Act reader — section 8", href: "/reader" },
      { label: "DPDP Rules, 2025 Gazette", href: RULES_SOURCE },
    ],
    related: [
      { label: "Security safeguard obligations", href: "/obligations" },
      { label: "Penalty framework", href: "/penalties" },
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
      { label: "Compliance checklist", href: "/dpdp-compliance-checklist" },
      { label: "Key roles explained", href: "/roles" },
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
      { label: "Consent notice guide", href: "/blog/dpdp-consent-notice-guide" },
      { label: "Breach notification guide", href: "/blog/dpdp-breach-notification-guide" },
    ],
  },
  {
    slug: "childrens-data-under-dpdp",
    title: "Children's data under the DPDP Act and Rules",
    description:
      "Understand verifiable parental consent, age assurance, prohibited processing and notified exemptions for children's personal data under DPDP.",
    category: "Children's data",
    published: "2026-08-02",
    updated: "2026-08-02",
    readTime: "7 min read",
    intro:
      "The DPDP Act defines a child as an individual under eighteen. Services likely to involve children need a product-level approach to age assurance, parental consent and prohibited processing—not a paragraph added to a privacy policy.",
    sections: [
      {
        heading: "Identify where age changes the journey",
        paragraphs: [
          "Map direct sign-up, invited users, household accounts, school or employer deployments and offline-to-online journeys. The right age-assurance method depends on the context and the risk of processing.",
          "Avoid collecting excessive identity data merely to establish age. The verification method should be proportionate and designed with security, retention and accessibility in mind.",
        ],
      },
      {
        heading: "Verify the parent or lawful guardian",
        paragraphs: [
          "Section 9 requires verifiable parental consent before processing a child's personal data, subject to notified exemptions. Rule 10 describes due diligence using reliable identity and age details or an authorised entity or virtual-token mechanism.",
          "Keep evidence that connects the verified adult, the child, the notice version, the purpose and the consent action without retaining unnecessary identity material.",
        ],
      },
      {
        heading: "Enforce the prohibitions in the product",
        paragraphs: [
          "The Act prohibits processing likely to cause detrimental effect on a child's well-being and restricts tracking, behavioural monitoring and targeted advertising directed at children.",
          "These are data-flow controls. Review analytics SDKs, advertising audiences, recommendation systems, experimentation platforms and processor defaults. A policy cannot override what the product continues to send.",
        ],
      },
    ],
    sources: [
      { label: "DPDP Act reader — section 9", href: "/reader" },
      { label: "DPDP Rules, 2025 Gazette", href: RULES_SOURCE },
    ],
    related: [
      { label: "Compliance checklist", href: "/dpdp-compliance-checklist" },
      { label: "DPDP penalties", href: "/penalties" },
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
      { label: "DPDP Act reader — section 10", href: "/reader" },
    ],
    related: [
      { label: "DPDP Rules 2025 timeline", href: "/dpdp-rules-2025" },
      { label: "Data Fiduciary obligations", href: "/obligations" },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
