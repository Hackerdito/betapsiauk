import React, { useState } from 'react';
import { Headphones, Calendar, PlayCircle, RefreshCw, ShieldCheck, CheckCircle2, Smartphone, ArrowRight } from 'lucide-react';
import WidgetModal from './WidgetModal';
import { Page } from '../App';

interface FeaturesProps {
  onNavigate: (page: Page) => void;
}

const Features: React.FC<FeaturesProps> = ({ onNavigate }) => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  return (
    <>
      <section className="bg-[#F8F9FA] py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-medium text-center text-gray-900 mb-16 leading-tight">
            ¿Qué obtienes al unirte al<br />
            Programa de Mentores con Psia?
          </h2>

          {/* Highlighted Feature Box - Redesigned (Reduced Height) */}
          <div className="bg-white rounded-[2rem] p-3 md:p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row items-stretch gap-6 md:gap-10 max-w-6xl mx-auto mb-16">
            
            {/* Left Image Section */}
            <div className="w-full md:w-[35%] shrink-0">
               <img 
                src="https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Psia Voice Interface"
                className="w-full h-full min-h-[200px] md:min-h-[250px] object-cover rounded-[1.5rem]"
               />
            </div>

            {/* Right Content Section */}
            <div className="flex-1 flex items-center pr-4 md:pr-8 py-2">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full">
                
                {/* Icon - Reduced size slightly to fit new height */}
                <div className="shrink-0 text-gray-200">
                   <Headphones size={80} strokeWidth={1} />
                </div>
                
                {/* Text Content */}
                <div className="flex-1 text-center md:text-left space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1A2232]">
                    Interfaz por voz en tiempo real
                  </h3>
                  <p className="text-gray-500 text-lg mb-3">
                    Simula sesiones reales con pacientes virtuales.
                  </p>
                  <button 
                    onClick={() => setIsWidgetOpen(true)}
                    className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg text-sm font-semibold transition-colors group"
                  >
                    Ver cómo funciona 
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Item 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50 flex items-start gap-4">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                <Calendar size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Más de 50 casos reales</h4>
                <p className="text-xs text-gray-500">Practica distintos enfoques terapéuticos.</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50 flex items-start gap-4">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                <PlayCircle size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Retroalimentación inteligente</h4>
                <p className="text-xs text-gray-500">Feedback inmediato después de cada sesión.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50 flex items-start gap-4">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                <RefreshCw size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Repite sin limite</h4>
                <p className="text-xs text-gray-500">Entrena las veces que necsites.</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50 flex items-start gap-4">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Entorno seguro</h4>
                <p className="text-xs text-gray-500">Diseñado para generar confianza clínica.</p>
              </div>
            </div>

             {/* Item 5 */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50 flex items-start gap-4">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Entrenamiento práctico</h4>
                <p className="text-xs text-gray-500">Desde el primer día.</p>
              </div>
            </div>

             {/* Item 6 */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50 flex items-start gap-4">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                <Smartphone size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-1">Acceso 24/7</h4>
                <p className="text-xs text-gray-500">Desde cualquier dispositivo.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      <WidgetModal 
        isOpen={isWidgetOpen} 
        onClose={() => setIsWidgetOpen(false)} 
        isDemoMode={true}
        onSubscribe={() => {
          setIsWidgetOpen(false);
          onNavigate('subscription');
        }}
      />
    </>
  );
};

export default Features;