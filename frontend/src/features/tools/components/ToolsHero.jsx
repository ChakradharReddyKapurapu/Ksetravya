import React from 'react';
import { useTools } from '../../../context/ToolsContext';
import { Tractor, Sparkles, SlidersHorizontal, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const ToolsHero = () => {
  const { activeMode, setIsRecommenderOpen, setIsSellModalOpen } = useTools();

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 pointer-events-none">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pointer-events-auto">
        {/* Left Hero Column */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-semibold uppercase tracking-wider">
              {activeMode === 'rent'
                ? 'Agricultural Machinery Rental Depot'
                : activeMode === 'buy'
                ? 'Verified Machinery Purchase Hub'
                : 'Agricultural Tools & Machinery Marketplace'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white tracking-tight leading-tight mb-4">
            Powering the Work <br />
            <span className="text-amber-400">Behind Every Harvest.</span>
          </h1>

          <p className="text-xs sm:text-base text-cream-200/80 font-body leading-relaxed max-w-xl mb-6">
            Find the agricultural machinery and equipment you need for preparing fields, planting, harvesting, irrigation and farm operations.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsRecommenderOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-display text-xs transition-all shadow-xl hover:scale-[1.02] cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Find the Right Equipment</span>
            </button>

            <button
              onClick={() => setIsSellModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-forest-900/80 hover:bg-forest-800 text-cream-100 border border-white/15 hover:border-amber-400/50 font-semibold font-display text-xs transition-all cursor-pointer"
            >
              <span>List Your Equipment</span>
            </button>
          </div>
        </div>

        {/* Right Hero Badge Pill */}
        <div className="p-5 rounded-3xl bg-forest-950/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-3 w-full lg:w-72 font-mono text-xs text-cream-200/80">
          <div className="flex items-center gap-2.5 text-white font-bold font-display text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>AGRI NEXUS Verified</span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>24+ Machinery Units in Stock</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified APMC Location Pickups</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Insured Equipment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
