'use client'
import { type Locale, t } from '@/i18n'
export default function AboutPageSchema({ locale }: { locale: Locale }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://kk-electric.com/#about',
    name: 'About YOKE AVR',
    description: t(locale, 'aboutSchema.description'),
    url: 'https://kk-electric.com/about',
    inLanguage: (() => { const map = { en: 'en-US', zh: 'zh-CN', es: 'es-ES', ar: 'ar-SA', fr: 'fr-FR', pt: 'pt-PT', ru: 'ru-RU', ja: 'ja-JP', de: 'de-DE', hi: 'hi-IN' }; return map[locale] || 'en-US' })(),
    isPartOf: { '@type': 'WebSite', '@id': 'https://kk-electric.com/#website' },
    publisher: { '@id': 'https://kk-electric.com/#organization' },
    datePublished: '2014-01-01',
    dateModified: '2026-01-01',
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
