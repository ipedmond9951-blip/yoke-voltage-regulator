'use client'
import { type Locale } from '@/i18n'
interface BreadcrumbSchemaProps { 
  locale: Locale
  pageUrl?: string
  pageName?: string
}
export default function BreadcrumbSchema({ locale, pageUrl = '', pageName }: BreadcrumbSchemaProps) {
  const baseUrl = 'https://kk-electric.com'
  const items = [
    { position: 1, name: 'Home', item: baseUrl },
    ...(pageUrl ? [{ position: 2, name: pageName || 'Page', item: `${baseUrl}/${locale}${pageUrl}` }] : []),
  ]
  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-3">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-gray-400">/</span>}
            <a href={item.item} className="text-primary-600 hover:text-primary-800">{item.name}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
