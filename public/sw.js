/**
 * DPDP Academy service worker.
 *
 * Hand-written rather than generated. The app is 20 statically prerendered
 * routes with no API and content-hashed assets, so the main thing a plugin
 * buys you — injecting a precache manifest of build output — is unnecessary
 * here, and Next 16 builds with Turbopack, which the usual plugins hook around.
 *
 * Strategy, by request type:
 *   /_next/static/*  cache-first      content-hashed, so a hit is always correct
 *   navigations      network-first    fresh HTML online, cached copy offline
 *   other same-origin stale-while-revalidate
 *   cross-origin     untouched        analytics must never be cached or replayed
 *
 * Bump CACHE_VERSION to invalidate everything.
 */

const CACHE_VERSION = "v4";
const PRECACHE = `dpdp-precache-${CACHE_VERSION}`;
const RUNTIME = `dpdp-runtime-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline.html";

/**
 * Precached so the app opens offline from a cold start. Deliberately the
 * document shells only — the JS and fonts they pull in get picked up by the
 * runtime cache on first visit.
 */
const PRECACHE_URLS = [
  "/",
  "/overview",
  "/roles",
  "/rights",
  "/obligations",
  "/penalties",
  "/reader",
  "/certification",
  "/practice-test",
  "/exam",
  "/certificate",
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PRECACHE).then((cache) =>
      // Individually, so one 404 cannot fail the whole install.
      Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(new Request(url, { cache: "reload" })).catch(() => {}),
        ),
      ),
    ),
  );
  // No skipWaiting on purpose. Next code-splits, so swapping the asset set
  // under a live page invites chunk-load errors. The new worker takes over on
  // the next full load; navigations are network-first, so online users are
  // never served stale HTML in the meantime.
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== PRECACHE && k !== RUNTIME)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

/** Only ever store a real, complete, same-origin response. */
function isCacheable(response) {
  return response && response.ok && response.type === "basic";
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Cross-origin (analytics, anything else) goes straight to the network.
  // Caching or replaying analytics beacons would fabricate traffic.
  if (url.origin !== self.location.origin) return;

  // Range requests bypass the cache entirely.
  if (request.headers.has("range")) return;

  // 1. Immutable build output — cache-first.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((response) => {
            if (isCacheable(response)) {
              const copy = response.clone();
              caches.open(RUNTIME).then((c) => c.put(request, copy));
            }
            return response;
          }),
      ),
    );
    return;
  }

  // 2. Page navigations — network-first so online users always get fresh HTML.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (isCacheable(response)) {
            const copy = response.clone();
            caches.open(RUNTIME).then((c) => c.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          // Cache order matters here, so the caches are searched by name
          // rather than through the global `caches.match`.
          //
          // `caches.match` iterates in creation order, and PRECACHE is opened
          // during install while RUNTIME is opened on the first put — so the
          // global helper always returns the install-time snapshot. PRECACHE is
          // only rewritten when CACHE_VERSION changes, which a content-only
          // redeploy does not do, so offline readers would be pinned to the
          // statutory text as it stood when they first visited. RUNTIME holds
          // whatever the network-first branch last saw, so it wins.
          const runtime = await caches.open(RUNTIME);
          const fresh = await runtime.match(request);
          if (fresh) return fresh;

          const precache = await caches.open(PRECACHE);
          const seeded = await precache.match(request);
          if (seeded) return seeded;

          const offline = await precache.match(OFFLINE_URL);
          return (
            offline ||
            new Response("Offline", {
              status: 503,
              headers: { "Content-Type": "text/plain" },
            })
          );
        }),
    );
    return;
  }

  // 3. Everything else same-origin — stale-while-revalidate.
  event.respondWith(
    caches.match(request).then((hit) => {
      const network = fetch(request)
        .then((response) => {
          if (isCacheable(response)) {
            const copy = response.clone();
            caches.open(RUNTIME).then((c) => c.put(request, copy));
          }
          return response;
        })
        .catch(
          () =>
            // `respondWith` throws if the promise resolves to anything that is
            // not a Response, so a cache miss plus a failed fetch cannot fall
            // back to the (undefined) hit. Offline, this is the common case for
            // any subresource or RSC payload not yet cached; returning a real
            // 504 lets the caller see an ordinary failed request instead of a
            // TypeError raised inside the worker.
            hit ||
            new Response("", {
              status: 504,
              statusText: "Offline and not cached",
            }),
        );
      return hit || network;
    }),
  );
});
