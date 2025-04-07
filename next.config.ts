import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
