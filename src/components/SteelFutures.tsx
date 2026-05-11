'use client'
import { useState } from 'react'
import { type Locale } from '@/i18n'
interface SteelFuturesProps { locale?: Locale }
const futuresData = {
  copper: { name: 'Copper', unit: 'USD/MT', current: 9520, change: '+1.2%', trend: 'up' },
  aluminum: { name: 'Aluminum', unit: 'USD/MT', current: 2280, change: '-0.5%', trend: 'down' },
  steel: { name: 'Steel Rebar', unit: 'USD/MT', current: 3850, change: '+0.8%', trend: 'up' },
  transformer: { name: 'Transformer Oil', unit: 'USD/LT', current: 1250, change: '+2.1%', trend: 'up' },
}
export default function SteelFutures({ locale = 'en' }: SteelFuturesProps) {
  const [selected, setSelected] = useState('copper')
  const title = locale === 'zh' ? '原材料价格指数' : 'Raw Material Price Index'
  const subtitle = locale === 'zh' ? '实时全球大宗商品价格影响稳压器成本' : 'Real-time global commodity prices affecting AVR manufacturing costs'
  const selectedData = futuresData[selected as keyof typeof futuresData]
  return (
    <section className="py-8 bg-gradient-to-r from-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
          <p className="text-slate-300 text-xs">{subtitle}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(futuresData).map(([key, data]) => (
            <button key={key} onClick={() => setSelected(key)} className={`p-3 rounded-lg text-left transition-all ${selected === key ? 'bg-primary-600 ring-2 ring-primary-400' : 'bg-slate-700 hover:bg-slate-600'}`}>
              <div className="text-xs text-slate-300">{data.name}</div>
              <div className="text-lg font-bold text-white">{data.current.toLocaleString()}</div>
              <div className={`text-xs ${data.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>{data.change}</div>
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-slate-500 mt-4">Prices shown are reference prices. Actual AVR pricing may vary based on specifications and market conditions.</p>
      </div>
    </section>
  )
}
