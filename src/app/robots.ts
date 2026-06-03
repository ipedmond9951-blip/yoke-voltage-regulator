import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Standard search engine crawlers
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
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
