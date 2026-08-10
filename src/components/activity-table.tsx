import type { ProcessingActivity } from "@/lib/industries";

/**
 * ActivityTable - the scannable index over a sector's processing activities.
 *
 * Deliberately narrow. Three columns fit a 390px screen without a horizontal
 * scroller, and the detail (actors, systems, failure modes, evidence) lives in
 * the flow diagram below rather than being restated here. Repeating it in both
 * places is how the two drift apart.
 *
 * One row per *activity*, never per data category. Lawful basis and erasure
 * attach to a purpose: the same phone number can be consented marketing,
 * contract fulfilment and a statutory record at once, with three different
 * erasure answers, so a row keyed on "phone number" has to pick one and is
 * wrong for the other two.
 */
export function ActivityTable({
  activities,
}: {
  activities: ProcessingActivity[];
}) {
  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">
        Processing activities, their lawful basis and when the data must be
        erased
      </caption>
      <thead>
        <tr className="border-b border-border">
          {["Activity", "Lawful basis", "When it must go"].map((h) => (
            <th
              key={h}
              scope="col"
              className="py-[10px] pr-[12px] align-bottom font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-text-muted last:pr-0"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr
            key={activity.name}
            className="border-b border-border last:border-0 align-top"
          >
            <th
              scope="row"
              className="w-[34%] py-[13px] pr-[12px] text-left align-top"
            >
              <span className="block font-sans text-[14px] font-semibold leading-[1.3] text-text">
                {activity.name}
              </span>
              <span className="mt-[3px] block text-[12.5px] leading-[1.45] font-normal text-text-muted">
                {activity.data.join(", ")}
              </span>
            </th>
            <td className="w-[33%] py-[13px] pr-[12px] align-top">
              <span className="block font-mono text-[11.5px] font-medium text-primary-text">
                {activity.ground.ref}
              </span>
              <span className="mt-[3px] block text-[12.5px] leading-[1.5] text-text-secondary">
                {activity.ground.text}
              </span>
            </td>
            <td className="w-[33%] py-[13px] align-top">
              <span className="block font-mono text-[11.5px] font-medium text-primary-text">
                {activity.retention.ref}
              </span>
              <span className="mt-[3px] block text-[12.5px] leading-[1.5] text-text-secondary">
                {activity.retention.text}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
