import React from 'react';
import { useWorld } from '../../../context/WorldContext';
import { X, Layers, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';

export const CropComparisonModal = () => {
  const {
    comparisonList,
    setComparisonList,
    isComparisonModalOpen,
    setIsComparisonModalOpen,
    toggleComparisonCrop,
  } = useWorld();

  if (!isComparisonModalOpen || comparisonList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-forest-950/85 backdrop-blur-xl transition-opacity"
        onClick={() => setIsComparisonModalOpen(false)}
      />

      {/* Comparison Modal */}
      <div className="relative w-full max-w-4xl p-6 sm:p-8 rounded-3xl bg-forest-950/95 border border-emerald-500/40 shadow-2xl z-10 text-cream-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsComparisonModalOpen(false)}
          className="absolute right-5 top-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 mb-1">
          <Layers className="w-3.5 h-3.5" />
          <span>Multi-Commodity Comparative Analysis</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight mb-6">
          Side-by-Side Market Comparison
        </h2>

        {/* Comparison Grid Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {comparisonList.map((crop) => {
            const isUp = crop.changeDirection === 'up';
            return (
              <div
                key={crop.id}
                className="relative p-4 rounded-2xl bg-forest-900/80 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="text-[10px] font-mono text-amber-400 uppercase">
                      {crop.category}
                    </span>
                    <button
                      onClick={() => toggleComparisonCrop(crop)}
                      className="p-1 rounded bg-white/5 hover:bg-red-500/20 text-stone-400 hover:text-red-400 transition-colors"
                      title="Remove from comparison"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold font-display text-white">{crop.name}</h3>
                  <p className="text-xs text-cream-200/60 font-body mb-4">{crop.variety}</p>

                  {/* Price */}
                  <div className="p-3 rounded-xl bg-forest-950/70 border border-white/5 mb-3">
                    <span className="text-[10px] text-cream-200/50 font-mono uppercase">Current Rate</span>
                    <div className="text-xl font-black font-display text-white">
                      ₹{crop.price} <span className="text-xs font-mono text-cream-200/60">/ {crop.unit}</span>
                    </div>
                    <div
                      className={`text-xs font-bold font-mono mt-1 ${
                        isUp ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {isUp ? '▲ +' : '▼ '}
                      {crop.changePercent}% 24h
                    </div>
                  </div>

                  {/* Spread Metrics */}
                  <div className="space-y-1.5 text-xs font-mono text-cream-200/80 mb-3">
                    <div className="flex justify-between">
                      <span className="text-cream-200/50">Min:</span>
                      <span>₹{crop.minPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream-200/50">Average:</span>
                      <span className="text-amber-300 font-bold">₹{crop.avgPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream-200/50">Max:</span>
                      <span>₹{crop.maxPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream-200/50">Volume:</span>
                      <span className="text-emerald-300">{crop.volume}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-cream-200/40">
                  APMC Tirupati • Demo Index
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear All Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              setComparisonList([]);
              setIsComparisonModalOpen(false);
            }}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-cream-200/70 hover:text-white transition-colors"
          >
            Clear All Compared Items
          </button>
        </div>
      </div>
    </div>
  );
};
