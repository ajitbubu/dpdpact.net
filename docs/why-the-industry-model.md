# Why the industry model works this way

*Explanation. The reasoning behind the sector guides and the guard that protects them. For the API, see [industry-guides.md](./industry-guides.md).*

Sector landing pages are the most templated content on the internet. "DPDP for
healthcare", "DPDP for retail", "DPDP for logistics" are usually the same
article nine times with the noun swapped, and search engines classify them
accordingly. This site publishes nine of them anyway. The design exists to make
them survive that classification.

## The problem

Three failures kill sector pages, and they compound.

**The sector has no reason to exist as a page.** If the Act treats
manufacturing exactly as it treats everything else, a manufacturing guide is the
Act with a different logo. There is nothing to say that the general pages do not
already say better.

**The content is generic even when the sector is not.** The reflex structure for
a data-protection guide is a lifecycle: collection, consent, processing,
sharing, retention, erasure. Those are the same six boxes for every sector with
the labels swapped. A reader who works in online gaming learns nothing about
online gaming.

**The page contradicts itself.** A sector page typically carries a table, a
diagram, a risk list and a roadmap. Written as four independent lists, they
drift. The table says data goes to a courier API, the diagram does not show one,
the roadmap never mentions it. Each edit has to be made four times, and the
fourth is the one that gets missed.

## The approach

### Every sector needs a statutory hook

A sector gets a page only when a provision treats it differently in a way you
can point at. The nine that qualify:

| Hook | Sectors |
| --- | --- |
| Named in the Third Schedule (rule 8(1)), own retention thresholds | e-commerce, online gaming, social media |
| Fourth Schedule (rule 12) turns section 9 off for defined classes | healthcare |
| Section 17(1)(f), written for financial institutions | financial services |
| Section 17(3) names startups as a class the Government may exempt | startups |
| Section 7(b), the State's own legitimate use | government |
| Sections 8(1) and 8(2), the processor relationship | SaaS and IT services |
| Section 9 as the entire compliance problem | edtech |

There is no manufacturing page because there is no hook. The taxonomy is a
consequence of the statute, not of a market segmentation exercise, and that is
the whole defence against the templated-content classification.

The reader-facing vocabulary problem is solved separately. People search "DPDP
for hospitals", not "DPDP for clinical establishments", so the business language
lives in a `covers` array on the page that is anchored in the statute. Search
demand gets served without inventing nine more pages to hold it.

### Processing activities, not data categories

The unit of content is a **processing activity**: one thing the business does,
for one specified purpose.

This follows the Act rather than convention. Lawful basis and retention attach
to a purpose, not to a data category. The same phone number in an e-commerce
business is consented marketing, contract fulfilment and a statutory tax record
at once, with three different erasure answers. A table with one row per data
type has to pick one of those three, and is wrong for the other two.

One row per activity has three correct rows.

### Flow hops are actors, not lifecycle stages

A `FlowStage` is "Courier API" or "Lab information system": something that only
appears in that sector's architecture, and that a reader recognises from their
own. It is never "Collection" or "Retention".

This is the direct fix for the second failure. A lifecycle diagram is
sector-independent by construction, so it cannot carry sector-specific
information no matter how carefully it is labelled.

### Four views, one source

`activities` is the only place a fact lives. Everything else is a projection:

```
                      activities[]
                           |
     +---------------+-----+------+------------------+
     |               |            |                  |
  infographic   activity table  data flow    implementation journey
  (whole set)   (one row each)  (flow[])     (control grouped by phase)
                                   |
                              risk section
                              (each hop's risk)
```

`industryJourney()` is a grouping function, not a second list. A phase with no
activities is dropped rather than rendered empty. Change a retention answer once
and all four presentations move together, because there is no second copy to
forget.

The cost is that the content module is dense. `industries.ts` is 2,618 lines and
every entry has to be written as activities even when a prose paragraph would be
faster. That is the trade: harder to write, impossible to leave inconsistent.

### The menu-content split

`industries-menu.ts` exists because `site-nav.tsx` is a client component.
Importing the content module there shipped every industry's legal prose to every
visitor: 51 KB raw, 12.5 KB brotli, on all 87 pages. Bundlers cannot tree-shake
object properties, so importing one label pulled in all nine guides.

Splitting identity from content fixed it. `INDUSTRY_SLUGS` lives in the menu
module and the content module keys off `IndustrySlug`, so an entry present in
one and missing from the other is a compile error rather than a nav item that
404s.

**If you import `INDUSTRIES` or `INDUSTRY_CONTENT` from a client component, you
undo this.** The client nav imports `INDUSTRY_MENU`.

### Publication dates are fixed literals

`published` and `updated` are hardcoded per industry rather than derived from
the site-wide `CONTENT_UPDATED`. Pointing them at a mutable global meant every
bump rewrote the apparent publication date of all nine guides, telling search
engines the pages were written on a day they were not.

## The guard

The editorial position is that every claim is anchored to a provision you can
verify yourself. That only holds if the anchors are real, and the anchors are
hand-typed.

A fat-fingered `§ 17(1)(e)` cites the wrong law about loan defaults, and nothing
else in the toolchain would notice. `next build` does not read prose, and this
repo has no test framework. `scripts/check-content.mjs` is the thing that
notices.

### A validator that tests itself

Before reading any real content, every rule runs twice against a fixture: once
clean, where it must stay silent, and once against a planted error, where it
must fire. A rule that fails either half stops the run with
`THE VALIDATOR IS BROKEN`, and content is never checked.

The reasoning: a validator whose regex quietly matches nothing reports success
forever. That is worse than having no validator, because it manufactures
confidence. The self-test is the difference between "six rules passed" and "six
rules ran".

The rules parse TypeScript source with regular expressions, which is fragile by
nature. That fragility is why the parser also refuses to continue if it finds
zero industries or zero menu slugs: a shape change that breaks the parser
reports a broken parser rather than a clean bill of health.

### UNCHECKED is not the same as passing

The DPDP Rules 2025 text is not in this repo. So `Rule 8(2)` and
`Fourth Schedule` cannot be resolved against anything, and the script says so
explicitly at the end of every run instead of silently counting them as valid.

The script proves shape, not truth. Saying which is which is the point.

### The Act is fingerprinted, not merely reviewed

`src/lib/dpdpa-data.ts` holds the Act verbatim, checked against the MeitY
publication. It is reference material, not content to edit, and it has already
been modified once by accident: a formatting sweep rewrote em-dashes to hyphens
across the repo and changed the closing punctuation of the enacting formula from
the dash the Gazette prints to a plain hyphen.

That sweep runs outside this repo and cannot be configured from here. A SHA-256
pin is the backstop: if the file changes at all, the build stops and a human has
to confirm the change was intended.

## Trade-offs

| Gained | Given up |
| --- | --- |
| Four views that cannot disagree | Content must be authored as activities, which is slower than prose |
| Compile-time error on a menu/content mismatch | Two modules to edit when adding a sector |
| Nav stays small on all 87 pages | A client component can silently undo it with one import |
| Wrong section references caught before merge | Regex parsing of TypeScript, which breaks if the source shape changes |
| Accidental edits to the Act text stop the build | Deliberate edits need a hash update in the same commit |
| Honest reporting of what is unverified | The Rules references stay unverified until the Rules text is in the repo |

The largest remaining gap is not in the design but in where the guard runs.
`check-content` is wired into `npm run verify` only, not into CI, so the
Act-integrity guarantee currently depends on a human running the right command.
See [build-guards.md](./build-guards.md#known-gap-check-content-runs-in-only-one-of-the-four).

## Related

- [industry-guides.md](./industry-guides.md) - types, exports, routes
- [adding-an-industry-guide.md](./adding-an-industry-guide.md) - the task
- [build-guards.md](./build-guards.md) - every gate, and what each one runs
