import { motion } from "motion/react";
import { Link } from "react-router";
import { Car, CheckCircle2, Clock, MessageSquare, AlertCircle, Ship, ArrowRight, TrendingUp, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export function Dashboard() {
  const stats = [
    { label: "전체 보유 차량", value: "24", icon: Car, color: "bg-blue-50 text-blue-600 border-blue-200" },
    { label: "수출 대기 (야드)", value: "15", icon: Clock, color: "bg-orange-50 text-orange-600 border-orange-200" },
    { label: "이번달 선적 완료", value: "9", icon: CheckCircle2, color: "bg-green-50 text-green-600 border-green-200" },
    { label: "신규 바이어 문의", value: "3", icon: MessageSquare, color: "bg-purple-50 text-purple-600 border-purple-200" },
  ];

  const recentCars = [
    { id: 1, name: "2019 현대 쏘나타 뉴 라이즈", price: "$6,500", status: "판매대기", views: 142 },
    { id: 2, name: "2018 기아 K5", price: "$5,200", status: "문의중", views: 89 },
    { id: 3, name: "2020 현대 싼타페 TM", price: "$12,000", status: "계약완료", views: 320 },
    { id: 4, name: "2017 현대 그랜드 스타렉스", price: "$8,500", status: "선적준비", views: 215 },
  ];

  const chartData = [
    { name: '1주차', 판매량: 2, 문의량: 12 },
    { name: '2주차', 판매량: 3, 문의량: 18 },
    { name: '3주차', 판매량: 1, 문의량: 15 },
    { name: '4주차', 판매량: 4, 문의량: 25 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">안녕하세요, 김딜러님! 👋</h1>
          <p className="text-lg text-gray-600 font-medium">오늘도 성공적인 수출을 응원합니다. 현재 비즈니스 현황입니다.</p>
        </div>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
        >
          + 새 차량 등록하기
        </Link>
      </div>

      {/* Action Banner */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-gradient-to-br from-[#0A2540] to-blue-900 rounded-3xl p-6 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="flex items-center gap-6 z-10 w-full md:w-auto">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 backdrop-blur-md border border-white/20">
            <TrendingUp className="w-10 h-10 text-blue-400" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full text-blue-200 text-sm font-bold mb-3 border border-blue-400/30">
              <Activity className="w-4 h-4" /> 핫 트렌드
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-2">요르단 바이어들이 '아반떼'를 찾고 있어요!</h2>
            <p className="text-blue-200 text-lg font-medium">최근 1주일간 아반떼 AD 모델 문의가 300% 급증했습니다.</p>
          </div>
        </div>
        <Link
          to="/market-price"
          className="w-full md:w-auto bg-white text-[#0A2540] px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-gray-50 transition-colors shadow-lg flex items-center justify-center gap-2 z-10 shrink-0"
        >
          시세 확인하기 <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-white p-6 rounded-3xl shadow-sm border ${stat.color.split(' ')[2]} flex flex-col hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3.5 rounded-2xl ${stat.color.split(' ').slice(0, 2).join(' ')}`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <h3 className="text-gray-600 font-bold text-lg">{stat.label}</h3>
            </div>
            <div className="mt-auto">
              <p className="text-4xl font-black text-gray-900">{stat.value}<span className="text-xl text-gray-400 font-bold ml-1">건</span></p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black text-gray-900">이번 달 성과 요약</h3>
            <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-bold">
              <option>2026년 3월</option>
              <option>2026년 2월</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontWeight: 'bold' }} />
                <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="문의량" fill="#93C5FD" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="판매량" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts & Tips */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 md:p-8 flex flex-col h-full">
          <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
            <AlertCircle className="w-7 h-7 text-red-500" />
            중요 알림
          </h3>
          <div className="space-y-4 flex-1">
            <div className="p-5 bg-red-50 rounded-2xl border border-red-100">
              <div className="flex justify-between items-start mb-2">
                <p className="font-black text-red-800 text-lg">리비아 선적 지연 안내</p>
                <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded-md">필독</span>
              </div>
              <p className="text-red-700 font-medium leading-relaxed">트리폴리 항구 기상 악화로 이번 주 출항 예정 선박이 3일 지연되었습니다.</p>
            </div>
            <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="font-black text-blue-800 text-lg mb-2">수출 꿀팁 💡</p>
              <p className="text-blue-700 font-medium leading-relaxed">하체(언더바디) 부식 여부를 묻는 바이어가 많습니다. 리프트 띄운 사진을 꼭 첨부하세요!</p>
            </div>
          </div>
        </div>

        {/* Recent Cars */}
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-2xl font-black text-gray-900">최근 등록된 차량</h3>
            <Link to="/inventory" className="text-blue-600 font-bold hover:underline flex items-center gap-1 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              내 차량 전체보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white text-gray-500 border-b border-gray-200">
                  <th className="p-5 font-bold text-sm uppercase tracking-wider">차량명</th>
                  <th className="p-5 font-bold text-sm uppercase tracking-wider">희망 가격</th>
                  <th className="p-5 font-bold text-sm uppercase tracking-wider">조회수</th>
                  <th className="p-5 font-bold text-sm uppercase tracking-wider">현재 상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentCars.map((car) => (
                  <tr key={car.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="p-5 font-bold text-gray-900 text-lg">{car.name}</td>
                    <td className="p-5 font-black text-blue-700 text-lg">{car.price}</td>
                    <td className="p-5 font-bold text-gray-500">{car.views}회</td>
                    <td className="p-5">
                      <span className={`inline-flex items-center px-3.5 py-1.5 rounded-lg text-sm font-bold shadow-sm ${
                        car.status.includes('완료') ? 'bg-green-100 text-green-700 border border-green-200' :
                        car.status.includes('준비') ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        car.status.includes('문의') ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                        'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {car.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
