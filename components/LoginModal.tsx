import React from 'react';
import { X, Mail, Lock } from 'lucide-react';
import { User } from '../App';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Firebase successful login with mock data
    onLogin({
      name: "Gerardo Dev",
      email: "gerardo.rodriguez@kuepa.com",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop"
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[400px] bg-white rounded-[2rem] shadow-2xl p-8 transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8 mt-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido</h2>
          <p className="text-gray-500 text-sm font-medium">Ingresa tus datos para continuar</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1.5 text-left">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-orange transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="Correo electrónico"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-100 rounded-2xl outline-none transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-orange transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="Contraseña"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-transparent focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-100 rounded-2xl outline-none transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
              />
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-xs font-medium text-brand-orange hover:text-orange-700 transition-colors">¿Olvidaste tu contraseña?</a>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-orange hover:bg-orange-600 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-orange-500/20 transition-all transform active:scale-[0.98]"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="my-8 flex items-center gap-3">
          <div className="h-px bg-gray-100 flex-1" />
          <span className="text-xs text-gray-400 font-medium">o continúa con</span>
          <div className="h-px bg-gray-100 flex-1" />
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-semibold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-3 group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        <p className="mt-8 text-center text-xs text-gray-500">
          ¿No tienes una cuenta? <a href="#" className="text-brand-orange font-bold hover:underline">Regístrate</a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;