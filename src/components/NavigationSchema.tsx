'use client'
import { type Locale } from '@/i18n'
interface NavigationSchemaProps { locale: Locale; pageUrl?: string }
export default function NavigationSchema({ locale, pageUrl = '' }: NavigationSchemaProps) {
  const baseUrl = 'https://kk-electric.com'
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: locale === 'zh' ? '产品' : 'Products', item: `${baseUrl}/${locale}/products` },
      ...(pageUrl ? [{ '@type': 'ListItem', position: 3, name: 'Current Page', item: `${baseUrl}/${locale}${pageUrl}` }] : []),
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
