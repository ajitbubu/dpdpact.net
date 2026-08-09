"use client";

import * as React from "react";
import { SCHEDULE } from "@/lib/dpdpa-data";

/**
 * A Schedule explorer, deliberately not a predictor.
 *
 * No tool can output the penalty the Board will impose: section 33(1) requires
 * a determination that the breach is *significant*, and section 33(2) sets
 * seven factors with no weights and no formula. So this shows the statutory
 * ceiling for a chosen head and then makes the reader move each factor
 * themselves, which is honest about where the number actually comes from.
 */

const FACTORS = [
  { id: "gravity", label: "Nature, gravity and duration", ref: "§ 33(2)(a)" },
  { id: "type", label: "Type and nature of the data affected", ref: "§ 33(2)(b)" },
  { id: "repeat", label: "Repetitive nature of the breach", ref: "§ 33(2)(c)" },
  { id: "gain", label: "Gain realised or loss avoided", ref: "§ 33(2)(d)" },
  { id: "mitigation", label: "Mitigation, and how timely it was", ref: "§ 33(2)(e)" },
  { id: "deterrence", label: "Proportionality and deterrence", ref: "§ 33(2)(f)" },
  { id: "impact", label: "Likely impact of the penalty on the person", ref: "§ 33(2)(g)" },
] as const;

type Lean = "down" | "neutral" | "up";

const LEAN_LABEL: Record<Lean, string> = {
  down: "Argues down",
  neutral: "Neutral",
  up: "Argues up",
};

export function PenaltyClient() {
  const [row, setRow] = React.useState(SCHEDULE.rows[0]);
  const [leans, setLeans] = React.useState<Record<string, Lean>>(
    Object.fromEntries(FACTORS.map((f) => [f.id, "neutral"])),
  );

  const up = FACTORS.filter((f) => leans[f.id] === "up").length;
  const down = FACTORS.filter((f) => leans[f.id] === "down").length;

  const reading =
    up === 0 && down === 0
      ? "Move the factors to see how the argument shifts. None of them is weighted in the Act."
      : up > down
        ? `${up} factor${up > 1 ? "s" : ""} argue upward against ${down} downward. On these facts the Board has more to point at when justifying a figure nearer the ceiling — but the ceiling is still a ceiling, not a default.`
        : down > up
          ? `${down} factor${down > 1 ? "s" : ""} argue downward against ${up} upward. Section 33(1) also has to be satisfied first: no penalty at all unless the Board determines the breach is significant.`
          : "The factors are evenly balanced. Nothing in section 33(2) breaks a tie — the Board records its reasons and decides.";

  return (
    <div className="flex flex-col gap-[20px] rounded-lg border-[1.5px] border-primary bg-surface p-[clamp(20px,3.4vw,34px)]">
      <div className="flex flex-col gap-[10px]">
        <label
          htmlFor="head"
          className="font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-primary-text"
        >
          1 · Which penalty head applies?
        </label>
        <select
          id="head"
          value={row.sl}
          onChange={(e) =>
            setRow(SCHEDULE.rows.find((r) => r.sl === e.target.value) ?? SCHEDULE.rows[0])
          }
          className="w-full cursor-pointer rounded-[9px] border border-border bg-surface-raised px-[14px] py-[12px] font-sans text-[14.5px] text-text"
        >
          {SCHEDULE.rows.map((r) => (
            <option key={r.sl} value={r.sl}>
              {r.sl} {r.breach.slice(0, 96)}
              {r.breach.length > 96 ? "…" : ""}
            </option>
          ))}
        </select>
        <p className="m-0 text-[14px] leading-[1.72] text-text-secondary">
          {row.breach}
        </p>
      </div>

      <div className="flex flex-col gap-[6px] rounded-lg border border-border bg-[var(--bg-sunken)] p-[20px]">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted">
          Statutory maximum for this head
        </span>
        <span className="font-display text-[clamp(20px,3vw,26px)] font-semibold leading-[1.3] text-primary-text">
          {row.penalty}
        </span>
        <span className="text-[13px] leading-[1.7] text-text-muted">
          This is the ceiling the Schedule sets, not a starting point and not an
          expected figure.
        </span>
      </div>

      <div className="flex flex-col gap-[12px]">
        <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-primary-text">
          2 · Which way does each factor point on your facts?
        </span>
        {FACTORS.map((f) => (
          <div
            key={f.id}
            className="flex flex-wrap items-center justify-between gap-[12px] rounded-md border border-border bg-surface-raised px-[16px] py-[12px]"
          >
            <span className="flex min-w-0 flex-[1_1_260px] flex-col gap-[3px]">
              <span className="font-sans text-[14px] font-semibold text-text">
                {f.label}
              </span>
              <span className="font-mono text-[11.5px] text-text-muted">
                {f.ref}
              </span>
            </span>
            <span role="group" aria-label={f.label} className="flex gap-[6px]">
              {(["down", "neutral", "up"] as Lean[]).map((lean) => (
                <button
                  key={lean}
                  aria-pressed={leans[f.id] === lean}
                  onClick={() => setLeans((p) => ({ ...p, [f.id]: lean }))}
                  className={
                    leans[f.id] === lean
                      ? "cursor-pointer rounded-[7px] border-[1.5px] border-primary bg-primary-tint px-[11px] py-[7px] font-sans text-[12.5px] font-semibold text-primary-text"
                      : "cursor-pointer rounded-[7px] border border-border bg-surface px-[11px] py-[7px] font-sans text-[12.5px] font-semibold text-text-secondary hover:border-primary-text"
                  }
                >
                  {LEAN_LABEL[lean]}
                </button>
              ))}
            </span>
          </div>
        ))}
      </div>

      <div
        aria-live="polite"
        className="flex flex-col gap-[8px] border-t border-border pt-[16px]"
      >
        <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-primary-text">
          What this tells you
        </span>
        <p className="m-0 max-w-[70ch] text-[15px] leading-[1.75] text-text-secondary">
          {reading}
        </p>
        <p className="m-0 max-w-[70ch] text-[13.5px] leading-[1.7] text-text-muted">
          There is deliberately no number here. The Act assigns no weights to
          the seven factors and sets no formula, so any figure a calculator
          produced would be invented. What it can show is which way your facts
          push, and which of them you can still change.
        </p>
      </div>
    </div>
  );
}
