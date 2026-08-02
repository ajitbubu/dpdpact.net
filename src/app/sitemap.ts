import type { MetadataRoute } from "next";

import { CONTENT_UPDATED, SITE_URL } from "@/lib/site";

/**
 * Only indexable pages belong here. `/themes` (a design artefact) and
 * `/certificate/standalone` (a chrome-free duplicate of `/certificate`) are
 * deliberately excluded and carry `noindex`.
 */
const PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/reader", priority: 0.9, changeFrequency: "yearly" },
  { path: "/overview", priority: 0.8, changeFrequency: "monthly" },
  { path: "/roles", priority: 0.8, changeFrequency: "monthly" },
  { path: "/rights", priority: 0.8, changeFrequency: "monthly" },
  { path: "/obligations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/penalties", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog/dpdp-act-2023-practical-primer", priority: 0.7, changeFrequency: "monthly" },
  { path: "/certification", priority: 0.9, changeFrequency: "monthly" },
  { path: "/practice-test", priority: 0.7, changeFrequency: "monthly" },
  { path: "/exam", priority: 0.7, changeFrequency: "monthly" },
  { path: "/certificate", priority: 0.4, changeFrequency: "yearly" },
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
