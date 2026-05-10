'use client'

import Image from 'next/image'
import { type Locale, t } from '@/i18n'
import Link from 'next/link'

interface Article {
  slug: string
  title: string
  description: string
  image: string
  readTime: number
  date: string
}

const articles: Article[] = [
  {
    slug: 'how-automatic-voltage-regulators-work',
    title: 'How Automatic Voltage Regulators (AVR) Work: A Complete Technical Guide',
    description: 'Learn how automatic voltage regulators stabilize power supply, protect equipment from voltage fluctuations, and ensure consistent electrical output.',
    image: '/images/articles/avr-how-it-works.jpg',
    readTime: 6,
    date: '2026-05-09'
  },
  {
    slug: 'choosing-right-avr-capacity',
    title: 'How to Choose the Right AVR Capacity: Complete Sizing Guide',
    description: 'Learn how to correctly size an AVR for your needs. Understand KVA ratings, power factor, and how to calculate the right capacity.',
    image: '/images/articles/avr-sizing-guide.jpg',
    readTime: 7,
    date: '2026-05-09'
  },
  {
    slug: 'voltage-fluctuations-causes-solutions',
    title: 'Voltage Fluctuations: Causes, Effects, and Solutions with AVR',
    description: 'Understand the causes and effects of voltage fluctuations on electrical equipment. Learn how AVRs protect your appliances.',
    image: '/images/articles/voltage-fluctuation-problems.jpg',
    readTime: 8,
    date: '2026-05-09'
  },
  {
    slug: 'svc-vs-tnd-series-comparison',
    title: 'SVC vs TND Series AVR: Which One is Right for You?',
    description: 'Compare YOKE SVC and TND series voltage regulators. Understand the differences in technology, performance, and applications.',
    image: '/images/articles/svc-vs-tnd-avr-comparison.jpg',
    readTime: 6,
    date: '2026-05-09'
  },
  {
    slug: 'industrial-applications-voltage-stabilizers',
    title: 'Industrial Applications of Voltage Stabilizers: A Complete Overview',
    description: 'Discover how voltage stabilizers protect industrial equipment in manufacturing, healthcare, IT, and more.',
    image: '/images/articles/industrial-avr-applications.jpg',
    readTime: 7,
    date: '2026-05-09'
  },
  {
    slug: 'avr-maintenance-troubleshooting-guide',
    title: 'AVR Maintenance and Troubleshooting: Complete Service Guide',
    description: 'Learn essential AVR maintenance tips and troubleshooting techniques. Keep your YOKE voltage regulator running smoothly.',
    image: '/images/articles/avr-maintenance.jpg',
    readTime: 6,
    date: '2026-05-09'
  }
]

export default function ArticlesSection({ locale = 'en' }: { locale?: Locale }) {
  const articlesPerRow = locale === 'zh' ? 3 : 6

  return (
    <section className="py-16 md:py-20 bg-white" id="articles" style={{scrollMarginTop: '80px'}}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'zh' ? '技术文章' : 'Technical Articles'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {locale === 'zh' 
              ? '了解电压调节器的技术原理、选型指南和维护技巧' 
              : 'Learn about AVR technical principles, selection guides, and maintenance tips'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.slice(0, articlesPerRow).map((article) => (
            <Link 
              key={article.slug} 
              href={`/${locale}/industry/${article.slug}`}
              className="group block bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<div className=\"absolute inset-0 flex items-center justify-center bg-primary-100 text-4xl\">⚡</div>';
                  }}
                />
              </div>
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span>{article.readTime} {locale === 'zh' ? '分钟阅读' : 'min read'}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {article.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            href={`/${locale}/industry`}
            className="inline-flex items-center gap-2 bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors"
          >
            {locale === 'zh' ? '查看更多文章' : 'View All Articles'}
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
