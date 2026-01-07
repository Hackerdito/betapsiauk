import React, { useState, useEffect } from 'react';
import { Page } from '../App';

interface FloatingCTAProps {
  onNavigate: (page: Page) => void;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-6 md:hidden animate-in slide-in-from-bottom-4 duration-300">
      <button 
        onClick={() => onNavigate('subscription')}
        className="w-full max-w-sm bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-[0_10px_30px_-10px_rgba(255,85,32,0.5)] transition-all active:scale-95 text-center"
      >
        Suscríbete Aquí
      </button>
    </div>
  );
};

export default FloatingCTA;