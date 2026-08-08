"use strict";

/**
 * Initialises the consent banner, and recovers the page view that consent mode
 * would otherwise throw away.
 *
 * `cc-bootstrap.js` denies `analytics_storage` before gtag loads, so on a first
 * visit GA4 sends the entry `page_view` as a cookieless ping (`gcs=G100`) that
 * standard reports discard. Accepting afterwards does not resend it — gtag
 * applies the new state only to later events — so the entry page of every first
 * visit went unrecorded, which on a site whose readers mostly land and leave is
 * most of the traffic. Re-sending it on grant is the only way to get it back.
 *
 * Config comes in on `window.CC_CONFIG` rather than as arguments because the
 * callback below cannot survive the JSON the layout serialises it from.
 */
(() => {
  const config = window.CC_CONFIG;
  if (!config) return;

  /** Whether the visitor arrived with analytics already granted. */
  function grantedOnArrival(cookieName) {
    const match = document.cookie.match(
      new RegExp("(?:^|;\\s*)" + cookieName + "=([^;]*)"),
    );
    if (!match) return false;

    try {
      return JSON.parse(decodeURIComponent(match[1])).categories.analytics;
    } catch {
      // A malformed cookie means the banner is about to ask again anyway.
      return false;
    }
  }

  // Only a first visit needs recovering. Someone who arrived already consenting
  // had their entry page reported by gtag's own `config` call, so resending
  // when they save their preferences again would double-count it.
  let entryPageUnreported = !grantedOnArrival(config.cookieName);

  config.onConsent = (categories) => {
    if (!entryPageUnreported || !categories.analytics) return;
    entryPageUnreported = false;

    window.gtag?.("event", "page_view", {
      page_location: window.location.href,
      page_title: document.title,
    });
  };

  window.CookieConsent?.init(config);
})();
