import { getLocaleData } from '@/lib/locale-data'

interface LocalInfoBlockProps {
  locale: string
  articleCategory?: string
}

export default function LocalInfoBlock({ locale, articleCategory }: LocalInfoBlockProps) {
  const data = getLocaleData(locale)
  if (!data) return null

  return (
    <aside className="mt-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 border border-blue-200">
      <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {locale === 'en' ? '' : getLocalTitle(locale)}
      </h3>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <div className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-1">{getLabel(locale, 'voltage')}</div>
          <div className="text-gray-900 font-medium">{data.voltageStandard}</div>
          <div className="text-sm text-gray-500">{data.frequency} · {data.plugType}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <div className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-1">{getLabel(locale, 'pricing')}</div>
          <div className="text-gray-900 font-medium">{data.currencySymbol} {data.currency}</div>
          <div className="text-sm text-gray-500">{data.priceNote.substring(0, 60)}...</div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-blue-100 mb-4">
        <div className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-2">{getLabel(locale, 'shipping')}</div>
        <div className="flex flex-wrap gap-2">
          {data.majorCities.map(city => (
            <span key={city} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{city}</span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-blue-100">
        <div className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-1">{getLabel(locale, 'contact')}</div>
        <p className="text-gray-700 text-sm">{data.contactNote}</p>
      </div>
    </aside>
  )
}

function getLocalTitle(locale: string): string {
  const titles: Record<string, string> = {
    zh: '本地化信息与购买指南',
    es: 'Informacion Local y Guia de Compra',
    ar: 'معلومات محلية ودليل الشراء',
    fr: 'Informations Locales et Guide d\'Achat',
    pt: 'Informacoes Locais e Guia de Compra',
    ru: 'Локальная информация и руководство по покупке',
    ja: '地域情報と購入ガイド',
    de: 'Lokale Informationen und Kauferleitfaden',
    hi: 'स्थानीय जानकारी और खरीद गाइड',
  }
  return titles[locale] || 'Local Information & Buying Guide'
}

function getLabel(locale: string, key: string): string {
  const labels: Record<string, Record<string, string>> = {
    voltage: {
      zh: '电压标准', es: 'Estandar de Voltaje', ar: 'معيار الجهد الكهربائي',
      fr: 'Norme de Tension', pt: 'Padrao de Voltagem', ru: 'Стандарт напряжения',
      ja: '電圧規格', de: 'Spannungsstandard', hi: 'वोल्टेज मानक',
    },
    pricing: {
      zh: '价格与货币', es: 'Precios y Moneda', ar: 'الاسعار والعملة',
      fr: 'Prix et Devise', pt: 'Precos e Moeda', ru: 'Цены и валюта',
      ja: '価格と通貨', de: 'Preise und Waehrung', hi: 'कीमत और मुद्रा',
    },
    shipping: {
      zh: '配送城市', es: 'Ciudades de Envio', ar: 'مدن الشحن',
      fr: 'Villes de Livraison', pt: 'Cidades de Envio', ru: 'Города доставки',
      ja: '配送都市', de: 'Versandstaedte', hi: 'शिपिंग शहर',
    },
    contact: {
      zh: '本地联系方式', es: 'Contacto Local', ar: 'الاتصال المحلي',
      fr: 'Contact Local', pt: 'Contato Local', ru: 'Местный контакт',
      ja: 'ローカル連絡先', de: 'Lokaler Kontakt', hi: 'स्थानीय संपर्क',
    },
  }
  return labels[key]?.[locale] || key
}
