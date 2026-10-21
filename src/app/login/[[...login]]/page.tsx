import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to DPDP Academy.",
  /**
   * `noindex`, and absent from `sitemap.ts` and `robots.ts`. A sign-in form is
   * chrome, not a document - there is nothing here to rank, and an indexed
   * login page competes with the pages that should rank for the site's name.
   * Same reasoning `/certificate` is excluded on.
   */
  robots: { index: false, follow: false },
};

/**
 * Optional catch-all rather than a plain `/login` route.
 *
 * `<SignIn />` routes its own steps as real paths - `/login/factor-one`,
 * `/login/sso-callback` and the rest - so a bare `page.tsx` would render the
 * form and then 404 the moment anyone submitted it. The `[[...login]]` segment
 * hands those sub-paths back to the component, and still serves `/login`
 * itself.
 */
export default function LoginPage() {
  return (
    <>
      <SiteNav />
      <main className="flex flex-1 items-center justify-center bg-[var(--bg-sunken)] px-6 py-16">
        <SignIn />
      </main>
      <SiteFooter />
    </>
  );
}
