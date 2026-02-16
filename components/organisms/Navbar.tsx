
import React, { useState } from 'react';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { ViewState, NavItem } from '../../types';
import { NOTARIA_INFO } from '../../constants';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, searchQuery, onSearchChange, onSearchSubmit }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks: NavItem[] = [
    { label: 'INICIO', view: ViewState.HOME },
    { 
      label: 'ATENCIÓN Y SERVICIOS', 
      subItems: [
        { label: 'Trámites', view: ViewState.TRAMITES },
        { label: 'Nosotros', view: ViewState.NOSOTROS },
        { label: 'Contáctenos', view: ViewState.CONTACTO },
        { label: 'PQRSD', view: ViewState.PQRSD }
      ]
    },
    { label: 'TRANSPARENCIA', view: ViewState.TRANSPARENCIA },
    { label: 'PARTICIPA', view: ViewState.PARTICIPA },
  ];

  const handleNav = (view?: ViewState) => {
    if (view) {
      onNavigate(view);
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      onSearchSubmit(searchQuery);
    }
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
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              <button 
                onClick={() => link.view ? handleNav(link.view) : null}
                className={`
                  flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg
                  ${(link.view === currentView || (link.subItems && link.subItems.some(sub => sub.view === currentView))) 
                    ? 'text-brand-secondary bg-white/5' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'}
                `}
              >
                {link.label}
                {link.subItems && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
              </button>
              
              {/* Dropdown Menu */}
              {link.subItems && (
                <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-brand-dark border border-white/10 rounded-xl shadow-2xl overflow-hidden p-1 backdrop-blur-xl">
                    {link.subItems.map((sub) => (
                      <button
                        key={sub.label}
                        onClick={() => handleNav(sub.view)}
                        className={`
                          w-full text-left px-4 py-3 text-sm rounded-lg transition-colors
                          ${currentView === sub.view 
                            ? 'bg-brand-secondary/10 text-brand-secondary font-semibold' 
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'}
                        `}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-white/5 rounded-full border border-white/10 px-3 py-1.5 focus-within:bg-white/10 focus-within:border-brand-secondary transition-all w-64">
            <Search size={16} className="text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Preguntar a NotarIA..." 
              className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-slate-500"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white p-2">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full h-[calc(100vh-5rem)] overflow-y-auto bg-brand-dark/95 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col gap-2 shadow-2xl animate-fade-in">
          {navLinks.map((link) => (
            <div key={link.label} className="border-b border-white/5 last:border-0 pb-2">
              {link.subItems ? (
                <>
                  <button 
                    onClick={() => toggleDropdown(link.label)}
                    className="w-full flex items-center justify-between text-left text-slate-300 py-3 font-semibold hover:text-white"
                  >
                    {link.label}
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  {activeDropdown === link.label && (
                    <div className="pl-4 flex flex-col gap-1 pb-2 bg-white/5 rounded-lg mb-2">
                      {link.subItems.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => handleNav(sub.view)}
                          className={`
                            text-left py-3 px-4 text-sm rounded-md
                            ${currentView === sub.view ? 'text-brand-secondary font-semibold' : 'text-slate-400 hover:text-white'}
                          `}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button 
                  onClick={() => handleNav(link.view)} 
                  className={`
                    w-full text-left py-3 font-semibold
                    ${currentView === link.view ? 'text-brand-secondary' : 'text-slate-300 hover:text-white'}
                  `}
                >
                  {link.label}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};
