import React, { useRef, useEffect } from 'react'
import { 
  ArrowLeft, 
  Plus, 
  ChevronRight, 
  Signal, 
  Wifi 
} from 'lucide-react'

import promptPayImg from '../assets/payment/PromptPay.png'
import payWalletImg from '../assets/payment/PayWallet.avif'
import trueMoneyImg from '../assets/payment/TrueMoney.jpg'
import cashImg from '../assets/payment/Cash.png'

export default function PaymentMethodA({ 
  selectedPayment = 'wallet', 
  onSelectPayment, 
  onBack,
  isOverlay = false
}) {
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [])
  const paymentOptions = [
    {
      id: 'wallet',
      name: 'Pay Wallet',
      subtitle: 'ยอดคงเหลือ • ฿0.00',
      icon: (
        <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-slate-100 shadow-2xs bg-white">
          <img 
            src={payWalletImg} 
            alt="Pay Wallet" 
            className="w-full h-full object-cover" 
          />
        </div>
      )
    },
    {
      id: 'truemoney',
      name: 'TrueMoney',
      subtitle: null,
      icon: (
        <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shrink-0 border border-slate-100 shadow-2xs p-1 bg-white">
          <img 
            src={trueMoneyImg} 
            alt="TrueMoney" 
            className="w-full h-full object-contain" 
          />
        </div>
      )
    },
    {
      id: 'cash',
      name: 'เงินสด (Cash)',
      subtitle: null,
      icon: (
        <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
          <img 
            src={cashImg} 
            alt="เงินสด (Cash)" 
            className="w-[70px] h-[70px] object-cover" 
          />
        </div>
      )
    }
  ]

  const handleSelect = (id) => {
    if (onSelectPayment) {
      onSelectPayment(id)
    }
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
          วิธีการชำระเงิน
        </h1>
      </div>

      {/* Content Area */}
      <div ref={contentRef} className="flex-1 overflow-y-auto pb-8 scrollbar-none">
        
        {/* Intro text */}
        <div className="pt-4 px-5 pb-5">
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            เพิ่มความสะดวกในการชำระค่าอาหาร บริการรถรับส่ง หรือช็อปปิ้ง ผ่านแอปพลิเคชันอย่างปลอดภัย
          </p>
        </div>

        {/* Featured PromptPay Card */}
        <div className="px-4 mb-6">
          <div
            onClick={() => handleSelect('promptpay')}
            className={`rounded-2xl border p-3.5 flex items-center justify-between transition-all cursor-pointer ${
              selectedPayment === 'promptpay'
                ? 'border-slate-800 bg-slate-50/60 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* PromptPay Icon */}
              <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
                <img 
                  src={promptPayImg} 
                  alt="PromptPay" 
                  className="w-[70px] h-[70px] object-cover" 
                />
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900 leading-tight">
                  PromptPay
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  สแกน QR คนขับเพื่อชำระเงิน
                </p>
              </div>
            </div>

            {/* Radio Button */}
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ml-2 ${
              selectedPayment === 'promptpay' 
                ? 'border-slate-900 bg-white' 
                : 'border-slate-300'
            }`}>
              {selectedPayment === 'promptpay' && (
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
              )}
            </div>
          </div>
        </div>

        {/* Section: วิธีการชำระเงินที่ผูกไว้ */}
        <div className="mb-4">
          <h2 className="text-sm font-bold text-slate-900 px-5 mb-2">
            วิธีการชำระเงินที่ผูกไว้
          </h2>

          <div className="divide-y divide-slate-100">
            {paymentOptions.map((opt) => {
              const isSelected = selectedPayment === opt.id
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {opt.icon}
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900">
                        {opt.name}
                      </h3>
                      {opt.subtitle && (
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {opt.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Radio button */}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ml-2 ${
                    isSelected 
                      ? 'border-slate-900 bg-white' 
                      : 'border-slate-300 group-hover:border-slate-400'
                  }`}>
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Full width divider line */}
        <div className="h-[1px] bg-slate-100 w-full my-4"></div>

        {/* Section: เพิ่มวิธีการชำระเงิน */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 px-5 mb-2">
            เพิ่มวิธีการชำระเงิน
          </h2>

          <div 
            onClick={() => handleSelect('card')}
            className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/80 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Plus className="w-5 h-5 text-slate-700 stroke-[2.2]" />
              <span className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                บัตรเครดิต หรือ เดบิต
              </span>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>
        </div>

      </div>

    </div>
  )
}
