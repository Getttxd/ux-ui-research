import React, { useState, useEffect } from 'react'
import { ArrowLeft, Zap } from 'lucide-react'
import HomeB from '../app-b/HomeB'

export default function DemoAppB({ 
  onBack, 
  onConfirmOrder
}) {
  const [_selectedRestaurant, setSelectedRestaurant] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="min-h-screen bg-slate-900/95 sm:bg-slate-900 flex flex-col justify-start">
      {/* Top Research Header Bar */}
      <header className="bg-slate-950/85 backdrop-blur-md border-b border-slate-800 text-white sticky top-0 z-40 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            id="back-to-home-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับหน้าหลัก</span>
          </button>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <Zap className="w-3.5 h-3.5" />
              Demo App B
            </span>
          </div>
        </div>
      </header>

      {/* Main Container: Mobile Frame */}
      <main className="flex-1 p-0 sm:py-6 sm:px-4 flex justify-center items-start max-w-6xl mx-auto w-full">
        {/* The Mobile Phone */}
        <div className="w-full sm:w-[420px] sm:shrink-0 flex justify-center">
          <HomeB 
            onSelectRestaurant={(res) => setSelectedRestaurant(res)} 
            onConfirmOrder={onConfirmOrder}
          />
        </div>
      </main>
    </div>
  )
}
