'use client'

import { type Locale } from '@/i18n'

interface WebSiteSchemaProps {
  locale: Locale
}

export default function WebSiteSchema({ locale }: WebSiteSchemaProps) {
  const siteUrl = 'https://kk-electric.com'
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: locale === 'zh' ? 'YOKE稳压器' : 'YOKE AVR',
    url: siteUrl,
    description: locale === 'zh' 
      ? 'CE/CB认证稳压器制造商。10年非洲出口经验。SVC和TND系列自动电压调节器，应用于工业、商业和住宅。'
      : 'CE/CB certified AVR manufacturer. 10+ years exporting to Africa. SVC and TND series automatic voltage regulators for industrial, commercial, and residential use.',
    keywords: locale === 'zh'
      ? '稳压器,电压调节器,AVR,SVC,TND,YOKE,电力保护,非洲'
      : 'AVR,voltage regulator,SVC,TND,YOKE,power protection,automatic voltage regulator,Africa',
    inLanguage: locale === 'zh' ? 'zh' : 'en',
    isAccessibleForFree: true,
    about: {
      '@type': 'Thing',
      name: locale === 'zh' ? '稳压器' : 'Voltage Regulators',
      description: locale === 'zh'
        ? 'YOKE品牌稳压器，包括SVC系列和TND系列自动电压调节器'
        : 'YOKE brand voltage regulators including SVC and TND series automatic voltage regulators',
    },
    audience: {
      '@type': 'Audience',
      name: locale === 'zh' ? '非洲电力基础设施专业人士' : 'Power infrastructure professionals in Africa',
      geographicArea: {
        '@type': 'Place',
        name: 'Africa',
      },
    },
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/${locale}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
      description: locale === 'zh' ? '搜索稳压器和电压调节设备' : 'Search for voltage regulators and power equipment',
    },
    sameAs: [
      'https://www.linkedin.com/company/yoke-avr',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@kk-electric.com',
      availableLanguage: ['English', 'Chinese'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}