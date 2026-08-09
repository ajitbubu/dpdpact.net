import { SITE_URL } from "@/lib/site";

/**
 * `BreadcrumbList` for a page, given the trail below Home.
 *
 * Every page on the site sits at a known depth under Home, and most already
 * render the trail visually. This builds the machine-readable half from the
 * same labels so the two cannot drift apart.
 */
export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...trail.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path}`,
      })),
    ],
  };
}
