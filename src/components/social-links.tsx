import * as React from "react";

import { SOCIAL_PROFILES } from "@/lib/social";

/**
 * Brand marks, drawn here rather than imported.
 *
 * lucide-react ships no brand icons - it dropped them over trademark concerns -
 * so there is nothing to import for these four. They are the official marks,
 * filled rather than stroked, which is a deliberate departure from the stroke
 * icons used everywhere else: a stroked approximation of a brand logo reads as
 * the wrong logo, and a social row is the one place a filled mark is the
 * convention.
 *
 * Each path is a 24x24 viewBox and inherits `currentColor`, so the row picks up
 * the same hover treatment as the text links beside it.
 */
const MARKS: Record<string, React.ReactNode> = {
  LinkedIn: (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  ),
  X: (
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933zm-1.291 19.49h2.039L6.486 3.24H4.298l13.312 17.403z" />
  ),
  Facebook: (
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  ),
  Instagram: (
    <>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
      <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
      <circle cx="18.406" cy="5.594" r="1.44" />
    </>
  ),
};

const BOX =
  "inline-flex size-[34px] items-center justify-center rounded-sm border border-border";

/**
 * SocialLinks - the footer's brand row.
 *
 * A profile with no URL yet still renders its mark, but as an inert `<span>`
 * rather than an anchor, styled identically so the row looks complete. The
 * alternative - `href="#"` - ships a dead link on every page of the site, which
 * a crawler follows and a reader can click to nowhere. A span costs nothing
 * visually and claims nothing that is not true.
 *
 * Filling in the `href` in `social.ts` is the only step needed to make one
 * live: it becomes a real anchor here and joins `sameAs` in the root layout at
 * the same time, so the footer and the entity graph cannot disagree.
 */
export function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-[10px]">
      {SOCIAL_PROFILES.map(({ name, href }) => {
        const mark = (
          <svg
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            {MARKS[name]}
          </svg>
        );

        // Placeholder: drawn exactly like the live version so the row reads as
        // finished, but inert - no href to follow and nothing announced to a
        // screen reader, because there is no destination to announce. Only the
        // hover affordance is withheld, so nothing invites a click that would
        // do nothing.
        if (!href) {
          return (
            <span
              key={name}
              aria-hidden="true"
              className={`${BOX} bg-surface text-text-secondary`}
            >
              {mark}
            </span>
          );
        }

        return (
          <a
            key={name}
            href={href}
            target="_blank"
            // `me` states that this profile and this site are the same entity,
            // which is the same claim `sameAs` makes in the schema.
            rel="me noopener noreferrer"
            aria-label={`DPDP Academy on ${name}`}
            className={`${BOX} bg-surface text-text-secondary transition-colors hover:border-primary-text hover:text-primary-text`}
          >
            {mark}
          </a>
        );
      })}
    </div>
  );
}
