'use client'

import Image from 'next/image'
import { type Locale, t } from '@/i18n'
import { useCurrency } from '@/contexts/CurrencyContext'
import { ButtonLink } from './Button'
import { Badge } from './Badge'

interface ProductCardClientProps {
  product: {
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
  locale: Locale
  name: string
}

export default function ProductCardClient({ product, locale, name }: ProductCardClientProps) {
  const { formatPrice } = useCurrency()

  const specLabels: Record<string, Record<string, string>> = {
    en: { capacity: 'Capacity', inputVoltage: 'Input', outputVoltage: 'Output', frequency: 'Frequency' },
    zh: { capacity: '容量', inputVoltage: '输入电压', outputVoltage: '输出电压', frequency: '频率' },
    es: { capacity: 'Capacidad', inputVoltage: 'Entrada', outputVoltage: 'Salida', frequency: 'Frecuencia' },
    ar: { capacity: 'السعة', inputVoltage: 'الإدخال', outputVoltage: 'الإخراج', frequency: 'التردد' },
    fr: { capacity: 'Capacité', inputVoltage: 'Entrée', outputVoltage: 'Sortie', frequency: 'Fréquence' },
    pt: { capacity: 'Capacidade', inputVoltage: 'Entrada', outputVoltage: 'Saída', frequency: 'Frequência' },
    ru: { capacity: 'Мощность', inputVoltage: 'Вход', outputVoltage: 'Выход', frequency: 'Частота' },
    ja: { capacity: '容量', inputVoltage: '入力', outputVoltage: '出力', frequency: '周波数' },
    de: { capacity: 'Kapazität', inputVoltage: 'Eingang', outputVoltage: 'Ausgang', frequency: 'Frequenz' },
    hi: { capacity: 'क्षमता', inputVoltage: 'इनपुट', outputVoltage: 'आउटपुट', frequency: 'आवृत्ति' },
  }

  const labels = specLabels[locale] || specLabels.en

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 group flex flex-col">
      {/* Image */}
      <div className="relative h-44 md:h-52 bg-gray-100 overflow-hidden">
        <Image 
          src={product.image} 
          alt={`${name} - ${product.specs.capacity} - YOKE Electric AVR Manufacturer`} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500" 
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" 
        />
        {/* Price Badge */}
        <Badge 
          variant="premium" 
          className="absolute top-3 right-3"
        >
          ${product.pricePerPiece.toFixed(2)}/unit
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-primary-900 text-lg mb-2">{name}</h3>
        
        {/* Specs table */}
        <div className="space-y-1.5 text-sm mb-4 mt-auto">
          {Object.entries(product.specs).map(([key, val]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-500 capitalize">{labels[key] || key}:</span>
              <span className="font-medium text-right ml-2 truncate">{val}</span>
            </div>
          ))}
        </div>
        
        {/* Features tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.features.map((f) => (
            <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{f}</span>
          ))}
        </div>
        
        {/* Applications */}
        <div className="mb-4">
          <span className="text-xs text-gray-500 block mb-1.5">Applications:</span>
          <div className="flex flex-wrap gap-1.5">
            {product.applications.map((app) => (
              <span key={app} className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded font-medium">{app}</span>
            ))}
          </div>
        </div>

        {/* Inquiry Button - Using new Button component */}
        <ButtonLink 
          href={`/${locale}/contact#inquiry`}
          variant="primary"
          size="sm"
          className="w-full mt-auto"
        >
          {t(locale, 'products.inquiry')}
        </ButtonLink>
      </div>
    </div>
  )
}
