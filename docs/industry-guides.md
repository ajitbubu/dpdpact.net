# Industry guides (reference)

*Reference. For why the model is shaped this way, see [why-the-industry-model.md](./why-the-industry-model.md). To add a sector, see [adding-an-industry-guide.md](./adding-an-industry-guide.md).*

Nine sector guides served at `/implementation/<slug>`, plus a hub at
`/implementation`. Every guide is prerendered at build time from a single
content module. There is no CMS and no fetch: the content is TypeScript.

| File | Lines | Holds |
| --- | --- | --- |
| `src/lib/industries.ts` | 2618 | Types, all nine content entries, derived-view helpers |
| `src/lib/industries-menu.ts` | 121 | Slugs, menu labels, icons, `industryPath`, `isIndustrySlug` |

The split is load-bearing. `industries-menu.ts` is safe to import from a client
component; `industries.ts` is not. See
[why-the-industry-model.md](./why-the-industry-model.md#the-menu-content-split).

## The nine sectors

`INDUSTRY_SLUGS` in `industries-menu.ts` is the single source of truth for which
sectors exist, in menu, hub and sitemap order:

```
e-commerce  online-gaming  social-media  healthcare  financial-services
edtech  saas  startups  government
```

Each entry exists because a provision treats that sector differently. The
statutory hook per sector is listed in the module header of `industries.ts`.

## Types

### `ProcessingActivity`

The unit everything else derives from. One activity is one thing the business
does with personal data for one specified purpose.

| Field | Type | Meaning |
| --- | --- | --- |
| `name` | `string` | What the business is doing, in its own words |
| `purpose` | `string` | The specified purpose, in the Act's sense |
| `data` | `string[]` | Personal data this activity touches |
| `flow` | `FlowStage[]` | The hops the data takes |
| `ground` | `{ ref: string; text: string }` | Lawful basis, and why it applies here |
| `control` | `string` | The control that makes this lawful in practice |
| `phase` | `ControlPhase` | Which implementation phase the control belongs to |
| `evidence` | `string` | What you would put in front of an auditor |
| `retention` | `{ ref: string; text: string }` | When the data must go |

### `FlowStage`

One hop: a real actor or system, not a lifecycle stage.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `actor` | `string` | yes | The party or system holding the data here |
| `does` | `string` | yes | What happens to personal data at this hop |
| `ref` | `string` | no | Provision governing this hop, where one does |
| `risk` | `string` | no | How this hop goes wrong in practice |

`risk` feeds the risk view. A hop with no `risk` renders in the flow but
contributes nothing to the risk section.

### `ControlPhase`

```ts
type ControlPhase = "foundation" | "operationalise" | "governance"
```

Titles and blurbs live in `CONTROL_PHASES`. A phase with no matching activities
is dropped from the rendered journey rather than shown empty.

### `IndustryContent`

| Field | Type | Notes |
| --- | --- | --- |
| `published` | `string` | `YYYY-MM-DD` literal. Feeds Article `datePublished` |
| `updated` | `string` | `YYYY-MM-DD` literal. Feeds `dateModified`. Must not precede `published` |
| `metaTitle` | `string` | Page `<h1>` and, via `absolute`, the `<title>`. Max 60 chars |
| `metaDescription` | `string` | Max 160 chars |
| `eyebrow` | `string` | Hero kicker |
| `heading` | `string` | Hero heading |
| `headingAccent` | `string` | Accented tail of the heading |
| `lede` | `string` | Hero standfirst |
| `covers` | `string[]` | Business terms that map to this sector |
| `standing` | `string[]` | Why this sector is not just "the Act, again" |
| `activities` | `ProcessingActivity[]` | The single source the four views derive from |
| `thresholds` | `Threshold[]` | Numbers this sector needs at a glance |
| `provisions` | `IndustryProvision[]` | `{ ref, title, body }` |
| `actions` | `{ title, body }[]` | Practical next steps |
| `faq` | `{ q, a }[]` | Emitted as `FAQPage` schema by `<Faq>` |
| `related` | `{ href, label, note }[]` | Onward links |

`published` and `updated` are deliberately fixed literals per industry, not the
site-wide `CONTENT_UPDATED`. Pointing them at a mutable global rewrote the
apparent publication date of all nine guides on every bump.

### `Industry`

```ts
type Industry = IndustryMenuEntry & IndustryContent & { slug: IndustrySlug }
```

Menu identity merged with content. This is what the pages render.

## Exports

From `src/lib/industries.ts`:

| Export | Kind | Purpose |
| --- | --- | --- |
| `INDUSTRY_CONTENT` | `Record<IndustrySlug, IndustryContent>` | The content itself |
| `getIndustry(slug)` | function | Merges menu entry and content into an `Industry` |
| `INDUSTRIES` | `Industry[]` | Every industry in menu order. **Server-only** |
| `CONTROL_PHASES` | array | The three phases, with titles and blurbs |
| `industryJourney(industry)` | function | Groups activities by phase, drops empty phases |
| `INDUSTRY_SLUGS`, `industryPath`, `isIndustrySlug`, `IndustrySlug` | re-export | Convenience re-exports from `industries-menu.ts` |

From `src/lib/industries-menu.ts`:

| Export | Kind | Purpose |
| --- | --- | --- |
| `INDUSTRY_SLUGS` | `readonly string[]` | Source of truth for which sectors exist |
| `IndustrySlug` | type | Union derived from `INDUSTRY_SLUGS` |
| `isIndustrySlug(value)` | type guard | Narrows a route param back to a slug |
| `INDUSTRY_MENU` | `Record<IndustrySlug, IndustryMenuEntry>` | Label, one-line note, icon |
| `industryPath(slug)` | function | Typed `/implementation/<slug>` href |

## The four derived views

`activities` is the only source. Each view is a projection of it, so a fact
changed once cannot leave the four presentations disagreeing.

| View | Component | Derives from |
| --- | --- | --- |
| Infographic | `src/components/industry-infographic.tsx` | The whole activity set |
| Activity table | `src/components/activity-table.tsx` | One row per activity |
| Data flow diagram | `src/components/data-flow.tsx` | Each activity's `flow` |
| Implementation journey | inline in the page, via `industryJourney()` | `control` grouped by `phase` |

The risk section collects each hop's `risk` from the same `flow` arrays.

## Routes

| Route | File | Rendering |
| --- | --- | --- |
| `/implementation` | `src/app/implementation/page.tsx` | Static hub |
| `/implementation/[industry]` | `src/app/implementation/[industry]/page.tsx` | Prerendered, `dynamicParams = false` |
| `/implementation/[industry]/infographic` | `.../infographic/route.tsx` | Generated image response |
| Open Graph card | `.../opengraph-image.tsx` | Per-industry social card |

`generateStaticParams()` returns every slug in `INDUSTRIES`, and
`dynamicParams = false` means an unknown slug is a 404 rather than a runtime
render.

### Metadata

`generateMetadata` sets `title: { absolute: industry.metaTitle }`. The absolute
form bypasses the site-wide `%s | DPDP Academy` template, which would push these
titles past the SERP limit.

### Schema

The page emits `Article` only. `PageHero` emits the `BreadcrumbList` and `Faq`
emits the `FAQPage`. Emitting either from the page as well put two of each on
the page.

## Validation

`npm run check-content` enforces six rules over this module. Three apply
directly to industry content:

- `section-refs-resolve` - every `§ N` cited anywhere in an entry must be a real
  section of the Act
- `no-empty-content` - `standing`, `provisions`, `actions`, `faq` and `related`
  must all be present and non-empty
- `meta-lengths` - `metaTitle` under 60 chars, `metaDescription` under 160
- `dates-sane` - both dates are `YYYY-MM-DD`, and `updated` is not before `published`
- `menu-and-content-agree` - the slug sets in the two modules match exactly

References to the DPDP Rules 2025 and its Schedules are reported as `UNCHECKED`,
not as passing. The Rules text is not in this repo. See
[build-guards.md](./build-guards.md).

## Related

- [why-the-industry-model.md](./why-the-industry-model.md) - the design rationale
- [adding-an-industry-guide.md](./adding-an-industry-guide.md) - adding a sector
- [build-guards.md](./build-guards.md) - what `check-content` verifies and what it cannot
