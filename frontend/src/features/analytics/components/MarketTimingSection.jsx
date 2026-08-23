import React from 'react';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { Clock, TrendingUp, Calendar, Info, Sparkles } from 'lucide-react';

export const MarketTimingSection = () => {
  const { selectedCropMeta } = useAnalytics();
  const { historicalPrices, priceTrend, timingInsight, shortName, mandiUnit } = selectedCropMeta;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono uppercase font-bold mb-1">
              <Clock className="w-3 h-3" />
              <span>Historical Trend Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Market Timing & 2022-2026 Historical Trends
            </h2>
          </div>
          <span className="text-xs font-mono text-cream-200/50">
            {shortName} Historical Mandi Series
          </span>
        </div>

        {/* 2022-2026 Historical Timeline Bar Chart */}
        <div className="p-6 rounded-3xl bg-forest-900/80 border border-white/5 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-cream-200/80">
            <span className="font-bold text-white">5-Year Mandi Realization Timeline (₹ / {mandiUnit}):</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trend: {priceTrend}</span>
            </span>
          </div>

          <div className="grid grid-cols-5 gap-3 pt-4 font-mono text-xs items-end h-44">
            {historicalPrices.map((item, idx) => {
              const maxPrice = Math.max(...historicalPrices.map((p) => p.price));
              const heightPct = Math.round((item.price / maxPrice) * 100);

              return (
                <div key={idx} className="flex flex-col items-center justify-end h-full space-y-2">
                  <span className="text-[11px] font-bold text-white">₹{item.price.toLocaleString()}</span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-2xl transition-all ${
                      idx === historicalPrices.length - 1
                        ? 'bg-gradient-to-t from-purple-600 to-sky-400 shadow-lg shadow-sky-950/60'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  />
                  <span className="text-[10px] text-cream-200/50 uppercase">{item.year}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selling Window Insight Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/70 via-forest-900 to-forest-950 border border-sky-400/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-300 font-bold uppercase">
            <Calendar className="w-4 h-4" />
            <span>⏱️ SELLING WINDOW INSIGHT</span>
          </div>
          <p className="text-xs text-cream-100 font-body leading-relaxed">
            {timingInsight}
          </p>
          <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-[10px] font-mono text-cream-200/50">
            <Info className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>Informational analysis based on historical mandi arrivals — not a guaranteed market prediction.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
