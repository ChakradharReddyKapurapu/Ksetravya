import React, { useState } from 'react';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { Sliders, TrendingUp, DollarSign, Sparkles } from 'lucide-react';

export const PriceSimulationSection = () => {
  const {
    selectedCropMeta,
    totalCost,
    expectedYield,
    sellingPrice,
  } = useAnalytics();

  const [simulatedPrice, setSimulatedPrice] = useState(sellingPrice);

  // Generate 5 comparative price benchmark points
  const base = sellingPrice;
  const pricePoints = [
    Math.round(base * 0.8),
    Math.round(base * 0.9),
    base,
    Math.round(base * 1.1),
    Math.round(base * 1.2),
  ];

  const simRevenue = Math.round(expectedYield * simulatedPrice);
  const simProfit = simRevenue - totalCost;
  const simRoi = totalCost > 0 ? Number(((simProfit / totalCost) * 100).toFixed(1)) : 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-mono uppercase font-bold mb-1">
              <Sliders className="w-3 h-3" />
              <span>Sensitivity Curve Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              "What If I Sell At..." Price & Profit Simulation
            </h2>
          </div>
          <span className="text-xs font-mono text-cream-200/50">
            Simulate mandi realization impact
          </span>
        </div>

        {/* Interactive Selling Price Slider */}
        <div className="p-6 rounded-3xl bg-forest-900/80 border border-white/5 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-xs">
            <span className="text-cream-200/80">Simulated Selling Price:</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-display text-pink-300">
                ₹{simulatedPrice.toLocaleString()}
              </span>
              <span className="text-cream-200/50">/ {selectedCropMeta.mandiUnit}</span>
            </div>
          </div>

          <input
            type="range"
            min={Math.round(base * 0.5)}
            max={Math.round(base * 1.5)}
            step={Math.max(10, Math.round(base * 0.01))}
            value={simulatedPrice}
            onChange={(e) => setSimulatedPrice(Number(e.target.value))}
            className="w-full accent-pink-400 cursor-pointer"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-white/5">
              <span className="text-[10px] text-cream-200/50 block">Simulated Revenue</span>
              <span className="text-white font-bold text-base mt-0.5 block">
                ₹{simRevenue.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/5">
              <span className="text-[10px] text-cream-200/50 block">Simulated Net Profit</span>
              <span className={`text-base font-black mt-0.5 block ${simProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                ₹{simProfit.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-white/5">
              <span className="text-[10px] text-cream-200/50 block">Simulated ROI</span>
              <span className={`text-base font-black mt-0.5 block ${simRoi >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                {simRoi > 0 ? `+${simRoi}%` : `${simRoi}%`}
              </span>
            </div>
          </div>
        </div>

        {/* 5-Point Comparative Simulation Matrix */}
        <div>
          <label className="text-xs font-mono text-pink-300 font-bold uppercase block mb-3">
            Comparative Price Benchmark Points ({selectedCropMeta.shortName}):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
            {pricePoints.map((pt, idx) => {
              const rev = Math.round(expectedYield * pt);
              const pft = rev - totalCost;
              const roi = totalCost > 0 ? Number(((pft / totalCost) * 100).toFixed(1)) : 0;
              const isBase = pt === base;

              return (
                <div
                  key={idx}
                  onClick={() => setSimulatedPrice(pt)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 flex flex-col justify-between ${
                    isBase
                      ? 'bg-purple-950/70 border-purple-400 text-white ring-1 ring-purple-400'
                      : 'bg-white/5 hover:bg-white/10 border-white/5 text-cream-200/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-cream-200/50">{idx === 2 ? 'CURRENT' : `Scenario ${idx + 1}`}</span>
                      {isBase && <span className="text-purple-300 font-bold">★ Active</span>}
                    </div>
                    <span className="text-base font-bold text-white block mt-1">₹{pt.toLocaleString()}</span>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-cream-200/50">Profit:</span>
                      <span className={pft >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                        ₹{pft.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream-200/50">ROI:</span>
                      <span className={roi >= 0 ? 'text-emerald-300' : 'text-rose-300'}>
                        {roi > 0 ? `+${roi}%` : `${roi}%`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
