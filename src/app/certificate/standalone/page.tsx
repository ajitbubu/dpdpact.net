import type { Metadata } from "next";

import { CertificateBody } from "@/components/certificate-body";

export const metadata: Metadata = {
  title: "Certificate",
  description:
    "The DPDP Academy certificate on its own, without the site chrome — for printing and embedding.",
  // Same content as /certificate. Indexing both would be duplicate content, so
  // this print/embed variant is excluded and points its canonical there.
  robots: { index: false, follow: true },
  alternates: { canonical: "/certificate" },
};

/**
 * The chrome-free certificate. Identical to `/certificate` minus the site nav
 * and footer, matching `Certificate-standalone.dc.html` in the design source
 * (which `DPDP Certificate.html` is a single-file export of).
 */
export default function CertificateStandalonePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden font-sans text-text">
      <section className="flex-1 bg-[var(--bg-sunken)]">
        <CertificateBody />
      </section>
    </div>
  );
}
