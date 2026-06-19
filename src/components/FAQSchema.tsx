'use client'
import { type Locale, getMessages } from '@/i18n'

export default function FAQSchema({ locale }: { locale: Locale }) {
  const msgs = getMessages(locale)
  const faqItems: Array<{ q: string; a: string }> = (msgs.faqItems as Array<{ q: string; a: string }>) || []
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
