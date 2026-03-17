import { Outlet, Link } from "react-router";
import { CarFront, Menu, X, Phone, MessageCircle, Mail, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster, toast } from "sonner";

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Prevent background scrolling when login modal is open
  useEffect(() => {
    if (isLoginOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isLoginOpen]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    
    // Simulate login
    toast.success("Successfully logged in!");
    setIsLoginOpen(false);
    setEmail("");
    setPassword("");
  };

  const openLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Sonner Toaster */}
      <Toaster position="top-center" richColors />

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-[#0A2540]">
            <CarFront className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-none">EXPORT<span className="text-blue-600">CAR</span></h1>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 tracking-wider">KOREA USED CARS</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <Link to="/cars" className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">Car Search</Link>
            <a href="#" onClick={openLogin} className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">Login</a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-2">
                <Link to="/cars" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-gray-800 p-4 border-b border-gray-100 hover:bg-gray-50 rounded-xl transition-colors">Car Search</Link>
                <a href="#" onClick={openLogin} className="text-lg font-bold text-gray-800 p-4 hover:bg-gray-50 rounded-xl transition-colors">Login</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0A2540] text-gray-400 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-white mb-6">
              <CarFront className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-black tracking-tight">EXPORT<span className="text-blue-500">CAR</span></span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              한국의 믿을 수 있는 중고차를 전 세계 바이어에게 안전하게 연결해 드립니다. 
              수출용 차량 매입/판매의 새로운 기준을 제시합니다.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/cars" className="hover:text-blue-400 transition-colors">Car Search</Link></li>
              <li><a href="#" onClick={openLogin} className="hover:text-blue-400 transition-colors cursor-pointer">Login</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><Phone className="w-5 h-5 text-gray-500" /> +82-10-1234-5678</li>
              <li className="flex items-center gap-2"><MessageCircle className="w-5 h-5 text-gray-500" /> WhatsApp Available</li>
              <li>Email: support@exportcar.co.kr</li>
              <li>Seoul, South Korea</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-white/10 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 ExportCar BizInfoGroup. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10 p-2 bg-white/5 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/20 text-blue-500 mb-4">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">Welcome Back</h2>
                  <p className="text-gray-400 font-medium">Please sign in to your buyer account</p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gray-400 font-bold mb-2 text-sm uppercase tracking-wide">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-500" />
                      </div>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                        placeholder="buyer@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-bold mb-2 text-sm uppercase tracking-wide">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="w-5 h-5 text-gray-500" />
                      </div>
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900 bg-white/5" />
                      <span className="text-sm font-bold text-gray-400">Remember me</span>
                    </label>
                    <a href="#" className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">Forgot Password?</a>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-lg transition-colors mt-2"
                  >
                    Sign In
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                  <p className="text-gray-400 font-medium text-sm">
                    Don't have an account? <a href="#" className="text-blue-400 font-bold hover:text-blue-300 transition-colors">Register as Buyer</a>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
