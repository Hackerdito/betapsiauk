import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const Hero: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="bg-[#1A2232] text-white pt-8 pb-20 px-6 lg:px-12 xl:px-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="space-y-2">
            <h2 className="text-3xl lg:text-4xl font-normal text-white mb-2">
              Entrena tus habilidades
            </h2>
            
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-brand-white tracking-wide leading-none mb-4">
              PRÁCTICAS
            </h1>
            
            {/* Added rounded-xl for rounded corners on the orange background */}
            <div className="inline-block bg-brand-orange px-4 py-1 mb-2 rounded-md">
              <span className="text-white font-bold text-2xl lg:text-3xl tracking-wide">
                DESDE HOY CON PSIA
              </span>
            </div>
            
            <p className="text-2xl lg:text-3xl text-gray-300 font-light mt-2">
              tu mentora virtual en Psicología
            </p>
          </div>

          {/* Right Video Content - Updated to match tablet design */}
          <div className="w-full tablet-glow">
            <div className="bg-gray-800 rounded-[2rem] p-3 md:p-4 shadow-2xl border border-gray-700/50 relative">
              <div className="bg-black rounded-[1.5rem] overflow-hidden relative aspect-video w-full group">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  // Updated video URL
                  src="https://fileuk.netlify.app/Psia_v1.mp4"
                />
                
                {/* Mute Button - Bottom Left */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 left-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-all z-10"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="text-center">
          <p className="text-xl text-white mb-6">
            Suscríbete y accede al Programa de Mentores:
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['Role-playing', 'Retroalimentación Personalizada', 'Prácticas Reales'].map((text, idx) => (
              <div 
                key={idx}
                className="px-6 py-3 rounded border border-brand-orange text-white bg-[#1A2232] hover:bg-brand-orange/10 transition-colors cursor-default"
              >
                {text}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;