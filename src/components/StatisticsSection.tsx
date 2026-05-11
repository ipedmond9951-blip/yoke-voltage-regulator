import { type Locale } from '@/i18n'

interface StatisticsSectionProps {
  locale?: Locale
}

// Key statistics for E-E-A-T signals - YOKE AVR focus
const statistics = {
  en: [
    { value: '10+', label: 'Years Experience', sublabel: 'Since 2014, Africa-focused' },
    { value: '500+', label: 'Global Clients', sublabel: 'Across 50+ African countries' },
    { value: '2000+', label: 'Units Installed', sublabel: 'SVC & TND series' },
    { value: '98%', label: 'On-Time Delivery', sublabel: 'Industry leading reliability' },
    { value: '0.2%', label: 'Defect Rate', sublabel: 'Industry average: 1-2%' },
    { value: '5000', label: 'Units Capacity/Month', sublabel: 'Production capacity' },
  ],
  zh: [
    { value: '10+', label: '年行业经验', sublabel: '自2014年，专注非洲市场' },
    { value: '500+', label: '全球客户', sublabel: '遍布50+非洲国家' },
    { value: '2000+', label: '已安装设备', sublabel: 'SVC和TND系列' },
    { value: '98%', label: '准时交货率', sublabel: '行业领先可靠性' },
    { value: '0.2%', label: '缺陷率', sublabel: '行业平均：1-2%' },
    { value: '5000', label: '台/月', sublabel: '生产产能' },
  ],
}

export default function StatisticsSection({ locale = 'en' }: StatisticsSectionProps) {
  const validLocale = (locale === 'en' || locale === 'zh') ? locale : 'en'
  const stats = statistics[validLocale]
  
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-primary-800 to-primary-900 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            {locale === 'zh' ? '为什么选择YOKE？' : 'Why YOKE?'}
          </h2>
          <p className="text-primary-200 text-sm md:text-base max-w-2xl mx-auto">
            {locale === 'zh' 
              ? '数字证明实力 - CE和CB认证工厂，专注非洲市场10年'
              : 'Numbers Prove Quality - CE & CB certified factory, 10 years Africa-focused'}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-1">
                {stat.value}
              </div>
              <div className="font-semibold text-sm md:text-base mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-primary-200">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
            <span className="text-xl">🏭</span>
            <span className="text-sm font-medium">ISO 9001:2015</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
            <span className="text-xl">✅</span>
            <span className="text-sm font-medium">CE Certified</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
            <span className="text-xl">🔌</span>
            <span className="text-sm font-medium">CB Certified</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
            <span className="text-xl">🇨🇳</span>
            <span className="text-sm font-medium">Made in China</span>
          </div>
        </div>
      </div>
    </section>
  )
}