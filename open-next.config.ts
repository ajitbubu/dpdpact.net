import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Nothing on the site revalidates: every page is prerendered at build time or
 * rendered per request. The read-only static-assets cache serves the
 * prerendered pages straight from Workers assets with no R2 bucket. Switch to
 * the R2 incremental cache the moment a route adds ISR or `use cache`.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
