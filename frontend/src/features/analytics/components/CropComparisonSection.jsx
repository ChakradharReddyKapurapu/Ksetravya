import React from 'react';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { Scale, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';

export const CropComparisonSection = () => {
  const { allCrops, selectCrop, selectedCropId, acreage } = useAnalytics();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase font-bold mb-1">
              <Scale className="w-3 h-3" />
              <span>Agronomic Economics Benchmark</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Which Crop is More Profitable? Multi-Crop Matrix
            </h2>
          </div>
          <span className="text-xs font-mono text-cream-200/50">
            Standardized on {acreage} Acres cultivation
          </span>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {allCrops.map((crop) => {
            const isSelected = selectedCropId === crop.id;
            const cropTotalCost = Object.values(crop.benchmarkCostsPerAcre).reduce((a, b) => a + b, 0) * acreage;
            const cropYield = crop.defaultYieldPerAcre * acreage;
            const cropRevenue = cropYield * crop.defaultSellingPrice;
            const cropProfit = cropRevenue - cropTotalCost;
            const cropRoi = cropTotalCost > 0 ? Number(((cropProfit / cropTotalCost) * 100).toFixed(1)) : 0;

            return (
              <div
                key={crop.id}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-purple-950/80 border-purple-400 shadow-xl ring-1 ring-purple-400'
                    : 'bg-forest-900/80 hover:bg-forest-900 border-white/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{crop.icon}</span>
                      <div>
                        <h4 className="font-bold font-display text-white text-sm">{crop.name}</h4>
                        <span className="text-[10px] text-cream-200/50">{crop.yieldUnit}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-500 text-stone-950 font-bold text-[9px]">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/10 text-cream-200/80">
                    <div className="flex justify-between">
                      <span className="text-cream-200/50">Investment ({acreage} Ac):</span>
                      <span className="text-white font-bold">₹{cropTotalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream-200/50">Mandi Realization:</span>
                      <span className="text-sky-300 font-bold">₹{crop.defaultSellingPrice} / {crop.mandiUnit.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream-200/50">Expected Revenue:</span>
                      <span className="text-white font-bold">₹{cropRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream-200/50">Expected Profit:</span>
                      <span className="text-emerald-400 font-black">₹{cropProfit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream-200/50">Projected ROI:</span>
                      <span className="text-emerald-300 font-bold">+{cropRoi}%</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => selectCrop(crop.id)}
                  className={`w-full py-2 rounded-xl text-xs font-display font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-500 text-stone-950'
                      : 'bg-white/5 hover:bg-white/10 text-cream-200/80 hover:text-white'
                  }`}
                >
                  <span>{isSelected ? 'Loaded in Calculator' : 'Analyze This Crop'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
