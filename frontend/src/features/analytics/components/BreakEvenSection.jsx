import React from 'react';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { Scale, Target, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export const BreakEvenSection = () => {
  const {
    selectedCropMeta,
    totalCost,
    expectedYield,
    sellingPrice,
    breakEvenPrice,
    breakEvenYield,
    breakEvenYieldPerAcre,
    acreage,
  } = useAnalytics();

  const priceSafetyBuffer = sellingPrice > breakEvenPrice
    ? (((sellingPrice - breakEvenPrice) / sellingPrice) * 100).toFixed(1)
    : 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono uppercase font-bold mb-1">
              <Scale className="w-3 h-3" />
              <span>Financial Threshold Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Break-Even Price & Minimum Yield Safety Margins
            </h2>
          </div>
          <span className="text-xs font-mono text-cream-200/50">
            Risk Coverage Benchmarks
          </span>
        </div>

        {/* 2 Core Break-Even Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
          {/* Card 1: Break-Even Selling Price */}
          <div className="p-6 rounded-3xl bg-forest-900/80 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-display flex items-center gap-1.5">
                <Target className="w-4 h-4 text-sky-400" />
                <span>BREAK-EVEN SELLING PRICE</span>
              </span>
              <span className="text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">
                Floor Threshold
              </span>
            </div>

            <div className="text-3xl font-black font-display text-white">
              ₹{breakEvenPrice.toLocaleString()} <span className="text-xs font-normal text-cream-200/60">/ {selectedCropMeta.mandiUnit}</span>
            </div>

            <p className="text-xs text-cream-200/80 font-body leading-relaxed">
              Minimum estimated selling price needed to recover the total entered investment of <strong>₹{totalCost.toLocaleString()}</strong> across <strong>{expectedYield} {selectedCropMeta.mandiUnit}s</strong>.
            </p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-cream-200/50">
              <span>Formula: Total Cost ÷ Expected Yield</span>
              <span className="text-emerald-400 font-bold">Safety Margin: +{priceSafetyBuffer}%</span>
            </div>
          </div>

          {/* Card 2: Break-Even Yield */}
          <div className="p-6 rounded-3xl bg-forest-900/80 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-display flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>BREAK-EVEN HARVEST YIELD</span>
              </span>
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                Volume Threshold
              </span>
            </div>

            <div className="text-3xl font-black font-display text-white">
              {breakEvenYield} <span className="text-xs font-normal text-cream-200/60">{selectedCropMeta.mandiUnit}s ({breakEvenYieldPerAcre} / Acre)</span>
            </div>

            <p className="text-xs text-cream-200/80 font-body leading-relaxed">
              Estimated physical produce required to recover entered production costs when sold at <strong>₹{sellingPrice.toLocaleString()} / {selectedCropMeta.mandiUnit}</strong>.
            </p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-cream-200/50">
              <span>Formula: Total Cost ÷ Selling Price</span>
              <span className="text-sky-300 font-bold">Target Yield: {expectedYield} {selectedCropMeta.mandiUnit}s</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
