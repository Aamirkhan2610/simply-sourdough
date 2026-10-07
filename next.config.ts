import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pg resolves its optional native bindings at runtime; keep it out of the bundle.
  serverExternalPackages: ["pg"],
  async redirects() {
    return [
      {
        source: "/shop/tinted-simply-sourdough",
        destination: "/shop/tinned-simply-sourdough",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "simplysourdough.shop",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
      },
    ],
  },
};

export default nextConfig;
