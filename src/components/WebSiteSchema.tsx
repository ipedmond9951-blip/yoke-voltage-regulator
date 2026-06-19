'use client'

import { type Locale, t } from '@/i18n'

interface WebSiteSchemaProps {
  locale: Locale
}

export default function WebSiteSchema({ locale }: WebSiteSchemaProps) {
  const siteUrl = 'https://kk-electric.com'
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t(locale, 'webSchema.name'),
    url: siteUrl,
    description: t(locale, 'webSchema.description'),
    keywords: t(locale, 'webSchema.keywords'),
    inLanguage: (() => { const map = { en: 'en-US', zh: 'zh-CN', es: 'es-ES', ar: 'ar-SA', fr: 'fr-FR', pt: 'pt-PT', ru: 'ru-RU', ja: 'ja-JP', de: 'de-DE', hi: 'hi-IN' }; return map[locale] || 'en-US' })(),
    isAccessibleForFree: true,
    about: {
      '@type': 'Thing',
      name: t(locale, 'webSchema.searchName'),
      description: t(locale, 'webSchema.description'),
    },
    audience: {
      '@type': 'Audience',
      name: t(locale, 'webSchema.audience'),
      geographicArea: {
        '@type': 'Place',
        name: 'Africa',
      },
    },
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/${locale}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
      description: t(locale, 'webSchema.searchDesc'),
    },
    sameAs: [
      'https://www.linkedin.com/company/yoke-avr',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@kk-electric.com',
      availableLanguage: ['English', 'Chinese'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}