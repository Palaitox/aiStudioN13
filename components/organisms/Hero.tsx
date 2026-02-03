import React from 'react';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { NOTARIA_INFO } from '../../constants';
import { Button } from '../atoms/Button';
import { ViewState } from '../../types';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-dark"
      aria-label="Bienvenida a Notaría 13"
    >
      {/* 
        LAYER 1: Static Background Image (LCP Candidate)
        Optimization: fetchpriority="high", no lazy loading, dark overlay for contrast.
        Image chosen: Modern architecture/glass to match 'Liquid Glass' theme.
      */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Arquitectura moderna Notaría 13" 
          className="w-full h-full object-cover opacity-30 select-none"
          fetchPriority="high"
          width="1920"
          height="1080"
          decoding="async"
        />
        {/* Gradient Overlay for Text Contrast (Accessibility) */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/30 via-transparent to-brand-dark" />
      </div>

      {/* 
        LAYER 2: CSS-Only Ambient Animation (Liquid Light) 
        Performance: Uses transform/opacity only. No JS. 
        Will-change hints for GPU acceleration.
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div 
          className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow will-change-transform"
        />
        <div 
          className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen animate-float will-change-transform" 
          style={{ animationDuration: '10s' }}
        />
      </div>

      {/* LAYER 3: Content (Open Editorial Layout) */}
      <div className="container mx-auto px-4 relative z-10 mt-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-300 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              Portal Digital 2026
            </div>

            {/* Main Typography */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[0.9] drop-shadow-2xl">
              {NOTARIA_INFO.name}
              <span className="block text-2xl md:text-4xl lg:text-5xl mt-4 font-light text-slate-300 tracking-wide opacity-90">
                Seguridad Jurídica & Confianza
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Gestione sus trámites notariales con la rapidez de la tecnología moderna y la solidez de la tradición legal.
            </p>

            {/* Action Islands */}
            <div className="flex flex-col sm:flex-row justify-center gap-5 items-center mb-16 w-full sm:w-auto">
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full sm:w-auto min-w-[220px] shadow-[0_0_40px_rgba(234,88,12,0.3)] hover:shadow-[0_0_60px_rgba(234,88,12,0.5)] transition-shadow duration-500"
                onClick={() => onNavigate(ViewState.TRAMITES)}
                icon={<ChevronRight size={20} />}
              >
                Iniciar Trámite
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto min-w-[220px] backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10"
                onClick={() => onNavigate(ViewState.PQRSD)}
              >
                PQRSD y Contacto
              </Button>
            </div>

            {/* Metadata Footer (Floating Pills) */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-dark/40 border border-white/10 backdrop-blur-md hover:bg-white/5 transition-colors cursor-default">
                <MapPin size={16} className="text-brand-secondary" />
                <span>{NOTARIA_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-dark/40 border border-white/10 backdrop-blur-md hover:bg-white/5 transition-colors cursor-default">
                <Clock size={16} className="text-brand-secondary" />
                <span>{NOTARIA_INFO.hours.split('|')[0]}</span>
              </div>
            </div>

        </div>
      </div>
    </section>
  );
};