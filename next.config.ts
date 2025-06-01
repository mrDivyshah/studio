
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      // Removed firebasestorage.googleapis.com as images are now local
      // If you have other images from Firebase Storage, you might need to add it back
      // or migrate them to be served locally or through another provider.
    ],
  },
  experimental: {
    allowedDevOrigins: [
      'https://6000-firebase-studio-1748748973338.cluster-nzwlpk54dvagsxetkvxzbvslyi.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
