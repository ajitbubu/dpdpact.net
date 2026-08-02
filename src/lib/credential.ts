/** A certification result, persisted to `localStorage` under `dpdp.credential`. */
export interface Credential {
  name: string;
  correct: number;
  total: number;
  pct: number;
  passed: boolean;
  /** ISO date, `YYYY-MM-DD`. */
  date: string;
  /** e.g. `DPDP-2026-4271`. */
  id: string;
}

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

/** `2026-08-01` -> `1 August 2026`. Returns the input unchanged if unparseable. */
export function prettyDate(iso: string): string {
  const p = String(iso).split("-");
  return p.length === 3
    ? `${Number(p[2])} ${MONTHS[Number(p[1]) - 1]} ${p[0]}`
    : iso;
}
