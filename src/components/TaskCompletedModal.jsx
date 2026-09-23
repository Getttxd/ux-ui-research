import React from 'react'
import { CheckCircle2, Clock, RotateCcw, ArrowRight, Sparkles, Trophy } from 'lucide-react'

export default function TaskCompletedModal({ 
  appType = 'appA', 
  timeMs = 0, 
  allResults = { appA: null, appB: null },
  onClose, 
  onRetry 
}) {
  const seconds = (timeMs / 1000).toFixed(2)
  const isAppA = appType === 'appA'

  const otherAppTime = isAppA ? allResults.appB : allResults.appA
  const otherAppSeconds = otherAppTime ? (otherAppTime / 1000).toFixed(2) : null
  const diffSec = otherAppTime ? (Math.abs(timeMs - otherAppTime) / 1000).toFixed(2) : null

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 select-none">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${isAppA ? 'from-blue-500 to-indigo-600' : 'from-orange-500 to-amber-500'}`}></div>

        {/* Trophy / Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-sm">
          <Trophy className="w-8 h-8 stroke-[2.2]" />
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          🎉 สั่งอาหารสำเร็จ!
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-5">
          ระบบหยุดจับเวลาและบันทึกผลการทดสอบเรียบร้อยแล้ว
        </p>

        {/* Time Card */}
        <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 sm:p-5 mb-5 flex flex-col items-center justify-center">
          <span className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            เวลาที่ใช้ (Time on Task)
          </span>

          <div className="flex items-baseline gap-1 text-slate-900 my-1">
            <span className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-emerald-600">
              {seconds}
            </span>
            <span className="text-base font-bold text-slate-600">วินาที</span>
          </div>

          <span className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full text-xs font-bold ${
            isAppA ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
          }`}>
            {isAppA ? 'แอปพลิเคชันแบบ A (Standard Flow)' : 'แอปพลิเคชันแบบ B (Streamlined Flow)'}
          </span>
        </div>

        {/* Comparison Note if both are available */}
        {otherAppSeconds && (
          <div className="w-full bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 text-left mb-5 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">ข้อมูลเปรียบเทียบ:</p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                อีกรูปแบบใช้เวลา {otherAppSeconds} วินาที (แตกต่างกัน {diffSec} วินาที)
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full space-y-2.5">
          <button
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <span>บันทึกและกลับสู่หน้าหลัก</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onRetry}
            className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ทดสอบรอบนี้ใหม่อีกครั้ง</span>
          </button>
        </div>

      </div>
    </div>
  )
}
