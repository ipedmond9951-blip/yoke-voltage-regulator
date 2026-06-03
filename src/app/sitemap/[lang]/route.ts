import { NextRequest, NextResponse } from 'next/server'
import { locales } from '@/i18n'
import { getAllSlugs } from '@/lib/articles'

const baseUrl = 'https://kk-electric.com'

const staticPages = [
  { path: '', priority: 1.0, changefreq: 'weekly' },
  { path: '/products', priority: 0.9, changefreq: 'monthly' },
  { path: '/about', priority: 0.6, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  { path: '/privacy-policy', priority: 0.4, changefreq: 'yearly' },
  { path: '/terms', priority: 0.4, changefreq: 'yearly' },
]

function buildHreflangMap(path: string) {
  const langMap: Record<string, string> = {}
  for (const l of locales) {
    const p = path
    langMap[l] = `${baseUrl}/${l}${p}`
  }
  langMap['x-default'] = `${baseUrl}/en${path}`
  return langMap
}

function buildSitemapXml(locale: string) {
  const entries: string[] = []
  for (const page of staticPages) {
    const path = page.path === '' ? '' : page.path
    const url = `${baseUrl}/${locale}${path}`
    const langMap = buildHreflangMap(path)
    const altLinks = Object.entries(langMap)
      .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`)
      .join('\n')
    entries.push(`  <url>
    <loc>${url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
${altLinks}
  </url>`)
  }
  const articleSlugs = getAllSlugs()
  for (const slug of articleSlugs) {
    const url = `${baseUrl}/${locale}/industry/${slug}`
    const langMap: Record<string, string> = {}
    for (const l of locales) {
      langMap[l] = `${baseUrl}/${l}/industry/${slug}`
    }
    langMap['x-default'] = `${baseUrl}/en/industry/${slug}`
    const altLinks = Object.entries(langMap)
      .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`)
      .join('\n')
    entries.push(`  <url>
    <loc>${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
${altLinks}
  </url>`)
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params
  if (!locales.includes(lang as any)) {
    return new NextResponse('Invalid locale', { status: 404 })
  }
  const xml = buildSitemapXml(lang)
  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
