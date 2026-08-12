import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "The cookies used by DPDP Academy, including the necessary consent record and optional Google Analytics cookies.",
  alternates: { canonical: "/cookie-policy" },
};

const COOKIES = [
  {
    name: "cc_consent",
    provider: "DPDP Academy",
    purpose: "Records the cookie categories you selected so the site can honour them.",
    duration: "182 days",
    category: "Necessary",
  },
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose: "Distinguishes browsers for aggregate measurement after analytics consent.",
    duration: "Up to 13 months",
    category: "Analytics",
  },
  {
    name: "_ga_4CRHNPWKYX",
    provider: "Google Analytics",
    purpose: "Maintains measurement state for the DPDP Academy GA4 property after consent.",
    duration: "Up to 13 months",
    category: "Analytics",
  },
] as const;

export default function CookiePolicyPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav />
      <main>
        <PageHero
          breadcrumb="Cookie Policy"
          path={routes.cookies}
          eyebrow="Effective 11 August 2026"
          title="Cookie"
          titleAccent="Policy"
          lede="The site uses one necessary cookie to remember your preference. Google Analytics cookies are permitted only after you grant analytics consent; no marketing or personalisation cookies are configured."
        />

        <article className="bg-[var(--bg-app)]">
          <div className="mx-auto flex w-full max-w-[920px] flex-col gap-[34px] px-[var(--space-5)] py-[clamp(42px,6vw,72px)] text-[15px] leading-[1.78] text-text-secondary">
            <section>
              <h2 className="m-0 font-display text-[26px] font-semibold text-text">
                Cookies in use
              </h2>
              <div className="mt-[16px] overflow-x-auto rounded-lg border border-border bg-surface">
                <table className="min-w-[760px] w-full border-collapse text-left text-[13.5px]">
                  <thead className="bg-[var(--bg-sunken)] text-text">
                    <tr>
                      {['Cookie', 'Provider', 'Purpose', 'Duration', 'Category'].map((heading) => (
                        <th key={heading} className="border-b border-border px-[13px] py-[10px] font-semibold">{heading}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COOKIES.map((cookie) => (
                      <tr key={cookie.name}>
                        <td className="border-b border-border px-[13px] py-[11px] font-mono text-[12px] text-text">{cookie.name}</td>
                        <td className="border-b border-border px-[13px] py-[11px]">{cookie.provider}</td>
                        <td className="border-b border-border px-[13px] py-[11px]">{cookie.purpose}</td>
                        <td className="border-b border-border px-[13px] py-[11px]">{cookie.duration}</td>
                        <td className="border-b border-border px-[13px] py-[11px]">{cookie.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="m-0 font-display text-[26px] font-semibold text-text">
                Changing your choice
              </h2>
              <p className="mb-0 mt-[10px]">
                Use the Cookie settings control fixed to the page edge to grant
                or withdraw optional analytics consent. Withdrawing consent
                prevents the analytics components from loading on later page
                views. You can also delete cookies through browser settings.
              </p>
            </section>

            <section>
              <h2 className="m-0 font-display text-[26px] font-semibold text-text">
                Local storage is separate
              </h2>
              <p className="mb-0 mt-[10px]">
                Reader progress, checklist state, exam credentials and booking
                selections use browser <code>localStorage</code>, not cookies.
                Those values stay on the device and are described in the{" "}
                <a href={routes.privacy} className="font-semibold text-primary-text">Privacy Policy</a>.
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
