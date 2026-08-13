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
  "Study the Digital Personal Data Protection Act, 2023 section by section - then prove it with a free graded certification.";

/**
 * When the *content* last changed, as ISO `YYYY-MM-DD`.
 *
 * Bump this by hand when the Act text, question bank or explanatory pages are
 * revised - not on every deploy. Answer engines weigh freshness, and a date
 * that moves with the build clock while the content sits still is a false
 * signal that gets discounted once it is noticed.
 */
export const CONTENT_UPDATED = "2026-08-13";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * `CONTENT_UPDATED` written for a reader rather than a parser.
 *
 * The ISO form is what JSON-LD `dateModified` requires, but a visible badge
 * reading `2026-08-11` sits badly next to the editorial strip's "9 August
 * 2026". Derived rather than maintained separately: one page previously
 * hardcoded its own date here and drifted nine days behind the others.
 *
 * Formatted by hand rather than through `toLocaleDateString` so the output
 * cannot shift with the runtime's ICU data.
 */
export const CONTENT_UPDATED_LABEL = (() => {
  const [year, month, day] = CONTENT_UPDATED.split("-").map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
})();

/**
 * Where a person can reach a person.
 *
 * The site ran on GitHub issues alone for a while. That is an excellent public
 * record and a poor front door: a journalist, a law-school librarian or an
 * association editor checking a claim before citing it will not open an issue,
 * and every one of them is exactly who this site needs to be reachable by.
 */
export const CONTACT_EMAIL = "corrections@dpdpact.net";

/**
 * The registered entity behind the site.
 *
 * Empty fields are *not* rendered, following the same convention as
 * `social.ts`: a half-filled corporate identity is worse than none, and on a
 * page whose argument is "check our sources" an unverifiable claim about
 * ourselves costs more than the empty space does.
 *
 * Fill `name` and `jurisdiction` from the certificate of incorporation, not
 * from memory. `registrationNumber` is the CIN or equivalent; leave it empty
 * rather than approximating it. Everything here is a public factual claim
 * about a legal person, so it either matches the register or it stays blank.
 */
export const LEGAL_ENTITY = {
  /** Registered name, exactly as incorporated. */
  name: "",
  /** e.g. "a private limited company registered in India". */
  form: "",
  /** CIN, LLPIN or equivalent. */
  registrationNumber: "",
  /** Registered office, at least to city and country. */
  jurisdiction: "",
} as const;

/** Whether there is enough of an entity on record to state one publicly. */
export const HAS_LEGAL_ENTITY = LEGAL_ENTITY.name !== "";

/**
 * The Act as published by MeitY, in PDF.
 *
 * Every page that reproduces statutory text links here, so a reader can check
 * the reproduction against the Government's own document. The transcription in
 * `dpdpa-data.ts` was diffed against this file paragraph by paragraph on
 * 9 August 2026: 365 of 365 matched, with the only differences being page
 * furniture the PDF extractor pulled out of the Gazette margins.
 */
export const ACT_SOURCE_PDF =
  "https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf";
