'use client'

import { useState } from 'react'

interface ManufacturingProcessProps {
  locale: string
}

const translations: Record<string, {
  title: string
  subtitle: string
  processes: {
    title: string
    description: string
    icon: string
  }[]
  cta: string
}> = {
  en: {
    title: 'Our Manufacturing Process',
    subtitle: 'From components to finished voltage regulator - quality at every stage',
    processes: [
      {
        title: 'Component Testing',
        description: 'All electronic components undergo rigorous testing before assembly. Capacitors, transformers, and circuit boards are tested for specifications and reliability. Our IQC station rejects any component not meeting exact tolerances.',
        icon: '🔌'
      },
      {
        title: 'PCB Assembly',
        description: 'Precision PCB assembly using automated SMT lines. Solder paste inspection, reflow soldering, and visual inspection ensure consistent quality. Our AOI systems detect any defects at 0.1mm resolution.',
        icon: '⚡'
      },
      {
        title: 'Transformer Winding',
        description: 'Custom copper windings for transformers and inductors. Automated winding machines ensure precise turns ratio and insulation. Each transformer undergoes hi-pot testing and insulation resistance measurement.',
        icon: '🧲'
      },
      {
        title: 'Assembly & Wiring',
        description: 'Skilled technicians assemble voltage regulators with precision. All wiring follows IEC standards. Color-coded cables and secure connections ensure safety and reliability. Double-check inspection at every assembly stage.',
        icon: '🔧'
      },
      {
        title: 'Calibration & Testing',
        description: 'Each unit is calibrated for output voltage accuracy. Load testing from 0-100% capacity verifies performance. Tests include input voltage tolerance, response time, efficiency, and harmonic distortion.',
        icon: '📊'
      },
      {
        title: 'Quality Certification',
        description: 'CE, CB certification and ISO 9001:2015 compliant testing. Every unit undergoes 48-hour burn-in test. Sampling inspection per batch. Full test reports available for each shipment.',
        icon: '✅'
      }
    ],
    cta: 'Request Factory Tour'
  },
  zh: {
    title: '我们的制造工艺',
    subtitle: '从零部件到成品稳压器 - 每一步都追求品质',
    processes: [
      {
        title: '来料检验',
        description: '所有电子零部件在装配前都经过严格测试。电容、变压器、电路板均需检测规格和可靠性。IQC工序拒绝任何不符合公差的部件。',
        icon: '🔌'
      },
      {
        title: 'PCB装配',
        description: '精密PCB装配采用自动化SMT生产线。锡膏检查、回流焊接、视觉检测确保品质一致性。AOI系统以0.1mm分辨率检测任何缺陷。',
        icon: '⚡'
      },
      {
        title: '变压器绕制',
        description: '变压器和电感采用定制铜绕组。自动化绕线机确保精确匝数比和绝缘性。每个变压器都经过耐压测试和绝缘电阻测量。',
        icon: '🧲'
      },
      {
        title: '组装布线',
        description: '熟练技师精密组装稳压器。所有布线符合IEC标准。颜色编码电缆和可靠连接确保安全和可靠性。每个组装阶段都进行双重检查。',
        icon: '🔧'
      },
      {
        title: '校准测试',
        description: '每台设备都经过输出电压精度校准。0-100%负载测试验证性能。测试包括输入电压耐受、响应时间、效率和谐波失真。',
        icon: '📊'
      },
      {
        title: '质量认证',
        description: 'CE、CB认证和ISO 9001:2015合规测试。每台设备经过48小时老化测试。每批抽样检验。可提供完整测试报告。',
        icon: '✅'
      }
    ],
    cta: '预约工厂参观'
  }
}

const otherLocales: Record<string, typeof translations.en> = {
  es: { title: 'Nuestro Proceso de Fabricación', subtitle: 'De componentes a regulador terminado - calidad en cada etapa', processes: translations.en.processes, cta: 'Solicitar Visita' },
  fr: { title: 'Notre Processus de Fabrication', subtitle: 'Des composants au régulateur fini - qualité à chaque étape', processes: translations.en.processes, cta: 'Demander une visite' },
  ar: { title: 'عملية التصنيع الخاصة بنا', subtitle: 'من المكونات إلى منظم الجهد النهائي - الجودة في كل مرحلة', processes: translations.en.processes, cta: 'طلب جولة المصنع' },
  pt: { title: 'Nosso Processo de Fabricação', subtitle: 'De componentes para regulador terminado - qualidade em cada etapa', processes: translations.en.processes, cta: 'Solicitar Visita' },
  ru: { title: 'Наш Производственный Процесс', subtitle: 'От компонентов до готового регулятора - качество на каждом этапе', processes: translations.en.processes, cta: 'Запросить экскурсию' },
  ja: { title: '私たちの製造プロセス', subtitle: '部品から完成までの品質 - すべての段階で', processes: translations.en.processes, cta: '工場見学会 запросать' },
  de: { title: 'Unser Fertigungsprozess', subtitle: 'Vom Bauteil zum fertigen Regler - Qualität in jeder Phase', processes: translations.en.processes, cta: 'Werksbesichtigung anfragen' },
  hi: { title: 'हमारी विनिर्माण प्रक्रिया', subtitle: 'घटकों से तैयार वोल्टेज रेगुलेटर तक - हर चरण में गुणवत्ता', processes: translations.en.processes, cta: 'फैक्ट्री टूर का अनुरोध करें' },
}

export default function ManufacturingProcess({ locale }: ManufacturingProcessProps) {
  const [activeTab, setActiveTab] = useState(0)
  
  const content = translations[locale] || otherLocales[locale] || translations.en

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600">
            {content.subtitle}
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {content.processes.map((process, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{process.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {process.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {process.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button 
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            onClick={() => {
              const form = document.getElementById('inquiry-form')
              if (form) form.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {content.cta}
          </button>
        </div>
      </div>
    </section>
  )
}
