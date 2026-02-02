import React, { useState } from 'react';
import { Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { LiquidCard } from './LiquidCard';

export const PqrsdForm: React.FC = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Petición',
    name: '',
    email: '',
    message: '',
    anonymous: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) return;
    alert("Solicitud enviada con éxito (Simulación). Su código de seguimiento es: PQR-2026-X8Y9");
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-300 mb-4">
          Buzón de Transparencia (PQRSD)
        </h2>
        <p className="text-slate-400">Su comunicación es fundamental para nosotros. Garantizamos la confidencialidad de su información.</p>
      </div>

      <LiquidCard className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo de Recurso */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Tipo de Recurso</label>
              <select 
                className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option>Petición</option>
                <option>Queja</option>
                <option>Reclamo</option>
                <option>Sugerencia</option>
                <option>Denuncia</option>
              </select>
            </div>

            {/* Modalidad Respuesta */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Modalidad de Respuesta</label>
              <select className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none">
                <option>Correo Electrónico</option>
                <option>Correspondencia Física</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2 my-4">
            <input 
              type="checkbox" 
              id="anon"
              checked={formData.anonymous}
              onChange={e => setFormData({...formData, anonymous: e.target.checked})}
              className="w-4 h-4 rounded border-gray-600 bg-slate-700 text-orange-500 focus:ring-orange-500"
            />
            <label htmlFor="anon" className="text-sm text-slate-300">Deseo realizar esta solicitud de forma anónima</label>
          </div>

          {!formData.anonymous && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Nombres Completos</label>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Juan Pérez"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Correo Electrónico</label>
                <input 
                  type="email" 
                  required 
                  className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Objeto de la solicitud</label>
            <textarea 
              required
              rows={5}
              className="w-full bg-slate-800/50 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none resize-none"
              placeholder="Describa detalladamente su solicitud..."
            ></textarea>
          </div>

          {/* Privacy & Legal Check */}
          <div className="bg-orange-900/20 border border-orange-500/20 rounded-lg p-4 mt-6">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="text-orange-400 mt-1 shrink-0" size={20} />
              <div className="text-sm text-slate-300">
                <p className="mb-2">
                  <strong>Privacidad Proactiva:</strong> Sus datos serán tratados bajo la Ley 1581 de 2012 y nuestra Política de Tratamiento de Datos.
                </p>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="terms"
                    checked={acceptedTerms}
                    onChange={e => setAcceptedTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-slate-700 text-orange-500 focus:ring-orange-500"
                  />
                  <label htmlFor="terms" className="cursor-pointer hover:text-white transition-colors">
                    He leído y acepto la <span className="underline decoration-orange-400 text-orange-300">Política de Privacidad</span> y los <span className="underline decoration-orange-400 text-orange-300">Términos y Condiciones</span>.
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={!acceptedTerms}
            className={`
              w-full py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300
              ${acceptedTerms 
                ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-1' 
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
            `}
          >
            <span>Enviar Solicitud Segura</span>
            <Send size={18} />
          </button>
        </form>
      </LiquidCard>
    </div>
  );
};