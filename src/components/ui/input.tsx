"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "h-[32px]",
  md: "h-[38px]",
  lg: "h-[44px]",
} as const;

/**
 * Input — text field on an inset surface with a hairline border and a
 * focus ring drawn from `--shadow-focus`.
 */
export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size"> {
  iconLeft?: React.ReactNode;
  mono?: boolean;
  size?: keyof typeof sizeClasses;
  wrapperClassName?: string;
}

export function Input({
  className,
  wrapperClassName,
  iconLeft = null,
  mono = false,
  size = "md",
  disabled = false,
  ...props
}: InputProps) {
  const [focus, setFocus] = React.useState(false);

  return (
    <div
      className={cn(
        "flex items-center gap-[8px] px-[12px] rounded-sm border bg-surface-inset",
        "transition-[border-color,box-shadow] duration-[var(--dur-fast)]",
        sizeClasses[size],
        focus
          ? "border-primary shadow-[var(--shadow-focus)]"
          : "border-border shadow-none",
        disabled && "opacity-50",
        wrapperClassName,
      )}
    >
      {iconLeft && (
        <span className="inline-flex shrink-0 text-text-muted">{iconLeft}</span>
      )}
      <input
        disabled={disabled}
        onFocus={(e) => {
          setFocus(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocus(false);
          props.onBlur?.(e);
        }}
        className={cn(
          "min-w-0 flex-1 border-none bg-transparent text-text outline-none",
          mono
            ? "font-mono text-[13px] tabular-nums"
            : "font-sans text-[14px] normal-nums",
          className,
        )}
        {...props}
      />
    </div>
  );
}
