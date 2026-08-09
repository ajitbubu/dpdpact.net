import { SCHEDULE, type Block } from "@/lib/dpdpa-data";

/** Indent per nesting depth, matching the reader's own scale. */
const PAD = ["0", "clamp(14px,4vw,24px)", "clamp(26px,8vw,48px)", "clamp(36px,12vw,70px)"];
const BODY_FONT_SIZE = "16px";

/**
 * Statutory text as a server component.
 *
 * `reader-client.tsx` renders the same block shapes, but wraps every string in
 * its search-highlighting component and so has to be a client component. That
 * is why this is a separate renderer rather than a shared one: the point of
 * these pages is that the text is in the server response, and refactoring a
 * 1,092-line stateful reader to share a renderer would risk the app for no
 * gain here.
 */
export function ActBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block[0] === "p") {
          return (
            <p
              key={i}
              className="mb-[13px] font-sans font-normal leading-[1.78] text-text-secondary [text-wrap:pretty]"
              style={{ paddingLeft: PAD[block[1]] || "0", fontSize: BODY_FONT_SIZE }}
            >
              {block[2]}
            </p>
          );
        }

        if (block[0] === "ex") {
          return (
            <p
              key={i}
              className="mb-[16px] mt-[2px] font-sans font-normal leading-[1.75] text-text-secondary"
              style={{ paddingLeft: PAD[1], fontSize: BODY_FONT_SIZE }}
            >
              <em className="font-semibold not-italic text-text">
                Explanation.—
              </em>
              {block[1]}
            </p>
          );
        }

        return (
          <div
            key={i}
            className="mb-[20px] mt-[6px] rounded-[10px] border border-[rgba(180,50,26,.35)] bg-[rgba(180,50,26,.05)] px-[14px] pb-[12px] pt-[15px] min-[720px]:px-[18px]"
            style={{ marginLeft: PAD[1] }}
          >
            <div className="mb-[10px] font-sans text-[12px] font-semibold uppercase leading-none tracking-[0.13em] text-primary-text">
              {block[1]}
            </div>
            {block[2].map((paragraph, j) => (
              <p
                key={j}
                className="mb-[8px] font-sans text-[14.5px] font-normal leading-[1.72] text-text-secondary [text-wrap:pretty]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        );
      })}
    </>
  );
}

/** The Schedule's penalty table. Stacks below 720px, as in the reader. */
export function ActScheduleTable() {
  return (
    <div className="flex flex-col gap-[16px]">
      <p className="m-0 font-sans text-[13.5px] font-normal italic leading-[1.6] text-text-muted">
        {SCHEDULE.note} — penalties the Data Protection Board may impose on
        conclusion of an inquiry.
      </p>

      <div className="overflow-hidden rounded-[10px] border border-border">
        <div className="hidden border-b border-border bg-[var(--bg-sunken)] min-[720px]:grid min-[720px]:grid-cols-[64px_minmax(0,1fr)_200px]">
          <div className="px-[14px] py-[12px] font-sans text-[12px] font-semibold leading-[1.4] text-text-secondary">
            Sl. No.
          </div>
          <div className="px-[14px] py-[12px] font-sans text-[12px] font-semibold leading-[1.4] text-text-secondary">
            Breach of provisions of this Act or rules made thereunder
          </div>
          <div className="px-[14px] py-[12px] font-sans text-[12px] font-semibold leading-[1.4] text-text-secondary">
            Penalty
          </div>
        </div>

        {SCHEDULE.rows.map((row) => (
          <div
            key={row.sl}
            className="grid gap-[4px] border-b border-border px-[14px] py-[14px] last:border-b-0 min-[720px]:grid-cols-[64px_minmax(0,1fr)_200px] min-[720px]:gap-0 min-[720px]:px-0 min-[720px]:py-0"
          >
            <div className="font-mono text-[13px] font-semibold leading-[1.5] text-primary-text tabular-nums min-[720px]:px-[14px] min-[720px]:py-[14px]">
              {row.sl}
            </div>
            <div className="font-sans text-[14.5px] font-normal leading-[1.7] text-text-secondary min-[720px]:px-[14px] min-[720px]:py-[14px]">
              {row.breach}
            </div>
            <div className="font-sans text-[14px] font-semibold leading-[1.6] text-text min-[720px]:px-[14px] min-[720px]:py-[14px]">
              {row.penalty}
            </div>
          </div>
        ))}
      </div>

      <p className="m-0 text-right font-sans text-[13px] font-normal leading-[1.6] text-text-muted">
        {SCHEDULE.signature}
      </p>
    </div>
  );
}
