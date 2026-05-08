import { type Locale, t } from '@/i18n'

interface FAQSectionProps { locale?: Locale }

const faqKeys = [
  { q: 'What types of voltage regulators do you manufacture?', a: 'YOKE produces SVC (Servo Voltage Regulator) and TND (High Precision) series. Capacities from 500VA to 100KVA. Single phase and three phase models available.' },
  { q: 'What is the difference between SVC and TND series?', a: 'SVC series: Relay type, fast response, affordable. TND series: Servo motor control, higher precision (±2%), digital display, for sensitive equipment.' },
  { q: 'What input voltage range do your voltage regulators support?', a: 'Standard input range: 140-260V for single phase. TND series: 150-250V for higher precision. Three phase models: 250-450V or custom.' },
  { q: 'What is the output voltage accuracy?', a: 'SVC series: ±3-5% output accuracy. TND series: ±2% output accuracy. Both maintain stable output under varying input conditions.' },
  { q: 'What is your minimum order quantity (MOQ)?', a: 'Standard MOQ 1 unit. Sample orders welcome. OEM/ODM orders MOQ 50 units. Bulk pricing for distributors.' },
  { q: 'What payment methods do you accept?', a: 'T/T, L/C, PayPal, Western Union. 30% deposit, 70% balance before shipment. Alibaba Trade Assurance for small orders.' },
  { q: 'Can you customize voltage regulators for specific applications?', a: 'Yes, OEM/ODM available. Custom voltage ranges, frequencies (50/60Hz), special enclosures, and branding. MOQ 50 units for customization.' },
  { q: 'What certifications do your products have?', a: 'CE, CB, ISO 9001:2015 certified. All products undergo strict quality testing. Test reports and certificates available on request.' },
  { q: 'What is the typical lead time?', a: 'Standard models: 7-15 days. Custom models: 20-30 days. Express production available for urgent orders (7 days, +15% fee).' },
  { q: 'Do you offer warranty on your voltage regulators?', a: 'Yes, 1-2 year warranty depending on model. Warranty covers manufacturing defects. Spare parts and technical support included.' },
  { q: 'How long is the lifespan of YOKE voltage regulators?', a: 'YOKE regulators are designed for 10+ years of continuous operation. Lifespan depends on load, environment, and usage conditions.' },
  { q: 'What applications are suitable for your voltage regulators?', a: 'Home appliances (refrigerators, AC, TVs), office equipment, medical devices, industrial machinery, CNC equipment, welding machines, and production lines.' },
  { q: 'Do you ship internationally?', a: 'Yes, worldwide shipping available. Express (DHL/FedEx): 5-7 days. Sea freight: 20-30 days. Air freight: 10-15 days. CIF/DDP terms available.' },
  { q: 'What is included in the package?', a: 'Each unit includes: voltage regulator, user manual, warranty card. Optional: voltage meter display, wall mounting kit, input/output cables.' },
  { q: 'How do I install the voltage regulator?', a: 'Wall mount or floor standing installation. Connect input to mains, output to protected equipment. Full installation guide included with each unit.' },
  { q: 'Why choose YOKE voltage regulators?', a: '12+ years manufacturing experience, ISO 9001 certified factory, 98% on-time delivery rate, competitive pricing with 2-year warranty, and global after-sales support.' },
  { q: 'Do you offer technical support?', a: 'Yes, 24/7 technical support available. Installation guidance, troubleshooting, and maintenance tips provided. Remote assistance via video call.' },
  { q: 'How do I place an order?', a: '1) Select model and quantity. 2) Request quotation. 3) Confirm specifications. 4) Pay 30% deposit. 5) Production. 6) Inspection. 7) Pay balance. 8) Shipment.' },
]

export default function FAQSection({ locale = 'en' }: FAQSectionProps) {
  const title = t(locale, 'faq.title')
  const subtitle = t(locale, 'faq.subtitle')

  return (
    <section id="faq" className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 md:mb-4">{title}</h2>
        <p className="text-gray-600 text-center mb-8 md:mb-12 max-w-xl mx-auto text-sm md:text-base">{subtitle}</p>
        
        <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
          {faqKeys.map((faq, i) => (
            <details key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 group">
              <summary className="px-4 md:px-6 py-3 md:py-4 cursor-pointer font-semibold text-gray-800 hover:text-primary-600 flex justify-between items-center text-sm md:text-base">
                {faq.q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform ml-2 flex-shrink-0">▼</span>
              </summary>
              <div className="px-4 md:px-6 pb-3 md:pb-4 text-gray-600 text-xs md:text-sm leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">{t(locale, 'faq.contact')}</p>
          <a href={`/${locale}#inquiry`} className="inline-flex items-center gap-2 bg-primary-700 text-white px-5 md:px-6 py-2.5 rounded-lg font-semibold hover:bg-primary-800 transition-colors text-sm md:text-base">
            {t(locale, 'faq.contactCta')}
          </a>
        </div>
      </div>
    </section>
  )
}
