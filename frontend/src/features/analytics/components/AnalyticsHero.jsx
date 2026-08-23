import React from 'react';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { useFarmContext } from '../../../context/FarmContext';
import { Sparkles, Calculator, BarChart3, TrendingUp, ArrowRight, Sprout } from 'lucide-react';

export const AnalyticsHero = () => {
  const {
    selectedCropMeta,
    totalCost,
    liveMandiData,
    roiPercentage,
    netProfit,
  } = useAnalytics();
  const { farm, openMyFarmModal } = useFarmContext();

  const scrollToCalculator = () => {
    const elem = document.getElementById('investment-calculator');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDecision = () => {
    const elem = document.getElementById('executive-decision');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 text-center pointer-events-none">
      {/* Small Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4 pointer-events-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[10px] font-mono uppercase tracking-wider backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-bold">AGRI NEXUS DECISION COMMAND CENTER</span>
        </div>

        <button
          onClick={openMyFarmModal}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-[10px] font-mono cursor-pointer transition-colors"
          title="Click to change your farm parameters"
        >
          <Sprout className="w-3 h-3 text-emerald-400" />
          <span>Farm Context: {farm.landArea} {farm.areaUnit} {farm.currentCrop} ({farm.district})</span>
        </button>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight leading-[1.08] mb-3 pointer-events-auto">
        AGRICULTURAL <br />
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
          INTELLIGENCE
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-cream-200/80 font-body max-w-xl mx-auto mb-8 leading-relaxed pointer-events-auto">
        Analysis configured for your {farm.landArea}-{farm.areaUnit} {farm.currentCrop} farm in {farm.district}, {farm.state}. Evaluate input costs, expected revenue, and ROI in one place.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 pointer-events-auto">
        <button
          onClick={scrollToCalculator}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold font-display text-xs transition-all shadow-xl hover:scale-105 cursor-pointer ring-2 ring-purple-400/50"
        >
          <Calculator className="w-4 h-4" />
          <span>CALCULATE PROFIT</span>
        </button>

        <button
          onClick={scrollToDecision}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-forest-950/90 hover:bg-forest-900 border border-purple-400/40 text-purple-300 text-xs font-bold font-display transition-all shadow-lg hover:scale-105 cursor-pointer"
        >
          <BarChart3 className="w-4 h-4" />
          <span>ANALYZE MY FARM</span>
        </button>
      </div>

      {/* 4 Live Metric Tickers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pointer-events-auto">
        <div className="p-4 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono text-cream-200/50 uppercase">Active Crop</span>
          <span className="text-sm font-bold font-display text-white mt-0.5 flex items-center gap-1">
            <span>{selectedCropMeta.icon}</span>
            <span>{selectedCropMeta.shortName}</span>
          </span>
        </div>

        <div className="p-4 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono text-cream-200/50 uppercase">Total Investment</span>
          <span className="text-sm font-bold font-mono text-amber-300 mt-0.5">
            ₹{totalCost.toLocaleString()}
          </span>
        </div>

        <div className="p-4 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono text-cream-200/50 uppercase">Mandi Price</span>
          <span className="text-sm font-bold font-mono text-sky-300 mt-0.5">
            ₹{liveMandiData.avgPrice.toLocaleString()} <span className="text-[9px] text-cream-200/50">/{selectedCropMeta.mandiUnit.split(' ')[0]}</span>
          </span>
        </div>

        <div className="p-4 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono text-cream-200/50 uppercase">Projected Net ROI</span>
          <span className="text-sm font-black font-mono text-emerald-400 mt-0.5 flex items-center gap-0.5">
            <TrendingUp className="w-3.5 h-3.5" />
            +{roiPercentage}%
          </span>
        </div>
      </div>
    </div>
  );
};
