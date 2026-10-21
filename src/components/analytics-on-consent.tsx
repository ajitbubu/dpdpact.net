"use client";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import * as React from "react";

import { DownloadTracker } from "@/components/download-tracker";

/**
 * Loads GA4, and the Tag Manager container, only once analytics consent exists.
 *
 * Previously `gtag.js` was rendered unconditionally: 161.6 KiB downloaded and
 * executed on every visit, including for the visitor who declines - to run a
 * tracker that `cc-bootstrap.js` had already denied permission to track. The
 * layout self-hosts the consent SDK precisely so that asking about tracking
 * does not itself hand the visitor to a third party; loading Google's tracker
 * before the question is answered undid that.
 *
 * This is Consent Mode *basic* rather than *advanced*. Advanced deliberately
 * loads gtag before consent so it can send cookieless pings and model the
 * conversions it never observed. That modelling is worth nothing to a site
 * with no ads and no conversion bidding, and it costs every declining visitor
 * the full download.
 *
 * Ordering is safe. `cc-bootstrap.js` creates `dataLayer` and pushes
 * `consent default denied` before anything loads; the SDK pushes
 * `consent update` when preferences are saved. Both are queued in the array,
 * so gtag.js replays them in order on arrival and settles on the granted
 * state - the late load loses nothing.
 *
 * The container rides the same gate. Loading gtm.js `beforeInteractive`, as
 * Google's install snippet directs, means ordering it against the consent
 * defaults by hand - a container that loads without a default can fire tags
 * ungated. Mounting it here removes that hazard rather than managing it:
 * nothing can precede `cc-bootstrap.js` when nothing loads before consent.
 *
 * `GoogleTagManager` initialises the queue as `w[l]=w[l]||[]`, so it adopts the
 * array the bootstrap already populated instead of replacing it. The defaults
 * survive; the container sees the granted state on arrival.
 *
 * There is deliberately no `<noscript>` iframe. The scriptless fallback loads
 * `ns.html` unconditionally, which would hand the container every visitor who
 * cannot run the banner that asks their permission - the one visitor who can
 * never consent getting the one load that never asks.
 */

interface ConsentCategories {
  analytics?: boolean;
}

/** Same cookie shape `cc-init.js` reads; a malformed value counts as denied. */
function analyticsGranted(cookieName: string): boolean {
  const match = document.cookie.match(
    new RegExp("(?:^|;\\s*)" + cookieName + "=([^;]*)"),
  );
  if (!match) return false;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as {
      categories?: ConsentCategories;
    };
    return parsed.categories?.analytics === true;
  } catch {
    return false;
  }
}

/**
 * `cc-init.js` dispatches `cc:consent` when preferences are saved, so
 * accepting loads GA straight away rather than on the next navigation.
 */
function subscribe(onStoreChange: () => void) {
  window.addEventListener("cc:consent", onStoreChange);
  return () => window.removeEventListener("cc:consent", onStoreChange);
}

export function AnalyticsOnConsent({
  gaId,
  gtmId,
  cookieName,
}: {
  gaId: string;
  gtmId?: string;
  cookieName: string;
}) {
  /**
   * The cookie is external mutable state, which is exactly what
   * `useSyncExternalStore` is for. Reading it in an effect and calling
   * `setState` would work but tears on hydration and trips
   * `react-hooks/set-state-in-effect`; the server snapshot is `false` so the
   * prerendered HTML never contains the tag.
   */
  const granted = React.useSyncExternalStore(
    subscribe,
    () => analyticsGranted(cookieName),
    () => false,
  );

  if (!granted) return null;

  return (
    <>
      <GoogleAnalytics gaId={gaId} />
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <DownloadTracker />
    </>
  );
}
