import React from 'react';

interface BadgeProps {
  label: string;
  color?: 'blue' | 'yellow' | 'green' | 'slate';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, color = 'blue', className = '' }) => {
  const colors = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    slate: "bg-slate-700/50 text-slate-300 border-slate-600/50"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${colors[color]} ${className}`}>
      {label}
    </span>
  );
};