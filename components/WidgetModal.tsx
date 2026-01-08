import React, { useState, useEffect, useRef } from 'react';
import { X, Clock, Lock } from 'lucide-react';

interface WidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentId?: string;
  isDemoMode?: boolean;
  onSubscribe?: () => void;
  isUserLoggedIn?: boolean;
  monthlyUsageSeconds?: number;
  onUpdateUsage?: (seconds: number) => void;
}

const WidgetModal: React.FC<WidgetModalProps> = ({ 
  isOpen, 
  onClose, 
  agentId, 
  isDemoMode = false,
  onSubscribe,
  isUserLoggedIn = false,
  monthlyUsageSeconds = 0,
  onUpdateUsage
}) => {
  const [demoTimeUsed, setDemoTimeUsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const DEMO_LIMIT_SECONDS = 300; // 5 minutes demo
  const MONTHLY_LIMIT_SECONDS = 3600; // 60 minutes for logged in users

  // Reset active state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsActive(false);
    }
    return () => stopTimer();
  }, [isOpen]);

  useEffect(() => {
    if (isDemoMode) {
      const storedTime = localStorage.getItem('psia_demo_usage');
      if (storedTime) setDemoTimeUsed(parseInt(storedTime, 10));
    }
  }, [isDemoMode]);

  const startTimer = () => {
    if (intervalRef.current) return;
    setIsActive(true);
    
    intervalRef.current = window.setInterval(() => {
      if (isDemoMode) {
        setDemoTimeUsed((prev) => {
          const newTime = prev + 1;
          localStorage.setItem('psia_demo_usage', newTime.toString());
          return newTime;
        });
      } else if (isUserLoggedIn && onUpdateUsage) {
        onUpdateUsage(monthlyUsageSeconds + 1);
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
  };

  const handleWidgetClick = () => {
    if (isActive) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  if (!isOpen) return null;

  // Determine expiration based on mode
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
        className="flex flex-col items-center text-white text-center text-base font-medium max-w-[740px] w-full p-6 relative"
      >
        {isTimeExpired ? (
          <div className="bg-[#1A2232] rounded-[2rem] p-10 border border-white/10 shadow-2xl w-full flex flex-col items-center">
            <div className="bg-brand-orange/20 p-4 rounded-full mb-6">
              <Lock className="text-brand-orange w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {isDemoMode ? "Tiempo de prueba terminado" : "Límite mensual alcanzado"}
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-md">
              {isDemoMode 
                ? "Has alcanzado el límite de 5 minutos de la demostración gratuita. Suscríbete para prácticas ilimitadas."
                : "Has alcanzado tu límite de 60 minutos mensuales. Tu tiempo se reiniciará el próximo mes."}
            </p>
            {isDemoMode && (
              <button 
                onClick={() => onSubscribe && onSubscribe()}
                className="px-10 py-4 bg-brand-orange text-white font-bold text-lg rounded-full shadow-lg transition-transform active:scale-95"
              >
                Suscríbete Aquí
              </button>
            )}
          </div>
        ) : (
          <>
            <div className={`absolute top-0 right-6 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-bold border transition-colors ${isActive ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-brand-orange/20 border-brand-orange/30 text-brand-orange'}`}>
              <Clock size={14} className={isActive ? 'animate-spin' : ''} />
              <span>{isActive ? 'Conversando...' : 'Pulsa el botón para hablar'} | {formatTime(timeLeft)}</span>
            </div>

            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
              className="block w-[100px] h-[100px] object-cover rounded-full mx-auto mb-6 border-2 border-white/20 shadow-2xl"
            />

            <p className="leading-relaxed mb-10 text-lg md:text-xl max-w-2xl mx-auto">
              A partir de este momento comienza la simulación. <span className="font-bold text-brand-orange">El tiempo solo contará cuando el botón de abajo esté activo.</span> Deberás indagar en mi situación para ayudarme. No olvides pedirme retroalimentación al finalizar.
            </p>

            <div 
              className="w-full flex justify-center mt-4 min-h-[100px] relative z-20 cursor-pointer"
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