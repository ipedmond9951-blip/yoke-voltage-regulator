'use client'
import { type Locale } from '@/i18n'
export default function VideoSection({ locale = 'en' }: { locale?: Locale }) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">{locale === 'zh' ? '产品视频' : 'Product Videos'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-200 rounded-xl aspect-video flex items-center justify-center text-gray-500">
            <span>{locale === 'zh' ? 'YOKE AVR 工厂介绍' : 'YOKE AVR Factory Introduction'}</span>
          </div>
          <div className="bg-gray-200 rounded-xl aspect-video flex items-center justify-center text-gray-500">
            <span>{locale === 'zh' ? 'SVC/TND系列演示' : 'SVC/TND Series Demo'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
