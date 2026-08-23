import React, { useEffect, useState } from 'react';
import { marketService } from '../services/marketService';
import { TrendingUp, ShieldCheck, Flame, Scale, ArrowUpRight } from 'lucide-react';

export const MarketInsightsStrip = () => {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    marketService.getMarketInsights().then(setInsights);
  }, []);

  if (!insights) return null;

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider block">
            MARKET INTELLIGENCE
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Live APMC Mandi Key Movers
          </h3>
        </div>
        <span className="text-[10px] font-mono text-cream-200/50">
          Based on Demo Market Data
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* 1. Top Price Gainer */}
        <div className="p-4 rounded-2xl bg-forest-900/70 border border-emerald-500/30 backdrop-blur-xl flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-cream-200/50 block">Top Gainer Today</span>
            <span className="text-sm font-bold text-white font-display block">
              {insights.topGainer?.name}
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              ▲ +{insights.topGainer?.changePercent}% (₹{insights.topGainer?.price}/{insights.topGainer?.unit})
            </span>
          </div>
        </div>

        {/* 2. Most Stable Commodity */}
        <div className="p-4 rounded-2xl bg-forest-900/70 border border-sky-500/30 backdrop-blur-xl flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-cream-200/50 block">Most Stable Crop</span>
            <span className="text-sm font-bold text-white font-display block">
              {insights.mostStable?.name}
            </span>
            <span className="text-xs font-mono text-sky-300">
              ₹{insights.mostStable?.price}/{insights.mostStable?.unit} (Low Volatility)
            </span>
          </div>
        </div>

        {/* 3. Highest Value Commodity */}
        <div className="p-4 rounded-2xl bg-forest-900/70 border border-amber-500/30 backdrop-blur-xl flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-cream-200/50 block">Highest Unit Value</span>
            <span className="text-sm font-bold text-white font-display block">
              {insights.highestPriced?.name}
            </span>
            <span className="text-xs font-mono text-amber-300 font-bold">
              ₹{insights.highestPriced?.price}/{insights.highestPriced?.unit}
            </span>
          </div>
        </div>

        {/* 4. Total Market Inflow */}
        <div className="p-4 rounded-2xl bg-forest-900/70 border border-purple-500/30 backdrop-blur-xl flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-cream-200/50 block">Mandi Inflow Volume</span>
            <span className="text-sm font-bold text-white font-display block">
              {insights.totalArrivals}
            </span>
            <span className="text-xs font-mono text-purple-300">
              {insights.averageMandiSentiment}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
