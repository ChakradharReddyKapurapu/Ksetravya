import React from 'react';
import { useSeeds } from '../../../context/SeedsContext';
import { useCart } from '../../../context/CartContext';
import { X, Layers, ShoppingBag, Trash2 } from 'lucide-react';

export const SeedComparisonModal = () => {
  const { comparisonList, toggleComparison, isComparisonModalOpen, setIsComparisonModalOpen } = useSeeds();
  const { addToCart } = useCart();

  if (!isComparisonModalOpen || comparisonList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setIsComparisonModalOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl bg-forest-950/95 border border-amber-400/40 text-cream-100 rounded-3xl shadow-2xl backdrop-blur-2xl p-6 sm:p-8 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-display text-white">Seed Variety Comparison</h2>
                <span className="text-xs font-mono text-amber-300">
                  Comparing {comparisonList.length} varieties side-by-side
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsComparisonModalOpen(false)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-cream-200/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-cream-200/60 uppercase">
                  <th className="p-3 w-40">Metric</th>
                  {comparisonList.map((seed) => (
                    <th key={seed.id} className="p-3 min-w-[200px] text-white font-display">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-base">{seed.icon}</span>
                          <h4 className="font-bold text-sm text-emerald-400">{seed.variety}</h4>
                          <span className="text-[10px] text-cream-200/60 block">{seed.brand}</span>
                        </div>
                        <button
                          onClick={() => toggleComparison(seed)}
                          className="text-cream-200/40 hover:text-rose-400 p-1"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-3 text-cream-200/50">Price / Pack</td>
                  {comparisonList.map((s) => (
                    <td key={s.id} className="p-3 text-amber-400 font-bold font-display text-sm">
                      ₹{s.price.toLocaleString()} ({s.packSize})
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-cream-200/50">Yield Potential</td>
                  {comparisonList.map((s) => (
                    <td key={s.id} className="p-3 text-emerald-300 font-bold">
                      {s.yieldPotential}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-cream-200/50">Germination Rate</td>
                  {comparisonList.map((s) => (
                    <td key={s.id} className="p-3 text-white">
                      {s.germinationRate}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-cream-200/50">Duration</td>
                  {comparisonList.map((s) => (
                    <td key={s.id} className="p-3 text-white">
                      {s.duration}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-cream-200/50">Season</td>
                  {comparisonList.map((s) => (
                    <td key={s.id} className="p-3 text-white">
                      {s.season}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-cream-200/50">Suitable Soil</td>
                  {comparisonList.map((s) => (
                    <td key={s.id} className="p-3 text-white text-[11px]">
                      {s.suitableSoil}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-cream-200/50">Pest Resistance</td>
                  {comparisonList.map((s) => (
                    <td key={s.id} className="p-3 text-cream-200/90 text-[10px]">
                      {s.resistance}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 text-cream-200/50">Action</td>
                  {comparisonList.map((s) => (
                    <td key={s.id} className="p-3">
                      <button
                        onClick={() => {
                          addToCart(s, 1, 'seed');
                          setIsComparisonModalOpen(false);
                        }}
                        className="py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
