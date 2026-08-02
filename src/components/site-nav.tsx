"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { routes, type NavKey } from "@/lib/routes";

/** The four study pages, grouped behind the "DPDP" tab. */
const DPDP_ITEMS: { key: NavKey; href: string; label: string; note: string }[] =
  [
    {
      key: "roles",
      href: routes.roles,
      label: "Key Roles",
      note: "§ 2 · § 10 · §§ 18–26",
    },
    {
      key: "rights",
      href: routes.rights,
      label: "Rights & Duties",
      note: "Chapter III · §§ 11–15",
    },
    {
      key: "obligations",
      href: routes.obligations,
      label: "Obligations",
      note: "Chapter II · §§ 4–10",
    },
    {
      key: "penalties",
      href: routes.penalties,
      label: "Penalties",
      note: "Chapters VI–VIII · Schedule",
    },
  ];

const DPDP_KEYS = DPDP_ITEMS.map((i) => i.key);

/** Top-level items that sit outside the DPDP group. */
const TOP_ITEMS: { key: NavKey; href: string; label: string }[] = [
  { key: "overview", href: routes.overview, label: "Overview" },
  { key: "reader", href: routes.reader, label: "Learn" },
  { key: "blog", href: routes.blog, label: "Blog" },
  { key: "cert", href: routes.certification, label: "Certification" },
];

const MOBILE_TAIL: { href: string; label: string }[] = [
  { href: routes.reader, label: "Full Text Reader" },
  { href: routes.blog, label: "Blog" },
  { href: routes.certification, label: "Certification" },
  { href: routes.practiceTest, label: "Practice Test" },
  { href: routes.certificate, label: "My Certificate" },
];

const linkClass =
  "whitespace-nowrap font-sans text-[14px] font-semibold no-underline hover:text-primary-text";

/**
 * DpdpMenu — the grouped "DPDP" tab.
 *
 * Opens on hover for pointer users and on click/Enter/Space for everyone else.
 * Hover alone is never required: the trigger is a real button with
 * `aria-expanded`, Escape closes it and returns focus, and an outside click or
 * a route change dismisses it.
 */
function DpdpMenu({ active }: { active?: NavKey }) {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const closeTimer = React.useRef<number | null>(null);

  const isActive = !!active && DPDP_KEYS.includes(active);

  // Dismiss on outside click and on Escape.
  React.useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    // Back/forward would otherwise leave the panel hanging open: a link click
    // inside it closes it, but browser-chrome navigation never reaches us.
    const onPopState = () => setOpen(false);

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onPopState);
    };
  }, [open]);

  React.useEffect(
    () => () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    },
    [],
  );

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={() => {
        // Small grace period so the diagonal trip from trigger to panel
        // does not close it.
        cancelClose();
        closeTimer.current = window.setTimeout(() => setOpen(false), 120);
      }}
      // Closing on blur-out keeps Tab-away behaving like Escape.
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="dpdp-menu"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          linkClass,
          "flex cursor-pointer items-center gap-[5px] border-0 bg-transparent p-0",
          isActive ? "text-primary" : "text-text-secondary",
        )}
      >
        DPDP
        <span
          aria-hidden="true"
          className={cn(
            "text-[9px] leading-none transition-transform duration-[var(--dur-fast)]",
            open && "rotate-180",
          )}
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          id="dpdp-menu"
          className={cn(
            "absolute left-1/2 top-[calc(100%+14px)] z-[70] w-[286px] -translate-x-1/2",
            "flex flex-col rounded-md border border-border bg-surface p-[6px]",
            "shadow-[0_12px_32px_rgba(20,20,15,.13)]",
          )}
        >
          {DPDP_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active === item.key ? "page" : undefined}
              className={cn(
                "flex flex-col gap-[2px] rounded-sm px-[12px] py-[10px] no-underline",
                "hover:bg-[var(--bg-sunken)]",
                active === item.key ? "bg-primary-tint" : "bg-transparent",
              )}
            >
              <span
                className={cn(
                  "font-sans text-[14px] font-semibold",
                  active === item.key ? "text-primary-text" : "text-text",
                )}
              >
                {item.label}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted">
                {item.note}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * SiteNav — sticky masthead. Collapses to a hamburger below 1020px.
 *
 * The source design measured its own width with a ResizeObserver because DC
 * components render in isolated frames; a CSS breakpoint is equivalent here
 * and avoids a hydration flash.
 */
export function SiteNav({ active }: { active?: NavKey }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-[60] font-sans text-text",
        "bg-[color-mix(in_srgb,var(--color-canvas)_92%,transparent)] backdrop-blur-[8px]",
        "border-b border-border",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1180px] items-center gap-[var(--space-5)] px-[var(--space-5)]">
        <Link
          href={routes.home}
          className="flex shrink-0 flex-col gap-[2px] no-underline"
        >
          <span className="font-display text-[19px] font-semibold leading-none tracking-[-0.02em] text-text">
            DPDP<span className="text-primary-text">Academy</span>
          </span>
          <span className="whitespace-nowrap font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-text-secondary">
            Know the law. Prove it.
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-[clamp(10px,1.6vw,22px)] min-[1020px]:flex">
          <Link
            href={routes.overview}
            className={cn(
              linkClass,
              active === "overview" ? "text-primary" : "text-text-secondary",
            )}
          >
            Overview
          </Link>

          <DpdpMenu active={active} />

          {TOP_ITEMS.filter((i) => i.key !== "overview").map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                linkClass,
                active === item.key ? "text-primary" : "text-text-secondary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-[10px] min-[1020px]:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(routes.practiceTest)}
          >
            Practice Test
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push(routes.certification)}
          >
            Get Certified
          </Button>
        </div>

        <div className="flex flex-1 justify-end min-[1020px]:hidden">
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="flex size-[46px] cursor-pointer flex-col justify-center gap-[5px] rounded-sm border border-border bg-surface-raised px-[11px]"
          >
            <span className="h-[2px] rounded-[2px] bg-text" />
            <span className="h-[2px] rounded-[2px] bg-text" />
            <span className="h-[2px] rounded-[2px] bg-text" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col border-t border-border bg-surface px-[var(--space-5)] pb-[20px] pt-[8px] min-[1020px]:hidden">
          <Link
            href={routes.overview}
            onClick={() => setMenuOpen(false)}
            className="border-b border-border px-[4px] py-[15px] font-sans text-[15px] font-semibold text-text no-underline"
          >
            Overview
          </Link>

          {/* The same grouping as the desktop tab, flattened under a heading —
              a nested dropdown inside a drawer is worse than a section label. */}
          <span className="px-[4px] pb-[6px] pt-[16px] font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
            DPDP
          </span>
          {DPDP_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              aria-current={active === item.key ? "page" : undefined}
              className="border-b border-border px-[4px] py-[15px] font-sans text-[15px] font-semibold text-text no-underline"
            >
              {item.label}
            </Link>
          ))}

          <span className="px-[4px] pb-[6px] pt-[16px] font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
            More
          </span>
          {MOBILE_TAIL.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "px-[4px] py-[15px] font-sans text-[15px] font-semibold text-text no-underline",
                i < MOBILE_TAIL.length - 1 && "border-b border-border",
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-[16px] flex">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => router.push(routes.exam)}
            >
              Start Instant Certification
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
