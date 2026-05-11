import { Metadata } from 'next'
import { locales, type Locale } from '@/i18n'
import { t } from '@/i18n'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  
  const titles: Record<string, string> = {
    en: 'About YOKE AVR - CE & CB Certified Voltage Regulator Manufacturer',
    zh: '关于YOKE AVR - CE和CB认证稳压器制造商',
  }
  const descriptions: Record<string, string> = {
    en: 'YOKE AVR: CE & CB certified China AVR manufacturer with 10+ years exporting to Africa. Factory in Shenzhen, shipping to South Africa, Zimbabwe, Kenya, Nigeria and 50+ African countries.',
    zh: 'YOKE AVR：CE和CB认证的中国稳压器制造商，10+年非洲出口经验。深圳工厂，海运至南非、津巴布韦、肯尼亚、尼日利亚和50+个非洲国家。',
  }
  return { title: titles[loc] || titles.en, description: descriptions[loc] || descriptions.en }
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
            <h2 className="text-2xl font-bold text-primary-900 mb-4">{loc === 'zh' ? '公司简介' : 'Company Profile'}</h2>
            <p className="text-gray-700 leading-relaxed">
              {loc === 'zh'
                ? 'YOKE AVR是一家专业从事自动电压调节器（AVR）研发、生产和出口的中国制造商。自2014年成立以来，我们专注于为非洲市场提供高品质的稳压器产品。公司已通过CE和CB认证以及ISO 9001:2015质量管理体系认证，产品远销50多个非洲国家。'
                : 'YOKE AVR is a professional Chinese manufacturer specializing in the R&D, production, and export of Automatic Voltage Regulators (AVR). Since our founding in 2014, we have focused on providing high-quality voltage stabilizer products to the African market. The company is CE and CB certified with ISO 9001:2015 quality management system certification, serving 50+ African countries.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-primary-900 mb-3">🏭 {loc === 'zh' ? '生产能力' : 'Production Capacity'}</h3>
              <p className="text-gray-700 text-sm">{loc === 'zh' ? '现代化工厂，年产稳压器50,000台以上' : 'Modern factory with annual output of 50,000+ AVR units'}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-primary-900 mb-3">🌍 {loc === 'zh' ? '市场覆盖' : 'Market Coverage'}</h3>
              <p className="text-gray-700 text-sm">{loc === 'zh' ? '产品出口至50多个非洲国家' : 'Products exported to 50+ African countries'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
