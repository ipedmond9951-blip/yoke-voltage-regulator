import type { Metadata, Viewport } from 'next'
import '../globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GeoProvider } from '@/contexts/GeoContext'
import { CurrencyProvider } from '@/contexts/CurrencyContext'
import { locales, type Locale, t } from '@/i18n'
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
  
  return {
    title: {
      default: t(loc, 'layoutMeta.title'),
      template: '%s | YOKE',
    },
    description: t(loc, 'layoutMeta.description'),
    // Meta keywords removed per modern SEO best practice
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: 'website',
      // Full 10-language locale mapping (was: fallback bug — only zh got zh_CN, other 8 fell back to en_US).
      // Matches the 9-language locale code list used by inLanguage across all Schema components.
      locale: ({ en: 'en_US', zh: 'zh_CN', es: 'es_ES', ar: 'ar_SA', fr: 'fr_FR', pt: 'pt_PT', ru: 'ru_RU', ja: 'ja_JP', de: 'de_DE', hi: 'hi_IN' } as Record<string, string>)[loc] || 'en_US',
      url: `${siteUrl}/${loc}`,
      siteName: 'YOKE Voltage Regulator',
      title: t(loc, 'layoutMeta.title'),
      description: t(loc, 'layoutMeta.description'),
      images: [{ url: `${siteUrl}/images/og-image.webp`, width: 1200, height: 630, alt: 'YOKE Voltage Regulator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t(loc, 'layoutMeta.title'),
      description: t(loc, 'layoutMeta.description'),
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
