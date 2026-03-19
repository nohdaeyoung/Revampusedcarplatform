import { useState } from "react";
import { MessageCircle, Phone, CheckCircle2, ChevronRight, ChevronLeft, Share2, Heart, ShieldCheck, MapPin, Mail } from "lucide-react";
import { Link } from "react-router";

export function CarDetail() {
  const thumbnails = [
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1564503227828-dd438692795e?auto=format&fit=crop&q=80&w=1200"
  ];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? thumbnails.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === thumbnails.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-gray-50 pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500 font-medium overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/cars" className="hover:text-blue-600">Cars</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="#" className="hover:text-blue-600">Hyundai</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-bold">2019 Sonata New Rise</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6 md:mt-8">
        {/* Title Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded text-xs font-black uppercase tracking-wider">LHD</span>
              <span className="bg-gray-200 text-gray-700 px-2.5 py-1 rounded text-xs font-black uppercase tracking-wider">Gasoline</span>
              <span className="text-gray-400 text-sm font-medium ml-2">Ref No. EX-19340</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">2019 Hyundai Sonata New Rise 2.0 Smart</h1>
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-colors shadow-sm">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-200 text-gray-600 transition-colors shadow-sm">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[70%_auto] gap-8">
          {/* Left: Info */}
          <div className="space-y-8 flex flex-col">
            {/* Gallery (order-1 on mobile) */}
            <div className="order-1 bg-white p-4 shadow-sm border border-gray-200">
              <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden mb-4 bg-gray-100 relative group">
                <img src={thumbnails[activeImageIndex]} alt="Car" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  Verified Condition
                </div>
                {/* Navigation Arrows */}
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all focus:outline-none"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all focus:outline-none"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {thumbnails.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-[4/3] overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-600/20' : 'border-transparent hover:border-gray-300'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Price Card Mobile Version (Visible only on mobile, order-2) */}
            <div className="order-2 lg:hidden">
              <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-200">
                <div className="mb-6">
                  <p className="text-gray-500 font-bold uppercase tracking-wider mb-2">FOB Price (Korea)</p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-blue-700 tracking-tight">$6,500</span>
                    <span className="text-xl text-gray-400 font-bold mb-1">USD</span>
                  </div>
                  <p className="text-sm text-gray-400 font-medium mt-2">* Does not include ocean freight</p>
                </div>

                <div className="space-y-3 mb-8">
                  <button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3.5 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-md">
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </button>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3.5 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-md">
                    <Mail className="w-5 h-5" />
                    Email Inquiry
                  </button>
                  <button className="w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-3.5 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-md">
                    <Phone className="w-5 h-5" />
                    Request a Call
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wide text-sm">Dealer Information</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-700 font-black text-xl shrink-0">
                      KD
                    </div>
                    <div>
                      <p className="font-black text-lg text-gray-900">Kim's Global Auto</p>
                      <div className="flex items-center gap-1 text-sm text-gray-500 font-medium mt-0.5">
                        <MapPin className="w-3.5 h-3.5" /> Incheon, South Korea
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Verified Export Dealer
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="order-3 bg-white p-6 md:p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-black text-gray-900 mb-6 pb-4 border-b border-gray-100">Vehicle Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6">
                <div>
                  <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wide">Make</p>
                  <p className="text-lg font-bold text-gray-900">Hyundai</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wide">Model</p>
                  <p className="text-lg font-bold text-gray-900">Sonata</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wide">Year</p>
                  <p className="text-lg font-bold text-gray-900">2019</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wide">Mileage</p>
                  <p className="text-lg font-bold text-gray-900">85,000 km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wide">Engine Size</p>
                  <p className="text-lg font-bold text-gray-900">1,999 cc</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wide">Fuel Type</p>
                  <p className="text-lg font-bold text-gray-900">Gasoline</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wide">Transmission</p>
                  <p className="text-lg font-bold text-gray-900">Automatic</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wide">Steering</p>
                  <p className="text-lg font-bold text-gray-900">LHD</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wide">Drive</p>
                  <p className="text-lg font-bold text-gray-900">2WD</p>
                </div>
              </div>
            </div>

            {/* Vehicle Options */}
            <div className="order-4 bg-white p-6 md:p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-black text-gray-900 mb-6 pb-4 border-b border-gray-100">Vehicle Options</h2>
              <div className="overflow-hidden border border-gray-200">
                <table className="w-full text-left border-collapse bg-white">
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors">
                      <th className="py-5 px-6 bg-gray-50/50 text-gray-500 font-bold tracking-wide text-sm w-1/3 md:w-1/4 uppercase border-r border-gray-100">Safety</th>
                      <td className="py-5 px-6 text-gray-900 font-bold text-base">ABS, ESC, Parking Sensors (Front/Rear), 6 Airbags</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <th className="py-5 px-6 bg-gray-50/50 text-gray-500 font-bold tracking-wide text-sm uppercase border-r border-gray-100">Exterior</th>
                      <td className="py-5 px-6 text-gray-900 font-bold text-base">18" Alloy Wheels, LED Headlamps, Panoramic Sunroof</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <th className="py-5 px-6 bg-gray-50/50 text-gray-500 font-bold tracking-wide text-sm uppercase border-r border-gray-100">Interior</th>
                      <td className="py-5 px-6 text-gray-900 font-bold text-base">Full Leather Seats, Heated & Ventilated Front Seats</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <th className="py-5 px-6 bg-gray-50/50 text-gray-500 font-bold tracking-wide text-sm uppercase border-r border-gray-100">Convenience</th>
                      <td className="py-5 px-6 text-gray-900 font-bold text-base">Smart Key, 8" Navigation, Rear View Camera, Cruise Control</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Description */}
            <div className="order-5 bg-white p-6 md:p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-black text-gray-900 mb-6 pb-4 border-b border-gray-100">Seller's Note</h2>
              <div className="prose max-w-none text-gray-600 font-medium leading-relaxed">
                <p>Very clean condition. Engine and transmission are working perfectly.</p>
                <p>No major accidents. Original paint mostly. Sunroof, Navigation, Rear camera included.</p>
                <p>FOB price includes all local export handling fees. Can arrange shipping to any major port.</p>
              </div>
            </div>
          </div>

          {/* Right: Pricing & Contact (Desktop Version) */}
          <div className="hidden lg:block space-y-6">
            {/* Price Card */}
            <div className="bg-white p-6 md:p-8 shadow-lg border border-gray-200 sticky top-28">
              <div className="mb-6">
                <p className="text-gray-500 font-bold uppercase tracking-wider mb-2">FOB Price (Korea)</p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black text-blue-700 tracking-tight">$6,500</span>
                  <span className="text-xl text-gray-400 font-bold mb-1">USD</span>
                </div>
                <p className="text-sm text-gray-400 font-medium mt-2">* Does not include ocean freight</p>
              </div>

              <div className="space-y-3 mb-8">
                <button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-3.5 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-md">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3.5 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-md">
                  <Mail className="w-5 h-5" />
                  Email Inquiry
                </button>
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-3.5 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-md">
                  <Phone className="w-5 h-5" />
                  Request a Call
                </button>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wide text-sm">Dealer Information</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-700 font-black text-xl shrink-0">
                    KD
                  </div>
                  <div>
                    <p className="font-black text-lg text-gray-900">Kim's Global Auto</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 font-medium mt-0.5">
                      <MapPin className="w-3.5 h-3.5" /> Incheon, South Korea
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Verified Export Dealer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
