import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
    {
      protocol: 'https',
      hostname: 'shared.fastly.steamstatic.com',
      pathname: '/store_item_assets/steam/apps/**',
    },
  ],
  },
};

export default nextConfig;
