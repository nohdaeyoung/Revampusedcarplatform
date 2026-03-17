import { useState } from "react";
import { Filter, ChevronDown, ListFilter } from "lucide-react";
import { Link } from "react-router";

function DualRangeSlider({
  min,
  max,
  step = 1,
  initialMin,
  initialMax,
  prefix = "",
  suffix = "",
  placeholderMin = "Min",
  placeholderMax = "Max"
}: {
  min: number;
  max: number;
  step?: number;
  initialMin: number;
  initialMax: number;
  prefix?: string;
  suffix?: string;
  placeholderMin?: string;
  placeholderMax?: string;
}) {
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - step);
    setMinValue(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + step);
    setMaxValue(value);
  };

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="px-2">
      <div className="flex justify-between text-sm text-gray-600 font-bold mb-4">
        <span>{prefix}{min.toLocaleString()}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}+</span>
      </div>
      
      <div className="relative w-full h-1.5 flex items-center mb-6">
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-lg"></div>
        <div 
          className="absolute h-1.5 bg-blue-600 rounded-lg" 
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        ></div>
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step}
          value={minValue} 
          onChange={handleMinChange}
          className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md z-10"
        />
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step}
          value={maxValue} 
          onChange={handleMaxChange}
          className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md z-20"
        />
      </div>

      <div className="flex gap-2 items-center">
        <div className="flex-1 relative">
          {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{prefix}</span>}
          <input 
            type="number" 
            value={minValue}
            onChange={(e) => setMinValue(Number(e.target.value))}
            placeholder={placeholderMin} 
            className={`w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg ${prefix ? 'pl-8' : 'pl-3'} pr-3 py-1.5 text-sm font-bold focus:outline-none focus:border-blue-500`} 
          />
        </div>
        <span className="text-gray-400">-</span>
        <div className="flex-1 relative">
          {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{prefix}</span>}
          <input 
            type="number" 
            value={maxValue}
            onChange={(e) => setMaxValue(Number(e.target.value))}
            placeholder={placeholderMax} 
            className={`w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg ${prefix ? 'pl-8' : 'pl-3'} pr-3 py-1.5 text-sm font-bold focus:outline-none focus:border-blue-500`} 
          />
        </div>
      </div>
    </div>
  );
}

const MOCK_CARS = [
  { id: "1", name: "2019 Hyundai Sonata New Rise 2.0", price: "$6,500", year: "2019", mileage: "85k km", fuel: "Gasoline", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600" },
  { id: "2", name: "2020 Hyundai Santa Fe TM 2.0", price: "$12,000", year: "2020", mileage: "62k km", fuel: "Diesel", image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600" },
  { id: "3", name: "2018 Kia K5 (Optima)", price: "$5,200", year: "2018", mileage: "112k km", fuel: "LPG", image: "https://images.unsplash.com/photo-1564503227828-dd438692795e?auto=format&fit=crop&q=80&w=600" },
  { id: "4", name: "2017 Hyundai Grand Starex", price: "$8,500", year: "2017", mileage: "140k km", fuel: "Diesel", image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=600" },
  { id: "5", name: "2016 Kia Bongo III 1Ton", price: "$4,800", year: "2016", mileage: "185k km", fuel: "Diesel", image: "https://images.unsplash.com/photo-1605810731665-389f41049539?auto=format&fit=crop&q=80&w=600" },
  { id: "6", name: "2019 Hyundai Avante AD", price: "$5,800", year: "2019", mileage: "78k km", fuel: "Gasoline", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600" },
  { id: "7", name: "2018 Hyundai Tucson", price: "$9,200", year: "2018", mileage: "92k km", fuel: "Diesel", image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=600" },
  { id: "8", name: "2015 Chevrolet Spark", price: "$3,200", year: "2015", mileage: "120k km", fuel: "Gasoline", image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600" },
];

const CATEGORIES = [
  { name: "SUV", icon: "🚙", count: "1,240" },
  { name: "Sedan", icon: "🚗", count: "2,100" },
  { name: "Van/Minivan", icon: "🚐", count: "850" },
  { name: "Truck", icon: "🚚", count: "620" },
  { name: "Bus", icon: "🚌", count: "120" },
];

export function CarList() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">Search Cars</h2>
          <p className="text-gray-500 font-medium">Showing 1,420 results</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            className="md:hidden flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <Filter className="w-5 h-5" /> Filter
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter */}
        <aside className={`w-full lg:w-72 shrink-0 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sticky top-24">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <ListFilter className="w-5 h-5 text-blue-600" />
              <h3 className="font-black text-lg text-gray-900">Filters</h3>
            </div>

            {/* Filter Sections */}
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex justify-between">Price (USD) <ChevronDown className="w-4 h-4" /></h4>
                <DualRangeSlider min={0} max={50000} step={500} initialMin={2000} initialMax={35000} prefix="$" />
              </div>

              {/* Mileage Range */}
              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4 flex justify-between">Mileage (km) <ChevronDown className="w-4 h-4" /></h4>
                <DualRangeSlider min={0} max={200000} step={5000} initialMin={10000} initialMax={150000} placeholderMin="Min km" placeholderMax="Max km" />
              </div>

              {/* Year Range */}
              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4 flex justify-between">Year <ChevronDown className="w-4 h-4" /></h4>
                <DualRangeSlider min={2000} max={2025} step={1} initialMin={2010} initialMax={2022} placeholderMin="Min Year" placeholderMax="Max Year" />
              </div>

              {/* Brand */}
              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-3 flex justify-between">Make <ChevronDown className="w-4 h-4" /></h4>
                <div className="space-y-2">
                  {['Hyundai', 'Kia', 'Chevrolet', 'KG (SsangYong)', 'Renault'].map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-gray-600 font-medium group-hover:text-gray-900">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fuel */}
              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-bold text-gray-900 mb-3 flex justify-between">Fuel Type <ChevronDown className="w-4 h-4" /></h4>
                <div className="space-y-2">
                  {['Gasoline', 'Diesel', 'LPG', 'Hybrid', 'Electric'].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-gray-600 font-medium group-hover:text-gray-900">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl mt-8 hover:bg-blue-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Car Grid Container */}
        <div className="flex-1 overflow-hidden">
          
          {/* Categories / Body Types at the top */}
          <div className="mb-4">
            <h3 className="text-xl font-black text-gray-900 mb-4">Search by Body Type</h3>

            {/* Mobile Select Box */}
            <div className="md:hidden mb-4">
              <div className="relative">
                <select 
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3.5 rounded-xl font-bold outline-none focus:border-blue-500 shadow-sm appearance-none"
                >
                  <option value="">All Body Types</option>
                  {CATEGORIES.map((cat, idx) => (
                    <option key={idx} value={cat.name}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Desktop Icon List */}
            <div className="hidden md:flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 gap-3 no-scrollbar">
              {CATEGORIES.map((cat, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                  className={`group min-w-[120px] flex-1 shrink-0 rounded-2xl p-4 text-center transition-all border flex flex-col items-center justify-center
                    ${selectedCategory === cat.name 
                      ? 'bg-blue-50 border-blue-500 shadow-sm' 
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                >
                  <span className={`text-3xl mb-2 transition-all duration-300 ${selectedCategory === cat.name ? 'grayscale-0 opacity-100 scale-110' : 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110'}`}>{cat.icon}</span>
                  <h4 className={`font-bold text-sm transition-colors ${selectedCategory === cat.name ? 'text-blue-700' : 'text-gray-900 group-hover:text-blue-600'}`}>{cat.name}</h4>
                </button>
              ))}
            </div>
          </div>
          
          {/* Sort / Filter Top Bar */}
          <div className="flex justify-end mb-6">
            <select className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-bold outline-none focus:border-blue-500">
              <option>Recently Added</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Year: Newest First</option>
            </select>
          </div>

          {/* Car Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_CARS.map((car) => (
              <Link key={car.id} to={`/cars/${car.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 group flex flex-col">
                <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4 md:p-5 flex flex-col flex-1">
                  <h4 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {car.name}
                  </h4>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-bold">{car.year}</span>
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-bold">{car.mileage}</span>
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-bold">{car.fuel}</span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-gray-400 mb-0.5">FOB Price</p>
                      <p className="text-2xl font-black text-blue-700">{car.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-12">
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-gray-500 hover:bg-gray-50">&lt;</button>
            <button className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">1</button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-50">2</button>
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-50">3</button>
            <span className="text-gray-400">...</span>
            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center font-bold text-gray-500 hover:bg-gray-50">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
