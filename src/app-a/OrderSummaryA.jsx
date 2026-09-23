import React, { useState, useRef } from 'react'
import { 
  ArrowLeft, 
  HelpCircle, 
  Home as HomeIcon, 
  MapPin, 
  CreditCard, 
  Ticket, 
  Coins, 
  ChevronRight,
  Percent,
  Signal, 
  Wifi 
} from 'lucide-react'

import noodleBowlImg from '../assets/noodle_blue_bowl.jpg'
import friedWontonImg from '../assets/fried_wonton.jpg'
import waterBottleImg from '../assets/water_bottle.jpg'
import promptPayImg from '../assets/payment/PromptPay.png'
import payWalletImg from '../assets/payment/PayWallet.avif'
import trueMoneyImg from '../assets/payment/TrueMoney.jpg'
import cashImg from '../assets/payment/Cash.png'
import PaymentMethodA from './PaymentMethodA'
import PromotionA from './PromotionA'

export default function OrderSummaryA({ 
  restaurant,
  cart = [], 
  setCart, 
  onBack, 
  onAddItem, 
  onConfirmOrder 
}) {
  const defaultFallbackItem = {
    id: 'item-2',
    name: 'ก๋วยเตี๋ยวหมูธรรมดา',
    price: 60,
    quantity: 1,
    noodle: 'เส้นบะหมี่',
    veg: 'ไม่ผัก',
    image: noodleBowlImg
  }

  const [deliverySpeed, setDeliverySpeed] = useState('standard') // 'express' | 'standard' | 'saver' | 'preorder'
  const [deliveryMode, setDeliveryMode] = useState('delivery') // 'delivery' | 'pickup'
  const [useCoins, setUseCoins] = useState(false)
  const [fallbackQty, setFallbackQty] = useState(1)
  const [selectedPayment, setSelectedPayment] = useState('cash')
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false)
  const [selectedPromos, setSelectedPromos] = useState(['promo-20'])
  const [isPromotionOpen, setIsPromotionOpen] = useState(false)

  // Track window scroll position when opening overlay on mobile (< 640px)
  const savedScrollY = useRef(0)

  const handleOpenPaymentMethod = () => {
    savedScrollY.current = window.scrollY || document.documentElement.scrollTop || 0
    setIsPaymentMethodOpen(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleClosePaymentMethod = () => {
    setIsPaymentMethodOpen(false)
    setTimeout(() => {
      window.scrollTo({ top: savedScrollY.current, behavior: 'instant' })
    }, 10)
  }

  const handleOpenPromotion = () => {
    savedScrollY.current = window.scrollY || document.documentElement.scrollTop || 0
    setIsPromotionOpen(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleClosePromotion = () => {
    setIsPromotionOpen(false)
    setTimeout(() => {
      window.scrollTo({ top: savedScrollY.current, behavior: 'instant' })
    }, 10)
  }

  const [wontonAdded, setWontonAdded] = useState(false)
  const [waterAdded, setWaterAdded] = useState(false)

  // Use actual cart items if available, otherwise default fallback
  const displayItems = cart.length > 0 
    ? cart 
    : [{ ...defaultFallbackItem, quantity: fallbackQty }]

  const isWontonInCart = cart.some(i => i.id === 'addon-wonton' || i.name === 'เกี๊ยวทอด') || wontonAdded
  const isWaterInCart = cart.some(i => i.id === 'addon-water' || i.name === 'น้ำเปล่า') || waterAdded

  const handleUpdateQuantity = (itemId, delta) => {
    if (setCart && cart.length > 0) {
      setCart((prev) => {
        const item = prev.find((i) => i.id === itemId)
        if (!item) return prev
        const newQty = (item.quantity || 1) + delta
        if (newQty <= 0) {
          // If only 1 item in cart, keep at minimum 1
          if (prev.length === 1) {
            return prev.map((i) => (i.id === itemId ? { ...i, quantity: 1 } : i))
          }
          // If multiple items, remove this item
          return prev.filter((i) => i.id !== itemId)
        }
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i))
      })
    } else {
      setFallbackQty((q) => Math.max(1, q + delta))
    }
  }

  const handleToggleAddon = (type) => {
    if (type === 'wonton') {
      if (setCart) {
        setCart(prev => {
          const base = prev.length > 0 ? prev : [{ ...defaultFallbackItem, quantity: fallbackQty }]
          const exists = base.some(i => i.id === 'addon-wonton' || i.name === 'เกี๊ยวทอด')
          if (exists) {
            return base.filter(i => i.id !== 'addon-wonton' && i.name !== 'เกี๊ยวทอด')
          }
          return [...base, {
            id: 'addon-wonton',
            name: 'เกี๊ยวทอด',
            price: 30,
            quantity: 1,
            image: friedWontonImg,
            options: 'ทอดกรอบ'
          }]
        })
      } else {
        setWontonAdded(prev => !prev)
      }
    } else if (type === 'water') {
      if (setCart) {
        setCart(prev => {
          const base = prev.length > 0 ? prev : [{ ...defaultFallbackItem, quantity: fallbackQty }]
          const exists = base.some(i => i.id === 'addon-water' || i.name === 'น้ำเปล่า')
          if (exists) {
            return base.filter(i => i.id !== 'addon-water' && i.name !== 'น้ำเปล่า')
          }
          return [...base, {
            id: 'addon-water',
            name: 'น้ำเปล่า',
            price: 15,
            quantity: 1,
            image: waterBottleImg,
            options: 'เย็น'
          }]
        })
      } else {
        setWaterAdded(prev => !prev)
      }
    }
  }

  // Prices calculation based on items
  const foodTotal = displayItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0)
    + (cart.length === 0 && wontonAdded && !displayItems.some(i => i.id === 'addon-wonton') ? 30 : 0)
    + (cart.length === 0 && waterAdded && !displayItems.some(i => i.id === 'addon-water') ? 15 : 0)

  const deliveryFee = deliverySpeed === 'express' ? 36 : deliverySpeed === 'standard' ? 18 : 0
  const discountFee = deliverySpeed === 'standard' ? -18 : 0
  const grandTotal = Math.max(0, foodTotal + deliveryFee + discountFee - (useCoins ? 34 : 0))

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

      {/* Top Header Bar */}
      <div className="px-4 py-3 bg-white flex items-center justify-between border-b border-slate-100 shrink-0 z-20">
        <button
          onClick={onBack}
          aria-label="ย้อนกลับ"
          className="p-1 -ml-1 text-slate-900 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        <h1 className="text-base font-bold text-slate-900">
          รายละเอียดคำสั่งซื้อ
        </h1>

        <button 
          aria-label="ช่วยเหลือ"
          className="p-1 -mr-1 text-slate-900 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-5 h-5 stroke-[2]" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32 space-y-5 scrollbar-none">
        
        {/* Order Summary Card */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">สรุปคำสั่งซื้อ</h2>
              {restaurant?.name && (
                <p className="text-[11px] text-slate-500 font-medium truncate max-w-[220px]">
                  {restaurant.name}
                </p>
              )}
            </div>
            <button 
              onClick={onAddItem}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              เพิ่มรายการ
            </button>
          </div>

          <div className="border border-slate-200/90 rounded-2xl p-3 bg-white divide-y divide-slate-100">
            {displayItems.map((item, idx) => {
              const itemPrice = item.price || 60
              const itemQty = item.quantity || 1
              const itemTotal = itemPrice * itemQty
              const optionsText = [item.noodle, item.veg].filter(Boolean).join(' , ') || item.options || (item.id === 'item-2' ? 'เส้นบะหมี่ , ไม่ผัก' : '')

              return (
                <div key={item.id || idx} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                  <img
                    src={item.image || noodleBowlImg}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {item.name}
                    </h3>
                    {optionsText && (
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        {optionsText}
                      </p>
                    )}
                    <div className="inline-flex items-center gap-2 bg-slate-100 px-2 py-0.5 rounded-lg text-xs font-bold text-slate-700 mt-1.5">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="hover:text-slate-900 cursor-pointer px-1 py-0.5"
                      >
                        -
                      </button>
                      <span className="min-w-[12px] text-center">{itemQty}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="hover:text-slate-900 cursor-pointer px-1 py-0.5"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-slate-900 self-start mt-1 shrink-0">
                    ฿{itemTotal}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Discount unlocked hint */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 flex items-center gap-2 text-xs text-slate-500 mt-2.5">
            <Percent className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>
              {foodTotal >= 91 
                ? 'ปลดล็อกส่วนลด ฿10 เรียบร้อยแล้ว' 
                : `สั่งเพิ่ม ฿${91 - foodTotal} เพื่อปลดล็อกส่วนลด ฿10`}
            </span>
          </div>
        </div>

        {/* Recommended Add-ons */}
        <div>
          <h2 className="text-xs font-bold text-slate-700 mb-2">รายการแนะนำ</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Wonton */}
            <div className="border border-slate-200/80 rounded-2xl p-2.5 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={friedWontonImg}
                  alt="เกี๊ยวทอด"
                  className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">เกี๊ยวทอด</h4>
                  <p className="text-[11px] text-slate-500">฿30</p>
                </div>
              </div>
              <button 
                onClick={() => handleToggleAddon('wonton')}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors cursor-pointer shrink-0 ml-1 ${
                  isWontonInCart ? 'bg-[#269D3C] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isWontonInCart ? '✓' : '+'}
              </button>
            </div>

            {/* Water */}
            <div className="border border-slate-200/80 rounded-2xl p-2.5 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={waterBottleImg}
                  alt="น้ำเปล่า"
                  className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">น้ำเปล่า</h4>
                  <p className="text-[11px] text-slate-500">฿15</p>
                </div>
              </div>
              <button 
                onClick={() => handleToggleAddon('water')}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors cursor-pointer shrink-0 ml-1 ${
                  isWaterInCart ? 'bg-[#269D3C] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isWaterInCart ? '✓' : '+'}
              </button>
            </div>
          </div>
        </div>

        {/* Cost Breakdown Card */}
        <div className="border border-slate-200/80 rounded-2xl p-3.5 bg-white space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span>รวมค่าอาหาร</span>
            <span className="font-semibold text-slate-900">฿{foodTotal}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>ค่าจัดส่ง</span>
            <span className="font-semibold text-slate-900">฿{deliveryFee}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>ส่วนลด</span>
            <span className="font-semibold text-slate-900">{discountFee === 0 ? '฿0' : `-฿${Math.abs(discountFee)}`}</span>
          </div>
          <div className="border-t border-slate-100 pt-2 flex items-center justify-between font-bold text-sm text-slate-900">
            <span>รวมทั้งหมด</span>
            <span className="font-extrabold">฿{grandTotal}</span>
          </div>
        </div>

        {/* Delivery / Pick-up Mode Switcher */}
        <div className="flex gap-2">
          <button
            onClick={() => setDeliveryMode('delivery')}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
              deliveryMode === 'delivery'
                ? 'bg-slate-200 text-slate-900'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            จัดส่ง
          </button>
          <button
            onClick={() => setDeliveryMode('pickup')}
            className={`flex-1 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
              deliveryMode === 'pickup'
                ? 'bg-slate-200 text-slate-900'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            รับที่ร้าน
          </button>
        </div>

        {/* Address Info */}
        <div className="space-y-3 px-1">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
              <HomeIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">บ้านโดเรมอน</h3>
              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                บ้านโดเรมอน มีโนบิตะ ชิซูกะ ไจแอ้น หม่าม๊า ปะป๊า
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 leading-tight">
                บ้านอยู่ข้างสนามบินสุวรรณภูมิ <br />
                เสียงเครื่องบินดังนิดหน่อย แต่ชินแล้ว
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Speed Options */}
        <div>
          <h2 className="text-xs font-bold text-slate-900 mb-2.5">ตัวเลือกการจัดส่ง</h2>
          <div className="space-y-2">
            
            {/* Express */}
            <div
              onClick={() => setDeliverySpeed('express')}
              className={`rounded-2xl p-3 border transition-all cursor-pointer flex items-center justify-between ${
                deliverySpeed === 'express'
                  ? 'border-2 border-slate-900 bg-white'
                  : 'border-slate-200/90 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <h4 className="text-xs font-bold text-slate-900">ส่งไว (Express) · 22 นาที</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">การันตีส่งตรงเวลา</p>
              </div>
              <span className="text-xs font-bold text-slate-900">฿36</span>
            </div>

            {/* Standard (Selected in Screenshot) */}
            <div
              onClick={() => setDeliverySpeed('standard')}
              className={`rounded-2xl p-3 border transition-all cursor-pointer flex items-center justify-between ${
                deliverySpeed === 'standard'
                  ? 'border-2 border-slate-900 bg-white shadow-xs'
                  : 'border-slate-200/90 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <h4 className="text-xs font-bold text-slate-900">มาตรฐาน · 33 นาที</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">รับส่วนลดกรณีคำสั่งซื้อมาส่งล่าช้า</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900">฿9</span>
                <span className="text-xs text-slate-400 line-through">฿19</span>
              </div>
            </div>

            {/* Saver */}
            <div
              onClick={() => setDeliverySpeed('saver')}
              className={`rounded-2xl p-3 border transition-all cursor-pointer flex items-center justify-between ${
                deliverySpeed === 'saver'
                  ? 'border-2 border-slate-900 bg-white'
                  : 'border-slate-200/90 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <h4 className="text-xs font-bold text-slate-900">ส่งถูก (Saver) · 43 นาที</h4>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900">ฟรี</span>
                <span className="text-xs text-slate-400 line-through">฿9</span>
              </div>
            </div>

            {/* Preorder */}
            <div
              onClick={() => setDeliverySpeed('preorder')}
              className={`rounded-2xl p-3 border transition-all cursor-pointer flex items-center justify-between ${
                deliverySpeed === 'preorder'
                  ? 'border-2 border-slate-900 bg-white'
                  : 'border-slate-200/90 bg-white hover:border-slate-300'
              }`}
            >
              <h4 className="text-xs font-bold text-slate-900">สั่งล่วงหน้า</h4>
            </div>

          </div>
        </div>

        {/* Payment Method */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-slate-900">วิธีการชำระเงิน</h2>
            <button 
              onClick={handleOpenPaymentMethod}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              ดูทั้งหมด
            </button>
          </div>
          <div 
            onClick={handleOpenPaymentMethod}
            className="border border-slate-200/90 rounded-2xl p-3 bg-slate-50/80 flex items-center justify-between cursor-pointer hover:bg-slate-100/90 transition-colors"
          >
            <div className="flex items-center gap-3">
              {(() => {
                switch (selectedPayment) {
                  case 'wallet':
                    return (
                      <>
                        <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center shrink-0 border border-slate-100 shadow-2xs bg-white">
                          <img src={payWalletImg} alt="Pay Wallet" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-bold text-slate-900">Pay Wallet</span>
                      </>
                    )
                  case 'promptpay':
                    return (
                      <>
                        <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
                          <img src={promptPayImg} alt="PromptPay" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-bold text-slate-900">PromptPay</span>
                      </>
                    )
                  case 'truemoney':
                    return (
                      <>
                        <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center shrink-0 border border-slate-100 shadow-2xs p-0.5 bg-white">
                          <img src={trueMoneyImg} alt="TrueMoney" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xs font-bold text-slate-900">TrueMoney</span>
                      </>
                    )
                  case 'card':
                    return (
                      <>
                        <CreditCard className="w-5 h-5 text-slate-800" />
                        <span className="text-xs font-bold text-slate-900">บัตรเครดิต หรือ เดบิต</span>
                      </>
                    )
                  case 'cash':
                  default:
                    return (
                      <>
                        <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
                          <img src={cashImg} alt="เงินสด" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-bold text-slate-900">เงินสด</span>
                      </>
                    )
                }
              })()}
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Privileges and Discounts */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-900">สิทธิพิเศษและส่วนลด</h2>
          
          <div 
            onClick={handleOpenPromotion}
            className="flex items-center justify-between py-1 cursor-pointer hover:bg-slate-50/80 rounded-lg px-1 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <Ticket className="w-4 h-4 text-slate-700 group-hover:text-[#269D3C] transition-colors" />
              <span className="text-xs text-slate-800 font-medium group-hover:text-slate-900 transition-colors">
                {selectedPromos.length > 0 ? `ใช้แล้ว ${selectedPromos.length} โปรโมชัน` : 'เลือกโปรโมชัน'}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </div>

          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2.5">
              <Coins className="w-4 h-4 text-slate-700" />
              <span className="text-xs text-slate-800 font-medium">680 Coins (ลด ฿34)</span>
            </div>
            <button
              onClick={() => setUseCoins(!useCoins)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                useCoins ? 'bg-[#269D3C]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-0.5 ${
                  useCoins ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Rewards Earned */}
        <div>
          <h2 className="text-xs font-bold text-slate-900 mb-1.5">ได้รับจากคำสั่งซื้อนี้</h2>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Coins className="w-4 h-4 text-slate-400" />
            <span>39 Coins (~ ฿2)</span>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Order Confirmation Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-3 z-30 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-900">
          <span>รวมทั้งหมด</span>
          <span className="text-base font-extrabold">฿{grandTotal}</span>
        </div>

        <button
          onClick={onConfirmOrder}
          id="confirm-order-btn"
          className="w-full bg-[#269D3C] hover:bg-[#15803d] active:scale-[0.99] text-white py-3.5 px-4 rounded-2xl font-bold text-sm shadow-md shadow-[#269D3C]/20 transition-all cursor-pointer text-center"
        >
          ยืนยันคำสั่งซื้อ
        </button>
      </div>

      {/* Payment Method Screen Overlay (keeps scroll position intact on mobile & desktop) */}
      {isPaymentMethodOpen && (
        <div className="fixed inset-0 sm:absolute sm:inset-0 z-50 bg-white flex flex-col">
          <PaymentMethodA
            selectedPayment={selectedPayment}
            onSelectPayment={(id) => {
              setSelectedPayment(id)
            }}
            onBack={handleClosePaymentMethod}
            isOverlay={true}
          />
        </div>
      )}

      {/* Promotion Screen Overlay (keeps scroll position intact on mobile & desktop) */}
      {isPromotionOpen && (
        <div className="fixed inset-0 sm:absolute sm:inset-0 z-50 bg-white flex flex-col">
          <PromotionA
            selectedPromoIds={selectedPromos}
            onApplyPromotions={(promos) => {
              setSelectedPromos(promos)
              handleClosePromotion()
            }}
            onBack={handleClosePromotion}
            isOverlay={true}
          />
        </div>
      )}

    </div>
  )
}
