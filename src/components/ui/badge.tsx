import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Badge — soft-tinted status pill. Semantic colours are reserved for security
 * states: a 15%-opacity tinted background plus full-colour text, in an
 * uppercase 12px tracked label.
 */
const badgeVariants = cva(
  cn(
    "inline-flex items-center gap-[6px] h-[22px] px-[10px] rounded-sm",
    "font-sans text-[12px] font-semibold uppercase leading-none whitespace-nowrap",
    "tracking-[var(--tracking-badge)]",
  ),
  {
    variants: {
      tone: {
        safe: "bg-safe-tint text-safe-text",
        warning: "bg-warning-tint text-warning-text",
        critical: "bg-critical-tint text-critical-text",
        info: "bg-info-tint text-info-text",
        neutral: "bg-[rgba(159,176,201,0.12)] text-text-secondary",
        primary: "bg-primary-tint text-primary-text",
      },
    },
    defaultVariants: {
      tone: "info",
    },
  },
);

const dotColors = {
  safe: "bg-safe",
  warning: "bg-warning",
  critical: "bg-critical",
  info: "bg-info",
  neutral: "bg-text-muted",
  primary: "bg-primary",
} as const;

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({
  className,
  tone,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "size-[6px] shrink-0 rounded-full",
            dotColors[tone ?? "info"],
          )}
        />
      )}
      {children}
    </span>
  );
}

export { badgeVariants };
