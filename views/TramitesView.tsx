
import React, { useState, useEffect } from 'react';
import { Search, Filter, FolderOpen } from 'lucide-react';
import { TRAMITES_DATA } from '../constants';
import { ActionableProcedureCard } from '../components/molecules/ActionableProcedureCard';
import { Tramite } from '../types';

interface TramitesViewProps {
  searchQuery: string;
  selectedCategory: string | 'ALL';
  onCategoryChange: (cat: string | 'ALL') => void;
}

export const TramitesView: React.FC<TramitesViewProps> = ({ searchQuery, selectedCategory, onCategoryChange }) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [activeData, setActiveData] = useState<Tramite[]>(TRAMITES_DATA);

  // Categories derived from content architecture
  const categories = [
    { id: 'ALL', label: 'Todos' },
    { id: 'Escrituración', label: 'Escrituración' },
    { id: 'Autenticación', label: 'Autenticación' },
    { id: 'Registro Civil', label: 'Registro Civil' },
    { id: 'No Escriturarios', label: 'No Escriturarios' }
  ];

  // Predictive Filtering Logic (Island)
  useEffect(() => {
    const query = localSearch.toLowerCase();
    const filtered = TRAMITES_DATA.filter(t => {
      const matchesSearch = 
        t.title.toLowerCase().includes(query) || 
        t.description.toLowerCase().includes(query) ||
        t.requirements?.some(r => r.toLowerCase().includes(query));
        
      const matchesCategory = selectedCategory === 'ALL' || t.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    setActiveData(filtered);
  }, [localSearch, selectedCategory]);

  // Sync prop search with local
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-brand-dark relative">
      {/* Background Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
             <span className="text-brand-secondary font-bold tracking-widest uppercase text-xs mb-2 block">
               Servicios al Ciudadano
             </span>
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
               Trámites Notariales
             </h2>
             <p className="text-slate-400 max-w-2xl text-lg">
               Consulte los requisitos, tiempos y costos de todos nuestros servicios. 
               La información se despliega progresivamente para su comodidad.
             </p>
          </div>

          {/* Search Island */}
          <div className="w-full md:w-auto min-w-[300px]">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={20} className="text-slate-500 group-focus-within:text-brand-secondary transition-colors" />
              </div>
              <input 
                type="text"
                placeholder="Buscar trámite, requisito..."
                className="
                  w-full bg-slate-900/80 backdrop-blur-md border border-white/10 
                  rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-500
                  focus:ring-2 focus:ring-brand-secondary focus:border-transparent outline-none
                  transition-all shadow-lg
                "
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Categories Tab Navigation */}
        <div className="mb-10 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex space-x-2 md:space-x-4 min-w-max">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`
                  px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                  flex items-center gap-2 border
                  ${selectedCategory === cat.id 
                    ? 'bg-brand-primary text-white border-brand-primary shadow-[0_0_20px_rgba(234,88,12,0.4)]' 
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'}
                `}
              >
                {selectedCategory === cat.id && <Filter size={14} />}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid - Actionable Cards */}
        {activeData.length === 0 ? (
          <div className="py-20 text-center bg-white/5 rounded-3xl border border-white/5 border-dashed">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <FolderOpen size={40} className="text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sin resultados</h3>
            <p className="text-slate-500">
              No encontramos trámites que coincidan con "{localSearch}" en esta categoría.
            </p>
            <button 
              onClick={() => { setLocalSearch(''); onCategoryChange('ALL'); }}
              className="mt-6 text-brand-secondary hover:underline font-medium"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeData.map((tramite, index) => (
               <div 
                 key={tramite.id}
                 className="animate-fade-in"
                 style={{ animationDelay: `${index * 50}ms` }}
               >
                 <ActionableProcedureCard tramite={tramite} />
               </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
