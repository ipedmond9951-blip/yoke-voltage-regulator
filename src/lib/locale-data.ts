export interface LocaleInfo {
  voltageStandard: string
  frequency: string
  plugType: string
  currency: string
  currencySymbol: string
  majorCities: string[]
  priceNote: string
  contactNote: string
}

const localeDataMap: Record<string, LocaleInfo> = {
  zh: {
    voltageStandard: '220V',
    frequency: '50Hz',
    plugType: 'GB 2099 (Type A/C/I)',
    currency: 'CNY',
    currencySymbol: '¥',
    majorCities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'],
    priceNote: '人民币报价含税含运费，支持电汇/支付宝/微信支付',
    contactNote: '中国区域技术支持热线：+86 159 6340 9951（微信同号）',
  },
  es: {
    voltageStandard: '220V-230V',
    frequency: '50Hz',
    plugType: 'IEC 60884 (Type C/F)',
    currency: 'EUR',
    currencySymbol: '€',
    majorCities: ['Madrid', 'Barcelona', 'Mexico City', 'Buenos Aires', 'Bogota'],
    priceNote: 'Precios en EUR/USD, IVA incluido para envios a la UE. Pago por T/T o PayPal',
    contactNote: 'Soporte tecnico en espanol: +86 159 6340 9951 (WhatsApp)',
  },
  ar: {
    voltageStandard: '220V-230V',
    frequency: '50Hz',
    plugType: 'BS 1363 / IEC 60884 (Type G/C)',
    currency: 'USD',
    currencySymbol: '$',
    majorCities: ['Cairo', 'Riyadh', 'Dubai', 'Casablanca', 'Nairobi', 'Lagos', 'Johannesburg'],
    priceNote: 'اسعار بالدولار الامريكي. الشحن البحري والجوي متاح الي جميع دول الشرق الاوسط وافريقيا',
    contactNote: 'دعم فني باللغة العربية: واتساب +86 159 6340 9951',
  },
  fr: {
    voltageStandard: '220V-230V',
    frequency: '50Hz',
    plugType: 'NF C 61-314 (Type E)',
    currency: 'EUR',
    currencySymbol: '€',
    majorCities: ['Paris', 'Lyon', 'Casablanca', 'Abidjan', 'Dakar', 'Algiers', 'Tunis'],
    priceNote: 'Prix en EUR/USD, TVA incluse pour les livraisons UE. Paiement par virement T/T ou PayPal',
    contactNote: 'Support technique en francais: +86 159 6340 9951 (WhatsApp)',
  },
  pt: {
    voltageStandard: '220V-230V (127V em algumas regioes do Brasil)',
    frequency: '50Hz (60Hz no Brasil)',
    plugType: 'NP EN 60884 / NBR 14136 (Type C/N)',
    currency: 'EUR/BRL',
    currencySymbol: '€',
    majorCities: ['Lisbon', 'Porto', 'Sao Paulo', 'Rio de Janeiro', 'Luanda', 'Maputo'],
    priceNote: 'Precos em EUR/USD/BRL. Pagamento por T/T, PayPal ou L/C. Envio maritimo e aereo disponivel',
    contactNote: 'Suporte tecnico em portugues: +86 159 6340 9951 (WhatsApp)',
  },
  ru: {
    voltageStandard: '220V-230V',
    frequency: '50Hz',
    plugType: 'GOST 7396 (Type C/F)',
    currency: 'USD',
    currencySymbol: '$',
    majorCities: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Almaty', 'Tashkent'],
    priceNote: 'Цены в долларах США. Оплата банковским переводом (T/T) или аккредитивом (L/C). Доступна морская и авиадоставка',
    contactNote: 'Техническая поддержка: WhatsApp +86 159 6340 9951',
  },
  ja: {
    voltageStandard: '100V (変圧器必須: 100V→220V降圧または220V→100V昇圧)',
    frequency: '50Hz/60Hz',
    plugType: 'JIS C 8303 (Type A)',
    currency: 'JPY',
    currencySymbol: '¥',
    majorCities: ['Tokyo', 'Osaka', 'Nagoya', 'Yokohama'],
    priceNote: '価格はUSD建て。日本向け100V仕様のカスタムモデルも承ります。お支払い：T/TまたはL/C',
    contactNote: '日本語サポート：WhatsApp +86 159 6340 9951',
  },
  de: {
    voltageStandard: '230V',
    frequency: '50Hz',
    plugType: 'DIN 49441 / IEC 60884 (Type C/F)',
    currency: 'EUR',
    currencySymbol: '€',
    majorCities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Vienna', 'Zurich'],
    priceNote: 'Preise in EUR, inkl. MwSt. fuer EU-Lieferungen. Zahlung per T/T, PayPal oder L/C',
    contactNote: 'Technischer Support auf Deutsch: +86 159 6340 9951 (WhatsApp)',
  },
  hi: {
    voltageStandard: '230V',
    frequency: '50Hz',
    plugType: 'IS 1293 (Type C/D)',
    currency: 'INR',
    currencySymbol: '₹',
    majorCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'],
    priceNote: 'USD/INR में कीमतें। भुगतान T/T, PayPal या L/C द्वारा। समुद्री और वायु शिपिंग उपलब्ध',
    contactNote: 'हिंदी में तकनीकी सहायता: WhatsApp +86 159 6340 9951',
  },
}

export function getLocaleData(locale: string): LocaleInfo | null {
  return localeDataMap[locale] || null
}
