import { useState } from "react";
import { Search, MapPin, Anchor, FileText, CheckCircle2, AlertCircle, Clock } from "lucide-react";

const SHIPPING_DATA = [
  {
    id: "BKG-2026-001",
    carName: "2020 현대 싼타페 TM",
    buyer: "Oleg Smirnov",
    destination: "블라디보스톡, 러시아",
    status: "선적완료",
    vessel: "OCEAN PIONEER V.42",
    departureDate: "2026-03-15",
    arrivalDate: "2026-03-18",
    docs: ["인보이스", "말소증", "B/L 발급완료"]
  },
  {
    id: "BKG-2026-002",
    carName: "2017 현대 그랜드 스타렉스",
    buyer: "Ahmed Ali",
    destination: "트리폴리, 리비아",
    status: "야드대기",
    vessel: "미정 (부킹 진행중)",
    departureDate: "예정 (3월 말)",
    arrivalDate: "-",
    docs: ["인보이스", "말소증 대기"]
  },
  {
    id: "BKG-2026-003",
    carName: "2019 현대 쏘나타 뉴 라이즈",
    buyer: "Hussein",
    destination: "아카바, 요르단",
    status: "운항중",
    vessel: "GLOVIS CAPTAIN V.11",
    departureDate: "2026-02-28",
    arrivalDate: "2026-03-22",
    docs: ["인보이스", "말소증", "B/L 발급완료", "원산지증명서"]
  }
];

export function Shipping() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "야드대기": return "bg-orange-100 text-orange-700 border-orange-200";
      case "선적완료": return "bg-blue-100 text-blue-700 border-blue-200";
      case "운항중": return "bg-purple-100 text-purple-700 border-purple-200";
      case "도착완료": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "야드대기": return <Clock className="w-5 h-5" />;
      case "선적완료": return <Anchor className="w-5 h-5" />;
      case "운항중": return <MapPin className="w-5 h-5" />;
      case "도착완료": return <CheckCircle2 className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">선적 및 수출 현황</h1>
          <p className="text-lg text-gray-600 font-medium">계약이 완료된 차량의 선적 스케줄과 필수 서류를 확인하세요.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden p-6 md:p-8">
        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="차량명, 바이어, 목적지 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-bold bg-gray-50"
            />
          </div>
          <button className="w-full md:w-auto px-6 py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors">
            포워딩 업체 문의하기
          </button>
        </div>

        {/* List */}
        <div className="space-y-4">
          {SHIPPING_DATA.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow bg-white flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              
              {/* Status Badge */}
              <div className="shrink-0 w-full lg:w-40 flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border mb-2 w-full justify-center ${getStatusColor(item.status)}`}>
                  {getStatusIcon(item.status)}
                  {item.status}
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase">{item.id}</span>
              </div>

              {/* Main Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-black text-gray-900 mb-2 truncate">{item.carName}</h3>
                <div className="flex flex-wrap items-center gap-4 text-gray-600 font-medium">
                  <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-lg">
                    <span className="font-bold text-gray-900">바이어:</span> {item.buyer}
                  </div>
                  <div className="flex items-center gap-1.5 bg-blue-50 text-blue-800 px-3 py-1 rounded-lg">
                    <MapPin className="w-4 h-4" />
                    <span className="font-bold">도착지:</span> {item.destination}
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="shrink-0 w-full lg:w-64 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                  <Anchor className="w-4 h-4 text-gray-500" />
                  <span className="font-bold text-gray-900 text-sm truncate">{item.vessel}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="block text-gray-400 font-bold mb-0.5">출항 (ETD)</span>
                    <span className="font-bold text-gray-800">{item.departureDate}</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 font-bold mb-0.5">입항 (ETA)</span>
                    <span className="font-bold text-gray-800">{item.arrivalDate}</span>
                  </div>
                </div>
              </div>

              {/* Docs */}
              <div className="shrink-0 w-full lg:w-48">
                <h4 className="text-sm font-bold text-gray-400 mb-2 flex items-center gap-1">
                  <FileText className="w-4 h-4" /> 필요 서류
                </h4>
                <div className="flex flex-col gap-1.5">
                  {item.docs.map((doc, idx) => (
                    <span key={idx} className={`text-sm font-bold flex items-center gap-1.5 ${doc.includes('완료') ? 'text-green-600' : 'text-gray-600'}`}>
                      {doc.includes('완료') ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-400 ml-1.5 mr-1" />}
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
