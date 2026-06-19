import Script from 'next/script'
import { locales, type Locale, getMessages, t } from '@/i18n'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import ProductGrid from '@/components/ProductGrid'
import CertificationsSection from '@/components/CertificationsSection'
import FAQSection from '@/components/FAQSection'
import InquiryForm from '@/components/InquiryForm'
import ShareButtons from '@/components/ShareButtons'
import StatisticsSection from '@/components/StatisticsSection'
import ArticlesSection from '@/components/ArticlesSection'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam as Locale) || 'en'
  const msgs = getMessages(locale)
  const BASE_URL = 'https://kk-electric.com'

  return (
    <>
      <Script
        id="seo-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'YOKE Electric',
            url: BASE_URL,
            logo: `${BASE_URL}/logo.png`,
            description: msgs.hero?.subtitle || 'Professional automatic voltage regulator manufacturer.',
            foundingDate: '2014',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'China',
              addressCountry: 'CN',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+86-159-6340-9951',
              contactType: 'sales',
              email: 'info@yoke-electric.com',
              availableLanguage: ['English', 'Chinese', 'Spanish', 'Arabic', 'French', 'Portuguese', 'Russian', 'Japanese', 'German', 'Hindi'],
            },
            sameAs: [
              'https://wa.me/8613634200569'
            ],
          }),
        }}
      />

      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: t(locale, 'nav.products'),
            itemListElement: [
              { '@type': 'ListItem', position: 1, item: { '@type': 'Product', name: 'SVC-3000VA', description: t(locale, 'hero.product1_desc'), brand: { '@type': 'Brand', name: 'YOKE' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '50', availability: 'https://schema.org/InStock' } } },
              { '@type': 'ListItem', position: 2, item: { '@type': 'Product', name: 'SVC-10KVA', description: t(locale, 'hero.product2_desc'), brand: { '@type': 'Brand', name: 'YOKE' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '150', availability: 'https://schema.org/InStock' } } },
              { '@type': 'ListItem', position: 3, item: { '@type': 'Product', name: 'SVC-30KVA', description: t(locale, 'hero.product3_desc'), brand: { '@type': 'Brand', name: 'YOKE' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '350', availability: 'https://schema.org/InStock' } } },
              { '@type': 'ListItem', position: 4, item: { '@type': 'Product', name: 'SVC-50KVA', description: t(locale, 'hero.product4_desc'), brand: { '@type': 'Brand', name: 'YOKE' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '500', availability: 'https://schema.org/InStock' } } },
              { '@type': 'ListItem', position: 5, item: { '@type': 'Product', name: 'SVC-60KVA', description: t(locale, 'hero.product5_desc'), brand: { '@type': 'Brand', name: 'YOKE' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '600', availability: 'https://schema.org/InStock' } } },
              { '@type': 'ListItem', position: 6, item: { '@type': 'Product', name: 'TND-SVC-3000VA', description: t(locale, 'hero.product6_desc'), brand: { '@type': 'Brand', name: 'YOKE' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '65', availability: 'https://schema.org/InStock' } } },
            ],
          }),
        }}
      />

      {/* FAQPage Structured Data for Google Rich Results */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: (msgs.faqItems || []).map((item: { q: string; a: string }) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: t(locale, 'nav.home'), item: 'https://kk-electric.com' },
              { '@type': 'ListItem', position: 2, name: t(locale, 'nav.products'), item: 'https://kk-electric.com/products' },
            ],
          }),
        }}
      />

      <HeroSection locale={locale} />

      <div className="container mx-auto px-4">
        {/* Social Share Buttons */}
        <div className="max-w-3xl mx-auto py-4">
          <ShareButtons 
            url={`https://kk-electric.com/${locale}`}
            title={t(locale, 'heroContent.title')}
            description={t(locale, 'heroContent.description')}
          />
        </div>
      </div>

      <AboutSection locale={locale} />
      <WhyChooseUs locale={locale} />
      <ProductGrid locale={locale} />

      <ArticlesSection locale={locale} />

      {/* Application Scenarios - content depth for SEO */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{t(locale, 'homepage.applications.title')}</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10 text-sm md:text-base">{t(locale, 'homepage.applications.subtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-primary-900 mb-2">🏠 {t(locale, 'homepage.applications.residential.title')}</h3>
              <p className="text-gray-600 text-sm">{t(locale, 'homepage.applications.residential.desc')}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-primary-900 mb-2">🏢 {t(locale, 'homepage.applications.commercial.title')}</h3>
              <p className="text-gray-600 text-sm">{t(locale, 'homepage.applications.commercial.desc')}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-primary-900 mb-2">🏭 {t(locale, 'homepage.applications.industrial.title')}</h3>
              <p className="text-gray-600 text-sm">{t(locale, 'homepage.applications.industrial.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Overview - SEO content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">{t(locale, 'homepage.understanding.title')}</h2>
          <p className="text-gray-600 text-center mb-12 text-sm md:text-base">{t(locale, 'homepage.understanding.subtitle')}</p>

          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-primary-900 mb-4">{t(locale, 'homepage.understanding.svcTitle')}</h3>
            <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
              {t(locale, 'homepage.understanding.svcDesc')}
            </p>
            <div className="bg-primary-50 rounded-lg p-4 md:p-6 mb-4">
              <h4 className="font-semibold text-primary-900 mb-3">{t(locale, 'homepage.understanding.svcFeaturesTitle')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>{t(locale, 'homepage.understanding.svcVoltageRange')}</strong></div>
                <div><strong>{t(locale, 'homepage.understanding.svcOutputAccuracy')}</strong></div>
                <div><strong>{t(locale, 'homepage.understanding.svcResponseTime')}</strong></div>
                <div><strong>{t(locale, 'homepage.understanding.svcEfficiency')}</strong></div>
                <div><strong>{t(locale, 'homepage.understanding.svcFrequency')}</strong></div>
                <div><strong>{t(locale, 'homepage.understanding.svcProtection')}</strong></div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-primary-900 mb-4">{t(locale, 'homepage.understanding.tndTitle')}</h3>
            <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
              {t(locale, 'homepage.understanding.tndDesc')}
            </p>
            <div className="bg-primary-50 rounded-lg p-4 md:p-6 mb-4">
              <h4 className="font-semibold text-primary-900 mb-3">{t(locale, 'homepage.understanding.tndFeaturesTitle')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>{t(locale, 'homepage.understanding.tndDisplay')}</strong></div>
                <div><strong>{t(locale, 'homepage.understanding.tndResponseTime')}</strong></div>
                <div><strong>{t(locale, 'homepage.understanding.tndVoltageRange')}</strong></div>
                <div><strong>{t(locale, 'homepage.understanding.tndOutputAccuracy')}</strong></div>
                <div><strong>{t(locale, 'homepage.understanding.tndDelayProtection')}</strong></div>
                <div><strong>{t(locale, 'homepage.understanding.tndNoiseLevel')}</strong></div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-primary-900 mb-4">{t(locale, 'homepage.understanding.whyTitle')}</h3>
            <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
              {t(locale, 'homepage.understanding.whyDesc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold mb-2">🔌 {t(locale, 'homepage.understanding.overVoltageTitle')}</h4>
                <p className="text-sm text-gray-600">{t(locale, 'homepage.understanding.overVoltageDesc')}</p>
              </div>
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold mb-2">⚡ {t(locale, 'homepage.understanding.underVoltageTitle')}</h4>
                <p className="text-sm text-gray-600">{t(locale, 'homepage.understanding.underVoltageDesc')}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-primary-900 mb-4">{t(locale, 'homepage.capacity.title')}</h3>
            <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
              {t(locale, 'homepage.capacity.desc')}
            </p>
            <div className="bg-primary-50 rounded-lg p-4 md:p-6 mb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-primary-100">
                    <tr>
                      <th className="p-2 text-left">{t(locale, 'homepage.capacity.model')}</th>
                      <th className="p-2 text-left">{t(locale, 'homepage.capacity.capacity')}</th>
                      <th className="p-2 text-left">{t(locale, 'homepage.capacity.recommended')}</th>
                      <th className="p-2 text-left">{t(locale, 'homepage.capacity.maxCurrent')}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      <td className="p-2 border">SVC-3000VA</td>
                      <td className="p-2 border">3KVA / 2400W</td>
                      <td className="p-2 border">{t(locale, 'homepage.capacity.rec3000')}</td>
                      <td className="p-2 border">13A</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">SVC-10KVA</td>
                      <td className="p-2 border">10KVA / 8KW</td>
                      <td className="p-2 border">{t(locale, 'homepage.capacity.rec10')}</td>
                      <td className="p-2 border">40A</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">SVC-30KVA</td>
                      <td className="p-2 border">30KVA / 24KW</td>
                      <td className="p-2 border">{t(locale, 'homepage.capacity.rec30')}</td>
                      <td className="p-2 border">120A</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">SVC-50KVA</td>
                      <td className="p-2 border">50KVA / 40KW</td>
                      <td className="p-2 border">{t(locale, 'homepage.capacity.rec50')}</td>
                      <td className="p-2 border">200A</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">SVC-60KVA</td>
                      <td className="p-2 border">60KVA / 48KW</td>
                      <td className="p-2 border">{t(locale, 'homepage.capacity.rec60')}</td>
                      <td className="p-2 border">240A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-gray-700 text-sm md:text-base">
              {t(locale, 'homepage.capacity.contactHelp')} <a href={`/${locale}/contact#inquiry`} className="text-primary-600 hover:underline">→</a>
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section - trust numbers */}
      <StatisticsSection locale={locale} />

      <FAQSection locale={locale} />
      <CertificationsSection locale={locale} />
      <InquiryForm locale={locale} />
    </>
  )
}