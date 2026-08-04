import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
