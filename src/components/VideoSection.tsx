'use client'
import { type Locale, t } from '@/i18n'
export default function VideoSection({ locale = 'en' }: { locale?: Locale }) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">{t(locale, 'video.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-200 rounded-xl aspect-video flex items-center justify-center text-gray-500">
            <span>{t(locale, 'video.factoryIntro')}</span>
          </div>
          <div className="bg-gray-200 rounded-xl aspect-video flex items-center justify-center text-gray-500">
            <span>{t(locale, 'video.seriesDemo')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
