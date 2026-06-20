import { Metadata } from 'next'
import { locales, type Locale, t } from '@/i18n'
import FAQSection from '@/components/FAQSection'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import LocalInfoBlock from '@/components/LocalInfoBlock'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  const siteUrl = 'https://kk-electric.com'
  const metaTitle = t(loc, 'faqPage.title')
  const metaDescription = t(loc, 'faqPage.description')

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `${siteUrl}/${loc}/faq`,
      languages: Object.fromEntries([
        ['x-default', `${siteUrl}/en/faq`],
        ...locales.map(l => [l, `${siteUrl}/${l}/faq`]),
      ]),
    },
  }
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'

  return (
    <>
      <BreadcrumbSchema
        locale={loc}
        pageUrl="/faq"
        pageName={t(loc, 'nav.faq')}
      />
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t(loc, 'faq.title')}</h1>
          <p className="text-primary-200 text-base md:text-lg max-w-2xl">{t(loc, 'faq.subtitle')}</p>
        </div>
      </section>
      <FAQSection locale={loc} />
      {loc !== 'en' && <div className="container mx-auto px-4 sm:px-6 py-10"><LocalInfoBlock locale={loc} /></div>}
    </>
  )
}
