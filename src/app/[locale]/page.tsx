import Script from 'next/script'
import { locales, type Locale, getMessages } from '@/i18n'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import ProductGrid from '@/components/ProductGrid'
import CertificationsSection from '@/components/CertificationsSection'
import FAQSection from '@/components/FAQSection'
import InquiryForm from '@/components/InquiryForm'
import ShareButtons from '@/components/ShareButtons'
import StatisticsSection from '@/components/StatisticsSection'
import ArticlesSection from '@/components/ArticlesSection'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = (localeParam as Locale) || 'en'
  const msgs = getMessages(locale)
  const BASE_URL = 'https://www.yoke-electric.com'

  return (
    <>
      <Script
        id="seo-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'YOKE Electric',
            url: BASE_URL,
            logo: `${BASE_URL}/logo.png`,
            description: msgs.hero?.subtitle || 'Professional automatic voltage regulator manufacturer.',
            foundingDate: '2014',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'China',
              addressCountry: 'CN',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+86-159-6340-9951',
              contactType: 'sales',
              email: 'info@yoke-electric.com',
              availableLanguage: ['English', 'Chinese', 'Spanish', 'Arabic', 'French', 'Portuguese', 'Russian', 'Japanese', 'German', 'Hindi'],
            },
            sameAs: [
              'https://wa.me/8615963409951'
            ],
          }),
        }}
      />

      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'YOKE AVR Products',
            itemListElement: [
              { '@type': 'ListItem', position: 1, item: { '@type': 'Product', name: 'SVC-3000VA', description: 'Automatic voltage regulator for home appliances, 3KVA capacity', brand: { '@type': 'Brand', name: 'YOKE' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '50', availability: 'https://schema.org/InStock' } } },
              { '@type': 'ListItem', position: 2, item: { '@type': 'Product', name: 'SVC-10KVA', description: 'Industrial grade AVR, 10KVA capacity', brand: { '@type': 'Brand', name: 'YOKE' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '150', availability: 'https://schema.org/InStock' } } },
              { '@type': 'ListItem', position: 3, item: { '@type': 'Product', name: 'SVC-30KVA', description: 'Heavy duty voltage stabilizer, 30KVA capacity', brand: { '@type': 'Brand', name: 'YOKE' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '350', availability: 'https://schema.org/InStock' } } },
              { '@type': 'ListItem', position: 4, item: { '@type': 'Product', name: 'SVC-50KVA', description: 'Industrial AVR for production lines, 50KVA capacity', brand: { '@type': 'Brand', name: 'YOKE' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '500', availability: 'https://schema.org/InStock' } } },
              { '@type': 'ListItem', position: 5, item: { '@type': 'Product', name: 'SVC-60KVA', description: 'High capacity voltage regulator, 60KVA capacity', brand: { '@type': 'Brand', name: 'YOKE' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '600', availability: 'https://schema.org/InStock' } } },
              { '@type': 'ListItem', position: 6, item: { '@type': 'Product', name: 'TND-SVC-3000VA', description: 'TND series AVR with digital display, 3KVA', brand: { '@type': 'Brand', name: 'YOKE' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '65', availability: 'https://schema.org/InStock' } } },
            ],
          }),
        }}
      />

      {/* FAQPage Structured Data for Google Rich Results */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'What is the input voltage range for YOKE AVR products?', acceptedAnswer: { '@type': 'Answer', text: 'YOKE AVR products typically support input voltage ranges of 140-260V for single-phase models and 280-430V for three-phase models. Please check specific product specifications for exact ranges.' } },
              { '@type': 'Question', name: 'What is the output voltage accuracy?', acceptedAnswer: { '@type': 'Answer', text: 'YOKE voltage regulators deliver output voltage with ±2% to ±3% accuracy, ensuring stable power supply for sensitive equipment. TND series digital models offer even tighter regulation.' } },
              { '@type': 'Question', name: 'Do YOKE AVR products have overload protection?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, all YOKE AVR products feature built-in overload protection. When the load exceeds rated capacity, the AVR will automatically cut off output to prevent damage. Most models resume automatically after the overload is removed.' } },
              { '@type': 'Question', name: 'What is the response time of YOKE voltage regulators?', acceptedAnswer: { '@type': 'Answer', text: 'YOKE SVC series AVRs have a response time of less than 1 second for voltage corrections. TND series digital models offer faster response times of approximately 500ms.' } },
              { '@type': 'Question', name: 'Can I use YOKE AVRs for the full range of appliances?', acceptedAnswer: { '@type': 'Answer', text: 'YOKE AVRs are suitable for most household and industrial appliances including air conditioners, refrigerators, computers, medical equipment, and production machinery. Not recommended for inductive loads with motors larger than the AVR capacity.' } },
              { '@type': 'Question', name: 'What is the warranty period for YOKE products?', acceptedAnswer: { '@type': 'Answer', text: 'All YOKE voltage regulators come with a 12-month warranty period from the date of purchase. The warranty covers manufacturing defects and component failures under normal use conditions.' } },
              { '@type': 'Question', name: 'What payment methods do you accept?', acceptedAnswer: { '@type': 'Answer', text: 'We accept T/T, L/C, PayPal for samples, Western Union, and Alibaba Trade Assurance. For first-time buyers, we typically require 30% deposit and 70% balance before shipment.' } },
              { '@type': 'Question', name: 'What are your shipping options and delivery times?', acceptedAnswer: { '@type': 'Answer', text: 'We offer sea freight (15-35 days transit) and air freight (5-10 days) to worldwide destinations. Express shipping available for sample orders. FOB, CIF, and DDP incoterms available.' } },
              { '@type': 'Question', name: 'Are your products CE and CB certified?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, all YOKE AVR products are CE and CB certified, meeting international safety and quality standards. Certificates are available upon request with your order.' } },
              { '@type': 'Question', name: 'What is the minimum order quantity?', acceptedAnswer: { '@type': 'Answer', text: 'Standard MOQ is 1 unit for most models. Sample orders welcome. For bulk orders (10+ units), we offer significant quantity discounts. Contact us for specific pricing.' } },
            ],
          }),
        }}
      />

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.yoke-electric.com' },
              { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://www.yoke-electric.com/products' },
            ],
          }),
        }}
      />

      <HeroSection locale={locale} />

      <div className="container mx-auto px-4">
        {/* Social Share Buttons */}
        <div className="max-w-3xl mx-auto py-4">
          <ShareButtons 
            url={`https://www.yoke-electric.com/${locale}`}
            title={locale === 'zh' ? 'YOKE稳压器 - 专业电压稳定解决方案' : 'YOKE Voltage Regulators - Professional AVR Manufacturer'}
            description={locale === 'zh' ? '10年以上稳压器制造经验，CE/CB认证，全球发货' : '10+ years AVR manufacturing experience. CE/CB certified products with global shipping.'}
          />
        </div>
      </div>

      <AboutSection locale={locale} />
      <WhyChooseUs locale={locale} />
      <ProductGrid locale={locale} />
      <ArticlesSection locale={locale} />

      {/* Application Scenarios - content depth for SEO */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Voltage Regulator Applications</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10 text-sm md:text-base">YOKE voltage regulators are widely used across residential, commercial, and industrial applications worldwide. From protecting home appliances to powering production lines, our CE/CB certified AVRs deliver reliable voltage stabilization.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-primary-900 mb-2">🏠 Residential Use</h3>
              <p className="text-gray-600 text-sm">Protect air conditioners, refrigerators, TVs, and computers from voltage fluctuations. SVC-3000VA and TND-SVC-3000VA are ideal for home use.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-primary-900 mb-2">🏢 Commercial Buildings</h3>
              <p className="text-gray-600 text-sm">Stable power for offices, shops, and restaurants. SVC-10KVA and SVC-15KVA models handle multiple appliances simultaneously.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-primary-900 mb-2">🏭 Industrial & Manufacturing</h3>
              <p className="text-gray-600 text-sm">Power production lines, CNC machines, and heavy equipment. SVC-30KVA to SVC-60KVA models for industrial voltage stabilization needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Overview - SEO content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Understanding Automatic Voltage Regulators</h2>
          <p className="text-gray-600 text-center mb-12 text-sm md:text-base">Learn how YOKE AVRs protect your equipment from voltage instability and power fluctuations.</p>

          {/* SVC Series Overview */}
          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-primary-900 mb-4">SVC Series - Servo Motor Voltage Stabilizers</h3>
            <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
              SVC (Servo Voltage Control) series regulators use a servo motor mechanism to adjust voltage. When input voltage fluctuates, the servo motor automatically moves the carbon brush along the autotransformer winding to maintain stable output voltage. YOKE SVC regulators offer excellent voltage regulation accuracy (±2-3%) and fast response times. Available in capacities from 3KVA to 60KVA, these units are suitable for both residential and light industrial applications where reliable voltage stabilization is critical.
            </p>
            <div className="bg-primary-50 rounded-lg p-4 md:p-6 mb-4">
              <h4 className="font-semibold text-primary-900 mb-3">SVC Series Key Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Voltage Range:</strong> 140-260V (single-phase), 280-430V (three-phase)</div>
                <div><strong>Output Accuracy:</strong> ±2% to ±3%</div>
                <div><strong>Response Time:</strong> Less than 1 second</div>
                <div><strong>Efficiency:</strong> ≥ 95%</div>
                <div><strong>Frequency:</strong> 50/60Hz</div>
                <div><strong>Protection:</strong> Overload, over-voltage, under-voltage</div>
              </div>
            </div>
          </div>

          {/* TND Series Overview */}
          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-primary-900 mb-4">TND Series - Digital Display Voltage Stabilizers</h3>
            <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
              TND series voltage regulators feature digital LED or LCD displays showing input and output voltage in real-time. These models use advanced electronic control circuitry for faster response times and more precise voltage regulation compared to traditional SVC models. The digital display allows users to monitor voltage conditions at a glance, making TND series ideal for environments where visibility and monitoring are important. Available in various capacities with compact designs suitable for desktop or wall mounting.
            </p>
            <div className="bg-primary-50 rounded-lg p-4 md:p-6 mb-4">
              <h4 className="font-semibold text-primary-900 mb-3">TND Series Key Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Display:</strong> Digital LED/LCD showing input and output voltage</div>
                <div><strong>Response Time:</strong> Approximately 500ms</div>
                <div><strong>Voltage Range:</strong> 140-260V (single-phase)</div>
                <div><strong>Output Accuracy:</strong> ±2%</div>
                <div><strong>Delay Protection:</strong> 3-6 seconds startup delay</div>
                <div><strong>Noise Level:</strong> Ultra-low noise operation</div>
              </div>
            </div>
          </div>

          {/* Why Voltage Stabilization Matters */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-primary-900 mb-4">Why Voltage Stabilization Matters</h3>
            <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
              Voltage fluctuations and power surges are common problems in many electrical grids worldwide. Unstable voltage can cause serious damage to electrical equipment, leading to costly repairs or premature equipment failure. A quality voltage regulator like YOKE AVRs ensures that your appliances and equipment receive consistent, safe voltage levels regardless of input fluctuations. This extends equipment lifespan, reduces downtime, and saves money on repairs and replacements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold mb-2">🔌 Over-Voltage Protection</h4>
                <p className="text-sm text-gray-600">Voltage spikes can instantly destroy sensitive electronics. YOKE AVRs detect and correct over-voltage conditions within milliseconds.</p>
              </div>
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold mb-2">⚡ Under-Voltage Protection</h4>
                <p className="text-sm text-gray-600">Low voltage causes equipment to overheat and fail prematurely. YOKE AVRs boost under-voltage to safe operating levels.</p>
              </div>
            </div>
          </div>

          {/* Capacity Selection Guide */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-primary-900 mb-4">AVR Capacity Selection Guide</h3>
            <p className="text-gray-700 mb-4 text-sm md:text-base leading-relaxed">
              Selecting the right capacity is crucial for effective voltage regulation. The AVR capacity should exceed your total load by 20-30% to account for startup currents and future expansion. For inductive loads (motors, compressors), allow 3-5x the running wattage for startup.
            </p>
            <div className="bg-primary-50 rounded-lg p-4 md:p-6 mb-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-primary-100">
                    <tr>
                      <th className="p-2 text-left">AVR Model</th>
                      <th className="p-2 text-left">Capacity</th>
                      <th className="p-2 text-left">Recommended Use</th>
                      <th className="p-2 text-left">Max Current</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      <td className="p-2 border">SVC-3000VA</td>
                      <td className="p-2 border">3KVA / 2400W</td>
                      <td className="p-2 border">Home appliances, computer, TV</td>
                      <td className="p-2 border">13A</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">SVC-10KVA</td>
                      <td className="p-2 border">10KVA / 8KW</td>
                      <td className="p-2 border">Small office, shop, multiple rooms</td>
                      <td className="p-2 border">40A</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">SVC-30KVA</td>
                      <td className="p-2 border">30KVA / 24KW</td>
                      <td className="p-2 border">Large office, light industrial</td>
                      <td className="p-2 border">120A</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">SVC-50KVA</td>
                      <td className="p-2 border">50KVA / 40KW</td>
                      <td className="p-2 border">Production lines, workshop</td>
                      <td className="p-2 border">200A</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">SVC-60KVA</td>
                      <td className="p-2 border">60KVA / 48KW</td>
                      <td className="p-2 border">Heavy industrial, large machinery</td>
                      <td className="p-2 border">240A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-gray-700 text-sm md:text-base">
              Not sure which capacity you need? <a href={`/${locale}#inquiry`} className="text-primary-600 hover:underline">Contact our team</a> with your load details and we'll help you select the right model.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section - trust numbers */}
      <StatisticsSection locale={locale} />

      <FAQSection locale={locale} />
      <CertificationsSection locale={locale} />
      <InquiryForm locale={locale} />
    </>
  )
}