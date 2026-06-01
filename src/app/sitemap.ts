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

export default function sitemap() {
  const entries = []

  // Static pages in all languages
  for (const locale of locales) {
    for (const page of staticPages) {
      const path = page.path === '' ? '' : page.path
      const url = `${baseUrl}/${locale}${path}`
      // Build hreflang map for all locales
      const langMap: Record<string, string> = {}
      for (const l of locales) {
        langMap[l] = l === 'en' && page.path === '' 
          ? `${baseUrl}/en` 
          : `${baseUrl}/${l}${path}`
      }
      langMap['x-default'] = `${baseUrl}/en`
      entries.push({
        url,
        lastModified: new Date().toISOString(),
        changeFrequency: page.changefreq,
        priority: page.priority,
        alternates: { languages: langMap },
      })
    }
  }

  // Article pages - all languages
  const articleSlugs = getAllSlugs()
  for (const locale of locales) {
    for (const slug of articleSlugs) {
      const url = `${baseUrl}/${locale}/industry/${slug}`
      const langMap: Record<string, string> = {}
      for (const l of locales) {
        langMap[l] = `${baseUrl}/${l}/industry/${slug}`
      }
      langMap['x-default'] = `${baseUrl}/en/industry/${slug}`
      entries.push({
        url,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: { languages: langMap },
      })
    }
  }

  return entries
}