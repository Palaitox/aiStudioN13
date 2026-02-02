import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { NOTARIA_INFO } from '../../constants';
import { Button } from '../atoms/Button';
import { ViewState } from '../../types';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
      {/* Background with FetchPriority High */}
      <img 
        src="https://picsum.photos/1920/1080?grayscale&blur=2" 
        alt="Fachada Notaría" 
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/50 to-brand-dark z-0"></div>

      <div className="container mx-auto relative z-10 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs tracking-wider mb-6 animate-pulse-slow font-bold">
          SEGURIDAD JURÍDICA Y DIGITAL
        </span>
        
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          {NOTARIA_INFO.name} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-cyan-200">
            Confianza para el Futuro
          </span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6 text-slate-300 mb-10 text-sm md:text-base">
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-white/5 backdrop-blur-sm">
            <MapPin size={18} className="text-brand-secondary" /> {NOTARIA_INFO.address}
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-white/5 backdrop-blur-sm">
            <Clock size={18} className="text-brand-secondary" /> {NOTARIA_INFO.hours}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => onNavigate(ViewState.TRAMITES)}
          >
            Realizar Trámites
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => onNavigate(ViewState.PQRSD)}
          >
            PQRSD y Contacto
          </Button>
        </div>
      </div>
    </div>
  );
};