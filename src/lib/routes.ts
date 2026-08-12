/**
 * Route map for the ported Claude Design pages.
 *
 * The source is a flat set of `.dc.html` files that link to each other by
 * filename; this maps each one to its Next.js route.
 */
export const routes = {
  home: "/",
  overview: "/overview",
  roles: "/roles",
  rights: "/rights",
  obligations: "/obligations",
  penalties: "/penalties",
  rules: "/dpdp-rules-2025",
  checklist: "/dpdp-compliance-checklist",
  templates: "/dpdp-compliance-templates",
  deadline: "/dpdp-compliance-deadline",
  spdi: "/dpdp-vs-spdi-rules",
  gdpr: "/dpdp-vs-gdpr",
  consentManager: "/consent-manager",
  sdf: "/significant-data-fiduciary",
  applicability: "/dpdp-applicability",
  penaltyCalculator: "/dpdp-penalty-calculator",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy-policy",
  cookies: "/cookie-policy",
  sources: "/sources",
  editorialPolicy: "/editorial-policy",
  implementation: "/implementation",
  reader: "/reader",
  readerFullText: "/reader/full-text",
  blog: "/blog",
  blogPrimer: "/blog/dpdp-act-2023-practical-primer",
  certification: "/certification",
  schedule: "/certification#schedule",
  practiceTest: "/practice-test",
  exam: "/exam",
  certificate: "/certificate",
  themes: "/themes",
} as const;

/** Which top-level nav item should read as current. */
export type NavKey =
  | "home"
  | "overview"
  | "roles"
  | "rights"
  | "obligations"
  | "penalties"
  | "rules"
  | "implementation"
  | "reader"
  | "blog"
  | "cert";
