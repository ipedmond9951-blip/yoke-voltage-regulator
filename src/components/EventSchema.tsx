'use client'
import { type Locale } from '@/i18n'
interface EventSchemaProps {
  locale?: Locale; name: string; description: string; startDate: string; endDate: string; location: string; url?: string
}
export default function EventSchema({ locale = 'en', name, description, startDate, endDate, location, url }: EventSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': url ? `https://kk-electric.com${url}` : undefined,
    name, description, startDate, endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: { '@type': 'Place', name: location, address: { '@type': 'PostalAddress', addressCountry: 'ZA' } },
    organizer: { '@type': 'Organization', '@id': 'https://kk-electric.com/#organization', name: 'YOKE AVR' },
    sponsor: { '@type': 'Organization', '@id': 'https://kk-electric.com/#organization', name: 'YOKE AVR' },
    about: { '@type': 'Thing', name: 'Voltage Regulators, Power Equipment, AVR Solutions' },
    keywords: locale === 'zh'
      ? '稳压器,电压调节器,电力设备,AVR,非洲'
      : 'AVR,voltage regulator,power equipment,electrical,Africa',
    inLanguage: (() => { const map = { en: 'en-US', zh: 'zh-CN', es: 'es-ES', ar: 'ar-SA', fr: 'fr-FR', pt: 'pt-PT', ru: 'ru-RU', ja: 'ja-JP', de: 'de-DE', hi: 'hi-IN' }; return map[locale] || 'en-US' })(),
    isPartOf: { '@type': 'WebSite', '@id': 'https://kk-electric.com/#website' },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
