import React, { useState, useEffect, useRef } from 'react';
import { X, Clock, Lock, MessageCircle } from 'lucide-react';

interface WidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentId?: string;
  isDemoMode?: boolean;
  onSubscribe?: () => void;
  isUserLoggedIn?: boolean;
  monthlyUsageSeconds?: number;
  onTick?: () => void;
  renewalDate?: string | null;
}

const WidgetModal: React.FC<WidgetModalProps> = ({ 
  isOpen, 
  onClose, 
  agentId, 
  isDemoMode = false,
  onSubscribe,
  isUserLoggedIn = false,
  monthlyUsageSeconds = 0,
  onTick,
  renewalDate
}) => {
  const [demoTimeUsed, setDemoTimeUsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // El límite de demo ahora es de 60 segundos (1 minuto)
  const DEMO_LIMIT_SECONDS = 60; 
  const MONTHLY_LIMIT_SECONDS = 3600; // 60 minutes base limit

  // Cronómetro optimizado
  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        if (isDemoMode) {
          setDemoTimeUsed((prev) => {
            const newTime = prev + 1;
            localStorage.setItem('psia_demo_usage', newTime.toString());
            return newTime;
          });
        } else if (isUserLoggedIn && onTick) {
          onTick();
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, isDemoMode, isUserLoggedIn, onTick]);

  useEffect(() => {
    if (!isOpen) {
      setIsActive(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isDemoMode) {
      const storedTime = localStorage.getItem('psia_demo_usage');
      if (storedTime) setDemoTimeUsed(parseInt(storedTime, 10));
    }
  }, [isDemoMode]);

  const handleWidgetClick = () => {
    setIsActive(!isActive);
  };

  if (!isOpen) return null;

  const isTimeExpired = isDemoMode 
    ? demoTimeUsed >= DEMO_LIMIT_SECONDS 
    : (isUserLoggedIn && monthlyUsageSeconds >= MONTHLY_LIMIT_SECONDS);

  const timeLeft = isDemoMode 
    ? Math.max(0, DEMO_LIMIT_SECONDS - demoTimeUsed)
    : Math.max(0, MONTHLY_LIMIT_SECONDS - monthlyUsageSeconds);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const finalAgentId = agentId || "agent_5801k980pd6de588yakw4v87wbtf";

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-[4px] p-4"
      onClick={onClose}
    >
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-5 right-5 bg-white rounded-full w-9 h-9 cursor-pointer z-[10000] shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-black"
      >
        <X size={20} />
      </button>

      <div 
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeUp 1s ease-out forwards' }}
        className="flex flex-col items-center text-white text-center text-base font-medium max-w-[740px] w-full p-4 md:p-6 relative"
      >
        {isTimeExpired ? (
          <div className="bg-[#1A2232] rounded-[3rem] p-10 md:p-16 border border-white/10 shadow-2xl w-full flex flex-col items-center">
            <div className="bg-brand-orange/20 p-5 rounded-full mb-8">
              <Lock className="text-brand-orange w-12 h-12 md:w-16 md:h-16" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
              {isDemoMode ? "Tiempo de prueba terminado" : "Límite mensual alcanzado"}
            </h2>
            <div className="text-gray-300 text-lg md:text-xl mb-10 max-w-md leading-relaxed space-y-4">
              {isDemoMode ? (
                <p>Has alcanzado el límite de la demostración gratuita. Suscríbete para continuar.</p>
              ) : (
                <>
                  {renewalDate && (
                    <p className="font-semibold text-white">Tu tiempo se reanudará el: <span className="text-brand-orange">{renewalDate}</span></p>
                  )}
                  <p>Si tienes alguna duda contacta a tu coach</p>
                </>
              )}
            </div>
            
            {!isDemoMode && (
              <a 
                href="https://bit.ly/AlumnoUk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 px-10 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle size={24} fill="currentColor" />
                Contactar por WhatsApp
              </a>
            )}

            {isDemoMode && (
              <button 
                onClick={() => onSubscribe && onSubscribe()}
                className="px-12 py-4 bg-brand-orange text-white font-bold text-xl rounded-full shadow-lg transition-transform active:scale-95"
              >
                Suscríbete Aquí
              </button>
            )}
          </div>
        ) : (
          <>
            <div className={`absolute -top-12 md:top-0 right-1/2 translate-x-1/2 md:translate-x-0 md:right-6 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs md:text-sm font-bold border transition-colors whitespace-nowrap ${isActive ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-brand-orange/20 border-brand-orange/30 text-brand-orange'}`}>
              <Clock size={14} className={isActive ? 'animate-spin' : ''} />
              <span>{isActive ? 'Minutos restantes' : 'Pulsa el botón para hablar'} | {formatTime(timeLeft)}</span>
            </div>

            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
              className="block w-[100px] h-[100px] md:w-[130px] md:h-[130px] object-cover rounded-full mx-auto mb-8 border-4 border-white/10 shadow-2xl"
            />

            <p className="leading-relaxed mb-10 text-lg md:text-2xl max-w-2xl mx-auto font-light">
              A partir de este momento comienza la simulación. <span className="font-bold text-brand-orange">El tiempo solo contará cuando el botón de abajo esté activo.</span> Deberás indagar en mi situación para ayudarme. No olvides pedirme retroalimentación al finalizar.
            </p>

            <div 
              className="w-full flex justify-center mt-2 min-h-[100px] md:min-h-[140px] relative z-20 cursor-pointer"
              onClickCapture={handleWidgetClick}
            >
              {/* @ts-ignore */}
              <elevenlabs-convai agent-id={finalAgentId}></elevenlabs-convai>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WidgetModal;