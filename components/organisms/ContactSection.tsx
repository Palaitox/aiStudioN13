import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Copy, Check, Navigation } from 'lucide-react';
import { NOTARIA_INFO } from '../../constants';
import { Button } from '../atoms/Button';

// Hook to simulate sentient office hours awareness
const useOfficeStatus = () => {
  const [status, setStatus] = useState<{isOpen: boolean; message: string; color: string}>({
    isOpen: false, message: 'Cargando estado...', color: 'text-slate-400'
  });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday...
      const hour = now.getHours();

      // Simple logic: Mon-Fri 8-17, Sat 9-12
      let isOpen = false;
      if (day >= 1 && day <= 5) {
        isOpen = hour >= 8 && hour < 17;
      } else if (day === 6) {
        isOpen = hour >= 9 && hour < 12;
      }

      if (isOpen) {
        setStatus({
          isOpen: true,
          message: 'Abierto ahora. Visítenos sin cita previa.',
          color: 'text-green-400'
        });
      } else {
        setStatus({
          isOpen: false,
          message: 'Cerrado. Nuestros servicios digitales están activos 24/7.',
          color: 'text-amber-400'
        });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return status;
};

export const ContactSection: React.FC = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const officeStatus = useOfficeStatus();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Lazy Load Map Strategy (Island Architecture Concept)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setMapLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load slightly before view
    );

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contactItems = [
    { 
      icon: MapPin, 
      label: 'Dirección', 
      value: NOTARIA_INFO.address, 
      action: 'Copiar' 
    },
    { 
      icon: Phone, 
      label: 'Línea de Atención', 
      value: NOTARIA_INFO.phone, 
      action: 'Copiar' 
    },
    { 
      icon: Mail, 
      label: 'Correo Electrónico', 
      value: NOTARIA_INFO.email, 
      action: 'Copiar' 
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden border-t border-white/5" aria-labelledby="contact-heading">
      {/* Background Ambient */}
      <div className="absolute inset-0 bg-brand-dark pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Contact Information Card (Liquid Glass) */}
          <div className="order-2 lg:order-1">
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                 <div className="h-1 w-10 bg-brand-secondary rounded-full"></div>
                 <span className="text-brand-secondary font-bold tracking-widest text-xs uppercase">Sede Principal</span>
              </div>
              <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ubícanos
              </h2>
              <div className={`flex items-center gap-2 text-sm font-medium ${officeStatus.color} bg-slate-900/50 w-max px-3 py-1 rounded-full border border-white/5`}>
                <span className={`w-2 h-2 rounded-full ${officeStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
                {officeStatus.message}
              </div>
            </header>

            <address className="not-italic grid gap-4">
              {contactItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center justify-between transition-all hover:border-brand-secondary/30 hover:bg-slate-800/60"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-secondary group-hover:scale-110 transition-transform">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400 font-medium uppercase tracking-wider">{item.label}</span>
                      <span className="block text-white font-semibold text-lg">{item.value}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleCopy(item.value, item.label)}
                    className="p-2 text-slate-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-secondary rounded-lg"
                    aria-label={`Copiar ${item.label}`}
                    title="Copiar al portapapeles"
                  >
                    {copiedField === item.label ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                  </button>
                </div>
              ))}
            </address>

            <div className="mt-8 flex gap-4">
              <Button 
                variant="primary" 
                className="w-full justify-center"
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Notaría Trece de Cali - Valle")}`, '_blank')}
                icon={<Navigation size={18} />}
              >
                Cómo llegar
              </Button>
            </div>
          </div>

          {/* Right: Map Container (Lazy Loaded Island) */}
          <div 
            ref={mapContainerRef}
            className="order-1 lg:order-2 h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative bg-slate-800"
            role="application"
            aria-label="Mapa de ubicación Google Maps Notaría 13"
          >
            {/* CLS Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 z-0">
               <MapPin size={48} className="mb-4 opacity-50 animate-bounce" />
               <p className="text-sm font-medium">Cargando mapa interactivo...</p>
            </div>

            {/* Actual Map Iframe - Loaded only when visible */}
            {mapLoaded && (
              <iframe
                title="Mapa Ubicación Notaría 13 Cali"
                src="https://maps.google.com/maps?q=Notar%C3%ADa%20Trece%20de%20Cali%20-%20Valle%2C%20Cl.%205%20%2350-103&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 absolute inset-0 z-10 transition-opacity duration-700 opacity-0 animate-fade-in"
                style={{ opacity: 1 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
            
            {/* Decorative Overlay for "Integrated" feel */}
            <div className="absolute inset-0 pointer-events-none border-[6px] border-white/5 rounded-3xl z-20" />
          </div>

        </div>
      </div>
    </section>
  );
};