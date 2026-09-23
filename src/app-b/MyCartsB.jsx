import React, { useState } from 'react'
import { 
  ArrowLeft, 
  Trash2,
  Signal, 
  Wifi 
} from 'lucide-react'

// Images of the restaurants & menu items
import storeYumImg from '../assets/cart_stores/store_yum.png'
import storeManuaMalaImg from '../assets/cart_stores/store_manua_mala.png'
import noodlePorkImg from '../assets/noodle_pork.jpg'
import noodleNormalImg from '../assets/noodle_blue_bowl.jpg'
import burgerFriesImg from '../assets/burger_fries.jpg'
import pizzaImg from '../assets/pizza.jpg'
import yumTalayImg from '../assets/yum_talay.jpg'
import lookchinPingImg from '../assets/lookchin_ping.jpg'

export default function MyCartsB({ 
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

  // Carts list with existing menu items from each restaurant
  const initialStores = [
    {
      id: 'yam-zaap',
      name: 'ยำแซ่บตำนัว',
      time: '43 นาที ขึ้นไป',
      distance: '8 กม.',
      notice: null,
      image: storeYumImg,
      items: [
        {
          id: 'yam-1',
          name: 'ยำทะเล',
          options: 'เผ็ดปานกลาง , ไม่ใส่ปลาร้า',
          price: 120,
          image: yumTalayImg
        }
      ]
    },
    {
      id: 'noodle-chang-phueak',
      name: 'ก๋วยเตี๋ยวต้มยำน้ำข้นช้างเผือก - รัชดา 17',
      time: '20-25 นาที',
      distance: '2.1 กม.',
      notice: null,
      image: noodlePorkImg,
      items: [
        {
          id: 'noodle-1',
          name: 'ก๋วยเตี๋ยวต้มยำน้ำข้นหมูมะนาว',
          options: 'เส้นบะหมี่ , ไม่ผัก',
          price: 60,
          image: noodleNormalImg
        },
        {
          id: 'noodle-2',
          name: 'ลูกชิ้นหมูปิ้งไม้ละ',
          options: 'น้ำจิ้มเผ็ดหวาน',
          price: 50,
          image: lookchinPingImg
        }
      ]
    },
    {
      id: 'burger-co',
      name: 'The Great Burger Co.',
      time: '15-20 นาที',
      distance: '1.5 กม.',
      notice: null,
      image: burgerFriesImg,
      items: [
        {
          id: 'burger-1',
          name: 'Double Cheeseburger & Fries',
          options: 'เนื้อวัว , ดับเบิ้ลชีส',
          price: 189,
          image: burgerFriesImg
        },
        {
          id: 'burger-2',
          name: 'Classic Bacon Burger',
          options: 'เนื้อหมู , เบคอนกรอบ',
          price: 169,
          image: burgerFriesImg
        },
        {
          id: 'burger-3',
          name: 'Crispy French Fries (L)',
          options: 'ชีสดิป',
          price: 79,
          image: burgerFriesImg
        }
      ]
    },
    {
      id: 'pizza',
      name: 'Pizza & Co. พิซซ่าเตาถ่าน',
      time: '20-25 นาที',
      distance: '2.5 กม.',
      notice: null,
      image: pizzaImg,
      items: [
        {
          id: 'pizza-1',
          name: 'Margherita Pizza พิซซ่ามาร์เกริต้า',
          options: 'แป้งบางกรอบ , ชีสมอสซาเรลล่า',
          price: 249,
          image: pizzaImg
        }
      ]
    },
    {
      id: 'manua-mala',
      name: 'มานัวส์ หม่าล่า - ตลาดจตุรมิตร',
      time: null,
      distance: '7.1 กม.',
      notice: 'ปิด • สั่งล่วงหน้าสำหรับ 26 ก.ย., 14:30 หรือหลังจากนั้น',
      image: storeManuaMalaImg,
      disabled: true,
      tag: 'ร้านปิด',
      itemCount: 2,
      items: []
    }
  ]

  const storesList = initialStores.filter(s => !removedStoreIds.includes(s.id))

  const handleDeleteStore = (storeId, e) => {
    e.stopPropagation()
    setRemovedStoreIds((prev) => [...prev, storeId])
  }

  const getStoreDisplayItems = (store) => {
    if (store.disabled) return []
    if (selectedRestaurant?.id === store.id && cart.length > 0) {
      return cart.map((c, i) => {
        const optionParts = [c.noodle, c.veg, c.soup].filter(Boolean)
        const optText = optionParts.length > 0 ? optionParts.join(' , ') : (c.options || 'ธรรมดา')
        return {
          id: c.id || `cart-${i}`,
          name: c.name,
          options: optText,
          price: c.price,
          image: c.image || store.image
        }
      })
    }
    return store.items || []
  }

  const getStoreItemCount = (store) => {
    if (store.disabled) return store.itemCount || 2
    if (selectedRestaurant?.id === store.id && currentCartCount > 0) {
      return currentCartCount
    }
    return store.items?.length || 1
  }

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
            รถเข็นของฉัน ({storesList.length}/10)
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
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-8 scrollbar-none">
        {storesList.map((store, index) => {
          const displayItems = getStoreDisplayItems(store)
          const itemCount = getStoreItemCount(store)

          const handleOpenStore = () => {
            if (store.disabled) return
            if (!isManaging) {
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
          }

          return (
            <div key={store.id}>
              {/* Store Header Card */}
              <div
                onClick={handleOpenStore}
                className={`p-3 sm:p-3.5 bg-white border border-slate-200/90 rounded-2xl flex items-center justify-between transition-all ${
                  store.disabled
                    ? 'cursor-default select-none'
                    : 'cursor-pointer group hover:border-slate-300 hover:shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* Store Food Image */}
                  <img
                    src={store.image}
                    alt={store.name}
                    className={`w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] rounded-xl object-cover bg-slate-100 shrink-0 shadow-2xs ${
                      store.disabled ? 'opacity-65' : 'group-hover:scale-102 transition-transform duration-200'
                    }`}
                  />

                  {/* Store Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className={`text-[14.5px] font-bold truncate leading-tight ${
                      store.disabled ? 'text-slate-500' : 'text-slate-900 group-hover:text-emerald-700 transition-colors'
                    }`}>
                      {store.name}
                    </h3>

                    {/* Item count, time, distance */}
                    <p className="text-[12px] text-slate-500 mt-1 truncate">
                      {itemCount} รายการ
                      {store.time ? ` • ${store.time}` : ''}
                      {store.distance ? ` • ${store.distance}` : ''}
                    </p>

                    {/* Preorder/Closed Notice */}
                    {store.notice && (
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 leading-tight">
                        {store.notice}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right side: Closed Tag or Delete Button */}
                {isManaging ? (
                  <button
                    onClick={(e) => handleDeleteStore(store.id, e)}
                    aria-label="ลบรถเข็น"
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-colors cursor-pointer shrink-0 ml-2 self-center"
                  >
                    <Trash2 className="w-5 h-5 stroke-[2]" />
                  </button>
                ) : (
                  store.tag && (
                    <div className="shrink-0 ml-3 self-center">
                      <span className="px-2 py-0.5 bg-[#FDF2F2] text-[#E05252] text-[11px] font-medium rounded-md">
                        {store.tag}
                      </span>
                    </div>
                  )
                )}
              </div>

              {/* Menu Items List Below Store Card */}
              {displayItems.length > 0 && (
                <div className="mt-3.5 space-y-3">
                  {displayItems.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={handleOpenStore}
                      className="flex items-center gap-3.5 pl-4 sm:pl-5 pr-2 cursor-pointer group/item"
                    >
                      {/* Bullet Dot */}
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0 select-none"></div>

                      {/* Item Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-xl object-cover bg-slate-100 shrink-0 shadow-2xs group-hover/item:scale-102 transition-transform duration-200"
                      />

                      {/* Item Details */}
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[13.5px] font-bold text-slate-900 leading-tight truncate group-hover/item:text-emerald-700 transition-colors">
                          {item.name}
                        </h4>
                        {item.options && (
                          <p className="text-[11.5px] text-slate-500 mt-0.5 truncate">
                            {item.options}
                          </p>
                        )}
                        <p className="text-[13px] font-bold text-slate-900 mt-0.5">
                          ฿{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Divider line between stores */}
              {index < storesList.length - 1 && (
                <div className="h-[3px] bg-slate-200/80 my-5 -mx-1 rounded-full"></div>
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
