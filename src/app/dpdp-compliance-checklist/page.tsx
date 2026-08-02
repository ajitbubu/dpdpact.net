import type { Metadata } from "next";
import { AlertTriangle, CheckSquare2 } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { CHECKLIST_TOTAL } from "@/lib/compliance-checklist";
import { routes } from "@/lib/routes";

import { ChecklistClient } from "./checklist-client";

export const metadata: Metadata = {
  title: "DPDP Compliance Checklist — 24 Controls",
  description:
    "Track 24 practical DPDP Act and Rules controls across governance, consent, security, breaches, individual rights, children and assurance.",
  alternates: { canonical: "/dpdp-compliance-checklist" },
};

export default function DpdpComplianceChecklistPage() {
  return (
    <div className="overflow-x-hidden font-sans text-text">
      <SiteNav />

      <main>
        <PageHero
          breadcrumb="DPDP Compliance Checklist"
          eyebrow={CHECKLIST_TOTAL + " controls · Saved on this device"}
          title="Turn the DPDP Framework"
          titleAccent="Into Owned Evidence"
          lede="Work through the controls with legal, product, security, engineering, support and procurement. Each item names the evidence that makes readiness demonstrable—not merely documented."
        >
          <div className="mt-[22px] flex flex-wrap gap-[10px]">
            <Badge>Act + notified Rules 2025</Badge>
            <Badge tone="neutral">No sign-up</Badge>
            <Badge tone="neutral">Private to your browser</Badge>
          </div>
        </PageHero>

        <section className="bg-[var(--bg-app)]">
          <div className="mx-auto grid w-full max-w-[1180px] gap-[24px] px-[var(--space-5)] py-[clamp(40px,6vw,72px)] min-[960px]:grid-cols-[minmax(0,1fr)_270px]">
            <ChecklistClient />

            <aside className="order-first min-[960px]:order-last">
              <div className="flex flex-col gap-[18px] min-[960px]:sticky min-[960px]:top-[96px]">
                <div className="rounded-lg border border-border bg-[var(--bg-sunken)] p-[20px]">
                  <CheckSquare2
                    size={22}
                    aria-hidden="true"
                    className="mb-[12px] text-primary-text"
                  />
                  <h2 className="m-0 font-display text-[20px] font-semibold text-text">
                    How to use it
                  </h2>
                  <ol className="mb-0 mt-[12px] flex list-decimal flex-col gap-[9px] pl-[18px] text-[13.5px] leading-[1.65] text-text-secondary">
                    <li>Assign the named owner groups.</li>
                    <li>Mark an item only when evidence exists.</li>
                    <li>Record gaps in your remediation backlog.</li>
                    <li>Re-run after material system changes.</li>
                  </ol>
                </div>

                <div className="rounded-lg border border-warning bg-warning-tint p-[20px]">
                  <AlertTriangle
                    size={21}
                    aria-hidden="true"
                    className="mb-[10px] text-warning-text"
                  />
                  <h2 className="m-0 font-display text-[18px] font-semibold text-text">
                    Readiness, not a legal opinion
                  </h2>
                  <p className="mb-0 mt-[8px] text-[13.5px] leading-[1.65] text-text-secondary">
                    This checklist is educational and general. Scope, sector
                    rules, notified exemptions and later directions may change
                    what a particular organisation must do.
                  </p>
                </div>

                <LinkButton
                  href={routes.rules}
                  variant="secondary"
                  size="lg"
                  fullWidth
                >
                  Review the Rules timeline
                </LinkButton>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
