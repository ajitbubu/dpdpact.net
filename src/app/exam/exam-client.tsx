"use client";

import * as React from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Button, LinkButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/ui/stat-card";
import { useStored, writeStored } from "@/lib/browser-store";
import { prettyDate, type Credential } from "@/lib/credential";
import {
  draw,
  EXAM_COUNT,
  EXAM_MINUTES,
  PASS_MARK,
  type Question,
} from "@/lib/dpdp-quiz";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D"];

const PASS_COUNT = Math.ceil((PASS_MARK / 100) * EXAM_COUNT);

export function ExamClient() {
  const [phase, setPhase] = React.useState<"intro" | "live" | "result">("intro");
  const [nameInput, setNameInput] = React.useState<string | null>(null);
  const [nameError, setNameError] = React.useState(false);
  const [set, setSet] = React.useState<Question[]>([]);
  const [answers, setAnswers] = React.useState<Record<number, number>>({});
  const [i, setI] = React.useState(0);
  /**
   * Epoch-ms the paper is due, not a countdown.
   *
   * A counter decremented once per `setInterval` tick is not a time limit:
   * browsers clamp background tabs to roughly one tick a minute and suspend
   * them outright on mobile, so a candidate could tab away, look up the
   * answers, and come back to a clock that had barely moved. Remaining time is
   * derived from the wall clock instead, so leaving the tab costs real time.
   */
  const [deadline, setDeadline] = React.useState<number | null>(null);
  const [left, setLeft] = React.useState(0);
  const [result, setResult] = React.useState<Credential | null>(null);

  // Seeded from a previously issued credential until the candidate types.
  const prior = useStored<Credential>("dpdp.credential");
  const name = nameInput ?? prior?.name ?? "";

  // Latest-value refs so the countdown's auto-submit grades the real paper
  // rather than whatever was captured when the interval was created.
  const setRef = React.useRef<Question[]>(set);
  const answersRef = React.useRef<Record<number, number>>(answers);
  const nameRef = React.useRef(name);
  React.useEffect(() => {
    setRef.current = set;
  }, [set]);
  React.useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  React.useEffect(() => {
    nameRef.current = name;
  }, [name]);

  const grade = React.useCallback(() => {
    const paper = setRef.current;
    const given = answersRef.current;
    if (paper.length === 0) return;

    let correct = 0;
    paper.forEach((q, k) => {
      if (given[k] === q.a) correct++;
    });

    const pct = Math.round((correct / paper.length) * 100);
    const passed = pct >= PASS_MARK;
    const now = new Date();
    const cred: Credential = {
      name: nameRef.current.trim(),
      correct,
      total: paper.length,
      pct,
      passed,
      date: now.toISOString().slice(0, 10),
      id: `DPDP-${now.getFullYear()}-${String(
        Math.floor(1000 + Math.random() * 8999),
      )}`,
    };

    if (passed) writeStored("dpdp.credential", cred);

    setResult(cred);
    setPhase("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // The exam clock. Submits the paper itself once the deadline passes.
  React.useEffect(() => {
    if (phase !== "live" || deadline === null) return;

    let done = false;
    const tick = () => {
      if (done) return;
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining === 0) {
        done = true;
        clearInterval(timer);
        grade();
      }
    };

    const timer = setInterval(tick, 1000);
    // Recheck the moment the tab is foregrounded: while it was hidden the
    // interval may have fired once a minute or not at all, so the deadline can
    // already have passed.
    const onVisible = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      done = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [phase, deadline, grade]);

  function begin() {
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    setSet(draw(EXAM_COUNT));
    setAnswers({});
    setI(0);
    setDeadline(Date.now() + EXAM_MINUTES * 60 * 1000);
    setLeft(EXAM_MINUTES * 60);
    setNameError(false);
    setResult(null);
    setPhase("live");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function retake() {
    setPhase("intro");
    setResult(null);
    setAnswers({});
    setSet([]);
    setI(0);
    setDeadline(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const q = set[i];
  const answeredCount = Object.keys(answers).length;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const low = left <= 120;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden font-sans text-text">
      <SiteNav active="cert" />

      <section className="flex-1 bg-[var(--bg-sunken)]">
        <div className="mx-auto flex w-full max-w-[900px] flex-col gap-[clamp(18px,2.6vw,24px)] px-[var(--space-5)] pb-[clamp(40px,6vw,72px)] pt-[clamp(26px,4vw,48px)]">
          {/* ------------------------------------------------------- Intro */}
          {phase === "intro" && (
            <>
              <div className="flex flex-col gap-[14px]">
                <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary-text">
                  Instant certification
                </span>
                <h1 className="m-0 font-display text-[clamp(26px,4vw,38px)] font-semibold leading-[1.15] tracking-[-0.03em] text-text [text-wrap:pretty]">
                  Certified DPDP Practitioner Exam
                </h1>
                <p className="m-0 max-w-[64ch] text-[clamp(15px,1.6vw,16.5px)] leading-[1.7] text-text-secondary">
                  {EXAM_COUNT} single-choice questions drawn at random from the
                  Act. {EXAM_MINUTES} minutes on the clock. Score {PASS_MARK}%
                  or more and your certificate is issued the moment you submit.
                </p>
              </div>

              <div className="flex flex-wrap gap-[18px]">
                <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-[16px] rounded-lg border border-border bg-surface p-[clamp(20px,3vw,28px)] shadow-[var(--shadow-card)]">
                  <span className="font-display text-[18px] font-semibold text-text">
                    Before you start
                  </span>
                  <label className="flex flex-col gap-[6px]">
                    <span className="font-sans text-[13px] font-semibold text-text">
                      Name for the certificate
                    </span>
                    <Input
                      size="lg"
                      placeholder="Ananya Sharma"
                      value={name}
                      onChange={(e) => {
                        setNameInput(e.target.value);
                        setNameError(false);
                      }}
                    />
                    <span className="font-sans text-[12px] text-text-muted">
                      Printed exactly as typed.
                    </span>
                  </label>
                  {nameError && (
                    <span className="text-[13px] leading-[1.6] text-primary-text">
                      Enter the name that should appear on your certificate.
                    </span>
                  )}
                  <div className="flex flex-wrap gap-[12px]">
                    <Button variant="primary" size="lg" onClick={begin}>
                      Start the {EXAM_MINUTES}-minute exam
                    </Button>
                    <LinkButton
                      href={routes.practiceTest}
                      variant="ghost"
                      size="lg"
                    >
                      Practise first
                    </LinkButton>
                  </div>
                </div>

                <div className="flex min-w-0 flex-[0_1_280px] flex-col gap-[12px] rounded-lg border border-border bg-surface p-[clamp(20px,3vw,26px)]">
                  <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
                    Rules
                  </span>
                  <span className="text-[14px] leading-[1.7] text-text-secondary">
                    · {EXAM_COUNT} questions · {EXAM_MINUTES} minutes
                  </span>
                  <span className="text-[14px] leading-[1.7] text-text-secondary">
                    · Move freely between questions
                  </span>
                  <span className="text-[14px] leading-[1.7] text-text-secondary">
                    · One answer per question, no negative marking
                  </span>
                  <span className="text-[14px] leading-[1.7] text-text-secondary">
                    · The paper submits itself when time runs out
                  </span>
                  <span className="text-[14px] leading-[1.7] text-text-secondary">
                    · Pass mark {PASS_MARK}% — {PASS_COUNT} of {EXAM_COUNT}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* -------------------------------------------------------- Live */}
          {phase === "live" && q && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-[14px] rounded-lg border border-border bg-surface px-[18px] py-[14px] shadow-[var(--shadow-card)]">
                <span className="flex min-w-0 flex-[1_1_200px] flex-col gap-[3px]">
                  <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
                    Certification exam in progress
                  </span>
                  <span className="font-sans text-[16px] font-semibold text-text">
                    {name}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-[12px]">
                  <span className="inline-flex whitespace-nowrap items-center rounded-full bg-surface-raised px-[13px] py-[7px] font-mono text-[12.5px] font-semibold text-text-secondary tabular-nums">
                    {answeredCount} of {set.length} answered
                  </span>
                  <span
                    className={cn(
                      "inline-flex whitespace-nowrap items-center gap-[7px] rounded-full px-[14px] py-[8px] font-mono text-[15px] font-semibold tabular-nums",
                      low ? "bg-primary text-white" : "bg-surface-raised text-text",
                    )}
                  >
                    {mm}:{ss}
                  </span>
                </span>
              </div>

              {/* Question palette */}
              <div className="flex flex-wrap gap-[7px]">
                {set.map((_, k) => {
                  const isDone = answers[k] !== undefined;
                  const here = k === i;
                  return (
                    <button
                      key={k}
                      onClick={() => setI(k)}
                      className={cn(
                        "size-[38px] cursor-pointer rounded-sm border-[1.5px] font-mono text-[13px] font-semibold tabular-nums",
                        "transition-[background] duration-[var(--dur-fast)] ease-[var(--ease-standard)] hover:border-primary-text",
                        here
                          ? "border-primary bg-primary text-white"
                          : isDone
                            ? "border-primary-tint bg-[rgba(180,50,26,.14)] text-text"
                            : "border-border bg-surface text-text",
                      )}
                    >
                      {k + 1}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-[18px] rounded-lg border border-border bg-surface p-[clamp(20px,3vw,30px)] shadow-[var(--shadow-card)]">
                <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted tabular-nums">
                  Question {i + 1} of {set.length}
                </span>
                <p className="m-0 font-display text-[clamp(17px,2.3vw,21px)] font-semibold leading-[1.4] tracking-[-0.01em] text-text [text-wrap:pretty]">
                  {q.q}
                </p>

                <div className="flex flex-col gap-[10px]">
                  {q.o.map((text, k) => {
                    const isPicked = answers[i] === k;
                    return (
                      <button
                        key={k}
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, [i]: k }))
                        }
                        className={cn(
                          "flex w-full cursor-pointer items-start gap-[12px] rounded-md border-[1.5px] px-[17px] py-[15px]",
                          "text-left font-sans text-[15px] leading-[1.6] text-text hover:border-primary-text",
                          "transition-[background] duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
                          isPicked
                            ? "border-primary bg-[rgba(180,50,26,.12)]"
                            : "border-border bg-surface",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-flex size-[26px] shrink-0 items-center justify-center rounded-full font-sans text-[12.5px] font-semibold",
                            isPicked
                              ? "bg-primary text-white"
                              : "bg-surface-raised text-text-secondary",
                          )}
                        >
                          {LETTERS[k]}
                        </span>
                        <span className="min-w-0 flex-1">{text}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap justify-between gap-[12px] pt-[2px]">
                  <div className="flex flex-wrap gap-[10px]">
                    <Button
                      size="lg"
                      variant="ghost"
                      onClick={() => setI((n) => Math.max(0, n - 1))}
                    >
                      ← Previous
                    </Button>
                    <Button
                      size="lg"
                      variant="secondary"
                      onClick={() => setI((n) => Math.min(set.length - 1, n + 1))}
                    >
                      Next
                    </Button>
                  </div>
                  <Button variant="primary" size="lg" onClick={grade}>
                    Submit exam
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* ------------------------------------------------------ Result */}
          {phase === "result" && result && (
            <>
              <div
                className={cn(
                  "flex flex-col gap-[20px] rounded-lg border-[1.5px] bg-surface p-[clamp(22px,3.2vw,34px)]",
                  result.passed
                    ? "border-primary shadow-[var(--shadow-raised)]"
                    : "border-border shadow-[var(--shadow-card)]",
                )}
              >
                <div className="flex flex-wrap items-center gap-[22px]">
                  <StatCard
                    className="min-w-[240px] shrink-0"
                    label="Exam score"
                    value={`${result.pct}%`}
                    delta={`${result.correct} of ${result.total}`}
                    deltaTone={result.passed ? "safe" : "critical"}
                    tone={result.passed ? "safe" : "critical"}
                  />
                  <span className="flex min-w-0 flex-[1_1_260px] flex-col gap-[10px]">
                    <span className="font-display text-[clamp(22px,3vw,30px)] font-semibold leading-[1.18] tracking-[-0.02em] text-text">
                      {result.passed
                        ? "Certified — congratulations"
                        : "Not this time"}
                    </span>
                    <span className="text-[15px] leading-[1.7] text-text-secondary">
                      {result.passed
                        ? `You answered ${result.correct} of ${result.total} correctly, above the ${PASS_MARK}% pass mark. Your certificate has been issued and saved in this browser.`
                        : `You answered ${result.correct} of ${result.total} correctly; ${PASS_COUNT} of ${EXAM_COUNT} are needed to pass. Review the answers below, then retake — there is no limit on attempts.`}
                    </span>
                    {result.passed && (
                      <span className="flex flex-wrap gap-[10px] pt-[2px]">
                        <span className="inline-flex items-center rounded-full bg-primary-tint px-[13px] py-[7px] font-mono text-[12.5px] font-semibold text-primary-text tabular-nums">
                          Credential {result.id}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-surface-raised px-[13px] py-[7px] font-mono text-[12.5px] font-semibold text-text-secondary tabular-nums">
                          Issued {prettyDate(result.date)}
                        </span>
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex flex-wrap gap-[12px]">
                  {result.passed && (
                    <LinkButton
                      href={routes.certificate}
                      variant="primary"
                      size="lg"
                    >
                      View my certificate
                    </LinkButton>
                  )}
                  <Button variant="secondary" size="lg" onClick={retake}>
                    Retake the exam
                  </Button>
                  <LinkButton href={routes.reader} variant="ghost" size="lg">
                    Open the Act
                  </LinkButton>
                </div>
              </div>

              {/* Answer review */}
              <div className="flex flex-col gap-[12px]">
                <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
                  Answer review
                </span>
                {set.map((item, k) => {
                  const right = answers[k] === item.a;
                  const skipped = answers[k] === undefined;
                  return (
                    <div
                      key={k}
                      className={cn(
                        "flex flex-col gap-[9px] rounded-lg border border-border border-l-[3px] bg-surface px-[20px] py-[18px]",
                        right ? "border-l-primary" : "border-l-text-muted",
                      )}
                    >
                      <span className="flex flex-wrap items-center gap-[10px]">
                        <span className="font-mono text-[12px] font-semibold text-text-muted tabular-nums">
                          Q{k + 1}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-surface-raised px-[9px] py-[3px] font-mono text-[12px] font-semibold text-text-secondary tabular-nums">
                          {item.ref}
                        </span>
                        <span
                          className={cn(
                            "font-sans text-[12px] font-semibold",
                            right ? "text-primary" : "text-text-muted",
                          )}
                        >
                          {right ? "Correct" : skipped ? "Skipped" : "Incorrect"}
                        </span>
                      </span>
                      <span className="font-sans text-[15px] font-semibold leading-[1.5] text-text">
                        {item.q}
                      </span>
                      <span className="text-[14px] leading-[1.7] text-text-secondary">
                        Correct answer: {LETTERS[item.a]}. {item.o[item.a]}
                      </span>
                      {!right && (
                        <span className="text-[14px] leading-[1.7] text-text-muted">
                          You chose:{" "}
                          {skipped
                            ? "Not answered"
                            : `${LETTERS[answers[k]]}. ${item.o[answers[k]]}`}
                        </span>
                      )}
                      <span className="text-[14px] leading-[1.7] text-text-secondary">
                        {item.why}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
