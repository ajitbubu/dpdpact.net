import type { Metadata } from "next";
import { CertificateBody } from "@/components/certificate-body";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "My DPDP Certificate",
  description:
    "View, personalise and print your Certified DPDP Practitioner certificate, with its credential ID and verification line.",
  alternates: { canonical: "/certificate" },
};

export default function CertificatePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden font-sans text-text">
      <div className="no-print">
        <SiteNav active="cert" />
      </div>

      <section className="flex-1 bg-[var(--bg-sunken)]">
        <CertificateBody />
      </section>

      <div className="no-print">
        <SiteFooter />
      </div>
    </div>
  );
}
