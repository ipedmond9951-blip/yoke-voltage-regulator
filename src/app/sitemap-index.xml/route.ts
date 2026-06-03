import { NextResponse } from 'next/server'
import { locales } from '@/i18n'

export async function GET() {
  const lastmod = new Date().toISOString()
  const baseUrl = 'https://kk-electric.com'

  const sitemaps = locales.map(l => {
    return `  <sitemap>
    <loc>${baseUrl}/sitemap/${l}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
