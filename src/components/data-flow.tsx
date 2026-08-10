import { Badge } from "@/components/ui/badge";
import type { ProcessingActivity } from "@/lib/industries";

/**
 * DataFlow - one lane per processing activity, showing the actors the data
 * actually passes through.
 *
 * Layout is flex, not grid, because the number of hops varies per activity and
 * Tailwind cannot generate `grid-cols-${n}` at runtime. Column on mobile, row
 * from `md` up, so the same DOM reflows: `body` sets `overflow-x-hidden`, so a
 * diagram wider than the viewport would be clipped rather than scrollable, and
 * the last hops would silently vanish on a phone.
 *
 *   DESKTOP   [ Checkout ] -> [ Order svc ] -> [ Courier ] -> [ Gateway ]
 *
 *   MOBILE    [ Checkout ]
 *                  |
 *             [ Order svc ]
 *                  |
 *             [ Courier ]
 *
 * The single arrow glyph is rotated 90deg below `md` rather than swapped for a
 * different character, so there is one element to keep in step instead of two.
 *
 * Each lane is an `<ol>`: the sequence is the information, and a list gives a
 * screen reader "2 of 4" for free where a row of divs gives it nothing.
 */
export function DataFlow({
  activities,
}: {
  activities: ProcessingActivity[];
}) {
  return (
    <div className="flex flex-col gap-[var(--space-6)]">
      {activities.map((activity) => (
        <div key={activity.name} className="flex flex-col gap-[14px]">
          <div className="flex flex-col gap-[4px]">
            <h3 className="font-display text-[19px] font-semibold leading-[1.25] tracking-[-0.01em] text-text">
              {activity.name}
            </h3>
            <p className="max-w-[68ch] text-[14.5px] leading-[1.6] text-text-secondary">
              {activity.purpose}
            </p>
          </div>

          <ol className="flex flex-col md:flex-row md:items-stretch">
            {activity.flow.map((stage, i) => (
              <li
                key={stage.actor}
                className="flex flex-col md:flex-1 md:flex-row md:items-stretch"
              >
                <div className="flex flex-1 flex-col gap-[6px] rounded-sm border border-border bg-surface p-[13px]">
                  <span className="font-sans text-[13.5px] font-semibold leading-[1.3] text-text">
                    {stage.actor}
                  </span>
                  <span className="text-[12.5px] leading-[1.45] text-text-secondary">
                    {stage.does}
                  </span>
                  {stage.ref ? (
                    <span className="mt-[2px]">
                      <Badge>{stage.ref}</Badge>
                    </span>
                  ) : null}
                  {stage.risk ? (
                    <span className="mt-[4px] border-t border-border pt-[6px] text-[12px] leading-[1.45] text-text-muted">
                      <span className="font-medium text-primary-text">
                        Fails when:{" "}
                      </span>
                      {stage.risk}
                    </span>
                  ) : null}
                </div>

                {i < activity.flow.length - 1 ? (
                  <span
                    aria-hidden
                    className="flex shrink-0 rotate-90 items-center justify-center self-center px-[10px] py-[6px] text-[15px] leading-none text-text-muted md:rotate-0 md:py-0"
                  >
                    &rarr;
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
