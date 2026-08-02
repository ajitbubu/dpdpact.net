import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Card — elevated surface container. The fundamental Sentinel surface:
 * hairline border, `--radius-lg` corners and `--shadow-card` elevation.
 * Under the Bulletin theme the radius collapses to 4px and the shadow to
 * `none`, so it reads as a ruled region rather than a raised box.
 */
export interface CardProps extends Omit<React.ComponentProps<"div">, "title"> {
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  actions?: React.ReactNode;
  padded?: boolean;
}

export function Card({
  className,
  title = null,
  eyebrow = null,
  actions = null,
  padded = true,
  children,
  ...props
}: CardProps) {
  const hasHeader = title || eyebrow || actions;

  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-lg shadow-[var(--shadow-card)] overflow-hidden",
        className,
      )}
      {...props}
    >
      {hasHeader && (
        <div className="flex items-center justify-between gap-[12px] px-[20px] py-[16px] border-b border-border-subtle">
          <div className="flex min-w-0 flex-col gap-[4px]">
            {eyebrow && (
              <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-text-muted">
                {eyebrow}
              </span>
            )}
            {title && (
              <h3 className="text-[18px] font-semibold text-text">{title}</h3>
            )}
          </div>
          {actions && (
            <div className="flex shrink-0 items-center gap-[8px]">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className={padded ? "p-[20px]" : undefined}>{children}</div>
    </div>
  );
}
