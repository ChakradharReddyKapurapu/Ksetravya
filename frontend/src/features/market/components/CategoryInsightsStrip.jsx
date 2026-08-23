import React from 'react';
import { useMarket } from '../../../context/MarketContext';
import { Sparkles, TrendingUp, ShieldCheck, Flame, Scale } from 'lucide-react';

export const CategoryInsightsStrip = () => {
  const { activeCategory, setActiveCategory, allCategories, allCrops, setSelectedCrop } = useMarket();

  const tomato = allCrops.find((c) => c.id === 'tomato') || allCrops[4];
  const rice = allCrops.find((c) => c.id === 'rice') || allCrops[0];
  const chilli = allCrops.find((c) => c.id === 'chilli') || allCrops[5];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 1. BROWSE BY CATEGORY */}
      <div className="p-5 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold font-display uppercase tracking-wider text-white">
              BROWSE BY CATEGORY
            </span>
            <span className="text-[9px] font-mono text-cream-200/50">APMC Sectors</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {allCategories.map((cat) => {
              const isSelected = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`p-2 rounded-xl text-xs font-display flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-cream-200/80 hover:text-white'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className="truncate">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <span className="text-[9px] font-mono text-cream-200/40 text-center block pt-3">
          Filter price cards & goods catalog
        </span>
      </div>

      {/* 2. TOP MARKET INSIGHTS */}
      <div className="p-5 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold font-display uppercase tracking-wider text-white">
              TOP MARKET INSIGHTS
            </span>
            <span className="text-[9px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">
              LIVE TELEMETRY
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Item 1: Highest Increase */}
            <div
              onClick={() => setSelectedCrop(tomato)}
              className="p-2.5 rounded-2xl bg-forest-900/80 hover:bg-forest-900 border border-white/5 hover:border-emerald-400/30 flex items-center justify-between gap-3 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{tomato.icon}</span>
                <div>
                  <span className="text-[9px] font-mono text-cream-200/50 block">Highest Price Increase</span>
                  <h5 className="text-xs font-bold font-display text-white">{tomato.name}</h5>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                +{tomato.changePercent}%
              </span>
            </div>

            {/* Item 2: Most Stable */}
            <div
              onClick={() => setSelectedCrop(rice)}
              className="p-2.5 rounded-2xl bg-forest-900/80 hover:bg-forest-900 border border-white/5 hover:border-amber-400/30 flex items-center justify-between gap-3 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{rice.icon}</span>
                <div>
                  <span className="text-[9px] font-mono text-cream-200/50 block">Most Stable Commodity</span>
                  <h5 className="text-xs font-bold font-display text-white">{rice.name}</h5>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg">
                ±0.8%
              </span>
            </div>

            {/* Item 3: Highest Value */}
            <div
              onClick={() => setSelectedCrop(chilli)}
              className="p-2.5 rounded-2xl bg-forest-900/80 hover:bg-forest-900 border border-white/5 hover:border-rose-400/30 flex items-center justify-between gap-3 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{chilli.icon}</span>
                <div>
                  <span className="text-[9px] font-mono text-cream-200/50 block">Highest Average Rate</span>
                  <h5 className="text-xs font-bold font-display text-white">{chilli.name}</h5>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded-lg">
                ₹{chilli.price}/kg
              </span>
            </div>
          </div>
        </div>

        <span className="text-[9px] font-mono text-cream-200/40 text-center block pt-2">
          Demo insight generated from regional arrival volume
        </span>
      </div>
    </div>
  );
};
