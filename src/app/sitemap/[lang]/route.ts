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

const productImages = [
  { slug: 'svc-3000va', image: '/images/products/svc-3000va.jpg' },
  { slug: 'tnd-svc-3000va', image: '/images/products/tnd-svc-3000va.jpg' },
  { slug: 'svc-10kva', image: '/images/products/svc-10kva.jpg' },
  { slug: 'svc-30kva', image: '/images/products/svc-30kva.jpg' },
  { slug: 'svc-50kva', image: '/images/products/svc-50kva.jpg' },
  { slug: 'svc-60kva', image: '/images/products/svc-60kva.jpg' },
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

function buildImageBlock(imagePath: string) {
  return `    <image:image>
      <image:loc>${baseUrl}${imagePath}</image:loc>
      <image:title>YOKE Industrial Power Solutions</image:title>
    </image:image>`
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
    const isProductsPage = path === '/products'
    const imageBlocks = isProductsPage
      ? productImages.map(p => buildImageBlock(p.image)).join('\n')
      : ''
    const imageSection = imageBlocks ? `\n${imageBlocks}` : ''
    entries.push(`  <url>
    <loc>${url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
${altLinks}${imageSection}
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
    const imageBlock = buildImageBlock(`/images/articles/${slug}.jpg`)
    entries.push(`  <url>
    <loc>${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
${altLinks}
${imageBlock}
  </url>`)
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
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
