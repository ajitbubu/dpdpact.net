"use client";

import * as React from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";

/**
 * A decision path through section 3, not a questionnaire with a score.
 *
 * Every branch ends on a provision, and the wording of each question is kept
 * close to the statute so the answer can be checked against the text rather
 * than trusted. Nothing is sent anywhere — the whole thing is component state.
 */

type Verdict = {
  tone: "in" | "out";
  headline: string;
  because: string;
  refs: string[];
  next: string;
};

type Step = {
  id: string;
  question: string;
  hint: string;
  yes: string | Verdict;
  no: string | Verdict;
};

const OUT = (headline: string, because: string, refs: string[], next: string): Verdict => ({
  tone: "out",
  headline,
  because,
  refs,
  next,
});

const STEPS: Step[] = [
  {
    id: "personal",
    question: "Is any of it data about an individual who can be identified by it, or in relation to it?",
    hint: "That is the whole definition of personal data. A name, an account number, a device identifier tied to a person. Aggregate figures about no one in particular are not.",
    no: OUT(
      "The Act does not reach this",
      "The DPDP Act governs personal data. Data about no identifiable individual falls outside it entirely, however sensitive it may be commercially.",
      ["§ 2(t) — personal data"],
      "Nothing further to check here. If some of your data is personal and some is not, run this again for the part that is.",
    ),
    yes: "digital",
  },
  {
    id: "digital",
    question: "Is it in digital form, or collected on paper and digitised afterwards?",
    hint: "The Act is about digital personal data. Paper records that stay on paper are outside it — but the moment you scan or key them in, they are inside.",
    no: OUT(
      "Outside the Act, for now",
      "The Act applies to digital personal data: collected in digital form, or collected non-digitally and digitised subsequently. Records that remain non-digital are not covered.",
      ["§ 3(a)(i)–(ii)"],
      "Worth revisiting the day anyone scans the file. Digitisation is the trigger, not the original collection.",
    ),
    yes: "where",
  },
  {
    id: "where",
    question: "Is the processing carried out within the territory of India?",
    hint: "Where the processing happens, not where your company is registered.",
    yes: "domestic",
    no: "offering",
  },
  {
    id: "offering",
    question:
      "Is the processing connected with offering goods or services to individuals in India?",
    hint: "This is the extraterritorial limb. Note what it does not say: unlike GDPR, merely monitoring behaviour is not a trigger on its own.",
    no: OUT(
      "Outside the Act's reach",
      "Processing outside India reaches the Act only where it is in connection with an activity related to offering goods or services to Data Principals within India.",
      ["§ 3(b)"],
      "Other laws may still apply to you. This answers the DPDP question only.",
    ),
    yes: "domestic",
  },
  {
    id: "domestic",
    question:
      "Is this an individual processing the data purely for a personal or domestic purpose?",
    hint: "A private contacts list, family photographs. The exclusion attaches to the purpose, not to the person — an individual processing for a business purpose is not covered by it.",
    yes: OUT(
      "Excluded from the Act",
      "Personal data processed by an individual for any personal or domestic purpose is expressly outside the Act.",
      ["§ 3(c)(i)"],
      "This is an exclusion from scope, not an exemption within it. Nothing survives it.",
    ),
    no: "public",
  },
  {
    id: "public",
    question:
      "Was this data made publicly available by the individual herself, or by someone legally obliged to publish it?",
    hint: "Her own published contact details; a register a statute requires to be public. Not data that merely leaked, and not data a third party republished without obligation.",
    yes: OUT(
      "Excluded, for that data",
      "Personal data made or caused to be made publicly available by the Data Principal, or by any person under a legal obligation in India to publish it, is outside the Act. This is one of the sharpest divergences from GDPR, which has no equivalent carve-out.",
      ["§ 3(c)(ii)"],
      "Only the publicly-available data is excluded. Anything you hold beyond it is still in scope.",
    ),
    no: {
      tone: "in",
      headline: "The DPDP Act applies to this processing",
      because:
        "It is digital personal data, processed in India or in connection with offering goods or services to individuals in India, and neither of the section 3(c) exclusions applies.",
      refs: ["§ 3(a)–(b)", "§ 3(c) — neither exclusion met"],
      next:
        "Being in scope is the start. Section 7 may give you a lawful basis without consent, and section 17 may switch off large parts of the Act for particular grounds, State processing or notified classes.",
    },
  },
];

const BY_ID = new Map(STEPS.map((s) => [s.id, s]));

export function ApplicabilityClient() {
  const [path, setPath] = React.useState<{ id: string; answer: boolean }[]>([]);
  const [current, setCurrent] = React.useState<string>("personal");
  const [verdict, setVerdict] = React.useState<Verdict | null>(null);

  const step = BY_ID.get(current);

  function answer(yes: boolean) {
    if (!step) return;
    const next = yes ? step.yes : step.no;
    setPath((p) => [...p, { id: step.id, answer: yes }]);
    if (typeof next === "string") setCurrent(next);
    else setVerdict(next);
  }

  function back() {
    const prev = path[path.length - 1];
    if (!prev) return;
    setPath((p) => p.slice(0, -1));
    setVerdict(null);
    setCurrent(prev.id);
  }

  function restart() {
    setPath([]);
    setVerdict(null);
    setCurrent("personal");
  }

  return (
    <div className="flex flex-col gap-[18px] rounded-lg border-[1.5px] border-primary bg-surface p-[clamp(20px,3.4vw,34px)]">
      <div className="flex items-center justify-between gap-[12px]">
        <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-primary-text">
          {verdict ? "Result" : `Question ${path.length + 1}`}
        </span>
        <span className="flex gap-[10px]">
          {path.length > 0 && (
            <button
              onClick={back}
              className="inline-flex cursor-pointer items-center gap-[6px] rounded-[7px] border border-border bg-surface-raised px-[11px] py-[7px] font-sans text-[12.5px] font-semibold text-text-secondary hover:border-primary-text"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Back
            </button>
          )}
          {(path.length > 0 || verdict) && (
            <button
              onClick={restart}
              className="inline-flex cursor-pointer items-center gap-[6px] rounded-[7px] border border-border bg-surface-raised px-[11px] py-[7px] font-sans text-[12.5px] font-semibold text-text-secondary hover:border-primary-text"
            >
              <RotateCcw size={14} aria-hidden="true" />
              Start again
            </button>
          )}
        </span>
      </div>

      {verdict ? (
        <div aria-live="polite" className="flex flex-col gap-[14px]">
          <h3
            className={
              verdict.tone === "in"
                ? "m-0 font-display text-[clamp(21px,3vw,28px)] font-semibold leading-[1.25] text-primary-text"
                : "m-0 font-display text-[clamp(21px,3vw,28px)] font-semibold leading-[1.25] text-text"
            }
          >
            {verdict.headline}
          </h3>
          <p className="m-0 max-w-[70ch] text-[15px] leading-[1.75] text-text-secondary">
            {verdict.because}
          </p>
          <div className="flex flex-wrap gap-[8px]">
            {verdict.refs.map((r) => (
              <span
                key={r}
                className="rounded-full bg-primary-tint px-[11px] py-[5px] font-mono text-[12px] font-semibold text-primary-text"
              >
                {r}
              </span>
            ))}
          </div>
          <p className="m-0 max-w-[70ch] border-t border-border pt-[13px] text-[14px] leading-[1.72] text-text-muted">
            {verdict.next}
          </p>
        </div>
      ) : step ? (
        <div className="flex flex-col gap-[14px]">
          <h3 className="m-0 max-w-[54ch] font-display text-[clamp(19px,2.6vw,25px)] font-semibold leading-[1.3] text-text">
            {step.question}
          </h3>
          <p className="m-0 max-w-[70ch] text-[14.5px] leading-[1.72] text-text-secondary">
            {step.hint}
          </p>
          <div className="mt-[4px] flex flex-wrap gap-[10px]">
            <button
              onClick={() => answer(true)}
              className="cursor-pointer rounded-[9px] border-[1.5px] border-primary bg-primary px-[22px] py-[12px] font-sans text-[14.5px] font-semibold text-white hover:opacity-90"
            >
              Yes
            </button>
            <button
              onClick={() => answer(false)}
              className="cursor-pointer rounded-[9px] border-[1.5px] border-border bg-surface-raised px-[22px] py-[12px] font-sans text-[14.5px] font-semibold text-text hover:border-primary-text"
            >
              No
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
