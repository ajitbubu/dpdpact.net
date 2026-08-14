import Link from "next/link";
import * as React from "react";

import { actPath, getActPart } from "@/lib/act-sections";

/**
 * A provision reference with its sections linked to the reader.
 *
 * The study pages carry ninety-odd of these in `ProvisionNotes` cards and none
 * of them led anywhere, which left the 45 statutory pages reachable almost
 * only from `/reader` and from each other. Linking the reference a reader is
 * already looking at is the cheapest way to feed them.
 *
 * A reference is a ` · `-separated list of parts - `"§ 2(g) · § 6(7)–(9)"`,
 * `"Rule 3 · Act § 5"`. Each part that names a section of the Act links to
 * that section. Anything else - the Rules, the Schedules, `§ 43A` of the IT
 * Act - renders unchanged, because there is no page here to point it at.
 *
 * Sub-clauses are deliberately not resolved: `§ 8(6)` links to section 8,
 * because that is the page that exists. The section number is the only part
 * of the reference this site has a URL for.
 */
export function ProvisionRef({ value }: { value: string }) {
  const parts = value.split(" · ");

  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={part + i}>
          {i > 0 ? " · " : null}
          <LinkedPart part={part} />
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * Statutes that are not this one.
 *
 * Checked before the section lookup, because the lookup cannot tell the
 * difference: `IT Act § 43A` names section 43A of the Information Technology
 * Act, 2000, and DPDP section 43 exists, so a bare number match resolves it to
 * an unrelated provision of a different Act rather than failing safely.
 */
const OTHER_STATUTE =
  /\bIT Act\b|\bSPDI\b|\bRTI\b|Information Technology|Right to Information/;

function LinkedPart({ part }: { part: string }) {
  if (OTHER_STATUTE.test(part)) return <>{part}</>;

  // `§§ 11–14` and `§ 8(6)` both resolve to the first section named. The
  // trailing `(?!\d)` stops `§ 4` matching inside a longer number.
  const match = /§{1,2}\s*(\d+)(?!\d)/.exec(part);
  if (!match) return <>{part}</>;

  const slug = `section-${Number(match[1])}` as const;

  // A typo, or a section number this site has no page for.
  if (!getActPart(slug)) return <>{part}</>;

  return (
    <Link
      href={actPath(slug)}
      className="text-primary-text no-underline hover:underline"
    >
      {part}
    </Link>
  );
}
