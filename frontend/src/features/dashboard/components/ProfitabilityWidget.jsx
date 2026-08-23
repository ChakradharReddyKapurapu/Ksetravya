import React from 'react';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { useFarmContext } from '../../../context/FarmContext';
import { useWorld } from '../../../context/WorldContext';
import { Calculator, TrendingUp, Sparkles, ArrowRight, DollarSign } from 'lucide-react';

export const ProfitabilityWidget = () => {
  const { totalCost, netProfit, roiPercentage } = useAnalytics();
  const { farm } = useFarmContext();
  const { startTransitionToAnalytics } = useWorld();

  // Scale calculations safely by farm area
  const scale = Number(farm?.landArea) || 1;
  const rawCost = Number(totalCost) || 68500;
  const rawProfit = Number(netProfit) || 45200;
  const scaledCost = rawCost * scale;
  const scaledProfit = rawProfit * scale;
  const scaledRevenue = scaledCost + scaledProfit;
  const roi = roiPercentage || 66;

  return (
    <div className="p-6 rounded-3xl bg-forest-950/85 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold font-display text-white text-sm">Profitability Outlook</h3>
              <span className="text-[10px] text-cream-200/50 font-mono">
                {farm?.landArea || 5} {farm?.areaUnit || 'Acres'} {farm?.currentCrop || 'Groundnut'} Modeling
              </span>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[9px] font-mono border border-purple-400/30">
            ROI {roi}%
          </span>
        </div>

        {/* 4 Financial Metrics */}
        <div className="grid grid-cols-2 gap-2.5 py-4 text-xs font-mono">
          <div className="p-3 rounded-2xl bg-forest-900/60 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-cream-200/50 block">Investment Cost</span>
            <span className="font-bold text-white text-sm">
              ₹{Number(scaledCost || 0).toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-forest-900/60 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-cream-200/50 block">Expected Revenue</span>
            <span className="font-bold text-emerald-300 text-sm">
              ₹{Number(scaledRevenue || 0).toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-forest-900/60 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-cream-200/50 block">Estimated Profit</span>
            <span className="font-bold text-amber-300 text-sm">
              ₹{Number(scaledProfit || 0).toLocaleString()}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-forest-900/60 border border-white/5 space-y-0.5">
            <span className="text-[10px] text-cream-200/50 block">Estimated ROI</span>
            <span className="font-bold text-purple-300 text-sm">
              +{roi}%
            </span>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={startTransitionToAnalytics}
        className="w-full py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 font-display font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
      >
        <span>Analyze Profit & Cost Breakdown</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
