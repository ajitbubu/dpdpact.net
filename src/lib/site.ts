/**
 * Canonical origin for this site.
 *
 * Canonical tags, the sitemap and Open Graph URLs are all absolute, so this
 * has to be right in production. Resolution order:
 *
 *   1. `NEXT_PUBLIC_SITE_URL` — set this to your real domain.
 *   2. Vercel's production URL, so a Vercel deploy works with no config.
 *   3. localhost, for development.
 *
 * If you deploy anywhere other than Vercel without setting
 * `NEXT_PUBLIC_SITE_URL`, every canonical and sitemap entry will point at
 * localhost and none of the pages will be indexed correctly.
 */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

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
