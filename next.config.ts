import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "..",
  },
  trailingSlash: false,
  // Permanent 301 redirects for retired paths. /steel-prices was removed in commit e997a31
  // (6/8 23:20) but the 10 locale variants still 404 in GSC (GSC categorizes them as
  // "网页会自动重定向" because the locale-detection middleware first sends /steel-prices → /en/steel-prices
  // with a 307, then the 404 happens). Routing them to /products is the closest live equivalent.
  async redirects() {
    return [
      { source: '/:locale(en|zh|es|ar|fr|pt|ru|ja|de|hi)/steel-prices', destination: '/:locale/products', permanent: true },
      { source: '/steel-prices', destination: '/en/products', permanent: true },
      { source: '/:locale(en|zh|es|ar|fr|pt|ru|ja|de|hi)-sitemap.xml', destination: '/sitemap/:locale', permanent: true },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-insights.com',
      },
    ],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
