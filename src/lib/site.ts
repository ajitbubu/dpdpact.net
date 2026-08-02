/**
 * Canonical origin for this site.
 *
 * Canonical tags, the sitemap and Open Graph URLs are all absolute, so this
 * has to remain stable across production, preview and local builds. Using a
 * Vercel-provided deployment URL here creates duplicate canonical origins.
 */
export const SITE_URL = "https://dpdpact.net";

export const SITE_NAME = "DPDP Academy";

export const SITE_TAGLINE = "Know the law. Prove it.";

export const SITE_DESCRIPTION =
  "Study the Digital Personal Data Protection Act, 2023 section by section — then prove it with a free graded certification.";

/**
 * When the *content* last changed, as ISO `YYYY-MM-DD`.
 *
 * Bump this by hand when the Act text, question bank or explanatory pages are
 * revised — not on every deploy. Answer engines weigh freshness, and a date
 * that moves with the build clock while the content sits still is a false
 * signal that gets discounted once it is noticed.
 */
export const CONTENT_UPDATED = "2026-08-01";
