import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
