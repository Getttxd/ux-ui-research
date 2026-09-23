import React, { useState } from 'react'
import { 
  ArrowLeft, 
  Share2, 
  Star, 
  Users, 
  Calendar, 
  Tag, 
  Plus, 
  Check,
  Signal, 
  Wifi 
} from 'lucide-react'

// Food images
import yumSeafoodHero from '../assets/yum_seafood.jpg'
import yumTalayImg from '../assets/yum_talay.jpg'
import noodlePorkImg from '../assets/noodle_pork.jpg'
import noodleNormal from '../assets/noodle_blue_bowl.jpg'
import lookchinPingImg from '../assets/lookchin_ping.jpg'
import yentafoImg from '../assets/yentafo_noodles.jpg'
import pizzaImg from '../assets/pizza.jpg'
import burgerFriesImg from '../assets/burger_fries.jpg'
import MenuItemDetailB from './MenuItemDetailB'
import OrderSummaryB from './OrderSummaryB'
import OrderStatusB from './OrderStatusB'

export default function RestaurantDetailB({ 
  restaurant,
  cart: parentCart, 
  setCart: parentSetCart, 
  onBack, 
  onOpenCart, 
  onConfirmOrder 
}) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false)
  const [localCart, setLocalCart] = useState([])

  const cart = parentCart !== undefined ? parentCart : localCart
  const setCart = parentSetCart || setLocalCart

  if (isOrderStatusOpen) {
    return (
      <OrderStatusB
        onBack={() => setIsOrderStatusOpen(false)}
      />
    )
  }

  if (isCartOpen) {
    return (
      <OrderSummaryB
        restaurant={restaurant}
        cart={cart}
        setCart={setCart}
        onBack={() => setIsCartOpen(false)}
        onAddItem={() => setIsCartOpen(false)}
        onConfirmOrder={() => {
          if (onConfirmOrder) {
            onConfirmOrder()
          }
          setIsCartOpen(false)
          setIsOrderStatusOpen(true)
        }}
      />
    )
  }

  const defaultMenuItems = [
    {
      id: 'item-1',
      name: 'ยำทะเล',
      price: 120,
      image: yumTalayImg
    },
    {
      id: 'item-3',
      name: 'ลูกชิ้นปิ้ง',
      price: 100,
      image: lookchinPingImg
    }
  ]

  const noodleStoreMenuItems = [
    {
      id: 'item-2',
      name: 'ก๋วยเตี๋ยวต้มยำน้ำข้นหมูมะนาว',
      price: 60,
      image: noodlePorkImg
    },
    {
      id: 'item-4',
      name: 'ก๋วยเตี๋ยวเย็นตาโฟทรงเครื่อง',
      price: 65,
      image: yentafoImg
    },
    {
      id: 'item-3',
      name: 'ลูกชิ้นหมูปิ้งไม้ละ',
      price: 50,
      image: lookchinPingImg
    },
    {
      id: 'item-1',
      name: 'ก๋วยเตี๋ยวหมูธรรมดา',
      price: 90,
      image: noodleNormal
    }
  ]

  const burgerStoreMenuItems = [
    {
      id: 'burger-1',
      name: 'Double Cheeseburger & Fries',
      price: 189,
      image: burgerFriesImg
    },
    {
      id: 'burger-2',
      name: 'Classic Bacon Burger',
      price: 169,
      image: burgerFriesImg
    },
    {
      id: 'burger-3',
      name: 'Crispy French Fries (L)',
      price: 79,
      image: burgerFriesImg
    },
    {
      id: 'burger-4',
      name: 'BBQ Chicken Wings',
      price: 129,
      image: burgerFriesImg
    }
  ]

  const pizzaStoreMenuItems = [
    {
      id: 'pizza-1',
      name: 'Margherita Pizza พิซซ่ามาร์เกริต้า',
      price: 249,
      image: pizzaImg
    },
    {
      id: 'pizza-2',
      name: 'Seafood Deluxe Pizza พิซซ่าซีฟู้ด',
      price: 299,
      image: pizzaImg
    },
    {
      id: 'pizza-3',
      name: 'Hawaiian Pizza พิซซ่าฮาวายเอี้ยน',
      price: 269,
      image: pizzaImg
    },
    {
      id: 'pizza-4',
      name: 'Garlic Bread ขนมปังกระเทียม',
      price: 89,
      image: pizzaImg
    }
  ]

  const menuItems = restaurant?.id === 'noodle-chang-phueak' 
    ? noodleStoreMenuItems 
    : restaurant?.id === 'burger-co'
    ? burgerStoreMenuItems
    : restaurant?.id === 'pizza'
    ? pizzaStoreMenuItems
    : defaultMenuItems

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleToggleItem = (item) => {
    setSelectedMenuItem(item)
  }

  if (selectedMenuItem) {
    return (
      <MenuItemDetailB
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        onAddToCart={(configuredItem) => {
          setCart((prev) => {
            const exists = prev.findIndex((i) => i.id === configuredItem.id)
            if (exists >= 0) {
              const updated = [...prev]
              updated[exists] = configuredItem
              return updated
            }
            return [...prev, configuredItem]
          })
          setSelectedMenuItem(null)
        }}
      />
    )
  }

  return (
    <div className="w-full sm:w-[420px] sm:max-w-[420px] sm:h-[920px] sm:min-h-[920px] sm:max-h-[920px] mx-auto bg-white min-h-screen sm:rounded-[44px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 flex flex-col relative overflow-hidden text-slate-900 select-none">
      
      {/* iOS Style Status Bar */}
      <div className="pt-3 px-7 pb-2 flex items-center justify-between text-xs font-semibold text-slate-900 shrink-0 bg-white z-20">
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

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto pb-28 scrollbar-none">
        
        {/* Hero Image with Floating Action Buttons */}
        <div className="relative aspect-[16/10] w-full bg-slate-100">
          <img
            src={restaurant?.image || yumSeafoodHero}
            alt={restaurant?.name || "ยำแซ่บตำนัว"}
            className="w-full h-full object-cover"
          />

          {/* Floating Action Buttons */}
          <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-auto">
            <button
              onClick={onBack}
              aria-label="ย้อนกลับ"
              className="w-10 h-10 rounded-full bg-black/35 hover:bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              aria-label="แชร์"
              className="w-10 h-10 rounded-full bg-black/35 hover:bg-black/50 backdrop-blur-sm text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Share2 className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Restaurant Header Information */}
        <div className="p-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {restaurant?.name || 'ยำแซ่บตำนัว'}
            </h1>

            <div className="flex items-center gap-1 text-sm font-bold text-slate-900 shrink-0">
              <Star className="w-4 h-4 fill-slate-900 text-slate-900" />
              <span>{restaurant?.rating || '4.9'}</span>
              <span className="text-xs text-slate-500 font-normal">({restaurant?.reviewCount || '313'})</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 font-medium mt-1">
            • {restaurant?.location || 'บางพลีใหญ่'}
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
            <span className="text-slate-900 font-semibold">{restaurant?.deliveryFee || '฿9'}</span>
            <span className="line-through text-slate-400">฿19</span>
            <span>•</span>
            <span>{restaurant?.time || '43 นาที ขึ้นไป'}</span>
          </div>

          {/* Group Order & Pre-order Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="bg-slate-100 hover:bg-slate-200/80 rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-semibold text-slate-800 transition-colors cursor-pointer">
              <Users className="w-4 h-4 text-slate-700" />
              <span>คำสั่งซื้อกลุ่ม</span>
            </button>
            <button className="bg-slate-100 hover:bg-slate-200/80 rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 text-xs font-semibold text-slate-800 transition-colors cursor-pointer">
              <Calendar className="w-4 h-4 text-slate-700" />
              <span>สั่งล่วงหน้า</span>
            </button>
          </div>

          {/* Promo Code Banner */}
          <div className="bg-slate-50/90 border border-slate-100 rounded-xl p-2.5 flex items-center gap-2 mt-4 text-xs text-slate-600">
            <Tag className="w-4 h-4 text-slate-500 shrink-0" />
            <span>ใส่โค้ด &quot;BISTRO70&quot; ลด ฿3 เมื่อชำระขั้นต่ำ ฿12</span>
          </div>

          {/* Menu Section */}
          <div className="mt-6">
            <h2 className="text-base font-bold text-slate-900 mb-3">
              สำหรับคุณ
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {menuItems.map((item) => {
                const inCart = cart.some((c) => c.id === item.id)
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item)}
                    className={`group cursor-pointer rounded-2xl overflow-hidden border bg-white transition-all duration-200 flex flex-col justify-between ${
                      inCart ? 'border-[#269D3C] ring-2 ring-[#269D3C]/20 shadow-sm' : 'border-slate-100 hover:shadow-md'
                    }`}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {inCart && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#269D3C] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="p-2.5">
                      <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-[#15803d] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs font-bold text-slate-900 mt-1">
                        ฿{item.price}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Sticky Cart Bar */}
      {totalQuantity > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 p-3 z-30">
          <p className="text-[11px] text-slate-500 text-center mb-1.5 font-medium">
            สั่งเพิ่ม ฿31 เพื่อปลดล็อกส่วนลด ฿10
          </p>

          <button
            onClick={() => {
              setIsCartOpen(true)
              if (onOpenCart) onOpenCart()
            }}
            id="checkout-cart-btn"
            className="w-full bg-[#269D3C] hover:bg-[#15803d] active:scale-[0.99] text-white rounded-2xl py-3 px-4 flex items-center justify-between font-bold text-sm shadow-md shadow-[#269D3C]/20 transition-all cursor-pointer"
          >
            <span>ตะกร้า • {totalQuantity} รายการ</span>
            <span className="text-base font-extrabold">฿{totalPrice}</span>
          </button>
        </div>
      )}

    </div>
  )
}
