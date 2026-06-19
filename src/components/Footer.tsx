import Link from 'next/link'
import { type Locale, t } from '@/i18n'

interface FooterProps { locale?: Locale }

// Static year - avoid new Date() during render to prevent hydration mismatch
const CURRENT_YEAR = 2026

export default function Footer({ locale = 'en' }: FooterProps) {
  return (
    <footer className="bg-primary-900 text-white py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Company */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-lg md:text-xl font-bold mb-3">YOKE Electric</h3>
            <p className="text-gray-400 text-xs md:text-sm mb-0">{t(locale, 'footer.companyDesc')}</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">{t(locale, 'footer.quickLinks')}</h4>
            <div className="space-y-1.5 text-xs md:text-sm">
              <Link href={`/${locale}`} className="block text-gray-400 hover:text-white">{t(locale, 'nav.home')}</Link>
              <Link href={`/${locale}/products`} className="block text-gray-400 hover:text-white">{t(locale, 'nav.products')}</Link>
              <Link href={`/${locale}/about`} className="block text-gray-400 hover:text-white">{t(locale, 'nav.about')}</Link>
              <Link href={`/${locale}/faq`} className="block text-gray-400 hover:text-white">{t(locale, 'nav.faq')}</Link>
              <Link href={`/${locale}/contact`} className="block text-gray-400 hover:text-white">{t(locale, 'nav.contact')}</Link>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">{t(locale, 'nav.products')}</h4>
            <div className="space-y-1.5 text-xs md:text-sm">
              <Link href={`/${locale}/products`} className="block text-gray-400 hover:text-white">SVC-3000VA</Link>
              <Link href={`/${locale}/products`} className="block text-gray-400 hover:text-white">SVC-10KVA</Link>
              <Link href={`/${locale}/products`} className="block text-gray-400 hover:text-white">SVC-30KVA</Link>
              <Link href={`/${locale}/products`} className="block text-gray-400 hover:text-white">SVC-50KVA</Link>
              <Link href={`/${locale}/products`} className="block text-gray-400 hover:text-white">SVC-60KVA</Link>
              <Link href={`/${locale}/products`} className="block text-gray-400 hover:text-white">TND-SVC-3000VA</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">{t(locale, 'footer.contactUs')}</h4>
            <div className="space-y-1.5 text-xs md:text-sm text-gray-400">
              <p>📍 {t(locale, 'footer.address')}</p>
              <p>📧 {t(locale, 'footer.email')}</p>
              <p>📱 WhatsApp: +86 159 6340 9951</p>
              <div className="mt-2 pt-2 border-t border-gray-700">
                <p className="text-gray-500 text-xs">⚡ Voltage Regulators</p>
                <p className="text-gray-500 text-xs">CE/CB Certified</p>
                <p className="text-gray-500 text-xs">Global Shipping</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center text-gray-500 text-xs md:text-sm">
          <div className="mb-2">
            <Link href={`/${locale}/privacy-policy`} className="hover:text-white mx-2">Privacy Policy</Link>
            <Link href={`/${locale}/terms`} className="hover:text-white mx-2">Terms of Service</Link>
          </div>
          © {CURRENT_YEAR} YOKE Electric. {t(locale, 'footer.rights')}
        </div>
      </div>
    </footer>
  )
}