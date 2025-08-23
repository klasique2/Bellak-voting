import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**'
      },
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['*']
    }
  }
};

export default nextConfig;
