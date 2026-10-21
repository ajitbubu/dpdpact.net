import { clerkMiddleware } from "@clerk/nextjs/server";

/**
 * Clerk's session proxy.
 *
 * The file is `proxy.ts`, not `middleware.ts`: Next 16 renamed Middleware to
 * Proxy and only reads the new name. Clerk's own Next.js guide ships `proxy.ts`
 * too, so the SDK and the framework agree - but most Clerk documentation still
 * shows `middleware.ts`, which would silently never run here.
 *
 * The matcher is deliberately narrower than Clerk's default. That default
 * matches every route that is not a static file, which on this site means all
 * ~70 prerendered statutory and study pages would take a proxy hop and a
 * session-cookie read to support the one route that needs a session. Scoping it
 * to `/login` leaves the content site exactly as it was.
 *
 * Widen this the moment a route genuinely needs the session: `auth()` throws if
 * it is called from a route the proxy does not cover.
 */
export default clerkMiddleware();

export const config = {
  matcher: ["/login(.*)"],
};
