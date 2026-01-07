import React from 'react';

const DemoSection: React.FC = () => {
  return (
    <section className="bg-[#1A2232] py-20 px-6 relative overflow-hidden">
      
      {/* Background subtle particles/glow (CSS only) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header Text */}
        <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">
          Psia | Psicología
        </h2>
        
        <p className="text-gray-300 text-center max-w-3xl mb-16 leading-relaxed font-light">
          Conoce a Psia, tu mentora interactiva en el camino para convertirte en psicólogo o psicóloga.
          A través de conversaciones y situaciones simuladas, podrás aplicar lo aprendido en clase, reflexionar y
          desarrollar tus habilidades con empatía y profesionalismo.
        </p>

        {/* Removed the button as requested */}

        {/* Tablet Frame Video Container */}
        <div className="w-full max-w-4xl tablet-glow">
          <div className="bg-gray-800 rounded-[2rem] p-3 md:p-4 shadow-2xl border border-gray-700/50 relative">
             {/* Screen Bezel Area */}
             <div className="bg-black rounded-[1.5rem] overflow-hidden relative aspect-video w-full">
                
                {/* The Video Player */}
                <video 
                  controls
                  className="w-full h-full object-cover"
                  // Updated video URL
                  src="https://fileuk.netlify.app/Psia_v2.mp4" 
                >
                    Your browser does not support the video tag.
                </video>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DemoSection;