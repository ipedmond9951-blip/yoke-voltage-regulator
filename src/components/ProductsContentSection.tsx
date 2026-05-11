'use client'
import { type Locale, t } from '@/i18n'
interface ProductsContentSectionProps { locale: Locale }
const content = {
  en: {
    title: 'How to Select the Right AVR',
    selectionGuide: `Choosing the correct automatic voltage regulator (AVR) for your equipment is critical for protection and longevity. In African markets, voltage fluctuations ranging from 160V to 280V are common, making voltage regulation essential for sensitive equipment.

For single-phase applications (homes, offices, shops), the SVC series stabilizer is recommended with capacity based on total load. For three-phase industrial applications (factories, hospitals, data centers), the TND series or TSD series three-phase regulators provide balanced voltage correction across all phases.

When selecting AVR capacity, calculate the total wattage of all equipment to be connected, then multiply by 1.2 to account for surge currents. For inductive loads like motors and compressors, use 2-3x the running wattage to handle starting currents.`,
    qualityTitle: 'Quality Assurance & Certifications',
    qualityText: `Every YOKE AVR undergoes rigorous testing before shipment. Our products are CE and CB certified, meeting international safety and performance standards. We provide full technical documentation including test reports, user manuals, and certification copies.

Our manufacturing facilities are ISO 9001:2015 certified. For African markets, our products meet relevant standards including SABS (South Africa) requirements. We offer 2-year warranty on all AVR units with dedicated after-sales support.`,
    shippingTitle: 'Shipping to Africa',
    shippingText: `YOKE ships AVR units from our manufacturing facilities in China to major African ports including Durban (South Africa), Beira (Mozambique), and Harare (Zimbabwe) via established sea freight routes.

Standard lead time is 20-30 days from order confirmation to port arrival. For urgent requirements, air freight options are available. We handle all export documentation including Bill of Lading, Commercial Invoice, and Certificate of Origin.

Our packaging is designed for African logistics: inner foam protection, outer reinforced cartons, and palletized loading for efficient container utilization.`,
    applicationsTitle: 'Applications by Industry',
    constructionText: `Industrial: CNC machines, robotic welding arms, laser cutting equipment, and automated production lines. YOKE three-phase AVR units provide stable voltage for precision manufacturing.`,
    miningText: `Mining: Conveyor belt motor controls, crusher installations, ventilation systems, and underground pumping equipment. Mining operations in Zambia and South Africa require stable voltage to protect expensive equipment from power quality issues.`,
    solarText: `Solar Energy: Inverter systems, battery charging equipment, and solar pump controllers. YOKE AVR units protect sensitive electronics from voltage variations common in off-grid solar installations.`,
  },
  zh: {
    title: '如何选择合适的稳压器',
    selectionGuide: `为您的设备选择正确的自动电压稳压器（AVR）对保护设备正常运行和延长使用寿命至关重要。在非洲市场，电压波动范围通常在160V至280V之间，使电压调节成为敏感设备的必要保护。

对于单相应用（家庭、办公室、商店），推荐使用SVC系列稳压器，容量根据总负载计算。对于三相工业应用（工厂、医院、数据中心），TND系列或TSD系列三相调节器可在所有相之间提供均衡的电压校正。

选择AVR容量时，计算所有连接设备的总瓦特数，然后乘以1.2以考虑涌流。对于电机和压缩机等感性负载，使用运行瓦特数的2-3倍来处理启动电流。`,
    qualityTitle: '质量保证与认证',
    qualityText: `每台YOKE稳压器在装运前都经过严格测试。我们的产品已获得CE和CB认证，符合国际安全和性能标准。我们提供完整的技术文档，包括测试报告、用户手册和认证副本。

我们的制造设施已获得ISO 9001:2015认证。对于非洲市场，我们的产品符合相关标准要求。所有AVR设备提供2年质保和专门的售后服务。`,
    shippingTitle: '非洲航运',
    shippingText: `YOKE从中国制造工厂向主要非洲港口发货，包括德班（南非）、贝拉（莫桑比克）和哈拉雷（津巴布韦）。

从订单确认到港口到达的标准交货期为20-30天。对于紧急需求，可提供空运选项。我们处理所有出口文件，包括提单、商业发票和原产地证书。

我们的包装专为非洲物流设计：内部泡沫保护，外层加固纸箱，以及托盘化装载。`,
    applicationsTitle: '行业应用',
    constructionText: `工业：数控机床、机器人焊接臂、激光切割设备和自动化生产线。YOKE三相AVR设备为精密制造提供稳定电压。`,
    miningText: `采矿：输送带电机控制、破碎机安装、通风系统和地下抽水设备。赞比亚和南非的采矿作业需要稳定电压来保护昂贵设备免受电力质量问题影响。`,
    solarText: `太阳能：逆变器系统、电池充电设备和太阳能泵控制器。YOKE AVR设备保护敏感电子设备免受离网太阳能装置中常见电压变化的影响。`,
  },
}
export default function ProductsContentSection({ locale }: ProductsContentSectionProps) {
  const texts = content[locale as keyof typeof content] || content.en
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">{texts.title}</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{texts.selectionGuide}</p>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl md:text-2xl font-bold text-primary-900 mb-4">{texts.qualityTitle}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{texts.qualityText}</p>
        </section>
        <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl md:text-2xl font-bold text-primary-900 mb-4">{texts.shippingTitle}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{texts.shippingText}</p>
        </section>
      </div>
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-6">{texts.applicationsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-bold text-primary-800 mb-2">🏭 {locale === 'zh' ? '工业' : 'Industrial'}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{texts.constructionText}</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-bold text-primary-800 mb-2">⛏️ {locale === 'zh' ? '采矿' : 'Mining'}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{texts.miningText}</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-bold text-primary-800 mb-2">☀️ {locale === 'zh' ? '太阳能' : 'Solar Energy'}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{texts.solarText}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
