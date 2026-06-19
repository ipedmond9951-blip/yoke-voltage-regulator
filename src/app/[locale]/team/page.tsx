import { Metadata } from 'next'
import { locales, type Locale, t, getMessages } from '@/i18n'
import { authors } from '@/lib/authors'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import Link from 'next/link'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  const siteUrl = 'https://kk-electric.com'

  return {
    title: t(loc, 'team.metaTitle'),
    description: t(loc, 'team.metaDescription'),
    alternates: {
      canonical: `${siteUrl}/${loc}/team`,
      languages: Object.fromEntries([
        ['x-default', `${siteUrl}/en/team`],
        ...locales.map(l => [l, `${siteUrl}/${l}/team`]),
      ]),
    },
  }
}

export default async function TeamIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  const siteUrl = 'https://kk-electric.com'

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbSchema
        locale={loc}
        pageUrl="/team"
        pageName={t(loc, 'team.breadcrumbTeam')}
      />

      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <nav className="text-sm text-primary-200 mb-4">
            <Link href={`/${loc}`} className="hover:text-white">{t(loc, 'team.breadcrumbHome')}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{t(loc, 'team.breadcrumbTeam')}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {t(loc, 'team.title')}
          </h1>
          <p className="text-primary-200 text-base md:text-lg max-w-3xl">
            {t(loc, 'team.subtitle')}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {authors.map((author, i) => (
              <Link
                key={i}
                href={`/${loc}/team/${author.slug}`}
                className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-300 to-primary-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                    {author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h2 className="text-xl font-bold text-primary-900 mb-1">{author.name}</h2>
                  <div className="text-sm text-primary-700 font-medium mb-3">{author.jobTitle}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {author.shortBio}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1 justify-center">
                    {author.expertise.slice(0, 3).map((area, j) => (
                      <span key={j} className="px-2 py-1 bg-primary-50 text-primary-800 rounded-full text-xs">
                        {area}
                      </span>
                    ))}
                    {author.expertise.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{author.expertise.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 text-sm text-primary-700 font-medium">
                    {t(loc, 'team.viewFullProfile')}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-primary-900 mb-4">
              {t(loc, 'team.whyTitle')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  {t(loc, 'team.gridExpertiseTitle')}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {t(loc, 'team.gridExpertiseDesc')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  {t(loc, 'team.certTitle')}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {t(loc, 'team.certDesc')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  {t(loc, 'team.supportTitle')}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {t(loc, 'team.supportDesc')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`/${loc}/about`}
              className="inline-block text-primary-700 hover:text-primary-900 font-medium"
            >
              ← {t(loc, 'team.backToAbout')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
