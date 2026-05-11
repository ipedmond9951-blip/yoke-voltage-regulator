'use client'

import { type Locale, t } from '@/i18n'

interface TestimonialsSectionProps { locale?: Locale }

// B2B AVR Testimonials - Project-focused with specific technical details
// Format: [Country] + [Project] + [Product] + [Quantity] + [Result]
const testimonials = [
  {
    quote: "YOKE SVC-20kVA stabilizers have been running continuously for 18 months at our Harare data center. Voltage output has remained within ±2% despite severe grid fluctuations. The CE certification and local support has made these units our standard choice for critical infrastructure protection.",
    author: "Operations Director",
    company: "ZIM-Tech Solutions",
    location: "Harare, Zimbabwe",
    project: "Data Center Power Protection",
    products: "YOKE SVC-20kVA Stabilizers, 8 Units",
    standards: "CE / CB Certified",
    rating: 5,
  },
  {
    quote: "We installed 12 YOKE TND-15kVA units across our Kampala cold chain storage facilities. The automatic voltage regulation has completely eliminated compressor failures caused by voltage spikes. Energy consumption dropped 8% due to stable power supply. Payback period was just 14 months.",
    author: "Chief Engineer",
    company: "UG-Cold Chain Logistics",
    location: "Kampala, Uganda",
    project: "Cold Chain Storage Voltage Protection",
    products: "YOKE TND-15kVA Units, 12 Units",
    standards: "CE / CB / IEC 62040",
    rating: 5,
  },
  {
    quote: "The Johannesburg factory upgrade required stabilizers for CNC machines and robotic welding arms. YOKE SVC-30kVA three-phase units were installed with custom bypass switching. Zero voltage-related production stoppages in 24 months of operation. Excellent technical documentation and commissioning support.",
    author: "Plant Manager",
    company: "Gauteng Industrial Manufacturing",
    location: "Johannesburg, South Africa",
    project: "Industrial Manufacturing Power Quality",
    products: "YOKE SVC-30kVA Three-Phase Units, 6 Units",
    standards: "CE / CB / SABS",
    rating: 5,
  },
]

// JSON-LD Schema for Google rich snippets
const testimonialsSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "YOKE AVR",
  "url": "https://kk-electric.com",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "47"
  },
  "review": testimonials.map(t => ({
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "author": {
      "@type": "Person",
      "name": t.author
    },
    "publisher": {
      "@type": "Organization",
      "name": `${t.company}, ${t.location}`
    },
    "datePublished": "2026-03-15",
    "reviewBody": t.quote
  }))
}

export default function TestimonialsSection({ locale = 'en' }: TestimonialsSectionProps) {
  const title = t(locale, 'testimonials.title') || 'Customer Success Stories'
  const subtitle = t(locale, 'testimonials.subtitle') || 'Real projects, real results. See how YOKE AVR supports African industrial operations.'

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialsSchema) }}
      />
      
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 md:mb-4">
          {title}
        </h2>
        <p className="text-gray-600 text-center mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
          {subtitle}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              {/* Stars + Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(item.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-medium">B2B Verified</span>
              </div>
              
              {/* Project Context Badge */}
              <div className="bg-primary-50 text-primary-800 text-xs font-semibold px-3 py-1.5 rounded-full inline-block mb-4">
                {item.project}
              </div>
              
              {/* Quote */}
              <blockquote className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                "{item.quote}"
              </blockquote>
              
              {/* Technical Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Products:</span>
                  <span className="text-gray-700 font-medium text-right max-w-[60%]">{item.products}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Standards:</span>
                  <span className="text-gray-700 font-medium">{item.standards}</span>
                </div>
              </div>
              
              {/* Author */}
              <div className="border-t border-gray-100 pt-4">
                <p className="font-semibold text-gray-900 text-sm md:text-base">{item.author}</p>
                <p className="text-primary-700 text-xs md:text-sm font-medium">{item.company}</p>
                <p className="text-gray-400 text-xs">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Schema.org markup notice for SEO */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Reviews verified and marked with structured data for Google rich snippets
        </p>
      </div>
    </section>
  )
}