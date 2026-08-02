"use client";

import * as React from "react";

/**
 * Registers the service worker in production only.
 *
 * Kept out of development deliberately: a worker that caches `/_next/static/*`
 * fights HMR and produces stale-chunk errors that look like app bugs.
 */
export function ServiceWorker() {
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    // Register after load so the worker never competes with the first paint.
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* registration failures are not worth surfacing to a reader */
      });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register);

    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
