import { Metadata } from 'next'
import { locales, type Locale, t, getMessages } from '@/i18n'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'

  return {
    title: t(loc, 'privacy.metaTitle'),
    description: t(loc, 'privacy.metaDescription'),
    alternates: {
      canonical: `https://kk-electric.com/${loc}/privacy-policy`,
      languages: Object.fromEntries([
        ['x-default', 'https://kk-electric.com/en/privacy-policy'],
        ...locales.map(l => [l, `https://kk-electric.com/${l}/privacy-policy`]),
      ]),
    },
  }
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  const messages = getMessages(loc)
  const privacyData = messages.privacy

  return (
    <>
      <Header locale={loc} />
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{privacyData.title}</h1>
              <p className="text-slate-300">{privacyData.lastUpdated}</p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              {privacyData.sections.map((section, index) => (
                <div key={index} className="mb-10">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={loc} />
    </>
  )
}
