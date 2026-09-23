import React, { useState } from 'react'
import { 
  Search, 
  Heart, 
  FileText, 
  ChevronDown, 
  Star, 
  ShoppingBag,
  Home as HomeIcon,
  Compass,
  Activity,
  CreditCard,
  MessageSquare,
  Wifi,
  Signal
} from 'lucide-react'

// Import generated food images
import yumSeafoodImg from '../assets/yum_seafood.jpg'
import burgerFriesImg from '../assets/burger_fries.jpg'
import noodlePorkImg from '../assets/noodle_pork.jpg'
import pizzaImg from '../assets/pizza.jpg'
import floatingCartIcon from '../assets/floating_cart_icon.png'
import SearchA from './SearchA'
import RestaurantDetailA from './RestaurantDetailA'
import OrderSummaryA from './OrderSummaryA'
import OrderStatusA from './OrderStatusA'
import MyCartsA from './MyCartsA'

// Food categories from the screenshot
const categories = [
  {
    id: 'noodles',
    name: 'ก๋วยเตี๋ยว',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-slate-800 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11h16a8 8 0 0 1-16 0z" />
        <path d="M7 4c0 2-1 3-1 5" />
        <path d="M12 4c0 2-1 3-1 5" />
        <path d="M17 4c0 2-1 3-1 5" />
      </svg>
    )
  },
  {
    id: 'burger',
    name: 'เบอร์เกอร์',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-slate-800 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10a8 8 0 0 1 16 0H4z" />
        <path d="M3 13.5h18" />
        <path d="M5 17h14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
        <circle cx="8" cy="7" r="0.5" fill="currentColor" />
        <circle cx="12" cy="6" r="0.5" fill="currentColor" />
        <circle cx="16" cy="7" r="0.5" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 'pizza',
    name: 'พิซซ่า',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-slate-800 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21L4.5 6a15.5 15.5 0 0 1 15 0L12 21z" />
        <circle cx="12" cy="10" r="1.5" fill="currentColor" />
        <circle cx="10" cy="14" r="1" fill="currentColor" />
        <circle cx="14" cy="14" r="1" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 'dessert',
    name: 'ของหวาน',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-slate-800 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2z" />
        <path d="M6 12V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4" />
        <circle cx="12" cy="3.5" r="1" fill="currentColor" />
        <path d="M12 4.5v1.5" />
      </svg>
    )
  },
  {
    id: 'thai',
    name: 'อาหารไทย',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-slate-800 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a2.5 2.5 0 0 0-2.5 2.5c0 1.2 1 2 2.5 2s2.5-.8 2.5-2A2.5 2.5 0 0 0 12 3z" />
        <path d="M5 12a7 7 0 0 0 14 0H5z" />
        <path d="M8 18h8" />
        <path d="M12 15v3" />
      </svg>
    )
  }
]

// Restaurants
const restaurants = [
  {
    id: 'yam-zaap',
    name: 'ยำแซ่บตำนัว',
    rating: '4.9',
    tags: 'ยำ • ส้มตำ • อาหารอีสาน',
    distance: '8 กม.',
    time: '38-43 นาที',
    deliveryFee: '฿9.00',
    image: yumSeafoodImg,
    location: 'บางพลีใหญ่',
    reviewCount: '313'
  },
  {
    id: 'noodle-chang-phueak',
    name: 'ก๋วยเตี๋ยวต้มยำน้ำข้นช้างเผือก - รัชดา 17',
    rating: '4.9',
    tags: 'ก๋วยเตี๋ยว • ต้มยำ • เย็นตาโฟ',
    distance: '2.1 กม.',
    time: '20-25 นาที',
    deliveryFee: '฿5.00',
    image: noodlePorkImg,
    location: 'รัชดา 17',
    reviewCount: '482'
  },
  {
    id: 'burger-co',
    name: 'The Great Burger Co.',
    rating: '4.8',
    tags: 'อเมริกัน • เบอร์เกอร์ • ฟาสต์ฟู้ด',
    distance: '1.5 กม.',
    time: '15-20 นาที',
    deliveryFee: '฿2.00',
    image: burgerFriesImg,
    location: 'อโศก',
    reviewCount: '215'
  },
  {
    id: 'pizza',
    name: 'Pizza & Co. พิซซ่าเตาถ่าน',
    rating: '4.9',
    tags: 'อิตาเลียน • พิซซ่า • พาสต้า',
    distance: '2.5 กม.',
    time: '20-25 นาที',
    deliveryFee: '฿12.00',
    image: pizzaImg,
    location: 'ทองหล่อ',
    reviewCount: '198'
  }
]

export default function HomeA({ onSelectRestaurant, onConfirmOrder }) {
  const [isSearching, setIsSearching] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMyCartsOpen, setIsMyCartsOpen] = useState(false)
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [deliveryType, setDeliveryType] = useState('delivery') // 'delivery' | 'pickup' | 'dinein'
  const [activeTab, setActiveTab] = useState('home')

  if (isOrderStatusOpen) {
    return (
      <OrderStatusA
        onBack={() => {
          setIsOrderStatusOpen(false)
          setCart([])
        }}
      />
    )
  }

  if (isMyCartsOpen) {
    return (
      <MyCartsA
        cart={cart}
        selectedRestaurant={selectedRestaurant}
        restaurants={restaurants}
        onBack={() => setIsMyCartsOpen(false)}
        onSelectRestaurant={(res) => {
          setIsMyCartsOpen(false)
          if (res) setSelectedRestaurant(res)
          if (onSelectRestaurant) onSelectRestaurant(res)
        }}
      />
    )
  }

  if (isCartOpen) {
    return (
      <OrderSummaryA
        restaurant={selectedRestaurant}
        cart={cart}
        setCart={setCart}
        onBack={() => setIsCartOpen(false)}
        onAddItem={() => {
          setIsCartOpen(false)
          if (!selectedRestaurant) {
            setSelectedRestaurant(restaurants.find(r => r.id === 'noodle-chang-phueak') || restaurants[0])
          }
        }}
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

  if (selectedRestaurant) {
    return (
      <RestaurantDetailA
        restaurant={selectedRestaurant}
        cart={cart}
        setCart={setCart}
        onBack={() => setSelectedRestaurant(null)}
        onOpenCart={() => setIsCartOpen(true)}
        onConfirmOrder={onConfirmOrder}
      />
    )
  }

  if (isSearching) {
    return (
      <SearchA 
        restaurants={restaurants}
        onBack={() => setIsSearching(false)} 
        onSelectRestaurant={(res) => {
          setIsSearching(false)
          setSelectedRestaurant(res)
          if (onSelectRestaurant) onSelectRestaurant(res)
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
      <div className={`flex-1 overflow-y-auto ${cart.length > 0 ? 'pb-36' : 'pb-24'} px-4 scrollbar-none`}>
        
        {/* Top Header: Address & Icons */}
        <div className="pt-1 pb-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">จัดส่งตอนนี้</span>
            <button className="flex items-center gap-1 text-base font-bold text-slate-900 hover:text-slate-700 transition-colors">
              <span>บ้านโดเรมอน</span>
              <ChevronDown className="w-4 h-4 text-slate-700" />
            </button>
          </div>
          <div className="flex items-center gap-3 text-slate-800">
            <button className="p-1.5 hover:bg-slate-100 rounded-full transition-colors">
              <Heart className="w-5 h-5 stroke-[2]" />
            </button>
            <button className="p-1.5 hover:bg-slate-100 rounded-full transition-colors">
              <FileText className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div 
          onClick={() => setIsSearching(true)}
          className="relative mb-4 cursor-pointer group"
        >
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            readOnly
            placeholder="ค้นหาร้านอาหาร เมนู หรือประเภทอาหาร..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100/90 hover:bg-slate-100 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all cursor-pointer"
          />
        </div>

        {/* Delivery Options Pills */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setDeliveryType('delivery')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              deliveryType === 'delivery'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            จัดส่ง
          </button>
          <button
            onClick={() => setDeliveryType('pickup')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              deliveryType === 'pickup'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            รับเองที่ร้าน
          </button>
          <button
            onClick={() => setDeliveryType('dinein')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              deliveryType === 'dinein'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            ดีลกินที่ร้าน
          </button>
        </div>

        {/* Categories Section */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-slate-900 mb-3">ประเภทอาหารยอดนิยม</h2>
          <div className="grid grid-cols-5 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.id === 'noodles') {
                    const noodleRes = restaurants.find((r) => r.id === 'noodle-chang-phueak')
                    if (noodleRes) {
                      setSelectedRestaurant(noodleRes)
                      if (onSelectRestaurant) onSelectRestaurant(noodleRes)
                    }
                  } else if (cat.id === 'burger') {
                    const burgerRes = restaurants.find((r) => r.id === 'burger-co')
                    if (burgerRes) {
                      setSelectedRestaurant(burgerRes)
                      if (onSelectRestaurant) onSelectRestaurant(burgerRes)
                    }
                  } else if (cat.id === 'pizza') {
                    const pizzaRes = restaurants.find((r) => r.id === 'pizza')
                    if (pizzaRes) {
                      setSelectedRestaurant(pizzaRes)
                      if (onSelectRestaurant) onSelectRestaurant(pizzaRes)
                    }
                  } else if (cat.id === 'thai') {
                    const thaiRes = restaurants.find((r) => r.id === 'yam-zaap')
                    if (thaiRes) {
                      setSelectedRestaurant(thaiRes)
                      if (onSelectRestaurant) onSelectRestaurant(thaiRes)
                    }
                  }
                }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-13 h-13 rounded-full bg-slate-100 group-hover:bg-slate-200/90 transition-colors flex items-center justify-center shadow-xs">
                  {cat.icon}
                </div>
                <span className="text-[11px] text-slate-600 group-hover:text-slate-900 font-medium mt-1.5 text-center">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Promotions Section */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-slate-900 mb-3">โปรโมชั่นพิเศษ</h2>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {/* Promo Card 1 */}
            <div className="min-w-[245px] max-w-[250px] bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex justify-between items-center shrink-0 shadow-xs relative overflow-hidden">
              <div className="flex-1 pr-2">
                <h3 className="font-extrabold text-base text-slate-900 leading-tight">ลด 50%</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">สำหรับออเดอร์แรกของคุณ</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-slate-900 text-white rounded text-[9px] font-medium tracking-tight">
                    โค้ด: LUMEN50
                  </span>
                </div>
                <button className="mt-2 px-3 py-1 bg-[#269D3C] hover:bg-[#15803d] text-white text-[11px] font-semibold rounded-md transition-colors cursor-pointer">
                  เก็บ
                </button>
              </div>

              {/* Promo Badge Graphic */}
              <div className="w-12 h-12 bg-[#269D3C] rounded-xl flex flex-col items-center justify-center text-white text-[9px] font-extrabold p-1 shadow-xs shrink-0 text-center leading-tight">
                <span className="text-[8px] opacity-90">โค้ด</span>
                <span className="text-[11px] font-black text-amber-300">ลดแรง</span>
              </div>
            </div>

            {/* Promo Card 2 */}
            <div className="min-w-[200px] bg-slate-50 border border-slate-100 rounded-2xl p-3.5 flex flex-col justify-between shrink-0 shadow-xs">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 leading-tight">ส่งฟรี</h3>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                  เมื่อสั่งขั้นต่ำ ฿15 ร้านที่ร่วม...
                </p>
              </div>
              <div className="mt-3">
                <button className="px-3 py-1 bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-md hover:bg-slate-300 transition-colors">
                  ดูรายละเอียด
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Restaurants Section */}
        <div className="mb-4">
          <h2 className="text-sm font-bold text-slate-900 mb-3">ร้านอาหารแนะนำ</h2>
          <div className="space-y-4">
            {restaurants.map((res) => (
              <div
                key={res.id}
                onClick={() => {
                  setSelectedRestaurant(res)
                  if (onSelectRestaurant) onSelectRestaurant(res)
                }}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all duration-200"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={res.image}
                    alt={res.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {res.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                      <span>{res.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mb-1">{res.tags}</p>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{res.distance}</span>
                    <span>•</span>
                    <span>{res.time}</span>
                    <span>•</span>
                    <span className="text-slate-600 font-medium">ค่าส่ง {res.deliveryFee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button (Floats in bottom-right; moves above cart bar when cart is visible) */}
      <div 
        className={`absolute right-4 z-40 transition-all duration-300 ease-in-out ${
          cart.length > 0 ? 'bottom-[124px]' : 'bottom-[70px]'
        }`}
      >
        <button
          onClick={() => setIsMyCartsOpen(true)}
          id="home-floating-action-btn"
          aria-label="รถเข็นของฉัน"
          className="w-13 h-13 sm:w-14 sm:h-14 relative flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer drop-shadow-lg"
        >
          <img
            src={floatingCartIcon}
            alt="ปุ่มลอย"
            className="w-full h-full object-contain"
          />
        </button>
      </div>

      {/* Sticky Cart Bar on Home Screen (Follows and sticks to Home when cart has items) */}
      {cart.length > 0 && (
        <div className="absolute bottom-[58px] left-0 right-0 px-3.5 pb-1 z-30 animate-in slide-in-from-bottom-2 duration-200">
          <button
            onClick={() => setIsCartOpen(true)}
            id="home-checkout-cart-btn"
            className="w-full bg-[#269D3C] hover:bg-[#15803d] active:scale-[0.99] text-white rounded-2xl py-3 px-4 flex items-center justify-between font-bold text-sm shadow-xl shadow-[#269D3C]/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              <span>ตะกร้า • {cart.reduce((s, i) => s + (i.quantity || 1), 0)} รายการ</span>
            </div>
            <span className="text-base font-extrabold">
              ฿{cart.reduce((s, i) => s + (i.price * (i.quantity || 1)), 0)}
            </span>
          </button>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-2.5 z-20">
        <div className="grid grid-cols-5 text-center">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <HomeIcon className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-slate-900 stroke-[2.5]' : 'stroke-slate-400 stroke-[1.8]'}`} />
            <span className={`text-[10px] ${activeTab === 'home' ? 'font-bold text-slate-900' : 'text-slate-400 font-medium'}`}>
              หน้าแรก
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('moments')}
            className="flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <Compass className={`w-5 h-5 ${activeTab === 'moments' ? 'stroke-slate-900 stroke-[2.5]' : 'stroke-slate-400 stroke-[1.8]'}`} />
            <span className={`text-[10px] ${activeTab === 'moments' ? 'font-bold text-slate-900' : 'text-slate-400 font-medium'}`}>
              โมเมนต์
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('finance')}
            className="flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <Activity className={`w-5 h-5 ${activeTab === 'finance' ? 'stroke-slate-900 stroke-[2.5]' : 'stroke-slate-400 stroke-[1.8]'}`} />
            <span className={`text-[10px] ${activeTab === 'finance' ? 'font-bold text-slate-900' : 'text-slate-400 font-medium'}`}>
              การเงิน
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('orders')}
            className="flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <CreditCard className={`w-5 h-5 ${activeTab === 'orders' ? 'stroke-slate-900 stroke-[2.5]' : 'stroke-slate-400 stroke-[1.8]'}`} />
            <span className={`text-[10px] ${activeTab === 'orders' ? 'font-bold text-slate-900' : 'text-slate-400 font-medium'}`}>
              รายการ
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('messages')}
            className="flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <MessageSquare className={`w-5 h-5 ${activeTab === 'messages' ? 'stroke-slate-900 stroke-[2.5]' : 'stroke-slate-400 stroke-[1.8]'}`} />
            <span className={`text-[10px] ${activeTab === 'messages' ? 'font-bold text-slate-900' : 'text-slate-400 font-medium'}`}>
              ข้อความ
            </span>
          </button>
        </div>
      </nav>

    </div>
  )
}
