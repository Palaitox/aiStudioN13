import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Mic, Sparkles, ArrowRight } from 'lucide-react';
import { ViewState, InterestItem } from '../../types';
import { INTEREST_DATA } from '../../constants';
import { LiquidCard } from '../LiquidCard';
import { Button } from '../atoms/Button';

interface InformationCarouselProps {
  onNavigate: (view: ViewState) => void;
}

export const InformationCarousel: React.FC<InformationCarouselProps> = ({ onNavigate }) => {
  const [items, setItems] = useState<InterestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulation of "Hyper-personalization" logic
  // In a real app, this would check localStorage or a User Context
  useEffect(() => {
    const personalizeContent = () => {
      // Simulator: Artificial delay for "loading" skeleton feedback
      setTimeout(() => {
        const shuffled = [...INTEREST_DATA];
        
        // Logic: Promote 'PQRSD' or 'Discapacidad' based on simulated context
        // This is a simplified example of reordering
        const priorityItem = shuffled.find(i => i.id === 'int-5'); // PQRSD
        if (priorityItem) {
          const index = shuffled.indexOf(priorityItem);
          shuffled.splice(index, 1);
          shuffled.unshift(priorityItem);
        }

        setItems(shuffled);
        setLoading(false);
      }, 800); // 800ms to show the skeleton state
    };

    personalizeContent();
  }, []);

  // Voice Interaction Simulator
  const handleVoiceCommand = () => {
    setIsListening(true);
    // Simulating voice recognition delay
    setTimeout(() => {
      setIsListening(false);
      alert("Comando de voz simulado: 'Mostrar trámites de discapacidad'. Filtrando contenido...");
      // In production, this would filter the `items` state
    }, 2000);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-brand-dark to-slate-900 border-y border-white/5 relative overflow-hidden" aria-label="Información de Interés Dinámica">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-brand-secondary animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-brand-secondary uppercase">Centro de Recursos</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Información de Interés
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
             {/* Multimodal Interaction Button */}
            <button 
              onClick={handleVoiceCommand}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300
                ${isListening 
                  ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-brand-secondary hover:text-white'}
              `}
              aria-label="Activar búsqueda por voz"
            >
              <Mic size={18} />
              <span className="text-sm font-medium hidden sm:inline">
                {isListening ? 'Escuchando...' : 'Navegar por Voz'}
              </span>
            </button>
            
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-primary hover:border-brand-primary transition-all active:scale-95"
                aria-label="Desplazar a la izquierda"
              >
                <ChevronRight size={20} className="rotate-180" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-primary hover:border-brand-primary transition-all active:scale-95"
                aria-label="Desplazar a la derecha"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="
            flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2
            scrollbar-hide scroll-smooth
            mask-linear-fade
          "
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            // CSS Mask for fading edges (Liquid feel)
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
          }}
        >
          {loading ? (
            // SKELETON STATE (Visual Stability Feedback)
            Array.from({ length: 4 }).map((_, i) => (
              <div 
                key={i} 
                className="min-w-[280px] md:min-w-[350px] h-[400px] rounded-3xl bg-white/5 border border-white/5 animate-pulse flex flex-col p-4"
              >
                <div className="w-full h-48 bg-white/5 rounded-2xl mb-4" />
                <div className="w-3/4 h-6 bg-white/5 rounded mb-2" />
                <div className="w-1/2 h-6 bg-white/5 rounded mb-4" />
                <div className="w-full h-20 bg-white/5 rounded" />
              </div>
            ))
          ) : (
            items.map((item, index) => (
              <div 
                key={item.id} 
                className="snap-center"
              >
                <LiquidCard 
                  className="
                    min-w-[280px] md:min-w-[350px] h-full flex flex-col
                    group relative overflow-hidden p-6
                  "
                  // Core Web Vitals Optimization: No lazy load for first item
                  // Explicit dimensions handled by min-w classes
                > 
                  {/* Card Image with Aspect Ratio for CLS */}
                  <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg -mx-6 -mt-6 mb-6">
                    <div className="absolute inset-0 bg-brand-dark/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                    <img 
                      src={item.image} 
                      alt={item.title}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-brand-dark/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow justify-between relative z-10">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-brand-secondary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-between items-center mt-auto">
                      <span className="text-xs text-slate-500 font-medium group-hover:text-white transition-colors">
                        Recurso Verificado
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-brand-secondary hover:bg-brand-secondary/10 hover:text-brand-secondary -mr-2"
                        onClick={() => item.view && onNavigate(item.view)}
                      >
                        {item.actionLabel} <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Interactive Light Reflection Effect (Liquid Glass) */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ transform: 'translateZ(0)' }} />
                </LiquidCard>
              </div>
            ))
          )}
          
          {/* Spacer for scroll padding */}
          <div className="min-w-[20px]" />
        </div>
      </div>
    </section>
  );
}