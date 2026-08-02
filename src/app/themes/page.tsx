import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Light theme directions",
  description:
    "Turn 1 design exploration: three light theme directions for the DPDP learning site.",
  // A design artefact, not a page for readers — keep it out of the index.
  robots: { index: false, follow: false },
};

/**
 * Themes — the Turn 1 design canvas from the Claude Design project.
 *
 * Three light-theme directions rendered side by side; option 1c ("Bulletin")
 * is the one that was chosen and became the site's theme. This page is a
 * design artefact, so it deliberately does not use the Sentinel tokens — the
 * colours and fonts are hard-coded exactly as the source sample had them.
 */
export default function ThemesPage() {
  return (
    <section
      className={`${sourceSerif.variable} bg-[#E9EAEC] px-[48px] pb-[80px] pt-[56px] font-sans`}
    >
      <div className="mb-[40px] flex max-w-[70ch] flex-col gap-[8px]">
        <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6B7280]">
          Turn 1 · Light theme directions
        </span>
        <h1 className="m-0 text-[30px] font-bold tracking-[-0.02em] text-[#111827]">
          Three light themes for the DPDP learning site
        </h1>
        <p className="m-0 text-[15px] leading-[1.7] text-[#4B5563] [text-wrap:pretty]">
          Each sample shows the same five elements — nav, hero, primary actions,
          a study card and the exam stat row — so the difference is theme, not
          layout. Reply with an id to apply one across all 13 pages.
        </p>
      </div>

      <div className="flex flex-wrap items-start gap-[32px]">
        {/* ------------------------------------------------------ 1a Statute */}
        <div id="1a" className="flex w-[620px] flex-col gap-[12px]">
          <div className="flex items-baseline gap-[10px]">
            <span className="inline-flex items-center rounded-full bg-[#1F6F52] px-[10px] py-[4px] text-[12px] font-semibold tracking-[0.04em] text-white">
              1a
            </span>
            <span className="text-[15px] font-semibold text-[#111827]">
              Statute
            </span>
            <span className="text-[13px] text-[#6B7280]">
              Warm paper, serif headings, one deep-green accent
            </span>
          </div>
          <div className="overflow-hidden rounded-[14px] border border-[#D9D5CC] bg-[#FAF8F4] shadow-[0_1px_2px_rgba(28,25,20,.06),0_12px_28px_rgba(28,25,20,.07)]">
            <div className="flex items-center justify-between gap-[16px] border-b border-[#E7E2D8] bg-[#FFFDF9] px-[24px] py-[14px]">
              <span className="font-[family-name:var(--font-source-serif)] text-[18px] font-bold tracking-[-0.01em] text-[#1C1A16]">
                DPDP<span className="text-[#1F6F52]">Academy</span>
              </span>
              <span className="flex gap-[18px] text-[13px] font-medium text-[#5A5449]">
                <span>Overview</span>
                <span>Rights</span>
                <span>Obligations</span>
                <span className="font-semibold text-[#1F6F52]">Certify</span>
              </span>
            </div>
            <div className="flex flex-col gap-[14px] px-[24px] pb-[26px] pt-[30px]">
              <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#8A8272]">
                Act No. 22 of 2023
              </span>
              <h2 className="m-0 font-[family-name:var(--font-source-serif)] text-[34px] font-bold leading-[1.15] tracking-[-0.02em] text-[#1C1A16] [text-wrap:pretty]">
                Learn the Data Protection Act, certify it today
              </h2>
              <p className="m-0 max-w-[52ch] text-[14px] leading-[1.75] text-[#5A5449]">
                Nine chapters, forty-four sections, one Schedule of penalties —
                broken into study pages you can finish in an afternoon.
              </p>
              <div className="flex gap-[10px] pt-[2px]">
                <span className="inline-flex h-[42px] items-center rounded-[8px] bg-[#1F6F52] px-[20px] text-[14px] font-semibold text-white">
                  Get certified
                </span>
                <span className="inline-flex h-[42px] items-center rounded-[8px] border border-[#CFC9BC] bg-transparent px-[20px] text-[14px] font-semibold text-[#1C1A16]">
                  Free practice test
                </span>
              </div>
              <div className="mt-[6px] grid grid-cols-2 gap-[12px]">
                {[
                  {
                    eyebrow: "Chapter III · §§ 11–15",
                    title: "Rights & duties",
                    body: "Four rights of the individual and the five duties that come with them.",
                  },
                  {
                    eyebrow: "Chapters VI–VIII",
                    title: "Penalties",
                    body: "How the Board inquires and the seven penalty heads up to ₹250 crore.",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="flex flex-col gap-[6px] rounded-[10px] border border-[#E7E2D8] bg-[#FFFDF9] px-[18px] py-[16px]"
                  >
                    <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#8A8272]">
                      {c.eyebrow}
                    </span>
                    <span className="font-[family-name:var(--font-source-serif)] text-[17px] font-bold text-[#1C1A16]">
                      {c.title}
                    </span>
                    <span className="text-[13px] leading-[1.65] text-[#5A5449]">
                      {c.body}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-[6px] flex gap-[28px] border-t border-[#E7E2D8] px-[18px] py-[16px]">
                <span className="flex flex-col gap-[3px]">
                  <span className="font-[family-name:var(--font-source-serif)] text-[26px] font-bold text-[#1F6F52]">
                    15
                  </span>
                  <span className="text-[12px] text-[#8A8272]">Questions</span>
                </span>
                <span className="flex flex-col gap-[3px]">
                  <span className="font-[family-name:var(--font-source-serif)] text-[26px] font-bold text-[#1C1A16]">
                    20<span className="text-[14px] text-[#8A8272]"> min</span>
                  </span>
                  <span className="text-[12px] text-[#8A8272]">Time limit</span>
                </span>
                <span className="flex flex-col gap-[3px]">
                  <span className="font-[family-name:var(--font-source-serif)] text-[26px] font-bold text-[#1C1A16]">
                    70<span className="text-[14px] text-[#8A8272]">%</span>
                  </span>
                  <span className="text-[12px] text-[#8A8272]">Pass mark</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------- 1b Campus */}
        <div id="1b" className="flex w-[620px] flex-col gap-[12px]">
          <div className="flex items-baseline gap-[10px]">
            <span className="inline-flex items-center rounded-full bg-[#4F46E5] px-[10px] py-[4px] text-[12px] font-semibold tracking-[0.04em] text-white">
              1b
            </span>
            <span className="text-[15px] font-semibold text-[#111827]">
              Campus
            </span>
            <span className="text-[13px] text-[#6B7280]">
              White surfaces, indigo accent, progress made visible
            </span>
          </div>
          <div className="overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-[#F7F8FB] shadow-[0_1px_2px_rgba(16,24,40,.05),0_12px_28px_rgba(16,24,40,.07)]">
            <div className="flex items-center justify-between gap-[16px] border-b border-[#E5E7EB] bg-white px-[24px] py-[14px]">
              <span className="flex items-center gap-[9px]">
                <span className="grid size-[26px] place-items-center rounded-[7px] bg-[#4F46E5] text-[13px] font-bold text-white">
                  D
                </span>
                <span className="text-[16px] font-semibold tracking-[-0.01em] text-[#111827]">
                  DPDP Academy
                </span>
              </span>
              <span className="flex gap-[18px] text-[13px] font-medium text-[#6B7280]">
                <span>Overview</span>
                <span>Rights</span>
                <span>Obligations</span>
                <span className="font-semibold text-[#4F46E5]">Certify</span>
              </span>
            </div>
            <div className="flex flex-col gap-[14px] px-[24px] pb-[26px] pt-[30px]">
              <span className="inline-flex self-start items-center rounded-full bg-[#EEF2FF] px-[12px] py-[5px] text-[12px] font-semibold text-[#4338CA]">
                Act No. 22 of 2023
              </span>
              <h2 className="m-0 text-[32px] font-bold leading-[1.18] tracking-[-0.025em] text-[#111827] [text-wrap:pretty]">
                Learn the Data Protection Act, certify it today
              </h2>
              <p className="m-0 max-w-[52ch] text-[14px] leading-[1.7] text-[#4B5563]">
                Nine chapters, forty-four sections, one Schedule of penalties —
                broken into study pages you can finish in an afternoon.
              </p>
              <div className="flex gap-[10px] pt-[2px]">
                <span className="inline-flex h-[42px] items-center rounded-[8px] bg-[#4F46E5] px-[20px] text-[14px] font-semibold text-white">
                  Get certified
                </span>
                <span className="inline-flex h-[42px] items-center rounded-[8px] border border-[#D1D5DB] bg-white px-[20px] text-[14px] font-semibold text-[#111827]">
                  Free practice test
                </span>
              </div>
              <div className="mt-[6px] grid grid-cols-2 gap-[12px]">
                <div className="flex flex-col gap-[9px] rounded-[12px] border border-[#E5E7EB] bg-white px-[18px] py-[16px] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
                  <span className="inline-flex self-start rounded-full bg-[#DCFCE7] px-[10px] py-[3px] text-[12px] font-semibold text-[#15803D]">
                    Completed
                  </span>
                  <span className="text-[16px] font-semibold text-[#111827]">
                    Rights &amp; duties
                  </span>
                  <span className="block h-[6px] overflow-hidden rounded-[3px] bg-[#E5E7EB]">
                    <span className="block h-full w-full bg-[#16A34A]" />
                  </span>
                  <span className="text-[12px] text-[#6B7280]">
                    5 of 5 sections
                  </span>
                </div>
                <div className="flex flex-col gap-[9px] rounded-[12px] border border-[#E5E7EB] bg-white px-[18px] py-[16px] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
                  <span className="inline-flex self-start rounded-full bg-[#FEF3C7] px-[10px] py-[3px] text-[12px] font-semibold text-[#B45309]">
                    In progress
                  </span>
                  <span className="text-[16px] font-semibold text-[#111827]">
                    Penalties
                  </span>
                  <span className="block h-[6px] overflow-hidden rounded-[3px] bg-[#E5E7EB]">
                    <span className="block h-full w-[40%] bg-[#4F46E5]" />
                  </span>
                  <span className="text-[12px] text-[#6B7280]">
                    2 of 5 sections
                  </span>
                </div>
              </div>
              <div className="mt-[6px] grid grid-cols-3 gap-[12px]">
                <div className="flex flex-col gap-[4px] rounded-[12px] border border-[#E5E7EB] bg-white px-[16px] py-[14px]">
                  <span className="text-[24px] font-semibold tracking-[-0.02em] text-[#111827]">
                    15
                  </span>
                  <span className="text-[12px] text-[#6B7280]">Questions</span>
                </div>
                <div className="flex flex-col gap-[4px] rounded-[12px] border border-[#E5E7EB] bg-white px-[16px] py-[14px]">
                  <span className="text-[24px] font-semibold tracking-[-0.02em] text-[#111827]">
                    20<span className="text-[14px] text-[#6B7280]"> min</span>
                  </span>
                  <span className="text-[12px] text-[#6B7280]">Time limit</span>
                </div>
                <div className="flex flex-col gap-[4px] rounded-[12px] border border-[#E5E7EB] bg-white px-[16px] py-[14px]">
                  <span className="text-[24px] font-semibold tracking-[-0.02em] text-[#15803D]">
                    70<span className="text-[14px] text-[#6B7280]">%</span>
                  </span>
                  <span className="text-[12px] text-[#6B7280]">Pass mark</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------- 1c Bulletin (chosen) */}
        <div id="1c" className="flex w-[620px] flex-col gap-[12px]">
          <div className="flex items-baseline gap-[10px]">
            <span className="inline-flex items-center rounded-full bg-[#B4321A] px-[10px] py-[4px] text-[12px] font-semibold tracking-[0.04em] text-white">
              1c
            </span>
            <span className="text-[15px] font-semibold text-[#111827]">
              Bulletin
            </span>
            <span className="text-[13px] text-[#6B7280]">
              Hairline grid, no cards, editorial urgency
            </span>
          </div>
          <div className="overflow-hidden rounded-[14px] border border-[#DCDAD3] bg-[#F5F5F2] shadow-[0_1px_2px_rgba(20,20,18,.05),0_12px_28px_rgba(20,20,18,.06)]">
            <div className="flex items-center justify-between gap-[16px] border-b-2 border-[#14140F] px-[24px] py-[13px]">
              <span className="font-display text-[19px] font-semibold tracking-[-0.015em] text-[#14140F]">
                DPDP Academy
              </span>
              <span className="flex gap-[18px] font-mono text-[12px] uppercase tracking-[0.04em] text-[#57564E]">
                <span>Overview</span>
                <span>Rights</span>
                <span className="text-[#B4321A]">Certify</span>
              </span>
            </div>
            <div className="flex flex-col gap-[14px] px-[24px] pb-[24px] pt-[28px]">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-[#B4321A]">
                India · Act No. 22 of 2023
              </span>
              <h2 className="m-0 font-display text-[36px] font-semibold leading-[1.08] tracking-[-0.025em] text-[#14140F] [text-wrap:pretty]">
                Learn the Data Protection Act, certify it today
              </h2>
              <p className="m-0 max-w-[52ch] text-[14px] leading-[1.75] text-[#4A483F]">
                Nine chapters, forty-four sections, one Schedule of penalties —
                broken into study pages you can finish in an afternoon.
              </p>
              <div className="flex gap-[10px] pt-[2px]">
                <span className="inline-flex h-[42px] items-center rounded-[4px] bg-[#14140F] px-[20px] text-[14px] font-semibold text-[#F5F5F2]">
                  Get certified
                </span>
                <span className="inline-flex h-[42px] items-center rounded-[4px] border border-[#14140F] px-[20px] text-[14px] font-semibold text-[#14140F]">
                  Free practice test
                </span>
              </div>
              <div className="mt-[10px] flex flex-col border-t border-[#DCDAD3]">
                {[
                  {
                    ref: "§§ 11–15",
                    title: "Rights & duties",
                    body: "Four rights of the individual and the five duties that come with them.",
                  },
                  {
                    ref: "§§ 33–39",
                    title: "Penalties",
                    body: "How the Board inquires and the seven penalty heads up to ₹250 crore.",
                  },
                ].map((row) => (
                  <div
                    key={row.title}
                    className="flex items-baseline gap-[18px] border-b border-[#DCDAD3] py-[14px]"
                  >
                    <span className="flex-[0_0_84px] font-mono text-[12px] text-[#8A8880]">
                      {row.ref}
                    </span>
                    <span className="flex flex-1 flex-col gap-[4px]">
                      <span className="font-display text-[18px] font-semibold text-[#14140F]">
                        {row.title}
                      </span>
                      <span className="text-[13px] leading-[1.65] text-[#4A483F]">
                        {row.body}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-[8px] flex gap-0">
                <span className="flex flex-1 flex-col gap-[3px] pr-[20px]">
                  <span className="font-display text-[28px] font-semibold text-[#14140F]">
                    15
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#8A8880]">
                    Questions
                  </span>
                </span>
                <span className="flex flex-1 flex-col gap-[3px] border-l border-[#DCDAD3] px-[20px]">
                  <span className="font-display text-[28px] font-semibold text-[#14140F]">
                    20
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#8A8880]">
                    Minutes
                  </span>
                </span>
                <span className="flex flex-1 flex-col gap-[3px] border-l border-[#DCDAD3] pl-[20px]">
                  <span className="font-display text-[28px] font-semibold text-[#B4321A]">
                    70%
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-[#8A8880]">
                    Pass mark
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
