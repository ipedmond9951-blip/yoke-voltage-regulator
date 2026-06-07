import { Metadata } from 'next'
import { locales, type Locale } from '@/i18n'
import { t } from '@/i18n'
import { authors } from '@/lib/authors'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import Link from 'next/link'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  const siteUrl = 'https://kk-electric.com'

  const titles: Record<string, string> = {
    en: 'YOKE Engineering Team - Voltage Regulation Experts | YOKE AVR',
    zh: 'YOKE 工程团队 - 稳压器专家 | YOKE AVR',
  }
  const descriptions: Record<string, string> = {
    en: 'Meet the YOKE engineering team: 15+ years experience designing CE-certified voltage regulators for African B2B markets. Chief engineer, technical editor, and field applications specialist.',
    zh: '认识 YOKE 工程团队：15+ 年设计 CE 认证稳压器经验，服务非洲 B2B 市场。首席工程师、技术编辑、现场应用专员。',
  }
  return {
    title: titles[loc] || titles.en,
    description: descriptions[loc] || descriptions.en,
    alternates: {
      canonical: `${siteUrl}/${loc}/team`,
      languages: Object.fromEntries([
        ['x-default', `${siteUrl}/en/team`],
        ...locales.map(l => [l, `${siteUrl}/${l}/team`]),
      ]),
    },
  }
}

export default async function TeamIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = (locale as Locale) || 'en'
  const siteUrl = 'https://kk-electric.com'

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbSchema
        locale={loc}
        pageUrl="/team"
        pageName={loc === 'zh' ? '工程团队' : 'Engineering Team'}
      />

      <section className="bg-gradient-to-br from-primary-800 to-primary-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <nav className="text-sm text-primary-200 mb-4">
            <Link href={`/${loc}`} className="hover:text-white">{loc === 'zh' ? '首页' : 'Home'}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{loc === 'zh' ? '工程团队' : 'Engineering Team'}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {loc === 'zh' ? 'YOKE 工程团队' : 'YOKE Engineering Team'}
          </h1>
          <p className="text-primary-200 text-base md:text-lg max-w-3xl">
            {loc === 'zh'
              ? '15+ 年稳压器设计与现场工程经验，专注服务非洲 B2B 市场。我们的工程师、技术编辑和现场应用专员持续为客户提供专业的技术支持。'
              : '15+ years of voltage regulator design and field engineering experience, focused on African B2B markets. Our engineers, technical editors, and field application specialists provide expert technical support to customers.'}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {authors.map((author, i) => (
              <Link
                key={i}
                href={`/${loc}/team/${author.slug}`}
                className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-300 to-primary-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
                    {author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h2 className="text-xl font-bold text-primary-900 mb-1">{author.name}</h2>
                  <div className="text-sm text-primary-700 font-medium mb-3">{author.jobTitle}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {author.shortBio}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1 justify-center">
                    {author.expertise.slice(0, 3).map((area, j) => (
                      <span key={j} className="px-2 py-1 bg-primary-50 text-primary-800 rounded-full text-xs">
                        {area}
                      </span>
                    ))}
                    {author.expertise.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{author.expertise.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 text-sm text-primary-700 font-medium">
                    {loc === 'zh' ? '查看完整简介 →' : 'View Full Profile →'}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-primary-900 mb-4">
              {loc === 'zh' ? '为什么选择 YOKE 工程师' : 'Why Choose YOKE Engineering'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  {loc === 'zh' ? '非洲电网专业' : 'African Grid Expertise'}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {loc === 'zh'
                    ? '47+ 国家现场经验，深入理解非洲电网（130V-310V 波动、油气田负载、太阳能混合系统）挑战。'
                    : '47+ countries of field experience with deep understanding of African grid challenges (130V-310V fluctuations, oil & gas loads, solar-hybrid systems).'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  {loc === 'zh' ? 'CE/CB 认证' : 'CE & CB Certified'}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {loc === 'zh'
                    ? '所有产品通过 CE、CB、RoHS 认证，符合 IEC 60076 / IEEE C57.13 国际标准。'
                    : 'All products carry CE, CB, and RoHS certification, meeting IEC 60076 / IEEE C57.13 international standards.'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  {loc === 'zh' ? '24/7 技术支持' : '24/7 Technical Support'}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {loc === 'zh'
                    ? 'Nairobi 现场工程师提供安装、调试、维护全周期支持，跨时区响应 24 小时内。'
                    : 'Nairobi-based field engineers provide installation, commissioning, and maintenance support with 24-hour cross-timezone response.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`/${loc}/about`}
              className="inline-block text-primary-700 hover:text-primary-900 font-medium"
            >
              ← {loc === 'zh' ? '返回关于页面' : 'Back to About Page'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
