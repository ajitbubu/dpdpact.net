"use strict";

/**
 * Initialises the consent banner and announces the result to the app.
 *
 * GA4 is no longer rendered unconditionally — `AnalyticsOnConsent` mounts it
 * only once analytics consent exists. That component cannot see this SDK's
 * callback, so the bridge between them is a DOM event.
 *
 * This file used to re-send the entry `page_view` on grant. Under Consent Mode
 * *advanced* gtag loaded immediately and sent that first hit as a cookieless
 * ping (`gcs=G100`) that standard reports discard, and accepting afterwards
 * did not resend it. That recovery is now wrong: gtag does not load until
 * consent, so its own `config` call reports the entry page normally. Keeping
 * the manual send would count it twice.
 *
 * Config comes in on `window.CC_CONFIG` rather than as arguments because the
 * callback below cannot survive the JSON the layout serialises it from.
 */
(() => {
  const config = window.CC_CONFIG;
  if (!config) return;

  config.onConsent = (categories) => {
    window.dispatchEvent(
      new CustomEvent("cc:consent", { detail: categories }),
    );
  };

  window.CookieConsent?.init(config);
})();
