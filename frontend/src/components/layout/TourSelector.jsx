import React from 'react';
import { usePerformance } from '../../context/PerformanceContext';
import { Sparkles, Compass, Tractor, Droplet, Sprout, SunMedium } from 'lucide-react';

export const TourSelector = () => {
  const { activeTour, setActiveTour } = usePerformance();

  const tours = [
    { id: 'panorama', label: 'Farm Panorama', icon: Compass },
    { id: 'machinery', label: 'Machinery Hub', icon: Tractor },
    { id: 'river', label: 'Irrigation River', icon: Droplet },
    { id: 'fields', label: 'Precision Fields', icon: Sprout },
    { id: 'solar', label: 'Solar Farmstead', icon: SunMedium },
  ];

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-2 flex justify-center">
      <div className="inline-flex items-center gap-1 sm:gap-2 p-1.5 rounded-full bg-forest-950/80 backdrop-blur-xl border border-white/10 shadow-xl overflow-x-auto max-w-full">
        {/* Live Ecosystem Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-semibold uppercase tracking-wider whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Live Ecosystem</span>
        </div>

        {/* Tour Pills */}
        {tours.map((t) => {
          const Icon = t.icon;
          const isActive = activeTour === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTour(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.2 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-500/30 text-white border border-emerald-400/50 shadow-sm shadow-emerald-950'
                  : 'text-cream-200/70 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-cream-200/50'}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
