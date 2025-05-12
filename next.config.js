/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Configure SWC for optimal performance
  swcMinify: true,
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Handle environment variables
  env: {
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'resonance-fa2ae',
  },
  // Common webpack configurations
  webpack: (config, { isServer }) => {
    // Fix "Can't resolve 'fs'" or other Node.js specific modules on the client
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        path: require.resolve('path-browserify'),
      };
    }
    
    return config;
  },
  // Enable image optimization
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  // Remove warning about experimental features
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;