'use client'
import { type Locale } from '@/i18n'
export default function AboutPageSchema({ locale }: { locale: Locale }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://kk-electric.com/#about',
    name: 'About YOKE AVR',
    description: locale === 'zh'
      ? 'YOKE是专业的CE和CB认证自动电压稳压器（AVR）制造商，自2014年起专注服务非洲电力市场。我们出口SVC和TND系列稳压器至50余个非洲国家。工厂直销价，海运至德班、拉各斯、蒙巴萨。'
      : 'YOKE is a CE & CB certified automatic voltage regulator (AVR) manufacturer, specializing in serving African power markets since 2014. We export SVC and TND series AVR to 50+ African countries. Factory-direct pricing with sea freight to Durban, Lagos, and Mombasa.',
    url: 'https://kk-electric.com/about',
    inLanguage: (() => { const map = { en: 'en-US', zh: 'zh-CN', es: 'es-ES', ar: 'ar-SA', fr: 'fr-FR', pt: 'pt-PT', ru: 'ru-RU', ja: 'ja-JP', de: 'de-DE', hi: 'hi-IN' }; return map[locale] || 'en-US' })(),
    isPartOf: { '@type': 'WebSite', '@id': 'https://kk-electric.com/#website' },
    publisher: { '@id': 'https://kk-electric.com/#organization' },
    datePublished: '2014-01-01',
    dateModified: '2026-01-01',
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
