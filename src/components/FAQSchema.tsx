'use client'
import { type Locale } from '@/i18n'
const faqs = {
  en: [
    { q: 'What is the warranty period?', a: 'All YOKE AVR units come with 2-year warranty covering manufacturing defects.' },
    { q: 'What payment methods do you accept?', a: 'We accept T/T, L/C, PayPal, and payment through alipay/wechat for Chinese clients.' },
    { q: 'What is the delivery time to Africa?', a: 'Standard sea freight is 20-30 days to major African ports. Air freight available for urgent orders.' },
    { q: 'Do you provide technical support?', a: 'Yes, we provide remote technical support, user manuals, and can arrange on-site service through our African partners.' },
  ],
  zh: [
    { q: '质保期是多久？', a: '所有YOKE稳压器均提供2年质保，覆盖制造缺陷。' },
    { q: '你们接受哪些付款方式？', a: '我们接受T/T、L/C、PayPal，中国客户可用支付宝/微信支付。' },
    { q: '到非洲的交货时间是多久？', a: '标准海运到非洲主要港口需要20-30天。紧急订单可提供空运。' },
    { q: '你们提供技术支持吗？', a: '是的，我们提供远程技术支持、用户手册，可通过非洲合作伙伴安排现场服务。' },
  ],
}
export default function FAQSchema({ locale }: { locale: Locale }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (faqs[locale as keyof typeof faqs] || faqs.en).map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
