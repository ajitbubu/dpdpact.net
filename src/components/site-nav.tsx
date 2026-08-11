"use client";

import type { Route } from "next";
import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Building2,
  Calculator,
  ClipboardCheck,
  FileText,
  Fingerprint,
  Gavel,
  GitCompare,
  Globe,
  ListChecks,
  Scale,
  SearchCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { INDUSTRY_MENU, INDUSTRY_SLUGS, industryPath } from "@/lib/industries-menu";
import { cn } from "@/lib/utils";
import { routes, type NavKey } from "@/lib/routes";

/**
 * The DPDP tab, as a grouped mega menu.
 *
 * Grouped rather than a flat list because the twelve destinations are three
 * different kinds of thing: the Act read chapter by chapter, the Rules and the
 * guidance built on them, and the comparisons and tools you reach for when
 * working out where you stand. A single column of twelve makes the reader do
 * that sorting themselves.
 *
 * Four of these were previously reachable only from the footer or a related
 * link: the compliance checklist, Consent Managers, Significant Data Fiduciary,
 * the applicability checker and the penalty calculator. The two tools in
 * particular are the most useful things on the site and were the hardest to
 * find.
 *
 * `Overview` is deliberately absent: it is the top-level tab immediately to the
 * left, and listing it here would light up two nav items for one page.
 */
const DPDP_GROUPS: {
  title: string;
  items: { href: Route; label: string; note: string; icon: LucideIcon }[];
}[] = [
  {
    title: "The Act",
    items: [
      {
        href: routes.roles,
        label: "Key Roles",
        note: "§ 2 · § 10 · §§ 18-26",
        icon: Users,
      },
      {
        href: routes.rights,
        label: "Rights & Duties",
        note: "Chapter III · §§ 11-15",
        icon: Scale,
      },
      {
        href: routes.obligations,
        label: "Obligations",
        note: "Chapter II · §§ 4-10",
        icon: ClipboardCheck,
      },
      {
        href: routes.penalties,
        label: "Penalties",
        note: "Chapters VI-VIII · Schedule",
        icon: Gavel,
      },
    ],
  },
  {
    title: "Rules & guidance",
    items: [
      {
        href: routes.rules,
        label: "DPDP Rules 2025",
        note: "Phased commencement · 2025-2027",
        icon: FileText,
      },
      {
        href: routes.checklist,
        label: "Compliance checklist",
        note: "24 controls, saved in your browser",
        icon: ListChecks,
      },
      {
        href: routes.consentManager,
        label: "Consent Managers",
        note: "§ 2(g) · §§ 6(7)-(9) · rule 4",
        icon: Fingerprint,
      },
      {
        href: routes.sdf,
        label: "Significant Data Fiduciary",
        note: "§ 10 · DPO, audit, DPIA",
        icon: Building2,
      },
    ],
  },
  {
    title: "Compare & check",
    items: [
      {
        href: routes.spdi,
        label: "SPDI Rules vs DPDP",
        note: "What is repealed, and what still binds you",
        icon: GitCompare,
      },
      {
        href: routes.gdpr,
        label: "DPDP vs GDPR",
        note: "Where the two regimes genuinely diverge",
        icon: Globe,
      },
      {
        href: routes.applicability,
        label: "Does it apply to you?",
        note: "A decision path through § 3",
        icon: SearchCheck,
      },
      {
        href: routes.penaltyCalculator,
        label: "Penalty explorer",
        note: "The Schedule, by contravention",
        icon: Calculator,
      },
    ],
  },
];

const DPDP_HREFS = DPDP_GROUPS.flatMap((g) => g.items.map((i) => i.href));

/**
 * Which NavKeys light the tab up.
 *
 * Separate from the item list on purpose. Several pages share one `NavKey`
 * (`/consent-manager` and `/significant-data-fiduciary` both pass `roles`), so
 * a key can say "this tab is current" but never "this item is current" - which
 * is why per-item highlighting below matches the pathname instead.
 */
const DPDP_KEYS: NavKey[] = [
  "roles",
  "rights",
  "obligations",
  "penalties",
  "rules",
];

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
const NAV_MENU_CLOSERS = new Set<() => void>();

function useNavMenu() {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const closeTimer = React.useRef<number | null>(null);

  /**
   * Close any other open menu before opening this one.
   *
   * Leaving a panel starts a 120ms grace timer, but entering the next one
   * opens it immediately, so moving between the two tabs used to show both
   * panels at once for that gap. With two narrow dropdowns it was invisible;
   * with two mega menus they overlap across most of their width and it reads
   * as a glitch. The registry is module-scoped because the two menus are
   * siblings with no shared parent state.
   */
  const close = React.useCallback(() => setOpen(false), []);
  React.useEffect(() => {
    NAV_MENU_CLOSERS.add(close);
    return () => {
      NAV_MENU_CLOSERS.delete(close);
    };
  }, [close]);

  const openExclusively = React.useCallback(() => {
    NAV_MENU_CLOSERS.forEach((other) => {
      if (other !== close) other();
    });
    setOpen(true);
  }, [close]);

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
      openExclusively();
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

  return { open, setOpen, openExclusively, triggerRef, wrapProps };
}

/** DpdpMenu - the grouped "DPDP" tab. */
function DpdpMenu({ active }: { active?: NavKey }) {
  const { open, setOpen, openExclusively, triggerRef, wrapProps } =
    useNavMenu();
  const pathname = usePathname();

  const isActive =
    (!!active && DPDP_KEYS.includes(active)) ||
    DPDP_HREFS.some((href) => href === pathname);

  return (
    <div className="relative" {...wrapProps}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="dpdp-menu"
        onClick={() => (open ? setOpen(false) : openExclusively())}
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
            "absolute left-1/2 top-[calc(100%+14px)] z-[70] -translate-x-1/2",
            // 720, not wider: the desktop nav starts at 1020px, where this
            // trigger sits 371px from the left, so a centred panel has 743px
            // before it clips off the left edge. At 820 it did.
            "w-[min(720px,calc(100vw-40px))]",
            "rounded-md border border-border bg-surface",
            "shadow-[0_12px_32px_rgba(20,20,15,.13)]",
          )}
        >
          <div className="flex items-baseline justify-between gap-[var(--space-4)] border-b border-border px-[18px] py-[13px]">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
              The Act, the Rules, and the tools
            </span>
            <span className="text-[12px] leading-[1.5] text-text-muted">
              Act No. 22 of 2023 · Rules notified 13 November 2025
            </span>
          </div>

          <div className="grid grid-cols-3 gap-[2px] p-[6px]">
            {DPDP_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col">
                <span className="px-[12px] pb-[4px] pt-[8px] font-mono text-[10.5px] uppercase tracking-[0.14em] text-primary-text">
                  {group.title}
                </span>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  // Pathname, not the shared NavKey: two items used to claim
                  // aria-current="page" at once on /dpdp-rules-2025.
                  const current = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={current ? "page" : undefined}
                      className={cn(
                        "flex flex-col gap-[3px] rounded-sm px-[12px] py-[9px] no-underline",
                        "hover:bg-[var(--bg-sunken)]",
                        current ? "bg-primary-tint" : "bg-transparent",
                      )}
                    >
                      <span className="flex items-center gap-[8px]">
                        <Icon
                          size={16}
                          strokeWidth={1.7}
                          className="shrink-0 text-primary-text"
                          aria-hidden
                        />
                        <span
                          className={cn(
                            "font-sans text-[13.5px] font-semibold leading-[1.25]",
                            current ? "text-primary-text" : "text-text",
                          )}
                        >
                          {item.label}
                        </span>
                      </span>
                      <span className="text-[11.5px] leading-[1.4] text-text-muted">
                        {item.note}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          <Link
            href={routes.readerFullText}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center justify-between border-t border-border px-[18px] py-[12px] no-underline",
              "hover:bg-[var(--bg-sunken)]",
            )}
          >
            <span className="font-sans text-[13px] font-semibold text-primary-text">
              Read the complete Act, all 44 sections on one page
            </span>
            <span aria-hidden className="text-[13px] text-primary-text">
              &rarr;
            </span>
          </Link>
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
  const { open, setOpen, openExclusively, triggerRef, wrapProps } =
    useNavMenu();
  const isActive = active === "implementation";

  return (
    <div className="relative" {...wrapProps}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="industry-menu"
        onClick={() => (open ? setOpen(false) : openExclusively())}
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
  const pathname = usePathname();
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

          {/* The desktop columns become sections here: a nested dropdown
              inside a drawer is worse than a heading you can scroll past. */}
          {DPDP_GROUPS.map((group) => (
            <React.Fragment key={group.title}>
              <span className="px-[4px] pb-[6px] pt-[16px] font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-text-muted">
                {group.title}
              </span>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex items-center gap-[10px] border-b border-border px-[4px] py-[15px] font-sans text-[15px] font-semibold text-text no-underline"
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.7}
                      className="shrink-0 text-primary-text"
                      aria-hidden
                    />
                    {item.label}
                  </Link>
                );
              })}
            </React.Fragment>
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
