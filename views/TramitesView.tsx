import React from 'react';
import { TRAMITES_DATA } from '../constants';
import { TramiteCard } from '../components/molecules/TramiteCard';

interface TramitesViewProps {
  searchQuery: string;
  selectedCategory: string | 'ALL';
  onCategoryChange: (cat: string | 'ALL') => void;
}

export const TramitesView: React.FC<TramitesViewProps> = ({ searchQuery, selectedCategory, onCategoryChange }) => {
  const categories = ['Escrituración', 'Autenticación', 'Registro Civil', 'No Escriturarios'];
  
  const filteredTramites = TRAMITES_DATA.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-32">
      <h2 className="text-4xl font-bold text-white mb-8 border-l-4 border-brand-primary pl-4">Trámites y Servicios</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
           {/* Categories Sidebar */}
           <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/10 sticky top-24">
              <h3 className="text-white font-bold mb-4">Categorías</h3>
              <div 
                onClick={() => onCategoryChange('ALL')}
                className={`py-3 border-b border-white/5 cursor-pointer transition-colors flex items-center justify-between ${selectedCategory === 'ALL' ? 'text-brand-secondary font-bold' : 'text-slate-300 hover:text-white'}`}
              >
                Ver Todos
                {selectedCategory === 'ALL' && <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary"/>}
              </div>
              {categories.map(cat => (
                <div 
                  key={cat} 
                  onClick={() => onCategoryChange(cat)}
                  className={`py-3 border-b border-white/5 last:border-0 cursor-pointer transition-colors flex items-center justify-between ${selectedCategory === cat ? 'text-brand-secondary font-bold' : 'text-slate-300 hover:text-white'}`}
                >
                  {cat}
                  {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary"/>}
                </div>
              ))}
           </div>
        </div>
        
        <div className="lg:col-span-3">
          {filteredTramites.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-white/5">
              <p className="text-slate-500 mb-2">No se encontraron trámites</p>
              <p className="text-sm text-slate-600">Intente ajustar su búsqueda o categoría</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTramites.map(tramite => (
                <TramiteCard key={tramite.id} tramite={tramite} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};