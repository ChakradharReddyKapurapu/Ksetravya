import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost'
  size = 'md',        // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  disabled = false,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium font-display tracking-wide rounded-full transition-all duration-300 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400/50 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5 font-semibold',
  }[size];

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-900/40 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] border border-emerald-400/30',
    secondary:
      'bg-forest-800/80 backdrop-blur-md text-emerald-100 hover:bg-forest-700 hover:text-white border border-white/10 hover:border-emerald-500/40 shadow-md hover:scale-[1.02] active:scale-[0.98]',
    gold:
      'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-stone-950 font-semibold shadow-lg shadow-amber-950/50 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] border border-amber-300/40',
    outline:
      'bg-transparent text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/10 hover:border-emerald-400 hover:text-emerald-200 active:scale-[0.98]',
    ghost:
      'bg-transparent text-cream-200 hover:bg-white/5 hover:text-white active:scale-[0.98]',
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
    </button>
  );
};
