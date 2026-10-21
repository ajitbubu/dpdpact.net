import * as React from "react";
import { ClerkProvider } from "@clerk/nextjs";

/**
 * `<ClerkProvider>` is scoped to this route rather than mounted in the root
 * layout, where Clerk's quickstart puts it.
 *
 * In the root layout it would ship Clerk's client bundle with every page on the
 * site - the reader, the verbatim Act, all forty industry guides - to support a
 * sign-in form none of them render. A site that gates even its analytics on
 * consent before loading it should not load an auth SDK on pages that have no
 * auth UI.
 *
 * The cost of scoping it here: signed-in state is unavailable outside `/login`,
 * so the nav cannot show who is signed in. When that affordance is wanted, this
 * provider moves up to the root layout and the matcher in `src/proxy.ts` widens
 * to match - both, or the nav renders permanently signed-out.
 */
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClerkProvider signInUrl="/login">{children}</ClerkProvider>;
}
