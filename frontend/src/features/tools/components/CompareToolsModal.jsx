import React from 'react';
import { useTools } from '../../../context/ToolsContext';
import { X, Layers, Trash2, CheckCircle2 } from 'lucide-react';

export const CompareToolsModal = () => {
  const {
    comparisonList,
    setComparisonList,
    isComparisonModalOpen,
    setIsComparisonModalOpen,
    toggleComparison,
    openRentalModal,
    openBuyModal,
  } = useTools();

  if (!isComparisonModalOpen || comparisonList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-forest-950/85 backdrop-blur-xl"
        onClick={() => setIsComparisonModalOpen(false)}
      />

      <div className="relative w-full max-w-5xl p-6 sm:p-8 rounded-3xl bg-forest-950/95 border border-emerald-500/40 shadow-2xl z-10 text-cream-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsComparisonModalOpen(false)}
          className="absolute right-5 top-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 mb-1">
          <Layers className="w-3.5 h-3.5" />
          <span>Machinery Specification Comparison</span>
        </div>
        <h2 className="text-2xl font-black font-display text-white tracking-tight mb-6">
          Side-by-Side Equipment Analysis
        </h2>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {comparisonList.map((tool) => (
            <div
              key={tool.id}
              className="relative p-5 rounded-2xl bg-forest-900/80 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-1 mb-2">
                  <span className="text-[10px] font-mono text-amber-400 uppercase">
                    {tool.category}
                  </span>
                  <button
                    onClick={() => toggleComparison(tool)}
                    className="p-1 rounded bg-white/5 hover:bg-red-500/20 text-stone-400 hover:text-red-400 transition-colors"
                    title="Remove from comparison"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-sm font-bold font-display text-white mb-1">{tool.name}</h3>
                <p className="text-xs text-cream-200/60 font-mono mb-4">{tool.brand}</p>

                {/* Price Pill */}
                <div className="p-3 rounded-xl bg-forest-950/70 border border-white/5 mb-4 font-mono text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-cream-200/50">Buy:</span>
                    <span className="text-white font-bold">₹{tool.buyPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-amber-300">
                    <span className="text-amber-300/70">Rent:</span>
                    <span className="font-bold">₹{tool.rentPriceDay}/d</span>
                  </div>
                </div>

                {/* Specs rows */}
                <div className="space-y-1.5 text-xs font-mono text-cream-200/80 mb-4">
                  <div className="flex justify-between">
                    <span className="text-cream-200/50">Horsepower:</span>
                    <span className="text-emerald-300 font-bold">{tool.specs.hp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream-200/50">Engine:</span>
                    <span className="text-right truncate ml-2">{tool.specs.engine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream-200/50">Lift/Cap:</span>
                    <span>{tool.specs.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream-200/50">Fuel:</span>
                    <span>{tool.specs.fuel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream-200/50">Location:</span>
                    <span>{tool.location.split(',')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-1.5 pt-3 border-t border-white/5">
                <button
                  onClick={() => {
                    openBuyModal(tool);
                    setIsComparisonModalOpen(false);
                  }}
                  className="py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-[10px] font-bold font-display"
                >
                  Buy
                </button>
                <button
                  onClick={() => {
                    openRentalModal(tool);
                    setIsComparisonModalOpen(false);
                  }}
                  className="py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-stone-950 text-[10px] font-bold font-display"
                >
                  Rent
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              setComparisonList([]);
              setIsComparisonModalOpen(false);
            }}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-cream-200/70 hover:text-white transition-colors"
          >
            Clear All Compared Machinery
          </button>
        </div>
      </div>
    </div>
  );
};
