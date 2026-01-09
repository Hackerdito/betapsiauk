import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Key, LogOut, ChevronDown, Clock, User as UserIcon } from 'lucide-react';
import LoginModal from './LoginModal';
import { Page, User } from '../App';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user: User | null;
  onLogout: () => void;
  onLogin: (user: User) => void;
  monthlyUsageSeconds?: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, user, onLogout, onLogin, monthlyUsageSeconds = 0 }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isTimeMenuOpen, setIsTimeMenuOpen] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const timeMenuRef = useRef<HTMLDivElement>(null);

  const MONTHLY_LIMIT_SECONDS = 3600; // 60 minutes
  const timeLeftSeconds = Math.max(0, MONTHLY_LIMIT_SECONDS - monthlyUsageSeconds);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs} min`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (timeMenuRef.current && !timeMenuRef.current.contains(event.target as Node)) {
        setIsTimeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="w-full bg-[#1A2232] px-6 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 border-b border-white/5 shadow-md">
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
          <img 
            src="https://fileuk.netlify.app/universidaduk.png" 
            alt="Universidad UK" 
            className="h-10 md:h-12 w-auto object-contain"
          />
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            currentPage === 'home' ? (
              <>
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="text-white hover:text-gray-300 text-sm font-medium transition-colors focus:outline-none"
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={() => onNavigate('subscription')}
                  className="bg-brand-orange hover:bg-orange-600 text-white text-sm font-medium py-2 px-6 rounded transition-colors shadow-lg"
                >
                  Suscribete Aquí
                </button>
              </>
            ) : (
              <button 
                onClick={() => onNavigate('home')}
                className="border border-white text-white hover:bg-white/10 text-lg font-medium py-2 px-8 rounded-lg transition-colors"
              >
                Home
              </button>
            )
          ) : (
            <div className="flex items-center gap-3">
              {/* BOTÓN 2: Tiempo Restante */}
              <div className="relative" ref={timeMenuRef}>
                <button 
                  onClick={() => setIsTimeMenuOpen(!isTimeMenuOpen)}
                  className="flex items-center gap-3 border border-white/10 hover:border-white/30 bg-white/5 text-white py-2 px-5 rounded-full transition-all"
                >
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  <span className="font-semibold text-[15px] tracking-tight">Tiempo restante</span>
                  <ChevronDown size={18} className={`text-white/70 transition-transform duration-200 ${isTimeMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isTimeMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-brand-orange mb-3">
                        <Clock size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest">Plan Mensual</span>
                      </div>
                      <div className="text-3xl font-black text-gray-900">
                        {formatTime(timeLeftSeconds)}
                      </div>
                      <p className="text-xs text-gray-400 mt-2 font-medium italic">
                        El tiempo se reinicia cada mes automáticamente.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* BOTÓN 1: Usuario */}
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 border border-white/10 hover:border-white/30 bg-white/5 text-white py-2 px-5 rounded-full transition-all"
                >
                  <UserIcon size={18} className="text-white/70" />
                  <span className="font-semibold text-[15px] tracking-tight">{user.name}</span>
                  <ChevronDown size={18} className={`text-white/70 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-5 border-b border-gray-100 flex items-center gap-4">
                      <img src={user.avatar} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-bold text-gray-900 truncate">{user.name}</span>
                        <span className="text-xs text-gray-500 truncate">{user.email}</span>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors text-left">
                        <Key size={16} className="text-gray-400" />
                        Cambiar contraseña
                      </button>
                      <button 
                        onClick={() => {
                          onLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left"
                      >
                        <LogOut size={16} />
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white p-2">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-[#1A2232] z-40 md:hidden animate-in fade-in duration-200">
          <div className="flex flex-col p-8 gap-6 items-center">
            {!user ? (
               currentPage === 'home' ? (
                <>
                  <button onClick={() => setIsLoginOpen(true)} className="text-white text-lg font-medium w-full py-4 border-b border-white/10">Iniciar Sesión</button>
                  <button onClick={() => onNavigate('subscription')} className="bg-brand-orange text-white text-lg font-bold py-4 w-full rounded-xl">Suscribete Aquí</button>
                </>
              ) : (
                <button onClick={() => onNavigate('home')} className="border border-white text-white text-lg font-bold py-4 w-full rounded-xl">Home</button>
              )
            ) : (
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                  <img src={user.avatar} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex flex-col">
                    <span className="text-white font-bold">{user.name}</span>
                    <span className="text-gray-400 text-sm">{user.email}</span>
                  </div>
                </div>
                <div className="p-4 bg-brand-orange/20 rounded-2xl flex justify-between items-center">
                  <span className="text-brand-orange font-bold">Tiempo restante</span>
                  <span className="text-white font-bold">{formatTime(timeLeftSeconds)}</span>
                </div>
                <button className="w-full text-white text-left px-4 py-4 border-b border-white/5 flex items-center gap-3"><Key size={20} /> Cambiar contraseña</button>
                <button onClick={onLogout} className="w-full text-red-500 text-left px-4 py-4 flex items-center gap-3"><LogOut size={20} /> Cerrar sesión</button>
              </div>
            )}
          </div>
        </div>
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={onLogin} />
    </>
  );
};

export default Navbar;