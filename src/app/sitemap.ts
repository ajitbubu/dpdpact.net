import type { MetadataRoute } from "next";

import { ACT_PARTS } from "@/lib/act-sections";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";

/**
 * Only indexable pages belong here. `/themes` (a design artefact) and
 * `/certificate/standalone` (a chrome-free duplicate of `/certificate`) are
 * deliberately excluded and carry `noindex`.
 *
 * `/exam` and `/certificate` are excluded for a different reason: they are
 * application screens, not documents. The exam is an interface with 225 words
 * of chrome and the certificate renders a personal artefact — submitting
 * either for indexing invites a thin-content judgement and neither can rank
 * for anything. Both carry `noindex`. `/practice-test` stays: "DPDP quiz" is
 * a real query, so that page needs content rather than removal.
 */
const PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/reader", priority: 0.9, changeFrequency: "yearly" },
  { path: "/reader/full-text", priority: 0.9, changeFrequency: "yearly" },
  // The statute itself: one URL per provision. `yearly` is honest — the text
  // of an Act does not change between amendments.
  ...ACT_PARTS.map((part) => ({
    path: `/reader/${part.slug}`,
    priority: 0.7,
    changeFrequency: "yearly" as const,
  })),
  { path: "/overview", priority: 0.8, changeFrequency: "monthly" },
  { path: "/roles", priority: 0.8, changeFrequency: "monthly" },
  { path: "/rights", priority: 0.8, changeFrequency: "monthly" },
  { path: "/obligations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/penalties", priority: 0.8, changeFrequency: "monthly" },
  { path: "/dpdp-rules-2025", priority: 0.9, changeFrequency: "monthly" },
  { path: "/dpdp-compliance-checklist", priority: 0.9, changeFrequency: "monthly" },
  { path: "/dpdp-vs-spdi-rules", priority: 0.8, changeFrequency: "monthly" },
  { path: "/dpdp-vs-gdpr", priority: 0.8, changeFrequency: "monthly" },
  { path: "/consent-manager", priority: 0.8, changeFrequency: "monthly" },
  { path: "/significant-data-fiduciary", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog/dpdp-act-2023-practical-primer", priority: 0.7, changeFrequency: "monthly" },
  ...BLOG_POSTS.map((post) => ({
    path: "/blog/" + post.slug,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
  { path: "/editorial-policy", priority: 0.4, changeFrequency: "monthly" },
  { path: "/certification", priority: 0.9, changeFrequency: "monthly" },
  { path: "/practice-test", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Not `new Date()`: a lastmod that moves with every deploy — including
  // CSS-only ones — teaches crawlers to ignore the field, so it is worth
  // nothing when the Act text actually changes. Bump CONTENT_UPDATED instead.
  const lastModified = CONTENT_UPDATED;

  return PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
