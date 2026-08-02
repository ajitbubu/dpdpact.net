import { LinkButton } from "@/components/ui/button";

/**
 * CtaBand — the closing strip on the study pages: a headline and sub on the
 * left, a secondary action and the "next chapter" primary on the right.
 */
export function CtaBand({
  heading,
  sub,
  secondary,
  primary,
}: {
  heading: string;
  sub: string;
  secondary: { href: string; label: string };
  primary: { href: string; label: string };
}) {
  return (
    <section className="border-t border-border bg-[var(--bg-sunken)]">
      <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-[18px] px-[var(--space-5)] py-[clamp(30px,4vw,46px)]">
        <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-[8px]">
          <span className="font-display text-[clamp(19px,2.4vw,24px)] font-semibold leading-[1.25] text-text">
            {heading}
          </span>
          <span className="text-[14px] leading-[1.7] text-text-secondary">
            {sub}
          </span>
        </div>
        <div className="flex shrink-0 flex-wrap gap-[12px]">
          <LinkButton href={secondary.href} size="lg" variant="secondary">
            {secondary.label}
          </LinkButton>
          <LinkButton href={primary.href} variant="primary" size="lg">
            {primary.label}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
