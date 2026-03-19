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
    <div className="bg-[#FDFBF7] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000')` }}
        >
          <div className="absolute inset-0 bg-[#FDFBF7]/80 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-start">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block py-1.5 px-3 bg-[#E8E2D9] border border-[#D5CEC4] text-[#8C6D58] font-bold tracking-wider text-sm mb-6">
              PREMIUM KOREAN USED CARS
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-[#2D2825] mb-6 tracking-tighter leading-[1.1]">
              중고차는 <span className="text-[#A66E4E]">카매니저</span><br />
              수출도 <span className="text-[#A66E4E]">카매니저</span>
            </h2>
            <p className="text-lg md:text-xl text-[#6B635E] mb-10 font-medium leading-relaxed max-w-xl break-keep">
              딜러와의 직접 거래를 통해 더 신뢰할 수 있고 따뜻한 거래를 경험해보세요.
            </p>

            <button 
              onClick={openSearch}
              className="group relative inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-white bg-[#2C3B4E] overflow-hidden transition-all hover:scale-[1.02] shadow-xl shadow-[#2C3B4E]/20"
            >
              <div className="absolute inset-0 w-full h-full bg-[#1A2634] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative flex items-center gap-3">
                <Search className="w-5 h-5" />
                원하는 차량 찾기
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-[#FDFBF7] border-t border-[#E8E2D9] -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-10">
            <h3 className="text-2xl md:text-3xl font-black text-[#2D2825]">Explore Body Types</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <div key={idx} onClick={openSearch} className="bg-white hover:bg-[#F9F6F0] border border-[#E8E2D9] hover:border-[#A66E4E]/50 p-8 text-center transition-all cursor-pointer group flex flex-col items-center justify-center shadow-sm hover:shadow-md">
                <span className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100">{cat.icon}</span>
                <h4 className="font-bold text-[#2D2825] text-lg mb-1">{cat.name}</h4>
                <p className="text-sm text-[#8C857E] font-medium">{cat.count} cars</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Cars Section */}
      <section className="py-20 bg-[#F9F7F3]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-[#2D2825] mb-2">Recently Added Cars</h3>
              <p className="text-[#6B635E] font-medium text-lg">새롭게 등록된 품질 좋은 차량들을 만나보세요.</p>
            </div>
            <Link to="/cars" className="hidden md:flex items-center gap-1 text-[#2C3B4E] font-bold hover:text-[#A66E4E] transition-colors">
              View All Inventory <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECENT_CARS.map((car) => (
              <Link key={car.id} to={`/cars/${car.id}`} className="bg-white overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#2C3B4E]/10 transition-all border border-[#E8E2D9] group flex flex-col relative hover:-translate-y-1">
                <div className="relative h-60 overflow-hidden bg-[#F3EFE9]">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                  {car.isNew && (
                    <div className="absolute top-4 left-4 z-20 bg-[#D97757] text-white px-3 py-1 text-xs font-bold tracking-widest shadow-md">
                      NEW ARRIVAL
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1 relative z-20 bg-white">
                  <h4 className="font-bold text-xl text-[#2D2825] mb-3 line-clamp-2 leading-tight group-hover:text-[#A66E4E] transition-colors">
                    {car.name}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-[#F9F7F3] border border-[#E8E2D9] text-[#6B635E] px-3 py-1 text-xs font-bold">{car.mileage}</span>
                    <span className="bg-[#F9F7F3] border border-[#E8E2D9] text-[#6B635E] px-3 py-1 text-xs font-bold">{car.fuel}</span>
                  </div>
                  <div className="mt-auto pt-4 border-t border-[#E8E2D9] flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-[#8C857E] mb-1">{car.fob}</p>
                      <p className="text-2xl font-black text-[#2C3B4E]">{car.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sold Cars Section (New) */}
      <section className="py-20 bg-[#FDFBF7] border-t border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-[#2D2825] mb-2">Successfully Exported</h3>
              <p className="text-[#6B635E] font-medium text-lg">전 세계로 수출된 신뢰의 기록입니다.</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#F9F7F3] border border-[#E8E2D9] px-4 py-2 text-[#4A5D4E] font-bold text-sm">
              <Check className="w-5 h-5 text-[#638269]" /> Over 10,000+ Cars Sold
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SOLD_CARS.map((car) => (
              <div 
                key={car.id} 
                onClick={() => setSelectedSoldCar(car)}
                className="bg-white overflow-hidden border border-[#E8E2D9] flex flex-col relative group cursor-pointer block hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-[#F3EFE9]/20 z-10 pointer-events-none group-hover:bg-transparent transition-colors"></div>
                <div className="relative h-48 overflow-hidden grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 bg-[#F3EFE9]">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                  
                  {/* SOLD Badge Overlay */}
                  <div className="absolute top-3 right-3 z-20 pointer-events-none">
                    <div className="bg-[#8C857E]/95 text-white px-3 py-1 font-bold text-xs tracking-wider shadow-sm">
                      SOLD
                    </div>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-1 relative z-20">
                  <h4 className="font-bold text-lg text-[#2D2825] mb-4 line-clamp-1 group-hover:text-[#A66E4E] transition-colors">
                    {car.name}
                  </h4>
                  
                  <div className="mt-auto pt-4 border-t border-[#E8E2D9] flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-[#8C857E] mb-0.5">Sold Price</p>
                      <p className="text-xl font-black text-[#A69F98] line-through decoration-[#8C857E]/50">{car.price}</p>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2825]/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-[#E8E2D9] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-[#E8E2D9] flex justify-between items-center bg-[#F9F7F3]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8E2D9] text-[#2C3B4E] flex items-center justify-center font-black">
                    {searchStep}
                  </div>
                  <h3 className="text-xl font-black text-[#2D2825]">
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
                    <p className="text-[#6B635E] font-medium text-lg text-center">원하시는 예산(FOB USD) 범위를 설정해주세요.</p>
                    
                    <div className="flex justify-between items-center bg-[#F9F7F3] border border-[#E8E2D9] p-6">
                      <div className="text-center w-1/3">
                        <p className="text-[#8C857E] font-bold text-sm mb-1 uppercase tracking-wider">Min Price</p>
                        <p className="text-2xl md:text-3xl font-black text-[#2D2825]">{formatPrice(priceRange[0])}</p>
                      </div>
                      <div className="text-[#D5CEC4] font-black text-2xl w-1/3 text-center">~</div>
                      <div className="text-center w-1/3">
                        <p className="text-[#8C857E] font-bold text-sm mb-1 uppercase tracking-wider">Max Price</p>
                        <p className="text-2xl md:text-3xl font-black text-[#2C3B4E]">{formatPrice(priceRange[1])}</p>
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
                        <Slider.Track className="bg-[#E8E2D9] relative grow rounded-full h-3 border border-[#D5CEC4]">
                          <Slider.Range className="absolute bg-[#A66E4E] rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-8 h-8 bg-white shadow-md border-4 border-[#A66E4E] rounded-full hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#A66E4E]/20 cursor-grab active:cursor-grabbing transition-transform" />
                        <Slider.Thumb className="block w-8 h-8 bg-white shadow-md border-4 border-[#2C3B4E] rounded-full hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#2C3B4E]/20 cursor-grab active:cursor-grabbing transition-transform" />
                      </Slider.Root>
                      <div className="flex justify-between text-[#8C857E] font-bold text-sm mt-6 px-1">
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
                    <p className="text-[#6B635E] font-medium text-lg text-center">선호하는 차종을 모두 선택해주세요.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {["Sedan", "SUV", "Van/Minivan", "Truck", "Bus", "Hatchback"].map((type) => {
                        const isSelected = selectedTypes.includes(type);
                        return (
                          <button 
                            key={type}
                            onClick={() => toggleBodyType(type)}
                            className={`p-4 font-bold text-center border-2 transition-all flex flex-col items-center gap-3 ${
                              isSelected 
                                ? "bg-[#F3EFE9] border-[#2C3B4E] text-[#2C3B4E]" 
                                : "bg-white border-[#E8E2D9] text-[#6B635E] hover:bg-[#F9F7F3]"
                            }`}
                          >
                            <CarIcon className={`w-8 h-8 ${isSelected ? "text-[#2C3B4E]" : "text-[#8C857E]"}`} />
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
                    <p className="text-[#6B635E] font-medium text-lg text-center">특정 브랜드 및 세부 모델이 있다면 선택해주세요.</p>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-[#8C857E] font-bold mb-2">Make (제조사)</label>
                        <select 
                          value={selectedMake}
                          onChange={(e) => setSelectedMake(e.target.value)}
                          className="w-full p-4 bg-white border border-[#E8E2D9] text-[#2D2825] font-bold text-lg focus:ring-2 focus:ring-[#2C3B4E] focus:outline-none appearance-none"
                        >
                          <option value="">전체 제조사 (All Makes)</option>
                          <option value="Hyundai">Hyundai</option>
                          <option value="Kia">Kia</option>
                          <option value="Chevrolet">Chevrolet</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[#8C857E] font-bold mb-2">Model (모델)</label>
                        <select 
                          value={selectedModel}
                          onChange={(e) => setSelectedModel(e.target.value)}
                          className="w-full p-4 bg-white border border-[#E8E2D9] text-[#2D2825] font-bold text-lg focus:ring-2 focus:ring-[#2C3B4E] focus:outline-none appearance-none disabled:opacity-50 disabled:bg-[#F9F7F3]"
                          disabled={!selectedMake}
                        >
                          <option value="">전체 모델 (All Models)</option>
                          {selectedMake === "Hyundai" && (
                            <>
                              <option value="Avante">Avante</option>
                              <option value="Sonata">Sonata</option>
                              <option value="Santa Fe">Santa Fe</option>
                            </>
                          )}
                          {selectedMake === "Kia" && (
                            <>
                              <option value="K5">K5</option>
                              <option value="Sorento">Sorento</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer Actions (3 Buttons) */}
              <div className="p-4 md:p-6 bg-[#F9F7F3] border-t border-[#E8E2D9] grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button 
                  onClick={closeSearch}
                  className="flex items-center justify-center gap-2 py-3.5 bg-white hover:bg-[#E8E2D9] text-[#6B635E] border border-[#E8E2D9] font-bold transition-colors order-3 sm:order-1 shadow-sm"
                >
                  <X className="w-5 h-5" />
                  창 닫기
                </button>
                
                <button 
                  onClick={executeSearch}
                  className="flex items-center justify-center gap-2 py-3.5 bg-white hover:bg-[#F9F7F3] text-[#2D2825] font-bold transition-colors border border-[#D5CEC4] order-2 sm:order-2 shadow-sm"
                >
                  <Search className="w-5 h-5" />
                  선택 조건 검색
                </button>

                {searchStep < 3 ? (
                  <button 
                    onClick={() => setSearchStep(searchStep + 1)}
                    className="flex items-center justify-center gap-2 py-3.5 bg-[#2C3B4E] hover:bg-[#1A2634] text-white font-bold transition-colors order-1 sm:order-3 shadow-md"
                  >
                    다음 단계
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button 
                    onClick={executeSearch}
                    className="flex items-center justify-center gap-2 py-3.5 bg-[#D97757] hover:bg-[#C26243] text-white font-bold transition-all shadow-md hover:scale-[1.02] order-1 sm:order-3"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2825]/80 backdrop-blur-sm"
            onClick={() => setSelectedSoldCar(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-[#E8E2D9] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedSoldCar(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 hover:bg-white text-[#2D2825] rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-[#E8E2D9] shadow-md"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left: Image */}
              <div className="w-full md:w-1/2 relative h-64 md:h-auto bg-[#F3EFE9]">
                <img 
                  src={selectedSoldCar.image} 
                  alt={selectedSoldCar.name} 
                  className="w-full h-full object-cover grayscale-[0.2] opacity-90 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2825]/80 via-transparent to-transparent md:hidden"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F3EFE9]/20 to-[#F3EFE9]/40 hidden md:block pointer-events-none"></div>
                
                {/* SOLD Stamp */}
                <div className="absolute top-4 right-16 md:right-4 z-20 pointer-events-none">
                  <div className="bg-[#8C857E]/95 text-white px-3 py-1 border border-[#6B635E] font-bold text-sm tracking-widest shadow-md">
                    SOLD OUT
                  </div>
                </div>
              </div>

              {/* Right: Details */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-white">
                <div className="mb-6">
                  <span className="inline-block bg-[#F9F7F3] text-[#4A5D4E] px-3 py-1 border border-[#E8E2D9] text-xs font-bold mb-3 uppercase tracking-wider">
                    Successfully Exported
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-[#2D2825] leading-tight mb-2">
                    {selectedSoldCar.name}
                  </h3>
                  <p className="text-[#6B635E] font-medium">이 차량은 성공적으로 수출되어 판매가 완료되었습니다.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#FDFBF7] border border-[#E8E2D9] p-4">
                    <p className="text-xs text-[#8C857E] font-bold uppercase tracking-wider mb-1">Mileage</p>
                    <p className="text-lg font-bold text-[#2D2825]">{selectedSoldCar.mileage}</p>
                  </div>
                  <div className="bg-[#FDFBF7] border border-[#E8E2D9] p-4">
                    <p className="text-xs text-[#8C857E] font-bold uppercase tracking-wider mb-1">Fuel Type</p>
                    <p className="text-lg font-bold text-[#2D2825]">{selectedSoldCar.fuel}</p>
                  </div>
                  <div className="bg-[#FDFBF7] border border-[#E8E2D9] p-4">
                    <p className="text-xs text-[#8C857E] font-bold uppercase tracking-wider mb-1">Steering</p>
                    <p className="text-lg font-bold text-[#2D2825]">{selectedSoldCar.steering}</p>
                  </div>
                  <div className="bg-[#FDFBF7] border border-[#E8E2D9] p-4">
                    <p className="text-xs text-[#8C857E] font-bold uppercase tracking-wider mb-1">Sold Price</p>
                    <p className="text-lg font-black text-[#A69F98] line-through decoration-[#8C857E]/50">{selectedSoldCar.price}</p>
                  </div>
                </div>

                <div className="bg-[#F9F7F3] border border-[#E8E2D9] p-4 flex items-center justify-center gap-3 shadow-sm">
                  <Check className="w-6 h-6 text-[#638269]" />
                  <span className="text-[#4A5D4E] font-bold">Transaction Successfully Completed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
