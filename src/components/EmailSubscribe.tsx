'use client'
import { type Locale, t } from '@/i18n'
export default function EmailSubscribe({ locale = 'en' }: { locale?: Locale }) {
  return (
    <section className="bg-primary-50 py-8">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-xl font-bold text-primary-900 mb-2">{locale === 'zh' ? '订阅我们的新闻通讯' : 'Subscribe to Our Newsletter'}</h3>
        <p className="text-gray-600 text-sm mb-4">{locale === 'zh' ? '获取最新稳压器产品资讯和价格更新' : 'Get the latest AVR product news and price updates'}</p>
        <form className="flex max-w-md mx-auto gap-2" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder={locale === 'zh' ? '输入您的邮箱' : 'Enter your email'} className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm" />
          <button type="submit" className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700">{locale === 'zh' ? '订阅' : 'Subscribe'}</button>
        </form>
      </div>
    </section>
  )
}
