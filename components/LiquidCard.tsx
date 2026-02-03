import React from 'react';

interface LiquidCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const LiquidCard: React.FC<LiquidCardProps> = ({ 
  children, 
  className = "", 
  onClick,
  hoverEffect = true,
  ...props
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl 
        bg-glass-100 backdrop-blur-xl border border-white/10 shadow-2xl
        transition-all duration-500 ease-out will-change-transform
        ${hoverEffect ? 'hover:bg-glass-200 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(251,146,60,0.15)] cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Decorative gradient blob inside card - Optimized for no-reflow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Liquid Light Reflection - Uses transform for performance */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ transform: 'translateZ(0)' }} 
      />

      {/* Glossy Border Highlight */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};