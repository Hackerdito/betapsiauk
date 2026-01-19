import React from 'react';

interface DashboardProps {
  onSelectArea: (area: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectArea }) => {
  const practiceAreas = [
    {
      id: 'clinicos',
      title: <><span className="whitespace-nowrap">Casos clínicos y</span><br /><span className="whitespace-nowrap">emocionales</span></>,
      titleText: "Casos clínicos y emocionales",
      desc: "Escenarios reales para aplicar tus conocimientos y fortalecer tu sensibilidad terapéutica.",
      bgImage: "https://images.pexels.com/photos/7176036/pexels-photo-7176036.jpeg"
    },
    {
      id: 'desarrollo',
      title: <><span className="whitespace-nowrap">Desarrollo y</span><br /><span className="whitespace-nowrap">aprendizaje</span></>,
      titleText: "Desarrollo y aprendizaje",
      desc: "Procesos psicológicos esenciales que impulsan el crecimiento personal y emocional.",
      bgImage: "https://images.pexels.com/photos/4098232/pexels-photo-4098232.jpeg"
    },
    {
      id: 'equipo',
      title: <><span className="whitespace-nowrap">Trabajo en equipo y</span><br /><span className="whitespace-nowrap">dinámica grupal</span></>,
      titleText: "Trabajo en equipo y dinámica grupal",
      desc: "Estrategias para fomentar colaboración, comunicación efectiva y cohesión en entornos grupales.",
      bgImage: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
    },
    {
      id: 'neuro',
      title: <><span className="whitespace-nowrap">Neuropsicología y</span><br /><span className="whitespace-nowrap">bases biológicas</span></>,
      titleText: "Neuropsicología y bases biológicas",
      desc: "Relación entre cerebro, conducta y procesos mentales desde una perspectiva científica integral.",
      bgImage: "https://images.pexels.com/photos/8204995/pexels-photo-8204995.jpeg"
    },
    {
      id: 'investigacion',
      title: <><span className="whitespace-nowrap">Investigación y</span><br /><span className="whitespace-nowrap">teorías</span></>,
      titleText: "Investigación y teorías",
      desc: "Fundamentos metodológicos y marcos conceptuales que sustentan el estudio psicológico con evidencia.",
      bgImage: "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg"
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-start pt-20 md:pt-32 pb-20 px-4 md:px-6">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg" 
          alt="Practice background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#000000]/50"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        {/* Header Content */}
        <div className="max-w-4xl mb-10 md:mb-20 mt-2 md:mt-8 px-2">
          <h1 className="text-3xl md:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight">
            Aplicación en<br className="hidden md:block" />
            Escenarios de Práctica
          </h1>
          <p className="text-sm md:text-xl text-white/95 leading-relaxed mb-6">
            En esta sección encontrarás 5 áreas donde podrás poner en práctica lo aprendido. Cada área contiene casos únicos, que permitirán afinar tu mirada profesional y fortalecer tus habilidades clínicas. Junto a Psía, podrás escuchar, reflexionar y aplicar tus conocimientos en un entorno interactivo y seguro.
          </p>
          <p className="text-white/80 italic text-[10px] md:text-base border-t border-white/20 pt-6">
            Recuerda que estas simulaciones son únicamente para fines educativos y no sustituyen ningún proceso terapéutico real.
          </p>
        </div>

        {/* Practice Areas Grid */}
        <div className="bg-[#2A3447]/50 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-6 md:p-20 border border-white/10 shadow-2xl">
          <div className="flex flex-wrap justify-center gap-y-12 md:gap-y-20">
            {practiceAreas.map((area, index) => {
              const isFirstRow = index < 3;
              const widthClass = isFirstRow ? 'lg:w-1/3' : 'lg:w-1/2';
              const showDivider = (index === 0 || index === 1 || index === 3);
              
              return (
                <div 
                  key={index} 
                  className={`flex flex-col gap-3 md:gap-6 group relative w-full md:w-1/2 transition-all duration-300 px-2 md:px-12 ${widthClass} ${
                    showDivider ? 'lg:border-r lg:border-white/20' : ''
                  }`}
                >
                  <div className="space-y-2 md:space-y-4">
                    <h3 className="text-xl md:text-[2.25rem] font-bold text-white leading-tight">
                      {area.title}
                    </h3>
                    <p className="text-white/80 text-xs md:text-base leading-relaxed">
                      {area.desc}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => onSelectArea(area)}
                    className="self-start mt-2 px-6 md:px-9 py-2.5 md:py-4 rounded-full border border-white text-white text-xs md:text-base font-bold transition-all duration-300 hover:bg-white hover:text-[#1A2232] active:scale-95 group-hover:bg-white group-hover:text-[#1A2232] shadow-lg"
                  >
                    Comenzar Ahora
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;