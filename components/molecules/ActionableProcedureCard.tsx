
import React, { useState } from 'react';
import { Clock, Coins, ChevronDown, CheckCircle2, FileText } from 'lucide-react';
import { Tramite } from '../../types';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

interface ActionableProcedureCardProps {
  tramite: Tramite;
}

export const ActionableProcedureCard: React.FC<ActionableProcedureCardProps> = ({ tramite }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article 
      className="
        group relative w-full h-full rounded-2xl 
        bg-glass-100 backdrop-blur-xl border border-white/10
        transition-all duration-300 ease-out
        hover:bg-glass-200 hover:border-brand-secondary/30 hover:shadow-[0_0_40px_rgba(234,88,12,0.1)]
        flex flex-col
      "
      style={{ containerType: 'inline-size' }} // Enable Container Queries
    >
      {/* Aesthetic: Top Highlight Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

      {/* Header Section */}
      <div className="p-6 pb-2">
        <div className="flex justify-between items-start mb-4">
          <Badge label={tramite.category} color="slate" className="backdrop-blur-md bg-white/5" />
          {isExpanded && (
            <span className="animate-fade-in text-[10px] font-bold text-brand-secondary uppercase tracking-widest bg-brand-secondary/10 px-2 py-0.5 rounded border border-brand-secondary/20">
              Visualizando
            </span>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-brand-secondary transition-colors">
          {tramite.title}
        </h3>
        
        <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
          {tramite.description}
        </p>

        {/* Quick Metadata - Always Visible */}
        <div className="grid grid-cols-2 gap-3 mb-2">
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/30 p-2 rounded-lg border border-white/5">
            <Clock size={14} className="text-brand-secondary" />
            <span className="truncate" title={tramite.time}>{tramite.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/30 p-2 rounded-lg border border-white/5">
            <Coins size={14} className="text-brand-secondary" />
            <span className="truncate" title={tramite.cost}>{tramite.cost}</span>
          </div>
        </div>
      </div>

      {/* Progressive Disclosure Section (Accordion) */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-0">
          <div className="w-full h-[1px] bg-white/5 my-3" />
          
          <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-3">
            <FileText size={16} className="text-brand-secondary" />
            Requisitos y Documentación
          </h4>
          
          {tramite.requirements && (
            <ul className="space-y-2 mb-4">
              {tramite.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="mt-0.5 text-green-500/80 shrink-0" />
                  <span className="leading-snug">{req}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-xs text-blue-200">
             <strong>Nota:</strong> Para casos especiales, por favor consulte directamente en la sede o a través de PQRSD.
          </div>
        </div>
      </div>

      {/* Footer / Action Area */}
      <div className="mt-auto p-4 pt-2 border-t border-white/5">
        <Button 
          variant={isExpanded ? 'secondary' : 'outline'} 
          size="sm" 
          className="w-full justify-between group-focus-within:ring-2"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={`details-${tramite.id}`}
        >
          {isExpanded ? 'Ocultar Detalles' : 'Ver Requisitos'}
          <ChevronDown 
            size={16} 
            className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </Button>
      </div>
    </article>
  );
};
