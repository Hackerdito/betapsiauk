import React from 'react';
import { ArrowLeft, Shield, FileText, UserCheck, Lock, AlertTriangle, RefreshCw } from 'lucide-react';
import { Page } from '../App';

interface TermsPageProps {
  onNavigate: (page: Page) => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  const sections = [
    {
      icon: <FileText className="text-brand-orange" size={24} />,
      title: "Descripción del servicio",
      content: "PSIA es una herramienta digital que integra inteligencia artificial para apoyar el proceso formativo de los estudiantes de Universidad UK, ofreciendo recursos interactivos, orientación académica y contenidos relacionados con la psicología y el desarrollo personal. El acceso puede requerir una cuenta de usuario activa creada por la institución o por el propio alumno a través de los canales oficiales."
    },
    {
      icon: <UserCheck className="text-brand-orange" size={24} />,
      title: "Cuentas de usuario",
      content: "Para acceder a ciertas funciones es necesario crear una cuenta con credenciales personales (correo institucional o autorizado). Eres responsable de: Mantener la confidencialidad de tu contraseña, no compartir tu acceso con terceros y notificar de inmediato cualquier uso no autorizado de tu cuenta. Universidad UK se reserva el derecho de suspender cuentas que infrinjan las normas de uso o la ética académica."
    },
    {
      icon: <Shield className="text-brand-orange" size={24} />,
      title: "Uso permitido",
      content: "Puedes utilizar PSIA únicamente para fines académicos, personales y no comerciales. Está prohibido utilizar la IA o sus respuestas con fines dañinos, difamatorios o ilegales; alterar, copiar o redistribuir el contenido de la plataforma sin autorización; e intentar acceder a áreas restringidas, bases de datos o servidores de la institución."
    },
    {
      icon: <Lock className="text-brand-orange" size={24} />,
      title: "Propiedad intelectual",
      content: "Todo el contenido, diseño, logotipos, interfaz y materiales incluidos en PSIA son propiedad exclusiva de Universidad UK y están protegidos por las leyes de derechos de autor y propiedad intelectual. No se otorga licencia alguna, explícita o implícita, más allá del uso personal del servicio."
    },
    {
      icon: <AlertTriangle className="text-brand-orange" size={24} />,
      title: "Limitación de responsabilidad",
      content: "El contenido generado por la IA tiene fines educativos y de apoyo, no sustituye el criterio de un profesional de la salud mental ni constituye asesoramiento psicológico directo. Universidad UK no se hace responsable por interpretaciones, decisiones o consecuencias derivadas del uso de la plataforma."
    },
    {
      icon: <RefreshCw className="text-brand-orange" size={24} />,
      title: "Modificaciones",
      content: "Universidad UK puede actualizar estos términos en cualquier momento para mejorar el servicio o cumplir con cambios normativos. Las versiones actualizadas estarán disponibles en este mismo apartado y entrarán en vigor de inmediato al ser publicadas."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-[72px] bg-white/80 backdrop-blur-md z-30 border-b border-gray-100 py-6 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => onNavigate('subscription')}
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium group"
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            Regresar
          </button>
          <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Legal — PSIA</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Title Section */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-8">
            Términos y Condiciones<br />de Uso — PSIA
          </h1>
          <div className="max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed font-medium">
            <p className="mb-4">
              Bienvenido(a) a PSIA, la plataforma inteligente de acompañamiento psicológico y educativo desarrollada por Universidad UK.
            </p>
            <p>
              Al acceder o utilizar este servicio, aceptas los presentes Términos y Condiciones, así como las políticas que se describen a continuación. Si no estás de acuerdo con alguna parte, te pedimos no utilizar la plataforma.
            </p>
          </div>
        </div>

        {/* Sections Grid - Apple Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-orange/10 group-hover:scale-110">
                {section.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                  {section.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg font-normal">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-32 pt-12 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-sm font-medium">
            Última actualización: Enero 2026 • Universidad UK
          </p>
          <div className="mt-8 flex justify-center gap-8">
             <button onClick={() => onNavigate('home')} className="text-gray-500 hover:text-black font-semibold text-sm transition-colors">Inicio</button>
             <button onClick={() => onNavigate('subscription')} className="text-brand-orange font-bold text-sm hover:underline">Suscribirse</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;