import React from 'react';

export const Badge = ({
  children,
  variant = 'emerald', // 'emerald' | 'gold' | 'river' | 'earth' | 'neutral'
  size = 'md',        // 'sm' | 'md'
  dot = false,
  className = '',
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30',
    gold: 'bg-amber-950/70 text-amber-300 border-amber-500/30',
    river: 'bg-sky-950/70 text-sky-300 border-sky-500/30',
    earth: 'bg-stone-900/80 text-amber-200 border-stone-600/40',
    neutral: 'bg-stone-900/60 text-stone-300 border-white/10',
  }[variant];

  const dotColors = {
    emerald: 'bg-emerald-400',
    gold: 'bg-amber-400',
    river: 'bg-sky-400',
    earth: 'bg-amber-500',
    neutral: 'bg-stone-400',
  }[variant];

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3.5 py-1 text-xs font-medium',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md font-mono tracking-wide ${variantStyles} ${sizeStyles} ${className}`}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors}`} />
        </span>
      )}
      {children}
    </span>
  );
};
