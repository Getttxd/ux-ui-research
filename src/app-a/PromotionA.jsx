import React, { useState, useRef, useEffect } from 'react'
import { 
  ArrowLeft, 
  Search, 
  Gift, 
  ChevronRight, 
  Check, 
  Signal, 
  Wifi 
} from 'lucide-react'

import trueMoneyImg from '../assets/payment/TrueMoney.jpg'

export default function PromotionA({ 
  selectedPromoIds = ['promo-20'], 
  onApplyPromotions, 
  onBack,
  isOverlay = false 
}) {
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [])

  const [selected, setSelected] = useState(() => {
    if (Array.isArray(selectedPromoIds) && selectedPromoIds.length > 0) {
      return [selectedPromoIds[0]]
    }
    return ['promo-20']
  })
  const [promoCodeInput, setPromoCodeInput] = useState('')

  const promotions = [
    {
      id: 'promo-20',
      title: 'ส่วนลด 20% สูงสุด ฿50',
      subtitle: 'ลด 20%, เมื่อชำระขั้นต่ำ ฿99',
      discountAmount: 20, // percentage or fixed
      badge: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-amber-300 to-amber-400 border border-amber-300 flex flex-col items-center justify-between p-1 shrink-0 overflow-hidden shadow-2xs">
          <div className="flex flex-col items-center leading-none mt-0.5">
            <div className="flex items-start">
              <span className="text-[13px] font-black text-slate-950 tracking-tighter">20</span>
              <span className="text-[8px] font-black text-red-600 ml-0.5 leading-none mt-0.5">%<br/>OFF</span>
            </div>
          </div>
          <div className="w-full bg-red-600 text-white text-[7px] font-black py-0.5 text-center tracking-tight rounded-2xs">
            BEST OFFER
          </div>
        </div>
      )
    },
    {
      id: 'promo-10',
      title: 'ส่วนลด 10% สูงสุด ฿50',
      subtitle: 'ลด 10%, เมื่อชำระขั้นต่ำ ฿99',
      discountAmount: 10,
      badge: (
        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center p-1 shrink-0 relative overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-10 h-10">
            <path 
              d="M50 0 L61 11 L77 8 L81 24 L96 30 L91 46 L100 59 L88 69 L91 85 L75 88 L70 100 L55 93 L43 100 L35 87 L19 86 L19 70 L6 62 L12 47 L5 32 L20 25 L21 9 L37 11 Z" 
              fill="#fed7aa" 
              stroke="#fb923c" 
              strokeWidth="2" 
            />
            <text x="50" y="44" textAnchor="middle" fill="#0284c7" fontWeight="900" fontSize="22">10%</text>
            <text x="50" y="62" textAnchor="middle" fill="#ea580c" fontWeight="800" fontSize="10" letterSpacing="-0.5">DISCOUNT</text>
          </svg>
        </div>
      )
    },
    {
      id: 'truemoney-cashback',
      title: '[TrueMoney] เงินคืน ฿500',
      subtitle: 'ไม่สามารถใช้ร่วมกับโปรโมชันอื่นที่คุณเลือกได้',
      discountAmount: 50,
      badge: (
        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-between p-1.5 shrink-0 shadow-2xs">
          <span className="text-[11px] font-extrabold text-slate-700 leading-tight">500฿</span>
          <img src={trueMoneyImg} alt="TrueMoney" className="w-5 h-5 object-contain" />
        </div>
      )
    }
  ]

  const handleSelectPromo = (id) => {
    // Only one promotion can be selected at a time
    setSelected(prev => (prev.includes(id) ? [] : [id]))
  }

  return (
    <div className={isOverlay 
      ? "w-full h-full bg-white flex flex-col relative overflow-hidden text-slate-900 select-none"
      : "w-full sm:w-[420px] sm:max-w-[420px] sm:h-[920px] sm:min-h-[920px] sm:max-h-[920px] mx-auto bg-white min-h-screen sm:rounded-[44px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 flex flex-col relative overflow-hidden text-slate-900 select-none"
    }>
      
      {/* iOS Style Status Bar */}
      <div className="pt-3 px-7 pb-1 flex items-center justify-between text-xs font-semibold text-slate-900 shrink-0 bg-white z-20">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-slate-900">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <div className="flex items-center gap-0.5">
            <div className="w-5 h-2.5 border border-slate-900 rounded-sm p-0.5 flex items-center">
              <div className="w-full h-full bg-slate-900 rounded-2xs"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Header Row */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-100 bg-white z-10 shrink-0">
        <button
          onClick={onBack}
          aria-label="ย้อนกลับ"
          className="p-1 -ml-1 text-slate-900 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        <h1 className="text-base sm:text-lg font-bold text-slate-900">
          โปรโมชัน
        </h1>
      </div>

      {/* Content Area */}
      <div ref={contentRef} className="flex-1 overflow-y-auto pb-4 scrollbar-none">
        
        {/* Search Promo Code Input */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-100/90 rounded-2xl">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
              placeholder="กรอกรหัสโปรโมชัน หรือรหัสบัตรกำนัล"
              className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-normal"
            />
          </div>
        </div>

        {/* Voucher / Gift Card Button */}
        <div className="px-4 mb-4">
          <div className="rounded-2xl bg-slate-50 hover:bg-slate-100/80 p-3.5 flex items-center justify-between transition-colors cursor-pointer group border border-slate-100/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-slate-900 shadow-2xs">
                <Gift className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                  ใช้บัตรกำนัล
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  มีรหัสบัตรกำนัล? กดรับสิทธิ์และใช้ได้เลย
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
        </div>

        {/* Promotions List */}
        <div className="px-4 divide-y divide-slate-100">
          {promotions.map((promo) => {
            const isChecked = selected.includes(promo.id)
            const isDimmed = selected.length > 0 && !isChecked
            return (
              <div
                key={promo.id}
                onClick={() => handleSelectPromo(promo.id)}
                className={`py-3.5 flex items-center justify-between cursor-pointer rounded-xl px-1.5 transition-all duration-200 ${
                  isDimmed 
                    ? 'opacity-50 hover:opacity-70' 
                    : 'opacity-100'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className={`transition-all duration-200 ${isDimmed ? 'grayscale-[30%]' : 'scale-100'}`}>
                    {promo.badge}
                  </div>
                  <div className="min-w-0">
                    <h4 className={`text-xs sm:text-sm truncate transition-colors ${
                      isChecked 
                        ? 'font-bold text-slate-900' 
                        : isDimmed 
                          ? 'font-medium text-slate-700' 
                          : 'font-semibold text-slate-800'
                    }`}>
                      {promo.title}
                    </h4>
                    <p className={`text-[11px] mt-0.5 truncate transition-colors ${
                      isChecked 
                        ? 'text-slate-500' 
                        : isDimmed 
                          ? 'text-slate-500' 
                          : 'text-slate-500'
                    }`}>
                      {promo.subtitle}
                    </p>
                  </div>
                </div>

                {/* Checkbox */}
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                  isChecked 
                    ? 'border-slate-900 bg-white shadow-2xs' 
                    : isDimmed 
                      ? 'border-slate-400 bg-white' 
                      : 'border-slate-300 bg-white'
                }`}>
                  {isChecked && (
                    <Check className="w-3.5 h-3.5 text-slate-900 stroke-[3]" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {/* Sticky Bottom Apply Button Bar */}
      <div className="p-4 border-t border-slate-100 bg-white z-20">
        <button
          onClick={() => {
            if (onApplyPromotions) {
              onApplyPromotions(selected.slice(0, 1))
            } else if (onBack) {
              onBack()
            }
          }}
          id="apply-promotion-btn"
          className="w-full bg-[#269D3C] hover:bg-[#15803d] active:scale-[0.99] text-white py-3.5 rounded-full font-bold text-sm shadow-md shadow-green-600/20 transition-all cursor-pointer text-center"
        >
          นำไปใช้ • {selected.length} โปรโมชัน
        </button>
      </div>

    </div>
  )
}
