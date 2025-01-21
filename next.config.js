/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    return config;
  },
  productionBrowserSourceMaps: true,
  optimizeFonts: true,
  swcMinify: true,
}

module.exports = nextConfig