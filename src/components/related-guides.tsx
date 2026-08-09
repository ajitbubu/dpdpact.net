import type { Route } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Contextual links from a study page into the guides that go deeper on it.
 *
 * The site-wide nav and footer already link every page to every other page,
 * so link equity was spread evenly and meant nothing. Six blog posts had
 * exactly one internal inbound link — the `/blog` index — which is not enough
 * for a crawler to treat them as worth indexing. These links carry topical
 * meaning; the boilerplate ones do not.
 */
export function RelatedGuides({
  heading,
  guides,
}: {
  heading: string;
  guides: { href: Route; label: string; blurb: string }[];
}) {
  return (
    <section className="border-t border-border bg-[var(--bg-sunken)]">
      <div className="mx-auto w-full max-w-[1180px] px-[var(--space-5)] py-[clamp(30px,4.4vw,52px)]">
        <h2 className="m-0 font-display text-[clamp(20px,2.6vw,26px)] font-semibold leading-[1.25] tracking-[-0.025em] text-text">
          {heading}
        </h2>
        <div className="mt-[20px] grid gap-[12px] min-[720px]:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex flex-col gap-[6px] rounded-lg border border-border bg-surface px-[18px] py-[16px] no-underline hover:border-primary-text"
            >
              <span className="flex items-center justify-between gap-[12px] font-sans text-[14.5px] font-semibold leading-[1.4] text-text">
                {guide.label}
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-primary-text transition-transform group-hover:translate-x-[2px]"
                />
              </span>
              <span className="text-[13.5px] leading-[1.6] text-text-secondary">
                {guide.blurb}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
