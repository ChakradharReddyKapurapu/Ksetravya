import React from 'react';
import { useMarket } from '../../../context/MarketContext';
import { TrendingUp, TrendingDown, Store, Activity, Sparkles, Scale } from 'lucide-react';

export const MarketSummaryCards = () => {
  const { allCrops, allMarkets } = useMarket();

  // Find top rising and falling crops dynamically
  const sortedByChange = [...allCrops].sort((a, b) => b.changePercent - a.changePercent);
  const topRising = sortedByChange[0] || allCrops[0];
  const topFalling = sortedByChange[sortedByChange.length - 1] || allCrops[allCrops.length - 1];

  const avgMarketPrice = (
    allCrops.reduce((acc, c) => acc + c.price, 0) / (allCrops.length || 1)
  ).toFixed(1);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Card 1: Today's Market Average */}
        <div className="p-4 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-cream-200/60 font-bold">
              TODAY'S MARKET
            </span>
            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Scale className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black font-display text-white block">
              ₹{avgMarketPrice}
            </span>
            <span className="text-[10px] font-mono text-emerald-400">
              Statewide Avg (Demo Data)
            </span>
          </div>
        </div>

        {/* Card 2: Top Rising Crop */}
        <div className="p-4 rounded-3xl bg-forest-950/85 border border-emerald-500/30 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
              TOP RISING CROP
            </span>
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base">{topRising.icon}</span>
              <span className="text-base font-bold font-display text-white">
                {topRising.name.split(' ')[0]}
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400">
              +{topRising.changePercent}% today
            </span>
          </div>
        </div>

        {/* Card 3: Top Falling Crop */}
        <div className="p-4 rounded-3xl bg-forest-950/85 border border-rose-500/30 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">
              TOP FALLING CROP
            </span>
            <div className="w-6 h-6 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">
              <TrendingDown className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base">{topFalling.icon}</span>
              <span className="text-base font-bold font-display text-white">
                {topFalling.name.split(' ')[0]}
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-rose-400">
              {topFalling.changePercent}% today
            </span>
          </div>
        </div>

        {/* Card 4: Most Traded Crop */}
        <div className="p-4 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
              MOST TRADED
            </span>
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="text-base font-bold font-display text-white block">
              Tomato (4.2k)
            </span>
            <span className="text-[10px] font-mono text-cream-200/60">
              Highest Yard Inflow
            </span>
          </div>
        </div>

        {/* Card 5: Active Markets */}
        <div className="p-4 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-sky-400 font-bold">
              ACTIVE MARKETS
            </span>
            <div className="w-6 h-6 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-300">
              <Store className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black font-display text-white block">
              24 Mandis
            </span>
            <span className="text-[10px] font-mono text-sky-300">
              Across Andhra Pradesh
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
