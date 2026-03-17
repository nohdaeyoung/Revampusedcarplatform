import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Info, DollarSign } from "lucide-react";

export function MarketPrice() {
  const [searchModel, setSearchModel] = useState("아반떼 AD");

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">수출 시세 조회</h1>
          <p className="text-lg text-gray-600 font-medium">실제 해외 수출 거래 데이터를 기반으로 평균 매입/판매 시세를 확인하세요.</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-900 to-[#0A2540] rounded-3xl p-8 md:p-12 shadow-xl text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-black text-white">어떤 차량의 시세가 궁금하신가요?</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="예: 쏘나타 뉴 라이즈, 포터2"
                value={searchModel}
                onChange={(e) => setSearchModel(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-4 focus:ring-blue-500/50 font-bold text-lg bg-white text-gray-900 shadow-inner"
              />
            </div>
            <button className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-blue-500/30 whitespace-nowrap">
              시세 조회
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <span className="text-blue-200 text-sm font-medium">인기 검색어:</span>
            {["아반떼 AD", "싼타페 TM", "포터2 1톤", "투싼 IX"].map(tag => (
              <button key={tag} className="text-white text-sm font-bold bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors border border-white/20">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {searchModel && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">
              <CarIcon />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900">현대 아반떼 AD (2015~2018)</h3>
              <p className="text-gray-500 font-medium">가솔린 1.6 / 무사고 / 주행거리 10만km 기준</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Price Box */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 flex flex-col items-center justify-center text-center">
              <p className="font-bold text-gray-500 mb-2 uppercase tracking-wide">예상 수출 판매가 (FOB 기준)</p>
              <div className="flex items-baseline gap-2 mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
                <span className="text-5xl font-black text-gray-900">4,800</span>
                <span className="text-2xl font-bold text-gray-500">~</span>
                <span className="text-5xl font-black text-gray-900">5,500</span>
              </div>
              <p className="text-lg font-bold text-blue-700 bg-blue-100 px-4 py-1.5 rounded-full">
                한화 약 640만 원 ~ 730만 원
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl font-bold border border-green-100">
                <TrendingUp className="w-5 h-5" />
                <span>지난달 대비 $200 상승 (요르단 수요 증가)</span>
              </div>
            </div>

            {/* Info Box */}
            <div className="space-y-6">
              <div>
                <h4 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-gray-400" /> 주요 수출 국가
                </h4>
                <div className="flex gap-2">
                  <span className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-gray-700 shadow-sm">요르단 (80%)</span>
                  <span className="bg-white border border-gray-200 px-4 py-2 rounded-lg font-bold text-gray-700 shadow-sm">리비아 (15%)</span>
                </div>
              </div>

              <div>
                <h4 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-gray-400" /> 바이어 감가 주요 요인
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-600 font-medium">
                    <TrendingDown className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>썬루프 없음 (-$300)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 font-medium">
                    <TrendingDown className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>외관 스크래치 및 도색 필요 판당 (-$50)</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-600 font-medium">
                    <TrendingDown className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>스마트키 없음 (-$150)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/>
      <path d="M9 17h6"/>
      <circle cx="17" cy="17" r="2"/>
    </svg>
  );
}
