import { locales } from '@/i18n'
import { getAllSlugs } from '@/lib/articles'

const baseUrl = 'https://kk-electric.com'

const staticPages = [
  { path: '', priority: 1, changefreq: 'weekly' },
  { path: '/products', priority: 0.9, changefreq: 'monthly' },
  { path: '/about', priority: 0.6, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  { path: '/privacy-policy', priority: 0.4, changefreq: 'yearly' },
  { path: '/terms', priority: 0.4, changefreq: 'yearly' },
]

// Product slugs
const productSlugs = [
  'svc-3000va',
  'tnd-svc-3000va',
  'svc-10kva',
  'svc-30kva',
  'svc-50kva',
  'svc-60kva',
]

export default function sitemap() {
  const entries = []

  // Static pages in all languages
  for (const locale of locales) {
    for (const page of staticPages) {
      const url = page.path === '' ? `/${locale}` : `/${locale}${page.path}`
      entries.push({
        url: `${baseUrl}${url}`,
        lastModified: new Date().toISOString(),
        changeFrequency: page.changefreq,
        priority: page.priority,
      })
    }
  }

  // Product pages (only en and zh make sense for products)
  const productLocales = ['en', 'zh']
  for (const locale of productLocales) {
    for (const slug of productSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/products/${slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })
    }
  }

  // Article pages - all languages
  const articleSlugs = getAllSlugs()
  for (const locale of locales) {
    for (const slug of articleSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/industry/${slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    }
  }

  return entries
}