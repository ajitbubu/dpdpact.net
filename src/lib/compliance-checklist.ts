export interface ChecklistItem {
  id: string;
  text: string;
  evidence: string;
  reference: string;
}

export interface ChecklistGroup {
  id: string;
  title: string;
  owner: string;
  items: ChecklistItem[];
}

export const CHECKLIST_GROUPS: ChecklistGroup[] = [
  {
    id: "governance",
    title: "Governance & data mapping",
    owner: "Legal · Privacy · Business owners",
    items: [
      { id: "map-data", text: "Map the personal data, systems, purposes, recipients and retention points for material processing activities.", evidence: "Processing inventory with named owners", reference: "Act §§ 4, 8" },
      { id: "assign-roles", text: "Identify the Data Fiduciary and Data Processor for each processing relationship.", evidence: "Role map and approved contract position", reference: "Act § 2(i), § 2(k), § 8(1)" },
      { id: "lawful-ground", text: "Record consent or the applicable certain legitimate use for every purpose.", evidence: "Purpose-and-ground register", reference: "Act §§ 4, 6–7" },
      { id: "retention", text: "Define retention triggers and lawful overrides instead of retaining data indefinitely.", evidence: "Approved retention schedule", reference: "Act § 8(7)–(8)" },
    ],
  },
  {
    id: "notice-consent",
    title: "Notice & consent",
    owner: "Legal · Product · Design",
    items: [
      { id: "standalone-notice", text: "Provide a clear, standalone notice that itemises personal data and each specified purpose.", evidence: "Versioned notice and screen captures", reference: "Act § 5 · Rule 3" },
      { id: "consent-standard", text: "Use an affirmative action for consent that is free, specific, informed, unconditional and unambiguous.", evidence: "Consent journey and acceptance criteria", reference: "Act § 6(1)" },
      { id: "withdrawal", text: "Make withdrawal as easy as giving consent and propagate it to downstream processors.", evidence: "Tested withdrawal workflow", reference: "Act § 6(4)–(7)" },
      { id: "languages", text: "Make notices and consent requests accessible in English or an Eighth Schedule language chosen by the individual.", evidence: "Language coverage record", reference: "Act §§ 5–6" },
    ],
  },
  {
    id: "security-breach",
    title: "Security & breach response",
    owner: "Security · Engineering · Incident response",
    items: [
      { id: "safeguards", text: "Implement documented technical and organisational safeguards appropriate to the processing risk.", evidence: "Control register and test evidence", reference: "Act § 8(5) · Rule 6" },
      { id: "processor-controls", text: "Flow security, cooperation, deletion and breach duties into processor contracts.", evidence: "Signed DPA and processor schedule", reference: "Act § 8(2) · Rule 6" },
      { id: "breach-playbook", text: "Maintain a playbook for notifying affected Data Principals and the Board without delay.", evidence: "Approved and exercised response plan", reference: "Act § 8(6) · Rule 7" },
      { id: "breach-72", text: "Prepare the fuller Board submission required within seventy-two hours unless an extension is allowed.", evidence: "Notification template and decision log", reference: "Rule 7(2)(b)" },
    ],
  },
  {
    id: "rights",
    title: "Data Principal rights",
    owner: "Privacy operations · Support · Engineering",
    items: [
      { id: "rights-channel", text: "Publish an accessible channel and identifiers for submitting rights requests.", evidence: "Published instructions and request form", reference: "Act §§ 11–14 · Rule 14" },
      { id: "identity", text: "Verify the requester proportionately without collecting unnecessary additional data.", evidence: "Identity-verification procedure", reference: "Rule 14" },
      { id: "correction-erasure", text: "Route correction and erasure requests across production systems and processors.", evidence: "End-to-end workflow test", reference: "Act § 12" },
      { id: "grievance", text: "Provide grievance redressal with ownership, tracking and escalation to the Board.", evidence: "SLA, escalation path and case log", reference: "Act § 13" },
    ],
  },
  {
    id: "children",
    title: "Children & protected users",
    owner: "Product · Trust & safety · Legal",
    items: [
      { id: "identify-children", text: "Identify journeys likely to involve children and apply an appropriate age-assurance approach.", evidence: "Child-user journey assessment", reference: "Act § 9 · Rules 10–12" },
      { id: "parental-consent", text: "Obtain verifiable parental consent before processing a child's personal data unless a valid exemption applies.", evidence: "Consent verification record", reference: "Act § 9(1) · Rule 10" },
      { id: "prohibited-processing", text: "Prevent detrimental processing, tracking, behavioural monitoring and targeted advertising directed at children.", evidence: "Product controls and advertising rules", reference: "Act § 9(2)–(3)" },
      { id: "guardian", text: "Verify lawful guardianship when a guardian acts for a person with disability.", evidence: "Guardian verification procedure", reference: "Rule 11" },
    ],
  },
  {
    id: "assurance",
    title: "Assurance & readiness",
    owner: "Leadership · Audit · Procurement",
    items: [
      { id: "vendor-inventory", text: "Maintain an inventory of processors, sub-processors, locations and contract owners.", evidence: "Current vendor and data-flow register", reference: "Act § 8(2)" },
      { id: "request-testing", text: "Exercise consent withdrawal, rights, erasure and breach workflows before commencement.", evidence: "Test results and remediation log", reference: "Act §§ 6, 8, 11–14" },
      { id: "training", text: "Train teams with operational responsibilities and retain completion evidence.", evidence: "Role-based training register", reference: "Reasonable accountability practice" },
      { id: "review-notifications", text: "Assign responsibility for monitoring later Gazette notifications, amendments and Board directions.", evidence: "Regulatory watch owner and cadence", reference: "Act §§ 18–26, 40" },
    ],
  },
];

export const CHECKLIST_TOTAL = CHECKLIST_GROUPS.reduce(
  (total, group) => total + group.items.length,
  0,
);
