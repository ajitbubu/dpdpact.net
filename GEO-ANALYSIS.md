# GEO / AI search visibility analysis — dpdpact.net

Run 13 August 2026. Measured against the live site and this repository.

> **Framing.** Google's [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
> (updated 2026-06-29) states that optimising for generative AI search "is still
> SEO", and that AEO and GEO are rebranded labels for the same work. Everything
> below is therefore SEO fundamentals applied to AI-search surfaces, not a
> separate discipline. Scores are heuristics, not Google-internal signals.

## 1. GEO readiness score: 74/100

| Criterion | Weight | Score | Note |
|---|---|---|---|
| Citability | 25% | 21 | Front-loaded, definition-shaped, source-cited. The strongest dimension. |
| Structural readability | 20% | 16 | Clean hierarchy, FAQ on 14 pages. Headings are editorial, not question-shaped. |
| Multi-modal content | 15% | 9 | Three real interactive tools, inline SVG only, no video. |
| Authority & brand signals | 20% | 9 | Excellent sourcing and recency; **zero** entity presence; no named author. |
| Technical accessibility | 20% | 19 | Full SSR verified. All AI crawlers allowed. |

The site is held back by exactly one thing: it does not exist as an entity
anywhere outside its own domain.

## 2. Platform breakdown

| Surface | Score | Why |
|---|---|---|
| Google AI Overviews | 70 | Strongly ranking-correlated, so gated by the classic SEO gaps in the site audit (thin pages, no internal linking, Search Console unverified). |
| Google AI Mode | 65 | Rewards freshness and citable passages beyond position 5 — both strong here — but weights entity authority, which is absent. |
| Bing Copilot | 70 | `BingSiteAuth.xml` present; content is fully server-rendered and indexable. |
| ChatGPT | 40 | Cites Wikipedia (47.9%) and Reddit (11.3%). The brand appears on neither. |
| Perplexity | 35 | Cites Reddit (46.7%) above all else. No presence. |

AI Mode and AI Overviews reach the same conclusion ~86% of the time but cite the
same URLs only 13.7% of the time — treat them as two surfaces, not one.

## 3. AI crawler access — pass

`robots.txt` grants `allow: /` to every named agent, with the same two-path
disallow (`/themes`, `/certificate/standalone`) applied uniformly.

| Group | Agents named | Status |
|---|---|---|
| Indexing / answer engines | OAI-SearchBot, Claude-SearchBot, PerplexityBot, Bingbot, DuckAssistBot, Applebot, Amazonbot | Allowed |
| User-triggered fetchers | ChatGPT-User, Claude-User, Perplexity-User, MistralAI-User, meta-externalfetcher | Allowed (these ignore robots.txt by design regardless) |
| Training crawlers | GPTBot, ClaudeBot, CCBot, meta-externalagent, Bytespider, Google-Extended, Applebot-Extended | Allowed — a deliberate, documented choice |

Not individually named but covered by the `*` rule: `anthropic-ai`, `cohere-ai`,
`Google-CloudVertexBot`, `Google-Agent`, `Google-NotebookLM`. No action needed;
adding them to the list in `src/app/robots.ts` would only be documentation.

Allowing `Google-Extended` matters more than it looks: it is the opt-out control
for Gemini grounding, and leaving it allowed is what keeps the site eligible for
AI Mode.

## 4. llms.txt — present, but claim nothing for it

`/llms.txt` is served at 6.1 KB, is well-formed, and accurately summarises the
Act's structure, the phased commencement, and the certification's limits.

**It carries no citation weight with Google.** Google's docs state Search ignores
`llms.txt` and that publishing one "won't harm (nor help)" visibility. Mueller
called the discovery use case "a dead end"; an SE Ranking study of 300k domains
found only one of the 50 most-AI-cited domains had the file; an OtterlyAI server
log audit found 0.1% of AI-bot traffic requests it.

Keep it — it costs nothing and is genuinely useful to coding agents and
non-Google services. Do not treat it as a GEO win. `/llms-full.txt` is absent;
adding it is optional and equally weightless.

`/rsl.xml`, `/.well-known/rsl` and `/ai.txt` all 404. RSL 1.0 licensing terms are
unimplemented — relevant only if the site ever wants to assert AI licensing terms.

## 5. Brand mention analysis — the critical gap

Brand mentions correlate roughly **3× more strongly with AI citations than
backlinks** (Ahrefs, 75,000 brands, December 2025). Domain Rating correlates at
~0.266; YouTube mentions at ~0.737.

| Platform | Presence | Consequence |
|---|---|---|
| Wikipedia / Wikidata | None | Removes the single largest ChatGPT citation source (47.9%) |
| Reddit | None | Removes Perplexity's dominant source (46.7%) and Google's Community Perspectives surface |
| YouTube | None | Forfeits the strongest single correlate of AI citation |
| LinkedIn | None | No entity corroboration |
| `sameAs` in schema | One URL — a GitHub repo | Entity graph has almost nothing to resolve against |

Searching "DPDP Academy" surfaces DP Academy, DPCS Academy, PDP Academy and
Tsaaro Academy — unrelated entities. The brand is not disambiguated anywhere an
AI system would look.

> **Do not read this as licence to mention-farm.** Google explicitly rejects
> chasing inauthentic mentions across blogs, forums and videos. The
> recommendation is authentic presence — a Wikidata item that meets notability,
> genuine answers in communities where the expertise is real, and video that
> stands on its own. Manufactured mentions are a spam signal, not a GEO play.

## 6. Passage-level citability — strong

Sampled openings land the answer inside the first 40–60 words and follow the
definition patterns AI systems extract. ~44% of AI citations come from the first
30% of a page, and this site front-loads well:

- `/consent-manager` — "The Consent Manager is the most original idea in the DPDP Act: a licensed intermediary that an individual can use to give, review and withdraw consent across every organisation at once, and which the statute makes accountable to her rather than to whoever pays its bills."
- `/significant-data-fiduciary` — "Significant Data Fiduciary is the only tier the DPDP Act creates, and it is not a threshold an organisation crosses by growing."
- `/dpdp-rules-2025` — opens on three specific commencement dates with the governing section for each.

These are quotable, self-contained, provision-anchored, and not commodity
phrasing. This is what Google's guide means by first-hand, non-commodity content,
and it is the site's real AI-search asset.

**Two defects:**

1. **Freshness stamps are inconsistent.** `/dpdp-rules-2025` reads "Current as of
   2 August 2026"; `/consent-manager` reads "Current as of 2026-08-11". Different
   formats and different dates for content on the same review cycle. Recency is
   one of the strongest citation signals — content under three months old is
   ~3× more likely to be cited — so the signal should be uniform.
2. **Thin pages have nothing to cite.** The 12 pages under 300 unique words
   identified in the site audit are simply not extraction candidates.

## 7. Server-side rendering — pass

AI crawlers do not execute JavaScript. Verified clean:

- No `next/dynamic` and no `ssr: false` anywhere in `src/`.
- All seven `"use client"` route components render their full content into the
  initial HTML. Measured in raw HTML with scripts stripped: `/dpdp-penalty-calculator`
  1,610 words, `/dpdp-applicability` 1,177, `/reader` 1,168, `/dpdp-compliance-checklist`
  1,056.

Nothing of substance is JavaScript-gated.

## 8. Top five highest-impact changes

1. **Create a Wikidata item and pursue Wikipedia notability.** Largest single
   lever available. Wikipedia is ChatGPT's top citation source by a wide margin,
   and the site currently has no entity for any AI system to resolve.
2. **Publish a named author with credentials, and Person schema.** Legal
   regulatory content is YMYL. Google's Who/How/Why test expects a byline where
   readers would expect one, and the site currently attributes everything to
   "DPDP Academy Editorial" — an Organization, not a person. `SEO_AUTHORITY_PLAN.md`
   deliberately withholds this pending consent, which is the right instinct; it
   is nonetheless the single largest E-E-A-T cost the site is paying.
3. **Fix the classic SEO gaps first.** A page must be indexed and snippet-eligible
   to appear in any AI feature — there is no separate AI index. The internal
   linking, thin content and unverified Search Console findings in the site audit
   gate everything here.
4. **Expand `sameAs` past one GitHub URL** as real profiles come into existence,
   and keep the entity's name, description and URL identical everywhere, as
   `SEO_AUTHORITY_PLAN.md` §2 already specifies.
5. **Normalise the freshness stamp** to one format driven by `CONTENT_UPDATED`,
   and keep the review cadence tight.

## 9. Schema — no changes recommended

Twelve types are already implemented correctly, including `FAQPage` generated
from the same array as the visible markup so the two cannot drift.

Google explicitly lists "over-invest in structured data specifically for AI
features" as a myth. The one addition worth making is `Person` — and that is for
E-E-A-T and the Who/How/Why test, not for AI markup.

## 10. Content reformatting

**Worth doing — question-shaped H2/H3 on high-intent pages.** Current headings
are editorially strong but query-mismatched: "A Role No Other Privacy Law Has",
"You Do Not Become One. You Are Notified As One.", "Three dates to plan around".
Matching real query phrasing is ordinary SEO practice, and the FAQ blocks already
do it well.

Keep the editorial H1s — they carry the site's voice, and the existing prose is
exactly the non-commodity writing Google says it wants. Change the H2/H3 level
only, where the query match is worth more than the phrasing.

**Explicitly not recommended,** because Google rejects each:

- Chunking content into small blocks for AI.
- Rewriting prose into AI-specific phrasings or long-tail variations.
- Adding schema for AI-discoverability reasons.
- Acquiring mentions for the sake of mention count.

## Sources

- Google, [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) (2026-06-29)
- Google, [Creating helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Google, [Using third-party SEO tools](https://developers.google.com/search/docs/fundamentals/third-party-seo) (2026-06-05)
- Ahrefs, brand-mention correlation study, 75,000 brands (December 2025)
- SE Ranking, 1.3M-citation and 300k-domain studies (November 2025)
- OtterlyAI, AI-bot server-log audit (2025)
