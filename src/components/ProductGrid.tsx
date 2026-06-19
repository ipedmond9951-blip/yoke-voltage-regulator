'use client'

import Image from 'next/image'
import { type Locale, t } from '@/i18n'
import { useCurrency } from '@/contexts/CurrencyContext'
import { productText } from '@/lib/products'

interface ProductGridProps { locale?: Locale }

const products = [
  { slug: 'svc-3000va', image: '/images/products/svc-3000va.jpg', pricePerPiece: 89.00, nameKey: 'svc3000va' as const,
    specs: { capacity: '3KVA / 2.4KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' } },
  { slug: 'tnd-svc-3000va', image: '/images/products/tnd-svc-3000va.jpg', pricePerPiece: 95.00, nameKey: 'tnd3000va' as const,
    specs: { capacity: '3KVA / 2.4KW', inputVoltage: '150-250V', outputVoltage: '220V±2%', frequency: '50/60Hz' } },
  { slug: 'svc-10kva', image: '/images/products/svc-10kva.jpg', pricePerPiece: 189.00, nameKey: 'svc10kva' as const,
    specs: { capacity: '10KVA / 8KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' } },
  { slug: 'svc-30kva', image: '/images/products/svc-30kva.jpg', pricePerPiece: 459.00, nameKey: 'svc30kva' as const,
    specs: { capacity: '30KVA / 24KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' } },
  { slug: 'svc-50kva', image: '/images/products/svc-50kva.jpg', pricePerPiece: 689.00, nameKey: 'svc50kva' as const,
    specs: { capacity: '50KVA / 40KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' } },
  { slug: 'svc-60kva', image: '/images/products/svc-60kva.jpg', pricePerPiece: 789.00, nameKey: 'svc60kva' as const,
    specs: { capacity: '60KVA / 48KW', inputVoltage: '140-260V', outputVoltage: '220V±3%', frequency: '50/60Hz' } },
]

export default function ProductGrid({ locale = 'en' }: ProductGridProps) {
  const { formatPrice } = useCurrency()

  return (
    <section className="py-16 md:py-20 bg-gray-50" id="products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t(locale, 'products.title') || 'Automatic Voltage Regulators'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t(locale, 'products.subtitle') || 'Professional AVR solutions for home and industrial use'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => {
            const text = productText[locale]?.[product.nameKey] || productText['en'][product.nameKey]
            return (
              <div key={product.slug} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 md:h-56 bg-gray-100">
                  <Image
                    src={product.image}
                    alt={text?.name || product.nameKey}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 md:p-6 flex flex-col h-full">
                  <a href={`/${locale}/products/${product.slug}`} className="block">
                    <h3 className="font-bold text-primary-900 text-sm md:text-base lg:text-lg mb-1">{text?.name}</h3>
                  </a>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2">{text?.desc}</p>
                  
                  <div className="space-y-1.5 text-xs md:text-sm mt-auto">
                    <div className="flex justify-between"><span className="text-gray-500">{t(locale, 'products.capacity')}:</span><span className="font-medium text-right truncate ml-2">{product.specs.capacity}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">{t(locale, 'products.inputVoltage')}:</span><span className="font-medium text-right truncate ml-2">{product.specs.inputVoltage}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">{t(locale, 'products.outputVoltage')}:</span><span className="font-medium text-right truncate ml-2">{product.specs.outputVoltage}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">{t(locale, 'products.lead') || 'Lead Time'}:</span><span className="font-medium">7-15 {t(locale, 'products.daysUnit')}</span></div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <span className="text-primary-900 font-bold text-sm md:text-base whitespace-nowrap">{formatPrice(product.pricePerPiece)}</span>
                    <a href={`/${locale}/contact#inquiry`} className="bg-primary-700 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold hover:bg-primary-800 transition-colors whitespace-nowrap">
                      {t(locale, 'products.inquiry') || 'Inquire'}
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
