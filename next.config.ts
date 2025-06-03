import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   transpilePackages: ['three'],
    images: {
    domains: ['via.placeholder.com'],
  },
};

export default nextConfig;
