import React, { useEffect, useState, useCallback } from 'react';
import { Lock } from 'lucide-react';

export const SessionGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
  const [isLocked, setIsLocked] = useState(false);

  const resetTimer = useCallback(() => {
    if (isLocked) return;
    const now = Date.now();
    localStorage.setItem('lastActivity', now.toString());
  }, [isLocked]);

  useEffect(() => {
    // Initial check
    const lastActivity = parseInt(localStorage.getItem('lastActivity') || Date.now().toString());
    if (Date.now() - lastActivity > TIMEOUT_MS) {
      setIsLocked(true);
    }

    const interval = setInterval(() => {
      const last = parseInt(localStorage.getItem('lastActivity') || Date.now().toString());
      if (Date.now() - last > TIMEOUT_MS) {
        setIsLocked(true);
      }
    }, 10000);

    // Event listeners for activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    // Prevent reverse engineering (Symbolic measure as per prompt)
    document.addEventListener('contextmenu', event => event.preventDefault());

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [resetTimer, isLocked]);

  if (isLocked) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 p-8 rounded-2xl border border-white/10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={40} className="text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Sesión Cerrada</h2>
          <p className="text-slate-400 mb-6">
            Por su seguridad, hemos cerrado la sesión tras 5 minutos de inactividad.
          </p>
          <button 
            onClick={() => {
              localStorage.setItem('lastActivity', Date.now().toString());
              setIsLocked(false);
              window.location.reload();
            }}
            className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-lg w-full transition-colors"
          >
            Reactivar Sesión
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};