import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { ViewState } from '../../types';
import { NOTARIA_INFO } from '../../constants';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, searchQuery, onSearchChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'INICIO', view: ViewState.HOME },
    { label: 'ATENCIÓN Y SERVICIOS', view: ViewState.TRAMITES },
    { label: 'TRANSPARENCIA', view: ViewState.TRANSPARENCIA },
    { label: 'PARTICIPA', view: ViewState.PARTICIPA },
  ];

  const handleNav = (view: ViewState) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-brand-dark/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Branding */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNav(ViewState.HOME)}>
          <div className="flex gap-2">
             <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black border-2 border-yellow-300" title="Escudo de Colombia">COL</div>
             <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-orange-400" title="Escudo UCNC">UCNC</div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 hidden sm:block">
            {NOTARIA_INFO.name}
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button 
              key={link.view}
              onClick={() => handleNav(link.view)} 
              className={`text-sm font-medium hover:text-brand-secondary transition-colors relative py-2
                ${currentView === link.view ? 'text-brand-secondary' : 'text-slate-300'}
              `}
            >
              {link.label}
              {currentView === link.view && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-secondary shadow-[0_0_10px_rgba(251,146,60,0.5)]" />
              )}
            </button>
          ))}
        </nav>

        {/* Search & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-white/5 rounded-full border border-white/10 px-3 py-1.5 focus-within:bg-white/10 focus-within:border-brand-secondary transition-all w-64">
            <Search size={16} className="text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Buscar trámite..." 
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-slate-500"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white p-2">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-brand-dark/95 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl animate-fade-in">
          {navLinks.map((link) => (
            <button 
              key={link.view}
              onClick={() => handleNav(link.view)} 
              className="text-left text-slate-300 py-3 border-b border-white/5 last:border-0 hover:text-brand-secondary"
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => handleNav(ViewState.PQRSD)} className="text-left text-brand-secondary py-3 font-bold border-t border-white/10 mt-2">
            PQRSD Y CONTACTO
          </button>
        </div>
      )}
    </header>
  );
};