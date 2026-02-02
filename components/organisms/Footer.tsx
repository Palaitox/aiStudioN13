import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { NOTARIA_INFO } from '../../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-l-4 border-brand-secondary pl-3">Contacto</h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-brand-secondary shrink-0" /> 
                <span>{NOTARIA_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-secondary shrink-0" /> 
                <span>{NOTARIA_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-secondary shrink-0" /> 
                <span>{NOTARIA_INFO.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 text-brand-secondary shrink-0" /> 
                <span>{NOTARIA_INFO.hours}</span>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-l-4 border-brand-secondary pl-3">Legal</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-brand-secondary transition-colors">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-brand-secondary transition-colors">Política de Tratamiento de Datos</a></li>
              <li><a href="#" className="hover:text-brand-secondary transition-colors">Políticas de derechos de autor</a></li>
              <li><a href="#" className="hover:text-brand-secondary transition-colors">Políticas de Privacidad Web</a></li>
            </ul>
          </div>
          
          {/* Accesibilidad y Sellos */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-l-4 border-brand-secondary pl-3">Transparencia</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-brand-secondary transition-colors">Certificado de Accesibilidad</a></li>
              <li><a href="#" className="hover:text-brand-secondary transition-colors">Mapa del Sitio</a></li>
              <li>
                <div className="mt-4 p-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5">
                  <span className="text-yellow-500/80 text-xs font-medium block">
                    Restricción Biométrica: No recolectamos huellas digitales en este servidor web.
                  </span>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Mapa Visual */}
          <div>
            <div className="bg-slate-900 rounded-xl h-40 w-full flex items-center justify-center border border-white/10 text-slate-500 hover:border-brand-secondary/50 transition-colors cursor-pointer group">
              <span className="flex items-center gap-2 group-hover:text-brand-secondary transition-colors">
                <MapPin /> Ver Mapa en Google
              </span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-slate-500 text-xs">
            © 2026 {NOTARIA_INFO.name}. Vigilado por la Superintendencia de Notariado y Registro.
          </p>
          <div className="text-xs text-slate-500">
            Desarrollado con <span className="text-brand-secondary">Atomic Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
};