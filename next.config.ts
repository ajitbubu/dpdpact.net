import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Statically typed links. The site hand-writes internal `href`s in roughly
   * forty places — study pages, RelatedGuides blocks, the reader directory —
   * and nothing verified they resolved. `next build` does not check Link
   * hrefs, so a renamed slug shipped dead links with lint, typecheck and build
   * all green. This turns every one of them into a typecheck failure.
   */
  typedRoutes: true,

  async redirects() {
    return ["www.dpdpact.net", "dpdpact-net.vercel.app"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://dpdpact.net/:path*",
      permanent: true,
    }));
  },
};

export default nextConfig;
