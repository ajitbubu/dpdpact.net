import {
  Building2,
  Cloud,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Rocket,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Route } from "next";

/**
 * Industry identity: the slugs, the menu labels, and nothing else.
 *
 * This module exists so the client-side nav can render the Implementation mega
 * menu without pulling in the sector content. `site-nav.tsx` is a client
 * component, and importing the content module there shipped every industry's
 * legal prose to every visitor - 51 KB raw, 12.5 KB brotli, on all 87 pages -
 * because bundlers cannot tree-shake object properties.
 *
 * `INDUSTRY_SLUGS` is the single source of truth for which industries exist.
 * The content module keys off `IndustrySlug`, so an entry present here and
 * missing there (or the reverse) is a compile error rather than a nav item that
 * 404s.
 */

/** Ordering for the menu, the hub and the sitemap. Third Schedule classes lead. */
export const INDUSTRY_SLUGS = [
  "e-commerce",
  "online-gaming",
  "social-media",
  "healthcare",
  "financial-services",
  "edtech",
  "saas",
  "startups",
  "government",
] as const;

export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number];

/**
 * Narrows a route param back to a slug.
 *
 * `generateStaticParams` hands the segment back as `string`, so without this
 * the page would need a cast - which is exactly the hole this module closes.
 */
export function isIndustrySlug(value: string): value is IndustrySlug {
  return (INDUSTRY_SLUGS as readonly string[]).includes(value);
}

export interface IndustryMenuEntry {
  /** Menu label. Kept short - it sits in a three-column grid. */
  name: string;
  /** One line under the label in the mega menu. */
  menuNote: string;
  icon: LucideIcon;
}

export const INDUSTRY_MENU: Record<IndustrySlug, IndustryMenuEntry> = {
  "e-commerce": {
    name: "E-commerce & retail",
    menuNote: "Named in the Third Schedule · 2 crore users",
    icon: ShoppingCart,
  },
  "online-gaming": {
    name: "Online gaming",
    menuNote: "Lowest retention threshold · 50 lakh users",
    icon: Gamepad2,
  },
  "social-media": {
    name: "Social media",
    menuNote: "Third Schedule class · the public-data carve-out",
    icon: Users,
  },
  "healthcare": {
    name: "Healthcare",
    menuNote: "Fourth Schedule turns § 9 off for clinical care",
    icon: HeartPulse,
  },
  "financial-services": {
    name: "Banking & financial services",
    menuNote: "§ 17(1)(f) is written for lenders",
    icon: Landmark,
  },
  "edtech": {
    name: "EdTech & education",
    menuNote: "Section 9 is the whole compliance problem",
    icon: GraduationCap,
  },
  "saas": {
    name: "SaaS & IT services",
    menuNote: "You are probably both Fiduciary and Processor",
    icon: Cloud,
  },
  "startups": {
    name: "Startups",
    menuNote: "§ 17(3) names you - but nothing is automatic",
    icon: Rocket,
  },
  "government": {
    name: "Government & public sector",
    menuNote: "§ 7(b) legitimate use · § 17(2) exemptions",
    icon: Building2,
  },
};

/**
 * Typed href for an industry.
 *
 * The cast is unavoidable: `typedRoutes` knows the dynamic segment as
 * `/implementation/[industry]`, not as any concrete path. It is sound here
 * only because the input is an `IndustrySlug` - `industryPath("typo")` is a
 * compile error, which it was not when this took a bare `string`.
 */
export function industryPath(slug: IndustrySlug) {
  return `/implementation/${slug}` as Route<`/implementation/${string}`>;
}
