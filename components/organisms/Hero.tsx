import React, { useEffect, useState } from 'react';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { NOTARIA_INFO } from '../../constants';
import { Button } from '../atoms/Button';
import { ViewState } from '../../types';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for performance to avoid INP/CLS issues
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-4 overflow-hidden min-h-[85vh] flex items-center">
      {/* Parallax Background Layer */}
      <div 
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none"
        style={{ 
          transform: `translateY(${scrollY * 0.4}px)`,
          willChange: 'transform'
        }}
      >
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Fachada Notaría" 
          className="w-full h-full object-cover opacity-20"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/95 via-brand-dark/70 to-brand-dark"></div>
        
        {/* Brand Ambient Glow - Liquid Light Effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-brand-primary/10 blur-[120px] rounded-full mix-blend-screen opacity-60"></div>
      </div>

      <div className="container mx-auto relative z-10 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs tracking-[0.2em] mb-8 animate-fade-in font-bold uppercase shadow-[0_0_20px_rgba(234,88,12,0.15)] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
          Seguridad Jurídica y Digital
        </span>
        
        {/* Main Title with Brand Gradient */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[0.95] drop-shadow-2xl">
          {NOTARIA_INFO.name} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary via-orange-300 to-amber-200">
            Confianza 2026
          </span>
        </h2>
        
        {/* Metadata Pills */}
        <div className="flex flex-wrap justify-center gap-4 text-slate-300 mb-12 text-sm md:text-base animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 bg-slate-900/40 px-5 py-2.5 rounded-full border border-white/5 backdrop-blur-md hover:border-brand-secondary/30 transition-colors group">
            <MapPin size={16} className="text-brand-primary group-hover:scale-110 transition-transform" /> 
            <span className="font-light tracking-wide">{NOTARIA_INFO.address}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/40 px-5 py-2.5 rounded-full border border-white/5 backdrop-blur-md hover:border-brand-secondary/30 transition-colors group">
            <Clock size={16} className="text-brand-primary group-hover:scale-110 transition-transform" /> 
            <span className="font-light tracking-wide">{NOTARIA_INFO.hours}</span>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-5 items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full sm:w-auto min-w-[220px] shadow-[0_0_35px_rgba(234,88,12,0.4)] border border-orange-500/50 hover:scale-105"
            onClick={() => onNavigate(ViewState.TRAMITES)}
            icon={<ChevronRight size={20} />}
          >
            Realizar Trámites
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto min-w-[220px] hover:border-brand-secondary hover:text-brand-secondary hover:bg-brand-secondary/5"
            onClick={() => onNavigate(ViewState.PQRSD)}
          >
            PQRSD y Contacto
          </Button>
        </div>
      </div>
    </div>
  );
};