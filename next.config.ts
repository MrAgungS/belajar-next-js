import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheLife:{
    product:{
      stale: 0,
      revalidate: 1,
    }
  },
  images: { 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.nike.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
