import React from 'react';

interface LiquidCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const LiquidCard: React.FC<LiquidCardProps> = ({ 
  children, 
  className = "", 
  onClick,
  hoverEffect = true 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl 
        bg-glass-100 backdrop-blur-xl border border-white/10 shadow-2xl
        transition-all duration-500 ease-out
        ${hoverEffect ? 'hover:bg-glass-200 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(251,146,60,0.3)] cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Decorative gradient blob inside card */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};