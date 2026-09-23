import React from 'react'
import { 
  Sparkles, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  UtensilsCrossed, 
  Smartphone, 
  Zap,
  Info
} from 'lucide-react'

export default function Home({ onSelectApp }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50/30 to-slate-100 py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full">
        {/* Top Header Badge */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 text-orange-700 border border-orange-200/70 text-xs sm:text-sm font-semibold mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-orange-600 animate-pulse" />
            <span>โครงการวิจัย UX/UI Design • Food Delivery Usability Study</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl">
            การทดสอบเปรียบเทียบประสิทธิภาพ <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600">
              แอปพลิเคชันสั่งอาหาร 2 รูปแบบ
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
            ยินดีต้อนรับสู่แบบทดสอบความยากง่ายในการใช้งาน (Usability Testing) 
            เพื่อศึกษาว่าการออกแบบในรูปแบบใดช่วยให้ผู้ใช้สั่งอาหารได้สะดวกและตอบโจทย์ที่สุด
          </p>
        </div>

        {/* Instruction Steps */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 sm:p-6 mb-10 shadow-sm">
          <div className="flex items-center gap-2.5 text-slate-800 font-bold text-base mb-4">
            <Info className="w-5 h-5 text-orange-500" />
            <h3>ขั้นตอนและคำชี้แจงสำหรับผู้ทดสอบ</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-800">เลือกรูปแบบที่ต้องการ</p>
                <p className="text-slate-500 text-xs mt-0.5">กดเลือกเข้าใช้งาน Demo App A หรือ Demo App B ด้านล่าง</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="font-semibold text-slate-800">ทดลองใช้งานและสั่งอาหาร</p>
                <p className="text-slate-500 text-xs mt-0.5">ค้นหาและกดสั่งอาหารตามภารกิจที่กำหนดให้เสร็จสมบูรณ์</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="font-semibold text-slate-800">เปรียบเทียบผลลัพธ์</p>
                <p className="text-slate-500 text-xs mt-0.5">ทดสอบทั้งสองรูปแบบเพื่อเปรียบเทียบประสบการณ์การใช้งาน</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Main Action Cards (Buttons to App A & App B) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card A */}
          <div className="group relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 hover:border-blue-500 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110 duration-300"></div>

            <div className="relative z-10">
              {/* Badge & Title */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                  <Layers className="w-3.5 h-3.5" />
                  รูปแบบที่ 1 (Design A)
                </span>
                <span className="text-xs font-medium text-slate-400">Demo App A</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    แอปพลิเคชันแบบ A
                  </h2>
                  <p className="text-xs text-slate-500">ดีไซน์โครงสร้างแบบทั่วไป (Standard Flow)</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 mt-3 mb-6 leading-relaxed">
                ออกแบบโดยเน้นการจัดหมวดหมู่แบบดั้งเดิม การค้นหาตามขั้นตอนมาตรฐาน เหมาะสำหรับประเมินพฤติกรรมการใช้งานทั่วไป
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>โครงสร้างเมนูและเลย์เอาต์แบบมาตรฐาน</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>ระบบตัวกรองและการค้นหาตามหมวดหมู่</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>ขั้นตอนสั่งอาหารแบบทีละขั้นตอน (Multi-step)</span>
                </div>
              </div>
            </div>

            {/* Launch Button A */}
            <button
              id="start-demo-a-btn"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
                onSelectApp('appA')
              }}
              className="relative z-10 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer active:scale-[0.99]"
            >
              <span>เข้าใช้งานแอปพลิเคชันแบบ A</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>

          {/* Card B */}
          <div className="group relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 hover:border-orange-500 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110 duration-300"></div>

            <div className="relative z-10">
              {/* Badge & Title */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">
                  <Zap className="w-3.5 h-3.5" />
                  รูปแบบที่ 2 (Design B)
                </span>
                <span className="text-xs font-medium text-slate-400">Demo App B</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-500/25">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    แอปพลิเคชันแบบ B
                  </h2>
                  <p className="text-xs text-slate-500">ดีไซน์โครงสร้างแบบปรับปรุง (Streamlined Flow)</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 mt-3 mb-6 leading-relaxed">
                ออกแบบโดยเน้นการจัดหมวดหมู่แบบดั้งเดิม การค้นหาตามขั้นตอนมาตรฐาน เหมาะสำหรับประเมินพฤติกรรมการใช้งานทั่วไป
              </p>

              {/* Highlights */}
              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>การจัดวางเมนูแบบทันที (Quick-access Layout)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>ระบบสั่งซื้อด่วนและสรุปยอดในหน้าเดียว (1-Screen Summary)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>ลดจำนวนการแตะ/คลิกเพื่อเพิ่มความรวดเร็ว</span>
                </div>
              </div>
            </div>

            {/* Launch Button B */}
            <button
              id="start-demo-b-btn"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
                onSelectApp('appB')
              }}
              className="relative z-10 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer active:scale-[0.99]"
            >
              <span>เข้าใช้งานแอปพลิเคชันแบบ B</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>

        </div>

        {/* Research info footer */}
        <div className="mt-12 text-center text-xs text-slate-400">
          <p>โครงการวิจัยเปรียบเทียบประสิทธิภาพ UX/UI สำหรับวิจัยในรายวิชา</p>
        </div>
      </div>
    </div>
  )
}
