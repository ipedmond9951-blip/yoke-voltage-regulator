'use client'
import { type Locale, t, getMessages } from '@/i18n'
interface OrganizationSchemaProps { locale?: Locale }
export default function OrganizationSchema({ locale = 'en' }: OrganizationSchemaProps) {
  const msgs = getMessages(locale)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://kk-electric.com/#organization',
    name: 'YOKE AVR',
    url: 'https://kk-electric.com',
    logo: { '@type': 'ImageObject', url: 'https://kk-electric.com/images/logo.png', width: 200, height: 60 },
    image: { '@type': 'ImageObject', url: 'https://kk-electric.com/images/factory.jpg' },
    description: (msgs.hero as Record<string, string>)?.subtitle || t(locale, 'hero.subtitle'),
    foundingDate: '2014',
    foundingLocation: { '@type': 'Place', name: t(locale, 'orgSchema.foundingLocation') },
    areaServed: { '@type': 'Place', name: t(locale, 'orgSchema.areaServed') },
    contactPoint: {
      '@type': 'ContactPoint', contactType: t(locale, 'orgSchema.contactType'), email: 'sales@kk-electric.com',
      availableLanguage: ['English', 'Chinese', 'Shona'], telephone: '+86-159-6340-9951',
      areaServed: [{ '@type': 'Country', name: 'South Africa' }, { '@type': 'Country', name: 'Zimbabwe' }, { '@type': 'Country', name: 'Kenya' }, { '@type': 'Country', name: 'Nigeria' }],
    },
    sameAs: [
      'https://www.linkedin.com/company/yoke-avr',
      'https://www.crunchbase.com/organization/yoke-avr',
      'https://github.com/ipedmond9951-blip',
      'https://twitter.com/yoke_avr',
      'https://www.facebook.com/yokeavr',
    ],
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'VAT-CN',
      value: '91440300MA5DA8JX2X',
    },
    knowsAbout: [
      'Voltage Stabilizer',
      'Automatic Voltage Regulator',
      'Servo Voltage Stabilizer',
      'Static Voltage Stabilizer',
      'Three-Phase Voltage Regulator',
      'Power Quality',
      'Voltage Regulation Africa',
      'Industrial Power Protection',
    ],
    award: [
      'CE Certified (2018)',
      'CB Scheme Certified (2019)',
      'ISO 9001:2015 Quality Management (2020)',
      'SONCAP Conformity (Nigeria, 2021)',
      'PVoC Pre-Verification (Kenya, 2022)',
    ],
    memberOf: [
      { '@type': 'Organization', name: 'China Chamber of Commerce for Import and Export of Machinery and Electronic Products (CCCME)' },
      { '@type': 'Organization', name: 'IEEE Industry Applications Society' },
    ],
    naics: '335999',
    isicV4: '2710',
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
