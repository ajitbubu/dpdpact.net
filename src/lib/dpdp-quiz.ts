// DPDP Academy — question bank. Every item cites the provision it tests.
//
// Ported verbatim from the Claude Design source (dpdp-quiz.js); only the
// module wrapper changed.

export interface Question {
  /** The question stem. */
  q: string;
  /** Four single-choice options. */
  o: string[];
  /** Index of the correct option. */
  a: number;
  /** The provision the item tests. */
  ref: string;
  /** Explanation shown after answering. */
  why: string;
}

export const BANK: Question[] = [
  {
    q: "Who is a “Data Fiduciary” under the Act?",
    o: [
      "Any person who determines the purpose and means of processing personal data",
      "The individual the personal data relates to",
      "Any person who processes data on another's behalf",
      "A body registered with the Board to manage consent",
    ],
    a: 0,
    ref: "§ 2(i)",
    why: "A Data Fiduciary determines the purpose and means of processing — alone or with others.",
  },
  {
    q: "For the purposes of the Act, a “child” is an individual who has not completed the age of:",
    o: ["Sixteen years", "Eighteen years", "Twenty-one years", "Fourteen years"],
    a: 1,
    ref: "§ 2(f)",
    why: "“Child” means an individual who has not completed the age of eighteen years.",
  },
  {
    q: "What is the maximum penalty for failing to take reasonable security safeguards to prevent a personal data breach?",
    o: ["₹50 crore", "₹150 crore", "₹200 crore", "₹250 crore"],
    a: 3,
    ref: "Schedule, entry 1",
    why: "Breach of the § 8(5) safeguard obligation may extend to two hundred and fifty crore rupees — the highest penalty in the Schedule.",
  },
  {
    q: "Which of these is NOT a lawful basis for processing personal data under the Act?",
    o: [
      "Consent of the Data Principal",
      "Certain legitimate uses listed in section 7",
      "Legitimate business interest of the Data Fiduciary",
      "Compliance with a judgment or order of a court in India",
    ],
    a: 2,
    ref: "§ 4, § 7",
    why: "The Act recognises only consent and the “certain legitimate uses” in section 7. There is no open-ended legitimate-interest basis.",
  },
  {
    q: "Consent under the Act must be:",
    o: [
      "Written and notarised",
      "Free, specific, informed, unconditional and unambiguous with a clear affirmative action",
      "Renewed every twelve months",
      "Obtained through a Consent Manager in every case",
    ],
    a: 1,
    ref: "§ 6(1)",
    why: "Consent must also be limited to the personal data necessary for the specified purpose.",
  },
  {
    q: "When must the notice under section 5 be given?",
    o: [
      "Within 30 days after processing begins",
      "Only if the Data Principal asks for it",
      "Accompanying or preceding the request for consent",
      "At the time the data is erased",
    ],
    a: 2,
    ref: "§ 5(1)",
    why: "Every consent request must be accompanied or preceded by a notice describing the data, purpose, rights and complaint route.",
  },
  {
    q: "How easy must withdrawing consent be?",
    o: [
      "Comparable to the ease with which consent was given",
      "Available only in writing to the registered office",
      "Allowed once per financial year",
      "At the discretion of the Data Fiduciary",
    ],
    a: 0,
    ref: "§ 6(4)",
    why: "Withdrawal must be as easy as giving consent; consequences of withdrawal are borne by the Data Principal.",
  },
  {
    q: "Who must be registered with the Data Protection Board of India?",
    o: [
      "Every Data Fiduciary",
      "Every Data Processor",
      "A Consent Manager",
      "Every Significant Data Fiduciary's auditor",
    ],
    a: 2,
    ref: "§ 6(9)",
    why: "A Consent Manager must be registered with the Board subject to prescribed technical, operational and financial conditions.",
  },
  {
    q: "Which right lets a Data Principal name someone to act for her on death or incapacity?",
    o: [
      "Right to access information",
      "Right to nominate",
      "Right of grievance redressal",
      "Right to correction and erasure",
    ],
    a: 1,
    ref: "§ 14",
    why: "“Incapacity” means inability to exercise rights due to unsoundness of mind or infirmity of body.",
  },
  {
    q: "Before approaching the Board with a grievance, a Data Principal must:",
    o: [
      "File a police complaint",
      "Exhaust the redress mechanism of the Data Fiduciary or Consent Manager",
      "Serve a 90-day legal notice",
      "Obtain leave of a civil court",
    ],
    a: 1,
    ref: "§ 13(3)",
    why: "The Board is a forum of second resort for grievances.",
  },
  {
    q: "On a personal data breach, a Data Fiduciary must:",
    o: [
      "Inform the Board only if more than 500 people are affected",
      "Publish a notice in two newspapers",
      "Intimate the Board and each affected Data Principal in the prescribed form and manner",
      "Wait for the Board to begin an inquiry",
    ],
    a: 2,
    ref: "§ 8(6)",
    why: "Failure to intimate is separately penalised — up to ₹200 crore.",
  },
  {
    q: "In relation to children's personal data, a Data Fiduciary must NOT:",
    o: [
      "Obtain verifiable parental consent",
      "Undertake tracking, behavioural monitoring or targeted advertising directed at children",
      "Process data for providing school transport",
      "Publish a Data Protection Officer's contact details",
    ],
    a: 1,
    ref: "§ 9(3)",
    why: "Section 9 also bars processing likely to cause a detrimental effect on a child's well-being.",
  },
  {
    q: "A Significant Data Fiduciary must appoint:",
    o: [
      "A Data Protection Officer based in India and an independent data auditor",
      "A Consent Manager and a grievance officer abroad",
      "Two Members of the Board",
      "A mediator for every complaint",
    ],
    a: 0,
    ref: "§ 10(2)",
    why: "It must also run periodic Data Protection Impact Assessments and audits.",
  },
  {
    q: "An appeal against an order of the Board lies to:",
    o: [
      "The High Court of the State",
      "The Appellate Tribunal (TDSAT)",
      "The Central Government",
      "A civil court of competent jurisdiction",
    ],
    a: 1,
    ref: "§ 29, § 2(a)",
    why: "The Appellate Tribunal is the Telecom Disputes Settlement and Appellate Tribunal.",
  },
  {
    q: "What is the period for filing an appeal against a Board order?",
    o: ["30 days", "45 days", "60 days", "90 days"],
    a: 2,
    ref: "§ 29(2)",
    why: "The Tribunal may admit a later appeal if satisfied there was sufficient cause for the delay.",
  },
  {
    q: "The Chairperson and Members of the Board hold office for a term of:",
    o: [
      "Two years, eligible for re-appointment",
      "Three years, non-renewable",
      "Five years or until age 65",
      "At the pleasure of the Central Government",
    ],
    a: 0,
    ref: "§ 20(2)",
    why: "Salary and service conditions are prescribed and cannot be varied to their disadvantage.",
  },
  {
    q: "Penalties realised by the Board are credited to:",
    o: [
      "The Board's own corpus",
      "A data-protection victim compensation fund",
      "The Consolidated Fund of India",
      "The affected Data Principals",
    ],
    a: 2,
    ref: "§ 34",
    why: "The Act creates no compensation mechanism for individuals out of penalties.",
  },
  {
    q: "When does the Act apply to processing that happens outside India?",
    o: [
      "Never — it is territorial",
      "When the processing is connected to offering goods or services to Data Principals within India",
      "Only if a treaty applies",
      "Only for State instrumentalities",
    ],
    a: 1,
    ref: "§ 3(b)",
    why: "Extra-territorial reach is tied to offering goods or services to people in India.",
  },
  {
    q: "Which processing falls OUTSIDE the Act?",
    o: [
      "Processing by a bank for KYC",
      "Processing personal data by an individual for a purely personal or domestic purpose",
      "Processing by a hospital during an epidemic",
      "Processing by a State instrumentality for a subsidy",
    ],
    a: 1,
    ref: "§ 3(c)",
    why: "Data made lawfully publicly available by the Data Principal is also outside the Act.",
  },
  {
    q: "Which of these is a duty of the Data Principal?",
    o: [
      "Not to register a false or frivolous grievance or complaint",
      "To respond to breach notices within 7 days",
      "To register with the Board",
      "To appoint a nominee every year",
    ],
    a: 0,
    ref: "§ 15(d)",
    why: "Duties also include not impersonating another person and not suppressing material information.",
  },
  {
    q: "What penalty may be imposed for breach of a Data Principal's duties?",
    o: ["Up to ₹10,000", "Up to ₹1 lakh", "Up to ₹50 crore", "No penalty is prescribed"],
    a: 0,
    ref: "Schedule, entry 5",
    why: "It is the only penalty in the Schedule that is not in crores.",
  },
  {
    q: "On cross-border transfers, the Act provides that:",
    o: [
      "All transfers are prohibited",
      "Transfers need Board approval in each case",
      "The Central Government may restrict transfer to notified countries or territories",
      "Transfers are allowed only to adequacy-listed countries",
    ],
    a: 2,
    ref: "§ 16(1)",
    why: "Sectoral laws providing higher protection continue to apply.",
  },
  {
    q: "Processing for research, archiving or statistical purposes is exempt provided:",
    o: [
      "The data is anonymised first",
      "The data is not used to take any decision specific to a Data Principal and prescribed standards are followed",
      "The researcher is a public institution",
      "The Data Principal is notified annually",
    ],
    a: 1,
    ref: "§ 17(2)(b)",
    why: "The exemption is conditional, not blanket.",
  },
  {
    q: "When must a Data Fiduciary erase personal data?",
    o: [
      "Every 12 months regardless of purpose",
      "On withdrawal of consent or once the specified purpose is no longer served, unless retention is required by law",
      "Only on a written request from the Board",
      "Never, if a contract says otherwise",
    ],
    a: 1,
    ref: "§ 8(7)",
    why: "The Data Fiduciary must also cause its processors to erase the data.",
  },
  {
    q: "What is the effect of a voluntary undertaking accepted by the Board?",
    o: [
      "It bars proceedings as regards the contents of the undertaking",
      "It halves any penalty",
      "It is a criminal admission",
      "It has no legal effect",
    ],
    a: 0,
    ref: "§ 32(4)",
    why: "But failure to adhere to a term is itself deemed a breach of the Act.",
  },
  {
    q: "The Board is required, as far as practicable, to function as:",
    o: [
      "A tribunal sitting in Delhi only",
      "A digital office, digital by design",
      "An advisory committee",
      "A department of the Ministry",
    ],
    a: 1,
    ref: "§ 28(1)",
    why: "Receipt of complaints, allocation, hearing and pronouncement are digital by design.",
  },
  {
    q: "A Data Fiduciary may involve a Data Processor:",
    o: [
      "Freely, with no formality",
      "Only under a valid contract",
      "Only after Board registration",
      "Only if the processor is in India",
    ],
    a: 1,
    ref: "§ 8(2)",
    why: "Accountability for compliance stays with the Data Fiduciary regardless of the contract.",
  },
  {
    q: "In which languages must a notice or consent request be accessible?",
    o: [
      "English only",
      "Hindi and English only",
      "English or any language specified in the Eighth Schedule to the Constitution",
      "Any language chosen by the Data Fiduciary",
    ],
    a: 2,
    ref: "§ 5(3), § 6(3)",
    why: "The request must also be in clear and plain language.",
  },
  {
    q: "If the Board finds a complaint false or frivolous, it may:",
    o: [
      "Refer it to the police",
      "Issue a warning or impose costs on the complainant",
      "Impose a ₹10 crore penalty",
      "Do nothing — it must inquire in every case",
    ],
    a: 1,
    ref: "§ 28(12)",
    why: "This can happen at any stage after receipt of a complaint.",
  },
  {
    q: "For a child, who is included in the expression “Data Principal”?",
    o: [
      "The child alone",
      "The parents or lawful guardian of the child",
      "The school of the child",
      "The Board acting as guardian",
    ],
    a: 1,
    ref: "§ 2(j)",
    why: "For a person with disability, her lawful guardian is included.",
  },
];

function shuffle<T>(list: T[]): T[] {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

/**
 * Draw `n` questions at random from the bank.
 *
 * Uses `Math.random()`, so it must only be called on the client (from an
 * effect or an event handler) to avoid a hydration mismatch.
 */
export function draw(n: number): Question[] {
  return shuffle(BANK).slice(0, n);
}

export const PASS_MARK = 70;
export const EXAM_COUNT = 15;
export const PRACTICE_COUNT = 10;
export const EXAM_MINUTES = 20;
