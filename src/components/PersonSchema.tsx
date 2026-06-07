'use client'
import { type Locale } from '@/i18n'

interface PersonSchemaProps {
  locale?: Locale
  name: string
  jobTitle: string
  description: string
  url: string
  image?: string
  sameAs?: string[]
  worksFor?: string
  knowsAbout?: string[]
  email?: string
  alumniOf?: string
  award?: string[]
}

export default function PersonSchema({
  locale = 'en',
  name,
  jobTitle,
  description,
  url,
  image = 'https://kk-electric.com/images/team/author-default.jpg',
  sameAs = [],
  worksFor = 'YOKE',
  knowsAbout = [],
  email,
  alumniOf,
  award = [],
}: PersonSchemaProps) {
  const langMap: Record<string, string> = {
    en: 'en-US', zh: 'zh-CN', es: 'es-ES', ar: 'ar-SA',
    fr: 'fr-FR', pt: 'pt-PT', ru: 'ru-RU', ja: 'ja-JP',
    de: 'de-DE', hi: 'hi-IN',
  }
  const inLanguage = langMap[locale] || 'en-US'

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': url,
    name,
    jobTitle,
    description,
    url,
    image,
    inLanguage,
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://kk-electric.com/#organization',
      name: worksFor,
    },
    memberOf: {
      '@type': 'Organization',
      '@id': 'https://kk-electric.com/#organization',
    },
    knowsLanguage: Object.values(langMap),
  }
  if (sameAs.length > 0) {
    schema.sameAs = sameAs
  }
  if (knowsAbout.length > 0) {
    schema.knowsAbout = knowsAbout.map(k => ({ '@type': 'Thing', name: k }))
  }
  if (email) {
    schema.email = email
  }
  if (alumniOf) {
    schema.alumniOf = { '@type': 'EducationalOrganization', name: alumniOf }
  }
  if (award.length > 0) {
    schema.award = award
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
