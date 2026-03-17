import { useState, useEffect } from "react";
import { Search, X, ArrowRight, Car as CarIcon, Check, DollarSign } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import * as Slider from '@radix-ui/react-slider';

const CATEGORIES = [
  { name: "SUV", icon: "🚙", count: "1,240" },
  { name: "Sedan", icon: "🚗", count: "2,100" },
  { name: "Van/Minivan", icon: "🚐", count: "850" },
  { name: "Truck", icon: "🚚", count: "620" },
  { name: "Bus", icon: "🚌", count: "120" },
];

const RECENT_CARS = [
  {
    id: "1",
    name: "2019 Hyundai Sonata New Rise",
    price: "$6,500",
    fob: "FOB Korea",
    mileage: "85,000 km",
    fuel: "Gasoline",
    steering: "LHD",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600",
    isNew: true
  },
  {
    id: "2",
    name: "2020 Hyundai Santa Fe TM 2.0",
    price: "$12,000",
    fob: "FOB Korea",
    mileage: "62,000 km",
    fuel: "Diesel",
    steering: "LHD",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600",
    isNew: true
  },
  {
    id: "3",
    name: "2018 Kia K5 (Optima) 2.0",
    price: "$5,200",
    fob: "FOB Korea",
    mileage: "112,000 km",
    fuel: "LPG",
    steering: "LHD",
    image: "https://images.unsplash.com/photo-1564503227828-dd438692795e?auto=format&fit=crop&q=80&w=600",
    isNew: true
  },
  {
    id: "4",
    name: "2017 Hyundai Grand Starex",
    price: "$8,500",
    fob: "FOB Korea",
    mileage: "140,000 km",
    fuel: "Diesel",
    steering: "LHD",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=600",
    isNew: false
  }
];

const SOLD_CARS = [
  {
    id: "5",
    name: "2018 Hyundai Avante AD",
    price: "$5,800",
    destination: "Jordan",
    mileage: "78,000 km",
    fuel: "Gasoline",
    steering: "LHD",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "6",
    name: "2016 Kia Bongo III 1Ton",
    price: "$4,800",
    destination: "Libya",
    mileage: "185,000 km",
    fuel: "Diesel",
    steering: "LHD",
    image: "https://images.unsplash.com/photo-1605810731665-389f41049539?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "7",
    name: "2019 Kia Sorento",
    price: "$14,500",
    destination: "Russia",
    mileage: "52,000 km",
    fuel: "Diesel",
    steering: "LHD",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "8",
    name: "2015 Chevrolet Spark",
    price: "$3,200",
    destination: "Ghana",
    mileage: "120,000 km",
    fuel: "Gasoline",
    steering: "LHD",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600",
  }
];

export function Home() {
  const navigate = useNavigate();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchStep, setSearchStep] = useState(1);
  const [priceRange, setPriceRange] = useState([3000, 20000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedSoldCar, setSelectedSoldCar] = useState<typeof SOLD_CARS[0] | null>(null);

  useEffect(() => {
    if (isSearchOpen || selectedSoldCar) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isSearchOpen, selectedSoldCar]);

  const openSearch = () => {
    setSearchStep(1);
    setIsSearchOpen(true);
  };

  const closeSearch = () => setIsSearchOpen(false);
  
  const executeSearch = () => {
    closeSearch();
    navigate('/cars');
  };

  const toggleBodyType = (type: string) => {
    if (selectedTypes.includes(type)) setSelectedTypes(selectedTypes.filter(t => t !== type));
    else setSelectedTypes([...selectedTypes, type]);
  };

  const formatPrice = (val: number) => {
    if (val >= 100000) return "$100,000+";
    return "$" + val.toLocaleString();
  };

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2000')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-start">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block py-1.5 px-3 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold tracking-wider text-sm mb-6">
              PREMIUM KOREA USED CARS
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
              Uncover Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Perfect Drive.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-10 font-medium leading-relaxed max-w-xl">
              Experience transparent conditions, unbeatable FOB prices, and fast global shipping directly from South Korea.
            </p>

            <button 
              onClick={openSearch}
              className="group relative inline-flex items-center justify-center px-8 py-5 text-lg font-black text-white bg-blue-600 rounded-full overflow-hidden transition-all hover:scale-105"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 w-full h-full rounded-full ring-4 ring-blue-500/30 group-hover:ring-blue-400/50 animate-pulse"></div>
              <span className="relative flex items-center gap-3">
                <Search className="w-6 h-6" />
                START SMART SEARCH
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-[#050505] border-t border-white/5 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-10">
            <h3 className="text-2xl md:text-3xl font-black text-white">Explore Body Types</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <div key={idx} onClick={openSearch} className="bg-white/5 hover:bg-blue-600/10 border border-white/10 hover:border-blue-500/50 rounded-2xl p-8 text-center transition-all cursor-pointer group flex flex-col items-center justify-center backdrop-blur-sm">
                <span className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100">{cat.icon}</span>
                <h4 className="font-bold text-white text-lg mb-1">{cat.name}</h4>
                <p className="text-sm text-gray-500 font-medium">{cat.count} cars</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Cars Section */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2">Recently Added Cars</h3>
              <p className="text-gray-400 font-medium text-lg">Fresh inventory directly from Korean sellers</p>
            </div>
            <Link to="/cars" className="hidden md:flex items-center gap-1 text-blue-400 font-bold hover:text-blue-300 transition-colors">
              View All Inventory <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECENT_CARS.map((car) => (
              <Link key={car.id} to={`/cars/${car.id}`} className="bg-[#111] rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-900/20 transition-all border border-white/5 group flex flex-col relative">
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10"></div>
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                  {car.isNew && (
                    <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 py-1 rounded-lg text-xs font-black tracking-widest shadow-lg">
                      NEW ARRIVAL
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1 relative z-20 -mt-6">
                  <h4 className="font-bold text-xl text-white mb-3 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors drop-shadow-md">
                    {car.name}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-md text-xs font-bold backdrop-blur-md">{car.mileage}</span>
                    <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-md text-xs font-bold backdrop-blur-md">{car.fuel}</span>
                  </div>
                  <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-1">{car.fob}</p>
                      <p className="text-2xl font-black text-white">{car.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sold Cars Section (New) */}
      <section className="py-20 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2">Successfully Exported</h3>
              <p className="text-gray-400 font-medium text-lg">See where our quality vehicles are heading globally</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-gray-300 font-bold text-sm">
              <Check className="w-5 h-5 text-green-500" /> Over 10,000+ Cars Sold
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SOLD_CARS.map((car) => (
              <div 
                key={car.id} 
                onClick={() => setSelectedSoldCar(car)}
                className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/5 flex flex-col relative group cursor-pointer block"
              >
                <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none group-hover:bg-black/20 transition-colors"></div>
                <div className="relative h-48 overflow-hidden grayscale-[0.6] group-hover:grayscale-0 transition-all duration-500">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  
                  {/* SOLD Badge Overlay */}
                  <div className="absolute top-3 right-3 z-20 pointer-events-none">
                    <div className="bg-red-600/90 text-white px-3 py-1 border border-red-500 rounded-md font-black text-xs tracking-wider shadow-lg backdrop-blur-sm">
                      SOLD
                    </div>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-1 relative z-20">
                  <h4 className="font-bold text-lg text-gray-300 mb-4 line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {car.name}
                  </h4>
                  
                  <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-gray-500 mb-0.5">Sold Price</p>
                      <p className="text-xl font-black text-gray-400 line-through decoration-red-500/50">{car.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-500 mb-0.5">Destination</p>
                      <p className="text-sm font-bold text-blue-400 bg-blue-900/30 px-3 py-1 rounded-md border border-blue-500/20">
                        {car.destination}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Search Modal Overlay --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-black">
                    {searchStep}
                  </div>
                  <h3 className="text-xl font-black text-white">
                    {searchStep === 1 && "예산 설정 (Price Range)"}
                    {searchStep === 2 && "차종 선택 (Body Type)"}
                    {searchStep === 3 && "제조사/모델 선택 (Make & Model)"}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 min-h-[300px] flex flex-col justify-center">
                {/* STEP 1: Range Slider */}
                {searchStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 w-full">
                    <p className="text-gray-400 font-medium text-lg text-center">원하시는 예산(FOB USD) 범위를 드래그하여 설정해주세요.</p>
                    
                    <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-6">
                      <div className="text-center w-1/3">
                        <p className="text-gray-500 font-bold text-sm mb-1 uppercase tracking-wider">Min Price</p>
                        <p className="text-2xl md:text-3xl font-black text-white">{formatPrice(priceRange[0])}</p>
                      </div>
                      <div className="text-gray-600 font-black text-2xl w-1/3 text-center">~</div>
                      <div className="text-center w-1/3">
                        <p className="text-gray-500 font-bold text-sm mb-1 uppercase tracking-wider">Max Price</p>
                        <p className="text-2xl md:text-3xl font-black text-blue-400">{formatPrice(priceRange[1])}</p>
                      </div>
                    </div>

                    <div className="px-4 pt-8 pb-4">
                      <Slider.Root
                        className="relative flex items-center select-none touch-none w-full h-6"
                        value={priceRange}
                        max={100000}
                        min={0}
                        step={1000}
                        minStepsBetweenThumbs={1}
                        onValueChange={setPriceRange}
                      >
                        <Slider.Track className="bg-gray-800 relative grow rounded-full h-3 border border-white/5">
                          <Slider.Range className="absolute bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-8 h-8 bg-[#111] shadow-[0_0_15px_rgba(37,99,235,0.4)] border-4 border-blue-500 rounded-full hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500/40 cursor-grab active:cursor-grabbing transition-transform" />
                        <Slider.Thumb className="block w-8 h-8 bg-[#111] shadow-[0_0_15px_rgba(34,211,238,0.4)] border-4 border-cyan-400 rounded-full hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-400/40 cursor-grab active:cursor-grabbing transition-transform" />
                      </Slider.Root>
                      <div className="flex justify-between text-gray-500 font-bold text-sm mt-6 px-1">
                        <span>$0</span>
                        <span>$50,000</span>
                        <span>$100,000+</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {searchStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <p className="text-gray-400 font-medium text-lg text-center">선호하는 차종을 모두 선택해주세요.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {["Sedan", "SUV", "Van/Minivan", "Truck", "Bus", "Hatchback"].map((type) => {
                        const isSelected = selectedTypes.includes(type);
                        return (
                          <button 
                            key={type}
                            onClick={() => toggleBodyType(type)}
                            className={`p-4 rounded-xl font-bold text-center border-2 transition-all flex flex-col items-center gap-3 ${
                              isSelected 
                                ? "bg-blue-600/20 border-blue-500 text-white" 
                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20"
                            }`}
                          >
                            <CarIcon className={`w-8 h-8 ${isSelected ? "text-blue-400" : "text-gray-500"}`} />
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {searchStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <p className="text-gray-400 font-medium text-lg text-center">특정 브랜드 및 세부 모델이 있다면 선택해주세요.</p>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-gray-400 font-bold mb-2">Make (제조사)</label>
                        <select 
                          value={selectedMake}
                          onChange={(e) => setSelectedMake(e.target.value)}
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                        >
                          <option value="" className="text-gray-900">전체 제조사 (All Makes)</option>
                          <option value="Hyundai" className="text-gray-900">Hyundai</option>
                          <option value="Kia" className="text-gray-900">Kia</option>
                          <option value="Chevrolet" className="text-gray-900">Chevrolet</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 font-bold mb-2">Model (모델)</label>
                        <select 
                          value={selectedModel}
                          onChange={(e) => setSelectedModel(e.target.value)}
                          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none disabled:opacity-50"
                          disabled={!selectedMake}
                        >
                          <option value="" className="text-gray-900">전체 모델 (All Models)</option>
                          {selectedMake === "Hyundai" && (
                            <>
                              <option value="Avante" className="text-gray-900">Avante</option>
                              <option value="Sonata" className="text-gray-900">Sonata</option>
                              <option value="Santa Fe" className="text-gray-900">Santa Fe</option>
                            </>
                          )}
                          {selectedMake === "Kia" && (
                            <>
                              <option value="K5" className="text-gray-900">K5</option>
                              <option value="Sorento" className="text-gray-900">Sorento</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer Actions (3 Buttons) */}
              <div className="p-4 md:p-6 bg-[#0a0a0a] border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button 
                  onClick={closeSearch}
                  className="flex items-center justify-center gap-2 py-3.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl font-bold transition-colors order-3 sm:order-1"
                >
                  <X className="w-5 h-5" />
                  창 닫기
                </button>
                
                <button 
                  onClick={executeSearch}
                  className="flex items-center justify-center gap-2 py-3.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold transition-colors border border-gray-600 order-2 sm:order-2"
                >
                  <Search className="w-5 h-5" />
                  선택 조건 검색
                </button>

                {searchStep < 3 ? (
                  <button 
                    onClick={() => setSearchStep(searchStep + 1)}
                    className="flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black transition-colors order-1 sm:order-3"
                  >
                    다음 단계
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button 
                    onClick={executeSearch}
                    className="flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl font-black transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:scale-[1.02] order-1 sm:order-3"
                  >
                    최종 검색하기
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Sold Car Detail Modal Overlay --- */}
      <AnimatePresence>
        {selectedSoldCar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedSoldCar(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-white/10 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedSoldCar(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-white/10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left: Image */}
              <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                <img 
                  src={selectedSoldCar.image} 
                  alt={selectedSoldCar.name} 
                  className="w-full h-full object-cover grayscale-[0.3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:hidden"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-transparent to-transparent hidden md:block"></div>
                
                {/* SOLD Stamp */}
                <div className="absolute top-4 right-16 md:right-4 z-20 pointer-events-none">
                  <div className="bg-red-600/90 text-white px-3 py-1 border border-red-500 rounded-md font-black text-sm tracking-widest shadow-lg backdrop-blur-sm shadow-red-900/50">
                    SOLD OUT
                  </div>
                </div>
              </div>

              {/* Right: Details */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-[#0a0a0a]">
                <div className="mb-6">
                  <span className="inline-block bg-blue-900/30 text-blue-400 px-3 py-1 rounded-md border border-blue-500/20 text-xs font-bold mb-3 uppercase tracking-wider">
                    Exported to {selectedSoldCar.destination}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
                    {selectedSoldCar.name}
                  </h3>
                  <p className="text-gray-400 font-medium">This vehicle has been successfully exported and is no longer available.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Mileage</p>
                    <p className="text-lg font-bold text-gray-200">{selectedSoldCar.mileage}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Fuel Type</p>
                    <p className="text-lg font-bold text-gray-200">{selectedSoldCar.fuel}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Steering</p>
                    <p className="text-lg font-bold text-gray-200">{selectedSoldCar.steering}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Sold Price</p>
                    <p className="text-lg font-black text-gray-400 line-through decoration-red-500/50">{selectedSoldCar.price}</p>
                  </div>
                </div>

                <div className="bg-[#111] border border-white/5 p-4 rounded-xl flex items-center justify-center gap-3">
                  <Check className="w-6 h-6 text-green-500" />
                  <span className="text-gray-300 font-bold">Transaction Successfully Completed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
