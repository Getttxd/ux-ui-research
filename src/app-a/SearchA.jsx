import React, { useState } from 'react'
import { 
  ArrowLeft, 
  Search, 
  TrendingUp, 
  Star,
  Signal,
  Wifi
} from 'lucide-react'

import yumSeafoodImg from '../assets/yum_seafood.jpg'
import pizzaImg from '../assets/pizza.jpg'
import noodlePorkImg from '../assets/noodle_pork.jpg'
import burgerFriesImg from '../assets/burger_fries.jpg'

export default function SearchA({ restaurants = [], onBack, onSelectRestaurant }) {
  const [query, setQuery] = useState('')
  const [deliveryType, setDeliveryType] = useState('delivery')

  const recentSearches = ['ก๋วยเตี๋ยว', 'ยำแซ่บ', 'เบอร์เกอร์', 'พิซซ่า']

  const trendingSearches = [
    'ก๋วยเตี๋ยวต้มยำน้ำข้น',
    'ยำแซ่บตำนัว',
    'The Great Burger Co.',
    'พิซซ่าเตาถ่าน'
  ]

  const defaultList = [
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

  const restaurantList = restaurants && restaurants.length > 0 ? restaurants : defaultList

  const displayItems = query.trim()
    ? restaurantList.filter(i => 
        i.name.toLowerCase().includes(query.toLowerCase()) ||
        (i.tags && i.tags.toLowerCase().includes(query.toLowerCase()))
      )
    : restaurantList.slice(0, 2)

  return (
    <div className="w-full sm:max-w-[420px] mx-auto bg-white min-h-screen sm:min-h-[880px] sm:max-h-[920px] sm:rounded-[44px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 flex flex-col relative overflow-hidden text-slate-900 select-none">
      
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

      {/* Search Header Row */}
      <div className="px-4 pt-1 pb-3 flex items-center gap-3 border-b border-slate-100 bg-white z-10 shrink-0">
        <button
          onClick={onBack}
          aria-label="ย้อนกลับ"
          className="p-1 -ml-1 text-slate-900 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2 bg-slate-100/90 rounded-full">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="กินอะไรดี?"
            className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-none">
        
        {/* Delivery Options Pills */}
        <div className="flex items-center gap-2">
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

        {/* Recent Searches */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-2.5">คำค้นหาล่าสุด</h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(item)}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Suggested Searches */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-2.5">แนะนำให้ค้นหา</h2>
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white divide-y divide-slate-100">
            {trendingSearches.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(item)}
                className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <TrendingUp className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
                <span className="text-xs sm:text-sm text-slate-800 font-medium group-hover:text-slate-900">
                  {item}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended Items */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-2.5">แนะนำ</h2>
          <div className="grid grid-cols-2 gap-3">
            {displayItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectRestaurant && onSelectRestaurant(item)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-100 bg-white hover:shadow-md transition-all duration-200"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2.5">
                  <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {item.distance} • {item.time}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-900 mt-1">
                    <Star className="w-3 h-3 fill-slate-900 text-slate-900" />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
