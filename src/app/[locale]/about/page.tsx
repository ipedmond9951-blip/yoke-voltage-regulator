import { Metadata } from 'next'
import { locales, type Locale } from '@/i18n'
import { t } from '@/i18n'
import LocalInfoBlock from '@/components/LocalInfoBlock'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  const siteUrl = 'https://kk-electric.com'

  return {
    title: t(loc, 'aboutPage.title'),
    description: t(loc, 'aboutPage.description'),
    alternates: {
      canonical: `${siteUrl}/${loc}/about`,
      languages: Object.fromEntries([
        ['x-default', `${siteUrl}/en/about`],
        ...locales.map(l => [l, `${siteUrl}/${l}/about`]),
      ]),
    },
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t(loc, 'about.title')}</h1>
          <p className="text-primary-200 text-base md:text-lg max-w-2xl">{t(loc, 'about.subtitle')}</p>
        </div>
      </section>
      <section className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-primary-900 mb-4">{t(loc, 'aboutPage.companyProfile')}</h2>
            <p className="text-gray-700 leading-relaxed">
              {t(loc, 'aboutPage.companyProfileDesc')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-primary-900 mb-3">🏭 {t(loc, 'aboutPage.productionCapacity')}</h3>
              <p className="text-gray-700 text-sm">{t(loc, 'aboutPage.productionCapacityDesc')}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-primary-900 mb-3">🌍 {t(loc, 'aboutPage.marketCoverage')}</h3>
              <p className="text-gray-700 text-sm">{t(loc, 'aboutPage.marketCoverageDesc')}</p>
            </div>
          </div>
        </div>
        {loc !== 'en' && <LocalInfoBlock locale={loc} />}
      </section>
    </div>
  )
}
