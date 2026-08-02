# DPDP Academy

Study the Digital Personal Data Protection Act, 2023 section by section — then
prove it with a graded certification.

Ported from the **DPDPA** Claude Design project
(`claude.ai/design/p/adb66042-51d7-4f5e-8d6a-3dff5f0f7617`) to Next.js.

## Running it

```bash
npm run dev        # http://localhost:3000
npm run build
npm run start      # serve the production build

npm run lint
npm run typecheck
npm run verify     # lint + typecheck + build — the same gate CI runs
```

### First-time setup after a clone

```bash
npm install
git config core.hooksPath .githooks
```

`core.hooksPath` is **local git config and is not carried by a clone.** Without
that second line the pre-push hook below is silently inactive — the file is
there, git just never runs it.

## Branches and deploying

```
dev  ──PR──►  main  ──auto──►  dpdpact.net
```

- **`main`** is production. Protected: no direct pushes, PR required, CI must be
  green, and the PR branch must be up to date with `main` first.
- **`dev`** is where work lands. Pushing it publishes a preview deploy.

Vercel deploys from git automatically — there is no `vercel deploy` step. A push
to `dev` builds a preview; a merge to `main` builds production and re-aliases
`dpdpact.net`. Deployments are immutable, so a failed build leaves the previous
one serving and `vercel rollback` is instant.

| URL | Serves |
| --- | --- |
| `dpdpact.net` | production (`main`) |
| `www.dpdpact.net`, `dpdpact-net.vercel.app` | 308 → `dpdpact.net`, via `redirects()` in `next.config.ts` |
| `dpdpact-net-git-dev-asahus-projects.vercel.app` | latest `dev` — requires a Vercel login |

### The gates

| Gate | When | Checks |
| --- | --- | --- |
| `.githooks/pre-push` | every push | lint + typecheck (~8s) |
| `.github/workflows/ci.yml` | push to `dev`, PR to `main` | lint + typecheck + build + smoke-test every route |

The hook skips branch deletions, which push no content to verify. Bypass it with
`git push --no-verify` — but the same checks run in CI, so it only defers the
failure.

The CI smoke test boots the production server and asserts each route returns
200. `next build` proves pages *compile*; it does not prove they *serve*.

**Next.js 16 removed `next lint`,** so `next build` no longer runs ESLint —
meaning Vercel builds this site without linting it. The hook and CI are the only
things that run ESLint at all.

### Typical loop

```bash
git switch dev
# ...work...
git push origin dev                     # hook runs, preview deploys
gh pr create --base main --head dev     # CI runs on the PR
gh pr merge --merge                     # → production
```

## PWA

Installable, and the whole Act works offline.

| Piece | Where |
| --- | --- |
| Web app manifest | `src/app/manifest.ts` → `/manifest.webmanifest` |
| Service worker | `public/sw.js` |
| Registration | `src/components/service-worker.tsx` (production only) |
| Install prompt | `src/components/install-prompt.tsx` |
| Offline fallback | `public/offline.html` |
| Icons | `public/icon-{192,512}.png`, `icon-maskable-512.png`, `apple-touch-icon.png` |

### Caching strategy

| Request | Strategy | Why |
| --- | --- | --- |
| `/_next/static/*` | cache-first | content-hashed, so a hit is always correct |
| Navigations | network-first | fresh HTML online, cached copy offline |
| Other same-origin | stale-while-revalidate | icons, manifest |
| Cross-origin | untouched | analytics must never be cached or replayed |

The fifteen main routes in `PRECACHE_URLS` are precached on install, so the app
opens offline from a cold start. The practice test, the exam and the full Act
all run offline —
the question bank and the statutory text are bundled, and progress lives in
`localStorage`.

### Two decisions worth knowing

**Hand-written rather than `@serwist/next` or `next-pwa`.** Those plugins hook
the webpack config to inject a precache manifest of build output; Next 16 builds
with Turbopack. With 20 static routes and no API, the precache list is a fixed
array anyway, so the plugin's main value did not apply.

**No `skipWaiting()`.** Next code-splits, so swapping the asset set under a live
page invites chunk-load errors. A new worker takes over on the next full load.
Because navigations are network-first, online users are never served stale HTML
in the meantime.

**The offline fallback is plain HTML, not a Next route.** It is served for URLs
the worker has never cached, so the document and the address bar disagree by
definition. As `app/offline/page.tsx` this meant React hydrating one route's RSC
payload against another route's URL — it mismatched and fell into the global
error boundary, rendering "This page couldn't load" instead of the offline page.
Plain HTML has nothing to hydrate.

### The install prompt

Browsers do not guarantee their own install banner, so `install-prompt.tsx`
supplies one. It renders **nothing** unless there is a real install path, which
makes it easy to think it is broken:

| Condition | Result |
| --- | --- |
| Chromium fired `beforeinstallprompt` | Banner with a working "Install app" button |
| iOS Safari, not installed | Banner with manual "Share → Add to Home Screen" text |
| Already installed | Nothing — `display-mode` is `standalone`/`fullscreen`, or `navigator.standalone` |
| Dismissed this page load | Nothing |
| Anything else | Nothing |

Two things worth knowing before editing it:

- **iOS has no `beforeinstallprompt`.** There is no API to trigger the iOS
  install flow, which is why that path is instructional text rather than a
  button.
- **A `BeforeInstallPromptEvent` is single-use.** The stored event is cleared
  after prompting; the browser re-fires it later if installation is still
  available. Reusing the old one silently does nothing.

Because it renders `null` on the server, the banner text will not appear in
`curl` output of a deployed page. Check the JS bundle, not the HTML.

### Updating cached assets

Bump `CACHE_VERSION` in `public/sw.js` to invalidate every cache. Old caches are
deleted on activate. It is currently at `v6`.

## SEO

### The canonical origin is a constant, not an env var

`SITE_URL` in `src/lib/site.ts` is hardcoded to `https://dpdpact.net`. There is
no `NEXT_PUBLIC_SITE_URL`, and nothing reads Vercel's deployment URL.

That is deliberate. Canonical tags, the sitemap and Open Graph URLs are absolute
and are baked into the prerendered output, so deriving them from the deployment
URL gave every preview build its own canonical origin — the duplicate-content
problem the canonical tag exists to prevent. Pinning the constant means every
build, everywhere, agrees on one origin.

The tradeoff, so it is not a surprise: **preview deployments emit production
canonicals, OG URLs and sitemap entries.** That is correct for SEO, but it means
a preview is the wrong place to verify canonical behaviour — you will always see
`dpdpact.net` regardless of which deployment you are looking at.

**Forking this project?** Change the one constant in `src/lib/site.ts`. Leaving
it pointed at `dpdpact.net` will make your deployment declare someone else's
domain as canonical and keep your pages out of the index.

### What's wired up

| Item | Where |
| --- | --- |
| Per-page title + description | `metadata` export in each `page.tsx` |
| Title template | `%s \| DPDP Academy`, kept under ~60 chars total |
| Canonical URLs | `alternates.canonical` per page |
| Open Graph + Twitter | Defaults in `layout.tsx`, titles inherit per page |
| Social card image | `src/app/opengraph-image.tsx`, generated by `next/og` |
| `sitemap.xml` | `src/app/sitemap.ts` |
| `robots.txt` | `src/app/robots.ts` |
| `Organization` + `WebSite` schema | `layout.tsx` |
| `Course` schema | `certification/page.tsx` |

`openGraph.title` is deliberately **not** set in `layout.tsx`. When it's unset
Next falls back to each page's own title, so social cards match the page; pinning
it in the layout made every page share the site-wide string.

### Excluded from the index

- `/themes` — a design artefact. `noindex, nofollow`.
- `/certificate/standalone` — same content as `/certificate`. `noindex`, with its
  canonical pointing at `/certificate` so the duplicate doesn't split signals.

Both are also disallowed in `robots.txt` to save crawl budget, and neither
appears in the sitemap.

### Client pages and metadata

Next.js cannot export `metadata` from a client component. `/reader`,
`/exam`, `/practice-test` and `/certification` are therefore a server
`page.tsx` (metadata + schema) that renders a co-located `*-client.tsx`.

## AEO (answer engines)

Aimed at being *cited* by ChatGPT, Perplexity, Gemini and AI Overviews, which
rewards different things than blue-link SEO: machine-readable facts,
question-shaped headings, and answers that stand alone as a quotable sentence.

| Item | Where |
| --- | --- |
| `FAQPage` schema + visible Q&A | `src/components/faq.tsx`, used on `/overview` and `/certification` |
| `Legislation` schema | `reader/page.tsx` — jurisdiction, identifier, assent date, chapters |
| `DefinedTermSet` glossary | `roles/page.tsx` — the six roles and six definitions |
| `Course` schema | `certification/page.tsx` |
| `llms.txt` | `src/app/llms.txt/route.ts` |
| AI crawler rules | `src/app/robots.ts` |
| `CONTENT_UPDATED` | `src/lib/site.ts` — feeds `dateModified` |

**The FAQ component generates its schema from the same array as its markup.**
`FAQPage` markup that doesn't match visible content is a structured-data
violation Google issues manual actions for, so there is deliberately no way to
emit one without the other.

**AI crawler policy is a decision, not a default.** `robots.ts` allows both
citation bots (`OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`,
`Google-Extended`, …) and training bots (`GPTBot`, `ClaudeBot`, `CCBot`, …), on
the reasoning that this site exists to spread a public statute. Move an entry
to a `disallow` rule to opt out of training while keeping citations.

**On `llms.txt`:** it is a community proposal, not a standard, and no major
model provider has committed to reading it. It costs one route. Treat it as a
cheap option, not a ranking lever — the load-bearing work is the schema and the
crawlable text.

**`CONTENT_UPDATED` is bumped by hand**, not wired to the build clock. A
freshness date that moves while the content sits still is a false signal.

### Still to do

The Act's 44 sections live on one URL and their body text is client-rendered,
so ~9,700 words of statutory text are not indexable. Splitting them into
per-section routes is the largest remaining SEO win.

DPDP Rules 2025 coverage — previously listed here as the other gap — now exists
at `/dpdp-rules-2025` and `/dpdp-compliance-checklist`.

## Analytics

Google Analytics 4 (`G-4CRHNPWKYX`) via `@next/third-parties`, wired up in
`src/app/layout.tsx`. Nothing to configure — a production build ships it.

| Where                        | Analytics |
| ---------------------------- | --------- |
| `npm run dev`                | off       |
| `npm run build && npm start` | on        |
| Any production deployment    | on        |

The Measurement ID is committed rather than kept in env config: it is public by
design and ships in the page source of every site that uses it. Development is
excluded on `NODE_ENV` so local browsing never lands in the property.

Set `NEXT_PUBLIC_GA_ID` to override — point a deployment at a staging property,
or switch analytics on locally while testing.

`@next/third-parties` handles App Router client-side navigation, so `page_view`
fires on route changes, not just the first load.

Two things to know:

- **Preview deployments count as production.** On Vercel and most hosts, preview
  builds run with `NODE_ENV=production`, so their traffic lands in the same
  property. Set `NEXT_PUBLIC_GA_ID` to a staging property on the preview
  environment if that matters.
- **Tag Manager runs alongside GA4.** `GTM-T44V6VLW` loads in addition to the
  `GoogleAnalytics` component. If the container also holds a GA4 tag for
  `G-4CRHNPWKYX`, pageviews are counted twice — check the container and drop one
  of the two paths.

## Cookie consent

Google Consent Mode v2, gating both GA4 and GTM. Everything is denied until the
visitor chooses.

| Piece | Where |
| --- | --- |
| Consent defaults (denied) | `public/cc-bootstrap.js` |
| Banner + preference UI | `public/cookie-consent.js` |
| Configuration | `CONSENT_CONFIG` in `src/app/layout.tsx` |

**Load order is load-bearing.** The bootstrap pushes `consent: default` with
every storage type denied and must execute *before* `gtm.js` — once GTM has
loaded without a default, tags can fire ungated. All of it runs as
`beforeInteractive`, which `next/script` executes in the order placed.

**The SDK is self-hosted, not loaded from a CDN.** A site about data protection
should not hand visitors to a third party in order to ask them about tracking.
It also removes a supply-chain dependency from the consent gate itself and keeps
it working offline. Files are vendored from
`@ajitbubu/cookie-banner-sdk@0.1.0`; re-copy `dist/*.global.js` into `public/`
to update, and note they are excluded from ESLint as vendored minified code.

**Configuration goes through `CookieConsent.init()`, not `data-config`.** The
SDK's attribute path (`data-auto-init`) reads only a handful of scalar
`data-*` values and cannot express categories, cookie disclosures, theme or
labels. There is no `data-config` attribute — passing one is silently ignored.

**Disclosed cookies must match reality.** `_ga_*` is named after the measurement
ID minus its `G-` prefix, so `G-4CRHNPWKYX` yields `_ga_4CRHNPWKYX`. The banner
copy is overridden because the SDK's default text claims personalisation and
content-targeting cookies this site does not set, and cites a Privacy Policy and
Cookie Policy that do not exist here yet.

Retention is disclosed as "Up to 13 months" — confirm against the property's
cookie-expiry setting in GA4 if it is changed.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + TypeScript
- **Tailwind CSS v4** — design tokens registered through `@theme`
- **shadcn/ui** conventions (`components.json`, `cn()`, CVA variants, `components/ui/`)
- **lucide-react** for icons, **next/font** for Inter / JetBrains Mono / Fraunces / Pinyon Script
- **@next/third-parties** for Google Analytics 4

## Routes

### Ported from the design source

| Route            | Source file                    |
| ---------------- | ------------------------------ |
| `/`              | `Home.dc.html`                 |
| `/overview`      | `Overview.dc.html`             |
| `/roles`         | `Roles.dc.html`                |
| `/rights`        | `Rights.dc.html`               |
| `/obligations`   | `Obligations.dc.html`          |
| `/penalties`     | `Penalties.dc.html`            |
| `/reader`        | `DPDP Act 2023 Reader.dc.html` |
| `/certification` | `Certification.dc.html`        |
| `/practice-test` | `PracticeTest.dc.html`         |
| `/exam`          | `Exam.dc.html`                 |
| `/certificate`   | `Certificate.dc.html`          |
| `/certificate/standalone` | `Certificate-standalone.dc.html` |
| `/themes`        | `Themes.dc.html`               |

`DPDP Certificate.html` in the design source is a single-file bundled export of
`Certificate-standalone.dc.html`, so `/certificate/standalone` covers it. Both
certificate routes render the same `CertificateBody`; the standalone one just
drops the nav and footer.

### Written since the port

These have no design-source origin.

| Route | What it is |
| --- | --- |
| `/dpdp-rules-2025` | DPDP Rules 2025 — compliance deadline 13 May 2027 |
| `/dpdp-compliance-checklist` | Practical checklist derived from the Rules |
| `/blog`, `/blog/[slug]` | Index plus 10 articles from `src/lib/blog-posts.ts` |
| `/blog/dpdp-act-2023-practical-primer` | A hand-written route, not driven by `blog-posts.ts` |
| `/editorial-policy` | Sourcing and correction policy — an E-E-A-T signal |

`support.js` is the Claude Design component runtime (it interprets `<x-dc>`,
`<sc-if>`, `<sc-for>` and `<x-import>`). It has no equivalent here — those
constructs became JSX.

## Theming

Two layers, in the same order the design loads them:

1. **Sentinel** — the base design system (dark security-operations palette).
   Its tokens are declared in `@theme` in `src/app/globals.css`, so they are
   emitted as CSS variables *and* generate matching Tailwind utilities
   (`bg-canvas`, `text-text-muted`, `border-border`, `rounded-lg`, …).
2. **Bulletin** — the light editorial theme the project actually ships
   (option 1c on `/themes`). A later `:root` block overrides the token values;
   because the utilities reference `var(--…)`, everything re-skins at runtime.

Two details worth knowing before editing tokens:

- `--color-primary`, `--color-border` and `--radius-*` belong to Sentinel, so
  they are deliberately **not** mapped in shadcn's `@theme inline` block. The raw
  shadcn vars (`--primary`, `--border`, `--radius`) are bridged to the Bulletin
  values instead, which keeps shadcn primitives on-theme.
- Shadows are declared in plain `:root`, not `@theme`. Tailwind resolves
  `shadow-*` utilities at build time, which would bake in the Sentinel values and
  ignore Bulletin's `none`. Consume them as `shadow-[var(--shadow-card)]`.

## Design system

`src/components/ui/` holds the five Sentinel components the pages use — Button,
Card, Badge, Input and StatCard — as shadcn-style components. The source bundle
also ships Avatar, NavItem, Select, Switch and Tabs; no DPDP page references
them, so they were not ported.

## Data

- `src/lib/dpdpa-data.ts` — the full Act: 9 chapters, 44 sections and the
  Schedule, transcribed from the Gazette. Statutory text is verbatim from the
  design source; only the module wrapper changed.
- `src/lib/dpdp-quiz.ts` — the 30-item question bank. Every item cites the
  provision it tests.

## Browser state

Credentials, proctored bookings and reading progress live in `localStorage` and
are read through `src/lib/browser-store.ts`, a `useSyncExternalStore` wrapper.
That gives a correct server snapshot (`null`) and keeps pages in sync when
another page or tab writes.

| Key               | Written by       | Read by                    |
| ----------------- | ---------------- | -------------------------- |
| `dpdp.credential` | `/exam`          | `/exam`, `/certificate`    |
| `dpdp.booking`    | `/certification` | `/certification`           |
| `dpdpa.pos`       | `/reader`        | `/reader`                  |
| `dpdpa.read`      | `/reader`        | `/reader`                  |

## Notes on fidelity

- The source pages navigate with `window.location.href`. Those became
  `LinkButton` anchors so the content pages stay server components.
- `SiteNav` measured its own width with a `ResizeObserver` because Claude Design
  renders components in isolated frames. A CSS breakpoint at 1020px is
  equivalent here and avoids a hydration flash.
- Icons were CSS masks pointing at `unpkg.com/lucide-static`. They are now
  `lucide-react` components — same glyphs, no external request.
- The design system's Button sets `color: var(--text-body)` for its secondary
  variant. `--text-body` is redefined as a *font size* by the typography sheet,
  which loads later, so that declaration is invalid at runtime and the button
  inherits the page ink. The port uses `--color-text` directly to reproduce what
  actually renders.
