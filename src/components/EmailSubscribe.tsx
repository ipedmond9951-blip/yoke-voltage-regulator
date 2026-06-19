'use client'
import { type Locale, t } from '@/i18n'
export default function EmailSubscribe({ locale = 'en' }: { locale?: Locale }) {
  return (
    <section className="bg-primary-50 py-8">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-xl font-bold text-primary-900 mb-2">{t(locale, 'emailSubscribe.title')}</h3>
        <p className="text-gray-600 text-sm mb-4">{t(locale, 'emailSubscribe.subtitle')}</p>
        <form className="flex max-w-md mx-auto gap-2" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder={t(locale, 'emailSubscribe.placeholder')} className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm" />
          <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700">{t(locale, 'emailSubscribe.button')}</button>
        </form>
      </div>
    </section>
  )
}
