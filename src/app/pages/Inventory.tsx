import { useState } from "react";
import { Search, Filter, MoreVertical, Edit, Trash2, Check, Clock } from "lucide-react";
import { motion } from "motion/react";

const CARS_DATA = [
  {
    id: "C1001",
    name: "2019 현대 쏘나타 뉴 라이즈 2.0 스마트",
    price: "$6,500",
    krw: "약 860만원",
    year: "2019",
    mileage: "85,000 km",
    fuel: "가솔린",
    status: "판매대기",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "C1002",
    name: "2018 기아 K5 2세대 2.0 프레스티지",
    price: "$5,200",
    krw: "약 690만원",
    year: "2018",
    mileage: "112,000 km",
    fuel: "LPG",
    status: "문의중",
    image: "https://images.unsplash.com/photo-1564503227828-dd438692795e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "C1003",
    name: "2017 현대 그랜드 스타렉스 11인승",
    price: "$8,500",
    krw: "약 1,130만원",
    year: "2017",
    mileage: "140,000 km",
    fuel: "디젤",
    status: "계약완료",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "C1004",
    name: "2020 현대 싼타페 TM 2.0 디젤 익스클루시브",
    price: "$12,000",
    krw: "약 1,590만원",
    year: "2020",
    mileage: "62,000 km",
    fuel: "디젤",
    status: "판매대기",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "C1005",
    name: "2016 기아 봉고3 1톤 초장축 카고",
    price: "$4,800",
    krw: "약 640만원",
    year: "2016",
    mileage: "185,000 km",
    fuel: "디젤",
    status: "판매대기",
    image: "https://images.unsplash.com/photo-1605810731665-389f41049539?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "C1006",
    name: "2019 현대 아반떼 AD 1.6 밸류플러스",
    price: "$5,800",
    krw: "약 770만원",
    year: "2019",
    mileage: "78,000 km",
    fuel: "가솔린",
    status: "문의중",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800",
  },
];

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("전체");

  const filteredCars = CARS_DATA.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || car.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "전체" || car.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">내 차량 관리</h1>
          <p className="text-lg text-gray-600 font-medium">등록된 총 {CARS_DATA.length}대의 차량을 관리합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 shadow-sm transition-colors">
            <Filter className="w-5 h-5" />
            상세 필터
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 md:p-6 rounded-3xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="차량명 또는 차량번호 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-bold bg-gray-50 text-gray-900"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {["전체", "판매대기", "문의중", "계약완료", "선적준비"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all shadow-sm ${
                filterStatus === status
                  ? "bg-blue-600 text-white shadow-blue-600/30"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car, idx) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow group cursor-pointer"
          >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm flex items-center gap-1 ${
                  car.status === "판매대기" ? "bg-white text-gray-800" :
                  car.status === "문의중" ? "bg-purple-500 text-white" :
                  "bg-green-500 text-white"
                }`}>
                  {car.status === "판매대기" && <Clock className="w-4 h-4" />}
                  {car.status === "계약완료" && <Check className="w-4 h-4" />}
                  {car.status}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm text-gray-600 hover:text-blue-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-white text-sm font-medium">
                {car.id}
              </div>
            </div>

            {/* Info Section */}
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{car.name}</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm font-medium">{car.year}년식</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm font-medium">{car.mileage}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm font-medium">{car.fuel}</span>
              </div>

              <div className="flex justify-between items-end mb-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs font-bold text-gray-400 mb-1 uppercase">해외 수출 희망가</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-blue-700">{car.price}</span>
                    <span className="text-sm font-medium text-gray-500">({car.krw})</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-blue-50 text-blue-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
                  <Edit className="w-5 h-5" />
                  수정
                </button>
                <button className="px-4 bg-gray-50 text-gray-500 py-3 rounded-xl font-bold flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredCars.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-500">다른 검색어나 필터를 선택해보세요.</p>
        </div>
      )}
    </div>
  );
}
