import React from 'react';
import { ChevronRight, Clock, Coins } from 'lucide-react';
import { Tramite } from '../../types';
import { LiquidCard } from '../LiquidCard';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

interface TramiteCardProps {
  tramite: Tramite;
  onClick?: () => void;
}

export const TramiteCard: React.FC<TramiteCardProps> = ({ tramite, onClick }) => {
  return (
    <LiquidCard 
      onClick={onClick} 
      className="p-6 h-full flex flex-col justify-between group"
      hoverEffect={true}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <Badge label={tramite.category} />
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-brand-secondary transition-colors">
          {tramite.title}
        </h3>
        
        <p className="text-slate-300 mb-6 text-sm leading-relaxed line-clamp-3">
          {tramite.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-900/40 p-3 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Clock size={12} /> Tiempo
            </div>
            <span className="text-xs font-medium text-white block truncate" title={tramite.time}>
              {tramite.time}
            </span>
          </div>
          <div className="bg-slate-900/40 p-3 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Coins size={12} /> Costo
            </div>
            <span className="text-xs font-medium text-white block truncate" title={tramite.cost}>
              {tramite.cost}
            </span>
          </div>
        </div>

        {tramite.requirements && (
          <div className="mb-4">
             <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Requisitos básicos:</span>
             <ul className="mt-2 space-y-1">
               {tramite.requirements.slice(0, 2).map((req, i) => (
                 <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                   <span className="w-1 h-1 rounded-full bg-brand-secondary mt-1.5 shrink-0" />
                   {req}
                 </li>
               ))}
               {tramite.requirements.length > 2 && (
                 <li className="text-xs text-brand-secondary italic">
                   + {tramite.requirements.length - 2} más...
                 </li>
               )}
             </ul>
          </div>
        )}
      </div>

      <div className="mt-2 pt-4 border-t border-white/5">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-between group-hover:text-brand-secondary pl-0 hover:bg-transparent"
        >
          Consultar Trámite
          <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </LiquidCard>
  );
};