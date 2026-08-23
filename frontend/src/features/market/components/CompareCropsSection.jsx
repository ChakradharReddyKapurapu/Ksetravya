import React from 'react';
import { useMarket } from '../../../context/MarketContext';
import { X, Layers, Plus } from 'lucide-react';

export const CompareCropsSection = () => {
  const { compareCrops, toggleCompareCrop, allCrops } = useMarket();

  const activeCompareObjects = compareCrops
    .map((id) => allCrops.find((c) => c.id === id))
    .filter(Boolean);

  const maxPrice = Math.max(100, ...activeCompareObjects.map((c) => c.price));

  const barColors = ['#38bdf8', '#ea580c', '#22c55e', '#eab308'];

  return (
    <div className="p-5 rounded-3xl bg-forest-950/90 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold font-display uppercase tracking-wider text-white">
            COMPARE CROPS
          </span>
          <span className="text-[9px] font-mono text-cream-200/50">Avg Price (₹/kg)</span>
        </div>

        <p className="text-[10px] text-cream-200/60 font-body mb-2.5">
          Select up to 4 crops to compare side-by-side:
        </p>

        {/* Selected Crop Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {activeCompareObjects.map((crop) => (
            <span
              key={crop.id}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-900 border border-white/10 text-xs font-display text-white"
            >
              <span>{crop.icon}</span>
              <span>{crop.name.split(' ')[0]}</span>
              <button
                onClick={() => toggleCompareCrop(crop.id)}
                className="text-cream-200/40 hover:text-rose-400 p-0.5 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {compareCrops.length < 4 && (
            <select
              onChange={(e) => {
                if (e.target.value) toggleCompareCrop(e.target.value);
              }}
              value=""
              className="px-2 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-cream-200/80 font-mono focus:outline-none cursor-pointer"
            >
              <option value="" disabled>
                + Add Crop
              </option>
              {allCrops
                .filter((c) => !compareCrops.includes(c.id))
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (₹{c.price})
                  </option>
                ))}
            </select>
          )}
        </div>

        {/* Multi-Crop Vertical Bar Chart */}
        <div className="h-32 flex items-end justify-around gap-3 pt-4 px-2 border-b border-white/10">
          {activeCompareObjects.map((crop, idx) => {
            const heightPercent = Math.max(15, (crop.price / maxPrice) * 100);
            const color = barColors[idx % barColors.length];

            return (
              <div key={crop.id} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[11px] font-bold font-mono text-white">
                  ₹{crop.price}
                </span>
                <div
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: color,
                  }}
                  className="w-full max-w-[48px] rounded-t-xl transition-all duration-500 shadow-lg"
                />
                <span className="text-[10px] font-mono text-cream-200/70 truncate max-w-[60px]">
                  {crop.name.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <span className="text-[9px] font-mono text-cream-200/40 text-center block pt-2">
        Click on any bar or tag to adjust comparison
      </span>
    </div>
  );
};
