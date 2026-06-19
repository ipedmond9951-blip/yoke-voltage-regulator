import { Metadata } from 'next'
import Link from 'next/link'
import { locales, type Locale, t, getMessages } from '@/i18n'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const titles: Record<string, string> = {
  en: 'Image License | YOKE Voltage Regulators',
  zh: '图片许可 | YOKE 稳压器',
  es: 'Licencia de Imagen | YOKE Reguladores de Voltaje',
  fr: "Licence d'Image | YOKE Régulateurs de Tension",
  ar: 'ترخيص الصورة | YOKE منظمات الجهد',
  pt: 'Licença de Imagem | YOKE Reguladores de Tensão',
  ru: 'Лицензия на изображение | YOKE Регуляторы напряжения',
  ja: '画像ライセンス | YOKE 電圧調整器',
  de: 'Bildlizenz | YOKE Spannungsregler',
  hi: 'छवि लाइसेंस | YOKE वोल्टेज नियामक',
}

const descriptions: Record<string, string> = {
  en: 'Image usage license for YOKE AVR. Permission granted for editorial and informational use of YOKE product imagery with attribution.',
  zh: 'YOKE AVR 图片使用许可。允许在注明出处的情况下编辑和信息性使用 YOKE 产品图像。',
  es: 'Licencia de uso de imágenes para YOKE AVR. Permiso otorgado para uso editorial e informativo de las imágenes de productos YOKE con atribución.',
  fr: "Licence d'utilisation des images pour YOKE AVR. Autorisation accordée pour l'utilisation éditoriale et informative des images des produits YOKE avec attribution.",
  ar: 'ترخيص استخدام الصور لـ YOKE AVR. يُمنح الإذن للاستخدام التحريري والمعلوماتي لصور منتجات YOKE مع نسب الفضل.',
  pt: 'Licença de uso de imagens para YOKE AVR. Permissão concedida para uso editorial e informativo das imagens de produtos YOKE com atribuição.',
  ru: 'Лицензия на использование изображений YOKE AVR. Разрешение на редакционное и информационное использование изображений продуктов YOKE с указанием авторства.',
  ja: 'YOKE AVR 画像使用ライセンス。YOKE製品画像の編集および情報提供目的の使用に出典表示を条件として許可します。',
  de: 'Bildnutzungslizenz für YOKE AVR. Erlaubnis zur redaktionellen und informativen Nutzung von YOKE Produktbildern mit Quellenangabe.',
  hi: 'YOKE AVR के लिए छवि उपयोग लाइसेंस। YOKE उत्पाद छवियों के संपादकीय और सूचनात्मक उपयोग की अनुमति आरोपण के साथ।',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  return {
    title: titles[loc] || titles.en,
    description: descriptions[loc] || descriptions.en,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `https://kk-electric.com/${loc}/license`,
      languages: Object.fromEntries([
        ['x-default', 'https://kk-electric.com/en/license'],
        ...locales.map((l) => [l, `https://kk-electric.com/${l}/license`]),
      ]),
    },
  }
}

export default async function LicensePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  const msgs = getMessages(loc)
  const licenseData = msgs.licensePage || getMessages('en').licensePage

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">{licenseData.heading}</h1>
      <p className="text-gray-700 mb-8 leading-relaxed">{licenseData.intro}</p>
      <div className="space-y-6">
        {licenseData.sections.map((s: { title: string; body: string }, i: number) => (
          <section key={i} className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h2>
            <p className="text-gray-700 leading-relaxed text-sm">{s.body}</p>
          </section>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-8">
        <Link href={`/${loc}`} className="hover:text-primary-700">← {licenseData.backToHome}</Link>
      </p>
    </div>
  )
}
