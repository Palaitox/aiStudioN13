
import React, { useState } from 'react';
import { Settings, Eye, Type, ZoomIn, Sun } from 'lucide-react';
import { AccessibilityMode } from '../types';

interface AccessibilityToolProps {
  mode: AccessibilityMode;
  setMode: (mode: AccessibilityMode) => void;
}

export const AccessibilityTool: React.FC<AccessibilityToolProps> = ({ mode, setMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-6 bottom-28 z-40 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl mb-2 flex flex-col gap-3 min-w-[200px] animate-fade-in-up">
          <h4 className="text-sm font-semibold text-white mb-1 border-b border-white/10 pb-2">Accesibilidad</h4>
          
          <button 
            onClick={() => setMode(AccessibilityMode.DEFAULT)}
            className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${mode === AccessibilityMode.DEFAULT ? 'bg-orange-600 text-white' : 'text-slate-300 hover:bg-white/10'}`}
          >
            <Settings size={16} /> Estándar
          </button>
          
          <button 
            onClick={() => setMode(AccessibilityMode.HIGH_CONTRAST)}
            className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${mode === AccessibilityMode.HIGH_CONTRAST ? 'bg-yellow-400 text-black font-bold' : 'text-slate-300 hover:bg-white/10'}`}
          >
            <Sun size={16} /> Alto Contraste
          </button>
          
          <button 
            onClick={() => setMode(AccessibilityMode.LARGE_TEXT)}
            className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${mode === AccessibilityMode.LARGE_TEXT ? 'bg-orange-600 text-white' : 'text-slate-300 hover:bg-white/10'}`}
          >
            <ZoomIn size={16} /> Texto Grande
          </button>

          <button 
            onClick={() => setMode(AccessibilityMode.DYSLEXIA_FRIENDLY)}
            className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${mode === AccessibilityMode.DYSLEXIA_FRIENDLY ? 'bg-orange-600 text-white' : 'text-slate-300 hover:bg-white/10'}`}
          >
            <Type size={16} /> Fuente Legible
          </button>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-16 h-16 rounded-full 
          bg-gradient-to-br from-brand-primary to-orange-600 text-white 
          shadow-[0_0_30px_rgba(234,88,12,0.4)] hover:shadow-[0_0_50px_rgba(234,88,12,0.6)]
          flex items-center justify-center transition-all duration-300 hover:scale-110
        "
        aria-label="Herramientas de Accesibilidad"
      >
        <Eye size={28} />
      </button>
    </div>
  );
};
