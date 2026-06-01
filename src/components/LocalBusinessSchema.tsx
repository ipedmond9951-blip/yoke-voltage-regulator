'use client'

import { type Locale } from '@/i18n'

interface LocalBusinessSchemaProps {
  locale?: Locale
}

export default function LocalBusinessSchema({ locale = 'en' }: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://kk-electric.com/#business',
    name: 'YOKE AVR',
    image: {
      '@type': 'ImageObject',
      url: 'https://kk-electric.com/images/logo.png',
      width: 200,
      height: 60,
    },
    priceRange: '$$',
    servesCuisine: 'Manufacturing',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CN',
      addressRegion: 'Guangdong',
      addressLocality: 'Shenzhen',
      streetAddress: 'Baoan District',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.5431,
      longitude: 114.0579,
    },
    telephone: '+86-159-6340-9951',
    whatsapp: '+8613634200569',
    email: 'sales@kk-electric.com',
    url: 'https://kk-electric.com',
    areaServed: [
      { '@type': 'Country', name: 'South Africa' },
      { '@type': 'Country', name: 'Zimbabwe' },
      { '@type': 'Country', name: 'Kenya' },
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'Country', name: 'Ghana' },
      { '@type': 'Country', name: 'UAE' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'Vietnam' },
      { '@type': 'Country', name: 'Thailand' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
        timeZone: 'Asia/Shanghai',
      },
    ],
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, L/C',
    currenciesAccepted: 'USD, CNY, EUR',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '156',
      bestRating: '5',
    },
    sameAs: [
      'https://www.linkedin.com/company/yoke-avr',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+86-159-6340-9951',
        email: 'sales@kk-electric.com',
        contactType: 'sales',
        availableLanguage: ['English', 'Chinese', 'Shona'],
        areaServed: [
          { '@type': 'Country', name: 'Zimbabwe' },
          { '@type': 'Country', name: 'South Africa' },
          { '@type': 'Country', name: 'Kenya' },
          { '@type': 'Country', name: 'Nigeria' },
        ],
      },
      {
        '@type': 'ContactPoint',
        telephone: '+86-159-6340-9951',
        contactType: 'customer support',
        contactOption: 'WhatsApp',
        availableLanguage: ['English', 'Chinese'],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}