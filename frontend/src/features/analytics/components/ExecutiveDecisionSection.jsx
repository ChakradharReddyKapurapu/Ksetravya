import React from 'react';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { ShieldCheck, RotateCcw, Scale, CheckCircle2, AlertTriangle } from 'lucide-react';

export const ExecutiveDecisionSection = () => {
  const {
    selectedCropMeta,
    liveMandiData,
    acreage,
    totalCost,
    expectedRevenue,
    netProfit,
    roiPercentage,
    breakEvenPrice,
    sellingPrice,
    riskAnalysis,
    resetToBenchmarks,
  } = useAnalytics();

  const scrollToTop = () => {
    const elem = document.getElementById('investment-calculator');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const isProfit = netProfit > 0;

  return (
    <section id="executive-decision" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 border border-purple-400/40 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono uppercase font-bold mb-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Executive Farm Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              YOUR FARM ANALYSIS & FINAL DECISION PANEL
            </h2>
          </div>

          {/* Risk Badge */}
          <div className={`px-3 py-1 rounded-full border text-xs font-mono font-bold flex items-center gap-1.5 ${riskAnalysis.color}`}>
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>PROFITABILITY RISK: {riskAnalysis.level}</span>
          </div>
        </div>

        {/* 8-Point Key Metric Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-cream-200/50 block">Cultivation Crop</span>
            <span className="text-white font-bold text-sm block truncate">{selectedCropMeta.name}</span>
            <span className="text-[10px] text-cream-200/40">{acreage} Acres Farm</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-cream-200/50 block">Total Investment</span>
            <span className="text-amber-300 font-bold text-sm block">₹{totalCost.toLocaleString()}</span>
            <span className="text-[10px] text-cream-200/40">Input & Labor</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-cream-200/50 block">Expected Revenue</span>
            <span className="text-sky-300 font-bold text-sm block">₹{expectedRevenue.toLocaleString()}</span>
            <span className="text-[10px] text-cream-200/40">At ₹{sellingPrice} / Qtl</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-cream-200/50 block">Expected Net Profit</span>
            <span className={`font-black text-sm block ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
              ₹{netProfit.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-300">ROI: +{roiPercentage}%</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-cream-200/50 block">Break-Even Selling Price</span>
            <span className="text-white font-bold text-sm block">₹{breakEvenPrice.toLocaleString()}</span>
            <span className="text-[10px] text-cream-200/40">Floor Threshold</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-cream-200/50 block">Mandi Average Price</span>
            <span className="text-sky-300 font-bold text-sm block">₹{liveMandiData.avgPrice.toLocaleString()}</span>
            <span className="text-[10px] text-cream-200/40">{liveMandiData.mandi}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-cream-200/50 block">Observed Price Trend</span>
            <span className="text-emerald-400 font-bold text-sm block uppercase">{selectedCropMeta.priceTrend} ↗</span>
            <span className="text-[10px] text-cream-200/40">5-Year Positive</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-cream-200/50 block">Risk Buffer</span>
            <span className="text-emerald-300 font-bold text-sm block">
              +{(((sellingPrice - breakEvenPrice) / (sellingPrice || 1)) * 100).toFixed(0)}% Margin
            </span>
            <span className="text-[10px] text-cream-200/40">Above Break-Even</span>
          </div>
        </div>

        {/* Risk Detail Alert */}
        <p className="text-xs text-cream-200/80 font-body leading-relaxed">
          <strong>Rule-Based Profitability Insight:</strong> {riskAnalysis.message}
        </p>

        {/* Decision Banner & Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs font-mono text-purple-300 uppercase tracking-widest font-bold block">
              UNDERSTAND YOUR MARKET BEFORE YOU SELL.
            </span>
            <span className="text-[11px] text-cream-200/60 font-body">
              Calculations are rule-based indicative guidelines to empower informed farm management.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold font-display text-xs transition-all shadow-lg cursor-pointer"
            >
              RECALCULATE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
