"use client";

import * as React from "react";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Button, LinkButton } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { draw, PRACTICE_COUNT, type Question } from "@/lib/dpdp-quiz";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D"];

/** Topic spread of the question bank, shown under the test. */
const COVERAGE = [
  "Definitions and the six defined roles",
  "Notice, consent and legitimate uses",
  "Fiduciary obligations, children, breaches",
  "Rights, duties and grievance redressal",
  "Scope, cross-border transfers, exemptions",
  "The Board, appeals and the Schedule",
];

interface Miss {
  ref: string;
  q: string;
}

export function PracticeTestClient() {
  const [set, setSet] = React.useState<Question[]>([]);
  const [i, setI] = React.useState(0);
  const [picked, setPicked] = React.useState<number | null>(null);
  const [correct, setCorrect] = React.useState(0);
  const [misses, setMisses] = React.useState<Miss[]>([]);
  const [done, setDone] = React.useState(false);

  // Drawn in an effect, not during render: `draw()` uses Math.random(), which
  // would produce a hydration mismatch if it ran on the server.
  const start = React.useCallback(() => {
    setSet(draw(PRACTICE_COUNT));
    setI(0);
    setPicked(null);
    setCorrect(0);
    setMisses([]);
    setDone(false);
  }, []);

  // The first paper has to be drawn after hydration — `draw()` is random, so
  // running it during render would not match the server HTML. One extra render
  // on mount is the cost of that.
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    start();
  }, [start]);

  const ready = set.length > 0;
  const total = set.length || PRACTICE_COUNT;
  const q = set[i];
  const answered = picked !== null;
  const inTest = ready && !done;
  const finalPct = Math.round((correct / total) * 100);
  const progressPct = done ? 100 : Math.round((i / total) * 100);

  function pick(k: number) {
    if (picked !== null || !q) return;
    const right = k === q.a;
    setPicked(k);
    if (right) {
      setCorrect((c) => c + 1);
    } else {
      setMisses((m) => [...m, { ref: q.ref, q: q.q }]);
    }
  }

  function next() {
    if (i + 1 >= set.length) {
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setI((n) => n + 1);
    setPicked(null);
  }

  function restart() {
    start();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden font-sans text-text">
      <SiteNav active="cert" />

      <section className="flex-1 bg-[var(--bg-sunken)]">
        <div className="mx-auto flex w-full max-w-[860px] flex-col gap-[clamp(18px,2.6vw,24px)] px-[var(--space-5)] pb-[clamp(40px,6vw,72px)] pt-[clamp(26px,4vw,48px)]">
          <div className="flex flex-wrap items-end justify-between gap-[14px]">
            <div className="flex min-w-0 flex-[1_1_260px] flex-col gap-[8px]">
              <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary-text">
                Free practice · no record kept
              </span>
              <h1 className="m-0 font-display text-[clamp(24px,3.6vw,34px)] font-semibold leading-[1.18] tracking-[-0.028em] text-text">
                DPDP Practice Test
              </h1>
            </div>
            <div className="flex shrink-0 items-center gap-[10px]">
              <span className="inline-flex whitespace-nowrap items-center rounded-full border border-border bg-surface px-[13px] py-[7px] font-mono text-[12.5px] font-semibold text-text-secondary tabular-nums">
                {done ? "Complete" : `Question ${i + 1} / ${total}`}
              </span>
              <span className="inline-flex whitespace-nowrap items-center rounded-full bg-primary-tint px-[13px] py-[7px] font-mono text-[12.5px] font-semibold text-primary-text tabular-nums">
                {correct} correct
              </span>
            </div>
          </div>

          <p className="m-0 max-w-[70ch] text-[15px] leading-[1.7] text-text-secondary">
            Ten questions drawn at random from the Digital Personal Data
            Protection Act, 2023. Answer one and you get the explanation
            immediately, along with the section it comes from — so a wrong answer
            tells you exactly what to re-read. There is no timer, no sign-up and
            no limit on attempts, and nothing you do here is recorded.
          </p>

          <div className="h-[6px] overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-[var(--dur-base)] ease-[var(--ease-standard)]"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* ------------------------------------------------ Question card */}
          {inTest && q && (
            <div className="flex flex-col gap-[18px] rounded-lg border border-border bg-surface p-[clamp(20px,3vw,30px)] shadow-[var(--shadow-card)]">
              <div className="flex flex-wrap items-center gap-[10px]">
                <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted tabular-nums">
                  Question {i + 1} of {total}
                </span>
                <span className="inline-flex items-center rounded-full bg-surface-raised px-[10px] py-[4px] font-mono text-[12px] font-semibold text-text-secondary tabular-nums">
                  {q.ref}
                </span>
              </div>

              <p className="m-0 font-display text-[clamp(17px,2.3vw,21px)] font-semibold leading-[1.4] tracking-[-0.01em] text-text [text-wrap:pretty]">
                {q.q}
              </p>

              <div className="flex flex-col gap-[10px]">
                {q.o.map((text, k) => {
                  const isRight = k === q.a;
                  const isPicked = k === picked;
                  const showRight = answered && isRight;
                  const showWrong = answered && isPicked && !isRight;

                  return (
                    <button
                      key={k}
                      onClick={() => pick(k)}
                      className={cn(
                        "flex w-full items-start gap-[12px] rounded-md border-[1.5px] px-[17px] py-[15px]",
                        "text-left font-sans text-[15px] leading-[1.6] text-text",
                        "transition-[background] duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
                        answered
                          ? "cursor-default"
                          : "cursor-pointer hover:border-primary-text",
                        showRight
                          ? "border-primary bg-[rgba(180,50,26,.12)]"
                          : showWrong
                            ? "border-text-muted bg-surface-raised"
                            : "border-border bg-surface",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex size-[26px] shrink-0 items-center justify-center rounded-full font-sans text-[12.5px] font-semibold",
                          showRight
                            ? "bg-primary text-white"
                            : "bg-surface-raised text-text-secondary",
                        )}
                      >
                        {LETTERS[k]}
                      </span>
                      <span className="min-w-0 flex-1">{text}</span>
                      {(showRight || showWrong) && (
                        <span
                          className={cn(
                            "shrink-0 whitespace-nowrap font-sans text-[12px] font-semibold",
                            showRight ? "text-primary" : "text-text-muted",
                          )}
                        >
                          {showRight ? "Correct" : "Your answer"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {answered ? (
                <>
                  <div
                    className={cn(
                      "flex flex-col gap-[7px] rounded-md border-l-[3px] bg-[var(--bg-sunken)] px-[18px] py-[16px]",
                      picked === q.a ? "border-l-primary" : "border-l-text-muted",
                    )}
                  >
                    <span
                      className={cn(
                        "font-sans text-[14px] font-semibold",
                        picked === q.a ? "text-primary" : "text-text-muted",
                      )}
                    >
                      {picked === q.a ? "Correct" : "Not quite"}
                    </span>
                    <span className="text-[14px] leading-[1.7] text-text-secondary">
                      {q.why}
                    </span>
                    <span className="text-[12.5px] text-text-muted">
                      Provision tested: {q.ref}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-[12px]">
                    <Button variant="primary" size="lg" onClick={next}>
                      {i + 1 >= total ? "See my result" : "Next question"}
                    </Button>
                    <Button size="lg" variant="ghost" onClick={restart}>
                      Restart with new questions
                    </Button>
                  </div>
                </>
              ) : (
                <span className="text-[13px] text-text-muted">
                  Choose an answer to see the explanation and the provision it
                  comes from.
                </span>
              )}
            </div>
          )}

          {/* -------------------------------------------------- Result card */}
          {ready && done && (
            <div className="flex flex-col gap-[18px] rounded-lg border-[1.5px] border-primary bg-surface p-[clamp(22px,3.2vw,34px)] shadow-[var(--shadow-raised)]">
              <div className="flex flex-wrap items-center gap-[20px]">
                <StatCard
                  className="min-w-[240px] shrink-0"
                  label="Practice score"
                  value={`${finalPct}%`}
                  delta={`${correct} correct`}
                  deltaTone={finalPct >= 70 ? "safe" : "warning"}
                  tone={finalPct >= 70 ? "safe" : "warning"}
                />
                <span className="flex min-w-0 flex-[1_1_240px] flex-col gap-[8px]">
                  <span className="font-display text-[clamp(21px,2.8vw,27px)] font-semibold leading-[1.2] text-text">
                    {finalPct >= 70 ? "Exam-ready" : "Worth another read"}
                  </span>
                  <span className="text-[14.5px] leading-[1.7] text-text-secondary">
                    {finalPct >= 70
                      ? `You answered ${correct} of ${total} correctly — comfortably above the 70% certification threshold. Sit the graded exam while it is fresh.`
                      : `You answered ${correct} of ${total} correctly. The pass mark is 70%, so revisit the provisions below and try again — practice attempts are unlimited.`}
                  </span>
                </span>
              </div>

              {misses.length > 0 && (
                <div className="flex flex-col gap-[10px]">
                  <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
                    Re-read these provisions
                  </span>
                  {misses.map((m, k) => (
                    <div
                      key={`${m.ref}-${k}`}
                      className="flex flex-wrap gap-[10px] rounded-md border border-border bg-[var(--bg-sunken)] px-[16px] py-[14px]"
                    >
                      <span className="inline-flex shrink-0 items-center rounded-full bg-primary-tint px-[9px] py-[3px] font-mono text-[12px] font-semibold text-primary-text tabular-nums">
                        {m.ref}
                      </span>
                      <span className="min-w-0 flex-[1_1_220px] text-[14px] leading-[1.65] text-text-secondary">
                        {m.q}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-[12px]">
                <LinkButton href={routes.exam} variant="primary" size="lg">
                  Sit the certification exam
                </LinkButton>
                <Button size="lg" variant="secondary" onClick={restart}>
                  Practise again
                </Button>
                <LinkButton href={routes.reader} size="lg" variant="ghost">
                  Open the Act
                </LinkButton>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-[10px] border-t border-border pt-[18px]">
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
              What the bank covers
            </span>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[8px]">
              {COVERAGE.map((item) => (
                <span
                  key={item}
                  className="text-[14px] leading-[1.7] text-text-secondary"
                >
                  {item}
                </span>
              ))}
            </div>
            <span className="text-[12.5px] leading-[1.7] text-text-muted">
              Questions are drawn at random from a 30-item bank covering all nine
              chapters and the Schedule. Practice results are never recorded —
              for a graded result and a certificate, sit the{" "}
              <Link href={routes.exam} className="text-primary-text">
                certification exam
              </Link>
              .
            </span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
