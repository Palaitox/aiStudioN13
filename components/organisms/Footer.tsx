
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { NOTARIA_INFO } from '../../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        {/* Grid 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-brand-secondary pl-3">Contacto</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3 group">
                <MapPin size={20} className="mt-0.5 text-brand-secondary shrink-0 group-hover:text-white transition-colors" /> 
                <span className="leading-relaxed">{NOTARIA_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={20} className="text-brand-secondary shrink-0 group-hover:text-white transition-colors" /> 
                <span>{NOTARIA_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail size={20} className="text-brand-secondary shrink-0 group-hover:text-white transition-colors" /> 
                <span>{NOTARIA_INFO.email}</span>
              </li>
              <li className="flex items-start gap-3 group">
                <Clock size={20} className="mt-0.5 text-brand-secondary shrink-0 group-hover:text-white transition-colors" /> 
                <span className="leading-relaxed">{NOTARIA_INFO.hours}</span>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-brand-secondary pl-3">Legal</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <a href="#" className="inline-block hover:text-brand-secondary transition-all duration-300 hover:drop-shadow-[0_0_5px_rgba(251,146,60,0.8)]">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="inline-block hover:text-brand-secondary transition-all duration-300 hover:drop-shadow-[0_0_5px_rgba(251,146,60,0.8)]">
                  Política de Tratamiento de Datos
                </a>
              </li>
              <li>
                <a href="#" className="inline-block hover:text-brand-secondary transition-all duration-300 hover:drop-shadow-[0_0_5px_rgba(251,146,60,0.8)]">
                  Políticas de derechos de autor
                </a>
              </li>
              <li>
                <a href="#" className="inline-block hover:text-brand-secondary transition-all duration-300 hover:drop-shadow-[0_0_5px_rgba(251,146,60,0.8)]">
                  Políticas de Privacidad Web
                </a>
              </li>
            </ul>
          </div>
          
          {/* Transparencia y Sellos */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 border-l-4 border-brand-secondary pl-3">Transparencia</h3>
            <ul className="space-y-3 text-slate-400 text-sm mb-6">
              <li>
                <a href="#" className="inline-block hover:text-brand-secondary transition-all duration-300 hover:drop-shadow-[0_0_5px_rgba(251,146,60,0.8)]">
                  Certificado de Accesibilidad
                </a>
              </li>
              <li>
                <a href="#" className="inline-block hover:text-brand-secondary transition-all duration-300 hover:drop-shadow-[0_0_5px_rgba(251,146,60,0.8)]">
                  Mapa del Sitio
                </a>
              </li>
            </ul>
            
            <div className="p-4 rounded-xl border border-yellow-500/10 bg-yellow-500/5 backdrop-blur-sm">
               <h4 className="text-yellow-500 text-xs font-bold uppercase mb-2 tracking-wider">Aviso Importante</h4>
               <p className="text-yellow-500/80 text-xs leading-relaxed">
                 Restricción Biométrica: Este portal web no recolecta, almacena ni procesa huellas digitales. Todos los trámites biométricos se realizan presencialmente en la sede.
               </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-slate-500 text-xs">
            © 2026 {NOTARIA_INFO.name}. Vigilado por la Superintendencia de Notariado y Registro.
          </p>
          <div className="text-xs text-slate-500">
            Desarrollado por <span className="text-brand-secondary font-medium">Rafael y Reinaldo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
