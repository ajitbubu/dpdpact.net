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
  reader: "/reader",
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
  | "reader"
  | "blog"
  | "cert";
