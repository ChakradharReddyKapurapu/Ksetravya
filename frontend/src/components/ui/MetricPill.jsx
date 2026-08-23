import React from 'react';

export const MetricPill = ({
  icon: Icon,
  label,
  value,
  trend,
  color = 'emerald', // 'emerald' | 'gold' | 'river'
  className = '',
}) => {
  const colorMap = {
    emerald: {
      border: 'border-emerald-500/25 hover:border-emerald-400/50',
      iconBg: 'bg-emerald-500/15 text-emerald-400',
      text: 'text-emerald-300',
    },
    gold: {
      border: 'border-amber-500/25 hover:border-amber-400/50',
      iconBg: 'bg-amber-500/15 text-amber-400',
      text: 'text-amber-300',
    },
    river: {
      border: 'border-sky-500/25 hover:border-sky-400/50',
      iconBg: 'bg-sky-500/15 text-sky-400',
      text: 'text-sky-300',
    },
  }[color];

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl bg-forest-900/60 backdrop-blur-md border ${colorMap.border} transition-all duration-300 shadow-md ${className}`}
    >
      {Icon && (
        <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${colorMap.iconBg}`}>
          <Icon className="w-4 h-4" />
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-[11px] uppercase tracking-wider text-cream-200/60 font-mono">{label}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-white font-display tracking-tight">{value}</span>
          {trend && (
            <span className={`text-[10px] font-mono ${trend.startsWith('+') ? 'text-emerald-400' : 'text-amber-400'}`}>
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
