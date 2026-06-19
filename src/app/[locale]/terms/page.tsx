import { Metadata } from 'next'
import { locales, type Locale, t, getMessages } from '@/i18n'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  const siteUrl = 'https://kk-electric.com'
  return {
    title: t(loc, 'terms.metaTitle'),
    description: t(loc, 'terms.metaDescription'),
    alternates: {
      canonical: `${siteUrl}/${loc}/terms`,
      languages: Object.fromEntries([
        ['x-default', `${siteUrl}/en/terms`],
        ...locales.map(l => [l, `${siteUrl}/${l}/terms`]),
      ]),
    },
  }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  const messages = getMessages(loc)
  const termsData = messages.terms

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-primary-900 mb-8">{termsData.title}</h1>
        <div className="space-y-6 text-gray-700">
          {termsData.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
