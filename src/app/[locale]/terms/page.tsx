import { Metadata } from 'next'
import { locales, type Locale } from '@/i18n'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  const siteUrl = 'https://kk-electric.com'
  return {
    title: loc === 'zh' ? 'YOKE AVR服务条款' : loc === 'es' ? 'Términos de Servicio de YOKE AVR' : loc === 'fr' ? 'Conditions de Service YOKE AVR' : 'YOKE AVR Terms of Service',
    description: loc === 'zh' ? 'YOKE AVR服务条款和条件' : 'YOKE AVR Terms of Service and Conditions',
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
  const isZh = loc === 'zh'
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-primary-900 mb-8">{isZh ? '服务条款' : 'Terms of Service'}</h1>
        <div className="space-y-6 text-gray-700">
          <section><h2 className="text-xl font-semibold mb-2">{isZh ? '概述' : 'Introduction'}</h2><p>{isZh ? '访问和使用YOKE AVR网站即表示您同意受这些服务条款的约束。' : 'By accessing and using the YOKE AVR website, you agree to be bound by these Terms of Service.'}</p></section>
          <section><h2 className="text-xl font-semibold mb-2">{isZh ? '产品' : 'Products'}</h2><p>{isZh ? 'YOKE AVR销售工业稳压器，包括但不限于：SVC系列单相稳压器、TND系列数字稳压器和TSD系列三相稳压器。所有产品均按照适用的行业标准销售。' : 'YOKE AVR sells industrial voltage regulators including but not limited to: SVC series single-phase stabilizers, TND series digital stabilizers, and TSD series three-phase regulators. All products are sold in accordance with applicable industry standards.'}</p></section>
          <section><h2 className="text-xl font-semibold mb-2">{isZh ? '定价和付款' : 'Pricing and Payment'}</h2><p>{isZh ? '价格如有变动，恕不另行通知。付款条款以YOKE与客户书面协议为准。' : 'Prices are subject to change without notice. Payment terms are as agreed upon in writing between YOKE AVR and the customer.'}</p></section>
          <section><h2 className="text-xl font-semibold mb-2">{isZh ? '运输' : 'Shipping'}</h2><p>{isZh ? '运费根据重量、体积和目的地计算。交货时间为估计值，可能因地点和运输方式而异。' : 'Shipping costs are calculated based on weight, dimensions, and destination. Delivery times are estimates and may vary based on location and shipping method chosen.'}</p></section>
          <section><h2 className="text-xl font-semibold mb-2">{isZh ? '责任限制' : 'Limitation of Liability'}</h2><p>{isZh ? 'YOKE AVR对因使用我们的产品或服务而产生的任何间接、附带、特殊或后果性损害不承担责任。' : 'YOKE AVR shall not be liable for any indirect, incidental, special, or consequential damages arising out of the use of our products or services.'}</p></section>
          <section><h2 className="text-xl font-semibold mb-2">{isZh ? '知识产权' : 'Intellectual Property'}</h2><p>{isZh ? '本网站上的所有内容，包括文本、图形、徽标和图片，均为YOKE AVR的财产，受版权法保护。' : 'All content on this website, including text, graphics, logos, and images, is the property of YOKE AVR and is protected by copyright laws.'}</p></section>
          <section><h2 className="text-xl font-semibold mb-2">{isZh ? '联系我们' : 'Contact Us'}</h2><p>{isZh ? '如对这些服务条款有疑问，请通过 info@kk-electric.com 与我们联系。' : 'For questions about these Terms of Service, please contact us at info@kk-electric.com.'}</p></section>
        </div>
      </div>
    </div>
  )
}
