"use client";

import { Check, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useStored, writeStored } from "@/lib/browser-store";
import {
  CHECKLIST_GROUPS,
  CHECKLIST_TOTAL,
} from "@/lib/compliance-checklist";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "dpdpa.compliance-checklist.v1";

export function ChecklistClient() {
  const completed = useStored<Record<string, boolean>>(STORAGE_KEY) ?? {};
  const completeCount = Object.values(completed).filter(Boolean).length;
  const percentage = Math.round((completeCount / CHECKLIST_TOTAL) * 100);

  function toggle(id: string) {
    writeStored(STORAGE_KEY, { ...completed, [id]: !completed[id] });
  }

  function reset() {
    writeStored(STORAGE_KEY, {});
  }

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="sticky top-[72px] z-30 rounded-lg border border-border-strong bg-[color-mix(in_srgb,var(--color-surface)_94%,transparent)] p-[18px] backdrop-blur-[8px]">
        <div className="mb-[10px] flex flex-wrap items-center justify-between gap-[10px]">
          <div>
            <span className="block font-mono text-[12px] font-semibold uppercase tracking-[0.1em] text-primary-text">
              Your readiness
            </span>
            <span className="mt-[3px] block text-[14px] text-text-secondary">
              {completeCount} of {CHECKLIST_TOTAL} controls evidenced
            </span>
          </div>
          <div className="flex items-center gap-[12px]">
            <span className="font-display text-[30px] font-semibold text-text">
              {percentage}%
            </span>
            {completeCount > 0 ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={reset}
                iconLeft={<RotateCcw size={14} aria-hidden="true" />}
              >
                Reset
              </Button>
            ) : null}
          </div>
        </div>
        <div
          role="progressbar"
          aria-label="Compliance checklist progress"
          aria-valuemin={0}
          aria-valuemax={CHECKLIST_TOTAL}
          aria-valuenow={completeCount}
          className="h-[8px] overflow-hidden rounded-full bg-[var(--bg-sunken)]"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: percentage + "%" }}
          />
        </div>
      </div>

      {CHECKLIST_GROUPS.map((group, groupIndex) => {
        const groupCount = group.items.filter(
          (item) => completed[item.id],
        ).length;
        const headingId = group.id + "-heading";
        return (
          <section
            key={group.id}
            aria-labelledby={headingId}
            className="overflow-hidden rounded-lg border border-border bg-surface"
          >
            <div className="flex flex-wrap items-start justify-between gap-[14px] border-b border-border bg-[var(--bg-sunken)] px-[20px] py-[17px]">
              <div>
                <span className="mb-[5px] block font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-primary-text">
                  0{groupIndex + 1} · {group.owner}
                </span>
                <h2
                  id={headingId}
                  className="m-0 font-display text-[22px] font-semibold text-text"
                >
                  {group.title}
                </h2>
              </div>
              <span className="rounded-full border border-border bg-surface px-[10px] py-[5px] font-mono text-[12px] font-semibold text-text-secondary">
                {groupCount}/{group.items.length}
              </span>
            </div>

            <div className="divide-y divide-border">
              {group.items.map((item) => {
                const checked = !!completed[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={checked}
                    onClick={() => toggle(item.id)}
                    className={cn(
                      "grid w-full cursor-pointer grid-cols-[28px_minmax(0,1fr)] gap-[13px] border-0 px-[20px] py-[18px] text-left",
                      checked
                        ? "bg-primary-tint"
                        : "bg-surface hover:bg-[var(--bg-sunken)]",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-[1px] inline-flex size-[24px] items-center justify-center rounded-sm border",
                        checked
                          ? "border-primary bg-primary text-white"
                          : "border-border-strong bg-surface",
                      )}
                    >
                      {checked ? <Check size={15} /> : null}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block text-[14.5px] font-semibold leading-[1.55]",
                          checked ? "text-text" : "text-text-secondary",
                        )}
                      >
                        {item.text}
                      </span>
                      <span className="mt-[7px] flex flex-wrap gap-x-[16px] gap-y-[4px] text-[12px] leading-[1.5] text-text-muted">
                        <span>
                          <strong className="font-semibold text-text-secondary">
                            Evidence:
                          </strong>{" "}
                          {item.evidence}
                        </span>
                        <span className="font-mono">{item.reference}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
