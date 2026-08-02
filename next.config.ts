import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.dpdpact.net" }],
        destination: "https://dpdpact.net/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "dpdpact-net.vercel.app" }],
        destination: "https://dpdpact.net/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
