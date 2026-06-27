/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize lucide-react imports to compile icons individually and prevent massive vendor chunk crashes
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  webpack: (config, { dev }) => {
    if (dev) {
      // Disable Webpack disk caching to prevent corruption on Windows paths
      config.cache = false;

      // Disable chunk splitting in development mode to bundle everything into a single file.
      // This completely bypasses the chunk-loading (e.g. missing 948.js) bugs on Windows paths with spaces.
      config.optimization.splitChunks = false;
    }
    return config;
  },
};

export default nextConfig;
