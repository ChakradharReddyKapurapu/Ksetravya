import React from 'react';
import { useSeeds } from '../../../context/SeedsContext';
import { Sprout, Sparkles, Navigation, ArrowDown } from 'lucide-react';

export const SeedsHero = () => {
  const { activeCrop, setActiveCrop, allCrops, travelHUDMessage } = useSeeds();

  return (
    <div className="relative pt-12 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none">
      {/* Travel HUD Banner Toast */}
      {travelHUDMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto">
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500 text-stone-950 font-display font-bold text-xs shadow-2xl border border-emerald-300">
            <Navigation className="w-4 h-4 animate-spin text-stone-950" />
            <span>{travelHUDMessage}</span>
          </div>
        </div>
      )}

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono uppercase mb-4 pointer-events-auto backdrop-blur-md">
        <Sprout className="w-4 h-4 text-emerald-400" />
        <span>THE BEGINNING OF FARMING • SEEDS WORLD</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-tight max-w-4xl mx-auto mb-4">
        Start Every Crop With the <span className="text-emerald-400">Right Seed.</span>
      </h1>

      <p className="text-sm sm:text-base text-cream-200/80 font-body max-w-2xl mx-auto mb-8">
        Explore agricultural seeds by crop, season and farming requirement.
      </p>

      {/* "WHAT DO YOU WANT TO GROW?" Large Crop Selector Bar */}
      <div className="max-w-4xl mx-auto p-4 sm:p-5 rounded-3xl bg-forest-950/90 border border-white/15 backdrop-blur-2xl shadow-2xl pointer-events-auto text-left">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold font-display uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            What do you want to grow?
          </span>
          <span className="text-[10px] font-mono text-cream-200/60 hidden sm:inline">
            Selecting a crop dynamically changes the 3D environment
          </span>
        </div>

        {/* Crop Selection Pills */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {allCrops.map((crop) => {
            const isSelected = activeCrop === crop.id;
            return (
              <button
                key={crop.id}
                onClick={() => setActiveCrop(crop.id)}
                className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500 text-stone-950 font-bold shadow-lg shadow-emerald-950/80 scale-105 border border-emerald-300'
                    : 'bg-white/5 hover:bg-white/10 text-cream-200/80 hover:text-white border border-white/5'
                }`}
                title={crop.desc}
              >
                <span className="text-2xl">{crop.icon}</span>
                <span className="text-[11px] font-display whitespace-nowrap">{crop.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
