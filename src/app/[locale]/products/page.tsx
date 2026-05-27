import { type Locale, t, locales } from '@/i18n'
import type { Metadata } from 'next'
import MaterialsSection from '@/components/MaterialsSection'
import ProductSearchSection from '@/components/ProductSearchSection'
import ProductSchema from '@/components/ProductSchema'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import ProductsContentSection from '@/components/ProductsContentSection'
import StatisticsSection from '@/components/StatisticsSection'

// Static product data (same as ProductGrid)
const allProducts = [
  { slug: 'svc-3000va', image: '/images/products/svc-3000va.jpg', pricePerPiece: 89.00, nameKey: 'svc3000va', specs: { capacity: '3KVA / 2.4KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' }, features: ['Compact design', 'Fast response', 'Reliable protection', 'LED display', 'CE certified'], applications: ['Home appliances', 'Refrigerators', 'Air conditioners', 'TVs', 'Computers'] },
  { slug: 'tnd-svc-3000va', image: '/images/products/tnd-svc-3000va.jpg', pricePerPiece: 95.00, nameKey: 'tnd3000va', specs: { capacity: '3KVA / 2.4KW', inputVoltage: '150-250V', outputVoltage: '220V±2%', frequency: '50/60Hz' }, features: ['High precision', 'Digital display', 'Servo motor', 'Low noise', 'CE certified'], applications: ['Sensitive electronics', 'Medical equipment', 'Precision instruments', 'Laboratory devices'] },
  { slug: 'svc-10kva', image: '/images/products/svc-10kva.jpg', pricePerPiece: 189.00, nameKey: 'svc10kva', specs: { capacity: '10KVA / 8KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' }, features: ['Copper transformer', 'Relay type', 'Overload protection', 'Time delay', 'CE certified'], applications: ['Air conditioners', 'Motors', 'Pumps', 'Commercial equipment', 'Small factories'] },
  { slug: 'svc-30kva', image: '/images/products/svc-30kva.jpg', pricePerPiece: 459.00, nameKey: 'svc30kva', specs: { capacity: '30KVA / 24KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' }, features: ['Servo motor control', 'Fast regulation', 'Copper windings', 'Digital meter', 'CE certified'], applications: ['CNC machines', 'Welding equipment', 'Production lines', 'Industrial motors'] },
  { slug: 'svc-50kva', image: '/images/products/svc-50kva.jpg', pricePerPiece: 689.00, nameKey: 'svc50kva', specs: { capacity: '50KVA / 40KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' }, features: ['Heavy duty', 'Triple protection', 'Copper transformer', 'Output meter', 'CE certified'], applications: ['Factories', 'Workshops', 'Large HVAC', 'Industrial equipment'] },
  { slug: 'svc-60kva', image: '/images/products/svc-60kva.jpg', pricePerPiece: 789.00, nameKey: 'svc60kva', specs: { capacity: '60KVA / 48KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' }, features: ['Industrial grade', 'Auto cut-off', 'Digital display', 'Fan cooling', 'CE certified'], applications: ['Large motors', 'Compressors', 'Heavy industry', 'Power plants'] },
]

const productText: Record<string, Record<string, string>> = {
  en: { svc3000va: 'SVC-3000VA', tnd3000va: 'TND-SVC-3000VA', svc10kva: 'SVC-10KVA', svc30kva: 'SVC-30KVA', svc50kva: 'SVC-50KVA', svc60kva: 'SVC-60KVA' },
  zh: { svc3000va: 'SVC-3000VA', tnd3000va: 'TND-SVC-3000VA高精度', svc10kva: 'SVC-10KVA', svc30kva: 'SVC-30KVA', svc50kva: 'SVC-50KVA', svc60kva: 'SVC-60KVA' },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = (localeParam as Locale) || 'en'
  const siteUrl = 'https://kk-electric.com'
  
  const titles: Record<string, string> = {
    en: 'YOKE Automatic Voltage Regulators | SVC & TND Series AVR 3KVA to 60KVA | Professional Manufacturer',
    zh: 'YOKE自动稳压器 | SVC和TND系列稳压器3KVA至60KVA | 专业生产厂家',
  }
  const descriptions: Record<string, string> = {
    en: 'YOKE automatic voltage regulators: SVC series (3KVA-60KVA) and TND high precision series. CE certified, copper transformer, fast response. Ideal for home appliances, industrial equipment, CNC machines. Worldwide shipping.',
    zh: 'YOKE自动稳压器：SVC系列（3KVA-60KVA）和TND高精度系列。CE认证，铜芯变压器，响应快速。适用于家用电器、工业设备、数控机床。全球发货。',
  }
  
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${siteUrl}/${locale}/products`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/products`,
      languages: Object.fromEntries([
        ['x-default', `${siteUrl}/${locale}/products`],
        ...locales.map(l => [l, `${siteUrl}/${l}/products`]),
      ]),
    },
  }
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam as Locale) || 'en'
  const texts = productText[locale] || productText.en

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t(locale, 'products.allProducts')}</h1>
          <p className="text-primary-200 text-base md:text-lg max-w-2xl">{t(locale, 'products.subtitle')}</p>
          {/* Search Section - Client Component */}
          <ProductSearchSection
            products={allProducts}
            locale={locale}
            texts={texts}
          />
        </div>
      </section>

      {/* Statistics Section - E-E-A-T signals */}
      <StatisticsSection locale={locale} />

      {/* Unique Content Section - Helps with SEO indexing */}
      <ProductsContentSection locale={locale} />

      {/* Product Schema for SEO */}
      <ProductSchema products={allProducts} locale={locale} />

      {/* Breadcrumb Schema for SEO */}
      <BreadcrumbSchema locale={locale} pageName="Products" pageUrl="/products" />

    </div>
  )
}
