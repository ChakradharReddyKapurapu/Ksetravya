import React from 'react';
import { useFarmContext } from '../../../context/FarmContext';
import { Sprout, MapPin, Sparkles, Sliders, ShieldCheck, ArrowRight } from 'lucide-react';

export const DashboardHero = () => {
  const { farm, openMyFarmModal } = useFarmContext();

  return (
    <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-forest-950 via-[#102418] to-forest-950 border border-emerald-500/30 shadow-2xl shadow-black/80">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Welcome Info */}
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-mono uppercase font-bold tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>AGRICULTURAL COMMAND CENTER</span>
            </span>

            <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-cream-200/60 border border-white/10 text-[10px] font-mono">
              Role: Cultivator / Farm Manager
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight leading-tight mb-2">
            Welcome to KṢETRAVYA
          </h1>

          <p className="text-xs sm:text-sm text-cream-200/80 font-body leading-relaxed mb-4">
            Your connected digital ecosystem for farming, markets, resources and opportunities.
          </p>

          {/* Personalized Greeting & Farm Summary */}
          <div className="p-3.5 rounded-2xl bg-forest-900/80 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <span className="text-cream-200/50 block text-[10px]">
                  Good morning, {farm.farmerName || 'Farmer'}.
                </span>
                <span className="font-bold text-white font-display text-sm">
                  {farm.farmName}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-emerald-300 font-bold">
                {farm.landArea} {farm.areaUnit}
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-amber-300">
                {farm.soilType.split(' ')[0]} Soil
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-teal-300">
                {farm.currentCrop}
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-sky-300">
                {farm.district}, {farm.state}
              </span>
            </div>

            <button
              onClick={openMyFarmModal}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-xs font-display font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-all ml-auto sm:ml-0"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Configure Farm</span>
            </button>
          </div>
        </div>

        {/* Right Status Badge */}
        <div className="p-4 rounded-2xl bg-forest-900/60 border border-white/10 space-y-2 text-xs font-mono min-w-[220px]">
          <div className="flex items-center justify-between text-cream-200/60 text-[10px]">
            <span>ECOSYSTEM STATUS</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="text-white font-bold text-sm">Active & Synced</div>
          <div className="text-[10px] text-cream-200/50">
            Season: <strong className="text-emerald-300">{farm.season}</strong>
          </div>
          <div className="text-[10px] text-cream-200/50">
            Irrigation: <strong className="text-teal-300">{farm.irrigationType.split(' ')[0]}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
