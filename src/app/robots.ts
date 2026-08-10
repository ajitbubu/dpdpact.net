import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

const DISALLOW = ["/themes", "/certificate/standalone"];

/**
 * Every named agent below gets the same rule as `*`, so none of this changes
 * behaviour. It is documentation: the list records which agents were
 * considered and makes opting one out a one-line edit rather than a research
 * project. Grouped by what the agent is actually for, because the three
 * groups are the ones you would plausibly want to treat differently.
 */

/** Builds a search or answer index, and can cite the page back. */
const INDEXING_BOTS = [
  "OAI-SearchBot", // ChatGPT search results
  "Claude-SearchBot",
  "PerplexityBot",
  "Bingbot", // also feeds Copilot
  "DuckAssistBot",
  "Applebot", // Siri and Spotlight
  "Amazonbot", // Alexa
];

/**
 * Fetches a single page because a person asked for it, in the moment.
 *
 * Worth separating: blocking these does not protect content from training, it
 * only stops a named user from reading the page through their assistant.
 */
const USER_TRIGGERED_BOTS = [
  "ChatGPT-User",
  "Claude-User",
  "Perplexity-User",
  "MistralAI-User",
  "meta-externalfetcher",
];

/**
 * Collects data primarily to *train* models.
 *
 * Allowed, on the reasoning that this site exists to spread a public statute
 * as widely as possible. That is a judgement call, not a default - move an
 * entry into a `disallow` rule to opt out of training while keeping the
 * indexing and user-triggered agents above.
 *
 * `Google-Extended` and `Applebot-Extended` are opt-out *controls* rather than
 * crawlers: neither fetches anything, they gate whether Gemini and Apple
 * Intelligence may use what Googlebot and Applebot already fetched.
 */
const TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "CCBot",
  "meta-externalagent",
  "Bytespider",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Both also carry a `noindex` robots meta tag; this saves crawl budget.
        disallow: DISALLOW,
      },
      ...[
        ...INDEXING_BOTS,
        ...USER_TRIGGERED_BOTS,
        ...TRAINING_BOTS,
      ].map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
