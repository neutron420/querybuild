import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.launchuicomponents.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'farmui.vercel.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/api/portraits/**',
      },
      // Add more domains as needed
    ],
  },
};

export default nextConfig;