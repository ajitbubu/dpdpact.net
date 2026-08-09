export const EDITORIAL_AUTHOR = {
  name: "DPDP Academy Editorial",
  role: "Legal education and implementation guidance",
} as const;

export const EDITORIAL_REVIEWER = {
  name: "DPDP Academy Source Review",
  role: "Primary-source verification against Gazette and MeitY publications",
} as const;

/**
 * When the content was last reviewed against primary sources.
 *
 * Bump this only when a review actually happened. It is displayed on every
 * article and on the editorial policy page, so a date that drifts ahead of the
 * work is a false trust signal — the same reasoning as `CONTENT_UPDATED`.
 */
export const LEGAL_REVIEWED_ON = "9 August 2026";
