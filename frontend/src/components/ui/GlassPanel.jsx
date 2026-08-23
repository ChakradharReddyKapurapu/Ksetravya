import React from 'react';

export const GlassPanel = ({
  children,
  className = '',
  variant = 'default', // 'default' | 'card' | 'subtle' | 'gold' | 'emerald'
  glow = false,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-[rgba(7,23,15,0.7)] border-white/10 backdrop-blur-xl',
    card: 'bg-[rgba(12,38,25,0.6)] border-white/10 hover:border-emerald-500/30 backdrop-blur-xl',
    subtle: 'bg-[rgba(5,15,10,0.45)] border-white/5 backdrop-blur-md',
    gold: 'bg-[rgba(26,20,10,0.7)] border-amber-500/30 hover:border-amber-400/50 backdrop-blur-xl',
    emerald: 'bg-[rgba(7,30,18,0.75)] border-emerald-500/40 hover:border-emerald-400/60 backdrop-blur-xl',
  }[variant];

  const glowStyles = glow ? 'shadow-[0_0_30px_-5px_rgba(34,197,94,0.25)]' : 'shadow-xl';

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 ${variantStyles} ${glowStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
