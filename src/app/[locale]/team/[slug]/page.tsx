import { Metadata } from 'next'
import { locales, type Locale } from '@/i18n'
import { t } from '@/i18n'
import { authors, getAuthor, getAuthorSlugs } from '@/lib/authors'
import PersonSchema from '@/components/PersonSchema'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = []
  for (const locale of locales) {
    for (const slug of getAuthorSlugs()) {
      params.push({ locale, slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const loc = (locale as Locale) || 'en'
  const author = getAuthor(slug)
  if (!author) return { title: 'Not Found' }
  const siteUrl = 'https://kk-electric.com'

  const titles: Record<string, string> = {
    en: `${author.name} - ${author.jobTitle} | YOKE AVR Engineering Team`,
    zh: `${author.name} - ${author.jobTitle} | YOKE AVR 工程团队`,
  }
  const descriptions: Record<string, string> = {
    en: `${author.shortBio} Author of YOKE technical articles on AVR for African B2B procurement teams.`,
    zh: `${author.shortBio} YOKE 面向非洲 B2B 采购团队 AVR 技术文章作者。`,
  }
  return {
    title: titles[loc] || titles.en,
    description: descriptions[loc] || descriptions.en,
    alternates: {
      canonical: `${siteUrl}/${loc}/team/${slug}`,
      languages: Object.fromEntries([
        ['x-default', `${siteUrl}/en/team/${slug}`],
        ...locales.map(l => [l, `${siteUrl}/${l}/team/${slug}`]),
      ]),
    },
  }
}

export default async function AuthorProfilePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const loc = (locale as Locale) || 'en'
  const author = getAuthor(slug)
  if (!author) notFound()

  const siteUrl = 'https://kk-electric.com'
  const profileUrl = `${siteUrl}/${loc}/team/${slug}`

  const sameAs: string[] = []
  if (author.socials.linkedin) sameAs.push(author.socials.linkedin)
  if (author.socials.twitter) sameAs.push(author.socials.twitter)
  if (author.socials.github) sameAs.push(author.socials.github)
  if (author.socials.orcid) sameAs.push(author.socials.orcid)

  return (
    <div className="min-h-screen bg-gray-50">
      <PersonSchema
        locale={loc}
        name={author.name}
        jobTitle={author.jobTitle}
        description={author.shortBio}
        url={profileUrl}
        image={`${siteUrl}${author.image}`}
        sameAs={sameAs}
        email={author.email}
        knowsAbout={author.expertise}
        alumniOf={author.alumniOf}
        award={author.awards}
      />
      <BreadcrumbSchema
        locale={loc}
        pageUrl={`/team/${slug}`}
        pageName={author.name}
      />

      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <nav className="text-sm text-primary-200 mb-4">
            <Link href={`/${loc}`} className="hover:text-white">{loc === 'zh' ? '首页' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${loc}/about`} className="hover:text-white">{loc === 'zh' ? '关于' : 'About'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{author.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{author.name}</h1>
          <p className="text-primary-200 text-lg">{author.jobTitle}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center text-primary-800 text-2xl font-bold flex-shrink-0">
                {author.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary-900 mb-3">
                  {loc === 'zh' ? '简介' : 'Biography'}
                </h2>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {author.longBio}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {author.socials.linkedin && (
                    <a href={author.socials.linkedin} target="_blank" rel="noopener noreferrer nofollow" className="text-sm text-primary-700 hover:text-primary-900 underline">
                      LinkedIn
                    </a>
                  )}
                  {author.socials.twitter && (
                    <a href={author.socials.twitter} target="_blank" rel="noopener noreferrer nofollow" className="text-sm text-primary-700 hover:text-primary-900 underline">
                      Twitter
                    </a>
                  )}
                  {author.socials.github && (
                    <a href={author.socials.github} target="_blank" rel="noopener noreferrer nofollow" className="text-sm text-primary-700 hover:text-primary-900 underline">
                      GitHub
                    </a>
                  )}
                  {author.socials.orcid && (
                    <a href={author.socials.orcid} target="_blank" rel="noopener noreferrer nofollow" className="text-sm text-primary-700 hover:text-primary-900 underline">
                      ORCID
                    </a>
                  )}
                  <a href={`mailto:${author.email}`} className="text-sm text-primary-700 hover:text-primary-900 underline">
                    {author.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-primary-900 mb-4">
                {loc === 'zh' ? '专业领域' : 'Areas of Expertise'}
              </h2>
              <ul className="space-y-2">
                {author.expertise.map((area, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary-600 mr-2">▸</span>
                    <span className="text-gray-700">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-primary-900 mb-4">
                {loc === 'zh' ? '资历认证' : 'Credentials'}
              </h2>
              <ul className="space-y-2">
                {author.credentials.map((cred, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span className="text-gray-700 text-sm">{cred}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {author.awards && author.awards.length > 0 && (
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">
                {loc === 'zh' ? '获奖荣誉' : 'Awards & Recognition'}
              </h2>
              <ul className="space-y-3">
                {author.awards.map((award, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-amber-500 mr-2 text-lg">★</span>
                    <span className="text-gray-700">{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm mb-8">
            <h2 className="text-xl font-bold text-primary-900 mb-4">
              {loc === 'zh' ? '语言能力' : 'Languages'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {author.languages.map((lang, i) => (
                <span key={i} className="px-3 py-1 bg-primary-50 text-primary-800 rounded-full text-sm">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-primary-900 mb-4">
              {loc === 'zh' ? 'YOKE 团队其他成员' : 'Other YOKE Engineering Team Members'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {authors.filter(a => a.slug !== author.slug).map((a, i) => (
                <Link
                  key={i}
                  href={`/${loc}/team/${a.slug}`}
                  className="block bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center text-primary-900 text-sm font-bold flex-shrink-0">
                      {a.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-primary-900 truncate">{a.name}</div>
                      <div className="text-xs text-gray-600 truncate">{a.jobTitle}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`/${loc}/about`}
              className="inline-block text-primary-700 hover:text-primary-900 font-medium"
            >
              ← {loc === 'zh' ? '返回关于页面' : 'Back to About Page'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
