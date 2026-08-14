# Consent and analytics (reference)

*Reference. The consent gate, what loads behind it, and every event this repo sends.*

Nothing from Google loads until the visitor grants analytics consent. That is
Consent Mode **basic**, not advanced: `gtag.js` is not downloaded at all before
the answer, rather than downloaded and told to behave.

## Load order

All six scripts are `beforeInteractive`, and `beforeInteractive` scripts run in
placement order. The order is load-bearing.

| # | Script | Does |
| --- | --- | --- |
| 1 | inline `cc-bootstrap-config` | Sets `window.CC_BOOTSTRAP = { cookieName }` |
| 2 | `/cc-bootstrap.js` | Creates `dataLayer` and `gtag`, pushes `consent default` |
| 3 | `/cookie-consent.js` | The consent SDK, exposes `window.CookieConsent` |
| 4 | inline `cc-config` | Sets `window.CC_CONFIG` from the layout's config object |
| 5 | `/cc-init.js` | Calls `CookieConsent.init()`, wires the `cc:consent` event |
| 6 | `/cookie-branding.js` | Appends the "Powered by" credit inside the shadow root |

Step 2 must precede any Google tag. Once `gtag.js` has loaded without a stored
default, tags may fire ungated.

All five files are served from `public/`, not a CDN. A site about data
protection should not hand its visitors to a third party in order to ask them
about tracking, and self-hosting keeps the consent gate working offline.

`cc-bootstrap.js` and `cookie-consent.js` are vendored builds of
`@ajitbubu/cookie-banner-sdk@0.1.0`. They are ESLint-ignored as minified
third-party output and must not be edited in place. Update by re-copying the
dist files.

## The consent cookie

`cc_consent`, 182 days, first-party on `dpdpact.net`.

```json
{
  "schemaVersion": 1,
  "version": 1,
  "timestamp": "2026-08-11T00:00:00.000Z",
  "categories": {
    "necessary": true,
    "analytics": false,
    "functional": false,
    "marketing": false
  }
}
```

The bootstrap rejects the cookie and treats consent as denied if
`schemaVersion` is not `1`, if `timestamp` is not a string, if `version` is not
a number, or if any of the four category values is not a boolean. `necessary` is
forced to `true` on read regardless of what the cookie says.

`analyticsGranted()` in `analytics-on-consent.tsx` reads the same cookie and
treats any parse failure as denied.

## Category to Consent Mode signal

| Category | Grants |
| --- | --- |
| `necessary` | nothing (no storage signals) |
| `analytics` | `analytics_storage` |
| `functional` | `functionality_storage`, `personalization_storage` |
| `marketing` | `ad_storage`, `ad_user_data`, `ad_personalization` |

Everything not granted is set to `denied`. The default push carries
`wait_for_update: 500`.

`functional` and `marketing` are configured with empty cookie lists. The site
sets neither.

## What loads behind the gate

`AnalyticsOnConsent` subscribes to the cookie through `useSyncExternalStore`,
with a server snapshot of `false` so the prerendered HTML never contains the
tag. `cc-init.js` dispatches a `cc:consent` DOM event when preferences are
saved, so accepting loads GA immediately rather than on the next navigation.

When granted, it renders:

- `<GoogleAnalytics gaId>` - GA4
- `<GoogleTagManager gtmId>` - the container, when `gtmId` is set
- `<DownloadTracker />` - the asset download listener

The queued `consent default` and `consent update` calls sit in `dataLayer`, so
`gtag.js` replays them in order on arrival and settles on the granted state. The
late load loses nothing.

There is deliberately no `<noscript>` GTM iframe. The scriptless fallback loads
`ns.html` unconditionally, which would hand the container every visitor who
cannot run the banner that asks their permission.

### The container is analytics-only, by decision

`GTM-T44V6VLW` is mounted behind the **analytics** category, so anything added
to it inherits that grant. A marketing or advertising tag placed in the
container would fire for visitors who consented to measurement and nothing else.
Such a tag needs its own gate on the marketing category, not a slot in this
container.

## Environment gating

```ts
const gaId  = process.env.NEXT_PUBLIC_GA_ID  ?? (production ? "G-4CRHNPWKYX"  : undefined);
const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? (production ? "GTM-T44V6VLW" : undefined);
```

`NODE_ENV` decides whether they *can* load; consent decides whether they *do*.
When `gaId` is undefined, neither `PageViewTracker` nor `AnalyticsOnConsent`
mounts at all.

The consent scripts themselves still load in development, so the banner can be
exercised without a live property behind it.

Both IDs are public by design and committed deliberately. They ship in the page
source of every site that uses them.

## Events sent by this repo

GA4's own `config` call reports the entry page. Everything below is sent
explicitly.

### `page_view`

`src/components/page-view-tracker.tsx`, fired on every client-side route change.

| Parameter | Value |
| --- | --- |
| `page_location` | `window.location.href` |
| `page_title` | `document.title` |

The entry page is skipped, because `gtag('config', ...)` already reported it.

Within the App Router every internal link is a history push, and GA4 only turns
those into page views when "page changes based on browser history events" is
enabled on the data stream. **That setting must stay off.** With both, every
navigation is counted twice.

Pathname only, deliberately. `useSearchParams` would drop every prerendered
route that renders this into client-side rendering unless each one is wrapped in
its own Suspense boundary. The full URL still reaches GA4 via `page_location`.

### `seo_asset_download`

`src/components/download-tracker.tsx`, a delegated `click` listener on
`document`.

| Parameter | Value |
| --- | --- |
| `asset_name` | Final path segment, e.g. `dpdp-consent-register.csv` |
| `asset_type` | Extension, or `undefined` when the name has no dot |
| `link_url` | Absolute href |
| `page_location` | `window.location.href` |

Tracked paths:

- anything under `/templates/`
- the exact path `/resources/dpdp-commencement-timeline.csv`

Cross-origin anchors are ignored.

**Coverage limits.** This is an on-page click listener, so it observes only
left-clicks on links rendered by the site, by visitors who granted analytics
consent. It does not observe:

- Direct hits on the asset URL from an inbound link, newsletter or search
  result. Fetching a static file loads no page and mounts no React.
- Middle-click, or the context menu's "Save link as". Browsers dispatch
  `auxclick` for non-primary buttons, and nothing at all for the context menu.

Both cases are ordinary ways to take a file that carries the `download`
attribute, so treat the resulting counts as a floor rather than a total.

`asset_name` and `asset_type` are custom parameters. GA4 surfaces event
parameters as report dimensions only after they are registered as custom
dimensions in the Admin UI, which is a step outside this repo. Until that is
done, `seo_asset_download` reports a total count with no per-asset breakdown.

GA4 enhanced measurement also fires its own built-in `file_download` for `.csv`
but not for `.md`, so the two event names overlap on the CSV assets. Pick one as
authoritative before reporting numbers; summing both double-counts every CSV.

## Related

- `/cookie-policy` and `/privacy-policy` - the visitor-facing disclosures
- `/consent-manager` - the page that reopens the preference modal
- The disclosed cookie list in `src/app/layout.tsx` must match what the site
  actually sets. `_ga_*` is named after the measurement ID with the `G-` prefix
  removed, so `G-4CRHNPWKYX` produces `_ga_4CRHNPWKYX`.
