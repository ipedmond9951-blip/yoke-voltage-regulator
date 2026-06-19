'use client'
import { type Locale, t } from '@/i18n'
interface TeamCardProps {
  name: string
  role: string
  image: string
  locale?: Locale
}
export default function TeamCard({ name, role, image, locale = 'en' }: TeamCardProps) {
  const roleText = role.includes('紧固件')
    ? t(locale, 'teamCard.engineer')
    : role
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow">
      <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
      <h3 className="text-lg font-bold text-primary-900">{name}</h3>
      <p className="text-sm text-gray-600 mt-1">{roleText}</p>
    </div>
  )
}
