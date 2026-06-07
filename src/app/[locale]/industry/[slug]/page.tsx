import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles, getAllSlugs, getArticleBySlug } from '@/lib/articles'
import { getAuthor } from '@/lib/authors'
import { type Locale, t, locales } from '@/i18n'
import type { ArticleSection } from '@/lib/articles'
import ShareButtons from '@/components/ShareButtons'
import ArticleSchema from '@/components/ArticleSchema'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import HowToSchema from '@/components/HowToSchema'

const SITE_URL = 'https://kk-electric.com'

export async function generateStaticParams() {
  // Exclude redirect articles (articles with redirectTo field) from static generation
  const allSlugs = getAllSlugs()
  const redirectSlugs = new Set(
    allSlugs.filter(slug => {
      const article = getArticleBySlug(slug) as any
      return article?.redirectTo
    })
  )
  return allSlugs
    .filter(slug => !redirectSlugs.has(slug))
    .map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam as Locale) || 'en'
  const article = getArticleBySlug(slug) as any
  if (!article) return { title: 'Article Not Found' }

  // Old article slug redirected to new URL - don't index
  if (article.redirectTo) {
    return {
      title: 'Page Moved | YOKE Voltage Regulators',
      robots: { index: false },
    }
  }

  const title = (article.title as Record<string, string>)[locale] || (article.title as Record<string, string>).en
  const desc = article.description[locale] || article.description.en

  return {
    title: `${title} | YOKE Voltage Regulators`,
    description: desc,
    keywords: article.keywords,
    openGraph: {
      title,
      description: desc,
      url: `${SITE_URL}/${locale}/industry/${slug}`,
      type: 'article',
      publishedTime: article.date,
      authors: ['YOKE Electric'],
      images: [{ url: `${SITE_URL}${article.image}`, width: 1200, height: 630, alt: title }],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/industry/${slug}`,
      languages: Object.fromEntries([
        ['x-default', `${SITE_URL}/en/industry/${slug}`],
        ...locales.map(l => [l, `${SITE_URL}/${l}/industry/${slug}`])
      ]),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | YOKE Voltage Regulators`,
      description: desc,
      images: [`${SITE_URL}${article.image}`],
    },
  }
}

function localizedText(obj: Record<string, string> | undefined, locale: string): string {
  if (!obj) return ''
  return obj[locale] || obj['en'] || Object.values(obj)[0] || ''
}

function renderSection(section: ArticleSection, locale: string) {
  return (
    <section key={section.id} className="mb-8" id={section.id}>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{localizedText(section.heading, locale)}</h2>
      {section.body && (
        <p className="text-gray-700 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: localizedText(section.body, locale) }} />
      )}
      {section.table && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-primary-50">
              <tr>
                {section.table.headers.map((h, i) => (
                  <th key={i} className="border border-gray-300 p-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-gray-300 p-3">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.faqItems && (
        <div className="space-y-4">
          {section.faqItems.map((item, i) => (
            <details key={i} className="bg-gray-50 rounded-lg p-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">{localizedText(item.q, locale)}</summary>
              <p className="mt-2 text-gray-700">{localizedText(item.a, locale)}</p>
            </details>
          ))}
        </div>
      )}
    </section>
  )
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam as Locale) || 'en'
  const article = getArticleBySlug(slug)

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link href={`/${locale}/industry`} className="text-primary-600 hover:underline">← Back to articles</Link>
        </div>
      </div>
    )
  }

  // Old article slug redirected to new URL
  if ((article as any).redirectTo) {
    redirect(`/${locale}/industry/${(article as any).redirectTo}`)
  }

  const title = localizedText(article.title, locale)
  const desc = localizedText(article.description, locale)
  const ctaText = localizedText(article.cta.text, locale)
  const ctaBtn = localizedText(article.cta.buttonText, locale)

  // JSON-LD FAQ Schema
  const faqItems = article.sections
    .filter(s => s.faqItems)
    .flatMap(s => s.faqItems!)
  const faqSchema = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: localizedText(item.q, locale),
      acceptedAnswer: {
        '@type': 'Answer',
        text: localizedText(item.a, locale),
      },
    })),
  } : null

  // HowTo Schema (for installation/how-to articles)
  const howToSchema = (article as any).schema === 'HowTo' || (article as any).schema === 'how-to' ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: desc,
    totalTime: `PT${(article.readTime || 5)}M`,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    inLanguage: (() => {
      const map: Record<string, string> = { en: 'en-US', zh: 'zh-CN', es: 'es-ES', ar: 'ar-SA', fr: 'fr-FR', pt: 'pt-PT', ru: 'ru-RU', ja: 'ja-JP', de: 'de-DE', hi: 'hi-IN' }
      return map[locale] || 'en-US'
    })(),
    step: article.sections
      .filter(s => s.body)
      .map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: localizedText(s.heading, locale) || `Step ${i + 1}`,
        text: ((s.body?.[locale] || s.body?.en || '')).replace(/<[^>]+>/g, ' ').substring(0, 500),
      })),
  } : null

  // Page URL for schema
  const pageUrl = `/${locale}/industry/${slug}`

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src={article.image} alt={title} fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl">
          <Link href={`/${locale}/industry`} className="inline-flex items-center gap-1 text-primary-200 hover:text-white text-sm mb-6 transition-colors">
            ← {locale === 'zh' ? '返回文章列表' : 'Back to articles'}
          </Link>
          <span className="inline-block bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">{article.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{title}</h1>
          <div className="flex items-center gap-4 text-sm text-primary-200">
            <span>{article.date}</span>
            <span>· ~{article.readTime} min read</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <p className="text-gray-700 leading-relaxed text-base md:text-lg mb-6">{desc}</p>
        
        {/* Social Share Buttons */}
        <ShareButtons 
          url={`${SITE_URL}/${locale}/industry/${slug}`}
          title={title}
          description={desc}
        />
        
        {article.sections.map(section => renderSection(section, locale))}

        {/* CTA */}
        <div className="mt-12 bg-primary-50 rounded-xl p-6 md:p-8 text-center">
          <p className="text-lg font-medium text-gray-900 mb-4">{ctaText}</p>
          <Link href={`/${locale}${article.cta.link}`} className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
            {ctaBtn}
          </Link>
        </div>

        {/* Related Products */}
        {article.relatedProducts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Related Products</h3>
            <div className="flex gap-3 flex-wrap">
              {article.relatedProducts.map(p => (
                <Link key={p} href={`/${locale}/products`} className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-primary-100 hover:text-primary-700 transition-colors">
                  {p.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Related Articles</h3>
            <div className="flex gap-3 flex-wrap">
              {article.relatedArticles.map((a: { slug: string; title: string }) => (
                <Link key={a.slug} href={`/${locale}/industry/${a.slug}`} className="px-4 py-2 bg-blue-50 rounded-lg text-sm text-blue-700 hover:bg-blue-100 transition-colors">
                  {a.title.length > 40 ? a.title.substring(0, 40) + '...' : a.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* About the Author - E-E-A-T signal */}
        {(article as any).authorSlug && (() => {
          const author = getAuthor((article as any).authorSlug)
          if (!author) return null
          return (
            <div className="mt-10 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary-300 to-primary-600 flex items-center justify-center text-white text-xl md:text-2xl font-bold flex-shrink-0">
                  {author.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-wide text-primary-700 font-semibold mb-1">
                    {locale === 'zh' ? '本文作者' : 'About the Author'}
                  </div>
                  <Link
                    href={`/${locale}/team/${author.slug}`}
                    className="text-lg md:text-xl font-bold text-primary-900 hover:text-primary-700 hover:underline"
                  >
                    {author.name}
                  </Link>
                  <div className="text-sm text-primary-800 mt-0.5">{author.jobTitle}</div>
                  <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                    {author.shortBio}
                  </p>
                  <Link
                    href={`/${locale}/team/${author.slug}`}
                    className="inline-block mt-3 text-sm text-primary-700 hover:text-primary-900 font-medium"
                  >
                    {locale === 'zh' ? '查看完整简介 →' : 'View Full Profile →'}
                  </Link>
                </div>
              </div>
            </div>
          )
        })()}
      </article>

      {/* Schema - Full SEO JSON-LD Stack */}
      {/* 1. Article (using enhanced component) */}
      <ArticleSchema
        locale={locale}
        title={title}
        description={desc}
        author={typeof (article as any).author === 'object' && (article as any).author?.name ? (article as any).author.name : 'YOKE Electric Engineering Team'}
        authorSlug={(article as any).authorSlug}
        datePublished={article.date}
        dateModified={(article as any).updatedDate || article.date}
        image={`https://kk-electric.com${article.image || `/images/articles/${slug}.jpg`}`}
        url={pageUrl}
      />
      {/* 2. FAQPage Schema (inline, supports 9 languages) */}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      {/* 3. HowTo Schema (for how-to articles) */}
      {howToSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      )}
      {/* 4. BreadcrumbList Schema (rich result) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://kk-electric.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Industry',
                item: `https://kk-electric.com/${locale}/industry`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: title,
                item: `https://kk-electric.com${pageUrl}`,
              },
            ],
          }),
        }}
      />
      {/* 5. Speakable Schema (for voice search) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SpeakableSpecification',
            xpath: ['/html/head/title', '/html/body//h1', '/html/body//article/p[1]'],
          }),
        }}
      />
    </div>
  )
}
