"use client";

import type { Route } from "next";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { INDUSTRY_MENU, INDUSTRY_SLUGS, industryPath } from "@/lib/industries-menu";
import { cn } from "@/lib/utils";
import { routes, type NavKey } from "@/lib/routes";

/** The four study pages, grouped behind the "DPDP" tab. */
const DPDP_ITEMS: { key: NavKey; href: Route; label: string; note: string }[] =
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
    {
      key: "rules",
      href: routes.rules,
      label: "DPDP Rules 2025",
      note: "Phased commencement · 2025–2027",
    },
    {
      key: "rules",
      href: routes.spdi,
      label: "SPDI Rules vs DPDP",
      note: "What is repealed, and what still binds you today",
    },
    {
      key: "overview",
      href: routes.gdpr,
      label: "DPDP vs GDPR",
      note: "Where the two regimes genuinely diverge",
    },
  ];

const DPDP_KEYS = DPDP_ITEMS.map((i) => i.key);

/** Top-level items that sit outside the DPDP group. */
const TOP_ITEMS: { key: NavKey; href: Route; label: string }[] = [
  { key: "overview", href: routes.overview, label: "Overview" },
  { key: "reader", href: routes.reader, label: "Learn" },
  { key: "blog", href: routes.blog, label: "Blog" },
  { key: "cert", href: routes.certification, label: "Certification" },
];

const MOBILE_TAIL: { href: Route; label: string }[] = [
  { href: routes.reader, label: "Full Text Reader" },
  { href: routes.blog, label: "Blog" },
  { href: routes.certification, label: "Certification" },
  { href: routes.practiceTest, label: "Practice Test" },
  { href: routes.certificate, label: "My Certificate" },
];

const linkClass =
  "whitespace-nowrap font-sans text-[14px] font-semibold no-underline hover:text-primary-text";

/**
 * Open/close behaviour shared by the two dropdown tabs.
 *
 * Opens on hover for pointer users and on click/Enter/Space for everyone else.
 * Hover alone is never required: the trigger is a real button with
 * `aria-expanded`, Escape closes it and returns focus, and an outside click or
 * a route change dismisses it.
 *
 * Extracted when the Implementation mega menu became the second consumer -
 * the dismissal rules are the part that is easy to get subtly wrong, and two
 * copies would drift.
 */
function useNavMenu() {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const closeTimer = React.useRef<number | null>(null);

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

  /** Spread onto the positioned wrapper that contains trigger and panel. */
  const wrapProps = {
    ref: wrapRef,
    onMouseEnter: () => {
      cancelClose();
      setOpen(true);
    },
    onMouseLeave: () => {
      // Small grace period so the diagonal trip from trigger to panel
      // does not close it.
      cancelClose();
      closeTimer.current = window.setTimeout(() => setOpen(false), 120);
    },
    // Closing on blur-out keeps Tab-away behaving like Escape.
    onBlur: (e: React.FocusEvent) => {
      if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
    },
  };

  return { open, setOpen, triggerRef, wrapProps };
}

/** DpdpMenu - the grouped "DPDP" tab. */
function DpdpMenu({ active }: { active?: NavKey }) {
  const { open, setOpen, triggerRef, wrapProps } = useNavMenu();

  const isActive = !!active && DPDP_KEYS.includes(active);

  return (
    <div className="relative" {...wrapProps}>
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
 * IndustryMenu - the "Implementation" mega menu.
 *
 * A wide panel rather than a list because the nine industries need their
 * statutory hook visible to be choosable: "Online gaming" alone does not tell
 * you why it has its own page, and "50 lakh users" does. Same disclosure
 * behaviour as the DPDP tab, via `useNavMenu`.
 *
 * Width is clamped to the viewport because `body` sets `overflow-x-hidden`, so
 * a panel wider than the window would be clipped rather than scrollable.
 */
function IndustryMenu({ active }: { active?: NavKey }) {
  const { open, setOpen, triggerRef, wrapProps } = useNavMenu();
  const isActive = active === "implementation";

  return (
    <div className="relative" {...wrapProps}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="industry-menu"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          linkClass,
          "flex cursor-pointer items-center gap-[5px] border-0 bg-transparent p-0",
          isActive ? "text-primary" : "text-text-secondary",
        )}
      >
        Implementation
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
          id="industry-menu"
          className={cn(
            "absolute left-1/2 top-[calc(100%+14px)] z-[70] -translate-x-1/2",
            "w-[min(760px,calc(100vw-40px))]",
            "rounded-md border border-border bg-surface",
            "shadow-[0_12px_32px_rgba(20,20,15,.13)]",
          )}
        >
          <div className="flex items-baseline justify-between gap-[var(--space-4)] border-b border-border px-[18px] py-[13px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
              By industry
            </span>
            <span className="text-[12px] leading-[1.5] text-text-muted">
              Nine sectors the Act or the Rules treat differently
            </span>
          </div>

          <div className="grid grid-cols-3 gap-[2px] p-[6px]">
            {INDUSTRY_SLUGS.map((slug) => {
              const industry = INDUSTRY_MENU[slug];
              const Icon = industry.icon;
              return (
                <Link
                  key={slug}
                  href={industryPath(slug)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex flex-col gap-[3px] rounded-sm px-[12px] py-[10px] no-underline",
                    "hover:bg-[var(--bg-sunken)]",
                  )}
                >
                  <span className="flex items-center gap-[8px]">
                    <Icon
                      size={16}
                      strokeWidth={1.7}
                      className="shrink-0 text-primary-text"
                      aria-hidden
                    />
                    <span className="font-sans text-[13.5px] font-semibold leading-[1.25] text-text">
                      {industry.name}
                    </span>
                  </span>
                  <span className="text-[11.5px] leading-[1.4] text-text-muted">
                    {industry.menuNote}
                  </span>
                </Link>
              );
            })}
          </div>

          <Link
            href={routes.implementation}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center justify-between border-t border-border px-[18px] py-[12px] no-underline",
              "hover:bg-[var(--bg-sunken)]",
            )}
          >
            <span className="font-sans text-[13px] font-semibold text-primary-text">
              All implementation guides
            </span>
            <span aria-hidden className="text-[13px] text-primary-text">
              →
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

/**
 * SiteNav - sticky masthead. Collapses to a hamburger below 1020px.
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

          <IndustryMenu active={active} />

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

          {/* The same grouping as the desktop tab, flattened under a heading -
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
            Implementation by industry
          </span>
          {INDUSTRY_SLUGS.map((slug) => {
            const industry = INDUSTRY_MENU[slug];
            const Icon = industry.icon;
            return (
              <Link
                key={slug}
                href={industryPath(slug)}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-[10px] border-b border-border px-[4px] py-[15px] font-sans text-[15px] font-semibold text-text no-underline"
              >
                <Icon
                  size={17}
                  strokeWidth={1.7}
                  className="shrink-0 text-primary-text"
                  aria-hidden
                />
                {industry.name}
              </Link>
            );
          })}
          <Link
            href={routes.implementation}
            onClick={() => setMenuOpen(false)}
            className="border-b border-border px-[4px] py-[15px] font-sans text-[15px] font-semibold text-primary-text no-underline"
          >
            All implementation guides
          </Link>

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
