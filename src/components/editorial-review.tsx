import { ShieldCheck } from "lucide-react";
import Link from "next/link";

import {
  EDITORIAL_AUTHOR,
  EDITORIAL_REVIEWER,
  LEGAL_REVIEWED_ON,
} from "@/lib/editorial";
import { routes } from "@/lib/routes";

export function EditorialReview({
  reviewed = LEGAL_REVIEWED_ON,
  scope = "the DPDP Act, 2023 and notified DPDP Rules, 2025",
}: {
  reviewed?: string;
  scope?: string;
}) {
  return (
    <section className="border-y border-border bg-[var(--bg-sunken)]">
      <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-[16px] px-[var(--space-5)] py-[18px]">
        <div className="flex items-start gap-[10px]">
          <ShieldCheck
            size={18}
            aria-hidden="true"
            className="mt-[2px] shrink-0 text-primary-text"
          />
          <p className="m-0 max-w-[78ch] text-[13px] leading-[1.65] text-text-secondary">
            <strong className="font-semibold text-text">
              {EDITORIAL_AUTHOR.name}:
            </strong>{" "}
            {EDITORIAL_AUTHOR.role}.{" "}
            <strong className="font-semibold text-text">
              {EDITORIAL_REVIEWER.name}:
            </strong>{" "}
            {EDITORIAL_REVIEWER.role}; last checked {reviewed} against {scope}.
            Educational information, not legal advice.
          </p>
        </div>
        <Link
          href={routes.editorialPolicy}
          className="shrink-0 text-[12.5px] font-semibold text-primary-text no-underline"
        >
          Review standards and attribution →
        </Link>
      </div>
    </section>
  );
}
