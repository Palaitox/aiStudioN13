
import React, { useEffect, useState, useCallback } from 'react';
import { Lock } from 'lucide-react';

export const SessionGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
  const [isLocked, setIsLocked] = useState(false);

  const resetTimer = useCallback(() => {
    try {
      if (isLocked) return;
      const now = Date.now();
      localStorage.setItem('lastActivity', now.toString());
    } catch (e) {
      console.warn("Storage access denied");
    }
  }, [isLocked]);

  useEffect(() => {
    const checkSession = () => {
      try {
        const lastActivityStr = localStorage.getItem('lastActivity');
        const lastActivity = lastActivityStr ? parseInt(lastActivityStr) : Date.now();
        
        if (isNaN(lastActivity) || (Date.now() - lastActivity > TIMEOUT_MS)) {
          setIsLocked(true);
        }
      } catch (e) {
        // Fallback if localStorage is disabled
        console.warn("LocalStorage not available for session guard");
      }
    };

    // Initial check
    checkSession();

    const interval = setInterval(checkSession, 10000);

    // Event listeners for activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    // Security measures
    const preventContext = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', preventContext);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      document.removeEventListener('contextmenu', preventContext);
    };
  }, [resetTimer]);

  const handleReactivate = () => {
    try {
      // 1. Update activity timestamp first
      localStorage.setItem('lastActivity', Date.now().toString());
      // 2. ONLY reload. Do not call setIsLocked(false) to prevent sub-components from 
      // trying to mount/initialize before the page actually refreshes.
      window.location.reload();
    } catch (e) {
      // In case of error, at least try to reload
      window.location.reload();
    }
  };

  if (isLocked) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 p-8 rounded-2xl border border-white/10 max-w-md w-full text-center shadow-2xl animate-fade-in">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
            <Lock size={40} className="text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Sesión Suspendida</h2>
          <p className="text-slate-400 mb-6">
            Por su seguridad, el acceso ha sido bloqueado tras 5 minutos de inactividad. Sus datos están protegidos.
          </p>
          <button 
            onClick={handleReactivate}
            className="bg-brand-primary hover:bg-orange-500 text-white px-6 py-4 rounded-xl w-full font-bold transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] active:scale-95"
          >
            Reactivar Acceso Seguro
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
