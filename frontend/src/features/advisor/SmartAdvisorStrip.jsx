import React, { useState, useEffect } from 'react';
import { useWorld } from '../../context/WorldContext';
import { useFarmContext } from '../../context/FarmContext';
import { ArrowRight, Sprout, TestTube2, Calculator, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

export const SmartAdvisorStrip = () => {
  const { startTransitionToAnalytics } = useWorld();
  const { farm, openMyFarmModal } = useFarmContext();
  const [activeStage, setActiveStage] = useState(0);

  const growthStages = [
    {
      id: 'seed',
      title: '1. Seed & Soil Selection',
      icon: '🌱',
      metric: `${farm.soilType}: pH 6.8 Optimal`,
      detail: `Explore certified ${farm.currentCrop} seeds suited to ${farm.soilType} in ${farm.district} District.`,
    },
    {
      id: 'fertilizer',
      title: '2. Nutrient Guidance',
      icon: '🧪',
      metric: `Targeting ${farm.landArea} ${farm.areaUnit} Cultivation`,
      detail: `Balanced N-P-K nutrient recommendations calibrated for ${farm.landArea} ${farm.areaUnit} ${farm.currentCrop}.`,
    },
    {
      id: 'irrigation',
      title: '3. Water & Weather Planning',
      icon: '💧',
      metric: `${farm.irrigationType} Schedule`,
      detail: `Optimize ${farm.irrigationType} run times according to live ${farm.district} atmospheric forecasts.`,
    },
    {
      id: 'profit',
      title: '4. Profitability Analysis',
      icon: '📈',
      metric: `${farm.season} Revenue Modeling`,
      detail: `Evaluate ${farm.landArea}-${farm.areaUnit} production economics and compare against mandi benchmarks.`,
    },
  ];

  // Auto-cycle through growth stages every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % growthStages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [growthStages.length]);

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#172b1d] via-[#102418] to-[#0a1810] border border-emerald-500/30 shadow-2xl shadow-black/70">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 mb-6">
          {/* Left Title & Description */}
          <div className="max-w-md">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Agricultural Guidance & Insights
              </h3>
              <button
                onClick={openMyFarmModal}
                className="px-2.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono font-semibold hover:bg-emerald-500/35 transition-colors cursor-pointer flex items-center gap-1"
                title="Click to customize your farm context"
              >
                <span>📍</span>
                <span>{farm.landArea}ac {farm.currentCrop} ({farm.district})</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-cream-200/80 font-body leading-relaxed">
              Connected platform recommendations tailored for your {farm.landArea} {farm.areaUnit} {farm.currentCrop} farm in {farm.district}, {farm.state}.
            </p>
          </div>

          {/* Center 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 py-2 border-y sm:border-y-0 sm:border-x border-white/10 sm:px-6 w-full lg:w-auto">
            {/* 1. Crop Suggestion */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mt-0.5">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Crop Suggestion</span>
                <span className="text-[11px] text-cream-200/60 font-body">Season & Soil Match</span>
              </div>
            </div>

            {/* 2. Fertilizer Guide */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mt-0.5">
                <TestTube2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Fertilizer Guide</span>
                <span className="text-[11px] text-cream-200/60 font-body">Balanced Nutrition</span>
              </div>
            </div>

            {/* 3. Profit Calculator */}
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 mt-0.5">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Profit Calculator</span>
                <span className="text-[11px] text-cream-200/60 font-body">Break-Even & ROI</span>
              </div>
            </div>
          </div>

          {/* Right CTA Button */}
          <div className="flex flex-col items-start sm:items-center w-full lg:w-auto">
            <button
              onClick={startTransitionToAnalytics}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold font-display text-sm transition-all duration-300 shadow-xl shadow-emerald-950/80 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Farm Analytics</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-cream-200/50 font-mono mt-1.5 text-center">
              Data-Driven Decision Support
            </span>
          </div>
        </div>

        {/* Interactive Agricultural Intelligence Growth Pipeline */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Crop Growth Lifecycle Stages</span>
            </span>
            <span className="text-[10px] font-mono text-cream-200/50">
              Indicative Agricultural Flow
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {growthStages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/20 border-emerald-400/80 shadow-lg shadow-emerald-950/50 scale-[1.02]'
                      : 'bg-forest-950/60 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{stage.icon}</span>
                    <span className={`text-xs font-bold font-display ${isActive ? 'text-white' : 'text-cream-200/70'}`}>
                      {stage.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300 font-semibold block mb-1">
                    {stage.metric}
                  </span>
                  <p className="text-[10px] text-cream-200/70 font-body leading-snug">
                    {stage.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-white/5 text-[9px] font-mono text-cream-200/40 text-center sm:text-left">
            * Guidance is informational and should be verified with soil testing and qualified agricultural professionals.
          </div>
        </div>
      </div>
    </div>
  );
};

