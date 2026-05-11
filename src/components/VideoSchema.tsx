'use client'

import { type Locale } from '@/i18n'

interface VideoSchemaProps {
  locale: Locale
}

const videoData = {
  en: [
    {
      name: 'YOKE AVR Factory Tour',
      description: 'Take a virtual tour of our state-of-the-art AVR manufacturing facility in China. See our production lines, quality control processes, and testing equipment.',
      duration: 'PT3M45S',
      uploadDate: '2026-04-15',
      thumbnail: 'https://kk-electric.com/images/scenarios/factory-environment.webp',
    },
    {
      name: 'YOKE AVR Product Showcase',
      description: 'Explore our complete range of voltage regulators including SVC series and TND series automatic voltage regulators. CE/CB certified manufacturer.',
      duration: 'PT2M30S',
      uploadDate: '2026-04-10',
      thumbnail: 'https://kk-electric.com/images/products/product-showcase.jpg',
    },
    {
      name: 'YOKE Customer Testimonials',
      description: 'Hear from our satisfied customers in Africa about their experience working with YOKE AVR as their voltage regulator supplier.',
      duration: 'PT1M45S',
      uploadDate: '2026-04-05',
      thumbnail: 'https://kk-electric.com/images/products/testimonial.jpg',
    },
  ],
}

export default function VideoSchema({ locale }: VideoSchemaProps) {
  const videos = videoData.en

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: videos[0].name,
    description: videos[0].description,
    duration: videos[0].duration,
    uploadDate: videos[0].uploadDate,
    thumbnailUrl: videos[0].thumbnail,
    contentUrl: 'https://kk-electric.com/videos/factory-tour.mp4',
    embedUrl: 'https://kk-electric.com/videos/factory-tour.mp4',
    publisher: {
      '@type': 'Organization',
      name: 'YOKE AVR',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kk-electric.com/images/logo.png',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}