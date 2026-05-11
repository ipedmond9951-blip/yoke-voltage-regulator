'use client'
import { type Locale } from '@/i18n'
interface ArticleSchemaProps {
  locale?: Locale
  title: string
  description: string
  author?: string
  datePublished?: string
  dateModified?: string
  image?: string
  url?: string
}
export default function ArticleSchema({
  locale = 'en',
  title,
  description,
  author = 'YOKE AVR',
  datePublished,
  dateModified,
  image = 'https://kk-electric.com/images/blog/article-default.jpg',
  url,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': url ? `https://kk-electric.com${url}` : undefined,
    headline: title,
    description: description,
    image: image,
    author: {
      '@type': 'Organization',
      '@id': 'https://kk-electric.com/#organization',
      name: author,
    },
    publisher: { '@id': 'https://kk-electric.com/#organization' },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: { '@id': url ? `https://kk-electric.com${url}` : undefined },
    articleSection: locale === 'zh' ? '稳压器知识' : 'AVR Knowledge',
    keywords: locale === 'zh'
      ? '稳压器,电压调节器,SVC,TND,AVR,电力保护'
      : 'AVR,voltage regulator,SVC,TND,power protection,electrical',
    wordCount: description.split(' ').length * 10,
    inLanguage: locale === 'zh' ? 'zh-CN' : locale === 'es' ? 'es' : 'en',
    isPartOf: { '@type': 'WebSite', '@id': 'https://kk-electric.com/#website' },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
