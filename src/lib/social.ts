/**
 * Public profiles for DPDP Academy.
 *
 * Single source of truth, with two consumers: the footer renders these, and the
 * `sameAs` array on the Organization schema in `app/layout.tsx` is built from
 * the same list. Keeping one list is the point - `sameAs` is how an answer
 * engine resolves this site to an entity, and a footer icon that is missing
 * from `sameAs` does none of that work.
 *
 * An entry with an empty `href` still renders its icon in the footer, as an
 * inert placeholder, but is left out of `sameAs`. Filling in the URL is the
 * single step that makes it a real link and a real identity claim at once.
 *
 * Only list a profile that exists and is controlled by DPDP Academy. `sameAs`
 * is an identity claim rather than a link: pointing it at an account someone
 * else owns, or one that 404s, is a false statement about the entity on every
 * page of the site.
 */
export interface SocialProfile {
  /** Display name, and the key that selects the brand mark in `SocialLinks`. */
  name: string;
  /** Canonical profile URL. Empty means "not live yet"; the entry is skipped. */
  href: string;
}

export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  { name: "LinkedIn", href: "" },
  { name: "X", href: "" },
  { name: "Facebook", href: "" },
  { name: "Instagram", href: "" },
];

/** The profiles that are actually live, in declaration order. */
export const ACTIVE_SOCIAL = SOCIAL_PROFILES.filter((p) => p.href !== "");
