import { useState } from "react";
import { Search, MessageSquare, Star, Clock, Globe } from "lucide-react";

const INQUIRIES_DATA = [
  {
    id: 1,
    buyerName: "Ahmed Ali",
    country: "리비아",
    countryCode: "LY",
    carName: "2017 현대 그랜드 스타렉스 11인승",
    message: "안녕. 나는 리비아에서 왔어. 이 차의 엔진 소리 영상이 필요해. 그리고 마지막 가격은 얼마야?",
    date: "10분 전",
    isUnread: true,
    priceOffer: "$8,000"
  },
  {
    id: 2,
    buyerName: "Oleg Smirnov",
    country: "러시아",
    countryCode: "RU",
    carName: "2020 현대 싼타페 TM 2.0 디젤",
    message: "하체 부식 사진 좀 더 보내줄 수 있나요? 블라디보스톡까지 배송 조건이 어떻게 됩니까?",
    date: "2시간 전",
    isUnread: true,
    priceOffer: "제시 안함"
  },
  {
    id: 3,
    buyerName: "Juan Carlos",
    country: "칠레",
    countryCode: "CL",
    carName: "2018 기아 K5 2세대",
    message: "가격이 좋습니다. 내일 왓츠앱으로 통화 가능할까요?",
    date: "어제",
    isUnread: false,
    priceOffer: "$5,000"
  },
  {
    id: 4,
    buyerName: "Hussein",
    country: "요르단",
    countryCode: "JO",
    carName: "2019 현대 쏘나타 뉴 라이즈",
    message: "택시 부활차 인가요? 무사고 확실한가요? 차대번호 사진 부탁합니다.",
    date: "2일 전",
    isUnread: false,
    priceOffer: "제시 안함"
  }
];

export function Inquiries() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">해외 바이어 문의</h1>
          <p className="text-gray-600 font-medium">바이어의 문의에 빠르게 답변하면 거래 성사율이 크게 올라갑니다.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs & Search */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2.5 rounded-xl font-bold transition-colors ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              전체 메시지
            </button>
            <button 
              onClick={() => setActiveTab("unread")}
              className={`px-6 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2 ${activeTab === 'unread' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              안 읽음
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
            </button>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="바이어 이름, 차량명 검색"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
            />
          </div>
        </div>

        {/* Messages List */}
        <div className="divide-y divide-gray-100">
          {INQUIRIES_DATA.filter(msg => activeTab === 'all' || (activeTab === 'unread' && msg.isUnread)).map((inquiry) => (
            <div key={inquiry.id} className={`p-6 hover:bg-blue-50/50 transition-colors cursor-pointer group ${inquiry.isUnread ? 'bg-white' : 'bg-gray-50/30'}`}>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                
                {/* Buyer Info */}
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold text-xl shrink-0">
                    {inquiry.buyerName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      {inquiry.buyerName}
                      {inquiry.isUnread && <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 flex items-center gap-1 mt-1">
                      <Globe className="w-4 h-4" /> {inquiry.country}
                    </p>
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-sm font-bold text-gray-700">
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                    문의 차량: {inquiry.carName}
                  </div>
                  <p className={`text-lg line-clamp-2 ${inquiry.isUnread ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                    "{inquiry.message}"
                  </p>
                  <div className="flex gap-4 text-sm font-medium">
                    {inquiry.priceOffer !== "제시 안함" && (
                      <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">제안가: {inquiry.priceOffer}</span>
                    )}
                  </div>
                </div>

                {/* Meta & Action */}
                <div className="flex flex-col items-end gap-4 shrink-0">
                  <div className="text-sm font-medium text-gray-400 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {inquiry.date}
                  </div>
                  <button className="px-6 py-2.5 bg-white border-2 border-blue-600 text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    답변하기
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
