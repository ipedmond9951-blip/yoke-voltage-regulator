import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Standard search engine crawlers
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          // Internal tool pages — not public content, no SEO value
          // (2026-06-06 audit: these are 'use client' pages without
          // generateMetadata, so they fall back to the homepage canonical
          // and would dilute the homepage's search ranking if indexed.)
          '/product-upload',
          '/analytics',
        ],
      },
      {
        // AI/LLM crawlers - allow full access
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: '*AI-Bot*',
        allow: '/',
      },
    ],
    sitemap: [
      'https://kk-electric.com/sitemap-index.xml',
      ...['en','zh','es','ar','fr','pt','ru','ja','de','hi'].map(l => `https://kk-electric.com/sitemap/${l}`),
    ],
  };
}
