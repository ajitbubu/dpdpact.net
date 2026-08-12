import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How DPDP Academy handles analytics consent, browser-local study data, hosting logs, cookies and privacy requests.",
  alternates: { canonical: "/privacy-policy" },
};

const LOCAL_DATA = [
  ["dpdp.checklist", "Checklist completion state"],
  ["dpdp.credential", "Exam result and certificate name entered by you"],
  ["dpdp.booking", "Locally saved proctored-slot selection"],
  ["dpdpa.pos / dpdpa.read", "Reader position and section progress"],
] as const;

export default function PrivacyPolicyPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav />
      <main>
        <PageHero
          breadcrumb="Privacy Policy"
          path={routes.privacy}
          eyebrow="Effective 11 August 2026"
          title="Privacy"
          titleAccent="Policy"
          lede="DPDP Academy is designed to work without an account. Study progress, checklist state, exam results and booking selections remain in your browser; optional analytics loads only after consent."
        />

        <article className="bg-[var(--bg-app)]">
          <div className="mx-auto flex w-full max-w-[820px] flex-col gap-[34px] px-[var(--space-5)] py-[clamp(42px,6vw,72px)] text-[15px] leading-[1.78] text-text-secondary">
            <section>
              <h2 className="m-0 font-display text-[26px] font-semibold text-text">
                What the site receives
              </h2>
              <p className="mb-0 mt-[10px]">
                Hosting and security infrastructure necessarily receives request
                information such as IP address, browser user-agent, requested
                URL, time and response status. Those providers may retain
                operational logs under their own terms for delivery, abuse
                prevention and security.
              </p>
            </section>

            <section>
              <h2 className="m-0 font-display text-[26px] font-semibold text-text">
                Browser-local information
              </h2>
              <p className="mb-0 mt-[10px]">
                The following values are stored with <code>localStorage</code>{" "}
                on your device. They are not submitted to a DPDP Academy server:
              </p>
              <div className="mt-[14px] overflow-x-auto rounded-lg border border-border bg-surface">
                <table className="w-full border-collapse text-left text-[13.5px]">
                  <thead className="bg-[var(--bg-sunken)] text-text">
                    <tr>
                      <th className="border-b border-border px-[14px] py-[10px] font-semibold">Key</th>
                      <th className="border-b border-border px-[14px] py-[10px] font-semibold">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LOCAL_DATA.map(([key, purpose]) => (
                      <tr key={key}>
                        <td className="border-b border-border px-[14px] py-[10px] font-mono text-[12px] text-text">{key}</td>
                        <td className="border-b border-border px-[14px] py-[10px]">{purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mb-0 mt-[10px]">
                This information remains until you reset the relevant feature,
                clear site data or remove it through browser settings.
              </p>
            </section>

            <section>
              <h2 className="m-0 font-display text-[26px] font-semibold text-text">
                Optional analytics
              </h2>
              <p className="mb-0 mt-[10px]">
                Google Analytics 4 and the Google Tag Manager container load
                only when you grant the analytics category. They may process
                device, interaction and approximate-location information to
                produce aggregated usage reports. Refusing analytics does not
                restrict access to the site. You can reopen Cookie settings at
                any time to change the choice.
              </p>
            </section>

            <section>
              <h2 className="m-0 font-display text-[26px] font-semibold text-text">
                Sharing and sale
              </h2>
              <p className="mb-0 mt-[10px]">
                DPDP Academy does not sell personal data and does not use
                advertising or personalisation cookies. Information is handled
                by hosting and analytics providers only for the purposes
                described above, or where disclosure is required by law.
              </p>
            </section>

            <section>
              <h2 className="m-0 font-display text-[26px] font-semibold text-text">
                Questions and requests
              </h2>
              <p className="mb-0 mt-[10px]">
                Use the <a href={routes.contact} className="font-semibold text-primary-text">contact and corrections page</a>.
                Because the public issue tracker is visible to everyone, do not
                post personal data. Ask for a private response channel without
                describing the private matter in the issue.
              </p>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
