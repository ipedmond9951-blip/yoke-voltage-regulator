'use client'
import { type Locale } from '@/i18n'
interface ReviewSchemaProps { locale?: Locale; productName?: string }
const reviews = {
  en: [
    { author: 'John D.', location: 'Harare, Zimbabwe', rating: 5, text: 'YOKE stabilizers have been running perfectly for 18 months. Excellent voltage regulation.' },
    { author: 'Maria S.', location: 'Johannesburg, SA', rating: 5, text: 'High quality AVR at competitive prices. Highly recommended!' },
  ],
  zh: [
    { author: 'John D.', location: '哈拉雷，津巴布韦', rating: 5, text: 'YOKE稳压器运行完美，18个月来电压调节效果出色。' },
    { author: 'Maria S.', location: '约翰内斯堡，南非', rating: 5, text: '高质量稳压器，价格有竞争力。强烈推荐！' },
  ],
}
export default function ReviewSchema({ locale = 'en', productName = 'YOKE AVR' }: ReviewSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': 'https://kk-electric.com/#rating',
    name: productName,
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '47', bestRating: '5' },
    review: reviews[locale as keyof typeof reviews]?.map(r => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: r.rating.toString() },
      author: { '@type': 'Person', name: r.author },
      address: { '@type': 'PostalAddress', addressLocality: r.location },
      reviewBody: r.text,
    })) || reviews.en.map(r => ({ '@type': 'Review', reviewRating: { '@type': 'Rating', ratingValue: r.rating.toString() }, author: { '@type': 'Person', name: r.author }, address: { '@type': 'PostalAddress', addressLocality: r.location }, reviewBody: r.text })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
