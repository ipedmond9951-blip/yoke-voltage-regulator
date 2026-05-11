'use client'
import { type Locale } from '@/i18n'
interface TeamCardProps {
  name: string
  role: string
  image: string
  locale?: Locale
}
export default function TeamCard({ name, role, image, locale = 'en' }: TeamCardProps) {
  // Only translate if role needs language conversion
  const needsTranslation = role.includes('紧固件')
  let roleText = role
  if (needsTranslation) {
    roleText = locale === 'zh'
      ? '专业的稳压器专家团队，在电力设备和工业应用领域拥有深厚知识'
      : 'Expert AVR specialists with deep knowledge in power equipment and industrial applications'
  }
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow">
      <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
      <h3 className="text-lg font-bold text-primary-900">{name}</h3>
      <p className="text-sm text-gray-600 mt-1">{roleText}</p>
    </div>
  )
}
