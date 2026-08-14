# Build guards (reference)

*Reference. Every automated check that stands between an edit and production.*

Four gates run at different moments. They do not all run the same checks, and
the differences matter.

| Gate | Fires on | Runs |
| --- | --- | --- |
| `npm run verify` | manually, before pushing | lint, typecheck, **check-content**, build |
| `.githooks/pre-push` | every push | lint, typecheck |
| `.github/workflows/ci.yml` | push to `dev`, PR to `main` | lint, typecheck, build, route smoke test |
| Vercel build | push to `dev` (preview), merge to `main` (production) | build only |

## Known gap: `check-content` runs in only one of the four

`npm run verify` is the only gate that runs `check-content`. The pre-push hook
does not, CI does not, and the Vercel build does not.

The practical consequence: the Act-integrity guarantee holds only if a human
runs `npm run verify` before pushing. A push that skips it, or a
`--no-verify` push, reaches production with the Act text unchecked. If you want
that guarantee enforced rather than remembered, add `npm run check-content` to
`ci.yml` between the typecheck and build steps.

`next build` also does not run ESLint. Next.js 16 removed `next lint`, so
Vercel builds this site without linting it. The hook and CI are the only things
that run ESLint at all.

## `npm run verify`

```
npm run lint && npm run typecheck && npm run check-content && npm run build
```

The command `AGENTS.md` tells contributors to run before pushing. Wall time
depends on the Next.js build cache: under 10 seconds warm, longer from cold.

## `.githooks/pre-push`

Lint and typecheck only, about 8 seconds. A full `next build` takes around 25
seconds, which is too slow for every push, so the build is left to CI.

The hook exits early on a branch deletion, which pushes no content to verify.
Without that check, `git push origin --delete <branch>` would run the whole gate.

Bypass with `git push --no-verify`. The same lint and typecheck run in CI, so
bypassing defers the failure rather than avoiding it. It does **not** defer the
`check-content` failure, because CI never runs that.

## `.github/workflows/ci.yml`

Node 24, matching the major version Vercel builds with, so a green CI run means
the production build behaves the same way.

After `npm run build`, CI boots the production server and asserts that each of
16 routes returns 200. `next build` proves pages compile; it does not prove they
serve. A page that builds but throws at request time fails here rather than in
production.

The smoke list is hardcoded in the workflow and currently covers `/`,
`/overview`, `/exam`, `/reader`, `/rights`, `/roles`, `/penalties`,
`/obligations`, `/certification`, `/practice-test`, `/themes`, `/blog`,
`/blog/dpdp-act-2023-practical-primer`, `/sitemap.xml`, `/robots.txt` and
`/manifest.webmanifest`. It does not cover `/implementation`, the industry
guides, the section reader pages, or the tools.

`concurrency: cancel-in-progress: true` means a newer push to the same branch
cancels the in-flight run.

## `npm run check-content`

`scripts/check-content.mjs`. Reads three files, writes none.

```
$ npm run check-content
check-content: 9 industries, 44 Act sections, 6 rules, all pass
  UNCHECKED (7) - the Rules text is not in this repo, so these are not verified:
    Fourth Schedule
    Rule 8(2)
    Schedule
    Second Schedule
    Seventh Schedule
    Third Schedule
    § 9(4) · Fourth Schedule
```

Exit codes:

| Code | Meaning |
| --- | --- |
| 0 | All rules pass |
| 1 | A rule failed, the validator self-test failed, or the parser matched nothing |

### Inputs

| File | Read for |
| --- | --- |
| `src/lib/dpdpa-data.ts` | SHA-256 fingerprint and the set of real section numbers |
| `src/lib/industries.ts` | Per-industry metadata, section references, array shape |
| `src/lib/industries-menu.ts` | The menu slug list |

### The six rules

| Rule | Fails when |
| --- | --- |
| `act-text-unmodified` | `dpdpa-data.ts` no longer matches `ACT_SHA256` |
| `section-refs-resolve` | An entry cites `§ N` where N is not a section of the Act |
| `no-empty-content` | `standing`, `provisions`, `actions`, `faq` or `related` is missing or empty |
| `meta-lengths` | `metaTitle` over 60 chars, or `metaDescription` over 160 |
| `dates-sane` | Dates are not `YYYY-MM-DD`, or `updated` precedes `published` |
| `menu-and-content-agree` | A slug is in the menu but not the content, or the reverse |

### The self-test

Before any real content is read, every rule is run twice against a fixture: once
clean, where it must stay quiet, and once with a planted error, where it must
fire. If a rule fails either half, the script prints
`check-content: THE VALIDATOR IS BROKEN` and exits 1 without checking content at
all.

A rule declared without a `bad` case fails the self-test on purpose. See
[why-the-industry-model.md](./why-the-industry-model.md#a-validator-that-tests-itself)
for the reasoning.

### What it cannot check

References to the DPDP Rules 2025 and their Schedules. The Rules text is not in
this repo, so `Rule 8(2)` and `Fourth Schedule` are collected and reported as
`UNCHECKED` rather than counted as passing. The script proves shape, not truth.

### The Act fingerprint

`ACT_SHA256` in `scripts/check-content.mjs` pins the exact bytes of
`src/lib/dpdpa-data.ts`, which holds the Act verbatim as published by MeitY.

Any change to that file fails the build. That includes changes you did not
intend: a formatting sweep once rewrote em-dashes to hyphens across the repo and
altered the closing punctuation of the enacting formula. The sweep runs outside
this repo and cannot be configured from here, so the fingerprint is the backstop.

To change the Act text deliberately:

1. Verify the new text against the MeitY publication.
2. Edit `src/lib/dpdpa-data.ts`.
3. Run `npm run check-content`, which fails and prints the new hash.
4. Update `ACT_SHA256` in `scripts/check-content.mjs` **in the same commit**.
5. Say why in the commit message.

### Adding a rule

Every rule needs a `bad` function that mutates a clean model into one the rule
must reject. Without it the self-test fails with
`<rule>: has no planted-error case`. That is deliberate: a rule with no proof it
can fail is a rule that manufactures confidence.

## Related

- [industry-guides.md](./industry-guides.md) - the content the rules validate
- [why-the-industry-model.md](./why-the-industry-model.md) - why the guard exists
- `AGENTS.md` - the contributor-facing summary
