import * as React from "react";

export interface FaqItem {
  q: string;
  /** Plain text. Keep the first sentence a complete, quotable answer. */
  a: string;
}

/**
 * Faq — a visible question-and-answer block that also emits `FAQPage` JSON-LD.
 *
 * The markup and the schema are generated from the same array on purpose.
 * Google treats `FAQPage` markup that does not match visible content as a
 * structured-data violation, so there is deliberately no way to emit one
 * without the other.
 *
 * Answers are written to be extractable: the first sentence stands alone as a
 * direct answer, which is the unit an answer engine tends to quote.
 */
export function Faq({
  items,
  heading = "Common questions",
  eyebrow = "FAQ",
}: {
  items: FaqItem[];
  heading?: string;
  eyebrow?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="border-t border-border bg-[var(--bg-app)]">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-[clamp(20px,3vw,28px)] px-[var(--space-5)] py-[clamp(40px,5.4vw,66px)]">
        <div className="flex flex-col gap-[12px]">
          <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary-text">
            {eyebrow}
          </span>
          <h2 className="m-0 font-display text-[clamp(23px,3.2vw,32px)] font-semibold leading-[1.2] tracking-[-0.025em] text-text">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-x-[clamp(24px,4vw,48px)] gap-y-[clamp(20px,2.6vw,28px)]">
          {items.map((item) => (
            <div key={item.q} className="flex flex-col gap-[8px]">
              <h3 className="m-0 font-sans text-[16px] font-semibold leading-[1.4] text-text">
                {item.q}
              </h3>
              <p className="m-0 max-w-[68ch] text-[14.5px] leading-[1.75] text-text-secondary">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
