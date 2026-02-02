import React from 'react';
import { PenTool, Shield, UserCheck, Files, ChevronRight } from 'lucide-react';
import { Hero } from '../components/organisms/Hero';
import { LiquidCard } from '../components/LiquidCard';
import { Button } from '../components/atoms/Button';
import { InformationCarousel } from '../components/organisms/InformationCarousel';
import { ViewState } from '../types';
import { NEWS_DATA } from '../constants';

interface HomeViewProps {
  onNavigate: (view: ViewState) => void;
  onCategorySelect: (category: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onCategorySelect }) => {
  
  const CategoryCard = ({ icon: Icon, title, cat }: { icon: any, title: string, cat: string }) => (
    <LiquidCard 
      onClick={() => { onCategorySelect(cat); onNavigate(ViewState.TRAMITES); }} 
      className="p-6 group h-full flex flex-col justify-between"
    >
      <div>
        <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Icon className="text-brand-secondary" size={24} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">Gestione sus documentos con seguridad y eficiencia legal.</p>
      </div>
      <div className="mt-4 flex items-center text-brand-secondary text-sm font-medium group-hover:translate-x-2 transition-transform">
        Ver detalles <ChevronRight size={16} />
      </div>
    </LiquidCard>
  );

  return (
    <>
      <Hero onNavigate={onNavigate} />
      
      {/* Categories Grid (Molecules) */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard icon={PenTool} title="Escrituración" cat="Escrituración" />
          <CategoryCard icon={Shield} title="Autenticación" cat="Autenticación" />
          <CategoryCard icon={UserCheck} title="Registro Civil" cat="Registro Civil" />
          <CategoryCard icon={Files} title="No Escriturarios" cat="No Escriturarios" />
        </div>
      </div>

      {/* News Section (Organism) */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-brand-secondary font-semibold mb-2 tracking-wider uppercase text-sm">Actualidad</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Noticias y Novedades</h2>
          </div>
          <Button variant="ghost" icon={<ChevronRight size={20} />}>
             Ver todas
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_DATA.map(news => (
            <div key={news.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl mb-4 aspect-video relative">
                 <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors z-10" />
                 <img src={news.image} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
              <span className="text-brand-secondary text-xs font-medium">{news.date}</span>
              <h4 className="text-xl font-bold text-white mt-2 mb-2 group-hover:text-brand-secondary transition-colors">{news.title}</h4>
              <p className="text-slate-400 text-sm">{news.summary}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* New Dynamic Information Section (Organism) */}
      <InformationCarousel onNavigate={onNavigate} />
    </>
  );
};