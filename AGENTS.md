<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Working in this repo

- **Never commit to `main`.** It is protected and deploys straight to
  `dpdpact.net`. Work on `dev` and open a PR.
- Run `npm run verify` (lint + typecheck + build) before pushing. A `pre-push`
  hook runs lint and typecheck anyway; do not defeat it with `--no-verify`.
- `next build` does **not** run ESLint — Next 16 removed `next lint`. Run
  `npm run lint` explicitly.
- The canonical origin in `src/lib/site.ts` is a hardcoded constant, not an env
  var. Do not reintroduce `NEXT_PUBLIC_SITE_URL`; per-deployment origins were
  removed deliberately to stop previews declaring their own canonicals.
- Bump `CACHE_VERSION` in `public/sw.js` when changing anything precached.
- `CONTENT_UPDATED` in `src/lib/site.ts` is bumped by hand when *content*
  changes, never on a routine deploy.
