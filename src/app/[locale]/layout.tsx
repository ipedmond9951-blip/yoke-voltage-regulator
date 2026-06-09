import type { Metadata, Viewport } from 'next'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GeoProvider } from '@/contexts/GeoContext'
import { CurrencyProvider } from '@/contexts/CurrencyContext'
import { locales, type Locale } from '@/i18n'
import AIChatWidget from '@/components/AIChatWidget'
import Analytics from '@/components/Analytics'
import WhatsAppCTA from '@/components/WhatsAppCTA'
import FAQSchema from '@/components/FAQSchema'
import VideoSchema from '@/components/VideoSchema'
import OrganizationSchema from '@/components/OrganizationSchema'
import NavigationSchema from '@/components/NavigationSchema'
import LocalBusinessSchema from '@/components/LocalBusinessSchema'
import ReviewSchema from '@/components/ReviewSchema'
import WebSiteSchema from '@/components/WebSiteSchema'
import ImageObjectSchema from '@/components/ImageObjectSchema'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A3D62',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  const siteUrl = 'https://kk-electric.com'
  
  const titles: Record<string, string> = {
    zh: 'YOKE稳压器 - 中国电压调节器厂家 | ISO 9001认证',
    en: 'YOKE Voltage Regulator - Automatic Voltage Stabilizer Manufacturer | ISO 9001',
  }
  const descriptions: Record<string, string> = {
    zh: 'YOKE Electric - 专业电压调节器（稳压器）制造商。SVC系列稳压器家用的工业用。全球发货。工厂价格，品质保证。',
    en: 'YOKE Electric - Professional automatic voltage regulator (AVR) manufacturer. SVC series stabilizers for home and industrial use. Global shipping. Factory prices, quality guaranteed.',
  }
  
  return {
    title: {
      default: titles[loc] || titles.en,
      template: '%s | YOKE',
    },
    description: descriptions[loc] || descriptions.en,
    // Meta keywords removed per modern SEO best practice
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: 'website',
      // Full 10-language locale mapping (was: fallback bug — only zh got zh_CN, other 8 fell back to en_US).
      // Matches the 9-language locale code list used by inLanguage across all Schema components.
      locale: ({ en: 'en_US', zh: 'zh_CN', es: 'es_ES', ar: 'ar_SA', fr: 'fr_FR', pt: 'pt_PT', ru: 'ru_RU', ja: 'ja_JP', de: 'de_DE', hi: 'hi_IN' } as Record<string, string>)[loc] || 'en_US',
      url: `${siteUrl}/${loc}`,
      siteName: 'YOKE Voltage Regulator',
      title: titles[loc] || titles.en,
      description: descriptions[loc] || descriptions.en,
      images: [{ url: `${siteUrl}/images/og-image.webp`, width: 1200, height: 630, alt: 'YOKE Voltage Regulator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[loc] || titles.en,
      description: descriptions[loc] || descriptions.en,
      images: [`${siteUrl}/images/og-image.webp`],
    },
    alternates: {
      canonical: `${siteUrl}/${loc}`,
      languages: Object.fromEntries([
        ['x-default', `${siteUrl}/en`],
        ...locales.map(l => [l, `${siteUrl}/${l}`])
      ]),
    },
    verification: {
      google: 'UTGkDx8G0Uk-u5s04dxGcT9Cb4jREmgBXJS5r3biwMw',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'

  return (
    <html lang={loc}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="YOKE" />
        <meta name="theme-color" content="#0A3D62" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "YOKE Electric",
          "url": "https://kk-electric.com",
          "logo": "https://kk-electric.com/images/logo.png",
          "description": "YOKE Electric - Professional automatic voltage regulator (AVR) manufacturer. SVC series stabilizers for home and industrial use. Global shipping. Factory prices, quality guaranteed.",
          "foundingDate": "2004",
          "address": { "@type": "PostalAddress", "addressCountry": "CN", "addressLocality": "Hebei" },
          "areaServed": "Worldwide",
          "contactPoint": { "@type": "ContactPoint", "telephone": "+86-159-6340-9951", "whatsApp": "+86-159-6340-9951", "contactType": "sales", "availableLanguage": ["English", "Chinese"] }
        }) }} />
        <FAQSchema locale={loc} />
        <VideoSchema locale={loc} />
        <OrganizationSchema locale={loc} />
        <LocalBusinessSchema locale={loc} />
        <ReviewSchema locale={loc} />
        <NavigationSchema locale={loc} />
        <WebSiteSchema locale={loc} />
        <ImageObjectSchema />
      </head>
      <body className="antialiased">
        <GeoProvider>
          <CurrencyProvider>
            <Header locale={loc} />
            <main>{children}</main>
            <Footer locale={loc} />
            <AIChatWidget locale={loc} />
            <WhatsAppCTA locale={loc} />
            <Analytics />
          </CurrencyProvider>
        </GeoProvider>
      </body>
    </html>
  )
}
