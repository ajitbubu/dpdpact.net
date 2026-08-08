"use client";

import { usePathname } from "next/navigation";
import * as React from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a GA4 `page_view` on every client-side route change.
 *
 * `gtag('config', …)` reports the entry page itself, but nothing reports the
 * rest: within the App Router every internal link is a history push, and GA4
 * only turns those into page views when "page changes based on browser history
 * events" is enabled on the data stream. That setting lives in the GA4 UI, not
 * in this repo, and it was off — so navigating the site recorded nothing.
 * Sending the events here makes the site's own page views independent of it.
 *
 * That toggle must stay off. With both, every navigation is counted twice.
 *
 * Pathname only, deliberately. `useSearchParams` would drop every prerendered
 * route that renders this into client-side rendering unless each one is wrapped
 * in its own Suspense boundary, and no route here varies on the query string.
 * The full URL still reaches GA4 through `page_location`.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const isEntryPage = React.useRef(true);

  React.useEffect(() => {
    if (isEntryPage.current) {
      isEntryPage.current = false;
      return;
    }

    window.gtag?.("event", "page_view", {
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
