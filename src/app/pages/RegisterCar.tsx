import { useState } from "react";
import { Camera, UploadCloud, Info, CheckCircle2, ChevronRight, Check } from "lucide-react";
import { motion } from "motion/react";

export function RegisterCar() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-3xl shadow-sm border border-gray-200"
        >
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">차량 등록이 완료되었습니다!</h2>
          <p className="text-xl text-gray-600 mb-8">
            등록하신 차량은 즉시 해외 바이어들에게 노출됩니다.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setIsSuccess(false);
                setStep(1);
              }}
              className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors"
            >
              새로운 차량 추가
            </button>
            <button
              onClick={() => window.location.href = "/inventory"}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              내 차량 목록 보기
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">차량 간편 등록</h1>
        <p className="text-lg text-gray-600">누구나 쉽게 따라할 수 있습니다. 정보를 입력해주세요.</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto hide-scrollbar">
        {[
          { num: 1, label: "기본 정보" },
          { num: 2, label: "차량 사진" },
          { num: 3, label: "가격 및 상태" }
        ].map((s, idx) => (
          <div key={s.num} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${
              step >= s.num ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"
            }`}>
              {step > s.num ? <Check className="w-6 h-6" /> : s.num}
            </div>
            <span className={`ml-3 font-bold whitespace-nowrap ${step >= s.num ? "text-gray-900" : "text-gray-400"}`}>
              {s.label}
            </span>
            {idx < 2 && <ChevronRight className="w-5 h-5 text-gray-300 mx-4" />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit}>
          
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 space-y-8">
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 items-start">
                <Info className="w-6 h-6 shrink-0 mt-0.5" />
                <p className="font-medium text-lg">정확한 차량 정보를 입력할수록 해외 바이어들의 문의가 많아집니다.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-2">차량 번호</label>
                  <input type="text" placeholder="예: 12가 3456" className="w-full text-xl p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-2">제조사</label>
                    <select className="w-full text-xl p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                      <option value="">선택하세요</option>
                      <option>현대</option>
                      <option>기아</option>
                      <option>쉐보레</option>
                      <option>르노코리아</option>
                      <option>KG모빌리티(쌍용)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-2">모델명</label>
                    <input type="text" placeholder="예: 아반떼 AD, 그랜드 스타렉스" className="w-full text-xl p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-2">연식 (년)</label>
                    <select className="w-full text-xl p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                      <option value="">선택</option>
                      {Array.from({length: 20}, (_, i) => 2024 - i).map(y => (
                        <option key={y} value={y}>{y}년</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-2">연료</label>
                    <select className="w-full text-xl p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                      <option value="">선택</option>
                      <option>가솔린</option>
                      <option>디젤</option>
                      <option>LPG</option>
                      <option>하이브리드</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-lg font-bold text-gray-900 mb-2">주행거리 (km)</label>
                    <input type="number" placeholder="예: 120000" className="w-full text-xl p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Photos */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 space-y-8">
              <div className="bg-orange-50 text-orange-800 p-4 rounded-xl flex gap-3 items-start">
                <Camera className="w-6 h-6 shrink-0 mt-0.5" />
                <p className="font-medium text-lg">수출 차량은 외관 상태가 중요합니다. 전후좌우 4장의 사진은 필수입니다.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["정면", "후면", "측면(좌)", "측면(우)"].map((label, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="font-bold text-gray-700 text-center">{label} <span className="text-red-500">*</span></span>
                    <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-500 cursor-pointer transition-colors group">
                      <UploadCloud className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="font-medium text-sm">사진 등록</span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <span className="block text-lg font-bold text-gray-900 mb-2 mt-8">추가 사진 (선택)</span>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-100 cursor-pointer transition-colors">
                      <span className="text-2xl">+</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Price */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-8 space-y-8">
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-2">희망 수출 가격 (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">$</span>
                  <input type="number" placeholder="예: 5000" className="w-full text-2xl font-bold pl-12 pr-4 py-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <p className="mt-2 text-gray-500 font-medium">* 한화 약 <span className="text-gray-900 font-bold">0</span>원으로 계산됩니다. (현재 환율 기준)</p>
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-900 mb-2">차량 상세 설명 (선택)</label>
                <textarea 
                  rows={5}
                  placeholder="차량의 특장점이나 수리 내역, 하체 부식 상태 등을 자유롭게 적어주세요. 바이어들이 번역기를 통해 읽습니다."
                  className="w-full text-lg p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                ></textarea>
              </div>
            </motion.div>
          )}

          {/* Footer Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between rounded-b-2xl">
            {step > 1 ? (
              <button 
                type="button" 
                onClick={() => setStep(step - 1)}
                className="px-6 py-4 bg-white border border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                이전 단계
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button 
                type="button" 
                onClick={() => setStep(step + 1)}
                className="px-10 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 shadow-md transition-colors"
              >
                다음 단계
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-10 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 shadow-md transition-colors disabled:opacity-70 flex items-center gap-2"
              >
                {isSubmitting ? "등록 중..." : "등록 완료하기"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
