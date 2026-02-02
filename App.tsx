import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Menu, X, ChevronRight, FileText, PenTool, UserCheck, 
  Files, Phone, MapPin, Mail, Clock, ExternalLink, Shield 
} from 'lucide-react';
import { ViewState, Tramite, AccessibilityMode } from './types';
import { NOTARIA_INFO, TRAMITES_DATA, NEWS_DATA, TRANSPARENCY_LINKS, PARTICIPA_SECTIONS } from './constants';
import { LiquidCard } from './components/LiquidCard';
import { AccessibilityTool } from './components/AccessibilityTool';
import { SessionGuard } from './components/SessionGuard';
import { PqrsdForm } from './components/PqrsdForm';

// --- MAIN APP ---

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [accessMode, setAccessMode] = useState<AccessibilityMode>(AccessibilityMode.DEFAULT);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedTramite, setSelectedTramite] = useState<Tramite | null>(null);

  // Dynamic Class generation based on Accessibility Mode
  const getAccessClass = () => {
    switch(accessMode) {
      case AccessibilityMode.HIGH_CONTRAST: return 'contrast-150 saturate-0';
      case AccessibilityMode.LARGE_TEXT: return 'text-lg';
      case AccessibilityMode.DYSLEXIA_FRIENDLY: return 'font-sans tracking-wide';
      default: return '';
    }
  };

  const handleNav = (view: ViewState) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedTramite(null);
  };

  // --- SUB-COMPONENTS (Defined here for single-file constraints or moved to folder if needed) ---
  
  const Header = () => (
    <header className="fixed top-0 left-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Simulated Shields */}
          <div className="flex gap-2">
             <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black border-2 border-yellow-300" title="Escudo de Colombia">COL</div>
             <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-blue-400" title="Escudo UCNC">UCNC</div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 hidden sm:block">
            {NOTARIA_INFO.name}
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <button onClick={() => handleNav(ViewState.HOME)} className={`text-sm font-medium hover:text-blue-400 transition-colors ${currentView === ViewState.HOME ? 'text-blue-400' : 'text-slate-300'}`}>INICIO</button>
          <button onClick={() => handleNav(ViewState.TRAMITES)} className={`text-sm font-medium hover:text-blue-400 transition-colors ${currentView === ViewState.TRAMITES ? 'text-blue-400' : 'text-slate-300'}`}>ATENCIÓN Y SERVICIOS</button>
          <button onClick={() => handleNav(ViewState.TRANSPARENCIA)} className={`text-sm font-medium hover:text-blue-400 transition-colors ${currentView === ViewState.TRANSPARENCIA ? 'text-blue-400' : 'text-slate-300'}`}>TRANSPARENCIA</button>
          <button onClick={() => handleNav(ViewState.PARTICIPA)} className={`text-sm font-medium hover:text-blue-400 transition-colors ${currentView === ViewState.PARTICIPA ? 'text-blue-400' : 'text-slate-300'}`}>PARTICIPA</button>
        </nav>

        {/* Smart Search */}
        <div className="hidden md:flex items-center bg-white/5 rounded-full border border-white/10 px-3 py-1.5 focus-within:bg-white/10 focus-within:border-blue-400 transition-all w-64">
          <Search size={16} className="text-slate-400 mr-2" />
          <input 
            type="text" 
            placeholder="Buscar trámite..." 
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl animate-fade-in-down">
          <button onClick={() => handleNav(ViewState.HOME)} className="text-left text-slate-300 py-2 border-b border-white/5">Inicio</button>
          <button onClick={() => handleNav(ViewState.TRAMITES)} className="text-left text-slate-300 py-2 border-b border-white/5">Atención y Servicios</button>
          <button onClick={() => handleNav(ViewState.TRANSPARENCIA)} className="text-left text-slate-300 py-2 border-b border-white/5">Transparencia</button>
          <button onClick={() => handleNav(ViewState.PARTICIPA)} className="text-left text-slate-300 py-2 border-b border-white/5">Participa</button>
          <button onClick={() => handleNav(ViewState.PQRSD)} className="text-left text-blue-400 py-2 font-bold">PQRSD</button>
        </div>
      )}
    </header>
  );

  const Footer = () => (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-1 text-blue-500" /> {NOTARIA_INFO.address}</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-blue-500" /> {NOTARIA_INFO.phone}</li>
              <li className="flex items-center gap-2"><Mail size={16} className="text-blue-500" /> {NOTARIA_INFO.email}</li>
              <li className="flex items-start gap-2"><Clock size={16} className="mt-1 text-blue-500" /> {NOTARIA_INFO.hours}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-blue-400">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-blue-400">Política de Tratamiento de Datos</a></li>
              <li><a href="#" className="hover:text-blue-400">Políticas de derechos de autor</a></li>
              <li><a href="#" className="hover:text-blue-400">Políticas de Privacidad Web</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Accesibilidad</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-blue-400">Certificado de Accesibilidad</a></li>
              <li><a href="#" className="hover:text-blue-400">Mapa del Sitio</a></li>
              <li><span className="text-yellow-500/80 text-xs mt-2 block border border-yellow-500/30 p-2 rounded">Restricción Biométrica: No recolectamos huellas digitales en este servidor.</span></li>
            </ul>
          </div>
          <div>
            <div className="bg-slate-900 rounded-xl h-40 w-full flex items-center justify-center border border-white/10 text-slate-500">
              <span className="flex items-center gap-2"><MapPin /> Mapa de Ubicación</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-slate-500 text-xs">© 2026 Notaría 13 de Cali. Todos los derechos reservados.</p>
          <div className="fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur text-xs p-2 text-center border-t border-white/10 z-30 md:static md:bg-transparent md:border-none md:mt-4">
            Este sitio usa cookies para mejorar su experiencia. <button className="underline text-blue-400 ml-2">Gestionar Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );

  const Hero = () => (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
      {/* Background with FetchPriority High */}
      <img 
        src="https://picsum.photos/1920/1080?grayscale&blur=2" 
        alt="Fachada Notaría" 
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-900 z-0"></div>

      <div className="container mx-auto relative z-10 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs tracking-wider mb-6 animate-pulse-slow">
          SEGURIDAD JURÍDICA Y DIGITAL
        </span>
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          Notaría 13 de Cali <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-200">
            Confianza para el Futuro
          </span>
        </h2>
        <div className="flex flex-wrap justify-center gap-6 text-slate-300 mb-10 text-sm md:text-base">
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-white/5 backdrop-blur-sm">
            <MapPin size={18} className="text-blue-400" /> {NOTARIA_INFO.address}
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-white/5 backdrop-blur-sm">
            <Clock size={18} className="text-blue-400" /> {NOTARIA_INFO.hours}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={() => handleNav(ViewState.TRAMITES)} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all hover:scale-105">
            Realizar Trámites
          </button>
          <button onClick={() => handleNav(ViewState.PQRSD)} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold backdrop-blur-md transition-all">
            PQRSD y Contacto
          </button>
        </div>
      </div>
    </div>
  );

  const TramitesGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {['Escrituración', 'Autenticación', 'Registro Civil', 'No Escriturarios'].map((cat, idx) => {
        const icons = [PenTool, Shield, UserCheck, Files];
        const Icon = icons[idx];
        return (
          <LiquidCard key={cat} onClick={() => { handleNav(ViewState.TRAMITES); }} className="p-6 group h-full flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{cat}</h3>
              <p className="text-slate-400 text-sm">Gestione sus documentos con seguridad y eficiencia legal.</p>
            </div>
            <div className="mt-4 flex items-center text-blue-400 text-sm font-medium group-hover:translate-x-2 transition-transform">
              Ver detalles <ChevronRight size={16} />
            </div>
          </LiquidCard>
        );
      })}
    </div>
  );

  const NewsSection = () => (
    <section className="py-20 container mx-auto px-4">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h3 className="text-blue-400 font-semibold mb-2 tracking-wider uppercase text-sm">Actualidad</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Noticias y Novedades</h2>
        </div>
        <button className="hidden md:flex items-center text-slate-400 hover:text-white transition-colors">
          Ver todas <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {NEWS_DATA.map(news => (
          <div key={news.id} className="group cursor-pointer">
            <div className="overflow-hidden rounded-2xl mb-4 aspect-video relative">
               <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors z-10" />
               <img src={news.image} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            </div>
            <span className="text-blue-400 text-xs font-medium">{news.date}</span>
            <h4 className="text-xl font-bold text-white mt-2 mb-2 group-hover:text-blue-400 transition-colors">{news.title}</h4>
            <p className="text-slate-400 text-sm">{news.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );

  const HomeView = () => (
    <>
      <Hero />
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <TramitesGrid />
      </div>
      <NewsSection />
      
      {/* Information of Interest */}
      <section className="py-16 bg-slate-900/50 border-y border-white/5">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-2xl font-bold text-white mb-10">Información de Interés</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Niños y Adolescencia', 'Discapacidad', 'Nosotros', 'Normatividad', 'PQRSD', 'Multimedia'].map((item) => (
              <button 
                key={item}
                onClick={() => {
                  if(item === 'PQRSD') handleNav(ViewState.PQRSD);
                  if(item === 'Nosotros') handleNav(ViewState.NOSOTROS);
                }}
                className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white transition-all text-sm"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const TramitesView = () => {
    return (
      <div className="container mx-auto px-4 py-32">
        <h2 className="text-4xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">Trámites y Servicios</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
             {/* Categories Filter (Simulated) */}
             <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/10 sticky top-24">
                <h3 className="text-white font-bold mb-4">Categorías</h3>
                {['Escrituración', 'Autenticación', 'Registro Civil', 'No Escriturarios'].map(cat => (
                  <div key={cat} className="py-2 border-b border-white/5 last:border-0 text-slate-300 hover:text-blue-400 cursor-pointer">
                    {cat}
                  </div>
                ))}
             </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            {TRAMITES_DATA.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())).map(tramite => (
              <LiquidCard key={tramite.id} className="p-6" hoverEffect={false}>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2 py-1 rounded">{tramite.category}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{tramite.title}</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">{tramite.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/50 p-4 rounded-xl mb-4">
                   <div>
                      <span className="text-xs text-slate-500 block mb-1">Tiempo de entrega</span>
                      <span className="text-sm text-white font-medium">{tramite.time}</span>
                   </div>
                   <div>
                      <span className="text-xs text-slate-500 block mb-1">Costo</span>
                      <span className="text-sm text-white font-medium">{tramite.cost}</span>
                   </div>
                </div>

                <div className="space-y-2">
                   <h4 className="text-sm font-semibold text-white">Requisitos:</h4>
                   <ul className="list-disc list-inside text-sm text-slate-400 pl-2">
                      {tramite.requirements?.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                   </ul>
                </div>
              </LiquidCard>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const TransparenciaView = () => (
    <div className="container mx-auto px-4 py-32">
      <h2 className="text-4xl font-bold text-white mb-8">Transparencia y Acceso a la Información</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRANSPARENCY_LINKS.map((link, idx) => (
          <LiquidCard key={idx} className="p-6 h-40 flex flex-col justify-center items-center text-center group">
             <FileText className="text-blue-400 mb-3 group-hover:scale-110 transition-transform" size={32} />
             <h3 className="text-lg font-bold text-white">{link.title}</h3>
             {link.url && <ExternalLink size={14} className="mt-2 text-slate-500" />}
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
          <div key={idx} className="border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors cursor-pointer">
            <h3 className="text-xl font-bold text-blue-300 mb-2 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm">{idx + 1}</span>
              {section}
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
          <h3 className="text-2xl font-bold text-blue-400 mb-4">Misión</h3>
          <p className="text-slate-300 leading-relaxed">Velar día a día por la prestación de servicios notariales de excelencia y calidad, atendiendo los principios rectores del derecho garantizando la autenticidad, confianza y validez de los actos y contratos.</p>
        </LiquidCard>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/10">
              <h4 className="text-xl font-bold text-white mb-4">Diagramas de Flujo</h4>
              <div className="aspect-video bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-500">
                [Visualización de Procesos]
              </div>
           </div>
           <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/10">
              <h4 className="text-xl font-bold text-white mb-4">Organigrama</h4>
              <div className="aspect-video bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-500">
                [Estructura Jerárquica]
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <SessionGuard>
      <div className={`min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30 ${getAccessClass()}`}>
        <Header />
        
        <main className="min-h-screen">
          {currentView === ViewState.HOME && <HomeView />}
          {currentView === ViewState.TRAMITES && <TramitesView />}
          {currentView === ViewState.TRANSPARENCIA && <TransparenciaView />}
          {currentView === ViewState.PARTICIPA && <ParticipaView />}
          {currentView === ViewState.PQRSD && <div className="pt-32"><PqrsdForm /></div>}
          {currentView === ViewState.NOSOTROS && <NosotrosView />}
        </main>

        <Footer />
        <AccessibilityTool mode={accessMode} setMode={setAccessMode} />
      </div>
    </SessionGuard>
  );
}

export default App;
