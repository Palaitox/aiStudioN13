import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, Sparkles, ArrowRight, Pause, Play } from 'lucide-react';
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
  
  // Auto-play Logic State
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number | null>(null);
  const AUTO_PLAY_DURATION = 5000; // 5 seconds per slide

  // Simulation of "Hyper-personalization" logic
  useEffect(() => {
    const personalizeContent = () => {
      setTimeout(() => {
        const shuffled = [...INTEREST_DATA];
        const priorityItem = shuffled.find(i => i.id === 'int-5'); 
        if (priorityItem) {
          const index = shuffled.indexOf(priorityItem);
          shuffled.splice(index, 1);
          shuffled.unshift(priorityItem);
        }
        setItems(shuffled);
        setLoading(false);
      }, 800); 
    };
    personalizeContent();
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = 360; // Approximate card width + gap
      
      // Logic for infinite loop feeling
      if (direction === 'right') {
        const remainingSpace = container.scrollWidth - (container.scrollLeft + container.clientWidth);
        if (remainingSpace < 50) {
          // If at end, smooth scroll back to start
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
      
      // Reset progress on manual interaction
      setProgress(0);
    }
  }, []);

  // Auto-play Engine using requestAnimationFrame
  useEffect(() => {
    if (loading || isPaused) return;

    // Calculate start time relative to current progress to enable seamless resuming
    let startTime = Date.now() - (progress / 100) * AUTO_PLAY_DURATION;
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      if (elapsed >= AUTO_PLAY_DURATION) {
        scroll('right');
        // Reset timer for next slide
        startTime = Date.now();
        setProgress(0);
      } else {
        // Update progress bar
        const newProgress = Math.min((elapsed / AUTO_PLAY_DURATION) * 100, 100);
        setProgress(newProgress);
      }

      progressRef.current = requestAnimationFrame(animate);
    };

    progressRef.current = requestAnimationFrame(animate);

    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isPaused, scroll]); // progress excluded to prevent re-render loop

  // Handler to ensure focus stays within container doesn't trigger unpause
  const handleBlur = (e: React.FocusEvent) => {
    // Only unpause if the new focus target is OUTSIDE the carousel container
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsPaused(false);
    }
  };

  return (
    <section 
      className="py-20 bg-gradient-to-b from-brand-dark to-slate-900 border-y border-white/5 relative overflow-hidden group/section" 
      aria-label="Información de Interés Dinámica"
    >
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
            
            {/* Semantic Status for Screen Readers */}
            <div className="sr-only" aria-live="polite">
               {isPaused ? "Carrusel detenido" : "Carrusel reproduciendo automáticamente"}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Visual Controls */}
            <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-full border border-white/10 backdrop-blur-sm">
              <button 
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
                aria-label="Ver anterior"
              >
                <ChevronRight size={18} className="rotate-180" />
              </button>
              
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                aria-label={isPaused ? "Reanudar reproducción automática" : "Pausar reproducción automática"}
              >
                {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
              </button>

              <button 
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
                aria-label="Ver siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Progress Bar (Visual Feedback for Autoplay) */}
          {!loading && (
            <div className="absolute -top-4 left-0 w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-secondary/50 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%`, opacity: isPaused ? 0.3 : 1 }}
              />
            </div>
          )}

          {/* 
            Surgical Pause Implementation:
            Events are attached strictly to the scroll container to avoid ghost blocking.
            onFocus/onBlur handles accessibility requirements (keyboard nav).
          */}
          <div 
            ref={scrollRef}
            className="
              flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-4
              scrollbar-hide scroll-smooth
              mask-linear-fade
            "
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              maskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={handleBlur}
          >
            {loading ? (
              // SKELETON STATE (Visual Stability Feedback)
              Array.from({ length: 4 }).map((_, i) => (
                <div 
                  key={i} 
                  className="min-w-[280px] md:min-w-[350px] h-[420px] rounded-3xl bg-white/5 border border-white/5 animate-pulse flex flex-col p-6"
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
                    // Accessibility: Describe the card as a slide
                    role="group"
                    aria-label={`Diapositiva ${index + 1} de ${items.length}: ${item.title}`}
                  > 
                    {/* Card Image with Aspect Ratio for CLS */}
                    <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg -mx-6 -mt-6 mb-6 bg-slate-800">
                      <div className="absolute inset-0 bg-brand-dark/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                      <img 
                        src={item.image} 
                        alt={item.title}
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        className="w-full h-full object-cover transform will-change-transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Category Tag */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-brand-dark/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider shadow-lg">
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
                          tabIndex={isPaused ? 0 : -1} // Prevent tabbing while moving unless paused (or user pauses by focus)
                        >
                          {item.actionLabel} <ArrowRight size={16} />
                        </Button>
                      </div>
                    </div>
                  </LiquidCard>
                </div>
              ))
            )}
            
            {/* Spacer for scroll padding */}
            <div className="min-w-[20px]" />
          </div>
        </div>
      </div>
    </section>
  );
};