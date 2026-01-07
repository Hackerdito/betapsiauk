import React, { useState, useEffect } from 'react';
import { X, Clock, Lock } from 'lucide-react';

interface WidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentId?: string;
  isDemoMode?: boolean;
  onSubscribe?: () => void;
}

// Custom element handled by @ts-ignore for simplicity in this environment

const WidgetModal: React.FC<WidgetModalProps> = ({ 
  isOpen, 
  onClose, 
  agentId, 
  isDemoMode = false,
  onSubscribe 
}) => {
  const [demoTimeUsed, setDemoTimeUsed] = useState(0);
  const [isActive, setIsActive] = useState(false); // Controls if the timer is currently running
  const DEMO_LIMIT_SECONDS = 300; // 5 minutes

  // Reset active state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsActive(false);
    }
  }, [isOpen]);

  useEffect(() => {
    // Initialize time from local storage on mount
    if (isDemoMode) {
      const storedTime = localStorage.getItem('psia_demo_usage');
      if (storedTime) {
        setDemoTimeUsed(parseInt(storedTime, 10));
      }
    }
  }, [isDemoMode]);

  useEffect(() => {
    let interval: number;

    // Timer only runs if: Open AND DemoMode AND User has clicked (isActive)
    if (isOpen && isDemoMode && isActive) {
      interval = window.setInterval(() => {
        setDemoTimeUsed((prev) => {
          const newTime = prev + 1;
          localStorage.setItem('psia_demo_usage', newTime.toString());
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, isDemoMode, isActive]);

  const handleStartInteraction = () => {
    if (isDemoMode && !isActive) {
      setIsActive(true);
    }
  };

  if (!isOpen) return null;

  // Check if time expired
  const isTimeExpired = isDemoMode && demoTimeUsed >= DEMO_LIMIT_SECONDS;
  const timeLeft = Math.max(0, DEMO_LIMIT_SECONDS - demoTimeUsed);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Default agent ID if none is provided (fallback)
  const finalAgentId = agentId || "agent_5801k980pd6de588yakw4v87wbtf";

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-[4px] p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-5 right-5 bg-white border-none rounded-full text-xl w-9 h-9 cursor-pointer z-[10000] shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-black"
      >
        <X size={20} />
      </button>

      {/* Content Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'fadeUp 1s ease-out forwards'
        }}
        className="flex flex-col items-center text-white text-center text-base font-medium max-w-[740px] w-full p-6 relative"
      >
        {isTimeExpired ? (
          // EXPIRATION VIEW
          <div className="bg-[#1A2232] rounded-[2rem] p-10 border border-white/10 shadow-2xl w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-brand-orange/20 p-4 rounded-full mb-6">
              <Lock className="text-brand-orange w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Tu tiempo de prueba ha terminado
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-md">
              Has alcanzado el límite de 5 minutos de la demostración gratuita. Suscríbete ahora para acceder a prácticas ilimitadas y más de 50 casos clínicos.
            </p>
            <button 
              onClick={() => onSubscribe && onSubscribe()}
              className="px-10 py-4 bg-brand-orange hover:bg-orange-600 text-white font-bold text-lg rounded-full shadow-lg transition-transform active:scale-95 w-full md:w-auto"
            >
              Suscríbete Aquí
            </button>
          </div>
        ) : (
          // WIDGET VIEW
          <>
            {/* Timer for Demo Mode */}
            {isDemoMode && (
              <div className="absolute top-0 right-6 bg-brand-orange/20 border border-brand-orange/30 px-3 py-1 rounded-full flex items-center gap-2 text-sm text-brand-orange font-bold">
                <Clock size={14} />
                <span>Tiempo restante: {formatTime(timeLeft)}</span>
              </div>
            )}

            {/* Avatar Image */}
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
              alt="Mentora Virtual"
              className="block w-[100px] h-[100px] object-cover rounded-full mx-auto mb-6 border-2 border-white/20 shadow-2xl"
            />

            {/* Instructions Text */}
            <p className="leading-relaxed mb-10 text-lg md:text-xl max-w-2xl mx-auto">
              A partir de este momento comienza la simulación. Recuerda que es exclusivamente con fines educativos, no sustituye una atención real. <span className="font-bold text-brand-orange">Durante 5 minutos podrás interactuar con el escenario de práctica.</span> Deberás indagar en mi situación para ayudarme a solucionar mi problema. No olvides pedirme retroalimentación al finalizar.
            </p>

            {/* ElevenLabs Widget Wrapper */}
            <div 
              className="w-full flex justify-center mt-4 min-h-[100px] relative z-20"
              onClickCapture={handleStartInteraction}
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