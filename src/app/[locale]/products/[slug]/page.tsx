import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import InquiryForm from '@/components/InquiryForm'
import LocalInfoBlock from '@/components/LocalInfoBlock'
import { allProducts, getProductBySlug, getAllProductSlugs, getProductText } from '@/lib/products'
import { locales, type Locale, t } from '@/i18n'

const SITE_URL = 'https://kk-electric.com'

// 10-language locale code map for og:locale (matches layout.tsx + article page).
// Single source of truth — change here and sync both call sites.
const ogLocaleMap: Record<string, string> = {
  en: 'en_US', zh: 'zh_CN', es: 'es_ES', ar: 'ar_SA', fr: 'fr_FR',
  pt: 'pt_PT', ru: 'ru_RU', ja: 'ja_JP', de: 'de_DE', hi: 'hi_IN',
}

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllProductSlugs().map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam as Locale) || 'en'
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found' }

  const text = getProductText(locale, product.nameKey)
  const ogLocale = ogLocaleMap[locale] || 'en_US'

  return {
    title: `${text.name} | YOKE Voltage Regulators`,
    description: text.desc,
    keywords: ['voltage regulator', 'AVR', 'stabilizer', product.nameKey, product.slug, product.specs.capacity, 'YOKE'].join(', '),
    alternates: {
      canonical: `${SITE_URL}/${locale}/products/${slug}`,
      languages: Object.fromEntries([
        ['x-default', `${SITE_URL}/en/products/${slug}`],
        ...locales.map((l) => [l, `${SITE_URL}/${l}/products/${slug}`] as const),
      ]),
    },
    openGraph: {
      type: 'website',
      title: text.name,
      description: text.desc,
      url: `${SITE_URL}/${locale}/products/${slug}`,
      locale: ogLocale,
      siteName: 'YOKE Voltage Regulator',
      images: [{ url: `${SITE_URL}${product.image}`, width: 1200, height: 630, alt: text.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: text.name,
      description: text.desc,
      images: [`${SITE_URL}${product.image}`],
    },
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params
  const locale = (localeParam as Locale) || 'en'
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const text = getProductText(locale, product.nameKey)
  const ogLocale = ogLocaleMap[locale] || 'en_US'

  // Schema.org Product JSON-LD (single-product version — Google prefers this over ItemList for product pages)
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: text.name,
    description: text.desc,
    image: `${SITE_URL}${product.image}`,
    sku: product.slug.toUpperCase(),
    mpn: product.slug.toUpperCase(),
    brand: { '@type': 'Brand', name: 'YOKE Electric' },
    manufacturer: { '@type': 'Organization', name: 'YOKE Electric', url: SITE_URL },
    inLanguage: ogLocale.replace('_', '-'),
    offers: {
      '@type': 'Offer',
      price: product.pricePerPiece.toFixed(2),
      priceCurrency: 'USD',
      url: `${SITE_URL}/${locale}/products/${slug}`,
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2027-12-31',
      seller: { '@type': 'Organization', name: 'YOKE Electric' },
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: t(locale, 'productDetail.capacity'), value: product.specs.capacity },
      { '@type': 'PropertyValue', name: t(locale, 'productDetail.inputVoltage'), value: product.specs.inputVoltage },
      { '@type': 'PropertyValue', name: t(locale, 'productDetail.outputVoltage'), value: product.specs.outputVoltage },
      { '@type': 'PropertyValue', name: t(locale, 'productDetail.frequency'), value: product.specs.frequency },
    ],
  }

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 py-3 text-sm text-gray-600">
          <Link href={`/${locale}`} className="hover:text-primary-700">{t(locale, 'nav.home') || 'Home'}</Link>
          <span className="mx-2">/</span>
          <Link href={`/${locale}/products`} className="hover:text-primary-700">{t(locale, 'nav.products') || 'Products'}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{text.name}</span>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="relative h-96 md:h-[500px] bg-gray-50">
                <Image
                  src={product.image}
                  alt={text.name}
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">{text.name}</h1>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{text.desc}</p>

              <div className="text-2xl font-bold text-primary-700 mb-6">
                ${product.pricePerPiece.toFixed(2)}<span className="text-sm text-gray-500 font-normal">{t(locale, 'productDetail.perUnit')}</span>
              </div>

              {/* Specs Table */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
                <div className="bg-primary-50 px-4 py-2 font-semibold text-primary-900">{t(locale, 'productDetail.specifications')}</div>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-2 text-gray-600">{t(locale, 'productDetail.capacity')}</td>
                      <td className="px-4 py-2 font-medium text-right">{product.specs.capacity}</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-2 text-gray-600">{t(locale, 'productDetail.inputVoltage')}</td>
                      <td className="px-4 py-2 font-medium text-right">{product.specs.inputVoltage}</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-2 text-gray-600">{t(locale, 'productDetail.outputVoltage')}</td>
                      <td className="px-4 py-2 font-medium text-right">{product.specs.outputVoltage}</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-2 text-gray-600">{t(locale, 'productDetail.frequency')}</td>
                      <td className="px-4 py-2 font-medium text-right">{product.specs.frequency}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">{t(locale, 'productDetail.keyFeatures')}</h2>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {text.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-primary-600 font-bold mt-0.5">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Applications */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">{t(locale, 'productDetail.applications')}</h2>
                <div className="flex flex-wrap gap-2">
                  {text.applications.map((a) => (
                    <span key={a} className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded font-medium">{a}</span>
                  ))}
                </div>
              </div>

              {/* Inquire CTA */}
              <a
                href={`/${locale}/contact#inquiry`}
                className="inline-flex items-center bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors"
              >
                {t(locale, 'products.inquiry') || 'Inquire Now'}
              </a>
            </div>
          </div>

          {/* Local Info Block - unique locale-specific content for GSC canonical validation */}
          {locale !== 'en' && <LocalInfoBlock locale={locale} articleCategory={product.specs.capacity} />}

          {/* Other Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t(locale, 'productDetail.otherProducts')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {allProducts
                .filter((p) => p.slug !== slug)
                .slice(0, 5)
                .map((p) => {
                  const pText = getProductText(locale, p.nameKey)
                  return (
                    <Link
                      key={p.slug}
                      href={`/${locale}/products/${p.slug}`}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all p-3 group"
                    >
                      <div className="relative h-32 mb-2 bg-gray-50 rounded overflow-hidden">
                        <Image
                          src={p.image}
                          alt={pText.name}
                          fill
                          sizes="(max-width:640px) 50vw, 20vw"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="text-sm font-semibold text-primary-900 line-clamp-2">{pText.name}</h3>
                    </Link>
                  )
                })}
            </div>
          </div>
        </div>
      </div>

      {/* @ts-expect-error Async Server Component */}
      <InquiryForm locale={locale} preselectProduct={product.slug} />
    </>
  )
}
