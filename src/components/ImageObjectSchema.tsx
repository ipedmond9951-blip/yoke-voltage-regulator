'use client'
interface ImageObjectSchemaProps { 
  url?: string
  caption?: string 
}
export default function ImageObjectSchema({ url, caption }: ImageObjectSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: url || 'https://kk-electric.com/images/logo.png',
    caption: caption || 'YOKE AVR - Professional Voltage Regulator Manufacturer',
    license: 'https://kk-electric.com/license',
    creditText: 'YOKE AVR',
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
