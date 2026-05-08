import { locales } from '@/i18n'

export default function sitemap() {
  const baseUrl = 'https://www.yoke-electric.com'
  
  const staticPages = ['', '/products', '/about', '/contact', '/privacy-policy', '/terms']
  
  const entries = []
  
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date().toISOString(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : page === '/products' ? 1.0 : 0.7,
      })
    }
  }
  
  return entries
}