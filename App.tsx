
import React, { useState, useRef } from 'react';
import { ViewState, AccessibilityMode } from './types';
import { TRANSPARENCY_LINKS, PARTICIPA_SECTIONS } from './constants';
import { AccessibilityTool } from './components/AccessibilityTool';
import { SessionGuard } from './components/SessionGuard';
import { PqrsdForm } from './components/PqrsdForm';
import { Navbar } from './components/organisms/Navbar';
import { Footer } from './components/organisms/Footer';
import { ChatWidget, ChatWidgetHandle } from './components/organisms/ChatWidget'; // Imported ChatWidgetHandle
import { HomeView } from './views/HomeView';
import { TramitesView } from './views/TramitesView';
import { LiquidCard } from './components/LiquidCard';
import { FileText, ExternalLink, Files, UserCheck } from 'lucide-react';
import { ContactSection } from './components/organisms/ContactSection';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [accessMode, setAccessMode] = useState<AccessibilityMode>(AccessibilityMode.DEFAULT);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTramiteCategory, setSelectedTramiteCategory] = useState<string | 'ALL'>('ALL');
  
  // Reference to control the ChatWidget from App/Navbar
  const chatRef = useRef<ChatWidgetHandle>(null);

  // Dynamic Class generation based on Accessibility Mode
  const getAccessClass = () => {
    switch(accessMode) {
      case AccessibilityMode.HIGH_CONTRAST: return 'contrast-150 saturate-0';
      case AccessibilityMode.LARGE_TEXT: return 'text-lg';
      case AccessibilityMode.DYSLEXIA_FRIENDLY: return 'font-sans tracking-wide';
      default: return '';
    }
  };

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view !== ViewState.TRAMITES) {
      setSelectedTramiteCategory('ALL');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // We maintain this for live filtering in TramitesView if the user is there
    if (query && currentView === ViewState.TRAMITES) {
       // Optional: Auto-navigate to Tramites if typing? 
       // For now, we only filter if already in Tramites to avoid jarring transitions,
       // as the main intent of the bar is now the Chatbot via Enter.
    }
  };

  const handleSearchSubmit = (query: string) => {
    // Open ChatWidget and send the query
    if (chatRef.current) {
      chatRef.current.openWithQuery(query);
      // Optional: Clear search bar after submitting to chat
      setSearchQuery(''); 
    }
  };

  // --- Inline Views for specific simple pages (Mocking extracted templates) ---
  const TransparenciaView = () => (
    <div className="container mx-auto px-4 py-32">
      <h2 className="text-4xl font-bold text-white mb-8">Transparencia y Acceso a la Información</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRANSPARENCY_LINKS.map((link, idx) => (
          <LiquidCard 
            key={idx} 
            className="p-6 h-40 flex flex-col justify-center items-center text-center group"
            onClick={() => link.view && handleNavigate(link.view)}
          >
             <FileText className="text-brand-secondary mb-3 group-hover:scale-110 transition-transform" size={32} />
             <h3 className="text-lg font-bold text-white">{link.title}</h3>
             {link.url && (
               <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 mt-2 text-sm text-slate-500 hover:text-brand-secondary">
                 Visitar sitio <ExternalLink size={14} />
               </a>
             )}
          </LiquidCard>
        ))}
      </div>
    </div>
  );

  const ParticipaView = () => (
    <div className="container mx-auto px-4 py-32">
      <h2 className="text-4xl font-bold text-white mb-4">Participa</h2>
      <p className="text-slate-400 mb-10 max-w-2xl">Interacción e intervención ciudadana en las fases de formulación, ejecución, control y evaluación del ciclo de la gestión pública.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PARTICIPA_SECTIONS.map((section, idx) => (
          <div key={idx} className="border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors cursor-pointer group">
            <h3 className="text-xl font-bold text-orange-300 mb-2 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-sm shadow-lg shadow-orange-900/50">{idx + 1}</span>
              <span className="group-hover:text-brand-secondary transition-colors">{section}</span>
            </h3>
            <p className="text-slate-400 text-sm ml-11">Espacio para la vinculación ciudadana y el diálogo constructivo.</p>
          </div>
        ))}
      </div>
    </div>
  );

  const NosotrosView = () => (
    <div className="container mx-auto px-4 py-32">
      <h2 className="text-4xl font-bold text-white mb-8">Nuestra Notaría</h2>
      <div className="space-y-12">
        <LiquidCard className="p-8">
          <h3 className="text-2xl font-bold text-brand-secondary mb-4">Misión y Visión</h3>
          <p className="text-slate-300 leading-relaxed">Velar día a día por la prestación de servicios notariales de excelencia y calidad, atendiendo los principios rectores del derecho garantizando la autenticidad, confianza y validez de los actos y contratos.</p>
        </LiquidCard>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/10">
              <h4 className="text-xl font-bold text-white mb-4">Mapa de Procesos</h4>
              <div className="aspect-video bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-500 border border-white/5">
                <Files size={32} className="mb-2" />
                <span className="text-sm">Visualización de Procesos</span>
              </div>
           </div>
           <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/10">
              <h4 className="text-xl font-bold text-white mb-4">Organigrama</h4>
              <div className="aspect-video bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-500 border border-white/5">
                <UserCheck size={32} className="mb-2" />
                <span className="text-sm">Estructura Jerárquica</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <SessionGuard>
      <div className={`min-h-screen bg-brand-dark text-slate-50 selection:bg-brand-primary/30 ${getAccessClass()}`}>
        <Navbar 
          currentView={currentView} 
          onNavigate={handleNavigate}
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          onSearchSubmit={handleSearchSubmit}
        />
        
        <main className="min-h-screen">
          {currentView === ViewState.HOME && (
            <HomeView 
              onNavigate={handleNavigate} 
              onCategorySelect={setSelectedTramiteCategory} 
            />
          )}
          {currentView === ViewState.TRAMITES && (
            <TramitesView 
              searchQuery={searchQuery}
              selectedCategory={selectedTramiteCategory}
              onCategoryChange={setSelectedTramiteCategory}
            />
          )}
          {currentView === ViewState.TRANSPARENCIA && <TransparenciaView />}
          {currentView === ViewState.PARTICIPA && <ParticipaView />}
          {currentView === ViewState.PQRSD && <div className="pt-32"><PqrsdForm /></div>}
          {currentView === ViewState.NOSOTROS && <NosotrosView />}
          {currentView === ViewState.CONTACTO && <div className="pt-20"><ContactSection /></div>}
        </main>

        <Footer />
        <AccessibilityTool mode={accessMode} setMode={setAccessMode} />
        
        {/* NotarIA Island - Connected via Ref */}
        <ChatWidget ref={chatRef} />
      </div>
    </SessionGuard>
  );
}

export default App;
