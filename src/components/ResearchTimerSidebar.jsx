import React from 'react'
import { CheckCircle2, Clock, RotateCcw, ArrowRight, Sparkles, Trophy, Timer } from 'lucide-react'

export default function ResearchTimerSidebar({ 
  appType = 'appA', 
  elapsedMs = 0, 
  isRunning = false,
  isCompleted = false,
  allResults = { appA: null, appB: null },
  onBackToHome, 
  onRetry 
}) {
  const seconds = (elapsedMs / 1000).toFixed(2)
  const isAppA = appType === 'appA'

  const otherAppTime = isAppA ? allResults.appB : allResults.appA
  const otherAppSeconds = otherAppTime ? (otherAppTime / 1000).toFixed(2) : null
  const diffSec = (isCompleted && otherAppTime) 
    ? (Math.abs(elapsedMs - otherAppTime) / 1000).toFixed(2) 
    : null

  return (
    <div className="w-full max-w-[340px] bg-slate-950/80 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-800 text-white shadow-2xl flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Top Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Timer className="w-4 h-4 text-orange-400" />
            </div>
            <span className="text-xs font-bold text-slate-300">
              ระบบจับเวลาวิจัย (UX/UI Timer)
            </span>
          </div>

          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
            isCompleted 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : isRunning 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
              : 'bg-slate-800 text-slate-400'
          }`}>
            {isCompleted ? 'บันทึกสำเร็จ ✓' : isRunning ? 'กำลังจับเวลา...' : 'เตรียมพร้อม'}
          </span>
        </div>

        {/* Target App Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
            isAppA 
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
              : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
          }`}>
            {isAppA ? 'แอปพลิเคชันแบบ A (Standard Flow)' : 'แอปพลิเคชันแบบ B (Streamlined Flow)'}
          </span>
        </div>

        {/* Big Stopwatch Display */}
        <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-5 border border-slate-800 text-center mb-5">
          <span className="text-[11px] font-medium text-slate-400 block mb-1">
            {isCompleted ? 'เวลาที่ใช้ในการสั่งอาหารสำเร็จ' : 'เวลาที่ใช้ไปในขณะนี้'}
          </span>
          <div className="flex items-baseline justify-center gap-1.5">
            <span className={`font-mono text-4xl sm:text-5xl font-black tracking-tight ${
              isCompleted 
                ? 'text-emerald-400' 
                : 'text-amber-400'
            }`}>
              {seconds}
            </span>
            <span className="text-sm font-bold text-slate-400">วินาที</span>
          </div>
        </div>

        {/* Success Card (When Completed) */}
        {isCompleted && (
          <div className="space-y-3 mb-5 animate-in fade-in duration-300">
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-start gap-2.5">
              <Trophy className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-300">
                  ทำภารกิจสั่งซื้อสำเร็จ!
                </h4>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                  ระบบหยุดเวลาเรียบร้อยเมื่อกดยืนยันคำสั่งซื้อ สามารถดูสถานะในจอโทรศัพท์ได้
                </p>
              </div>
            </div>

            {/* Comparison if both apps done */}
            {otherAppSeconds && (
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl text-xs text-slate-300">
                <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ข้อมูลเปรียบเทียบ</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  อีกรูปแบบใช้เวลา {otherAppSeconds} วินาที (แตกต่างกัน {diffSec} วินาที)
                </p>
              </div>
            )}
          </div>
        )}

        {/* Ongoing hint (When running) */}
        {!isCompleted && (
          <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-[11px] text-slate-400 space-y-1 mb-5">
            <p className="font-semibold text-slate-300">💡 ภารกิจสำหรับผู้ทดสอบ:</p>
            <p>1. กดค้นหาหรือเลือกร้าน &quot;ยำแซ่บตำนัว&quot;</p>
            <p>2. สั่งก๋วยเตี๋ยวหมูธรรมดา</p>
            <p>3. กดยืนยันคำสั่งซื้อเพื่อหยุดเวลา</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="space-y-2 pt-2">
        {isCompleted ? (
          <>
            <button
              onClick={onBackToHome}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <span>บันทึกผลและกลับหน้าหลัก</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onRetry}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ทดสอบรอบนี้ใหม่อีกครั้ง</span>
            </button>
          </>
        ) : (
          <button
            onClick={onBackToHome}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>ยกเลิกและกลับหน้าหลัก</span>
          </button>
        )}
      </div>
    </div>
  )
}
