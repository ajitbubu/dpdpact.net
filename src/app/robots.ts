import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

const DISALLOW = ["/themes", "/certificate/standalone"];

/**
 * Crawlers that fetch pages to *cite* them in AI answers. Naming them
 * explicitly is redundant with the `*` rule — it is here so the decision is
 * visible and easy to reverse, not because the wildcard is insufficient.
 */
const ANSWER_ENGINE_BOTS = [
  "OAI-SearchBot", // ChatGPT search results
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "PerplexityBot",
  "Claude-Web",
  "Claude-SearchBot",
  "Google-Extended", // Gemini grounding and AI Overviews
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
];

/**
 * Crawlers that collect data primarily to *train* models.
 *
 * These are allowed, on the reasoning that this site exists to spread a public
 * statute as widely as possible. That is a judgement call, not a default —
 * move an entry into a `disallow` rule to opt out of training while keeping
 * the citation bots above.
 */
const TRAINING_BOTS = ["GPTBot", "ClaudeBot", "CCBot", "Meta-ExternalAgent"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Both also carry a `noindex` robots meta tag; this saves crawl budget.
        disallow: DISALLOW,
      },
      ...[...ANSWER_ENGINE_BOTS, ...TRAINING_BOTS].map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
