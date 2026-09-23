import React, { useState } from 'react'
import { 
  ArrowLeft, 
  Heart, 
  Signal, 
  Wifi 
} from 'lucide-react'

import gojoDriverImg from '../assets/gojo_driver.jpg'
import noodlePorkImg from '../assets/noodle_pork.jpg'

export default function OrderStatusB({ onBack }) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="w-full sm:w-[420px] sm:max-w-[420px] sm:h-[920px] sm:min-h-[920px] sm:max-h-[920px] mx-auto bg-white min-h-screen sm:rounded-[44px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 flex flex-col relative overflow-hidden text-slate-900 select-none">
      
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

      {/* Top Header */}
      <div className="px-4 py-3 bg-white flex items-center gap-3 border-b border-slate-100 shrink-0 z-20">
        <button
          onClick={onBack}
          aria-label="ย้อนกลับ"
          className="p-1 -ml-1 text-slate-900 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        <h1 className="text-base font-bold text-slate-900">
          ติดตามสถานะคำสั่งซื้อ
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 scrollbar-none">
        
        {/* Delivery Time & Status */}
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-bold tracking-tight mb-2">
            ส่งแบบประหยัด
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            12:00 - 12:10
          </h2>

          <p className="text-xs text-slate-500 font-medium mt-1">
            ตรงเวลา • กำลังรอให้ร้านรับคำสั่งซื้อของคุณ
          </p>
        </div>

        {/* Step Progress Dots & Bars */}
        <div className="flex items-center gap-2 py-2">
          {/* Step 1: Active */}
          <div className="w-3 h-3 rounded-full bg-slate-900 shrink-0"></div>
          <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>

          {/* Step 2 */}
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200 shrink-0"></div>
          <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>

          {/* Step 3 */}
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200 shrink-0"></div>
          <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>

          {/* Step 4 */}
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200 shrink-0"></div>
        </div>

        {/* Driver / Rider Card */}
        <div className="flex items-center gap-3 py-1">
          <img
            src={gojoDriverImg}
            alt="คุณโกโจ ซาโตรุ"
            className="w-13 h-13 rounded-2xl object-cover bg-slate-200 shadow-xs shrink-0"
          />
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-900 truncate">
              คุณโกโจ ซาโตรุ (พนักงานส่งอาหาร)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              กำลังเตรียมจัดส่งให้คุณ
            </p>
          </div>
        </div>

        <div className="h-[1px] bg-slate-100 w-full"></div>

        {/* VIP Membership Thank You Card */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white text-[9px] font-black tracking-wider">
              VIP
            </span>
            <h4 className="text-xs font-bold text-slate-900">
              ขอบคุณที่สั่งซื้อ!
            </h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            อย่าลืมสะสมยอดต่อ เพื่อขึ้นเป็นสมาชิก VIP และรับสิทธิ์ส่งฟรีเพิ่มเติมในครั้งถัดไป
          </p>
        </div>

        {/* Nearby Recommendations */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3">
            ร้านอาหารแนะนำใกล้คุณ
          </h3>

          <div className="border border-slate-200 rounded-2xl p-3 flex items-center justify-between bg-white shadow-xs hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={noodlePorkImg}
                alt="ก๋วยเตี๋ยวต้มยำน้ำข้นช้างเผือก"
                className="w-13 h-13 rounded-xl object-cover bg-slate-100 shrink-0"
              />
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  ก๋วยเตี๋ยวต้มยำน้ำข้นช้างเผือก - รัชดา 17
                </h4>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                  บันทึกร้านนี้เป็นรายการโปรดได้นะ <br />
                  สั่งครั้งหน้าจะได้หาง่าย
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label="บันทึกรายการโปรด"
              className="p-2 -mr-1 text-slate-400 hover:text-red-500 transition-colors cursor-pointer shrink-0"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'stroke-[1.8]'}`} />
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
