import React, { useState } from 'react'
import { 
  X, 
  Minus, 
  Plus,
  Signal, 
  Wifi 
} from 'lucide-react'

import noodleBowlImg from '../assets/noodle_blue_bowl.jpg'

export default function MenuItemDetailA({ item, onClose, onAddToCart }) {
  const [selectedNoodle, setSelectedNoodle] = useState(null) // 'เส้นเล็ก' | 'เส้นบะหมี่' | 'เส้นใหญ่'
  const [selectedVeg, setSelectedVeg] = useState(null) // 'ผัก' | 'ไม่ผัก'
  const [notes, setNotes] = useState('')
  const [quantity, setQuantity] = useState(1)

  const noodleOptions = ['เส้นเล็ก', 'เส้นบะหมี่', 'เส้นใหญ่']
  const vegOptions = ['ผัก', 'ไม่ผัก']

  const itemName = item?.name || 'ก๋วยเตี๋ยวหมูธรรมดา'
  const basePrice = item?.price || 60
  const itemImage = (item?.id === 'item-2' || !item) ? noodleBowlImg : item.image
  const totalPrice = basePrice * quantity

  // Check if required options are chosen
  const isReady = selectedNoodle !== null && selectedVeg !== null

  const handleAdd = () => {
    if (!isReady) return
    if (onAddToCart) {
      onAddToCart({
        id: item?.id || 'item-2',
        name: itemName,
        price: basePrice,
        quantity,
        noodle: selectedNoodle,
        veg: selectedVeg,
        notes,
        image: itemImage
      })
    }
  }

  return (
    <div className="w-full sm:max-w-[420px] mx-auto bg-white min-h-screen sm:min-h-[880px] sm:max-h-[920px] sm:rounded-[44px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 flex flex-col relative overflow-hidden text-slate-900 select-none">
      
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

      {/* Close Button Header */}
      <div className="px-4 py-2 bg-white flex items-center shrink-0 z-20">
        <button
          onClick={onClose}
          aria-label="ปิด"
          className="p-1 -ml-1 text-slate-900 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6 stroke-[2.4]" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-6 scrollbar-none">
        
        {/* Food Hero Image */}
        <div className="w-full bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-3">
          <div className="w-full max-w-[340px] aspect-[4/3] rounded-2xl overflow-hidden">
            <img
              src={itemImage}
              alt={itemName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title, Description & Price */}
        <div className="px-5 pt-2 pb-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {itemName}
            </h1>
            <span className="text-xl font-extrabold text-slate-900 shrink-0">
              ฿{basePrice}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            ก๋วยเตี๋ยวหมูชิ้นเบิ้ม ๆ อร่อยมากกกกกกกกกกกกกกก
          </p>
        </div>

        <div className="h-[1px] bg-slate-100 w-full mb-4"></div>

        {/* Option Group 1: เลือกเส้น */}
        <div className="px-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-900">เลือกเส้น</h2>
            <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
              เลือกสูงสุด 1
            </span>
          </div>

          <div className="space-y-3">
            {noodleOptions.map((opt) => {
              const isSelected = selectedNoodle === opt
              return (
                <div
                  key={opt}
                  onClick={() => setSelectedNoodle(opt)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'border-[#269D3C] bg-[#269D3C]' 
                        : 'border-slate-400 group-hover:border-slate-600'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-sm text-slate-800 font-medium">
                    {opt}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="h-[1px] bg-slate-100 w-full mb-4"></div>

        {/* Option Group 2: เลือกผัก */}
        <div className="px-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-slate-900">เลือกผัก</h2>
            <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
              เลือกสูงสุด 1
            </span>
          </div>

          <div className="space-y-3">
            {vegOptions.map((opt) => {
              const isSelected = selectedVeg === opt
              return (
                <div
                  key={opt}
                  onClick={() => setSelectedVeg(opt)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'border-[#269D3C] bg-[#269D3C]' 
                        : 'border-slate-400 group-hover:border-slate-600'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-sm text-slate-800 font-medium">
                    {opt}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="h-[1px] bg-slate-100 w-full mb-4"></div>

        {/* Special Instructions: หมายเหตุถึงร้านอาหาร */}
        <div className="px-5 mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-bold text-slate-900">หมายเหตุถึงร้านอาหาร</h2>
            <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
              ไม่จำเป็นต้องระบุ
            </span>
          </div>

          <div className="border border-slate-200 rounded-2xl p-3 focus-within:border-slate-400 focus-within:ring-1 focus-within:ring-slate-300 transition-all">
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="ระบุรายละเอียดคำขอ (ขึ้นอยู่กับดุลยพินิจของร้าน)"
              className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none resize-none bg-transparent"
            />
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-full bg-slate-300 text-white flex items-center justify-center hover:bg-slate-400 active:scale-95 transition-all cursor-pointer"
          >
            <Minus className="w-4 h-4 stroke-[3]" />
          </button>

          <span className="text-base font-bold text-slate-900 w-6 text-center">
            {quantity}
          </span>

          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-8 h-8 rounded-full bg-[#269D3C] text-white flex items-center justify-center hover:bg-[#15803d] active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <div className="px-5">
          <button
            onClick={handleAdd}
            disabled={!isReady}
            className={`w-full py-3.5 px-4 rounded-2xl text-center font-bold text-sm transition-all duration-200 ${
              isReady 
                ? 'bg-[#269D3C] hover:bg-[#15803d] text-white cursor-pointer shadow-md shadow-[#269D3C]/20 active:scale-[0.99]'
                : 'bg-slate-300 text-white cursor-not-allowed'
            }`}
          >
            เพิ่มไปยังตะกร้า - ฿{totalPrice}
          </button>
        </div>

      </div>

    </div>
  )
}
