import React, { useState } from 'react'
import { 
  ArrowLeft, 
  Trash2,
  Signal, 
  Wifi 
} from 'lucide-react'

// Images of the restaurants
import storeYumImg from '../assets/cart_stores/store_yum.png'
import storeManuaMalaImg from '../assets/cart_stores/store_manua_mala.png'
import noodlePorkImg from '../assets/noodle_pork.jpg'
import burgerFriesImg from '../assets/burger_fries.jpg'
import pizzaImg from '../assets/pizza.jpg'

export default function MyCartsA({ 
  cart = [], 
  selectedRestaurant,
  restaurants = [],
  onBack, 
  onSelectRestaurant,
  onOpenCart 
}) {
  const [isManaging, setIsManaging] = useState(false)
  const [removedStoreIds, setRemovedStoreIds] = useState([])

  // Calculate actual items count in cart
  const currentCartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

  // Carts list
  const initialStores = [
    {
      id: 'yam-zaap',
      name: 'ยำแซ่บตำนัว',
      itemCount: selectedRestaurant?.id === 'yam-zaap' && currentCartCount > 0 ? currentCartCount : 1,
      time: '43 นาที ขึ้นไป',
      distance: '8 กม.',
      notice: null,
      image: storeYumImg,
      hasDivider: true
    },
    {
      id: 'noodle-chang-phueak',
      name: 'ก๋วยเตี๋ยวต้มยำน้ำข้นช้างเผือก - รัชดา 17',
      itemCount: selectedRestaurant?.id === 'noodle-chang-phueak' && currentCartCount > 0 ? currentCartCount : 2,
      time: '20-25 นาที',
      distance: '2.1 กม.',
      notice: null,
      image: noodlePorkImg,
      hasDivider: true
    },
    {
      id: 'burger-co',
      name: 'The Great Burger Co.',
      itemCount: selectedRestaurant?.id === 'burger-co' && currentCartCount > 0 ? currentCartCount : 3,
      time: '15-20 นาที',
      distance: '1.5 กม.',
      notice: null,
      image: burgerFriesImg,
      hasDivider: true
    },
    {
      id: 'pizza',
      name: 'Pizza & Co. พิซซ่าเตาถ่าน',
      itemCount: selectedRestaurant?.id === 'pizza' && currentCartCount > 0 ? currentCartCount : 1,
      time: '20-25 นาที',
      distance: '2.5 กม.',
      notice: null,
      image: pizzaImg,
      hasDivider: true
    },
    {
      id: 'manua-mala',
      name: 'มานัวส์ หม่าล่า - ตลาดจตุรมิตร',
      itemCount: 5,
      time: null,
      distance: '7.1 กม.',
      notice: 'ปิด ∙ สั่งล่วงหน้าสำหรับ 26 ก.ย., 14:30 หรือหลังจากนั้น',
      image: storeManuaMalaImg,
      disabled: true,
      hasDivider: false
    }
  ]

  const storesList = initialStores.filter(s => !removedStoreIds.includes(s.id))

  const handleDeleteStore = (storeId, e) => {
    e.stopPropagation()
    setRemovedStoreIds((prev) => [...prev, storeId])
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

      {/* Top Header Row */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200/80 bg-white z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="ย้อนกลับ"
            className="p-1 -ml-1 text-slate-900 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>

          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            รถเข็นของฉัน
          </h1>
        </div>

        <button
          onClick={() => setIsManaging(!isManaging)}
          className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer px-1 py-0.5"
        >
          {isManaging ? 'เสร็จสิ้น' : 'จัดการ'}
        </button>
      </div>

      {/* Carts List */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 scrollbar-none">
        {storesList.map((store, index) => {
          return (
            <div key={store.id}>
              <div
                onClick={() => {
                  if (store.disabled) return // Non-clickable
                  if (!isManaging) {
                    // Find full restaurant object if available
                    const found = restaurants.find(r => r.id === store.id) || {
                      id: store.id,
                      name: store.name,
                      image: store.image,
                      rating: '4.9',
                      time: store.time || '20-25 นาที',
                      distance: store.distance,
                      deliveryFee: '฿9.00'
                    }
                    if (onSelectRestaurant) {
                      onSelectRestaurant(found)
                    } else if (onOpenCart) {
                      onOpenCart(found)
                    }
                  }
                }}
                className={`py-3.5 flex items-start justify-between rounded-xl px-1 transition-colors ${
                  store.disabled
                    ? 'opacity-60 cursor-default select-none'
                    : 'cursor-pointer group hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  {/* Store Food Image */}
                  <img
                    src={store.image}
                    alt={store.name}
                    className={`w-[66px] h-[66px] rounded-xl object-cover bg-slate-100 shrink-0 shadow-2xs transition-transform duration-200 ${
                      store.disabled ? '' : 'group-hover:scale-102'
                    }`}
                  />

                  {/* Store Details */}
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className={`text-[14.5px] font-bold text-slate-900 truncate leading-tight transition-colors ${
                      store.disabled ? '' : 'group-hover:text-emerald-700'
                    }`}>
                      {store.name}
                    </h3>

                    {/* Item count, time, distance */}
                    <p className="text-[12.5px] text-slate-500 mt-1 truncate">
                      {store.itemCount} รายการ
                      {store.time ? ` · ${store.time}` : ''}
                      {store.distance ? ` · ${store.distance}` : ''}
                    </p>

                    {/* Preorder/Closed Notice */}
                    {store.notice && (
                      <p className="text-[11.5px] text-slate-500 mt-1 line-clamp-1 leading-tight">
                        {store.notice}
                      </p>
                    )}
                  </div>
                </div>

                {/* Manage Delete Button */}
                {isManaging && (
                  <button
                    onClick={(e) => handleDeleteStore(store.id, e)}
                    aria-label="ลบรถเข็น"
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-colors cursor-pointer shrink-0 ml-2 mt-2"
                  >
                    <Trash2 className="w-5 h-5 stroke-[2]" />
                  </button>
                )}
              </div>

              {/* Exact divider line as shown in screenshot */}
              {store.hasDivider && index < storesList.length - 1 && (
                <div className="h-px bg-slate-100 my-1 -mx-2"></div>
              )}
            </div>
          )
        })}

        {storesList.length === 0 && (
          <div className="py-20 text-center text-slate-400 text-sm">
            ไม่มีรายการในรถเข็น
          </div>
        )}
      </div>

    </div>
  )
}
