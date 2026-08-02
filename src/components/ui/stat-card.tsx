import * as React from "react";

import { cn } from "@/lib/utils";

const accentColors = {
  safe: "bg-safe",
  warning: "bg-warning",
  critical: "bg-critical",
  info: "bg-info",
  neutral: "bg-text-muted",
} as const;

const deltaColors = {
  safe: "text-safe-text",
  critical: "text-critical-text",
  warning: "text-warning-text",
  neutral: "text-text-muted",
} as const;

export type StatTone = keyof typeof accentColors;
export type DeltaTone = keyof typeof deltaColors;

/**
 * StatCard — KPI stat tile. Eyebrow label with a tone dot, a large value,
 * and an optional unit and delta.
 */
export interface StatCardProps extends React.ComponentProps<"div"> {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: string;
  delta?: React.ReactNode;
  deltaTone?: DeltaTone;
  tone?: StatTone;
  icon?: React.ReactNode;
}

export function StatCard({
  className,
  label,
  value,
  unit = "",
  delta = null,
  deltaTone = "neutral",
  tone = "neutral",
  icon = null,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-[14px] rounded-lg border border-border bg-surface p-[20px] shadow-[var(--shadow-card)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-[8px] text-[12px] font-semibold uppercase tracking-[0.08em] text-text-muted">
          <span
            className={cn("size-[7px] rounded-full", accentColors[tone])}
            aria-hidden="true"
          />
          {label}
        </span>
        {icon && (
          <span className="inline-flex text-text-muted">{icon}</span>
        )}
      </div>
      <div className="flex flex-wrap items-baseline gap-[10px]">
        <span className="font-sans text-[34px] font-bold leading-none tracking-[-0.02em] text-text tabular-nums">
          {value}
          {unit && (
            <span className="ml-[2px] text-[18px] font-semibold text-text-muted">
              {unit}
            </span>
          )}
        </span>
        {delta != null && delta !== "" && (
          <span
            className={cn(
              "text-[13px] font-semibold tabular-nums",
              deltaColors[deltaTone],
            )}
          >
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
