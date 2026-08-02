import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button — primary action control for Sentinel.
 * Primary (ink, under the Bulletin theme) is reserved for the single key
 * action per view.
 *
 * Note on text colour: the source design system sets `color: var(--text-body)`
 * for the secondary variant. `--text-body` is redefined as a *font size* (15px)
 * by the typography token sheet, which loads after the colour sheet, so that
 * declaration is invalid at runtime and the button inherits its container's
 * colour — the page ink. We use `--color-text` directly to reproduce what
 * actually renders.
 */
const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-sans font-semibold leading-none rounded-md cursor-pointer",
    "transition-[background] duration-[var(--dur-fast)] ease-[var(--ease-standard)]",
    "disabled:cursor-not-allowed disabled:opacity-45",
  ),
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white border border-primary [&:hover:not(:disabled)]:bg-primary-hover",
        secondary:
          "bg-surface-raised text-text border border-border [&:hover:not(:disabled)]:bg-surface-inset",
        ghost:
          "bg-transparent text-text-secondary border border-transparent [&:hover:not(:disabled)]:bg-surface-raised",
        danger:
          "bg-critical text-white border border-critical [&:hover:not(:disabled)]:bg-[#B91C1C]",
      },
      size: {
        sm: "h-[30px] px-[12px] text-[13px] gap-[6px]",
        md: "h-[38px] px-[16px] text-[14px] gap-[8px]",
        lg: "h-[44px] px-[20px] text-[15px] gap-[8px]",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "color">,
    VariantProps<typeof buttonVariants> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Button({
  className,
  variant,
  size,
  fullWidth,
  iconLeft = null,
  iconRight = null,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}

export interface LinkButtonProps
  extends Omit<React.ComponentProps<typeof Link>, "color">,
    VariantProps<typeof buttonVariants> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

/**
 * LinkButton — a Button that navigates.
 *
 * The source design wires these up as `<button onClick={() => location.href = …}>`,
 * which would force every content page to be a client component. Rendering an
 * anchor with the same classes keeps the pages server-rendered and the markup
 * identical to look at.
 */
export function LinkButton({
  className,
  variant,
  size,
  fullWidth,
  iconLeft = null,
  iconRight = null,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant, size, fullWidth }),
        "no-underline",
        className,
      )}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Link>
  );
}

export { buttonVariants };
