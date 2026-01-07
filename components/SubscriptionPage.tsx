import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Page } from '../App';

interface SubscriptionPageProps {
  onNavigate: (page: Page) => void;
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Interfaz por voz en tiempo real",
      desc: "Simula sesiones con pacientes virtuales y recibe retroalimentación.",
      img: "https://images.pexels.com/photos/7176036/pexels-photo-7176036.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Más de 50 casos reales",
      desc: "Practica distintos trastornos y enfoques terapéuticos.",
      img: "https://images.pexels.com/photos/7579103/pexels-photo-7579103.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Repite y mejora tus sesiones",
      desc: "Todas las veces que quieras, con métricas de progreso.",
      img: "https://images.pexels.com/photos/7176027/pexels-photo-7176027.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Acceso 24/7 desde tu celular",
      desc: "Entrena cuando y donde estés. Compatible con todos tus dispositivos.",
      img: "https://images.pexels.com/photos/7699527/pexels-photo-7699527.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Hero Section with Parallax Background */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-6 md:px-12 overflow-hidden">
        {/* Background Image Layer with Parallax Effect */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        >
          <img 
            src="https://images.pexels.com/photos/4098232/pexels-photo-4098232.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Background" 
            className="w-full h-[120%] object-cover absolute top-0 left-0"
          />
          <div className="absolute inset-0 bg-[#000000]/60"></div>
        </div>

        <div className="max-w-7xl w-full mx-auto relative z-10">
          {/* Liquid Glass Main Container */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-16 text-center leading-tight">
              Activa tu<br />
              acceso a PSIA
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left/Center: Device Image */}
              <div className="lg:col-span-7">
                <div className="w-full transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src="https://fileuk.netlify.app/device.png" 
                    alt="Multi-device access" 
                    className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </div>

              {/* Right Content: Pricing & CTA */}
              <div className="lg:col-span-5">
                <div className="flex flex-col items-center lg:items-start space-y-8">
                  
                  <ul className="space-y-6 w-full">
                    {[
                      "$290/MXN Mensualmente",
                      "Hasta 6 sesiones de 10 min cada una por mes",
                      "Acceso 24/7",
                      "Más de 50 casos reales."
                    ].map((text, i) => (
                      <li key={i} className="flex items-center gap-4 text-white text-xl md:text-2xl font-medium group">
                        <div className="bg-brand-orange/20 p-1.5 rounded-full group-hover:bg-brand-orange/40 transition-colors">
                          <CheckCircle2 className="text-brand-orange shrink-0" size={24} />
                        </div>
                        <span className="leading-tight">{text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="w-full pt-8 text-center lg:text-left">
                    <a 
                      href="https://www.mercadopago.com.mx/subscriptions/checkout?preapproval_plan_id=f6d62dc53eb14ea3bdc3468f3a8ed894"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-brand-orange hover:bg-orange-600 text-white text-3xl font-bold py-5 px-14 rounded-full transition-all shadow-xl hover:scale-105 active:scale-95 mb-6 w-full md:w-auto text-center"
                    >
                      Pagar Ahora
                    </a>
                    <p className="text-gray-300 text-sm">
                      Al continuar aceptas los <button onClick={() => onNavigate('terms')} className="text-brand-orange hover:underline">Términos y Condiciones.</button>
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="py-24 px-6 md:px-12 bg-[#F9FAFB] relative z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8 flex flex-col flex-1 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionPage;