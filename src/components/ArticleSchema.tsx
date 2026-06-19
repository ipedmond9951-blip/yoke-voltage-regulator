'use client'
import { type Locale, t } from '@/i18n'
import { getAuthor } from '@/lib/authors'
interface ArticleSchemaProps {
  locale?: Locale
  title: string
  description: string
  author?: string
  authorSlug?: string
  authorTitle?: string
  authorCredentials?: string
  datePublished?: string
  dateModified?: string
  image?: string
  url?: string
}
export default function ArticleSchema({
  locale = 'en',
  title,
  description,
  author = 'YOKE Electric Engineering Team',
  authorSlug,
  authorTitle,
  authorCredentials,
  datePublished,
  dateModified,
  image = 'https://kk-electric.com/images/blog/article-default.jpg',
  url,
}: ArticleSchemaProps) {
  const langMap: Record<string, string> = {
    en: 'en-US', zh: 'zh-CN', es: 'es-ES', ar: 'ar-SA',
    fr: 'fr-FR', pt: 'pt-PT', ru: 'ru-RU', ja: 'ja-JP',
    de: 'de-DE', hi: 'hi-IN',
  }
  const inLanguage = langMap[locale] || 'en-US'
  const pageId = url ? `https://kk-electric.com${url}` : undefined
  const authorProfile = authorSlug ? getAuthor(authorSlug) : undefined
  const authorSchema = authorProfile
    ? {
        '@type': 'Person',
        '@id': `https://kk-electric.com/en/team/${authorProfile.slug}`,
        name: authorProfile.name,
        url: `https://kk-electric.com/en/team/${authorProfile.slug}`,
        jobTitle: authorProfile.jobTitle,
        worksFor: { '@id': 'https://kk-electric.com/#organization' },
      }
    : {
        '@type': 'Organization',
        '@id': 'https://kk-electric.com/#organization',
        name: author,
        url: 'https://kk-electric.com',
      }
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': pageId,
    headline: title,
    description: description,
    image: [image],
    author: authorSchema,
    publisher: {
      '@type': 'Organization',
      '@id': 'https://kk-electric.com/#organization',
      name: 'YOKE',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kk-electric.com/images/logo.png',
        width: 600,
        height: 60,
      },
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageId,
    },
    articleSection: t(locale, 'articleSchema.section'),
    keywords: t(locale, 'articleSchema.keywords'),
    wordCount: description.split(' ').length * 10,
    inLanguage,
    isPartOf: { '@type': 'WebSite', '@id': 'https://kk-electric.com/#website' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article h1', 'article p', 'article li'],
    },
    hasPart: [
      {
        '@type': 'WebPageElement',
        isAccessibleForFree: true,
        cssSelector: 'article',
      },
    ],
    citation: [
      {
        '@type': 'Organization',
        '@id': 'https://kk-electric.com/#organization',
        name: 'YOKE Industrial Power Solutions',
      },
    ],
    about: [
      { '@type': 'Thing', name: 'Voltage Stabilizer' },
      { '@type': 'Thing', name: 'Automatic Voltage Regulator' },
    ],
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
