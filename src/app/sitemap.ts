import type { MetadataRoute } from "next";

import { ACT_PARTS } from "@/lib/act-sections";
import { INDUSTRIES } from "@/lib/industries";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";

/**
 * Only indexable pages belong here. `/themes` (a design artefact) and
 * `/certificate/standalone` (a chrome-free duplicate of `/certificate`) are
 * deliberately excluded and carry `noindex`.
 *
 * `/certificate` is excluded for a different reason: it renders a personal
 * artefact rather than a document, so there is nothing there to rank. It
 * carries `noindex`.
 *
 * `/exam` was excluded on the same grounds until it was given a server-rendered
 * FAQ answering the questions people actually search before sitting a paper -
 * whether it is proctored, what happens on a fail, whether an account is
 * needed. That is readable content rather than chrome, so the page is indexed
 * and listed here. The FAQ deliberately avoids `/certification`'s questions:
 * the two pages should not compete for the same query.
 */
const PAGES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  /** Omit only when the page follows the site-wide source-review date. */
  lastModified?: string;
}[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/reader", priority: 0.9, changeFrequency: "yearly" },
  { path: "/reader/full-text", priority: 0.9, changeFrequency: "yearly" },
  // The statute itself: one URL per provision. `yearly` is honest - the text
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
  { path: "/dpdp-compliance-deadline", priority: 0.9, changeFrequency: "monthly" },
  { path: "/dpdp-compliance-checklist", priority: 0.9, changeFrequency: "monthly" },
  { path: "/dpdp-compliance-templates", priority: 0.9, changeFrequency: "monthly" },
  { path: "/dpdp-vs-spdi-rules", priority: 0.8, changeFrequency: "monthly" },
  { path: "/dpdp-vs-gdpr", priority: 0.8, changeFrequency: "monthly" },
  { path: "/consent-manager", priority: 0.8, changeFrequency: "monthly" },
  { path: "/significant-data-fiduciary", priority: 0.8, changeFrequency: "monthly" },
  { path: "/dpdp-applicability", priority: 0.8, changeFrequency: "monthly" },
  { path: "/dpdp-penalty-calculator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/implementation", priority: 0.9, changeFrequency: "monthly" },
  ...INDUSTRIES.map((industry) => ({
    path: `/implementation/${industry.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: industry.updated,
  })),
  { path: "/blog", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog/dpdp-act-2023-practical-primer", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-08-01" },
  ...BLOG_POSTS.map((post) => ({
    path: "/blog/" + post.slug,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: post.updated,
  })),
  { path: "/editorial-policy", priority: 0.4, changeFrequency: "monthly", lastModified: "2026-08-09" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly", lastModified: "2026-08-11" },
  { path: "/contact", priority: 0.4, changeFrequency: "monthly", lastModified: "2026-08-11" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-08-11" },
  { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly", lastModified: "2026-08-11" },
  { path: "/sources", priority: 0.6, changeFrequency: "monthly", lastModified: "2026-08-11" },
  { path: "/certification", priority: 0.9, changeFrequency: "monthly" },
  { path: "/practice-test", priority: 0.7, changeFrequency: "monthly" },
  { path: "/exam", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Never use the build clock: a lastmod that moves on CSS-only deploys teaches
  // crawlers to ignore it. Articles and industry guides carry their own dates;
  // statutory and explanatory pages follow the manually reviewed content date.
  return PAGES.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastModified ?? CONTENT_UPDATED,
    changeFrequency,
    priority,
  }));
}
