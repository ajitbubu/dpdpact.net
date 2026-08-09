import * as React from "react";

/**
 * A labelled list of provisions with commentary.
 *
 * The study pages all needed the same shape once they went deeper: a statutory
 * reference, what it says, and what that means in practice. Extracted after
 * the fourth copy rather than the first.
 */
export function ProvisionNotes({
  eyebrow,
  heading,
  intro,
  items,
  tone = "app",
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  items: { ref: string; title: string; body: string; note?: string }[];
  tone?: "app" | "sunken";
}) {
  return (
    <section
      className={
        tone === "sunken"
          ? "border-t border-border bg-[var(--bg-sunken)]"
          : "border-t border-border bg-[var(--bg-app)]"
      }
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[22px] px-[var(--space-5)] py-[clamp(38px,5vw,64px)]">
        <div>
          <span className="mb-[10px] block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-primary-text">
            {eyebrow}
          </span>
          <h2 className="m-0 font-display text-[clamp(25px,3.5vw,36px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
            {heading}
          </h2>
          {intro ? (
            <p className="mb-0 mt-[12px] max-w-[76ch] text-[15px] leading-[1.75] text-text-secondary">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-[13px]">
          {items.map((item) => (
            <div
              key={item.ref + item.title}
              className="flex flex-wrap gap-[16px] rounded-lg border border-border bg-surface p-[clamp(18px,2.6vw,24px)]"
            >
              <span className="flex-[0_0_112px] font-mono text-[12.5px] font-semibold leading-[1.5] text-primary-text">
                {item.ref}
              </span>
              <span className="flex min-w-0 flex-[1_1_420px] flex-col gap-[8px]">
                <span className="font-display text-[17.5px] font-semibold leading-[1.3] text-text">
                  {item.title}
                </span>
                <span className="text-[14.5px] leading-[1.75] text-text-secondary">
                  {item.body}
                </span>
                {item.note ? (
                  <span className="border-t border-border pt-[10px] text-[13.5px] leading-[1.7] text-text-muted">
                    {item.note}
                  </span>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
