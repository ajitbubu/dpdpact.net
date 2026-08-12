# How to add an industry guide

Add a new sector to `/implementation`. At the end you will have a prerendered
guide, an entry in the mega menu and the hub, a sitemap URL, an `llms.txt` line
and a social card, with every claim validated against the Act.

Budget about an hour, almost all of it writing content rather than wiring.

## Prerequisites

- A working clone with `npm ci` run. See `README.md`, "Running it".
- **A statutory hook.** Before writing anything, name the provision that treats
  this sector differently from every other. If you cannot, the page should not
  exist. See
  [why-the-industry-model.md](./why-the-industry-model.md#every-sector-needs-a-statutory-hook).
- The section numbers you plan to cite, checked against `src/lib/dpdpa-data.ts`.

## Steps

### 1. Register the slug

In `src/lib/industries-menu.ts`, add the slug to `INDUSTRY_SLUGS`. Position
matters: this array sets the order of the menu, the hub and the sitemap.

```ts
export const INDUSTRY_SLUGS = [
  "e-commerce",
  // ...
  "government",
  "telecom",        // new
] as const;
```

TypeScript now reports an error in `industries.ts`, because `INDUSTRY_CONTENT`
is a `Record<IndustrySlug, IndustryContent>` and the new key has no entry. That
error is the point. It goes away in step 3.

### 2. Add the menu entry

Still in `industries-menu.ts`, add to `INDUSTRY_MENU`. Import the icon from
`lucide-react` at the top of the file.

```ts
"telecom": {
  name: "Telecom",
  menuNote: "§ 17(1)(c) · lawful interception",
  icon: RadioTower,
},
```

Keep `name` short. It sits in a three-column grid. `menuNote` is one line under
the label.

### 3. Write the content entry

In `src/lib/industries.ts`, add an entry to `INDUSTRY_CONTENT`. Field-by-field
types are in [industry-guides.md](./industry-guides.md#industrycontent).

Write `activities` first. Everything visible on the page except the hero, the
provisions list and the FAQ derives from it, so getting the activities right is
most of the work.

```ts
"telecom": {
  published: "2026-08-12",
  updated: "2026-08-12",
  metaTitle: "DPDP Act for Telecom: Subscriber Data Obligations",
  metaDescription: "How the DPDP Act, 2023 applies to telecom operators ...",
  eyebrow: "§ 17(1)(c) · lawful interception",
  heading: "DPDP for",
  headingAccent: "telecom",
  lede: "...",
  covers: ["telecom operators", "ISPs", "mobile networks"],
  standing: ["..."],
  activities: [
    {
      name: "Subscriber onboarding",
      purpose: "Verify identity before activating a connection",
      data: ["Name", "Address proof", "Photograph"],
      flow: [
        {
          actor: "Retail point of sale",
          does: "Captures KYC documents",
          ref: "§ 8(4)",
          risk: "Scanned documents left on the dealer's own device",
        },
        // ...
      ],
      ground: { ref: "§ 7(a)", text: "..." },
      control: "...",
      phase: "foundation",
      evidence: "...",
      retention: { ref: "Outside the Act", text: "..." },
    },
  ],
  thresholds: [{ value: "...", label: "...", ref: "..." }],
  provisions: [{ ref: "§ 17(1)(c)", title: "...", body: "..." }],
  actions: [{ title: "...", body: "..." }],
  faq: [{ q: "...", a: "..." }],
  related: [{ href: routes.overview, label: "...", note: "..." }],
},
```

Rules to write to, all enforced in step 4:

- `metaTitle` at most 60 characters, `metaDescription` at most 160.
- `published` and `updated` are `YYYY-MM-DD` literals. Never point them at
  `CONTENT_UPDATED`.
- Every `§ N` you write anywhere in the entry must be a real section of the Act.
- `standing`, `provisions`, `actions`, `faq` and `related` must all be non-empty.
- Where a retention period comes from outside the Act (tax, company, TRAI,
  clinical records law), say so and point at it. Those statutes are not in this
  repo, so stating a period would be inventing one.

Each activity needs a `phase`. Activities with the same phase group together in
the implementation journey, and a phase with no activities is dropped.

### 4. Validate

```bash
npm run check-content
```

Expect the industry count to go up by one:

```
check-content: 10 industries, 44 Act sections, 6 rules, all pass
```

Common failures:

| Message | Fix |
| --- | --- |
| `"telecom" is in the menu but has no content entry` | Step 3 is missing or the key is misspelled |
| `telecom: cites "§ 99", which is not a section of the Act` | Wrong section number |
| `telecom: metaTitle is 71 chars (max 60)` | Shorten it |
| `telecom: faq is empty` | The array exists but has no items |
| `telecom: updated (2026-08-01) precedes published (2026-08-12)` | Swap or correct the dates |

### 5. Update the hardcoded sector count

`check-content` does not catch this, and there is no test for it. Three
user-visible strings name the count in words:

| File | Line | String |
| --- | --- | --- |
| `src/app/implementation/page.tsx` | 84 | `eyebrow="Nine sectors · each anchored to a provision"` |
| `src/components/site-nav.tsx` | 487 | `Nine sectors the Act or the Rules treat differently` |
| `src/app/llms.txt/route.ts` | 83 | `nine sectors the Act or the Rules single out` |

Update all three. Comments in `industries.ts`, `site-nav.tsx` and
`implementation/[industry]/page.tsx` also say "nine" but are not user-visible.

### 6. Verify the whole build

```bash
npm run verify
```

Lint, typecheck, `check-content` and build. The build must prerender the new
route: look for `/implementation/telecom` in the route list.

### 7. Look at it

```bash
npm run dev
```

Open `http://localhost:3000/implementation/telecom` and check:

- The activity table, data flow diagram, risk section and implementation
  journey all reflect what you wrote in `activities`.
- The mega menu shows the sector, on both desktop and mobile.
- `/implementation` lists it.

## Verification

Nothing below needs editing. Confirm each picked the sector up:

| Surface | Check |
| --- | --- |
| Mega menu | `INDUSTRY_SLUGS.map` in `site-nav.tsx`, desktop and mobile |
| Hub page | `/implementation` |
| Sitemap | `curl -s localhost:3000/sitemap.xml \| grep telecom` |
| `llms.txt` | `curl -s localhost:3000/llms.txt \| grep telecom` |
| Social card | `/implementation/telecom/opengraph-image` |
| Infographic | `/implementation/telecom/infographic` |

## Troubleshooting

**Type error: `Property 'telecom' is missing in type ...`**
Step 1 is done and step 3 is not. `INDUSTRY_CONTENT` must have a key for every
slug in `INDUSTRY_SLUGS`.

**Type error on `industryPath("telecom")`**
The slug is not in `INDUSTRY_SLUGS`. `industryPath` takes an `IndustrySlug`, not
a string, on purpose.

**`check-content: parsed 0 industries or 0 menu slugs`**
The parser is regex-based and expects two-space indentation with a quoted key,
`  "telecom": {`, at the top level of the object literal. A reformat can break
it. Restore the shape or update the parser in `scripts/check-content.mjs`.

**The page 404s**
`dynamicParams = false`, so only slugs returned by `generateStaticParams()`
exist. That reads `INDUSTRIES`, which reads `INDUSTRY_SLUGS`. Restart `next dev`
after editing either module.

**The nav grew but the page bundle did too**
Check that nothing under `src/components/` imports `INDUSTRIES` or
`INDUSTRY_CONTENT`. Client components must import from `industries-menu.ts`.
See [why-the-industry-model.md](./why-the-industry-model.md#the-menu-content-split).

## Related

- [industry-guides.md](./industry-guides.md) - full type reference
- [why-the-industry-model.md](./why-the-industry-model.md) - why activities are the unit
- [build-guards.md](./build-guards.md) - what `check-content` does and does not verify
