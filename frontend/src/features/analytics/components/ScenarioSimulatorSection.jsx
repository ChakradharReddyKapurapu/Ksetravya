import React from 'react';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { Sparkles, RotateCcw, TrendingUp, TrendingDown, Layers, ArrowRight } from 'lucide-react';

export const ScenarioSimulatorSection = () => {
  const {
    scenario,
    setScenario,
    totalCost,
    expectedRevenue,
    netProfit,
    roiPercentage,
    scenarioResults,
    selectedCropMeta,
  } = useAnalytics();

  const resetDeltas = () => {
    setScenario({ fertilizerDelta: 0, laborDelta: 0, yieldDelta: 0, priceDelta: 0 });
  };

  const hasChanges =
    scenario.fertilizerDelta !== 0 ||
    scenario.laborDelta !== 0 ||
    scenario.yieldDelta !== 0 ||
    scenario.priceDelta !== 0;

  const isPositiveDelta = scenarioResults.profitDifference >= 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono uppercase font-bold mb-1">
              <Layers className="w-3 h-3" />
              <span>Multi-Variable Sensitivity Lab</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              "What-If?" Farm Scenario Sensitivity Simulator
            </h2>
          </div>

          {hasChanges && (
            <button
              onClick={resetDeltas}
              className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-amber-300 border border-amber-400/30 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Scenario</span>
            </button>
          )}
        </div>

        {/* 4 Variable Sliders & Live Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 Cols): 4 Variable Sliders */}
          <div className="lg:col-span-7 space-y-4 font-mono text-xs">
            {/* Variable 1: Fertilizer Cost */}
            <div className="p-4 rounded-2xl bg-forest-900/80 border border-white/5 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-cream-200/90">🧪 Fertilizer Cost Shift:</span>
                <span className={`font-bold ${scenario.fertilizerDelta > 0 ? 'text-rose-400' : scenario.fertilizerDelta < 0 ? 'text-emerald-400' : 'text-white'}`}>
                  {scenario.fertilizerDelta > 0 ? `+${scenario.fertilizerDelta}%` : `${scenario.fertilizerDelta}%`}
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="5"
                value={scenario.fertilizerDelta}
                onChange={(e) => setScenario((prev) => ({ ...prev, fertilizerDelta: Number(e.target.value) }))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            {/* Variable 2: Labor Cost */}
            <div className="p-4 rounded-2xl bg-forest-900/80 border border-white/5 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-cream-200/90">👷 Field Labor Rate Shift:</span>
                <span className={`font-bold ${scenario.laborDelta > 0 ? 'text-rose-400' : scenario.laborDelta < 0 ? 'text-emerald-400' : 'text-white'}`}>
                  {scenario.laborDelta > 0 ? `+${scenario.laborDelta}%` : `${scenario.laborDelta}%`}
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="5"
                value={scenario.laborDelta}
                onChange={(e) => setScenario((prev) => ({ ...prev, laborDelta: Number(e.target.value) }))}
                className="w-full accent-purple-400 cursor-pointer"
              />
            </div>

            {/* Variable 3: Harvest Yield */}
            <div className="p-4 rounded-2xl bg-forest-900/80 border border-white/5 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-cream-200/90">🌾 Harvest Yield Variation:</span>
                <span className={`font-bold ${scenario.yieldDelta > 0 ? 'text-emerald-400' : scenario.yieldDelta < 0 ? 'text-rose-400' : 'text-white'}`}>
                  {scenario.yieldDelta > 0 ? `+${scenario.yieldDelta}%` : `${scenario.yieldDelta}%`}
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="5"
                value={scenario.yieldDelta}
                onChange={(e) => setScenario((prev) => ({ ...prev, yieldDelta: Number(e.target.value) }))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            {/* Variable 4: Mandi Selling Price */}
            <div className="p-4 rounded-2xl bg-forest-900/80 border border-white/5 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-cream-200/90">📈 Selling Price Fluctuation:</span>
                <span className={`font-bold ${scenario.priceDelta > 0 ? 'text-emerald-400' : scenario.priceDelta < 0 ? 'text-rose-400' : 'text-white'}`}>
                  {scenario.priceDelta > 0 ? `+${scenario.priceDelta}%` : `${scenario.priceDelta}%`}
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="5"
                value={scenario.priceDelta}
                onChange={(e) => setScenario((prev) => ({ ...prev, priceDelta: Number(e.target.value) }))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Right Column (5 Cols): Before vs. After Scenario Card */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-forest-900/90 border border-white/10 space-y-4 font-mono text-xs shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-bold text-white font-display text-sm">
                Scenario Impact Matrix
              </span>
              <span className="text-[10px] text-amber-400">
                {hasChanges ? 'SIMULATION ACTIVE' : 'BASELINE'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-cream-200/60">Total Production Cost:</span>
                <div className="text-right">
                  <span className="text-cream-200/40 line-through mr-2">₹{totalCost.toLocaleString()}</span>
                  <span className="text-white font-bold">₹{scenarioResults.adjTotalCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-cream-200/60">Expected Gross Revenue:</span>
                <div className="text-right">
                  <span className="text-cream-200/40 line-through mr-2">₹{expectedRevenue.toLocaleString()}</span>
                  <span className="text-white font-bold">₹{scenarioResults.adjRevenue.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-cream-200/60">Projected Net Profit:</span>
                <div className="text-right">
                  <span className="text-cream-200/40 line-through mr-2">₹{netProfit.toLocaleString()}</span>
                  <span className={`font-black text-sm ${scenarioResults.adjProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    ₹{scenarioResults.adjProfit.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-cream-200/60">Projected ROI:</span>
                <div className="text-right">
                  <span className="text-cream-200/40 line-through mr-2">{roiPercentage}%</span>
                  <span className="text-emerald-300 font-bold">+{scenarioResults.adjRoi}%</span>
                </div>
              </div>
            </div>

            {/* Delta Highlight Banner */}
            <div className={`p-4 rounded-2xl border text-center ${
              isPositiveDelta
                ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-400/30 text-rose-300'
            }`}>
              <span className="text-[10px] uppercase font-bold block">Scenario Net Profit Variance</span>
              <div className="text-xl font-black font-display mt-0.5">
                {isPositiveDelta ? `+₹${scenarioResults.profitDifference.toLocaleString()}` : `-₹${Math.abs(scenarioResults.profitDifference).toLocaleString()}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
