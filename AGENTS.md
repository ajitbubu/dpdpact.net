<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Working in this repo

- **Never commit to `main`.** It is protected and deploys straight to
  `dpdpact.net`. Work on `dev` and open a PR.
- Run `npm run verify` (lint + typecheck + check-content + build) before
  pushing. A `pre-push` hook runs lint and typecheck anyway; do not defeat it
  with `--no-verify`.
- **`check-content` runs nowhere else.** Not in the hook, not in CI, not in the
  Vercel build. Skipping `npm run verify` ships the industry guides and the Act
  text unchecked. See `docs/build-guards.md`.
- `next build` does **not** run ESLint — Next 16 removed `next lint`. Run
  `npm run lint` explicitly.
- The canonical origin in `src/lib/site.ts` is a hardcoded constant, not an env
  var. Do not reintroduce `NEXT_PUBLIC_SITE_URL`; per-deployment origins were
  removed deliberately to stop previews declaring their own canonicals.
- Bump `CACHE_VERSION` in `public/sw.js` when changing anything precached.
- `CONTENT_UPDATED` in `src/lib/site.ts` is bumped by hand when *content*
  changes, never on a routine deploy.
- `src/lib/dpdpa-data.ts` holds the Act verbatim and is SHA-256 pinned. Do not
  reformat it, and do not let a repo-wide sweep touch it. A deliberate change
  means verifying against the MeitY publication and updating `ACT_SHA256` in
  `scripts/check-content.mjs` in the same commit.
- Never import `INDUSTRIES` or `INDUSTRY_CONTENT` from a client component. That
  ships every sector guide's prose to every page. Client code imports
  `src/lib/industries-menu.ts`.

## Documentation

`docs/` holds the subsystem documentation. Read the relevant one before changing
that subsystem: `industry-guides.md`, `why-the-industry-model.md`,
`adding-an-industry-guide.md`, `build-guards.md`, `consent-and-analytics.md`,
`search-engine-submission.md`.
