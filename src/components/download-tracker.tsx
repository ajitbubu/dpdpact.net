"use client";

import * as React from "react";

const TRACKED_PREFIXES = ["/templates/"];
const TRACKED_FILES = new Set([
  "/resources/dpdp-commencement-timeline.csv",
]);

function isTrackedDownload(pathname: string) {
  return (
    TRACKED_FILES.has(pathname) ||
    TRACKED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}

/** Records public SEO-asset downloads after analytics consent is granted. */
export function DownloadTracker() {
  React.useEffect(() => {
    function trackDownload(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || !isTrackedDownload(url.pathname)) {
        return;
      }

      const fileName = url.pathname.split("/").at(-1) ?? "unknown";
      const fileExtension = fileName.includes(".")
        ? fileName.split(".").at(-1)
        : undefined;

      window.gtag?.("event", "seo_asset_download", {
        asset_name: fileName,
        asset_type: fileExtension,
        link_url: url.href,
        page_location: window.location.href,
      });
    }

    document.addEventListener("click", trackDownload);
    return () => document.removeEventListener("click", trackDownload);
  }, []);

  return null;
}
