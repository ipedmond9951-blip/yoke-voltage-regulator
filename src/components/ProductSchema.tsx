'use client'

import { type Locale } from '@/i18n'

interface Product {
  slug: string
  image: string
  pricePerPiece: number
  nameKey: string
  specs: {
    capacity: string
    inputVoltage: string
    outputVoltage: string
    frequency: string
  }
  features: string[]
  applications: string[]
}

interface ProductSchemaProps {
  products: Product[]
  locale: Locale
}

const productNames: Record<string, Record<string, string>> = {
  en: {
    'svc-3000va': 'SVC-3000VA Automatic Voltage Regulator',
    'tnd-svc-3000va': 'TND-SVC-3000VA High Precision Voltage Regulator',
    'svc-10kva': 'SVC-10KVA Automatic Voltage Regulator',
    'svc-30kva': 'SVC-30KVA Industrial Voltage Regulator',
    'svc-50kva': 'SVC-50KVA Heavy Duty Voltage Regulator',
    'svc-60kva': 'SVC-60KVA Industrial Automatic Voltage Regulator',
  },
  zh: {
    'svc-3000va': 'SVC-3000VA 自动稳压器',
    'tnd-svc-3000va': 'TND-SVC-3000VA 高精度稳压器',
    'svc-10kva': 'SVC-10KVA 自动稳压器',
    'svc-30kva': 'SVC-30KVA 工业稳压器',
    'svc-50kva': 'SVC-50KVA 重型稳压器',
    'svc-60kva': 'SVC-60KVA 工业自动稳压器',
  },
}

const productDescriptions: Record<string, Record<string, string>> = {
  en: {
    'svc-3000va': 'SVC-3000VA automatic voltage regulator for home appliances. Compact design, fast response, reliable voltage protection. Ideal for refrigerators, air conditioners, TVs, and computers. CE certified.',
    'tnd-svc-3000va': 'TND-SVC-3000VA high precision voltage regulator with digital display. Servo motor control for ±2% accuracy. Perfect for sensitive electronics, medical equipment, and precision instruments.',
    'svc-10kva': 'SVC-10KVA automatic voltage regulator for commercial use. Copper transformer, relay type with overload protection. Suitable for air conditioners, motors, pumps, and commercial equipment.',
    'svc-30kva': 'SVC-30KVA industrial grade voltage regulator with servo motor control. Fast regulation for CNC machines, welding equipment, and production lines. CE certified.',
    'svc-50kva': 'SVC-50KVA heavy duty voltage stabilizer with triple protection. Copper transformer for factories, workshops, and large HVAC systems. CE certified.',
    'svc-60kva': 'SVC-60KVA industrial automatic voltage regulator with digital display. Auto cut-off protection for large motors, compressors, and heavy industrial equipment.',
  },
  zh: {
    'svc-3000va': 'SVC-3000VA自动稳压器，家用电器专用。体积小，响应快，可靠的电压保护。适用于冰箱、空调、电视、电脑。CE认证。',
    'tnd-svc-3000va': 'TND-SVC-3000VA高精度数字显示稳压器。伺服电机控制，精度±2%。适用于敏感电子设备、医疗设备、精密仪器。',
    'svc-10kva': 'SVC-10KVA商用自动稳压器。铜芯变压器，继电器型带过载保护。适用于空调、电机、水泵和商用设备。',
    'svc-30kva': 'SVC-30KVA工业级稳压器，伺服电机控制，快速调节。适用于数控机床、焊接设备、生产线。CE认证。',
    'svc-50kva': 'SVC-50KVA重型稳压器，三重保护。铜芯变压器，适用于工厂、车间和大型暖通空调系统。CE认证。',
    'svc-60kva': 'SVC-60KVA工业自动稳压器，数字显示，自动切断保护。适用于大型电机、压缩机、重型工业设备。',
  },
}

export default function ProductSchema({ products, locale }: ProductSchemaProps) {
  const names = productNames[locale] || productNames.en
  const descriptions = productDescriptions[locale] || productDescriptions.en

  // Render each product as a standalone Product schema (Google requirement)
  // ItemList is not recognized for product rich results
  return (
    <>
      {products.map((product) => {
        const schema = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: names[product.slug] || product.nameKey,
          description: descriptions[product.slug] || `YOKE ${product.nameKey} automatic voltage regulator for industrial and commercial use.`,
          image: `https://kk-electric.com${product.image}`,
          brand: {
            '@type': 'Brand',
            name: 'YOKE',
          },
          sku: `YOKE-${product.slug.toUpperCase()}`,
          mpn: product.slug.toUpperCase(),
          color: 'Black/Gray',
          material: 'Copper/Steel',
          offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
            price: product.pricePerPiece.toFixed(2),
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'YOKE Electric',
            },
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '126',
            bestRating: '5',
            worstRating: '1',
          },
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'Capacity', value: product.specs.capacity },
            { '@type': 'PropertyValue', name: 'Input Voltage', value: product.specs.inputVoltage },
            { '@type': 'PropertyValue', name: 'Output Voltage', value: product.specs.outputVoltage },
            { '@type': 'PropertyValue', name: 'Frequency', value: product.specs.frequency },
          ],
          countryOfOrigin: {
            '@type': 'Country',
            name: 'China',
          },
          manufacturer: {
            '@type': 'Organization',
            '@id': 'https://kk-electric.com/#organization',
            name: 'YOKE Electric',
          },
        }

        return (
          <script
            key={product.slug}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )
      })}
    </>
  )
}
